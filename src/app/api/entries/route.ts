import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Temporary: Use a default user for development
// TODO: Replace with actual auth
const DEFAULT_USER_ID = 'dev-user'

async function ensureDevUser() {
  const user = await prisma.user.findUnique({
    where: { id: DEFAULT_USER_ID }
  })
  
  if (!user) {
    await prisma.user.create({
      data: {
        id: DEFAULT_USER_ID,
        email: 'dev@enso.app',
        name: 'Developer',
      }
    })
  }
}

// GET /api/entries - List entries
export async function GET() {
  await ensureDevUser()
  
  const entries = await prisma.entry.findMany({
    where: { userId: DEFAULT_USER_ID },
    orderBy: { createdAt: 'desc' },
    include: {
      analysis: true,
      needsSignals: true,
    },
    take: 50,
  })
  
  return NextResponse.json(entries)
}

// POST /api/entries - Create entry
export async function POST(request: NextRequest) {
  await ensureDevUser()
  
  const { content } = await request.json()
  
  if (!content || typeof content !== 'string') {
    return NextResponse.json(
      { error: 'Content is required' },
      { status: 400 }
    )
  }
  
  const entry = await prisma.entry.create({
    data: {
      userId: DEFAULT_USER_ID,
      content: content.trim(),
    },
  })
  
  // TODO: Trigger AI analysis in background
  // For now, just return the entry
  
  return NextResponse.json(entry)
}
