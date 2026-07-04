"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Github, Linkedin, MapPin } from "lucide-react";
import BentoCard from "./BentoCard";

export default function Hero() {
  return (
    <BentoCard
      interactive={false}
      className="col-span-1 grid grid-cols-1 gap-8 p-8 sm:grid-cols-[1fr_auto] md:col-span-4 md:p-12"
    >
      {/* Ambient gradient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -30, 20, 0], y: [0, 20, -30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-32 -right-16 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl"
        />
        <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      </div>

      <div className="relative z-10 flex flex-col justify-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-3 py-1 text-xs text-zinc-400"
        >
          <MapPin className="h-3 w-3 text-cyan-400" />
          Malabe, Sri Lanka
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-bold leading-[1.05] tracking-tight text-zinc-100 sm:text-5xl lg:text-6xl"
        >
          <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Charitha
          </span>{" "}
          Chiranjeewa
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 max-w-md text-base text-zinc-400"
        >
          Full-Stack Developer crafting secure, scalable enterprise-grade web
          &amp; mobile experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-3"
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group inline-flex items-center gap-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 shadow-sm w-full sm:w-auto sm:flex-1 mb-2 sm:mb-0 px-4 py-2 text-base font-medium text-zinc-950 transition-transform duration-200 hover:scale-105"
          >
            Get in touch
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="/api/download-resume"
            download="Charitha_Resume.pdf"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 hover:brightness-110 shadow-sm w-full sm:w-auto sm:flex-1 mb-2 sm:mb-0 px-4 py-2 text-base font-medium text-white transition-transform duration-200 hover:scale-105"
          >
            Download Resume
          </a>
          <a
            href="https://github.com/charitha200304"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="inline-flex items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/60 hover:brightness-110 shadow-sm w-full sm:w-auto sm:flex-1 mb-2 sm:mb-0 px-4 py-2 text-base text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-100"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/charitha-chiranjeewa-897526381/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="inline-flex items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/60 hover:brightness-110 shadow-sm w-full sm:w-auto sm:flex-1 mb-2 sm:mb-0 px-4 py-2 text-base text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-100"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </motion.div>
      </div>

      {/* Profile image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="group relative z-10 mx-auto h-40 w-40 shrink-0 self-center sm:h-48 sm:w-48"
      >
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-indigo-400 via-cyan-400 to-emerald-400 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-60" />
        <div className="relative h-full w-full overflow-hidden rounded-2xl border border-zinc-800">
          <Image
            src="/profile.jpg"
            alt="Charitha Chiranjeewa"
            fill
            sizes="192px"
            className="object-cover grayscale-[15%] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
            priority
          />
        </div>
      </motion.div>
    </BentoCard>
  );
}
