"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2, Send, CheckCircle2, XCircle, Mail, Phone, User, AtSign, MessageSquare,
} from "lucide-react";
import BentoCard from "./BentoCard";

/* ─── Validation rules ───────────────────────────────────────── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(name, value) {
  if (!value.trim()) return "This field is required.";
  if (name === "name"    && value.trim().length < 2)   return "Name must be at least 2 characters.";
  if (name === "email"   && !EMAIL_RE.test(value))      return "Enter a valid email address.";
  if (name === "message" && value.trim().length < 10)   return "Message must be at least 10 characters.";
  return "";
}

/* ─── Animated field wrapper ─────────────────────────────────── */
function Field({ id, name, label, error, touched, icon: Icon, children }) {
  const hasError = touched && error;
  return (
    <motion.div
      className="relative"
      animate={hasError ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Floating label */}
      <label
        htmlFor={id}
        className="mb-1.5 flex items-center gap-1.5 text-xs font-medium tracking-wide text-zinc-500"
      >
        <Icon className="h-3 w-3 text-cyan-400/70" />
        {label}
      </label>

      {/* Field border glow */}
      <div
        className={`relative rounded-lg transition-all duration-200 ${
          hasError
            ? "shadow-[0_0_0_1px_rgba(248,113,113,0.5),0_0_12px_rgba(248,113,113,0.1)]"
            : "focus-within:shadow-[0_0_0_1px_rgba(34,211,238,0.35),0_0_16px_rgba(34,211,238,0.08)]"
        }`}
      >
        {children}
      </div>

      {/* Error message */}
      <AnimatePresence mode="wait">
        {hasError && (
          <motion.p
            key="err"
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-1.5 flex items-center gap-1 text-xs text-red-400"
          >
            <XCircle className="h-3 w-3 shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Shared input class ─────────────────────────────────────── */
const inputCls = (hasError) =>
  `w-full rounded-lg border bg-zinc-950/70 px-4 py-2.5 text-sm text-zinc-100
   placeholder:text-zinc-600 transition-colors duration-200 focus:outline-none
   ${hasError
     ? "border-red-500/50 focus:border-red-400/60"
     : "border-zinc-800 hover:border-zinc-700 focus:border-cyan-400/50"}`;

/* ─── Main Component ─────────────────────────────────────────── */
export default function ContactForm() {
  const [form,    setForm]    = useState({ name: "", email: "", message: "" });
  const [errors,  setErrors]  = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [status,  setStatus]  = useState("idle");   // idle | loading | success | error
  const [serverError, setServerError] = useState("");

  const MAX_MSG = 1000;

  /* ── Per-field change + live validate ── */
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (touched[name]) {
      setErrors((p) => ({ ...p, [name]: validate(name, value) }));
    }
  }, [touched]);

  /* ── Mark touched on blur → validate ── */
  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setTouched((p) => ({ ...p, [name]: true }));
    setErrors((p) => ({ ...p, [name]: validate(name, value) }));
  }, []);

  /* ── Submit ── */
  async function handleSubmit(e) {
    e.preventDefault();

    // Touch all fields and validate
    const allTouched = { name: true, email: true, message: true };
    const allErrors  = {
      name:    validate("name",    form.name),
      email:   validate("email",   form.email),
      message: validate("message", form.message),
    };
    setTouched(allTouched);
    setErrors(allErrors);

    if (Object.values(allErrors).some(Boolean)) return;

    setStatus("loading");
    setServerError("");

    try {
      const res  = await fetch("/api/send", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok || !data.success) throw new Error(data.error || "Something went wrong.");

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTouched({ name: false, email: false, message: false });
      setErrors({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setServerError(err.message || "Something went wrong. Please try again.");
    }
  }

  const isLoading  = status === "loading";
  const isSuccess  = status === "success";

  return (
    <BentoCard interactive={false} className="col-span-1 p-8 md:col-span-4">
      <div id="contact" className="grid grid-cols-1 gap-10 md:grid-cols-2">

        {/* ── Left: Info ── */}
        <div>
          <h2 className="text-sm font-medium uppercase tracking-widest text-zinc-500">
            Get in touch
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-400">
            Have a project in mind, or an opportunity to discuss?
            I&apos;ll reply within a couple of days.
          </p>

          <div className="mt-6 space-y-3">
            {/* Email link */}
            <motion.a
              href="mailto:charithachiranjeewa@gmail.com"
              className="group flex items-center gap-2.5 text-sm text-zinc-400"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 transition-colors duration-200 group-hover:border-cyan-400/40 group-hover:bg-cyan-400/10">
                <Mail className="h-3.5 w-3.5 text-cyan-400" />
              </span>
              <span className="transition-colors duration-200 group-hover:text-zinc-100">
                charithachiranjeewa@gmail.com
              </span>
            </motion.a>

            {/* Phone link */}
            <motion.a
              href="tel:+94716855976"
              className="group flex items-center gap-2.5 text-sm text-zinc-400"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 transition-colors duration-200 group-hover:border-cyan-400/40 group-hover:bg-cyan-400/10">
                <Phone className="h-3.5 w-3.5 text-cyan-400" />
              </span>
              <span className="transition-colors duration-200 group-hover:text-zinc-100">
                +94 71 685 5976
              </span>
            </motion.a>
          </div>

          {/* Availability badge */}
          <motion.div
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs text-emerald-400">Available for new projects</span>
          </motion.div>
        </div>

        {/* ── Right: Form ── */}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>

          {/* Name */}
          <Field
            id="name" name="name" label="Your Name" icon={User}
            error={errors.name} touched={touched.name}
          >
            <input
              id="name" name="name" type="text"
              placeholder="Charitha Chiranjeewa"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isLoading}
              className={inputCls(touched.name && errors.name)}
            />
          </Field>

          {/* Email */}
          <Field
            id="email" name="email" label="Email Address" icon={AtSign}
            error={errors.email} touched={touched.email}
          >
            <input
              id="email" name="email" type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isLoading}
              className={inputCls(touched.email && errors.email)}
            />
          </Field>

          {/* Message */}
          <Field
            id="message" name="message" label="Message" icon={MessageSquare}
            error={errors.message} touched={touched.message}
          >
            <div className="relative">
              <textarea
                id="message" name="message"
                rows={4}
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isLoading}
                maxLength={MAX_MSG}
                className={`${inputCls(touched.message && errors.message)} resize-none`}
              />
              {/* Character counter */}
              <span
                className={`absolute bottom-2 right-3 text-[10px] tabular-nums transition-colors ${
                  form.message.length > MAX_MSG * 0.9
                    ? "text-amber-400"
                    : "text-zinc-600"
                }`}
              >
                {form.message.length}/{MAX_MSG}
              </span>
            </div>
          </Field>

          {/* Submit button */}
          <motion.button
            type="submit"
            disabled={isLoading || isSuccess}
            whileHover={!isLoading && !isSuccess ? { scale: 1.02, y: -1 } : {}}
            whileTap={!isLoading && !isSuccess ? { scale: 0.97 } : {}}
            className={`group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
              isSuccess
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "bg-zinc-100 text-zinc-950 disabled:opacity-60"
            }`}
          >
            {/* Shimmer on hover */}
            {!isSuccess && (
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-0 opacity-0 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 30%, rgba(99,102,241,0.25) 50%, rgba(34,211,238,0.25) 65%, transparent 80%)",
                  backgroundSize: "200% 100%",
                }}
                animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              />
            )}

            <span className="relative z-10 flex items-center gap-2">
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Message sent!
                </>
              ) : (
                <>
                  Send message
                  <Send className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </>
              )}
            </span>
          </motion.button>

          {/* Server error */}
          <AnimatePresence>
            {status === "error" && (
              <motion.p
                initial={{ opacity: 0, y: -6, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -6, height: 0 }}
                className="flex items-center gap-2 text-xs text-red-400"
              >
                <XCircle className="h-4 w-4 shrink-0" />
                {serverError}
              </motion.p>
            )}
          </AnimatePresence>
        </form>
      </div>
    </BentoCard>
  );
}
