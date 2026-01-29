import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/entries/[id] - Get single entry with analysis
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  
  const entry = await prisma.entry.findUnique({
    where: { id },
    include: {
      analysis: true,
      needsSignals: true,
      commitments: true,
    },
  })
  
  if (!entry) {
    return NextResponse.json(
      { error: 'Entry not found' },
      { status: 404 }
    )
  }
  
  return NextResponse.json(entry)
}

// DELETE /api/entries/[id] - Delete entry
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  
  await prisma.entry.delete({
    where: { id },
  })
  
  return NextResponse.json({ success: true })
}
