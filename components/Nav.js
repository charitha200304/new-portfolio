"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Menu, X } from "lucide-react";
const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      Boolean
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function handleClick(e, id) {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
  }

  return (
    <>
      <header className="sticky top-4 z-50 mx-auto mb-10 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950/80 px-4 py-3 backdrop-blur-xl sm:px-6">
          <a
            href="#home"
            onClick={(e) => handleClick(e, "home")}
            className="text-sm font-semibold tracking-tight text-zinc-100"
          >
            Charitha<span className="text-cyan-400">.</span>
          </a>
          <button className="sm:hidden flex items-center gap-2 text-zinc-400 hover:text-zinc-100" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? "Close" : "Menu"}>
  {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
</button>
          <nav className="hidden gap-1 sm:flex">
            {LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleClick(e, link.id)}
                className="relative rounded-lg px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-lg border border-zinc-700 bg-zinc-800/70"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            onClick={(e) => handleClick(e, "contact")}
            className="hidden sm:inline-flex items-center rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-950 transition-transform hover:scale-105 sm:text-sm"
          >
            Hire me
          </a>
        </div>
      </header>
        {mobileOpen && (
  <div className="fixed inset-0 bg-zinc-950/90 backdrop-blur-xl z-40 flex flex-col items-center justify-center">
    {LINKS.map((link) => (
      <a
        key={link.id}
        href={`#${link.id}`}
        onClick={(e) => { handleClick(e, link.id); setMobileOpen(false); }}
        className="my-2 text-lg text-zinc-200 hover:text-cyan-400"
      >
        {link.label}
      </a>
    ))}
  </div>
)}
    </>
  );
}
