'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function FAB() {
  const pathname = usePathname()
  
  // Hide FAB on write page
  if (pathname === '/write') return null

  return (
    <Link
      href="/write"
      className="fixed bottom-20 right-4 w-14 h-14 bg-zinc-100 text-zinc-900 rounded-full flex items-center justify-center shadow-lg hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 z-50"
      aria-label="New entry"
    >
      <span className="text-2xl font-light">+</span>
    </Link>
  )
}
