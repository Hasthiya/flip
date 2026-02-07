# @hasthiya_/flip-clock

A customizable flip clock countdown for React with realistic 3D flip-card animations.

**Live demo and docs:** [Showcase site](https://your-showcase-url.com) — [Demo](https://your-showcase-url.com/demo) · [Docs](https://your-showcase-url.com/docs) · [Examples](https://your-showcase-url.com/examples).

![FlipClock demo](./screenshot.png)

## Install

```bash
npm install @hasthiya_/flip-clock
# or
pnpm add @hasthiya_/flip-clock
# or
yarn add @hasthiya_/flip-clock
```

## Basic usage

```tsx
import FlipClock from "@hasthiya_/flip-clock";

<FlipClock targetDate={new Date("2026-12-31T00:00:00")} />
```

In Next.js, use it inside a Client Component (`"use client"`).

## Props overview

| Prop | Description |
|------|-------------|
| `targetDate` | Target date to count down to (default: ~88 days from now) |
| `staticTime` | Override with static values `{ days?, hours?, minutes?, seconds? }` |
| `cardStyle` | Card appearance (background, width, height, borderRadius, etc.) |
| `digitStyle` | Digit typography (color, fontFamily, fontSize) |
| `labelStyle` | Labels (visible, color, fontFamily, fontSize) |
| `animation` | Flip animation (flipDuration, bounceIntensity, easing) |
| `separator` | Between groups: `{ type: "none" \| "colon" \| "dot" }` |
| `segments` | Which to show: `{ days?, hours?, minutes?, seconds? }` |
| `groupGap`, `cardGap`, `labelGap` | Spacing (CSS values) |
| `onComplete` | Callback when countdown reaches zero |
| `className`, `style` | Wrapper extras |

Full props table and types: see the [docs page](https://your-showcase-url.com/docs) on the showcase site.

## License

MIT
