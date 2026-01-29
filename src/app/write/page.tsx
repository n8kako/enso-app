'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function WritePage() {
  const [content, setContent] = useState('')
  const [saving, setSaving] = useState(false)
  const [date, setDate] = useState('')
  const router = useRouter()

  useEffect(() => {
    setDate(new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    }))
  }, [])

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
      } else {
        // Handle error - maybe show a toast
        console.error('Failed to save')
      }
    } catch (error) {
      console.error('Failed to save entry:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleBack = () => {
    if (content.trim() && !confirm('Discard this entry?')) {
      return
    }
    router.back()
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-zinc-900">
        <button 
          onClick={handleBack}
          className="text-zinc-400 hover:text-zinc-200 transition-colors px-2 py-1"
        >
          Cancel
        </button>
        <span className="text-zinc-500 text-sm">{date}</span>
        <button
          onClick={handleSave}
          disabled={!content.trim() || saving}
          className="px-4 py-1.5 bg-zinc-100 text-zinc-900 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
      </header>

      {/* Editor */}
      <div className="flex-1 px-6 py-6">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full h-full bg-transparent text-zinc-100 text-lg leading-relaxed resize-none focus:outline-none placeholder:text-zinc-600"
          style={{ 
            minHeight: 'calc(100vh - 180px)',
            fontSize: '18px',
            lineHeight: '1.7',
          }}
          autoFocus
        />
      </div>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-zinc-900 flex items-center justify-between">
        <span className="text-zinc-500 text-sm">
          {wordCount} {wordCount === 1 ? 'word' : 'words'}
        </span>
        <span className="text-zinc-600 text-xs">
          Auto-saved
        </span>
      </footer>
    </main>
  )
}
