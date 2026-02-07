/**
 * FlipClock — A fully self-contained, customizable flip clock countdown component.
 *
 * This component renders a countdown timer with realistic 3D flip-card animations.
 * It is designed to be extracted and dropped into any React + TypeScript project
 * with zero external CSS dependencies — all styles are inline.
 *
 * @example
 * ```tsx
 * // Basic usage with a target date
 * <FlipClock targetDate={new Date('2026-12-31T00:00:00')} />
 *
 * // Custom styled
 * <FlipClock
 *   targetDate={myDate}
 *   cardBackground="#1a1a2e"
 *   digitColor="#e94560"
 *   labelColor="#e94560"
 *   bounceIntensity={12}
 * />
 * ```
 *
 * @module FlipClock
 */

import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  type CSSProperties,
  type ReactNode,
} from "react";

/* ──────────────────────────────────────────────
 * Types
 * ────────────────────────────────────────────── */

/** Configuration for the flip animation timing and feel. */
export interface FlipAnimationConfig {
  /** Duration of each half-flip in milliseconds. @default 300 */
  flipDuration?: number;
  /** Bounce overshoot angle in degrees (0 = no bounce). @default 8 */
  bounceIntensity?: number;
  /** Easing function for the top flap falling. @default "ease-in" */
  flipDownEasing?: string;
  /** Easing function for the bottom flap landing. @default "ease-out" */
  flipUpEasing?: string;
}

/** Configuration for the card appearance. */
export interface FlipCardStyle {
  /** Top-half background color. @default "#575757" */
  background?: string;
  /** Bottom-half background color (slightly darker). @default "#4a4a4a" */
  backgroundDark?: string;
  /** Card width (CSS value). @default "7rem" */
  width?: string;
  /** Card height (CSS value). @default "9.5rem" */
  height?: string;
  /** Border radius (CSS value). @default "0.5rem" */
  borderRadius?: string;
  /** Box shadow (CSS value). @default "0 3px 8px rgba(0,0,0,0.25)" */
  boxShadow?: string;
}

/** Configuration for the digit typography. */
export interface FlipDigitStyle {
  /** Digit text color. @default "#ffffff" */
  color?: string;
  /** Font family for digits. @default "'Bebas Neue', sans-serif" */
  fontFamily?: string;
  /** Font size (CSS value). @default "5.5rem" */
  fontSize?: string;
  /** Text shadow (CSS value). @default "none" */
  textShadow?: string;
}

/** Configuration for the group labels (DAYS, HOURS, etc.). */
export interface FlipLabelStyle {
  /** Whether to show labels. @default true */
  visible?: boolean;
  /** Label text color. @default "#999999" */
  color?: string;
  /** Label font family. @default "'Inter', sans-serif" */
  fontFamily?: string;
  /** Label font size (CSS value). @default "0.9rem" */
  fontSize?: string;
  /** Label font weight. @default "500" */
  fontWeight?: string;
  /** Letter spacing (CSS value). @default "0.2em" */
  letterSpacing?: string;
  /** Text transform. @default "uppercase" */
  textTransform?: CSSProperties["textTransform"];
}

/** Configuration for the horizontal divider line on each card. */
export interface FlipLineStyle {
  /** Line color. @default "rgba(0,0,0,0.25)" */
  color?: string;
  /** Line height (CSS value). @default "1px" */
  height?: string;
}

/** Optional separator between groups (e.g., colon dots). */
export interface FlipSeparatorConfig {
  /** Type of separator. @default "none" */
  type?: "none" | "colon" | "dot";
  /** Separator color. @default "#999999" */
  color?: string;
  /** Separator size (CSS value). @default "0.5rem" */
  size?: string;
}

/** Custom labels for each time unit. */
export interface FlipClockLabels {
  days?: string;
  hours?: string;
  minutes?: string;
  seconds?: string;
}

/** Which time segments to display. */
export interface FlipClockSegments {
  /** Show days segment. @default true */
  days?: boolean;
  /** Show hours segment. @default true */
  hours?: boolean;
  /** Show minutes segment. @default true */
  minutes?: boolean;
  /** Show seconds segment. @default true */
  seconds?: boolean;
}

/**
 * Props for the FlipClock component.
 *
 * All props are optional and have sensible defaults that produce the
 * classic dark-card-on-light-background flip clock aesthetic.
 */
export interface FlipClockProps {
  /** The target date to count down to. @default 88 days from now */
  targetDate?: Date;

  /** Override the countdown with static values (disables auto-tick). */
  staticTime?: {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
  };

  /** Card appearance configuration. */
  cardStyle?: FlipCardStyle;

  /** Digit typography configuration. */
  digitStyle?: FlipDigitStyle;

  /** Label configuration. */
  labelStyle?: FlipLabelStyle;

  /** Horizontal divider line configuration. */
  lineStyle?: FlipLineStyle;

  /** Flip animation configuration. */
  animation?: FlipAnimationConfig;

  /** Separator between time groups. */
  separator?: FlipSeparatorConfig;

  /** Custom label text. */
  labels?: FlipClockLabels;

  /** Which segments to display. */
  segments?: FlipClockSegments;

  /** Number of digits for the days display. @default 2 */
  dayDigits?: number;

  /** Gap between time groups (CSS value). @default "3rem" */
  groupGap?: string;

  /** Gap between individual digit cards (CSS value). @default "0.375rem" */
  cardGap?: string;

  /** Gap between cards and the label (CSS value). @default "1rem" */
  labelGap?: string;

  /** Callback fired when countdown reaches zero. */
  onComplete?: () => void;

  /** Additional className for the outer wrapper. */
  className?: string;

  /** Additional inline style for the outer wrapper. */
  style?: CSSProperties;
}

/* ──────────────────────────────────────────────
 * Defaults
 * ────────────────────────────────────────────── */

const DEFAULT_CARD: Required<FlipCardStyle> = {
  background: "#575757",
  backgroundDark: "#4a4a4a",
  width: "7rem",
  height: "9.5rem",
  borderRadius: "0.5rem",
  boxShadow: "0 3px 8px rgba(0,0,0,0.25), 0 1px 3px rgba(0,0,0,0.15)",
};

const DEFAULT_DIGIT: Required<FlipDigitStyle> = {
  color: "#ffffff",
  fontFamily: "'Bebas Neue', sans-serif",
  fontSize: "5.5rem",
  textShadow: "none",
};

const DEFAULT_LABEL: Required<FlipLabelStyle> = {
  visible: true,
  color: "#999999",
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.9rem",
  fontWeight: "500",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
};

const DEFAULT_LINE: Required<FlipLineStyle> = {
  color: "rgba(0,0,0,0.25)",
  height: "1px",
};

const DEFAULT_ANIMATION: Required<FlipAnimationConfig> = {
  flipDuration: 300,
  bounceIntensity: 8,
  flipDownEasing: "ease-in",
  flipUpEasing: "ease-out",
};

const DEFAULT_SEPARATOR: Required<FlipSeparatorConfig> = {
  type: "none",
  color: "#999999",
  size: "0.5rem",
};

/* ──────────────────────────────────────────────
 * Utility: generate unique animation keyframes
 * ────────────────────────────────────────────── */

let styleInjected = false;
let currentAnimId = "";

function injectKeyframes(animation: Required<FlipAnimationConfig>) {
  const id = `fc-${animation.flipDuration}-${animation.bounceIntensity}`;
  if (typeof document === "undefined") return id;

  if (styleInjected && currentAnimId === id) return id;

  const existingEl = document.getElementById(id);
  if (existingEl) {
    styleInjected = true;
    currentAnimId = id;
    return id;
  }

  const bounce = animation.bounceIntensity;
  const halfBounce = bounce / 2;

  const css = `
    @keyframes ${id}-flip-top {
      0% { transform: rotateX(0deg); }
      100% { transform: rotateX(-90deg); }
    }
    @keyframes ${id}-flip-bottom {
      0% { transform: rotateX(90deg); }
      60% { transform: rotateX(-${bounce}deg); }
      80% { transform: rotateX(${halfBounce}deg); }
      100% { transform: rotateX(0deg); }
    }
  `;

  const styleEl = document.createElement("style");
  styleEl.id = id;
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  styleInjected = true;
  currentAnimId = id;
  return id;
}

/* ──────────────────────────────────────────────
 * Sub-component: FlipCardUnit (single digit)
 * ────────────────────────────────────────────── */

interface FlipCardUnitProps {
  digit: number;
  card: Required<FlipCardStyle>;
  digitStyle: Required<FlipDigitStyle>;
  line: Required<FlipLineStyle>;
  animation: Required<FlipAnimationConfig>;
  animId: string;
}

/**
 * Renders a single flip-card digit with a 3D flip animation
 * whenever the digit value changes.
 */
const FlipCardUnit = ({
  digit,
  card,
  digitStyle,
  line,
  animation,
  animId,
}: FlipCardUnitProps) => {
  const [currentDigit, setCurrentDigit] = useState(digit);
  const [previousDigit, setPreviousDigit] = useState(digit);
  const [isFlipping, setIsFlipping] = useState(false);
  const prevDigitRef = useRef(digit);
  const flippingToDigitRef = useRef(digit);
  const bottomFlapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prevDigitRef.current !== digit) {
      setPreviousDigit(prevDigitRef.current);
      flippingToDigitRef.current = digit;
      prevDigitRef.current = digit;
      setIsFlipping(true);
    }
  }, [digit]);

  useEffect(() => {
    if (!isFlipping) return;
    const el = bottomFlapRef.current;
    if (!el) return;

    const done = () => {
      setCurrentDigit(flippingToDigitRef.current);
      setIsFlipping(false);
    };

    const onAnimationEnd = (e: AnimationEvent) => {
      if (e.animationName.includes("flip-bottom")) {
        done();
      }
    };

    el.addEventListener("animationend", onAnimationEnd as EventListener);
    const fallback = setTimeout(done, animation.flipDuration * 2);

    return () => {
      el.removeEventListener("animationend", onAnimationEnd as EventListener);
      clearTimeout(fallback);
    };
  }, [isFlipping, animation.flipDuration]);

  const containerStyle: CSSProperties = {
    position: "relative",
    width: card.width,
    height: card.height,
    perspective: "400px",
    borderRadius: card.borderRadius,
    background: card.background,
    boxShadow: card.boxShadow,
    overflow: "hidden",
  };

  const digitCss: CSSProperties = {
    fontFamily: digitStyle.fontFamily,
    fontSize: digitStyle.fontSize,
    lineHeight: 1,
    color: digitStyle.color,
    textShadow: digitStyle.textShadow,
    userSelect: "none",
  };

  const faceBase: CSSProperties = {
    position: "absolute",
    width: "100%",
    height: "50%",
    overflow: "hidden",
    backfaceVisibility: "hidden",
    display: "flex",
    justifyContent: "center",
  };

  const topFace: CSSProperties = {
    ...faceBase,
    top: 0,
    background: card.background,
    borderRadius: `${card.borderRadius} ${card.borderRadius} 0 0`,
    alignItems: "flex-end",
  };

  const bottomFace: CSSProperties = {
    ...faceBase,
    bottom: 0,
    background: card.backgroundDark,
    borderRadius: `0 0 ${card.borderRadius} ${card.borderRadius}`,
    alignItems: "flex-start",
  };

  const lineStyle: CSSProperties = {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    height: line.height,
    background: line.color,
    zIndex: 10,
  };

  const flipTopStyle: CSSProperties = {
    ...topFace,
    transformOrigin: "bottom center",
    zIndex: 20,
    willChange: "transform",
    animation: isFlipping
      ? `${animId}-flip-top ${animation.flipDuration}ms ${animation.flipDownEasing} forwards`
      : undefined,
  };

  const flipBottomStyle: CSSProperties = {
    ...bottomFace,
    transformOrigin: "top center",
    zIndex: 20,
    transform: "rotateX(90deg)",
    willChange: "transform",
    animation: isFlipping
      ? `${animId}-flip-bottom ${animation.flipDuration}ms ${animation.flipDuration}ms ${animation.flipUpEasing} forwards`
      : undefined,
  };

  const staticTopDigit =
    !isFlipping && digit !== currentDigit ? currentDigit : digit;

  return (
    <div style={containerStyle}>
      {/* Static top half — new digit once flap covers or is gone; old only for the one pre-flip frame */}
      <div style={topFace}>
        <span style={{ ...digitCss, transform: "translateY(50%)" }}>{staticTopDigit}</span>
      </div>

      {/* Static bottom half — current (old until animation finishes) */}
      <div style={bottomFace}>
        <span style={{ ...digitCss, transform: "translateY(-50%)" }}>
          {currentDigit}
        </span>
      </div>

      {/* Divider line */}
      <div style={lineStyle} />

      {/* Animated top flap — old digit flips down */}
      {isFlipping && (
        <div style={flipTopStyle}>
          <span style={{ ...digitCss, transform: "translateY(50%)" }}>
            {previousDigit}
          </span>
        </div>
      )}

      {/* Animated bottom flap — new digit flips up */}
      {isFlipping && (
        <div ref={bottomFlapRef} style={flipBottomStyle}>
          <span style={{ ...digitCss, transform: "translateY(-50%)" }}>
            {digit}
          </span>
        </div>
      )}
    </div>
  );
};

/* ──────────────────────────────────────────────
 * Sub-component: FlipClockGroupUnit
 * ────────────────────────────────────────────── */

interface FlipClockGroupUnitProps {
  value: number;
  label: string;
  digits: number;
  card: Required<FlipCardStyle>;
  digitStyle: Required<FlipDigitStyle>;
  labelStyle: Required<FlipLabelStyle>;
  line: Required<FlipLineStyle>;
  animation: Required<FlipAnimationConfig>;
  animId: string;
  cardGap: string;
  labelGap: string;
}

/**
 * Renders a group of flip-card digits (e.g., two digits for hours)
 * with an optional label underneath.
 */
const FlipClockGroupUnit = ({
  value,
  label,
  digits,
  card,
  digitStyle,
  labelStyle,
  line,
  animation,
  animId,
  cardGap,
  labelGap,
}: FlipClockGroupUnitProps) => {
  const valueStr = String(value).padStart(digits, "0");
  const digitArray = valueStr.split("").map(Number);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: labelGap,
      }}
    >
      <div style={{ display: "flex", gap: cardGap }}>
        {digitArray.map((d, i) => (
          <FlipCardUnit
            key={i}
            digit={d}
            card={card}
            digitStyle={digitStyle}
            line={line}
            animation={animation}
            animId={animId}
          />
        ))}
      </div>
      {labelStyle.visible && (
        <span
          style={{
            fontFamily: labelStyle.fontFamily,
            fontSize: labelStyle.fontSize,
            fontWeight: labelStyle.fontWeight,
            letterSpacing: labelStyle.letterSpacing,
            textTransform: labelStyle.textTransform,
            color: labelStyle.color,
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
};

/* ──────────────────────────────────────────────
 * Sub-component: Separator
 * ────────────────────────────────────────────── */

interface SeparatorProps {
  config: Required<FlipSeparatorConfig>;
  cardHeight: string;
}

/** Renders an optional separator (colon or dot) between time groups. */
const SeparatorUnit = ({ config, cardHeight }: SeparatorProps) => {
  if (config.type === "none") return null;

  const dotStyle: CSSProperties = {
    width: config.size,
    height: config.size,
    borderRadius: "50%",
    background: config.color,
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: config.size,
        alignItems: "center",
        justifyContent: "center",
        height: cardHeight,
        paddingBottom: "1.5rem",
      }}
    >
      {config.type === "colon" && (
        <>
          <div style={dotStyle} />
          <div style={dotStyle} />
        </>
      )}
      {config.type === "dot" && <div style={dotStyle} />}
    </div>
  );
};

/* ──────────────────────────────────────────────
 * Main component: FlipClock
 * ────────────────────────────────────────────── */

/**
 * A customizable flip-clock countdown component with realistic 3D card-flip animations.
 *
 * Features:
 * - Countdown to any target date or display static time
 * - Full visual customization: card colors, digit font, labels, separators, animation
 * - Bounce animation on the bottom flap for a tactile feel
 * - Self-contained — no external CSS required (all styles are inline)
 * - Responsive-ready — set sizes via props
 *
 * @example
 * ```tsx
 * // Minimal
 * <FlipClock targetDate={new Date('2027-01-01')} />
 *
 * // Fully customized
 * <FlipClock
 *   targetDate={deadline}
 *   cardStyle={{ background: '#1e1e2e', backgroundDark: '#181825', borderRadius: '1rem' }}
 *   digitStyle={{ color: '#cba6f7', fontFamily: 'monospace', fontSize: '4rem' }}
 *   labelStyle={{ color: '#a6adc8', fontSize: '0.75rem' }}
 *   animation={{ bounceIntensity: 15, flipDuration: 400 }}
 *   separator={{ type: 'colon', color: '#cba6f7' }}
 *   groupGap="2rem"
 *   onComplete={() => console.log('Done!')}
 * />
 * ```
 */
const FlipClock = ({
  targetDate,
  staticTime,
  cardStyle,
  digitStyle,
  labelStyle,
  lineStyle,
  animation,
  separator,
  labels,
  segments,
  dayDigits = 2,
  groupGap = "3rem",
  cardGap = "0.375rem",
  labelGap = "1rem",
  onComplete,
  className,
  style,
}: FlipClockProps) => {
  /* Merge props with defaults */
  const card = useMemo(() => ({ ...DEFAULT_CARD, ...cardStyle }), [cardStyle]);
  const digit = useMemo(() => ({ ...DEFAULT_DIGIT, ...digitStyle }), [digitStyle]);
  const label = useMemo(() => ({ ...DEFAULT_LABEL, ...labelStyle }), [labelStyle]);
  const line = useMemo(() => ({ ...DEFAULT_LINE, ...lineStyle }), [lineStyle]);
  const anim = useMemo(() => ({ ...DEFAULT_ANIMATION, ...animation }), [animation]);
  const sep = useMemo(() => ({ ...DEFAULT_SEPARATOR, ...separator }), [separator]);

  const resolvedLabels = useMemo(
    () => ({
      days: labels?.days ?? "Days",
      hours: labels?.hours ?? "Hours",
      minutes: labels?.minutes ?? "Minutes",
      seconds: labels?.seconds ?? "Seconds",
    }),
    [labels]
  );

  const resolvedSegments = useMemo(
    () => ({
      days: segments?.days ?? true,
      hours: segments?.hours ?? true,
      minutes: segments?.minutes ?? true,
      seconds: segments?.seconds ?? true,
    }),
    [segments]
  );

  /* Inject keyframe styles */
  const animId = useMemo(() => injectKeyframes(anim), [anim]);

  /* Countdown logic */
  const defaultTarget = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 88);
    d.setHours(d.getHours() + 14);
    return d;
  }, []);

  const finalTarget = targetDate ?? defaultTarget;

  const calcTimeLeft = useCallback(() => {
    if (staticTime) {
      return {
        days: staticTime.days ?? 0,
        hours: staticTime.hours ?? 0,
        minutes: staticTime.minutes ?? 0,
        seconds: staticTime.seconds ?? 0,
      };
    }
    const dist = finalTarget.getTime() - Date.now();
    if (dist <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(dist / 86400000),
      hours: Math.floor((dist % 86400000) / 3600000),
      minutes: Math.floor((dist % 3600000) / 60000),
      seconds: Math.floor((dist % 60000) / 1000),
    };
  }, [finalTarget, staticTime]);

  const [timeLeft, setTimeLeft] = useState(() => ({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  }));
  const completeFired = useRef(false);

  useEffect(() => {
    if (staticTime) {
      setTimeLeft(calcTimeLeft());
      return;
    }

    setTimeLeft(calcTimeLeft());
    const timer = setInterval(() => {
      const tl = calcTimeLeft();
      setTimeLeft(tl);

      if (
        !completeFired.current &&
        tl.days === 0 &&
        tl.hours === 0 &&
        tl.minutes === 0 &&
        tl.seconds === 0
      ) {
        completeFired.current = true;
        onComplete?.();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [calcTimeLeft, onComplete, staticTime]);

  /* Build segment list */
  const segmentEntries: { value: number; label: string; digits: number }[] = [];
  if (resolvedSegments.days)
    segmentEntries.push({ value: timeLeft.days, label: resolvedLabels.days, digits: dayDigits });
  if (resolvedSegments.hours)
    segmentEntries.push({ value: timeLeft.hours, label: resolvedLabels.hours, digits: 2 });
  if (resolvedSegments.minutes)
    segmentEntries.push({ value: timeLeft.minutes, label: resolvedLabels.minutes, digits: 2 });
  if (resolvedSegments.seconds)
    segmentEntries.push({ value: timeLeft.seconds, label: resolvedLabels.seconds, digits: 2 });

  /* Render */
  const items: ReactNode[] = [];
  segmentEntries.forEach((seg, i) => {
    if (i > 0) {
      items.push(
        <SeparatorUnit key={`sep-${i}`} config={sep} cardHeight={card.height} />
      );
    }
    items.push(
      <FlipClockGroupUnit
        key={seg.label}
        value={seg.value}
        label={seg.label}
        digits={seg.digits}
        card={card}
        digitStyle={digit}
        labelStyle={label}
        line={line}
        animation={anim}
        animId={animId}
        cardGap={cardGap}
        labelGap={labelGap}
      />
    );
  });

  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        gap: groupGap,
        flexWrap: "wrap",
        justifyContent: "center",
        ...style,
      }}
    >
      {items}
    </div>
  );
};

export default FlipClock;
