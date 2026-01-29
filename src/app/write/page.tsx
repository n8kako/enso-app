'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function WritePage() {
  const [content, setContent] = useState('')
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0

  const handleSave = async () => {
    if (!content.trim()) return
    
    setSaving(true)
    try {
      const res = await fetch('/api/entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      })
      
      if (res.ok) {
        const entry = await res.json()
        router.push(`/journal/${entry.id}`)
      }
    } catch (error) {
      console.error('Failed to save entry:', error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="text-zinc-400 hover:text-zinc-200 transition-colors">
            ← Back
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-zinc-500 text-sm">
              {wordCount} {wordCount === 1 ? 'word' : 'words'}
            </span>
            <button
              onClick={handleSave}
              disabled={!content.trim() || saving}
              className="px-4 py-2 bg-zinc-100 text-zinc-900 rounded-lg font-medium hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        {/* Date */}
        <div className="text-zinc-500 text-sm mb-4">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>

        {/* Editor */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full min-h-[60vh] bg-transparent text-zinc-100 text-lg leading-relaxed resize-none focus:outline-none placeholder:text-zinc-600"
          autoFocus
        />

        {/* Footer hint */}
        <div className="mt-8 text-zinc-600 text-sm">
          <p>Write freely. The AI will analyze your entry after you save.</p>
        </div>
      </div>
    </main>
  )
}
