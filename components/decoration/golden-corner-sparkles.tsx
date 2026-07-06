"use client"

import { motion } from "motion/react"

const GOLD_LIGHT = "#F5E6C8"
const GOLD_MID = "#CDAC77"
const GOLD_BRIGHT = "#FFF6E7"

type DustParticle = {
  id: string
  top: number
  left: number
  size: number
  opacity: number
  delay: number
  duration: number
}

type FeatureStar = {
  id: string
  top: string
  left: string
  size: number
  delay: number
  duration: number
  rotate: number
  variant: "flare" | "star" | "sparkle"
}

function seededRandom(seed: number) {
  const value = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453
  return value - Math.floor(value)
}

function createCornerDust(
  prefix: string,
  count: number,
  topRange: [number, number],
  leftRange: [number, number],
  seed: number,
): DustParticle[] {
  return Array.from({ length: count }, (_, index) => {
    const r1 = seededRandom(seed + index * 1.13)
    const r2 = seededRandom(seed + index * 2.17)
    const r3 = seededRandom(seed + index * 3.31)
    const r4 = seededRandom(seed + index * 4.07)
    const clusterBias = Math.pow(r1, 1.6)
    const spreadBias = Math.pow(r2, 1.4)

    return {
      id: `${prefix}-${index}`,
      top: topRange[0] + clusterBias * (topRange[1] - topRange[0]),
      left: leftRange[0] + spreadBias * (leftRange[1] - leftRange[0]),
      size: 0.8 + r3 * 2.8,
      opacity: 0.12 + r4 * 0.72,
      delay: r1 * 5,
      duration: 2.2 + r2 * 3.8,
    }
  })
}

function createBezierString(
  prefix: string,
  start: { x: number; y: number },
  control: { x: number; y: number },
  end: { x: number; y: number },
  count: number,
  seed: number,
): DustParticle[] {
  return Array.from({ length: count }, (_, index) => {
    const t = count === 1 ? 0 : index / (count - 1)
    const r = seededRandom(seed + index * 1.91)
    const x =
      (1 - t) * (1 - t) * start.x +
      2 * (1 - t) * t * control.x +
      t * t * end.x +
      (r - 0.5) * 1.8
    const y =
      (1 - t) * (1 - t) * start.y +
      2 * (1 - t) * t * control.y +
      t * t * end.y +
      (seededRandom(seed + index * 2.71) - 0.5) * 1.4

    return {
      id: `${prefix}-${index}`,
      top: y,
      left: x,
      size: index % 7 === 0 ? 2.8 + r * 1.5 : 1 + r * 1.8,
      opacity: index % 7 === 0 ? 0.55 + r * 0.4 : 0.18 + r * 0.5,
      delay: r * 4.5,
      duration: 2.5 + seededRandom(seed + index) * 3,
    }
  })
}

const STARDUST: DustParticle[] = [
  ...createCornerDust("tl", 120, [0, 36], [0, 40], 11),
  ...createCornerDust("tr", 120, [0, 36], [60, 100], 22),
  ...createCornerDust("bl", 110, [64, 100], [0, 42], 33),
  ...createCornerDust("br", 115, [64, 100], [58, 100], 44),
  ...createBezierString("ts1", { x: 1, y: 6 }, { x: 30, y: 0 }, { x: 55, y: 8 }, 34, 55),
  ...createBezierString("ts2", { x: 99, y: 5 }, { x: 70, y: 0 }, { x: 45, y: 7 }, 34, 66),
  ...createBezierString("bs1", { x: 3, y: 95 }, { x: 24, y: 87 }, { x: 42, y: 97 }, 22, 77),
  ...createBezierString("bs2", { x: 97, y: 96 }, { x: 76, y: 88 }, { x: 58, y: 98 }, 22, 88),
  ...createCornerDust("le", 35, [18, 82], [0, 8], 99),
  ...createCornerDust("re", 35, [18, 82], [92, 100], 101),
]

const FEATURE_STARS: FeatureStar[] = [
  { id: "flare-tl", top: "7%", left: "8%", size: 28, delay: 0, duration: 3.2, rotate: -8, variant: "flare" },
  { id: "flare-tr", top: "6%", left: "88%", size: 26, delay: 0.6, duration: 3.5, rotate: 12, variant: "flare" },
  { id: "flare-bl", top: "86%", left: "10%", size: 24, delay: 1.1, duration: 3.0, rotate: -15, variant: "flare" },
  { id: "flare-br", top: "88%", left: "86%", size: 30, delay: 0.3, duration: 3.8, rotate: 10, variant: "flare" },
  { id: "star-tl-2", top: "14%", left: "22%", size: 14, delay: 0.8, duration: 2.8, rotate: 20, variant: "star" },
  { id: "star-tr-2", top: "16%", left: "74%", size: 12, delay: 1.4, duration: 2.6, rotate: -18, variant: "star" },
  { id: "star-bl-2", top: "78%", left: "24%", size: 11, delay: 0.5, duration: 3.1, rotate: 32, variant: "sparkle" },
  { id: "star-br-2", top: "80%", left: "72%", size: 13, delay: 1.7, duration: 2.9, rotate: -22, variant: "sparkle" },
  { id: "star-tl-3", top: "24%", left: "6%", size: 9, delay: 2.0, duration: 3.4, rotate: -30, variant: "sparkle" },
  { id: "star-tr-3", top: "22%", left: "92%", size: 10, delay: 0.2, duration: 2.7, rotate: 25, variant: "sparkle" },
  { id: "star-bl-3", top: "92%", left: "18%", size: 8, delay: 1.0, duration: 3.6, rotate: 12, variant: "star" },
  { id: "star-br-3", top: "94%", left: "78%", size: 9, delay: 1.3, duration: 2.5, rotate: -8, variant: "star" },
]

function GoldenFlareStar({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden
      style={{
        filter: `drop-shadow(0 0 6px ${GOLD_BRIGHT}) drop-shadow(0 0 14px rgba(205, 172, 119, 0.85)) drop-shadow(0 0 24px rgba(187, 138, 61, 0.45))`,
      }}
    >
      <line x1="24" y1="2" x2="24" y2="46" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
      <line x1="2" y1="24" x2="46" y2="24" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
      <line x1="8" y1="8" x2="40" y2="40" stroke={color} strokeWidth="0.7" strokeLinecap="round" opacity="0.45" />
      <line x1="40" y1="8" x2="8" y2="40" stroke={color} strokeWidth="0.7" strokeLinecap="round" opacity="0.45" />
      <circle cx="24" cy="24" r="4.5" fill={GOLD_BRIGHT} />
      <circle cx="24" cy="24" r="2.2" fill={color} />
    </svg>
  )
}

function GoldenStarIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      aria-hidden
      style={{
        filter: `drop-shadow(0 0 3px ${color}) drop-shadow(0 0 8px rgba(187, 138, 61, 0.55))`,
      }}
    >
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  )
}

function GoldenSparkleIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      aria-hidden
      style={{
        filter: `drop-shadow(0 0 2px ${color}) drop-shadow(0 0 6px rgba(229, 207, 167, 0.7))`,
      }}
    >
      <path d="M12 0L13.8 10.2L24 12L13.8 13.8L12 24L10.2 13.8L0 12L10.2 10.2L12 0Z" />
    </svg>
  )
}

type GoldenCornerSparklesProps = {
  className?: string
}

export function GoldenCornerSparkles({ className = "z-[5]" }: GoldenCornerSparklesProps) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <style jsx>{`
        @keyframes goldenStardustTwinkle {
          0%,
          100% {
            opacity: 0.25;
            transform: scale(0.85);
          }
          35% {
            opacity: 1;
            transform: scale(1.12);
          }
          65% {
            opacity: 0.45;
            transform: scale(0.95);
          }
        }

        :global(.golden-stardust) {
          animation: goldenStardustTwinkle ease-in-out infinite;
        }
      `}</style>
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 55% 45% at 0% 0%, rgba(205, 172, 119, 0.28) 0%, transparent 72%),
            radial-gradient(ellipse 55% 45% at 100% 0%, rgba(229, 207, 167, 0.24) 0%, transparent 72%),
            radial-gradient(ellipse 50% 42% at 0% 100%, rgba(187, 138, 61, 0.22) 0%, transparent 70%),
            radial-gradient(ellipse 50% 42% at 100% 100%, rgba(205, 172, 119, 0.26) 0%, transparent 70%)
          `,
        }}
      />

      <motion.span
        className="absolute -left-16 -top-16 h-72 w-72 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, rgba(229, 207, 167, 0.32) 0%, rgba(187, 138, 61, 0.12) 45%, transparent 72%)` }}
        animate={{ opacity: [0.4, 0.75, 0.4], scale: [1, 1.12, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute -right-16 -top-16 h-72 w-72 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, rgba(245, 230, 200, 0.28) 0%, rgba(205, 172, 119, 0.1) 45%, transparent 72%)` }}
        animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.1, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      />
      <motion.span
        className="absolute -bottom-20 -left-14 h-80 w-80 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, rgba(187, 138, 61, 0.26) 0%, rgba(205, 172, 119, 0.1) 45%, transparent 72%)` }}
        animate={{ opacity: [0.3, 0.62, 0.3], scale: [1, 1.08, 1] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
      />
      <motion.span
        className="absolute -bottom-16 -right-14 h-72 w-72 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, rgba(205, 172, 119, 0.3) 0%, rgba(229, 207, 167, 0.12) 45%, transparent 72%)` }}
        animate={{ opacity: [0.35, 0.68, 0.35], scale: [1, 1.1, 1] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />

      {STARDUST.map((particle) => (
        <span
          key={particle.id}
          className="golden-stardust absolute rounded-full"
          style={{
            top: `${particle.top}%`,
            left: `${particle.left}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.size > 2.5 ? GOLD_LIGHT : GOLD_MID,
            boxShadow:
              particle.size > 2.5
                ? `0 0 ${particle.size * 2}px rgba(245, 230, 200, 0.75)`
                : `0 0 ${Math.max(particle.size, 1)}px rgba(205, 172, 119, 0.45)`,
            opacity: particle.opacity,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      {FEATURE_STARS.map((star) => {
        const color = star.size >= 22 ? GOLD_BRIGHT : star.size >= 12 ? GOLD_LIGHT : GOLD_MID

        return (
          <motion.div
            key={star.id}
            className="absolute"
            style={{
              top: star.top,
              left: star.left,
              transform: `rotate(${star.rotate}deg)`,
            }}
            animate={{
              opacity: [0.2, 1, 0.35, 0.95, 0.2],
              scale: [0.7, 1.2, 0.88, 1.28, 0.7],
              rotate: [star.rotate, star.rotate + 10, star.rotate - 6, star.rotate + 4, star.rotate],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
          >
            {star.variant === "flare" ? (
              <GoldenFlareStar size={star.size} color={color} />
            ) : star.variant === "star" ? (
              <GoldenStarIcon size={star.size} color={color} />
            ) : (
              <GoldenSparkleIcon size={star.size} color={color} />
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
