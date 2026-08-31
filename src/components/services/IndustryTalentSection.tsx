import { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import {
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Car,
  Plane,
  Building2,
  Stethoscope,
  DollarSign,
  Truck,
  Layers,
} from "lucide-react";
import { INDUSTRIES_DATA, type IndustryDetail } from "@/lib/industries-store";

const INDUSTRY_TABS = [
  { slug: "technology", label: "Technology", icon: Cpu },
  { slug: "automotive-ev", label: "Automotive & EV", icon: Car },
  { slug: "aerospace", label: "Aerospace", icon: Plane },
  { slug: "manufacturing", label: "Manufacturing", icon: Building2 },
  { slug: "healthcare", label: "Healthcare", icon: Stethoscope },
  { slug: "finance-corporate", label: "Finance & Accounting", icon: DollarSign },
  { slug: "supply-chain", label: "Supply Chain", icon: Truck },
];

interface IndustryTalentSectionProps {
  title?: string;
  subtitle?: string;
  showCurvedTop?: boolean;
}

export function IndustryTalentSection({
  title = "Add specialized talent across your organization",
  subtitle = "Select an industry sector to explore specialized candidate roles, practice depth, and workforce deployment speed.",
  showCurvedTop = true,
}: IndustryTalentSectionProps) {
  const [activeTab, setActiveTab] = useState<string>("technology");
  const [isFading, setIsFading] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const tabRowContainerRef = useRef<HTMLDivElement | null>(null);

  // ── AUTO-ROTATION TIMER (2.5 SECONDS) ──
  const startAutoRotation = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setActiveTab((prevTab) => {
          const currentIndex = INDUSTRY_TABS.findIndex((tab) => tab.slug === prevTab);
          const nextIndex = (currentIndex + 1) % INDUSTRY_TABS.length;
          return INDUSTRY_TABS[nextIndex].slug;
        });
        setIsFading(false);
      }, 150);
    }, 2500);
  };

  useEffect(() => {
    startAutoRotation();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Smooth scroll ONLY the tab row container horizontally on mobile (NEVER scroll the page window!)
  useEffect(() => {
    const activeEl = tabRefs.current[activeTab];
    const containerEl = tabRowContainerRef.current;
    if (activeEl && containerEl) {
      const scrollOffset = activeEl.offsetLeft - (containerEl.clientWidth / 2) + (activeEl.clientWidth / 2);
      containerEl.scrollTo({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  }, [activeTab]);

  const handleTabClick = (slug: string) => {
    if (slug === activeTab) return;
    setIsFading(true);
    setActiveTab(slug);
    setTimeout(() => {
      setIsFading(false);
    }, 150);
    startAutoRotation(); // restart 2.5s timer on manual click
  };

  const currentIndustry: IndustryDetail = useMemo(() => {
    return INDUSTRIES_DATA[activeTab] || INDUSTRIES_DATA["technology"];
  }, [activeTab]);

  return (
    <section id="industry-talent" className="relative bg-slate-50 overflow-hidden">
      {/* Curved Top Section Divider */}
      {showCurvedTop && (
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
      )}

      <div className="pt-4 pb-12 sm:pt-6 sm:pb-16">
        <div className="shell">
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-brand">
              <Layers className="h-3.5 w-3.5" />
              <span>INDUSTRY SPECIALIZATION</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {title}
            </h2>

            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Industry Horizontal Tabs Row (Scrollable on mobile & Auto-centered) */}
          <div
            ref={tabRowContainerRef}
            className="flex justify-start sm:justify-center overflow-x-auto scrollbar-none pb-4 mb-8 sm:mb-12 -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            <div className="flex items-center gap-1.5 sm:gap-2 bg-white p-1.5 sm:p-2 rounded-2xl sm:rounded-full border border-slate-200/90 shadow-sm shrink-0">
              {INDUSTRY_TABS.map((tab) => {
                const IconComp = tab.icon;
                const isActive = activeTab === tab.slug;
                return (
                  <button
                    key={tab.slug}
                    ref={(el) => {
                      tabRefs.current[tab.slug] = el;
                    }}
                    type="button"
                    onClick={() => handleTabClick(tab.slug)}
                    className={`inline-flex items-center gap-1.5 sm:gap-2 rounded-xl sm:rounded-full px-3.5 py-2 sm:px-5 sm:py-3 text-[11px] sm:text-xs font-extrabold transition-all duration-300 cursor-pointer shrink-0 ${
                      isActive
                        ? "bg-brand text-white shadow-brand scale-105"
                        : "bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <IconComp className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isActive ? "text-white" : "text-slate-500"}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Content Area with Smooth Fade Transition */}
          <div
            className={`grid gap-8 lg:gap-10 lg:grid-cols-12 lg:items-center bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200/90 shadow-lg transition-all duration-300 transform ${
              isFading ? "opacity-40 scale-[0.995]" : "opacity-100 scale-100"
            }`}
          >
            {/* Left Column: Description, Roles We Hire For, CTA */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <span className="inline-block rounded-full bg-slate-100 px-3.5 py-1 text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">
                  {currentIndustry.eyebrow}
                </span>

                <h3 className="font-display text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {currentIndustry.name}
                </h3>

                <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                  {currentIndustry.heroValueProp}
                </p>
              </div>

              {/* Roles We Hire For Block */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                  Roles We Hire For:
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {currentIndustry.targetRoles.map((role, idx) => (
                    <div
                      key={`${currentIndustry.slug}-${idx}`}
                      className="flex items-center gap-2.5 rounded-2xl bg-slate-50 p-3 text-xs font-bold text-slate-800 border border-slate-100 transition-all duration-200 hover:border-brand/30"
                    >
                      <CheckCircle2 className="h-4 w-4 text-brand shrink-0" />
                      <span className="truncate">{role}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Know More Link */}
              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-4">
                <Link
                  to="/industries/$slug"
                  params={{ slug: currentIndustry.slug }}
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-7 py-3.5 text-xs font-black text-white hover:bg-brand transition-all shadow-md cursor-pointer"
                >
                  <span>Know More</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-black text-brand uppercase tracking-wider hover:underline"
                >
                  <span>Request {currentIndustry.name} Talent →</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Industry Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl group">
                <img
                  src={currentIndustry.heroImage}
                  alt={currentIndustry.name}
                  className="h-72 sm:h-96 w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
