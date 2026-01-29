# Reliability Score — Design Document

## The Core Insight

> Actions speak louder than intentions.

People make commitments all the time. Some they keep. Many they don't. The pattern of kept vs broken commitments reveals something true about a person — not to judge them, but to help them see themselves clearly.

## What We're Measuring

**Reliability = Commitments Kept / Commitments Made**

But it's more nuanced than that:

1. **By hierarchy level** — Are you more reliable about exercise (Physiological) or relationships (Belonging)?
2. **By time frame** — Are you better at daily habits or long-term goals?
3. **By commitment type** — Explicit ("I will...") vs implicit ("I should...") vs aspirational ("I want to...")
4. **Trend over time** — Are you getting more or less reliable?

## Commitment Lifecycle

```
Made → Tracked → Due → Evaluated → Completed | Missed | Modified
```

### Detection

AI extracts commitments from journal entries:

**Explicit:**
- "I will run tomorrow"
- "I'm going to cut out sugar"
- "Tomorrow I'm shutting it down at 10:30"

**Implicit:**
- "I need to study for the exam"
- "I should call mom"
- "I have to finish that project"

**Aspirational:**
- "I want to wake up at 7am"
- "I'd like to read more"
- "My goal is to journal daily"

### Tracking

Each commitment has:
- `description` — What was committed
- `created_at` — When commitment was made
- `due_at` — When it should happen (explicit or inferred)
- `level` — Hierarchy level (Physiological, Safety, etc.)
- `type` — explicit / implicit / aspirational
- `source_entry_id` — Which journal entry it came from

### Evaluation

How do we know if a commitment was kept?

**Option A: User marks complete** (friction, but accurate)
**Option B: AI infers from future entries** (magic, but uncertain)
**Option C: Ask at follow-up** ("Yesterday you said X. Did you do it?")

**Proposed: Hybrid approach**
1. AI scans future entries for evidence of completion
2. If confident → auto-mark
3. If uncertain → surface at daily prompt: "Did you [X]?"
4. User can always correct

## Calculating the Score

### Per-Level Reliability

```
reliability_level = completed[level] / total[level]
```

Gives you a breakdown:
- Physiological: 72%
- Safety: 65%
- Belonging: 48%
- Esteem: 55%
- Purpose: 40%

### Time-Weighted Reliability

Recent commitments matter more than old ones:

```
weight = e^(-days_since_due / half_life)
reliability_weighted = Σ(completed * weight) / Σ(weight)
```

With `half_life = 30 days`, a commitment from yesterday weighs more than one from last month.

### Commitment Type Weighting

Should we weight explicit commitments more heavily than aspirational ones?

**Argument for:** Explicit = higher intent = breaking hurts more
**Argument against:** That punishes people for being concrete

**Proposed:** Track separately. Show both:
- "Promise reliability: 65%"
- "Aspiration follow-through: 35%"

### Streak Bonuses (Optional, Use Sparingly)

Consecutive days of kept commitments could have slight multiplier effect. But be careful — gamification can backfire.

## Surfacing Insights

The score itself isn't the point. The insights are.

### Pattern Recognition

"You're 85% reliable with morning commitments but only 45% with evening ones. Consider front-loading important things."

"Last 3 commitments about exercise were missed. Physiological might need attention."

"Your reliability drops significantly on Mondays. What happens over the weekend?"

### Foundation Alerts

If lower hierarchy levels have low reliability, surface it:

"Your Purpose reliability (40%) is higher than Physiological (25%). The foundation might be cracking."

### Positive Reinforcement

Not just failures — celebrate patterns of consistency:

"You've kept every commitment about [X] for 3 weeks straight."

## UI Considerations

### Don't Make It Feel Like Judgment

- Framing: "This is a mirror, not a scoreboard"
- Never use red for low scores
- Always show trend, not just snapshot
- Celebrate improvement, not perfection

### Optional Visibility

Users should control:
- Whether to see their score at all
- Whether to track certain commitment types
- Whether to share any of this socially

### Social Accountability (Future)

In group contexts, reliability becomes interesting:
- "As a team, we're 62% reliable on our shared commitments"
- "Your family's Belonging reliability has increased 15% this month"

But privacy is paramount. Opt-in only.

## Implementation Notes

### Database Schema (already in place)

```prisma
model Commitment {
  id          String
  userId      String
  entryId     String?
  description String
  dueDate     DateTime?
  status      String  // ACTIVE, COMPLETED, MISSED, CANCELLED
  completedAt DateTime?
  level       String  // hierarchy level
  explicit    Boolean
}
```

### API Endpoints Needed

```
GET  /api/reliability              — Overall score
GET  /api/reliability/by-level     — Breakdown by hierarchy
GET  /api/reliability/trend        — Score over time
POST /api/commitments/:id/complete — Mark complete
POST /api/commitments/:id/miss     — Mark missed
```

### AI Analysis Extension

Add to journal analysis prompt:
- Scan for evidence of prior commitment completion
- Extract new commitments
- Infer commitment fulfillment from context

---

## Open Questions

1. **Grace periods?** If someone said "I'll run tomorrow" and runs the day after, is that a miss?

2. **Partial completion?** "I'll study for 2 hours" but only did 1 hour.

3. **Circumstances?** User got sick and couldn't run. Is that a miss?

4. **Self-report bias?** People might mark things complete when they didn't really finish.

5. **What's a "good" score?** Should we avoid implying 100% is the goal?

---

## Philosophy

The reliability score should feel like:
- A flashlight, not a spotlight
- A compass, not a judge
- A friend who remembers what you said

> "I'm not tracking you. I'm helping you track yourself."

---

*Created: 2026-01-29*
*Status: Design Draft*
