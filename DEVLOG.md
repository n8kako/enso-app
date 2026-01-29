# DEVLOG.md — Enso App Development Log

**Purpose:** This is a running log of development progress. Since I (Enso, the AI) work across context windows with abrupt stops, this file maintains continuity. Read this FIRST when resuming work.

---

## 2026-01-29 01:25 — Mobile-First UI Implementation

**Implemented based on research:**

**Components created:**
- `src/components/BottomNav.tsx` - Bottom navigation (Today, Journal, Insights, Settings)
- `src/components/FAB.tsx` - Floating action button for new entries
- Both hidden on write page for distraction-free mode

**Pages updated:**
- `src/app/page.tsx` - Home page with greeting, daily prompt, hierarchy preview, week activity
- `src/app/write/page.tsx` - Cleaner editor with better typography, Cancel/Save header
- `src/app/insights/page.tsx` - Placeholder insights page
- `src/app/settings/page.tsx` - Settings page structure

**Layout updates:**
- Added meta tags for PWA (manifest, apple-web-app, viewport)
- Bottom padding for nav bar clearance
- Dark theme by default

**Status:** UI is mobile-ready. Still need server restart to test API.

---

## 2026-01-29 01:20 — Mobile UI Research Complete

**Spawned sub-agent** to research mobile-first UI patterns. Results saved to `docs/MOBILE-UI.md`.

**Key recommendations:**
- Bottom navigation (3-4 items: Journal, Timeline, Insights, Settings)
- Floating Action Button for "New Entry" - always visible
- 16px minimum body text, 1.5x line height
- Dark mode crucial for nighttime journaling
- Swipe gestures on entries (archive, delete, favorite)
- Progressive onboarding - don't overwhelm on first launch

**Primary UX flow:**
```
Open → Prompt/Insight → FAB tap → Write → Save → Updated hierarchy → Close
```

**Next:** Implement mobile-first layout with bottom nav + FAB

---

## 2026-01-29 01:10 — Prisma Fix (Server Restart Needed)

**Issue:** API returning 500 error on /api/entries

**Root cause:** Project was initialized with Prisma 7 which has breaking changes (adapter-based config). Downgraded to Prisma 6 for simpler setup.

**Fixed:**
- Downgraded prisma and @prisma/client to v6
- Restored `url = env("DATABASE_URL")` in schema.prisma
- Removed prisma.config.ts (Prisma 7 only)
- Regenerated Prisma client

**ACTION NEEDED:** Restart the Next.js dev server to clear Turbopack cache
```bash
# Kill the running server (Ctrl+C) then:
npm run dev
```

**After restart, test:**
1. Go to http://localhost:3000
2. Click "Start Writing"
3. Type an entry and click Save
4. Should redirect to /journal/[id]

---

## 2026-01-29 00:45 — Core MVP Complete

**What happened:**
- Full Next.js 14 app with TypeScript + Tailwind
- Prisma schema with complete data model
- SQLite database with initial migration
- Core UI pages (home, write, journal list, entry view)
- API routes for entries CRUD
- AI analysis pipeline with Claude integration

**Files created:**
- `src/app/page.tsx` — Landing page with hierarchy visualization
- `src/app/write/page.tsx` — Journal editor
- `src/app/journal/page.tsx` — Entry list
- `src/app/journal/[id]/page.tsx` — Single entry view with analysis display
- `src/app/api/entries/route.ts` — Create/list entries
- `src/app/api/entries/[id]/route.ts` — Get/delete entry
- `src/app/api/entries/[id]/analyze/route.ts` — AI analysis endpoint
- `src/lib/db.ts` — Prisma client
- `prisma/schema.prisma` — Full data model

**Current status:** Core MVP functional. Can write entries, view them, trigger AI analysis.

**Next steps:**
1. Generate Prisma client
2. Test the app locally
3. Push to GitHub
4. Add commitment tracking UI
5. Build hierarchy state visualization
6. Implement reliability score calculation

**Blockers:** None

---

## 2026-01-29 00:30 — Project Initialized

**What happened:**
- Created local workspace: `C:\Users\n8kak\OneDrive\Desktop\enso\enso-app-temp`
- Initialized git repo
- Created GitHub repo: https://github.com/n8kako/enso-app
- Set up initial documentation structure

**Files created:**
- `README.md` — Project overview and vision
- `DEVLOG.md` — This file (development continuity)
- `docs/VISION.md` — Detailed product vision
- `docs/ARCHITECTURE.md` — Technical architecture

**Current status:** Foundation complete, moved to implementation.

**Blockers:** None

**Notes from Nathan:**
> "The hierarchy would be somewhat like the obsidian vault we have now, storing all the information from bottom to top. The main part of the app would be the journal, which would an AI would be watching over, logging, storing, thinking. It would extrapolate useful insights and commitments to make based on where it thinks you should be focusing on in the pyramid."

Key insight: The existing Obsidian vault structure (BODY, MIND, GROW, LIFE, PEOPLE) maps roughly to hierarchy levels. We're not starting from zero — we're formalizing what already works.

---

## How to Resume Work

When picking up this project:

1. **Read this file first** — understand where we left off
2. **Check the "Next steps"** from the last entry
3. **Review recent commits** — `git log --oneline -10`
4. **Continue building** — don't restart, continue

If confused about vision or direction, ask Nathan. But default to building.

---

## Architecture Decisions Log

### ADR-001: Tech Stack (2026-01-29)
**Decision:** Next.js 14 + TypeScript + Tailwind + Prisma + PostgreSQL + Claude API
**Rationale:** 
- Next.js gives us full-stack in one framework (fast iteration)
- TypeScript for reliability as complexity grows
- Tailwind for rapid UI without design debt
- Prisma for type-safe database access
- PostgreSQL scales, SQLite for local dev
- Claude API because we're already in the Anthropic ecosystem

### ADR-002: Journal-First Architecture (2026-01-29)
**Decision:** Journal entries are the primary data source; everything else derives from them
**Rationale:**
- Users shouldn't manage hierarchy levels manually
- AI extracts structure from natural writing
- Reduces friction to zero — just write
- Matches how the Obsidian vault already works

---

## Questions for Nathan (when stuck)

*Add questions here. Nathan will answer when he checks in.*

1. *(none yet)*

---

*Last updated: 2026-01-29 00:30 EST*
