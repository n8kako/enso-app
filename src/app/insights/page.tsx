export default function InsightsPage() {
  return (
    <main className="min-h-screen px-6 pt-12 pb-24">
      <h1 className="text-2xl font-light mb-8">Insights</h1>
      
      {/* Coming soon placeholder */}
      <div className="bg-zinc-900 rounded-2xl p-6 text-center">
        <div className="text-4xl mb-4">✧</div>
        <h2 className="text-lg font-light mb-2">Patterns emerging...</h2>
        <p className="text-zinc-500 text-sm">
          Write a few more entries and we'll start identifying patterns
          in your hierarchy of needs.
        </p>
      </div>

      {/* Future: Insight cards */}
      <div className="mt-8 space-y-4">
        <p className="text-zinc-500 text-sm">What we're watching for:</p>
        
        <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 mt-2 rounded-full bg-red-500" />
            <div>
              <p className="text-zinc-300 text-sm">Physiological patterns</p>
              <p className="text-zinc-500 text-xs mt-1">
                Sleep, nutrition, energy levels
              </p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 mt-2 rounded-full bg-yellow-500" />
            <div>
              <p className="text-zinc-300 text-sm">Belonging signals</p>
              <p className="text-zinc-500 text-xs mt-1">
                Relationships, community, connection
              </p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
            <div>
              <p className="text-zinc-300 text-sm">Purpose alignment</p>
              <p className="text-zinc-500 text-xs mt-1">
                Values, goals, self-actualization
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
