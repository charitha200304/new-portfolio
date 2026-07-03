"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────
   Spring config
───────────────────────────────────────────────────────────────── */
const SPRING = { type: "spring", stiffness: 100, damping: 12, mass: 0.8 };

/* ─────────────────────────────────────────────────────────────────
   Floating ambient particles
───────────────────────────────────────────────────────────────── */
const PARTICLES = [
  { x: -120, y: -80,  size: 4, dur: 3.2, delay: 0,    color: "rgba(34,211,238,0.7)"  },
  { x:  130, y: -60,  size: 3, dur: 4.1, delay: 0.5,  color: "rgba(99,102,241,0.7)"  },
  { x: -160, y:  40,  size: 5, dur: 2.8, delay: 1.0,  color: "rgba(34,211,238,0.5)"  },
  { x:  170, y:  60,  size: 3, dur: 3.7, delay: 1.5,  color: "rgba(167,139,250,0.6)" },
  { x:  -80, y: 130,  size: 4, dur: 4.4, delay: 0.8,  color: "rgba(34,211,238,0.4)"  },
  { x:  100, y: 140,  size: 3, dur: 3.0, delay: 1.2,  color: "rgba(99,102,241,0.5)"  },
  { x: -200, y: -20,  size: 2, dur: 5.0, delay: 0.3,  color: "rgba(34,211,238,0.3)"  },
  { x:  210, y: -10,  size: 2, dur: 4.6, delay: 1.8,  color: "rgba(167,139,250,0.4)" },
  { x:   40, y: -150, size: 3, dur: 3.5, delay: 0.6,  color: "rgba(99,102,241,0.6)"  },
  { x:  -50, y: -140, size: 2, dur: 4.8, delay: 2.0,  color: "rgba(34,211,238,0.5)"  },
];

function Particles() {
  return (
    <>
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: "50%",
            top: "50%",
            marginLeft: p.x,
            marginTop: p.y,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
          animate={{
            y: [0, -14, 0],
            opacity: [0.4, 1, 0.4],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Holographic orbit ring
───────────────────────────────────────────────────────────────── */
function HoloRing({ size, opacity, dur, delay = 0, color = "cyan" }) {
  const grad =
    color === "indigo"
      ? "conic-gradient(from 0deg, transparent 60%, rgba(99,102,241,0.7) 75%, rgba(99,102,241,0.9) 80%, rgba(99,102,241,0.7) 85%, transparent 100%)"
      : "conic-gradient(from 0deg, transparent 60%, rgba(34,211,238,0.7) 75%, rgba(34,211,238,1) 80%, rgba(34,211,238,0.7) 85%, transparent 100%)";
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute rounded-full"
      style={{
        width: size,
        height: size,
        left: "50%",
        top: "50%",
        marginLeft: -size / 2,
        marginTop: -size / 2,
        opacity,
        background: grad,
        filter: "blur(1px)",
      }}
      animate={{ rotate: [0, 360] }}
      transition={{ duration: dur, repeat: Infinity, ease: "linear", delay }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────
   Circuit line decoration
───────────────────────────────────────────────────────────────── */
function CircuitLines() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2"
      style={{ transform: "translate(-50%,-50%)", width: 500, height: 500, opacity: 0.12 }}
      viewBox="0 0 500 500"
    >
      {/* Horizontal rails */}
      <line x1="50"  y1="220" x2="170" y2="220" stroke="rgba(34,211,238,1)" strokeWidth="1" />
      <line x1="330" y1="220" x2="450" y2="220" stroke="rgba(34,211,238,1)" strokeWidth="1" />
      <line x1="50"  y1="280" x2="170" y2="280" stroke="rgba(99,102,241,1)" strokeWidth="1" />
      <line x1="330" y1="280" x2="450" y2="280" stroke="rgba(99,102,241,1)" strokeWidth="1" />
      {/* Corner nodes */}
      <circle cx="170" cy="220" r="3" fill="rgba(34,211,238,1)" />
      <circle cx="330" cy="220" r="3" fill="rgba(34,211,238,1)" />
      <circle cx="170" cy="280" r="3" fill="rgba(99,102,241,1)" />
      <circle cx="330" cy="280" r="3" fill="rgba(99,102,241,1)" />
      {/* Vertical drops */}
      <line x1="170" y1="220" x2="170" y2="180" stroke="rgba(34,211,238,1)" strokeWidth="1" />
      <line x1="330" y1="220" x2="330" y2="180" stroke="rgba(34,211,238,1)" strokeWidth="1" />
      <line x1="170" y1="280" x2="170" y2="320" stroke="rgba(99,102,241,1)" strokeWidth="1" />
      <line x1="330" y1="280" x2="330" y2="320" stroke="rgba(99,102,241,1)" strokeWidth="1" />
      {/* Diagonal accents */}
      <line x1="80"  y1="160" x2="120" y2="200" stroke="rgba(167,139,250,1)" strokeWidth="0.8" strokeDasharray="4 4" />
      <line x1="420" y1="160" x2="380" y2="200" stroke="rgba(167,139,250,1)" strokeWidth="0.8" strokeDasharray="4 4" />
      <line x1="80"  y1="340" x2="120" y2="300" stroke="rgba(167,139,250,1)" strokeWidth="0.8" strokeDasharray="4 4" />
      <line x1="420" y1="340" x2="380" y2="300" stroke="rgba(167,139,250,1)" strokeWidth="0.8" strokeDasharray="4 4" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Scanline overlay
───────────────────────────────────────────────────────────────── */
function ScanlineOverlay() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="scanlines2" x="0" y="0" width="100%" height="4" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="100%" y2="0" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#scanlines2)" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Antenna
───────────────────────────────────────────────────────────────── */
function AntennaPulse() {
  return (
    <motion.div className="absolute left-1/2 -translate-x-1/2" style={{ top: -50, width: 8, height: 8 }}>
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          width: 3,
          height: 34,
          top: -34,
          background: "linear-gradient(to top, rgba(34,211,238,0.7), transparent)",
          borderRadius: 2,
        }}
      />
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 rounded-full bg-cyan-400"
        style={{ width: 8, height: 8, top: -42 }}
        animate={{
          boxShadow: [
            "0 0 8px 3px rgba(34,211,238,1)",
            "0 0 24px 8px rgba(34,211,238,0.4)",
            "0 0 8px 3px rgba(34,211,238,1)",
          ],
          opacity: [1, 0.5, 1],
        }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Hex grid chest
───────────────────────────────────────────────────────────────── */
function HexGrid() {
  const hexes = [
    [10,8],[24,8],[38,8],[52,8],[66,8],
    [17,20],[31,20],[45,20],[59,20],
  ];
  return (
    <svg
      aria-hidden
      className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-30"
      width="76" height="32" viewBox="0 0 76 32" fill="none"
    >
      {hexes.map(([cx, cy], i) => (
        <polygon
          key={i}
          points={`${cx},${cy-5} ${cx+4.3},${cy-2.5} ${cx+4.3},${cy+2.5} ${cx},${cy+5} ${cx-4.3},${cy+2.5} ${cx-4.3},${cy-2.5}`}
          stroke="rgba(34,211,238,0.9)"
          strokeWidth="0.8"
          fill="none"
        />
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Status dots
───────────────────────────────────────────────────────────────── */
function StatusDots({ side = "left" }) {
  const dots =
    side === "left"
      ? [
          { delay: 0,   color: "rgb(34,211,238)"  },
          { delay: 0.4, color: "rgb(99,102,241)"  },
          { delay: 0.8, color: "rgb(167,139,250)" },
        ]
      : [
          { delay: 0.2, color: "rgb(99,102,241)"  },
          { delay: 0.6, color: "rgb(167,139,250)" },
        ];
  return (
    <div className={`absolute ${side}-3 top-1/2 flex -translate-y-1/2 flex-col gap-2`}>
      {dots.map(({ delay, color }, i) => (
        <motion.div
          key={i}
          className="rounded-full"
          style={{ width: 5, height: 5, backgroundColor: color }}
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────── */
export default function RobotAgent3D() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const rawX = useSpring(0, SPRING);
  const rawY = useSpring(0, SPRING);

  const rotateY  = useTransform(rawX, [-1, 1], [-20,  20]);
  const rotateX  = useTransform(rawY, [-1, 1], [ 20, -20]);
  const visorX   = useTransform(rawX, [-1, 1], [-10,  10]);
  const visorY   = useTransform(rawY, [-1, 1], [-10,  10]);
  const bodyX    = useTransform(rawX, [-1, 1], [ -6,   6]);
  const bodyY    = useTransform(rawY, [-1, 1], [ -6,   6]);

  const handleMouseMove = useCallback(
    (e) => {
      if (isMobile) return;
      rawX.set((e.clientX / window.innerWidth)  * 2 - 1);
      rawY.set((e.clientY / window.innerHeight) * 2 - 1);
    },
    [isMobile, rawX, rawY],
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    /* ── Full-screen fixed background layer ── */
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      {/* ── Far ambient mega-glow ── */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 700,
          height: 700,
          background:
            "radial-gradient(ellipse at center, rgba(34,211,238,0.07) 0%, rgba(99,102,241,0.05) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* ── Holographic orbit rings ── */}
      <HoloRing size={340} opacity={0.18} dur={12}   color="cyan"   />
      <HoloRing size={440} opacity={0.10} dur={18}   color="indigo" delay={3} />
      <HoloRing size={260} opacity={0.14} dur={8}    color="cyan"   delay={1} />

      {/* ── Circuit decoration ── */}
      <CircuitLines />

      {/* ── Floating particles ── */}
      <Particles />

      {/* ── Idle float wrapper ── */}
      <motion.div
        className="relative flex items-center justify-center"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Shadow platform */}
        <div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2"
          style={{
            width: 200,
            height: 30,
            background:
              "radial-gradient(ellipse at center, rgba(34,211,238,0.3) 0%, rgba(99,102,241,0.15) 45%, transparent 70%)",
            filter: "blur(14px)",
            borderRadius: "50%",
          }}
        />

        {/* ── 3D tilt wrapper ── */}
        <motion.div
          className="relative flex flex-col items-center"
          style={{ rotateX, rotateY, x: bodyX, y: bodyY, transformStyle: "preserve-3d" }}
        >

          {/* ════════ HEAD ════════ */}
          <div
            className="relative flex items-center justify-center"
            style={{ width: 140, height: 112, transformStyle: "preserve-3d" }}
          >
            <AntennaPulse />

            {/* Head shell */}
            <div
              className="relative flex items-center justify-center overflow-hidden rounded-3xl"
              style={{
                width: 140,
                height: 112,
                background:
                  "linear-gradient(135deg, rgba(39,39,42,0.92) 0%, rgba(24,24,27,0.97) 60%, rgba(12,12,16,1) 100%)",
                border: "1px solid rgba(63,63,70,0.6)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -2px 0 rgba(0,0,0,0.5), 0 0 0 1px rgba(34,211,238,0.1), 0 12px 48px rgba(0,0,0,0.7), 0 0 60px rgba(34,211,238,0.04)",
              }}
            >
              {/* Top sheen */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{ background: "linear-gradient(to right, transparent, rgba(34,211,238,0.5), transparent)" }}
              />

              {/* Face visor */}
              <div
                className="relative mx-auto flex items-center justify-center overflow-hidden rounded-xl"
                style={{
                  width: 104,
                  height: 48,
                  background: "linear-gradient(160deg, rgba(6,16,26,0.97) 0%, rgba(0,0,0,1) 60%)",
                  border: "1px solid rgba(34,211,238,0.2)",
                  boxShadow: "inset 0 3px 12px rgba(0,0,0,0.9), 0 0 16px rgba(34,211,238,0.08)",
                }}
              >
                <ScanlineOverlay />
                {/* Gloss */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-0 rounded-t-xl"
                  style={{
                    width: "100%", height: "40%",
                    background: "linear-gradient(to bottom, rgba(255,255,255,0.07), transparent)",
                  }}
                />

                {/* ── Neon visor (eyes) — parallax ── */}
                <motion.div
                  className="relative rounded-md"
                  style={{
                    x: visorX,
                    y: visorY,
                    width: 76,
                    height: 10,
                    background:
                      "linear-gradient(to right, rgba(34,211,238,0.5), rgb(34,211,238) 40%, rgb(34,211,238) 60%, rgba(34,211,238,0.5))",
                    boxShadow:
                      "0 0 10px 3px rgba(34,211,238,0.9), 0 0 28px 8px rgba(34,211,238,0.4), 0 0 60px 16px rgba(34,211,238,0.15)",
                  }}
                >
                  <div aria-hidden className="absolute inset-x-6 top-1 h-0.5 rounded-full bg-white/70" />
                </motion.div>

                {/* Corner pips */}
                {[{ top: 4, left: 4 }, { top: 4, right: 4 }].map((pos, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-cyan-400"
                    style={{ ...pos, width: 4, height: 4 }}
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.7, ease: "easeInOut" }}
                  />
                ))}
              </div>

              {/* Chin line */}
              <div
                aria-hidden
                className="absolute bottom-6 left-1/2 -translate-x-1/2"
                style={{
                  width: 64,
                  height: 1,
                  background: "linear-gradient(to right, transparent, rgba(34,211,238,0.35), transparent)",
                }}
              />
            </div>
          </div>

          {/* ════════ NECK ════════ */}
          <div
            className="relative mx-auto"
            style={{
              width: 40,
              height: 12,
              background: "linear-gradient(to bottom, rgba(24,24,27,0.95), rgba(15,15,18,0.9))",
              border: "1px solid rgba(63,63,70,0.5)",
              borderTop: "none",
              borderBottomLeftRadius: 6,
              borderBottomRightRadius: 6,
            }}
          >
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/40"
              style={{ width: 8, height: 8 }}
            />
          </div>

          {/* ════════ TORSO ════════ */}
          <div
            className="relative flex items-center justify-center rounded-3xl"
            style={{
              width: 165,
              height: 130,
              background:
                "linear-gradient(160deg, rgba(39,39,42,0.93) 0%, rgba(24,24,27,0.97) 50%, rgba(12,12,16,1) 100%)",
              border: "1px solid rgba(63,63,70,0.5)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -2px 0 rgba(0,0,0,0.4), 0 0 0 1px rgba(34,211,238,0.06), 0 20px 60px rgba(0,0,0,0.8)",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)" }}
            />

            <StatusDots side="left" />
            <StatusDots side="right" />

            {/* Reactor core */}
            <div className="flex flex-col items-center">
              <motion.div
                className="rounded-full"
                style={{
                  width: 34,
                  height: 34,
                  background:
                    "radial-gradient(circle at 35% 32%, rgba(150,230,245,0.95), rgba(34,211,238,0.75) 45%, rgba(6,182,212,0.35) 100%)",
                }}
                animate={{
                  boxShadow: [
                    "0 0 14px 4px rgba(34,211,238,0.65), 0 0 40px 12px rgba(34,211,238,0.2)",
                    "0 0 28px 10px rgba(34,211,238,0.95), 0 0 70px 22px rgba(34,211,238,0.35)",
                    "0 0 14px 4px rgba(34,211,238,0.65), 0 0 40px 12px rgba(34,211,238,0.2)",
                  ],
                }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Reactor ring */}
              <div
                style={{
                  width: 56,
                  height: 2,
                  marginTop: 6,
                  borderRadius: 9999,
                  background: "linear-gradient(to right, transparent, rgba(34,211,238,0.5), transparent)",
                }}
              />
            </div>

            <HexGrid />

            {/* Bottom pulse line */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(34,211,238,0.3), rgba(99,102,241,0.3), transparent)",
              }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* ════════ SHOULDER PAULDRONS ════════ */}
          {[
            {
              key: "L",
              s: { position:"absolute", left:-22, top:130, width:28, height:74,
                   borderRadius:"12px 4px 4px 12px",
                   background:"linear-gradient(180deg,rgba(39,39,42,0.88) 0%,rgba(24,24,27,0.94) 100%)",
                   border:"1px solid rgba(63,63,70,0.5)", borderRight:"none" },
              acc: "right",
            },
            {
              key: "R",
              s: { position:"absolute", right:-22, top:130, width:28, height:74,
                   borderRadius:"4px 12px 12px 4px",
                   background:"linear-gradient(180deg,rgba(39,39,42,0.88) 0%,rgba(24,24,27,0.94) 100%)",
                   border:"1px solid rgba(63,63,70,0.5)", borderLeft:"none" },
              acc: "left",
            },
          ].map(({ key, s, acc }) => (
            <div key={key} aria-hidden style={s}>
              <div style={{
                position:"absolute", [acc]:0, top:"50%",
                transform:"translateY(-50%)", width:1, height:30,
                background:"linear-gradient(to bottom,transparent,rgba(34,211,238,0.4),transparent)",
              }} />
            </div>
          ))}

          {/* ════════ LEGS ════════ */}
          <div className="flex gap-5" style={{ marginTop: 8 }}>
            {[0, 1].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  style={{
                    width: 28,
                    height: 30,
                    background: "linear-gradient(to bottom,rgba(28,28,33,0.95),rgba(18,18,22,0.98))",
                    border: "1px solid rgba(63,63,70,0.4)",
                    borderTop: "none",
                    borderRadius: "0 0 6px 6px",
                  }}
                />
                <div
                  style={{
                    width: 38,
                    height: 10,
                    marginTop: 3,
                    background:
                      "linear-gradient(to right,rgba(22,22,26,0.9),rgba(32,32,36,0.95),rgba(22,22,26,0.9))",
                    border: "1px solid rgba(63,63,70,0.4)",
                    borderRadius: 5,
                    boxShadow: "0 3px 10px rgba(0,0,0,0.6)",
                  }}
                />
              </div>
            ))}
          </div>

        </motion.div>
      </motion.div>
    </div>
  );
}
