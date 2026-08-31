import { useState, useEffect, useRef } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronRight,
  ArrowRight,
  ArrowUpRight,
  PhoneCall,
  MessageSquare,
  Award,
  Code,
  ShieldCheck,
  TrendingUp,
  Clock,
  DollarSign,
  UserCheck,
  Briefcase,
  Rocket,
  Users,
  PieChart,
  Megaphone,
  BarChart3,
  Compass,
  Sliders,
  Target,
  CheckSquare,
  FileText,
  ShieldAlert,
  Layers,
  CheckCircle,
  Lock,
  Kanban,
  Plus,
  Minus,
  HelpCircle,
  Sparkles,
  Building2,
  Cpu,
  Car,
  Plane,
  Zap,
  Truck,
  Wrench,
  Activity,
  CheckCircle2,
} from "lucide-react";
import heroTeamImg from "@/assets/hero-team.jpg";
import servicesHeroImg from "@/assets/services-hero.jpg";
import { getIndustryBySlug, type IndustryDetail } from "@/lib/industries-store";
import { SERVICES_DATA } from "@/lib/services-store";
import { useFaqs } from "@/lib/faq-store";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FaqSection } from "@/components/site/FaqSection";

export const Route = createFileRoute("/industries/$slug")({
  head: ({ params }) => {
    const ind = params?.slug ? getIndustryBySlug(params.slug) : undefined;
    const title = ind ? ind.metaTitle : "Industry Practice | Venus Hiring";
    const description = ind
      ? ind.metaDescription
      : "Specialized recruitment practices in Technology, Automotive, Aerospace, Manufacturing, Healthcare, Finance, and Supply Chain.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
      ],
    };
  },
  component: IndustryDetailPage,
});

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Award,
  Code,
  ShieldCheck,
  TrendingUp,
  Clock,
  DollarSign,
  UserCheck,
  Briefcase,
  Rocket,
  Users,
  PieChart,
  Megaphone,
  BarChart3,
  Compass,
  Sliders,
  Target,
  CheckSquare,
  FileText,
  ShieldAlert,
  Layers,
  CheckCircle,
  Lock,
  Kanban,
  Building2,
  Cpu,
  Car,
  Plane,
  Zap,
  Truck,
  Wrench,
  Activity,
};

// Default Sector Workflow Steps
const DEFAULT_SECTOR_PROCESS = [
  {
    step: "01",
    shortTitle: "Calibration Brief",
    title: "Requirements & Competency Calibration",
    desc: "In-depth intake session with domain recruiters to define technical standards, licensing, and cultural alignment.",
    detail: "Sector calibration scorecard definition",
  },
  {
    step: "02",
    shortTitle: "Headhunting",
    title: "Confidential Passive Sourcing",
    desc: "Direct outreach to employed sector leaders and specialized talent across top North American firms.",
    detail: "Discreet high-value outreach",
  },
  {
    step: "03",
    shortTitle: "Domain Vetting",
    title: "Technical & Behavioral Screening",
    desc: "Multi-stage assessment covering hard-skills, regulatory compliance, and workplace suitability.",
    detail: "100% Verified credentials audit",
  },
  {
    step: "04",
    shortTitle: "Shortlist Delivery",
    title: "Calibrated Shortlist Presentation",
    desc: "Delivery of 3 to 5 fully vetted candidates backed by detailed interview summaries and scorecards.",
    detail: "3 to 5 business day turnaround",
  },
  {
    step: "05",
    shortTitle: "Offer & Onboarding",
    title: "Offer Negotiation & Retention Guarantee",
    desc: "Closing candidate offer, counter-offer mitigation, and full 90-to-180 day replacement protection.",
    detail: "Full replacement guarantee backing",
  },
];

// Default Who We Help Cards
const DEFAULT_WHO_WE_HELP = [
  {
    title: "Critical Niche Skill Gaps",
    desc: "Organizations requiring specialized technical leads or licensed specialists unavailable on public job boards.",
    tag: "SPECIALIZED TALENT",
  },
  {
    title: "High-Velocity Headcount Expansion",
    desc: "Companies rapidly expanding production, engineering, or operations across Canada and the US.",
    tag: "SCALEUP RECRUITMENT",
  },
  {
    title: "Confidential Executive Replacement",
    desc: "Discreet talent mapping for key leadership succession, plant turnarounds, or division restructuring.",
    tag: "CONFIDENTIAL SEARCH",
  },
  {
    title: "Cross-Border Talent Acquisition",
    desc: "US companies hiring Canadian specialized talent or Canadian firms building US market presence.",
    tag: "CROSS-BORDER SCALING",
  },
];

// Default Market Metrics
const DEFAULT_MARKET_METRICS = [
  {
    title: "46% Faster Headcount Deployment",
    desc: "Sector-focused candidate pipelines reduce average time-to-fill from 45 days down to 14 days.",
  },
  {
    title: "98.4% 1-Year Placement Retention",
    desc: "Domain technical screening and cultural alignment ensure long-term employee commitment and low turnover.",
  },
  {
    title: "88% Passive Candidate Pool",
    desc: "Over 88% of placed sector leaders were sourced through direct confidential headhunting rather than job ads.",
  },
];

function IndustryHero3({ ind }: { ind: IndustryDetail }) {
  return (
    <section className="relative bg-white text-slate-900 min-h-[580px] sm:min-h-[620px] lg:min-h-[660px] h-[88vh] max-h-[850px] flex flex-col justify-between overflow-hidden w-full m-0 p-0">
      {/* SVG Clip Path Definition for Asymmetrical Full-Bleed Mask-Cut Geometry */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="hero-cutout-mask" clipPathUnits="objectBoundingBox">
            <path d="
              M 0, 0
              H 1
              V 0.76
              C 1,0.78 0.99,0.80 0.97,0.80
              H 0.74
              C 0.725,0.80 0.72,0.815 0.72,0.83
              V 0.97
              C 0.72,0.99 0.705,1.0 0.68,1.0
              H 0
              V 0
              Z
            " />
          </clipPath>
        </defs>
      </svg>

      <div className="w-full relative z-10 p-0 m-0 h-full flex-1 flex flex-col justify-between">
        {/* Full-Bleed Hero Composition */}
        <div className="relative h-full min-h-[580px] sm:min-h-[620px] lg:min-h-[660px] flex flex-col justify-between w-full">
          
          {/* 1. ASYMMETRICAL MASKED HERO IMAGE CONTAINER */}
          <div 
            className="relative isolate overflow-hidden bg-slate-900 text-white pt-24 sm:pt-28 lg:pt-32 px-6 sm:px-12 lg:px-16 pb-12 sm:pb-16 lg:pb-20 h-full min-h-[580px] sm:min-h-[620px] lg:min-h-[660px] flex flex-col justify-between shadow-2xl transition-all duration-700 w-full"
            style={{
              clipPath: "url(#hero-cutout-mask)",
              WebkitClipPath: "url(#hero-cutout-mask)",
            }}
          >
            {/* Hero Image clipped inside organic mask */}
            <div className="absolute inset-0 -z-20 overflow-hidden">
              <img
                src={ind.heroImage}
                alt={ind.name}
                className="h-full w-full object-cover object-center filter brightness-[0.38] contrast-110 scale-105 transition-transform duration-1000 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/30" />
            </div>

            {/* Main Headline & Breadcrumbs Block (Positioned Down near bottom of container) */}
            <div className="z-10 mt-auto pb-16 sm:pb-20 lg:pb-24 max-w-4xl lg:max-w-5xl space-y-5">
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.04]">
                {ind.heroHeadline}
              </h1>

              {/* Breadcrumbs positioned directly below heading */}
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-extrabold text-slate-300 uppercase tracking-widest pt-1">
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <Link to="/industries" className="hover:text-white transition-colors">
                  Industries
                </Link>
                <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span className="text-brand font-black">{ind.name}</span>
              </div>
            </div>
          </div>

          {/* 2. ACTION LINKS (CONTACT US & JOIN US) ANCHORED IN THE BOTTOM-RIGHT WHITE NOTCH */}
          <div className="lg:absolute lg:bottom-6 xl:bottom-8 lg:right-10 xl:right-16 pt-6 lg:pt-0 pb-8 lg:pb-0 flex flex-col items-start sm:items-end gap-2.5 sm:gap-3 z-20 px-6 sm:px-8 lg:px-0 text-left sm:text-right lg:max-w-[260px] xl:max-w-[300px]">
            <Link
              to="/contact"
              className="group flex items-center justify-start sm:justify-end gap-3 text-xl sm:text-2xl lg:text-[28px] font-medium tracking-tight text-slate-800 hover:text-brand transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Contact Us</span>
              <ArrowUpRight className="h-6 w-6 sm:h-7 sm:w-7 text-slate-500 group-hover:text-brand group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" />
            </Link>

            <Link
              to="/contact"
              className="group flex items-center justify-start sm:justify-end gap-3 text-xl sm:text-2xl lg:text-[28px] font-medium tracking-tight text-slate-800 hover:text-brand transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Join Us</span>
              <ArrowUpRight className="h-6 w-6 sm:h-7 sm:w-7 text-slate-500 group-hover:text-brand group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

{/* ── REACT BITS PRO FEATURES 9 SECTOR COVERAGE COMPONENT (WHITE & RED THEME) ── */}
function SectorCoverageFeatures9({ ind }: { ind: IndustryDetail }) {
  const whoWeHelpList = ind.whoWeHelp || [];

  const featureCards = [
    {
      id: "tech-leads",
      badge: "ENGINEERING & TECH",
      icon: Code,
      title: whoWeHelpList[0]?.title || "Designers & Tech Leads",
      desc: whoWeHelpList[0]?.desc || "Organizations requiring specialized technical leads or licensed specialists unavailable on public job boards.",
      feature1Title: "One source of truth",
      feature1Desc: "Pull candidate shortlists, domain assessments, and salary benchmarks into a single pipeline.",
      feature2Title: "Move fast, stay calm",
      feature2Desc: "Deploy high-impact technical leads in days with pre-screened North American talent pools.",
      toolkitLabel: "See technical toolkit",
      blobGradient: "from-brand/30 via-rose-500/15 to-transparent",
      accentBg: "bg-brand/10 text-brand",
    },
    {
      id: "team-leads",
      badge: "MANAGEMENT & OPS",
      icon: Users,
      title: whoWeHelpList[1]?.title || "Senior Engineering & Team Leads",
      desc: whoWeHelpList[1]?.desc || "Recruit battle-tested leads who integrate immediately into active sprint cycles, plant operations, and team structures.",
      feature1Title: "Calibrated leadership screening",
      feature1Desc: "Targeted evaluation of team management, code quality oversight, and delivery velocity.",
      feature2Title: "High-retention talent mapping",
      feature2Desc: "Comprehensive vetting focused on long-term organizational tenure and team impact.",
      toolkitLabel: "See leadership toolkit",
      blobGradient: "from-slate-700/25 via-brand/15 to-transparent",
      accentBg: "bg-slate-900/10 text-slate-900",
    },
    {
      id: "founders",
      badge: "EXECUTIVE SEARCH",
      icon: Rocket,
      title: whoWeHelpList[2]?.title || "Founders & Confidential Executive Search",
      desc: whoWeHelpList[2]?.desc || "Uncompromising confidentiality and targeted headhunting for key executive replacement and mission-critical roles.",
      feature1Title: "Discreet executive search",
      feature1Desc: "Uncompromising confidentiality and targeted headhunting for mission-critical executive roles.",
      feature2Title: "Retention guaranteed",
      feature2Desc: "Every executive placement is backed by our full 180-day replacement SLA guarantee.",
      toolkitLabel: "See executive toolkit",
      blobGradient: "from-brand/30 via-rose-600/20 to-transparent",
      accentBg: "bg-brand/10 text-brand",
    },
    {
      id: "operations",
      badge: "GROWTH & PRODUCT",
      icon: Sliders,
      title: whoWeHelpList[3]?.title || "Scale Operations & Growth Leadership",
      desc: whoWeHelpList[3]?.desc || "Process optimization specialists, product strategists, and cross-border expansion leaders driving market growth.",
      feature1Title: "Cross-border compliance",
      feature1Desc: "Full TN visa, payroll, and regulatory compliance management across North America.",
      feature2Title: "Seamless operational scaling",
      feature2Desc: "Expand operations into new territories with localized recruitment expertise.",
      toolkitLabel: "See operations toolkit",
      blobGradient: "from-rose-500/20 via-brand/20 to-transparent",
      accentBg: "bg-slate-900/10 text-slate-900",
    },
  ];

  return (
    <section id="sector-coverage" className="pt-16 pb-24 sm:pt-24 sm:pb-32 bg-white text-slate-900 relative isolate overflow-hidden">
      <div className="shell w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 border border-brand/20 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-brand">
            <span>SECTOR COVERAGE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal text-slate-900 tracking-tight leading-tight">
            Built to <span className="font-serif italic font-normal text-brand">power</span> the teams behind great work
          </h2>
        </div>

        {/* React Bits Pro Features 6: 4-Card Composition with Colored Gradient Blobs & Hover Arrow Accents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {featureCards.map((card) => {
            const IconComp = card.icon || Code;
            const cardBadge = card.badge || "SECTOR COVERAGE";
            const cardGradient = card.blobGradient || "from-brand/30 via-rose-500/15 to-transparent";
            const cardAccentBg = card.accentBg || "bg-brand/10 text-brand";

            return (
              <div
                key={card.id}
                className="group relative rounded-3xl border border-slate-200/90 bg-slate-50/60 p-8 sm:p-10 shadow-lg hover:shadow-2xl hover:border-brand/40 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                {/* Features 6 Colored Gradient Blob Accent */}
                <div
                  className={`absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br ${cardGradient} blur-3xl opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500 pointer-events-none -z-10`}
                />

                <div className="space-y-6 relative z-10">
                  {/* Top Header Row: Icon + Badge + Features 6 Hover Arrow Accent */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`h-12 w-12 rounded-2xl ${cardAccentBg} flex items-center justify-center shadow-sm`}>
                        <IconComp className="h-6 w-6" />
                      </div>
                      <span className="text-xs font-black tracking-widest uppercase text-slate-400">
                        {cardBadge}
                      </span>
                    </div>

                    {/* Features 6 Hover Arrow Accent Button */}
                    <div className="h-10 w-10 rounded-full bg-slate-100 group-hover:bg-brand text-slate-600 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:scale-105">
                      <ArrowUpRight className="h-5 w-5 group-hover:rotate-45 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Card Title & Main Description */}
                  <div className="space-y-3">
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug group-hover:text-brand transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  {/* Feature Highlights Grid */}
                  <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200/80">
                    <div className="space-y-1">
                      <h4 className="font-display text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                        {card.feature1Title}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium leading-normal">
                        {card.feature1Desc}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-display text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                        {card.feature2Title}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium leading-normal">
                        {card.feature2Desc}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-6 mt-6 border-t border-slate-200/80 flex items-center justify-between relative z-10">
                  <span className="text-xs font-bold text-slate-500 group-hover:text-slate-900 transition-colors">
                    {card.toolkitLabel}
                  </span>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold text-brand group-hover:translate-x-1 transition-transform"
                  >
                    <span>Explore Toolkit</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

{/* ── REACT BITS PRO FEATURES 4 RECRUITMENT WORKFLOW COMPONENT ── */}
function RecruitmentWorkflowFeatures4({ ind }: { ind: IndustryDetail }) {
  const processSteps = ind.process || DEFAULT_SECTOR_PROCESS;

  const stageIcons = [Code, Target, ShieldCheck, UserCheck, Award];

  const stageChecklists = [
    [
      "Sector calibration scorecard & rubric definition",
      "Domain recruiter intake & technical licensing check",
      "Compensation benchmarking & market availability audit",
      "Cultural alignment & leadership criteria alignment",
    ],
    [
      "Discreet high-value outreach to passive sector leaders",
      "Direct talent mapping across top North American firms",
      "Proprietary candidate database & referral networks",
      "100% confidential candidate privacy protection",
    ],
    [
      "Multi-stage technical & hard-skills vetting",
      "Regulatory compliance & professional credentials audit",
      "Behavioral assessment & culture-fit evaluation",
      "Reference verification & employment history checks",
    ],
    [
      "Delivery of 3 to 5 fully pre-screened finalists",
      "3 to 5 business day turnaround execution",
      "Comprehensive candidate dossiers & scorecard summaries",
      "Coordinated interview scheduling & feedback management",
    ],
    [
      "Offer closing assistance & counter-offer mitigation",
      "Relocation & TN visa support (if applicable)",
      "180-day replacement SLA guarantee backing",
      "Post-placement onboarding follow-up & retention tracking",
    ],
  ];

  const [activeStep, setActiveStep] = useState(0);

  // Automated 2.5-second stage rotation with clean timer cleanup and manual reset
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % processSteps.length);
    }, 2500);

    return () => clearInterval(timer);
  }, [activeStep, processSteps.length]);

  const activeData = processSteps[activeStep] || processSteps[0];
  const activeChecklist = stageChecklists[activeStep % stageChecklists.length];
  const ActiveIcon = stageIcons[activeStep % stageIcons.length];

  return (
    <section id="process" className="py-16 sm:py-24 bg-slate-50 text-slate-900 relative isolate overflow-hidden">
      <div className="shell relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 border border-brand/20 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-brand">
            <span>RECRUITMENT WORKFLOW</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Our 5-Stage {ind.name} Sourcing Process
          </h2>
          <p className="text-base text-slate-600 font-medium max-w-2xl mx-auto">
            Structured headhunting methodology delivering pre-screened shortlists in 3 to 5 business days.
          </p>
        </div>

        {/* React Bits Pro Features 4 Layout: Left Vertical Selectors + Right Detail Showcase */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch">
          
          {/* LEFT COLUMN: Vertical Interactive Selector Stack */}
          <div className="lg:col-span-5 flex flex-col gap-3 sm:gap-4">
            {processSteps.map((p, idx) => {
              const IconComp = stageIcons[idx % stageIcons.length];
              const isActive = activeStep === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`group relative rounded-2xl p-4 sm:p-5 transition-all duration-300 text-left flex items-center gap-4 cursor-pointer outline-none ${
                    isActive
                      ? "border-2 border-brand bg-white shadow-xl shadow-brand/10 ring-2 ring-brand/10 scale-[1.01]"
                      : "border border-slate-200/80 bg-slate-50/70 hover:border-brand/40 hover:bg-white"
                  }`}
                >
                  <div
                    className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isActive
                        ? "bg-brand text-white shadow-md shadow-brand/20"
                        : "bg-white text-slate-500 border border-slate-200 group-hover:text-brand group-hover:border-brand/40"
                    }`}
                  >
                    <IconComp className="h-5 w-5" />
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-xs font-black text-brand tracking-widest uppercase">
                        STAGE {p.step}
                      </span>
                      <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                        • {p.shortTitle}
                      </span>
                    </div>

                    <h3 className={`font-display text-base sm:text-lg font-bold transition-colors ${
                      isActive ? "text-slate-900" : "text-slate-700 group-hover:text-slate-900"
                    }`}>
                      {p.title}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT COLUMN: React Bits Pro Features 4 Detail Showcase Card */}
          <div className="lg:col-span-7">
            <div className="h-full rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10 lg:p-12 shadow-xl flex flex-col justify-between space-y-8 relative isolate overflow-hidden">
              
              {/* Subtle Brand Accent Light Glow */}
              <div className="absolute -top-24 -right-24 w-80 h-80 bg-brand/5 blur-[100px] rounded-full pointer-events-none -z-10" />

              <div className="space-y-6">
                {/* Header Badge & Icon */}
                <div className="flex items-center justify-between">
                  <div className="h-14 w-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg">
                    <ActiveIcon className="h-7 w-7" />
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-xs font-black text-slate-700 uppercase tracking-widest">
                    <span>STAGE {activeData.step} / {activeData.shortTitle}</span>
                  </span>
                </div>

                {/* Title & Main Description */}
                <div className="space-y-3">
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    {activeData.title}
                  </h3>
                  <p className="text-base text-slate-600 font-medium leading-relaxed">
                    {activeData.desc}
                  </p>
                </div>

                {/* React Bits Pro Checklist Stack (4 Row Items) */}
                <div className="space-y-3 pt-2">
                  {activeChecklist.map((itemText, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 transition-all hover:bg-slate-100/70 hover:border-slate-300"
                    >
                      <div className="h-6 w-6 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-sm">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm font-semibold text-slate-800 leading-snug">
                        {itemText}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom SLA Action Footer */}
              <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                  <Clock className="h-4 w-4 text-brand" />
                  <span>{activeData.detail}</span>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 hover:bg-brand text-white px-5 py-2.5 text-xs font-bold transition-all shadow-md group cursor-pointer"
                >
                  <span>Initiate Stage {activeData.step}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </Link>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

function IndustryDetailPage() {
  const params = Route.useParams();
  const slug = params?.slug;
  const ind = slug ? getIndustryBySlug(slug) : undefined;
  const { faqs } = useFaqs();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [slug]);

  if (!ind) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between">
        <SiteNav />
        <div className="shell py-32 text-center my-auto">
          <h1 className="text-4xl font-black mb-4">Industry Practice Not Found</h1>
          <p className="text-slate-400 mb-8">
            The requested industry category does not exist or has been updated.
          </p>
          <Link
            to="/industries"
            className="inline-flex items-center gap-2 rounded-2xl bg-brand px-6 py-3 text-xs font-bold text-white"
          >
            Browse All Industry Practices
          </Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const categoryFaqs = faqs.filter(
    (f) => f.category === ind.faqCategory || f.category === "Employers"
  );

  const processSteps = ind.process || DEFAULT_SECTOR_PROCESS;
  const whoWeHelpList = ind.whoWeHelp || DEFAULT_WHO_WE_HELP;
  const marketMetrics = ind.marketIntelligence || DEFAULT_MARKET_METRICS;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between selection:bg-brand selection:text-white">
      <SiteNav />

      <main id="main-content" className="flex-1">
        {/* ── 1. HERO 3 ROUNDED WEBGL GRADIENT SHADER WITH CURSOR INTERACTION ── */}
        <IndustryHero3 ind={ind} />

        {/* ── 2. EDITORIAL INTRODUCTION & KEY PROOF POINTS ── */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="shell">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              {/* LEFT: Large Statement Quote */}
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3.5 py-1 text-xs font-extrabold text-brand uppercase tracking-wider">
                  <span>STRATEGIC ALIGNMENT</span>
                </div>
                <blockquote className="font-display text-2xl sm:text-3xl font-black text-slate-900 leading-snug tracking-tight">
                  "{ind.overview.quoteStatement || ind.overview.heading}"
                </blockquote>
                <div className="h-1 w-16 bg-brand rounded-full" />
              </div>

              {/* RIGHT: Paragraphs & Proof Indicators */}
              <div className="lg:col-span-7 space-y-6">
                {ind.overview.paragraphs.map((p, i) => (
                  <p key={i} className="text-base text-slate-600 font-medium leading-relaxed">
                    {p}
                  </p>
                ))}

                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  {ind.overview.keyPoints.map((pt, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3.5 text-xs font-bold text-slate-800"
                    >
                      <CheckCircle2 className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CURVY SECTION DIVIDER (INTRO TO SUB-PRACTICES) ── */}
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

        {/* ── 3. SUB-CATEGORIES & SPECIALIZED DISCIPLINES GRID ── */}
        <section id="subcategories" className="pt-16 pb-24 sm:pt-24 sm:pb-32 bg-slate-50">
          <div className="shell">
            <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-200/80 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-slate-800">
                <span>SUB-PRACTICE HUB</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Specialized {ind.name} Disciplines
              </h2>
              <p className="text-base text-slate-600 font-medium">
                Dedicated recruitment sub-practices built around specialized job functions and technical capabilities.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {ind.subCategories.map((sub, i) => {
                const IconComp = ICON_MAP[sub.iconName] || Building2;
                return (
                  <div
                    key={i}
                    className="group relative rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-xl flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-display text-xs font-black text-brand tracking-widest uppercase">
                          0{i + 1}
                        </span>
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-900 transition-colors group-hover:bg-brand group-hover:text-white">
                          <IconComp className="h-5 w-5" />
                        </div>
                      </div>

                      <h3 className="mt-6 font-display text-xl font-bold text-slate-900 group-hover:text-brand transition-colors">
                        {sub.title}
                      </h3>
                      <p className="mt-3 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                        {sub.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="inline-block rounded-full bg-slate-50 px-3 py-1 text-[11px] font-extrabold text-slate-600">
                        Vetted pipelines ready
                      </span>
                      <Link
                        to="/contact"
                        className="text-xs font-black text-brand uppercase tracking-wider group-hover:underline flex items-center gap-1"
                      >
                        <span>Consult Recruiter</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CURVY SECTION DIVIDER ABOVE BUILT TO POWER THE TEAMS ── */}
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

        {/* ── 4. REACT BITS PRO FEATURES 9 SECTOR COVERAGE SECTION ── */}
        <SectorCoverageFeatures9 ind={ind} />

        {/* ── CURVY SECTION DIVIDER ABOVE RECRUITMENT WORKFLOW ── */}
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

        {/* ── 5. REACT BITS PRO FEATURES 4 RECRUITMENT WORKFLOW SECTION ── */}
        <RecruitmentWorkflowFeatures4 ind={ind} />

        {/* ── CURVY SECTION DIVIDER BETWEEN RECRUITMENT WORKFLOW & TALENT SPECIALIZATION ── */}
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

        {/* ── 5.5. TALENT SPECIALIZATION & TARGET ROLES (2-COLUMN STICKY LAYOUT EXACT MATCH) ── */}
        <section className="relative bg-white">

          <div className="py-12 sm:py-20 shell relative z-10">
            <div className="grid gap-12 lg:grid-cols-12 items-start">
              {/* LEFT COLUMN: Sticky Title, Description & CTA (EXACT FAQ MATCH) */}
              <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28 self-start">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/5 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-brand">
                    <Users className="h-3.5 w-3.5" />
                    <span>TALENT SPECIALIZATION</span>
                  </div>

                  <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
                    Roles & Talent We Can <span className="text-brand">Help You Find</span>
                  </h2>

                  <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
                    We maintain an active network of non-job-seeking top 5% leaders in {ind.name}, pre-screening candidates for domain depth, cultural fit, and long-term retention.
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2.5 rounded-2xl bg-brand px-7 py-3.5 text-xs font-black text-white shadow-brand hover:brightness-110 transition-all cursor-pointer"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>Request Custom Talent Brief</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* RIGHT COLUMN: Clean Individual Cards (EXACT FAQ MATCH - NO OUTLINE BOX!) */}
              <div className="lg:col-span-7 space-y-4">
                {ind.targetRoles.map((role, idx) => {
                  let levelBadge = "LEADERSHIP";
                  if (
                    role.includes("CTO") ||
                    role.includes("VP") ||
                    role.includes("Chief") ||
                    role.includes("Director") ||
                    role.includes("Head") ||
                    role.includes("President") ||
                    role.includes("CPA") ||
                    role.includes("CMO")
                  ) {
                    levelBadge = "EXECUTIVE";
                  } else if (
                    role.includes("Architect") ||
                    role.includes("Lead") ||
                    role.includes("Manager") ||
                    role.includes("Principal") ||
                    role.includes("Senior")
                  ) {
                    levelBadge = "SENIOR LEAD";
                  }

                  const numStr = (idx + 1).toString().padStart(2, "0");

                  return (
                    <Link
                      key={idx}
                      to="/contact"
                      className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 flex items-center justify-between gap-4 transition-all duration-300 hover:border-slate-300 hover:shadow-md group cursor-pointer"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <span className="text-xs font-black px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 group-hover:bg-brand/10 group-hover:text-brand transition-colors shrink-0">
                          {numStr}
                        </span>

                        <h3 className="font-display text-base sm:text-lg font-black text-slate-900 group-hover:text-brand transition-colors leading-snug">
                          {role}
                        </h3>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="hidden sm:inline-block rounded-full bg-brand/10 border border-brand/20 px-3 py-1 text-[10px] font-black text-brand tracking-wider uppercase">
                          {levelBadge}
                        </span>

                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 group-hover:bg-brand group-hover:text-white transition-all duration-300">
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. SECTOR MARKET INTELLIGENCE (CLEAN UNBORDERED METRICS MATCHING SECTION 8) ── */}
        <section className="relative bg-white overflow-hidden">
          {/* Curved Top Section Divider from bg-slate-50 into bg-white */}
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

          <div className="py-12 sm:py-20 shell">
            <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-slate-700">
                <span>MARKET INTELLIGENCE</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {ind.name} Hiring Trends & Metrics
              </h2>
              <p className="text-base text-slate-600 font-medium">
                Data-backed insights from recent talent placements across Canada and the US.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {marketMetrics.map((m, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="flex items-center gap-2 text-brand">
                    <TrendingUp className="h-5 w-5" />
                    <h3 className="font-display text-xl font-black text-slate-900">
                      {m.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. RECOMMENDED SERVICES ── */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="shell">
            <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-slate-800">
                <span>RECRUITMENT MODELS</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Recommended Service Models for {ind.name}
              </h2>
              <p className="text-base text-slate-600 font-medium">
                Select a recruitment practice model tailored to your headcount timelines and hiring strategy.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {ind.recommendedServicesSlugs.map((sSlug) => {
                const sData = SERVICES_DATA[sSlug];
                if (!sData) return null;
                return (
                  <Link
                    key={sSlug}
                    to="/services/$slug"
                    params={{ slug: sSlug }}
                    className="group rounded-3xl border border-slate-200 bg-slate-50 p-8 space-y-4 shadow-sm hover:border-brand/40 hover:shadow-xl transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black text-slate-700 uppercase tracking-wider">
                        {sData.eyebrow}
                      </span>
                      <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-brand transition-colors">
                        {sData.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed line-clamp-3">
                        {sData.heroValueProp}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-extrabold text-brand uppercase tracking-wider group-hover:underline">
                        View Service Practice
                      </span>
                      <ArrowRight className="h-4 w-4 text-brand" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 8. SECTOR FAQ (WITH LG:STICKY DESKTOP SCOPING) ── */}
        {categoryFaqs.length > 0 && (
          <FaqSection
            faqs={categoryFaqs}
            eyebrow="SECTOR FAQ"
            title={`Frequently Asked Questions for ${ind.name}`}
            subtitle="Find answers regarding specialized candidate sourcing, replacement guarantees, and sector deployment speed."
          />
        )}

        {/* ── 9. CONVERSION CTA BANNER (VOY-STYLE ETHEREAL LIGHT CARD MATCHING SERVICE PAGES) ── */}
        <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
          <div className="shell">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/90 bg-gradient-to-b from-white via-slate-50/50 to-rose-50/30 p-8 sm:p-14 text-center shadow-xl">
              {/* Ethereal Glow Orb */}
              <div
                className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 h-80 w-[36rem] rounded-full bg-gradient-to-tr from-rose-500/25 via-brand/15 to-transparent blur-3xl"
                aria-hidden
              />

              <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/5 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-brand">
                  <PhoneCall className="h-3.5 w-3.5" />
                  <span>START RECRUITING TODAY</span>
                </div>

                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  Ready to Hire Top <span className="text-brand">{ind.name}</span> Talent?
                </h2>

                <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
                  Connect with our dedicated sector team to receive a pre-screened candidate shortlist within 5 business days.
                </p>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 text-xs font-extrabold text-white shadow-brand shadow-md transition-all hover:brightness-110 cursor-pointer"
                  >
                    <span>Book an Industry Consultation</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/services"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-8 py-4 text-xs font-extrabold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    <span>Explore Practice Services</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
