"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import BentoCard from "./BentoCard";

const PROJECTS = [
  {
    title: "CraveCart",
    tag: "Enterprise E-commerce Platform",
    description:
      "Decoupled e-commerce platform with a Spring Boot API and a Next.js storefront, deployed live across Vercel (frontend) and Render (backend) with continuous deployment.",
    stack: ["React.js", "Spring Boot", "MySQL", "Tailwind CSS"],
    href: "https://crave-cart-delta.vercel.app/",
    gradient: "from-indigo-500/20 to-transparent",
  },
  {
    title: "Daily Spend",
    tag: "Personal Finance Mobile App",
    description:
      "Cross-platform React Native app for tracking daily transactions, with Firebase Authentication and Cloud Firestore for real-time, low-latency data sync.",
    stack: ["React Native", "Firebase Auth", "Cloud Firestore"],
    href: "https://github.com/charitha200304/Daily-Spend-Apk.git",
    gradient: "from-cyan-500/20 to-transparent",
  },
  {
    title: "C-MOBILES",
    tag: "Full-Stack MERN E-commerce",
    description:
      "MERN-stack e-commerce solution with a MongoDB schema for diverse product categories and a custom Node.js/Express backend, plus an admin dashboard for inventory and order tracking.",
    stack: ["MongoDB", "Express.js", "React", "Node.js"],
    href: "https://github.com/charitha200304/c-mobiles-backend.git",
    gradient: "from-emerald-500/20 to-transparent",
  },
];

export default function Projects() {
  return (
    <BentoCard
      interactive={false}
      className="col-span-1 p-8 md:col-span-4 lg:col-span-4"
    >
      <div id="projects">
        <div className="mb-6">
          <h2 className="text-sm font-medium uppercase tracking-widest text-zinc-500">
            Featured Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <motion.a
              key={project.title}
                          href={project.href}
            target="_blank"
            rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/60 p-5 transition-colors duration-300 hover:border-zinc-700"
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                aria-hidden
              />
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-zinc-100">
                    {project.title}
                  </h3>
                  <ArrowUpRight className="h-4 w-4 text-zinc-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-zinc-200" />
                </div>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-cyan-400/80">
                  {project.tag}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                  {project.description}
                </p>
              </div>

              <div className="relative z-10 mt-5 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-zinc-800 bg-zinc-900/80 px-2 py-0.5 text-[10px] text-zinc-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="pointer-events-none absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-zinc-100/[0.02] transition-transform duration-500 group-hover:scale-150" />
            </motion.a>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
