import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic()

const ANALYSIS_PROMPT = `Analyze this journal entry and extract structured information.

Entry:
"""
{CONTENT}
"""

Return a JSON object with:
{
  "summary": "1-2 sentence summary of the entry",
  "mood": "primary emotional state (e.g., 'reflective', 'anxious', 'hopeful', 'frustrated')",
  "themes": ["theme1", "theme2", "theme3"],
  "commitments": [
    {
      "description": "what they committed to or intend to do",
      "explicit": true or false (was it explicitly stated?),
      "level": "PHYSIOLOGICAL|SAFETY|BELONGING|ESTEEM|SELF_ACTUALIZATION"
    }
  ],
  "needsSignals": [
    {
      "level": "PHYSIOLOGICAL|SAFETY|BELONGING|ESTEEM|SELF_ACTUALIZATION",
      "strength": 0.0 to 1.0 (how prominently this level appears),
      "context": "brief relevant excerpt"
    }
  ]
}

Hierarchy levels:
- PHYSIOLOGICAL: Sleep, food, water, shelter, physical health, exercise, bodily needs
- SAFETY: Financial security, job stability, health/medical, routine, reduced chaos
- BELONGING: Relationships, family, friends, community, love, connection
- ESTEEM: Achievement, confidence, respect, recognition, skill development
- SELF_ACTUALIZATION: Purpose, values, creativity, growth, becoming, meaning

Guidelines:
- Be conservative with commitments - only extract clear intentions
- Needs signals indicate which hierarchy levels the entry touches
- Strength reflects how much attention/concern that level receives
- Multiple levels can appear in one entry
- Return ONLY valid JSON, no markdown or explanation`

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  
  // Get the entry
  const entry = await prisma.entry.findUnique({
    where: { id },
  })
  
  if (!entry) {
    return NextResponse.json(
      { error: 'Entry not found' },
      { status: 404 }
    )
  }
  
  try {
    // Call Claude for analysis
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: ANALYSIS_PROMPT.replace('{CONTENT}', entry.content),
        },
      ],
    })
    
    // Parse the response
    const responseText = message.content[0].type === 'text' 
      ? message.content[0].text 
      : ''
    
    // Clean the response (remove any markdown code blocks)
    const cleanJson = responseText
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim()
    
    const analysis = JSON.parse(cleanJson)
    
    // Store the analysis
    await prisma.entryAnalysis.upsert({
      where: { entryId: id },
      create: {
        entryId: id,
        summary: analysis.summary,
        mood: analysis.mood,
        themes: JSON.stringify(analysis.themes || []),
      },
      update: {
        summary: analysis.summary,
        mood: analysis.mood,
        themes: JSON.stringify(analysis.themes || []),
      },
    })
    
    // Store needs signals
    if (analysis.needsSignals?.length > 0) {
      // Delete existing signals first
      await prisma.needsSignal.deleteMany({
        where: { entryId: id },
      })
      
      // Create new signals
      await prisma.needsSignal.createMany({
        data: analysis.needsSignals.map((signal: { level: string; strength: number; context?: string }) => ({
          entryId: id,
          level: signal.level,
          strength: signal.strength,
          context: signal.context,
        })),
      })
    }
    
    // Store commitments
    if (analysis.commitments?.length > 0) {
      await prisma.commitment.createMany({
        data: analysis.commitments.map((c: { description: string; level: string; explicit?: boolean }) => ({
          userId: entry.userId,
          entryId: id,
          description: c.description,
          level: c.level,
          explicit: c.explicit ?? true,
        })),
      })
    }
    
    // Return updated entry
    const updatedEntry = await prisma.entry.findUnique({
      where: { id },
      include: {
        analysis: true,
        needsSignals: true,
        commitments: true,
      },
    })
    
    return NextResponse.json(updatedEntry)
    
  } catch (error) {
    console.error('Analysis failed:', error)
    return NextResponse.json(
      { error: 'Analysis failed' },
      { status: 500 }
    )
  }
}
