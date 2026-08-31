import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  HelpCircle,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { type FaqItem } from "@/lib/faq-store";

interface FaqSectionProps {
  faqs: FaqItem[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

export function FaqSection({
  faqs,
  eyebrow = "SERVICE FAQ",
  title = "Frequently Asked Questions",
  subtitle = "Explore transparent details regarding our engagement models, replacement guarantees, and candidate shortlisting speed.",
}: FaqSectionProps) {
  const [openFaqId, setOpenFaqId] = useState<string | null>(
    faqs.length > 0 ? faqs[0].id : null
  );

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="relative bg-slate-50">
      {/* Curved Top Section Divider from bg-white into bg-slate-50 */}
      <div className="w-full overflow-hidden leading-none bg-white -mt-1 pointer-events-none">
        <svg
          className="relative block w-full h-8 sm:h-12 lg:h-14 text-slate-50"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,120 C480,15 960,15 1440,120 L1440,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="py-12 sm:py-20 shell">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          
          {/* LEFT COLUMN: Sticky Title & Description (scoped to lg so mobile flows naturally) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28 self-start">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-brand">
                <HelpCircle className="h-3.5 w-3.5" />
                <span>{eyebrow}</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
                {title}
              </h2>

              <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
                {subtitle}
              </p>
            </div>

            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 rounded-2xl bg-brand px-7 py-3.5 text-xs font-black text-white shadow-brand hover:brightness-110 transition-all cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                <span>Ask a Custom Question</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Clean White Accordion Cards (Scrolls smoothly on the right) */}
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "bg-white border-brand/40 border-l-4 border-l-brand shadow-xl ring-1 ring-brand/10"
                      : "bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-md"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full flex items-center justify-between gap-4 p-6 sm:p-7 text-left cursor-pointer focus:outline-none group"
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-xs font-black px-2.5 py-1 rounded-full transition-colors shrink-0 ${
                          isOpen
                            ? "bg-brand/10 text-brand"
                            : "bg-slate-100 text-slate-500 group-hover:text-slate-700"
                        }`}
                      >
                        0{index + 1}
                      </span>
                      <h3 className="font-display text-base sm:text-lg font-black text-slate-900 group-hover:text-brand transition-colors leading-snug">
                        {faq.q}
                      </h3>
                    </div>

                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl transition-all duration-300 ${
                        isOpen
                          ? "bg-brand text-white rotate-180 shadow-brand scale-105"
                          : "bg-slate-100 text-slate-700 group-hover:bg-slate-200"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="h-4 w-4 stroke-[2.5]" />
                      ) : (
                        <Plus className="h-4 w-4 stroke-[2.5]" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-7 sm:px-7 sm:pb-8 pt-0 text-sm text-slate-600 font-medium leading-relaxed border-t border-slate-100 transition-all">
                      <p className="pt-5 text-slate-700 font-medium text-sm sm:text-base leading-relaxed">
                        {faq.a}
                      </p>

                      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="inline-flex items-center gap-1.5 font-bold text-slate-400 uppercase tracking-wider text-[11px]">
                          <CheckCircle2 className="h-3.5 w-3.5 text-brand" />
                          <span>Category: {faq.category || "General"}</span>
                        </span>

                        <Link
                          to="/contact"
                          className="font-extrabold text-brand hover:underline inline-flex items-center gap-1"
                        >
                          <span>Ask about this →</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Bottom Dedicated FAQ Page Link */}
            <div className="pt-4 text-center sm:text-left">
              <Link
                to="/faq"
                className="inline-flex items-center gap-2 text-xs font-black text-brand uppercase tracking-wider hover:underline"
              >
                <span>View all FAQs on our dedicated FAQ page</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
