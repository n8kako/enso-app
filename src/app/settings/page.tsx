export default function SettingsPage() {
  return (
    <main className="min-h-screen px-6 pt-12 pb-24">
      <h1 className="text-2xl font-light mb-8">Settings</h1>
      
      {/* Profile section */}
      <section className="mb-8">
        <h2 className="text-zinc-500 text-sm mb-4">Profile</h2>
        <div className="bg-zinc-900 rounded-xl p-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-xl">
              ◯
            </div>
            <div>
              <p className="font-medium">Developer</p>
              <p className="text-zinc-500 text-sm">dev@enso.app</p>
            </div>
          </div>
        </div>
      </section>

      {/* Preferences */}
      <section className="mb-8">
        <h2 className="text-zinc-500 text-sm mb-4">Preferences</h2>
        <div className="bg-zinc-900 rounded-xl divide-y divide-zinc-800">
          <div className="p-4 flex items-center justify-between">
            <span>Dark mode</span>
            <span className="text-zinc-500">Always</span>
          </div>
          <div className="p-4 flex items-center justify-between">
            <span>Daily reminder</span>
            <span className="text-zinc-500">Off</span>
          </div>
          <div className="p-4 flex items-center justify-between">
            <span>AI analysis</span>
            <span className="text-zinc-500">Automatic</span>
          </div>
        </div>
      </section>

      {/* Data */}
      <section className="mb-8">
        <h2 className="text-zinc-500 text-sm mb-4">Data</h2>
        <div className="bg-zinc-900 rounded-xl divide-y divide-zinc-800">
          <button className="w-full p-4 text-left hover:bg-zinc-800 transition-colors rounded-t-xl">
            Export all entries
          </button>
          <button className="w-full p-4 text-left hover:bg-zinc-800 transition-colors rounded-b-xl text-red-400">
            Delete all data
          </button>
        </div>
      </section>

      {/* About */}
      <section>
        <h2 className="text-zinc-500 text-sm mb-4">About</h2>
        <div className="bg-zinc-900 rounded-xl p-4">
          <p className="text-zinc-400 text-sm mb-2">Enso v0.1.0</p>
          <p className="text-zinc-500 text-xs">
            AI-native journaling built around the hierarchy of needs.
          </p>
        </div>
      </section>
    </main>
  )
}
