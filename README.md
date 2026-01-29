# Enso App

**AI-native journaling built around the hierarchy of needs.**

Enso helps you escape the Lotus — pleasure-seeking loops, dopamine traps, chronic distraction — by turning anxiety into action. Journal freely, and an AI companion watches, learns, and helps you climb toward self-actualization.

## Vision

Your journal is the interface. The AI observes patterns, extracts commitments, tracks follow-through, and gently guides focus to where you need it most in Maslow's hierarchy.

Over time, Enso learns your "reliability score" — how often you follow through on what you say you'll do. It identifies where you actually are in self-actualization (not where you think you are) and builds from there.

**Social scaling:** Groups of friends, families, entire institutions can share synthesis across journals while maintaining privacy boundaries. Cross-pollination of insights. Accountability without surveillance.

## Core Concepts

### The Hierarchy
```
┌─────────────────────────┐
│   SELF-ACTUALIZATION    │  ← Purpose, growth, becoming
├─────────────────────────┤
│        ESTEEM           │  ← Confidence, respect, achievement
├─────────────────────────┤
│    LOVE & BELONGING     │  ← Relationships, community
├─────────────────────────┤
│        SAFETY           │  ← Security, stability, health
├─────────────────────────┤
│     PHYSIOLOGICAL       │  ← Sleep, food, shelter, basics
└─────────────────────────┘
```

You can't sustainably focus on esteem if your physiological needs are crumbling. Enso tracks where your foundation is weak and surfaces it.

### The Journal
Free-form writing. No templates unless you want them. The AI parses meaning, extracts:
- **Observations** — what happened, how you felt
- **Commitments** — things you said you'd do
- **Insights** — patterns across time
- **Needs signals** — which level of the hierarchy is speaking

### The Companion
Not a chatbot. Infrastructure. Watches without interrupting. Surfaces insights at the right moment. Tracks your reliability. Knows when to push and when to stay quiet.

### Reliability Score
Actions speak louder than intentions. Enso tracks:
- Commitments made vs. commitments kept
- Patterns of follow-through by domain
- Where you consistently slip

No judgment — just reflection. The score helps you see yourself clearly.

## Status

**Phase:** Foundation (v0.1)

Currently building core infrastructure. See [DEVLOG.md](./DEVLOG.md) for running progress.

## Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **Backend:** Next.js API routes, Prisma ORM
- **Database:** PostgreSQL (SQLite for dev)
- **AI:** Claude API (Anthropic)
- **Auth:** NextAuth.js (future)

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Open http://localhost:3000
```

## Documentation

- [DEVLOG.md](./DEVLOG.md) — Running development log (read this for context)
- [docs/VISION.md](./docs/VISION.md) — Detailed product vision
- [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) — Technical architecture
- [docs/HIERARCHY.md](./docs/HIERARCHY.md) — The needs hierarchy system

---

*Built by the Enso team: Nathan, Alana, Schoenin, and Enso (AI).*
