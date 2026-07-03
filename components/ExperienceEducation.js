"use client";

import { Briefcase, GraduationCap } from "lucide-react";
import BentoCard from "./BentoCard";

export default function ExperienceEducation() {
  return (
    <BentoCard
      className="col-span-1 p-8 md:col-span-2 lg:col-span-2"
    >
      <div id="about">
        <h2 className="text-sm font-medium uppercase tracking-widest text-zinc-500">
          Experience &amp; Education
        </h2>

        <div className="mt-5 flex gap-4">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950/60 text-cyan-400">
            <Briefcase className="h-4 w-4" />
          </div>
          <div>
            <div className="flex flex-wrap items-baseline gap-x-2">
              <h3 className="text-sm font-semibold text-zinc-100">
                Full-Stack Developer Intern
              </h3>
              <span className="text-xs text-zinc-500">
                RedCode Solutions · 2025/10 – 2026/04
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Building decoupled frontends in React and Vue.js on top of
              Spring Boot and NestJS backends, with JWT authentication and
              two-factor authentication (2FA) protecting production data.
              Managing MongoDB and MySQL schemas and designing high-contrast
              dashboards with Tailwind CSS in an Agile team.
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950/60 text-emerald-400">
            <GraduationCap className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-100">
              Graduate Diploma in Software Engineering
            </h3>
            <span className="text-xs text-zinc-500">
              Institute of Software Engineering (IJSE) · Panadura / Colombo
            </span>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Full-stack development, Java enterprise architecture with
              Spring Boot, and database management, with hands-on Rapid
              Application Development (RAD) practice.
            </p>
          </div>
        </div>
      </div>
    </BentoCard>
  );
}
