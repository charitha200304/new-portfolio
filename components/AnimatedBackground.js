"use client";

import { motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────
   Slow-drifting aurora blobs
───────────────────────────────────────────────────────────────── */
const BLOBS = [
  {
    // Top-left — indigo/violet
    style: { top: "-10%", left: "-8%", width: 600, height: 600 },
    color: "radial-gradient(ellipse at center, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.10) 40%, transparent 70%)",
    animate: { x: [0, 60, -30, 0], y: [0, -40, 30, 0], scale: [1, 1.08, 0.95, 1] },
    duration: 22,
  },
  {
    // Bottom-right — cyan
    style: { bottom: "-12%", right: "-6%", width: 700, height: 700 },
    color: "radial-gradient(ellipse at center, rgba(34,211,238,0.14) 0%, rgba(6,182,212,0.08) 45%, transparent 70%)",
    animate: { x: [0, -50, 40, 0], y: [0, 40, -30, 0], scale: [1, 0.92, 1.06, 1] },
    duration: 26,
  },
  {
    // Centre-top — violet
    style: { top: "5%", left: "35%", width: 500, height: 500 },
    color: "radial-gradient(ellipse at center, rgba(167,139,250,0.10) 0%, rgba(99,102,241,0.05) 50%, transparent 70%)",
    animate: { x: [0, 40, -20, 0], y: [0, 30, -40, 0], scale: [1, 1.05, 0.98, 1] },
    duration: 30,
  },
  {
    // Mid-left — emerald accent
    style: { top: "40%", left: "-4%", width: 400, height: 400 },
    color: "radial-gradient(ellipse at center, rgba(52,211,153,0.08) 0%, rgba(16,185,129,0.04) 50%, transparent 70%)",
    animate: { x: [0, 30, -10, 0], y: [0, -30, 20, 0], scale: [1, 1.06, 0.97, 1] },
    duration: 18,
  },
  {
    // Bottom-left — indigo
    style: { bottom: "5%", left: "20%", width: 450, height: 450 },
    color: "radial-gradient(ellipse at center, rgba(79,70,229,0.10) 0%, rgba(99,102,241,0.05) 50%, transparent 70%)",
    animate: { x: [0, -40, 20, 0], y: [0, -20, 40, 0], scale: [1, 0.95, 1.04, 1] },
    duration: 24,
  },
];

/* ─────────────────────────────────────────────────────────────────
   Tiny floating particles
───────────────────────────────────────────────────────────────── */
const PARTICLES = [
  { x: "8%",   y: "12%", size: 2, color: "rgba(34,211,238,0.6)",   dur: 3.8, delay: 0    },
  { x: "20%",  y: "30%", size: 3, color: "rgba(99,102,241,0.5)",   dur: 5.2, delay: 0.5  },
  { x: "75%",  y: "8%",  size: 2, color: "rgba(167,139,250,0.6)",  dur: 4.1, delay: 1.0  },
  { x: "88%",  y: "22%", size: 3, color: "rgba(34,211,238,0.4)",   dur: 6.0, delay: 1.5  },
  { x: "60%",  y: "15%", size: 2, color: "rgba(99,102,241,0.6)",   dur: 3.5, delay: 0.8  },
  { x: "45%",  y: "78%", size: 3, color: "rgba(34,211,238,0.35)",  dur: 4.7, delay: 2.0  },
  { x: "15%",  y: "65%", size: 2, color: "rgba(167,139,250,0.5)",  dur: 5.5, delay: 0.3  },
  { x: "82%",  y: "55%", size: 2, color: "rgba(34,211,238,0.5)",   dur: 4.3, delay: 1.2  },
  { x: "92%",  y: "80%", size: 3, color: "rgba(99,102,241,0.4)",   dur: 3.9, delay: 0.7  },
  { x: "30%",  y: "90%", size: 2, color: "rgba(52,211,153,0.5)",   dur: 5.0, delay: 1.8  },
  { x: "55%",  y: "45%", size: 2, color: "rgba(167,139,250,0.35)", dur: 6.2, delay: 2.4  },
  { x: "5%",   y: "48%", size: 3, color: "rgba(34,211,238,0.45)",  dur: 4.6, delay: 1.6  },
  { x: "68%",  y: "88%", size: 2, color: "rgba(99,102,241,0.55)",  dur: 3.6, delay: 0.2  },
  { x: "38%",  y: "5%",  size: 2, color: "rgba(34,211,238,0.4)",   dur: 5.8, delay: 2.2  },
  { x: "72%",  y: "38%", size: 3, color: "rgba(167,139,250,0.45)", dur: 4.0, delay: 0.9  },
];

/* ─────────────────────────────────────────────────────────────────
   Animated grid pulse — concentric expanding rings
───────────────────────────────────────────────────────────────── */
function PulseRings() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-cyan-400/[0.04]"
          style={{ width: 200 + i * 200, height: 200 + i * 200 }}
          animate={{ scale: [1, 1.35, 1], opacity: [0.06, 0, 0.06] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Top aurora shimmer bar
───────────────────────────────────────────────────────────────── */
function AuroraBar() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden">
      <motion.div
        className="h-full w-full"
        style={{
          background:
            "linear-gradient(to right, transparent 0%, rgba(99,102,241,0.6) 20%, rgba(34,211,238,0.8) 40%, rgba(167,139,250,0.7) 60%, rgba(34,211,238,0.6) 80%, transparent 100%)",
        }}
        animate={{ x: ["-60%", "60%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Diagonal scan line sweep
───────────────────────────────────────────────────────────────── */
function ScanSweep() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "linear-gradient(105deg, transparent 40%, rgba(34,211,238,0.015) 50%, transparent 60%)",
        backgroundSize: "200% 200%",
      }}
      animate={{ backgroundPosition: ["200% 200%", "-200% -200%"] }}
      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN — AnimatedBackground
───────────────────────────────────────────────────────────────── */
export default function AnimatedBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* ── Aurora blobs ── */}
      {BLOBS.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            ...blob.style,
            background: blob.color,
            filter: "blur(60px)",
          }}
          animate={blob.animate}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "mirror",
          }}
        />
      ))}

      {/* ── Pulse rings from centre ── */}
      <PulseRings />

      {/* ── Top aurora shimmer ── */}
      <AuroraBar />

      {/* ── Diagonal scan sweep ── */}
      <ScanSweep />

      {/* ── Floating particles ── */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
          }}
          animate={{
            y: [0, -18, 0],
            opacity: [0.4, 1, 0.4],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}

      {/* ── Vignette overlay to darken edges ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(9,9,11,0.6) 100%)",
        }}
      />
    </div>
  );
}
