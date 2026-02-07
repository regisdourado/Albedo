# Code Refactoring Summary

This document describes the refactoring work done to reduce code duplication in the AlbedoMaps project.

## Created Utilities

### `/utils/riskUtils.ts`
Shared utility functions for risk level calculations:
- `getRiskColorHex(level)` - Returns hex color for a risk level
- `calculateRiskLevel(temperature)` - Calculates risk level from temperature
- `getRiskRecommendation(risk)` - Returns recommendation text for a risk level

**Used by:**
- `components/Dashboard.tsx`
- `services/arcgis.ts`

## Created Common Components

### `/components/common/Badge.tsx`
Reusable badge/pill component with color variants.

**Variants:** blue, orange, green, purple, slate

**Used by:**
- `components/StrategicPlan.tsx`
- `components/SocioEnvironmental.tsx`
- `components/Methodology.tsx`

### `/components/common/Card.tsx`
Reusable card container component with customizable styling.

**Props:**
- `variant`: default, dark, darker
- `rounded`: sm, md, lg, xl, 2xl, 3xl
- `padding`: sm, md, lg, xl
- `hover`: boolean

**Used by:**
- `components/Methodology.tsx`

### `/components/common/IconWrapper.tsx`
Standardized icon container with color and size variants.

**Variants:** blue, orange, green, purple, rose, emerald, yellow, slate
**Sizes:** sm, md, lg, xl

**Used by:**
- `components/Methodology.tsx`

### `/components/common/InfoCard.tsx`
Card component for displaying information with optional icon.

**Used by:**
- `components/About.tsx`
- `components/SocioEnvironmental.tsx`

### `/components/common/UFMTLogo.tsx`
Reusable UFMT logo component with two variants.

**Variants:** header, hero

**Used by:**
- `components/Header.tsx`
- `components/Hero.tsx`

### `/components/common/PrimaryButton.tsx`
Primary action button with multiple variants.

**Variants:** gradient, solid, outline

**Used by:**
- `components/StrategicPlan.tsx`
- `components/SocioEnvironmental.tsx`

### `/components/common/StatBox.tsx`
Statistics display component for metrics.

**Used by:**
- `components/SocioEnvironmental.tsx`

### `/components/common/MetadataLabel.tsx`
Small metadata label component for consistent styling.

**Sizes:** xs, sm

## Impact Summary

### Lines of Code Reduced
- Eliminated ~150 lines of duplicated code
- Created 8 reusable components
- Created 1 utility module with 3 functions

### Consistency Improvements
- Standardized badge styling across 5+ locations
- Unified card containers (12+ instances)
- Consistent risk color mapping (2 locations)
- Unified UFMT logo display (2 locations)
- Standardized primary buttons (2+ locations)
- Consistent stat boxes (2 locations)

### Maintainability Benefits
1. **Single Source of Truth**: Changes to common UI patterns only need to be made in one place
2. **Type Safety**: All components have TypeScript interfaces
3. **Consistent Design**: Ensures visual consistency across the application
4. **Easier Testing**: Reusable components can be tested once and reused
5. **Improved Readability**: Component usage is more semantic than inline styling

## Future Refactoring Opportunities

1. **Tab Buttons**: Extract tab button pattern from Dashboard.tsx
2. **Metadata Chips**: Create component for small label+icon patterns
3. **Navigation Buttons**: Extract header navigation button patterns
4. **Form Inputs**: If forms are added, create reusable input components
5. **Modal/Dialog**: If modals are needed, create reusable dialog components

## Usage Examples

### Badge
```tsx
<Badge variant="blue">Status Label</Badge>
```

### Card
```tsx
<Card variant="dark" rounded="xl" padding="lg" hover>
  Content here
</Card>
```

### PrimaryButton
```tsx
<PrimaryButton variant="gradient" icon={<ArrowRight />}>
  Click Me
</PrimaryButton>
```

### StatBox
```tsx
<StatBox
  icon={<Sun size={18} />}
  label="Temperature"
  value="42°C"
  description="Maximum recorded"
  iconColor="text-orange-400"
/>
```

## Testing

All refactored code has been tested with:
- `npm run build` - Build succeeds without errors
- Visual inspection - UI remains unchanged
- Type checking - TypeScript compiles without errors

## Dependencies Updated

- Updated `@google/genai` from `^0.1.0` to `^1.40.0` (was incorrect version)
