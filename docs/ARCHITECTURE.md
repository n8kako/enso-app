# Enso App — Technical Architecture

## Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT                                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Journal   │  │  Dashboard  │  │   Settings  │         │
│  │   Editor    │  │  (Insights) │  │             │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      NEXT.JS API                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Entries   │  │   Analysis  │  │    Users    │         │
│  │   CRUD      │  │   Pipeline  │  │    Auth     │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
      ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
      │  PostgreSQL │ │  Claude API │ │    Redis    │
      │  (Primary)  │ │  (Analysis) │ │   (Cache)   │
      └─────────────┘ └─────────────┘ └─────────────┘
```

## Data Model

### Core Entities

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  entries       Entry[]
  commitments   Commitment[]
  insights      Insight[]
  hierarchyState HierarchyState?
}

model Entry {
  id            String    @id @default(cuid())
  userId        String
  user          User      @relation(fields: [userId], references: [id])
  
  content       String    @db.Text
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  // AI-extracted metadata
  analysis      EntryAnalysis?
  commitments   Commitment[]
  needsSignals  NeedsSignal[]
}

model EntryAnalysis {
  id            String    @id @default(cuid())
  entryId       String    @unique
  entry         Entry     @relation(fields: [entryId], references: [id])
  
  summary       String?   @db.Text
  mood          String?   // extracted emotional state
  themes        String[]  // key topics
  
  createdAt     DateTime  @default(now())
}

model Commitment {
  id            String    @id @default(cuid())
  userId        String
  user          User      @relation(fields: [userId], references: [id])
  entryId       String?
  entry         Entry?    @relation(fields: [entryId], references: [id])
  
  description   String
  dueDate       DateTime?
  status        CommitmentStatus @default(ACTIVE)
  completedAt   DateTime?
  
  hierarchyLevel HierarchyLevel
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

enum CommitmentStatus {
  ACTIVE
  COMPLETED
  MISSED
  CANCELLED
}

model NeedsSignal {
  id            String    @id @default(cuid())
  entryId       String
  entry         Entry     @relation(fields: [entryId], references: [id])
  
  level         HierarchyLevel
  strength      Float     // 0-1, how strongly this level appears
  context       String?   // relevant excerpt
  
  createdAt     DateTime  @default(now())
}

enum HierarchyLevel {
  PHYSIOLOGICAL
  SAFETY
  BELONGING
  ESTEEM
  SELF_ACTUALIZATION
}

model HierarchyState {
  id            String    @id @default(cuid())
  userId        String    @unique
  user          User      @relation(fields: [userId], references: [id])
  
  // Current assessed state per level (0-100)
  physiological Float     @default(50)
  safety        Float     @default(50)
  belonging     Float     @default(50)
  esteem        Float     @default(50)
  selfActualization Float @default(50)
  
  // Reliability scores per level
  reliabilityPhysiological Float @default(0)
  reliabilitySafety        Float @default(0)
  reliabilityBelonging     Float @default(0)
  reliabilityEsteem        Float @default(0)
  reliabilitySelfActualization Float @default(0)
  
  updatedAt     DateTime  @updatedAt
}

model Insight {
  id            String    @id @default(cuid())
  userId        String
  user          User      @relation(fields: [userId], references: [id])
  
  type          InsightType
  content       String    @db.Text
  relevance     Float     // 0-1, how relevant/important
  surfacedAt    DateTime?
  dismissedAt   DateTime?
  
  createdAt     DateTime  @default(now())
}

enum InsightType {
  PATTERN        // recurring behavior noticed
  DRIFT          // moving away from stated goals
  FOUNDATION     // lower hierarchy needs attention
  CELEBRATION    // positive progress to acknowledge
  COMMITMENT     // upcoming or missed commitment
}
```

## AI Pipeline

### Entry Analysis Flow

```
Entry Created
      │
      ▼
┌─────────────────┐
│  Parse Entry    │  ← Extract raw text, metadata
└─────────────────┘
      │
      ▼
┌─────────────────┐
│  Claude API     │  ← Structured extraction prompt
│  Analysis       │
└─────────────────┘
      │
      ├──► Summary + Mood + Themes
      ├──► Commitments (explicit + implicit)
      ├──► Needs Signals (which hierarchy levels)
      │
      ▼
┌─────────────────┐
│  Store Results  │  ← EntryAnalysis, Commitments, NeedsSignals
└─────────────────┘
      │
      ▼
┌─────────────────┐
│  Update State   │  ← Recalculate HierarchyState
└─────────────────┘
      │
      ▼
┌─────────────────┐
│  Generate       │  ← Check for patterns, create Insights
│  Insights       │
└─────────────────┘
```

### Claude Prompt Structure

```typescript
const ENTRY_ANALYSIS_PROMPT = `
Analyze this journal entry and extract structured information.

Entry:
"""
{entry_content}
"""

Return JSON with:
{
  "summary": "1-2 sentence summary",
  "mood": "primary emotional state",
  "themes": ["theme1", "theme2"],
  "commitments": [
    {
      "description": "what they committed to",
      "explicit": true/false,
      "hierarchyLevel": "PHYSIOLOGICAL|SAFETY|BELONGING|ESTEEM|SELF_ACTUALIZATION",
      "dueDate": "ISO date if mentioned, null otherwise"
    }
  ],
  "needsSignals": [
    {
      "level": "PHYSIOLOGICAL|SAFETY|BELONGING|ESTEEM|SELF_ACTUALIZATION",
      "strength": 0.0-1.0,
      "context": "relevant excerpt"
    }
  ]
}

Guidelines:
- Commitments can be explicit ("I will...") or implicit ("I need to...")
- Needs signals indicate which hierarchy level the entry touches
- Strength indicates how prominently that level appears
- Be conservative with commitments - only extract clear intentions
`;
```

## API Routes

```
POST   /api/entries          Create new entry
GET    /api/entries          List entries (paginated)
GET    /api/entries/:id      Get single entry with analysis
DELETE /api/entries/:id      Delete entry

GET    /api/commitments      List commitments (filterable)
PATCH  /api/commitments/:id  Update commitment status

GET    /api/hierarchy        Get current hierarchy state
GET    /api/insights         Get insights (unsurfaced first)
PATCH  /api/insights/:id     Mark insight as surfaced/dismissed

GET    /api/stats            Reliability scores, trends
```

## File Structure

```
EnsoApp/
├── README.md
├── DEVLOG.md
├── docs/
│   ├── VISION.md
│   ├── ARCHITECTURE.md
│   └── HIERARCHY.md
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Landing/Dashboard
│   │   ├── journal/
│   │   │   ├── page.tsx          # Journal list
│   │   │   └── [id]/page.tsx     # Single entry view
│   │   ├── write/
│   │   │   └── page.tsx          # New entry editor
│   │   └── api/
│   │       ├── entries/
│   │       ├── commitments/
│   │       ├── hierarchy/
│   │       └── insights/
│   ├── components/
│   │   ├── Editor.tsx
│   │   ├── HierarchyViz.tsx
│   │   ├── InsightCard.tsx
│   │   └── ...
│   ├── lib/
│   │   ├── db.ts                 # Prisma client
│   │   ├── ai.ts                 # Claude integration
│   │   └── analysis.ts           # Analysis pipeline
│   └── types/
│       └── index.ts
├── prisma/
│   └── schema.prisma
├── package.json
├── tsconfig.json
└── tailwind.config.js
```

## Development Phases

### Phase 1: Core (Current Target)
- [x] Project setup
- [ ] Database schema
- [ ] Basic journal CRUD
- [ ] Entry editor component
- [ ] AI analysis pipeline
- [ ] Simple dashboard

### Phase 2: Intelligence
- [ ] Commitment tracking UI
- [ ] Reliability calculation
- [ ] Insight generation
- [ ] Proactive surfacing

### Phase 3: Polish
- [ ] Authentication
- [ ] Mobile responsive
- [ ] Export/import
- [ ] Settings

---

*Architecture evolves. Update this doc as decisions change.*
