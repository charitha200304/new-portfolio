"use client";

import { motion } from "framer-motion";
import BentoCard from "./BentoCard";

const CATEGORIES = [
  {
    label: "Frontend",
    accent: "hover:border-indigo-400/40 hover:shadow-[0_0_16px_-2px_rgba(129,140,248,0.35)]",
    skills: ["Next.js", "React.js", "Vue.js", "Tailwind CSS"],
  },
  {
    label: "Backend & Security",
    accent: "hover:border-cyan-400/40 hover:shadow-[0_0_16px_-2px_rgba(34,211,238,0.35)]",
    skills: ["Java Spring Boot", "NestJS", "Laravel", "PHP", "JWT", "2FA", "REST APIs"],
  },
  {
    label: "Mobile",
    accent: "hover:border-emerald-400/40 hover:shadow-[0_0_16px_-2px_rgba(52,211,153,0.35)]",
    skills: ["React Native"],
  },
  {
    label: "Databases",
    accent: "hover:border-indigo-400/40 hover:shadow-[0_0_16px_-2px_rgba(129,140,248,0.35)]",
    skills: ["MySQL", "MongoDB", "Firestore"],
  },
];

export default function Skills() {
  return (
    <BentoCard className="col-span-1 p-8 md:col-span-2 lg:col-span-2">
      <div id="skills">
        <h2 className="text-sm font-medium uppercase tracking-widest text-zinc-500">
          Tech Stack
        </h2>

        <div className="mt-5 space-y-5">
          {CATEGORIES.map((category, ci) => (
            <div key={category.label}>
              <p className="mb-2 text-xs font-medium text-zinc-500">
                {category.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: ci * 0.05 + i * 0.03 }}
                    whileHover={{ y: -2 }}
                    className={`cursor-default rounded-lg border border-zinc-800 bg-zinc-900/70 px-3 py-1.5 text-xs text-zinc-300 transition-all duration-200 hover:text-zinc-100 ${category.accent}`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
