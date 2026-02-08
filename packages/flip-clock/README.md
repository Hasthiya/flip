# @hasthiya_/flip-clock

A customizable flip clock countdown for React with realistic 3D flip-card animations.

[![npm version](https://img.shields.io/npm/v/@hasthiya_/flip-clock)](https://www.npmjs.com/package/@hasthiya_/flip-clock)
[![license](https://img.shields.io/npm/l/@hasthiya_/flip-clock)](./LICENSE)

**Live Demo:** [flip-clock-livid.vercel.app](https://flip-clock-livid.vercel.app) | [Demo](https://flip-clock-livid.vercel.app/demo) | [Docs](https://flip-clock-livid.vercel.app/docs) | [Examples](https://flip-clock-livid.vercel.app/examples)


## Features

- Countdown to any target date or display static time values
- Fully customizable card colors, digit fonts, labels, separators, and animations
- Smooth 3D flip-card effect with configurable bounce
- Zero CSS dependencies — all styles are inline
- Lightweight with React as the only peer dependency
- Responsive-ready with scale and orientation props

## Installation

```bash
npm install @hasthiya_/flip-clock
# or
pnpm add @hasthiya_/flip-clock
# or
yarn add @hasthiya_/flip-clock
```

## Basic Usage

```tsx
import FlipClock from "@hasthiya_/flip-clock";

<FlipClock targetDate={new Date("2026-12-31T00:00:00")} />
```

> **Note:** In Next.js, use it inside a Client Component (`"use client"`).

## Examples

### Custom Styling

```tsx
<FlipClock
  targetDate={deadline}
  cardStyle={{
    background: "#1e1e2e",
    backgroundDark: "#181825",
    borderRadius: "1rem",
  }}
  digitStyle={{
    color: "#cba6f7",
    fontFamily: "monospace",
    fontSize: "4rem",
  }}
  labelStyle={{ color: "#a6adc8", fontSize: "0.75rem" }}
  animation={{ bounceIntensity: 15, flipDuration: 400 }}
  separator={{ type: "colon", color: "#cba6f7" }}
  groupGap="2rem"
  onComplete={() => console.log("Done!")}
/>
```

### Static Display

```tsx
<FlipClock
  staticTime={{ days: 12, hours: 8, minutes: 45, seconds: 30 }}
  segments={{ days: false, hours: true, minutes: true, seconds: true }}
/>
```

### Responsive with Scale

```tsx
<FlipClock
  targetDate={myDate}
  scale={0.75}
  orientation="column"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `targetDate` | `Date` | 88 days from now | The target date to count down to |
| `staticTime` | `{ days?, hours?, minutes?, seconds? }` | — | Override with static values (disables auto-tick) |
| `cardStyle` | `FlipCardStyle` | — | Card appearance: `background`, `backgroundDark`, `width`, `height`, `borderRadius`, `boxShadow` |
| `digitStyle` | `FlipDigitStyle` | — | Digit typography: `color`, `fontFamily`, `fontSize`, `textShadow` |
| `labelStyle` | `FlipLabelStyle` | — | Label config: `visible`, `color`, `fontFamily`, `fontSize`, `fontWeight`, `letterSpacing`, `textTransform` |
| `lineStyle` | `FlipLineStyle` | — | Horizontal divider line: `color`, `height` |
| `animation` | `FlipAnimationConfig` | — | Animation config: `flipDuration`, `bounceIntensity`, `flipDownEasing`, `flipUpEasing` |
| `separator` | `FlipSeparatorConfig` | `none` | Separator between groups: `type` (`'none'` \| `'colon'` \| `'dot'`), `color`, `size` |
| `labels` | `FlipClockLabels` | — | Custom label text: `days`, `hours`, `minutes`, `seconds` |
| `segments` | `FlipClockSegments` | all `true` | Which segments to display: `days`, `hours`, `minutes`, `seconds` |
| `dayDigits` | `number` | `2` | Number of digits for the days display |
| `groupGap` | `string` | `'3rem'` | Gap between time groups (CSS value) |
| `cardGap` | `string` | `'0.375rem'` | Gap between individual digit cards (CSS value) |
| `labelGap` | `string` | `'1rem'` | Gap between cards and the label (CSS value) |
| `onComplete` | `() => void` | — | Callback fired when countdown reaches zero |
| `orientation` | `'row'` \| `'column'` | `'row'` | Layout direction: row (horizontal) or column (stacked) |
| `scale` | `number` | `1` | Scale factor for the whole clock (e.g., `0.8` for 80% size) |
| `className` | `string` | — | Additional className for the outer wrapper |
| `style` | `CSSProperties` | — | Additional inline style for the outer wrapper |

### Style Configuration Types

#### FlipCardStyle

| Property | Type | Default |
|----------|------|---------|
| `background` | `string` | `'#575757'` |
| `backgroundDark` | `string` | `'#4a4a4a'` |
| `width` | `string` | `'7rem'` |
| `height` | `string` | `'9.5rem'` |
| `borderRadius` | `string` | `'0.5rem'` |
| `boxShadow` | `string` | `'0 3px 8px rgba(0,0,0,0.25)'` |

#### FlipDigitStyle

| Property | Type | Default |
|----------|------|---------|
| `color` | `string` | `'#ffffff'` |
| `fontFamily` | `string` | `"'Bebas Neue', sans-serif"` |
| `fontSize` | `string` | `'5.5rem'` |
| `textShadow` | `string` | `'none'` |

#### FlipLabelStyle

| Property | Type | Default |
|----------|------|---------|
| `visible` | `boolean` | `true` |
| `color` | `string` | `'#999999'` |
| `fontFamily` | `string` | `"'Inter', sans-serif"` |
| `fontSize` | `string` | `'0.9rem'` |
| `fontWeight` | `string` | `'500'` |
| `letterSpacing` | `string` | `'0.2em'` |
| `textTransform` | `CSSProperties['textTransform']` | `'uppercase'` |

#### FlipAnimationConfig

| Property | Type | Default |
|----------|------|---------|
| `flipDuration` | `number` | `300` (ms) |
| `bounceIntensity` | `number` | `8` (degrees) |
| `flipDownEasing` | `string` | `'ease-in'` |
| `flipUpEasing` | `string` | `'ease-out'` |

#### FlipSeparatorConfig

| Property | Type | Default |
|----------|------|---------|
| `type` | `'none'` \| `'colon'` \| `'dot'` | `'none'` |
| `color` | `string` | `'#999999'` |
| `size` | `string` | `'0.5rem'` |

## License

MIT
