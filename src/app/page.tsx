import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-2xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-light tracking-tight mb-4">
            円相
          </h1>
          <p className="text-zinc-400 text-lg">
            Write freely. See clearly.
          </p>
        </div>

        {/* Main action */}
        <div className="flex flex-col items-center gap-6">
          <Link 
            href="/write"
            className="px-8 py-4 bg-zinc-100 text-zinc-900 rounded-lg font-medium hover:bg-zinc-200 transition-colors"
          >
            Start Writing
          </Link>
          
          <Link 
            href="/journal"
            className="text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            View past entries →
          </Link>
        </div>

        {/* Philosophy */}
        <div className="mt-24 text-center">
          <p className="text-zinc-500 text-sm max-w-md mx-auto">
            Your journal is the interface. An AI companion watches, learns, 
            and helps you climb toward what matters most.
          </p>
        </div>

        {/* Hierarchy preview */}
        <div className="mt-16 flex justify-center">
          <div className="text-xs text-zinc-600 font-mono">
            <div className="text-center">SELF-ACTUALIZATION</div>
            <div className="text-center">▲</div>
            <div className="text-center">ESTEEM</div>
            <div className="text-center">▲</div>
            <div className="text-center">BELONGING</div>
            <div className="text-center">▲</div>
            <div className="text-center">SAFETY</div>
            <div className="text-center">▲</div>
            <div className="text-center">PHYSIOLOGICAL</div>
          </div>
        </div>
      </div>
    </main>
  )
}
