# Mobile UI Recommendations for Enso

*Research compiled 2026-01-29*

## Core Principle

> **"Functional minimalism meets contextual intelligence"**

Every UI element should either:
1. Help capture thoughts quickly (journal entry)
2. Surface meaningful patterns (AI insights)
3. Enable reflection (hierarchy/timeline navigation)

If it doesn't serve one of these three goals, remove it.

---

## 1. Navigation Architecture

**Bottom Navigation over Hamburger Menu**
- For apps with 3-5 core screens, bottom navigation significantly outperforms hamburger menus
- Keeps key actions within thumb reach (one-handed use critical for journaling)

**Recommendation for Enso** - Bottom nav with 3-4 items max:
- Journal/Today (FAB for quick entry)
- Timeline/History
- Insights/AI Analysis
- Settings/Profile

---

## 2. Text Editor Best Practices

### Typography
- **Body text**: 16px minimum (golden standard for mobile readability)
- **Line height**: 1.5x spacing for optimal breathing room
- **Line length**: 30-50 characters per line on mobile screens
- **Dynamic Type support**: Respect iOS/Android system font sizing

### Editor Features
- Minimal toolbar, progressive disclosure of formatting options
- Auto-save with visual confirmation (subtle microinteraction)
- Pull-to-refresh to sync entries
- Distraction-free writing mode (hide all UI except text)

---

## 3. Gesture Patterns for Journaling

**Essential Swipe Actions:**
- **Swipe left on entry**: Quick actions (archive, delete, favorite)
- **Swipe right on entry**: View full entry or navigate chronologically
- **Pull-to-refresh**: Sync latest entries/AI insights
- **Long-press**: Multi-select mode for batch operations
- **Pinch-to-zoom timeline**: Explore hierarchy visualization

**Pro tip**: Limit swipe actions to 1-2 essential tasks to prevent accidental triggers

---

## 4. UI Pattern Recommendations

### Floating Action Button (FAB)
- Primary action: "New Entry" always accessible
- Position: Bottom-right, consistent across all screens
- Reinforces the core behavior loop

### Progressive Onboarding
- Don't overwhelm on first launch
- Introduce AI analysis and hierarchy features contextually (after 2-3 entries)
- Use empty states effectively: "Start your first entry" with gentle prompts

### Microinteractions for Delight
- Subtle animations (<300ms) on entry save
- Haptic feedback on swipe completion
- Loading state animations for AI analysis processing

---

## 5. Typography & Spacing

### Font Sizing Hierarchy
| Element | Size |
|---------|------|
| Body text | 16px (1rem) |
| Entry titles | 20-24px (1.25-1.5rem) |
| Metadata (date, mood, tags) | 14px (0.875rem) |
| Headers | 28-32px (1.75-2rem) |

### Spacing
- Minimum touch targets: 44x44px (iOS) / 48x48px (Android)
- Breathing room: 16-24px padding around text blocks
- Generous line-height (1.5-1.6) for long-form journal text

### Color & Contrast
- 4.5:1 contrast ratio minimum (WCAG AA)
- Don't rely on color alone for status (use icons + labels)
- **Dark mode support crucial for nighttime journaling**

---

## 6. Enso-Specific Recommendations

### AI Analysis Integration
- Use contextual in-app messaging to surface insights
- Present AI findings as cards that can be dismissed/saved
- Progress indicators for analysis processing
- Empty state when no patterns detected yet

### Hierarchy Visualization
- Personalized dashboard pattern for main screen
- Modular UI: Users can rearrange insight cards
- Pinch-to-zoom or tap-to-expand for detailed trees
- Visual weight: Most important insights get larger cards

### Minimal, Clean Aesthetic
- Embrace whitespace (negative space = clarity)
- Limit to 2-3 colors + neutrals
- Each screen should have ONE primary action
- Use system defaults where possible

---

## 7. Primary UX Flow

```
Open app
    → See inspiring prompt/insight
    → Tap FAB
    → Write
    → Save with satisfying microinteraction
    → View updated hierarchy
    → Close app feeling accomplished
```

This creates a habit loop optimized for mobile: **Fast → Meaningful → Rewarding**

---

## Implementation Priority

1. **P0**: Bottom navigation, FAB for new entry, clean editor
2. **P1**: Dark mode, proper typography hierarchy, touch targets
3. **P2**: Swipe gestures on entries, microinteractions
4. **P3**: Progressive onboarding, insight cards
