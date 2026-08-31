import { useEffect, useRef, useState } from "react";
import { CtaLink } from "./primitives";
import heroImg from "@/assets/hero-office.jpg";
import { scrollToSection } from "@/lib/scroll";
import { X, Phone, Mail, CheckCircle2, Loader2, Send, AlertCircle } from "lucide-react";

export function Hero() {
  const [offset, setOffset] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement | null>(null);

  // Modal State for Hire Talent popup
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    hearAboutUs: "LinkedIn / Social Media",
    message: "",
    website: "", // Honeypot spam trap
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const nextOffset = Math.min(window.scrollY, 700) * 0.16;
        setOffset((prev) => (prev !== nextOffset ? nextOffset : prev));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    if (media.matches || coarse.matches) return;
    const node = sectionRef.current;
    if (!node) return;
    let frame = 0;
    const onMove = (event: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = node.getBoundingClientRect();
        setPointer({
          x: (event.clientX - rect.left) / rect.width - 0.5,
          y: (event.clientY - rect.top) / rect.height - 0.5,
        });
      });
    };
    node.addEventListener("pointermove", onMove);
    return () => {
      node.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const isValidEmailFormat = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Client-side validation
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();

    if (!trimmedName) {
      setSubmitError("Please enter your full name.");
      return;
    }

    if (!trimmedEmail || !isValidEmailFormat(trimmedEmail)) {
      setSubmitError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "Homepage Hero - Hire Talent Popup",
          submissionType: "Hire Talent",
          name: trimmedName,
          email: trimmedEmail,
          hearAboutUs: formData.hearAboutUs,
          message: formData.message.trim(),
          website: formData.website, // Honeypot field
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && result.success !== false) {
        setIsSubmitted(true);
        setSubmitError(null);
      } else {
        setSubmitError(
          result.message || "Unable to submit your inquiry at this time. Please try again."
        );
      }
    } catch (err) {
      console.error("Hire Talent submission error:", err);
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setIsSubmitted(false);
      setSubmitError(null);
      setFormData({
        name: "",
        email: "",
        hearAboutUs: "LinkedIn / Social Media",
        message: "",
        website: "",
      });
    }, 300);
  };

  return (
    <>
      <section
        id="top"
        ref={sectionRef}
        className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink"
      >
        {/* Background photograph with Ken Burns + soft parallax */}
        <div
          className="absolute inset-0 -z-20"
          style={{ transform: `translate3d(0, ${offset}px, 0)` }}
        >
          <img
            src={heroImg}
            alt="Diverse team of professionals in a modern Canadian corporate office meeting"
            width={1920}
            height={1280}
            fetchPriority="high"
            decoding="async"
            className="ken-burns h-full w-full scale-105 object-cover object-center"
          />
        </div>

        {/* Elegant dark gradient overlay */}
        <div className="absolute inset-0 -z-10 hero-scrim" aria-hidden />
        <div className="absolute inset-0 -z-10 bg-ink/25 backdrop-blur-[2px]" aria-hidden />

        {/* Floating light shapes with mouse parallax */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
          <span
            className="float-soft absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-brand/25 blur-3xl transition-transform duration-700 ease-out"
            style={{ transform: `translate3d(${pointer.x * 40}px, ${pointer.y * 28}px, 0)` }}
          />
          <span
            className="float-soft absolute right-[8%] top-10 h-64 w-64 rounded-full bg-ink-foreground/10 blur-3xl transition-transform duration-700 ease-out"
            style={{
              animationDelay: "1.6s",
              transform: `translate3d(${pointer.x * -55}px, ${pointer.y * -34}px, 0)`,
            }}
          />
          <span className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        </div>

        <div className="shell relative w-full py-20 sm:py-24 lg:py-28">
          <div className="max-w-4xl">
            <h1
              className="blur-reveal text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[5rem] xl:text-[5.5rem] font-semibold leading-[1.04] tracking-tight text-ink-foreground"
              style={{ animationDelay: "80ms" }}
            >
              Beyond solutions,
              <br />
              we build <span className="text-gradient-brand">success</span>
            </h1>

            <p
              className="blur-reveal mt-7 max-w-xl text-lg leading-relaxed text-ink-foreground/80 sm:text-xl"
              style={{ animationDelay: "300ms" }}
            >
              We unite technology, talent and opportunity — partnering with Canadian employers to hire
              faster, and with professionals to land the role that fits.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <div className="rise-in" style={{ animationDelay: "420ms" }}>
                <CtaLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsModalOpen(true);
                  }}
                  size="lg"
                >
                  Hire Talent
                </CtaLink>
              </div>
              <div className="rise-in" style={{ animationDelay: "520ms" }}>
                <CtaLink href="/careers" variant="outlineLight" size="lg">
                  Find Jobs
                </CtaLink>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#who-we-serve"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("who-we-serve", { offset: 70 });
          }}
          aria-label="Scroll to Tailored Solutions"
          className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-foreground/60 transition-colors duration-300 hover:text-ink-foreground sm:flex"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em]">Scroll</span>
          <span className="relative grid h-9 w-5 place-items-start justify-center overflow-hidden rounded-full border border-ink-line pt-1.5">
            <span className="scroll-cue block h-1.5 w-1 rounded-full bg-brand" aria-hidden />
          </span>
        </a>
      </section>

      {/* ── HIRE TALENT MODAL POPUP ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200 font-sans">
          <div className="relative w-full max-w-lg bg-slate-900 text-white rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl overflow-hidden my-8">
            
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              type="button"
              onClick={handleCloseModal}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-1.5 pr-8">
              <span className="px-3 py-1 rounded-full bg-red-950/80 text-red-400 text-[10px] font-extrabold uppercase border border-red-800/60 inline-block mb-1">
                Get in Touch
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Hire Talent with Venus
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Tell us about your hiring needs & our recruitment partners will get in touch within 24 hours.
              </p>
            </div>

            {/* Contact Details Cards */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center shrink-0 border border-red-500/20">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Phone Number</p>
                  <a href="tel:+16477220837" className="text-xs font-black text-white hover:text-red-400 transition-colors">
                    +647-722-0837
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center shrink-0 border border-red-500/20">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Email</p>
                  <a href="mailto:info@venushiring.ca" className="text-xs font-black text-white hover:text-red-400 transition-colors">
                    info@venushiring.ca
                  </a>
                </div>
              </div>
            </div>

            {/* Form Body or Submitted State */}
            {isSubmitted ? (
              <div className="mt-6 py-8 text-center space-y-3 bg-emerald-950/40 rounded-2xl border border-emerald-800/50 p-6 animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-black text-white">Thank You!</h4>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  Your hiring inquiry has been received. Our senior recruitment team will review your details and reach out within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
                {/* Honeypot Spam Protection Field (Invisible to real users) */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
                  />
                </div>

                {/* Error Banner */}
                {submitError && (
                  <div className="p-3 rounded-xl bg-red-950/80 border border-red-800/80 text-red-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Name */}
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-300 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    disabled={isSubmitting}
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Your Full Name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-600/30 focus:border-red-600 transition-all disabled:opacity-60"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-300 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    disabled={isSubmitting}
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-600/30 focus:border-red-600 transition-all disabled:opacity-60"
                  />
                </div>

                {/* How did you hear about us */}
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-300 mb-1">
                    How Did You Hear About Us?
                  </label>
                  <select
                    disabled={isSubmitting}
                    value={formData.hearAboutUs}
                    onChange={(e) => setFormData((prev) => ({ ...prev, hearAboutUs: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-red-600/30 focus:border-red-600 transition-all cursor-pointer disabled:opacity-60"
                  >
                    <option value="LinkedIn / Social Media">LinkedIn / Social Media</option>
                    <option value="Google / Search Engine">Google / Search Engine</option>
                    <option value="Referral / Word of Mouth">Referral / Word of Mouth</option>
                    <option value="Event / Conference">Event / Conference</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Leave us message */}
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-300 mb-1">
                    Leave Us a Message
                  </label>
                  <textarea
                    rows={3}
                    disabled={isSubmitting}
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    placeholder="Tell us about the roles, skills, or hiring timeline you need help with..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-600/30 focus:border-red-600 transition-all resize-none disabled:opacity-60"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>
        </div>
      )}
    </>
  );
}
