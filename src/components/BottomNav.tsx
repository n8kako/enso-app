'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Today', icon: '◯' },
  { href: '/journal', label: 'Journal', icon: '📖' },
  { href: '/insights', label: 'Insights', icon: '✧' },
  { href: '/settings', label: 'Settings', icon: '⚙' },
]

export function BottomNav() {
  const pathname = usePathname()
  
  // Hide nav on write page for distraction-free writing
  if (pathname === '/write') return null

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800 pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                isActive 
                  ? 'text-zinc-100' 
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <span className="text-xl mb-1">{item.icon}</span>
              <span className="text-xs">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
