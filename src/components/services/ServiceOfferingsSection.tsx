import React, { useRef, useState, useEffect } from "react";
import { type SpecializedOffering } from "@/lib/services-store";
import { ServiceOfferingCard } from "./ServiceOfferingCard";
import { ChevronLeft, ChevronRight, ArrowRight, Layers } from "lucide-react";

interface ServiceOfferingsSectionProps {
  serviceTitle: string;
  offerings: SpecializedOffering[];
  eyebrow?: string;
  subtitle?: string;
  ctaText?: string;
}

export function ServiceOfferingsSection({
  serviceTitle,
  offerings,
  eyebrow = "SPECIALIZED SOLUTIONS",
  subtitle = "Bring in specialized professionals when and where they're needed.",
  ctaText = "Consult Recruitment Team",
}: ServiceOfferingsSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(25);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  if (!offerings || offerings.length === 0) return null;

  const updateScrollState = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    const maxScroll = scrollWidth - clientWidth;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < maxScroll - 5);
    const progress = maxScroll > 0 ? ((scrollLeft + clientWidth) / scrollWidth) * 100 : 100;
    setScrollProgress(progress);
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener("scroll", updateScrollState);
      return () => el.removeEventListener("scroll", updateScrollState);
    }
  }, []);

  const handleScrollPrev = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -380, behavior: "smooth" });
    }
  };

  const handleScrollNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 380, behavior: "smooth" });
    }
  };

  return (
    <section id="offerings" className="relative bg-white">
      {/* ── 1. ELEGANT LIGHT CURVED TOP SECTION DIVIDER ── */}
      <div className="w-full overflow-hidden leading-none bg-slate-50 -mt-1 pointer-events-none">
        <svg
          className="relative block w-full h-8 sm:h-12 lg:h-14 text-white"
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

      <div className="pt-4 pb-12 sm:pt-6 sm:pb-16">
        <div className="shell">
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-200/80 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-slate-800">
              <Layers className="h-3.5 w-3.5 text-brand" />
              <span>{eyebrow}</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {serviceTitle} support for teams of all sizes
            </h2>

            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* ── 2. CAROUSEL SLIDER CONTAINER ── */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-6 pt-2 -mx-4 sm:-mx-6 px-4 sm:px-6"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {offerings.map((offering, idx) => (
              <ServiceOfferingCard key={offering.id} offering={offering} index={idx} />
            ))}
          </div>

          {/* ── 3. CAROUSEL NAVIGATION CONTROLS & CTA (NO STRAIGHT LINE ABOVE) ── */}
          <div className="pt-8 mt-4 flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Progress Bar (Left) */}
            <div className="w-48 hidden lg:block">
              <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand transition-all duration-300 rounded-full"
                  style={{ width: `${scrollProgress}%` }}
                />
              </div>
            </div>

            {/* Center Pill CTA Button */}
            <div className="w-full sm:w-auto text-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-8 py-4 text-xs font-black text-white shadow-xl hover:bg-brand transition-all duration-300 cursor-pointer w-full sm:w-auto"
              >
                <span>{ctaText}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* Right Side Carousel Nav Arrow Buttons (< >) */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleScrollPrev}
                disabled={!canScrollLeft}
                aria-label="Previous offering cards"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-800 shadow-sm hover:border-slate-900 hover:bg-slate-900 hover:text-white transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={handleScrollNext}
                disabled={!canScrollRight}
                aria-label="Next offering cards"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-800 shadow-sm hover:border-slate-900 hover:bg-slate-900 hover:text-white transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
