'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Entry {
  id: string
  content: string
  createdAt: string
  analysis?: {
    summary?: string
    mood?: string
  }
}

export default function JournalPage() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadEntries() {
      try {
        const res = await fetch('/api/entries')
        if (res.ok) {
          const data = await res.json()
          setEntries(data)
        }
      } catch (error) {
        console.error('Failed to load entries:', error)
      } finally {
        setLoading(false)
      }
    }
    loadEntries()
  }, [])

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })
  }

  const getPreview = (content: string) => {
    const words = content.split(/\s+/).slice(0, 30)
    return words.join(' ') + (content.split(/\s+/).length > 30 ? '...' : '')
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="text-zinc-400 hover:text-zinc-200 transition-colors">
            ← Home
          </Link>
          <Link
            href="/write"
            className="px-4 py-2 bg-zinc-800 text-zinc-100 rounded-lg hover:bg-zinc-700 transition-colors"
          >
            New Entry
          </Link>
        </div>

        <h1 className="text-2xl font-light mb-8">Your Journal</h1>

        {/* Entries list */}
        {loading ? (
          <div className="text-zinc-500">Loading...</div>
        ) : entries.length === 0 ? (
          <div className="text-zinc-500">
            <p>No entries yet.</p>
            <Link href="/write" className="text-zinc-400 hover:text-zinc-200 mt-2 inline-block">
              Write your first entry →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => (
              <Link
                key={entry.id}
                href={`/journal/${entry.id}`}
                className="block p-4 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-zinc-400 text-sm">
                    {formatDate(entry.createdAt)}
                  </span>
                  {entry.analysis?.mood && (
                    <span className="text-zinc-500 text-xs">
                      {entry.analysis.mood}
                    </span>
                  )}
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  {entry.analysis?.summary || getPreview(entry.content)}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
