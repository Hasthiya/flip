# flip-clock

A fully self-contained, customizable flip clock countdown React component with realistic 3D flip-card animations.

## Install

```bash
npm install flip-clock
# or
pnpm add flip-clock
# or
yarn add flip-clock
```

## Usage

```tsx
import FlipClock from "flip-clock";

// Basic: countdown to a date (defaults to ~88 days from now if omitted)
<FlipClock targetDate={new Date("2026-12-31T00:00:00")} />

// Custom style
<FlipClock
  targetDate={new Date("2027-01-01")}
  cardStyle={{ background: "#1e1e2e", backgroundDark: "#181825" }}
  digitStyle={{ color: "#cba6f7", fontSize: "4rem" }}
  labelStyle={{ color: "#a6adc8" }}
  animation={{ bounceIntensity: 12, flipDuration: 400 }}
  separator={{ type: "colon", color: "#cba6f7" }}
  onComplete={() => console.log("Done!")}
/>
```

All props are optional. See the TypeScript types (`FlipClockProps`, `FlipCardStyle`, `FlipDigitStyle`, `FlipLabelStyle`, `FlipAnimationConfig`, etc.) for full customization.

**Recommended fonts:** The default digit font is `'Bebas Neue'` and the default label font is `'Inter'`. Load these in your app (e.g. via Google Fonts or `next/font`) for the intended look, or override with `digitStyle.fontFamily` and `labelStyle.fontFamily`.

### Next.js

FlipClock uses the DOM and React hooks. Use it inside a **Client Component**:

```tsx
"use client";
import FlipClock from "flip-clock";

export default function Page() {
  return <FlipClock targetDate={new Date("2027-01-01")} />;
}
```

## License

MIT
