'use client'

import { useEffect, useState } from 'react'

const PROMPTS = [
  "What's weighing on your mind?",
  "What would make today meaningful?",
  "How are you really feeling?",
  "What's one thing you're grateful for?",
  "What are you avoiding?",
  "What would your future self thank you for?",
]

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [date, setDate] = useState('')
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    // Pick a random prompt
    setPrompt(PROMPTS[Math.floor(Math.random() * PROMPTS.length)])
    
    // Set current date
    setDate(new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }))
    
    // Set greeting based on time
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good morning')
    else if (hour < 18) setGreeting('Good afternoon')
    else setGreeting('Good evening')
  }, [])

  return (
    <main className="min-h-screen px-6 pt-12 pb-24">
      {/* Date & Greeting */}
      <div className="mb-12">
        <p className="text-zinc-500 text-sm mb-1">{date}</p>
        <h1 className="text-2xl font-light">{greeting}</h1>
      </div>

      {/* Prompt Card */}
      <div className="bg-zinc-900 rounded-2xl p-6 mb-8">
        <p className="text-zinc-400 text-sm mb-2">Today's prompt</p>
        <p className="text-xl font-light leading-relaxed">{prompt}</p>
      </div>

      {/* Hierarchy Quick View */}
      <div className="mb-8">
        <p className="text-zinc-500 text-sm mb-4">Your focus areas</p>
        <div className="space-y-3">
          {[
            { level: 'Physiological', color: 'bg-red-500', value: 65 },
            { level: 'Safety', color: 'bg-orange-500', value: 72 },
            { level: 'Belonging', color: 'bg-yellow-500', value: 58 },
            { level: 'Esteem', color: 'bg-green-500', value: 45 },
            { level: 'Purpose', color: 'bg-blue-500', value: 38 },
          ].map((item) => (
            <div key={item.level} className="flex items-center gap-3">
              <span className="text-zinc-400 text-sm w-24">{item.level}</span>
              <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${item.color} opacity-70 rounded-full transition-all duration-500`}
                  style={{ width: `${item.value}%` }}
                />
              </div>
              <span className="text-zinc-500 text-xs w-8">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <p className="text-zinc-500 text-sm mb-4">This week</p>
        <div className="flex gap-2">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => {
            const hasEntry = Math.random() > 0.4 // Placeholder
            return (
              <div
                key={i}
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm ${
                  hasEntry 
                    ? 'bg-zinc-800 text-zinc-300' 
                    : 'bg-zinc-900 text-zinc-600'
                }`}
              >
                {day}
              </div>
            )
          })}
        </div>
      </div>

      {/* Enso Symbol */}
      <div className="fixed top-6 right-6 text-zinc-700 text-3xl">
        円
      </div>
    </main>
  )
}
