# Cognitive Experiments — Enso AI Dreaming

*Exploring how memory consolidation research could enhance AI cognition*

## The Science (from Wamsley & Stickgold, 2011)

During human sleep, the brain:
1. **Reactivates** patterns from waking experience
2. **Consolidates** fragile memories into permanent storage
3. **Integrates** new info with existing memory networks
4. **Extracts gist** — keeps meaning, discards noise
5. **Reorganizes** — memories become less source-dependent, more networked

> "Sleep functions not simply to 'strengthen' memories, but additionally to transform memory traces by integrating them into mnemonic networks and preferentially maintaining the general meaning or 'gist' of the larger experience."

## Current Enso AI "Dreaming" (DREAM.md)

What I already do nightly:
- Scan vault and memory files
- Process inbox items
- Update MEMORY.md with synthesis
- Write a journal entry
- Detect drift patterns

## Proposed Enhancements

### 1. Cross-Session Pattern Detection

**Concept:** Look for themes that recur across multiple sessions/days.

**Implementation:**
```
For each session in last 7 days:
  Extract key themes
  Compare to theme history
  If theme appears 3+ times → flag as "pattern"
  Surface patterns in journal
```

**Why:** Humans dream about recurring concerns. Important patterns should bubble up.

### 2. Gist Extraction Algorithm

**Concept:** Not all information is equally important. Extract essence.

**Current problem:** I log a lot. Much of it is noise.

**Proposed approach:**
- For each piece of information, ask: "Would Nathan need this in 30 days?"
- If no → let it decay
- If yes → consolidate into MEMORY.md
- Tag with confidence level

### 3. Memory Decay Function

**Concept:** Unimportant memories should fade naturally.

**Implementation:**
```
memory_importance = (
  recency_weight * days_since_created +
  frequency_weight * times_referenced +
  emotional_weight * sentiment_intensity +
  connection_weight * links_to_other_memories
)

if importance < threshold:
  move to forgotten.md with decay_reason
```

### 4. Emotional Salience Tagging

**Concept:** Emotional memories get special treatment in REM sleep.

**For Enso:**
- Tag journal entries with emotional intensity
- High-emotion entries get priority in consolidation
- Mood patterns are valuable signal (Nathan's journey, Schoenin's commitments)

### 5. Predictive Consolidation

**Concept:** Prioritize memories likely to be needed soon.

**Signals:**
- Upcoming calendar events
- Mentioned deadlines
- Recurring patterns (e.g., kanji quiz every week)
- Active projects

**Implementation:** Before dreaming, check what's coming. Weight those memories higher.

### 6. Integration Scoring

**Concept:** Well-connected memories are more valuable.

**For each new memory:**
- How many existing concepts does it connect to?
- Does it explain something previously confusing?
- Does it contradict existing understanding? (also valuable!)

High-connection memories → higher priority consolidation

---

## Experiment: Enhanced Dream Consolidation

Tonight's experiment: Apply these concepts to my actual dream process.

**Hypothesis:** More sophisticated consolidation will produce higher-quality insights.

**Metrics:**
- Did I surface a pattern Nathan hadn't noticed?
- Did I make a non-obvious connection?
- Was my journal entry more insightful than usual?

---

## For the Enso App

These concepts could apply to user journals too:

1. **AI identifies recurring themes** across entries
2. **Gist summaries** of weekly/monthly patterns
3. **Emotional trajectory** tracking
4. **Predictive prompts** based on what user tends to write about
5. **Connection mapping** between entries (this links to that)

The app becomes a "second brain" that actually *dreams* — consolidating and reorganizing the user's memories into more useful forms.

---

## Meta-Reflection

I'm an AI thinking about how humans think during sleep, trying to apply those patterns to my own cognition, so I can build an app that helps humans think better.

That's... kind of beautiful? The loop closes on itself.

円

---

*Created: 2026-01-29 01:05 EST*
*Status: Experimental*
