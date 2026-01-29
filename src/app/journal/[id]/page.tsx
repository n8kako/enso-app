'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface NeedsSignal {
  level: string
  strength: number
  context?: string
}

interface Entry {
  id: string
  content: string
  createdAt: string
  analysis?: {
    summary?: string
    mood?: string
    themes: string
  }
  needsSignals: NeedsSignal[]
  commitments: Array<{
    id: string
    description: string
    level: string
    status: string
  }>
}

const LEVEL_COLORS: Record<string, string> = {
  PHYSIOLOGICAL: 'bg-red-500',
  SAFETY: 'bg-orange-500',
  BELONGING: 'bg-yellow-500',
  ESTEEM: 'bg-green-500',
  SELF_ACTUALIZATION: 'bg-blue-500',
}

const LEVEL_LABELS: Record<string, string> = {
  PHYSIOLOGICAL: 'Body',
  SAFETY: 'Safety',
  BELONGING: 'Belonging',
  ESTEEM: 'Esteem',
  SELF_ACTUALIZATION: 'Purpose',
}

export default function EntryPage() {
  const params = useParams()
  const [entry, setEntry] = useState<Entry | null>(null)
  const [loading, setLoading] = useState(true)
  const [analyzing, setAnalyzing] = useState(false)

  useEffect(() => {
    async function loadEntry() {
      try {
        const res = await fetch(`/api/entries/${params.id}`)
        if (res.ok) {
          const data = await res.json()
          setEntry(data)
        }
      } catch (error) {
        console.error('Failed to load entry:', error)
      } finally {
        setLoading(false)
      }
    }
    loadEntry()
  }, [params.id])

  const handleAnalyze = async () => {
    if (!entry) return
    setAnalyzing(true)
    try {
      const res = await fetch(`/api/entries/${entry.id}/analyze`, {
        method: 'POST',
      })
      if (res.ok) {
        const updated = await res.json()
        setEntry(updated)
      }
    } catch (error) {
      console.error('Analysis failed:', error)
    } finally {
      setAnalyzing(false)
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center">
        <div className="text-zinc-500">Loading...</div>
      </main>
    )
  }

  if (!entry) {
    return (
      <main className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-zinc-500 mb-4">Entry not found</p>
          <Link href="/journal" className="text-zinc-400 hover:text-zinc-200">
            ← Back to journal
          </Link>
        </div>
      </main>
    )
  }

  const themes = entry.analysis?.themes ? JSON.parse(entry.analysis.themes) : []

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/journal" className="text-zinc-400 hover:text-zinc-200 transition-colors">
            ← Back
          </Link>
          {!entry.analysis && (
            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="px-4 py-2 bg-zinc-800 text-zinc-100 rounded-lg hover:bg-zinc-700 transition-colors disabled:opacity-50"
            >
              {analyzing ? 'Analyzing...' : 'Analyze with AI'}
            </button>
          )}
        </div>

        {/* Date */}
        <div className="text-zinc-500 text-sm mb-6">
          {formatDate(entry.createdAt)}
        </div>

        {/* Analysis Summary */}
        {entry.analysis && (
          <div className="mb-8 p-4 bg-zinc-900 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-zinc-400 text-xs uppercase tracking-wide">AI Analysis</span>
              {entry.analysis.mood && (
                <span className="text-zinc-500 text-xs">• {entry.analysis.mood}</span>
              )}
            </div>
            {entry.analysis.summary && (
              <p className="text-zinc-300 text-sm">{entry.analysis.summary}</p>
            )}
            {themes.length > 0 && (
              <div className="flex gap-2 mt-3">
                {themes.map((theme: string, i: number) => (
                  <span key={i} className="px-2 py-1 bg-zinc-800 text-zinc-400 text-xs rounded">
                    {theme}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Needs Signals */}
        {entry.needsSignals.length > 0 && (
          <div className="mb-8">
            <h3 className="text-zinc-400 text-xs uppercase tracking-wide mb-3">Hierarchy Signals</h3>
            <div className="space-y-2">
              {entry.needsSignals
                .sort((a, b) => b.strength - a.strength)
                .map((signal, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${LEVEL_COLORS[signal.level]}`} />
                    <span className="text-zinc-300 text-sm w-24">{LEVEL_LABELS[signal.level]}</span>
                    <div className="flex-1 h-1 bg-zinc-800 rounded">
                      <div
                        className={`h-full rounded ${LEVEL_COLORS[signal.level]}`}
                        style={{ width: `${signal.strength * 100}%`, opacity: 0.7 }}
                      />
                    </div>
                    <span className="text-zinc-500 text-xs w-8">{Math.round(signal.strength * 100)}%</span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Commitments */}
        {entry.commitments.length > 0 && (
          <div className="mb-8">
            <h3 className="text-zinc-400 text-xs uppercase tracking-wide mb-3">Commitments Detected</h3>
            <div className="space-y-2">
              {entry.commitments.map((commitment) => (
                <div key={commitment.id} className="flex items-start gap-3 p-3 bg-zinc-900 rounded-lg">
                  <div className={`w-2 h-2 mt-1.5 rounded-full ${LEVEL_COLORS[commitment.level]}`} />
                  <div>
                    <p className="text-zinc-300 text-sm">{commitment.description}</p>
                    <span className="text-zinc-500 text-xs">{LEVEL_LABELS[commitment.level]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Entry Content */}
        <div className="prose prose-invert prose-zinc max-w-none">
          <div className="text-zinc-200 leading-relaxed whitespace-pre-wrap">
            {entry.content}
          </div>
        </div>
      </div>
    </main>
  )
}
