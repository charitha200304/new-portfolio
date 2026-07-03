import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ExperienceEducation from "@/components/ExperienceEducation";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import ContactForm from "@/components/ContactForm";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-zinc-950 px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      {/* Static grid dot pattern */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />

      {/* ── Animated background — aurora blobs, particles, rings ── */}
      <AnimatedBackground />

      {/* ── Page content ── */}
      <div className="relative z-10 mx-auto max-w-6xl">
        <Nav />

        <div id="home" className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Hero />
          <ExperienceEducation />
          <Skills />
          <Projects />
          <ContactForm />
        </div>

        <footer className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-zinc-900 pt-6 text-xs text-zinc-600 sm:flex-row">
          <p>© {new Date().getFullYear()} Charitha Chiranjeewa. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
