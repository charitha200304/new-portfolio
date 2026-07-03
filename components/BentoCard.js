"use client";

import { motion } from "framer-motion";

const revealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function BentoCard({
  children,
  className = "",
  delay = 0,
  interactive = true,
}) {
  return (
    <motion.div
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      custom={delay}
      whileHover={
        interactive
          ? { scale: 1.012, transition: { duration: 0.25, ease: "easeOut" } }
          : undefined
      }
      onMouseMove={
        interactive
          ? (e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
              e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
            }
          : undefined
      }
      className={`group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-xl transition-colors duration-300 ${
        interactive ? "hover:border-zinc-700" : ""
      } ${className}`}
    >
      {interactive && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(99,102,241,0.12), transparent 40%)",
          }}
        />
      )}
      {children}
    </motion.div>
  );
}
