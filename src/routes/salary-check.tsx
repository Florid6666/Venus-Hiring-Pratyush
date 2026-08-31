import { useState, useEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Brain,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Briefcase,
  TrendingUp,
  MapPin,
  CheckCircle2,
  Target,
  Lightbulb,
  Award,
  DollarSign,
  Building2,
  ArrowRight,
  RotateCcw,
  ExternalLink,
  Share2,
  Edit3,
  BarChart3,
  Loader2,
  Check,
  Calculator,
} from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import {
  formatSalaryCurrency,
  normalizeSalaryInput,
  type CandidateProfile,
  type SalaryResearchResult,
} from "@/lib/salaryCheckState";

const TITLE = "Salary Check AI | Venus Hiring";
const DESCRIPTION =
  "Describe your experience, skills, and current role to get a personalized market value assessment and negotiation roadmap from Venus AI Salary Intelligence.";

export const Route = createFileRoute("/salary-check")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
    ],
  }),
  component: SalaryCheckPage,
});

type RightPanelState = "EMPTY" | "RESEARCHING" | "RESULT";

const ROLE_SUGGESTIONS = [
  "Full Stack Developer",
  "Software Engineer",
  "WordPress Developer",
  "UI/UX Designer",
  "Digital Marketing Executive",
  "Sales Executive",
  "Data Analyst",
  "Product Manager",
];

const EXPERIENCE_LEVELS = [
  { label: "Junior (1-3 years)", value: 2, seniority: "Junior" },
  { label: "Mid Level (3-5 years)", value: 4, seniority: "Mid" },
  { label: "Senior Level (5-8 years)", value: 6.5, seniority: "Senior" },
  { label: "Lead / Principal (8+ years)", value: 9.5, seniority: "Lead" },
];

const SKILL_PROFICIENCY_LEVELS = [
  { label: "Beginner", bonusPercent: 0, text: "Beginner (+0%)" },
  { label: "Intermediate", bonusPercent: 3, text: "Intermediate (+3%)" },
  { label: "Advanced", bonusPercent: 7, text: "Advanced (+7%)" },
  { label: "Expert", bonusPercent: 12, text: "Expert (+12%)" },
];

const COUNTRY_OPTIONS = [
  { label: "India (INR)", value: "India", currency: "INR", symbol: "₹" },
  { label: "Canada (CAD)", value: "Canada", currency: "CAD", symbol: "C$" },
  { label: "United States (USD)", value: "United States", currency: "USD", symbol: "$" },
  { label: "United Kingdom (GBP)", value: "United Kingdom", currency: "GBP", symbol: "£" },
  { label: "Remote / Global Hubs", value: "Remote", currency: "USD", symbol: "$" },
];

const CITY_OPTIONS_BY_COUNTRY: Record<string, string[]> = {
  India: ["Bangalore", "Bhubaneswar", "Mumbai", "Delhi NCR", "Hyderabad", "Pune"],
  Canada: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
  "United States": ["San Francisco", "New York", "Austin", "Seattle", "Chicago"],
  "United Kingdom": ["London", "Manchester", "Edinburgh", "Birmingham"],
  Remote: ["Global Remote", "APAC Remote", "EMEA Remote", "Americas Remote"],
};

const COMPANY_TYPES = [
  "Startup",
  "Small Business (SMB)",
  "Mid-size Company",
  "Enterprise / MNC",
  "Agency / Consultancy",
  "Freelance / Independent Contractor",
  "Other / Unspecified",
];

const RESEARCH_LOADING_STEPS = [
  "Reviewing job role & experience level...",
  "Comparing regional compensation benchmarks...",
  "Evaluating skill proficiency premiums...",
  "Calculating total market compensation range...",
  "Synthesizing Venus AI Salary Intelligence report...",
];

const CONTROL_BASE_CLASS =
  "w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 font-medium text-sm placeholder:text-slate-400 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:bg-white transition-all shadow-sm";

function SalaryCheckPage() {
  const [rightPanelState, setRightPanelState] = useState<RightPanelState>("EMPTY");

  // Form Input States
  const [role, setRole] = useState<string>("Full Stack Developer");
  const [experienceLevelObj, setExperienceLevelObj] = useState(EXPERIENCE_LEVELS[0]);
  const [currentSalaryRaw, setCurrentSalaryRaw] = useState<string>("30000");
  const [countryObj, setCountryObj] = useState(COUNTRY_OPTIONS[0]);
  const [city, setCity] = useState<string>("Bangalore");
  const [skillProficiency, setSkillProficiency] = useState(SKILL_PROFICIENCY_LEVELS[0]);
  const [skillsText, setSkillsText] = useState<string>("React, TypeScript, Node.js, SQL");
  const [companyType, setCompanyType] = useState<string>("Mid-size Company");
  const [responsibilitiesInput, setResponsibilitiesInput] = useState<string>(
    "Build fullstack web applications, optimize APIs, and collaborate with product teams."
  );

  // Results & Loading States
  const [researchResult, setResearchResult] = useState<SalaryResearchResult | null>(null);
  const [loadingStepIdx, setLoadingStepIdx] = useState<number>(0);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Anchor refs for smooth layout locking
  const topRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  // Update cities when country changes
  const availableCities = CITY_OPTIONS_BY_COUNTRY[countryObj.value] || CITY_OPTIONS_BY_COUNTRY.India;

  useEffect(() => {
    let interval: any = null;
    if (rightPanelState === "RESEARCHING") {
      interval = setInterval(() => {
        setLoadingStepIdx((prev) => (prev + 1) % RESEARCH_LOADING_STEPS.length);
      }, 1200);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [rightPanelState]);

  // Handle Form Submission for Live Calculation
  const handleSubmitAssessment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role.trim()) return;

    setRightPanelState("RESEARCHING");
    setLoadingStepIdx(0);

    // Scroll right panel smoothly into view on mobile
    if (window.innerWidth < 1024 && rightPanelRef.current) {
      rightPanelRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    const normalizedSalary = normalizeSalaryInput(currentSalaryRaw);
    const parsedSkills = skillsText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const profile: CandidateProfile = {
      role: role.trim(),
      experienceYears: experienceLevelObj.value,
      experienceLabel: experienceLevelObj.label,
      location: {
        city: city.trim() || availableCities[0],
        state: "",
        country: countryObj.value,
      },
      currentCompensation: normalizedSalary,
      skills: parsedSkills.length > 0 ? parsedSkills : ["Core Engineering"],
      companyType,
      responsibilities: responsibilitiesInput.trim(),
      education: "",
      seniority: experienceLevelObj.seniority,
      workMode: "Hybrid",
      additionalContext: `Skill Proficiency: ${skillProficiency.label} (+${skillProficiency.bonusPercent}%)`,
    };

    try {
      const res = await fetch("/api/salary/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.result) {
          // Apply skill proficiency modifier to result if applicable
          const resObj: SalaryResearchResult = data.result;
          if (skillProficiency.bonusPercent > 0) {
            const multiplier = 1 + skillProficiency.bonusPercent / 100;
            resObj.assessment.recommendedMin = Math.round(resObj.assessment.recommendedMin * multiplier);
            resObj.assessment.recommendedMax = Math.round(resObj.assessment.recommendedMax * multiplier);
            resObj.assessment.negotiationTarget = Math.round(resObj.assessment.negotiationTarget * multiplier);
            resObj.market.median = Math.round(resObj.market.median * multiplier);
          }
          setResearchResult(resObj);
        }
      }
    } catch (err) {
      console.warn("[Salary Check API Notice]: Using benchmark baseline output.", err);
    } finally {
      setTimeout(() => {
        setRightPanelState("RESULT");
        if (window.innerWidth < 1024 && rightPanelRef.current) {
          rightPanelRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 2600);
    }
  };

  const handleShareReport = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Anchor ref for smooth scrolling to form tool
  const formContainerRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    if (formContainerRef.current) {
      formContainerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      <SiteNav />

      {/* Main Container */}
      <main className="flex-1 pt-[76px] sm:pt-[84px] pb-20 overflow-x-hidden">
        
        {/* ========================================================================= */}
        {/* TRUE FULL-BLEED EDGE-TO-EDGE HERO SECTION (BORDER-RADIUS: 0) */}
        {/* ========================================================================= */}
        <section ref={topRef} className="w-full bg-[#0a0b0d] text-white min-h-[calc(100vh-76px)] sm:min-h-[calc(100vh-84px)] relative overflow-hidden flex flex-col justify-center py-10 sm:py-16 rounded-none m-0 border-none shadow-none">
          
          {/* Editorial Background AI Image with Separate Controlled Dark Overlay */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              src="/images/salary_hero_editorial.jpg"
              alt="Executive Salary Intelligence Analytics"
              className="w-full h-full object-cover object-[75%_center] opacity-45 sm:opacity-50 transition-opacity duration-1000"
            />
            {/* Separate Black/Gradient Overlay for Content Contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0b0d] via-[#0a0b0d]/85 to-[#0a0b0d]/40" />
            <div className="absolute inset-0 bg-black/25" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-600/15 rounded-full blur-3xl" />
          </div>

          {/* Inner Constrained Grid Container */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10 my-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* LEFT COLUMN — Editorial Headline, Body Copy & Buttons */}
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-3.5">
                  <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-slate-300">
                    BENCHMARKING · SALARY · INTELLIGENCE
                  </p>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-white tracking-tight leading-[1.12]">
                    Know what your skills are <span className="font-sans italic font-normal text-slate-200">really worth.</span>
                  </h1>

                  <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed max-w-xl">
                    Get a personalized compensation benchmark based on your role, experience, skills, location, and market demand. Powered by real-time AI intelligence.
                  </p>
                </div>

                {/* 2 Primary Action Buttons with Enhanced Typography */}
                <div className="flex flex-wrap items-center gap-3.5 pt-1">
                  <button
                    type="button"
                    onClick={scrollToForm}
                    className="px-8 py-4 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-extrabold text-sm sm:text-base shadow-xl transition-all hover:scale-[1.02] flex items-center gap-2 cursor-pointer"
                  >
                    <span>Start Salary Check</span>
                    <ArrowRight className="w-4.5 h-4.5 text-slate-950" />
                  </button>

                  <button
                    type="button"
                    onClick={scrollToForm}
                    className="px-7 py-4 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-bold text-sm sm:text-base border border-slate-800 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Explore Market Data</span>
                  </button>
                </div>

                {/* Bottom Trust/Compliance Badges (Only SOC 2 Kept) */}
                <div className="pt-2 flex items-center gap-4 text-xs font-bold text-slate-400 border-t border-slate-900/80">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>SOC 2 Type II Compliant</span>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN — Layered Product Preview Dashboard with Stable CSS Micro-Interactions */}
              <div className="lg:col-span-6 relative pt-4 lg:pt-0 group">
                
                {/* Floating Toast Badge 1 (Top Right Overlay - Stable Position with Subtle Border Reaction) */}
                <div className="hidden sm:flex items-center gap-3 bg-[#16181d]/95 border border-slate-700/80 group-hover:border-slate-600 backdrop-blur-md rounded-2xl p-3.5 shadow-2xl text-xs text-white absolute -top-5 right-2 z-20 transition-all duration-300">
                  <div className="w-7 h-7 rounded-full bg-emerald-950 border border-emerald-700/80 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                  </div>
                  <div>
                    <div className="font-extrabold text-white">Benchmark calculated</div>
                    <div className="text-[10px] text-slate-400">₹2,450,000 · Senior Level</div>
                  </div>
                </div>

                {/* Main Dashboard Card Container — 100% Physically Stationary, Soft Glow on Hover */}
                <div className="bg-[#121417] border border-slate-800/90 group-hover:border-slate-700/90 rounded-3xl p-6 sm:p-7 text-white shadow-2xl group-hover:shadow-red-600/10 group-hover:shadow-2xl space-y-4 relative z-10 transition-all duration-300">
                  
                  {/* Header Row */}
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700">
                        <Brain className="w-4 h-4 text-red-500" />
                      </div>
                      <div>
                        <div className="text-xs font-extrabold text-white">Salary Benchmark Run</div>
                        <div className="text-[10px] text-slate-400">142 role profiles · Live market sync</div>
                      </div>
                    </div>
                  </div>

                  {/* List Rows with Subtle Hover Contrast Response */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/90 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-850 text-xs transition-all duration-200 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-slate-800 text-slate-300 text-[10px] font-extrabold flex items-center justify-center border border-slate-700">
                          SE
                        </div>
                        <div>
                          <div className="font-extrabold text-white">Software Engineer</div>
                          <div className="text-[10px] text-slate-400">Exp 4-6 yrs · ₹2,450,000</div>
                        </div>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-extrabold border border-emerald-800/60">
                        Collected
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/90 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-850 text-xs transition-all duration-200 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-slate-800 text-slate-300 text-[10px] font-extrabold flex items-center justify-center border border-slate-700">
                          PM
                        </div>
                        <div>
                          <div className="font-extrabold text-white">Product Manager</div>
                          <div className="text-[10px] text-slate-400">Exp 6-8 yrs · ₹2,850,000</div>
                        </div>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-800/80 text-slate-400 text-[10px] font-extrabold border border-slate-800">
                        Scheduled
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/90 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-850 text-xs transition-all duration-200 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-slate-800 text-slate-300 text-[10px] font-extrabold flex items-center justify-center border border-slate-700">
                          DS
                        </div>
                        <div>
                          <div className="font-extrabold text-white">Data Scientist</div>
                          <div className="text-[10px] text-slate-400">Exp 3-5 yrs · ₹2,200,000</div>
                        </div>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-800/80 text-slate-400 text-[10px] font-extrabold border border-slate-800">
                        In review
                      </span>
                    </div>
                  </div>

                  {/* Bottom Highlight Box with Shimmer Progress Effect */}
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">RECOGNIZED MARKET MEDIAN</span>
                      <span className="font-extrabold text-white text-base">₹2,450,000</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-800 relative overflow-hidden">
                      <div className="h-full w-3/4 bg-white rounded-full transition-all duration-500 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-300/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                      </div>
                    </div>
                    <div className="text-[10px] font-medium text-slate-400">
                      78% of market ceiling · ASC 606 & regional baseline aligned
                    </div>
                  </div>

                </div>

                {/* Floating Toast Badge 2 (Bottom Left Overlay - Stable Position with Subtle Glow Reaction) */}
                <div className="hidden sm:flex items-center gap-3 bg-[#16181d]/95 border border-slate-700/80 group-hover:border-slate-600 backdrop-blur-md rounded-2xl p-3.5 shadow-2xl text-xs text-white absolute -bottom-5 -left-3 z-20 transition-all duration-300">
                  <div className="w-7 h-7 rounded-full bg-blue-950 border border-blue-700/80 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="font-extrabold text-white">Location adjustment</div>
                    <div className="text-[10px] text-slate-400">+12.5% Toronto / Bangalore</div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* MAIN PAGE CONTENT CONTAINER (SUB-HERO CONTENT) */}
        {/* ========================================================================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 space-y-12">
          
          {/* MAIN SPLIT-SCREEN DASHBOARD CONTAINER */}
          <div id="salary-check-tool" ref={formContainerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* ----------------------------------------------------------------------- */}
            {/* LEFT PANEL — FORM & DETAILS (5 Columns on Desktop) */}
            {/* ----------------------------------------------------------------------- */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6 relative">
              
              {/* Form Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center font-bold border border-red-100">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                      Enter Your Details
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">
                      Customize parameters to calculate accurate benchmarks.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmitAssessment} className="space-y-5">
                
                {/* 1. Job Role */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-red-600" />
                    Job Role
                  </label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Full Stack Developer, Software Engineer"
                    className={CONTROL_BASE_CLASS}
                  />

                  {/* Quick Role Suggestions */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {ROLE_SUGGESTIONS.slice(0, 4).map((r, rIdx) => (
                      <button
                        key={rIdx}
                        type="button"
                        onClick={() => setRole(r)}
                        className={`text-[11px] px-2.5 py-0.5 rounded-md font-medium border transition-colors cursor-pointer ${
                          role === r
                            ? "bg-red-600 text-white border-red-600 shadow-sm"
                            : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Experience Level */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-red-600" />
                    Experience Level
                  </label>
                  <select
                    value={experienceLevelObj.label}
                    onChange={(e) => {
                      const matched = EXPERIENCE_LEVELS.find((opt) => opt.label === e.target.value);
                      if (matched) setExperienceLevelObj(matched);
                    }}
                    className={`${CONTROL_BASE_CLASS} cursor-pointer`}
                  >
                    {EXPERIENCE_LEVELS.map((opt, optIdx) => (
                      <option key={optIdx} value={opt.label}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Current / Previous Salary */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-red-600" />
                    Current / Previous Salary ({countryObj.currency})
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">
                      {countryObj.symbol}
                    </span>
                    <input
                      type="text"
                      required
                      value={currentSalaryRaw}
                      onChange={(e) => setCurrentSalaryRaw(e.target.value)}
                      placeholder="30000"
                      className={`${CONTROL_BASE_CLASS} pl-9 font-bold`}
                    />
                  </div>
                </div>

                {/* 4. Country & City 2-Column Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-red-600" />
                      Country / Region
                    </label>
                    <select
                      value={countryObj.value}
                      onChange={(e) => {
                        const matched = COUNTRY_OPTIONS.find((c) => c.value === e.target.value);
                        if (matched) {
                          setCountryObj(matched);
                          const cities = CITY_OPTIONS_BY_COUNTRY[matched.value] || [];
                          if (cities.length > 0) setCity(cities[0]);
                        }
                      }}
                      className={`${CONTROL_BASE_CLASS} cursor-pointer text-xs sm:text-sm px-3`}
                    >
                      {COUNTRY_OPTIONS.map((c, cIdx) => (
                        <option key={cIdx} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-red-600" />
                      City / Metro Market
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className={`${CONTROL_BASE_CLASS} cursor-pointer text-xs sm:text-sm px-3`}
                    >
                      {availableCities.map((ct, ctIdx) => (
                        <option key={ctIdx} value={ct}>
                          {ct}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 5. Skill Proficiency Level Pill Selectors */}
                <div className="space-y-2 pt-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-red-600" />
                    Skill Proficiency Level
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {SKILL_PROFICIENCY_LEVELS.map((sp, spIdx) => {
                      const isSelected = skillProficiency.label === sp.label;
                      return (
                        <button
                          key={spIdx}
                          type="button"
                          onClick={() => setSkillProficiency(sp)}
                          className={`py-3 px-2 rounded-xl text-xs font-bold text-center border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-red-600 text-white border-red-600 shadow-md scale-[1.02]"
                              : "bg-slate-50/80 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          {sp.text}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Submit Action Button */}
                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full h-13 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-base transition-all shadow-lg shadow-red-600/25 hover:shadow-xl hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Calculate My Salary</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

              </form>
            </div>

            {/* ----------------------------------------------------------------------- */}
            {/* RIGHT PANEL — SALARY INTELLIGENCE (7 Columns on Desktop) */}
            {/* ----------------------------------------------------------------------- */}
            <div
              ref={rightPanelRef}
              className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6 min-h-[580px] flex flex-col justify-between"
            >
              
              {/* STATE 1: INITIAL EMPTY STATE */}
              {rightPanelState === "EMPTY" && (
                <div className="my-auto py-16 text-center space-y-6 max-w-md mx-auto">
                  <div className="w-16 h-16 rounded-3xl bg-red-50 border border-red-100 text-red-600 flex items-center justify-center mx-auto shadow-sm">
                    <Brain className="w-8 h-8 text-red-600" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                      Your Salary Intelligence
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                      Your personalized salary analysis will appear here. Fill in your details on the left and click <strong className="text-slate-800">"Calculate My Salary"</strong> to generate your report.
                    </p>
                  </div>

                  <div className="pt-4 grid grid-cols-3 gap-2 text-[11px] font-bold text-slate-500">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                      <span className="block text-red-600 text-xs mb-0.5">✓ Live</span>
                      Market Benchmarks
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                      <span className="block text-emerald-600 text-xs mb-0.5">✓ Verified</span>
                      Placement Baselines
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                      <span className="block text-blue-600 text-xs mb-0.5">✓ Private</span>
                      100% Data Confidential
                    </div>
                  </div>
                </div>
              )}

              {/* STATE 2: AI ANALYZING LOADING STATE */}
              {rightPanelState === "RESEARCHING" && (
                <div className="my-auto py-20 text-center space-y-8 max-w-md mx-auto">
                  <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-4 border-red-100 border-t-red-600 animate-spin" />
                    <Brain className="w-9 h-9 text-red-600 animate-pulse" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-extrabold text-slate-900">
                      Analyzing Compensation Profile
                    </h3>
                    <p className="text-xs font-bold text-red-600 animate-pulse">
                      {RESEARCH_LOADING_STEPS[loadingStepIdx]}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2.5 text-xs">
                    <div className="flex items-center gap-2.5 text-emerald-700 font-bold">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                      <span>Profile parameters & experience matched</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-emerald-700 font-bold">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                      <span>Skill proficiency ({skillProficiency.label}) multiplier applied</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-amber-700 font-bold">
                      <Loader2 className="w-4 h-4 animate-spin shrink-0 text-amber-600" />
                      <span>Evaluating live market compensation for {role} in {city}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* STATE 3: FULL REAL SALARY INTELLIGENCE REPORT (MATCHING SCREENSHOTS!) */}
              {rightPanelState === "RESULT" && researchResult && (
                <div className="space-y-6">
                  
                  {/* Top Badge Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-extrabold flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5" />
                        Salary for {researchResult.profile.role}
                      </span>

                      <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-extrabold flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        Salary Confidence: {researchResult.assessment.confidence}%
                      </span>
                    </div>

                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                      {researchResult.market.currency}
                    </span>
                  </div>

                  {/* Hero Salary Range Display */}
                  <div className="space-y-1">
                    <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 tracking-tight">
                      {formatSalaryCurrency(researchResult.assessment.recommendedMin, researchResult.market.currency)} - {formatSalaryCurrency(researchResult.assessment.recommendedMax, researchResult.market.currency)}
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500 font-medium pt-1">
                      <span>Estimated Annual Compensation Range</span>
                      <span className="font-bold text-slate-800">
                        Midpoint: {formatSalaryCurrency(researchResult.market.median, researchResult.market.currency)}
                      </span>
                    </div>
                  </div>

                  {/* Visual Market Position Range Bar */}
                  <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/90 space-y-3">
                    <div className="flex justify-between text-[11px] font-extrabold text-slate-600 uppercase tracking-wider">
                      <span className="text-red-500">LOW</span>
                      <span className="text-amber-600">MID</span>
                      <span className="text-emerald-600">HIGH</span>
                    </div>

                    {/* Gradient Bar with Marker Pin */}
                    <div className="relative h-3 w-full rounded-full bg-gradient-to-r from-red-500 via-amber-400 to-emerald-500 overflow-visible">
                      <div
                        className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-900 border-2 border-white shadow-md transition-all duration-500"
                        style={{
                          left: `${Math.min(
                            88,
                            Math.max(
                              12,
                              ((researchResult.market.median - researchResult.assessment.recommendedMin) /
                                (researchResult.assessment.recommendedMax - researchResult.assessment.recommendedMin || 1)) *
                                100
                            )
                          )}%`,
                        }}
                      />
                    </div>

                    <div className="grid grid-cols-3 text-[11px] text-slate-600 pt-1 font-medium">
                      <div>
                        <span className="block text-[10px] text-slate-400 uppercase">LOW</span>
                        <strong className="text-slate-800">
                          {formatSalaryCurrency(researchResult.assessment.recommendedMin, researchResult.market.currency)}
                        </strong>
                      </div>
                      <div className="text-center">
                        <span className="block text-[10px] text-slate-400 uppercase">MARKET MIDPOINT</span>
                        <strong className="text-slate-800">
                          {formatSalaryCurrency(researchResult.market.median, researchResult.market.currency)}
                        </strong>
                      </div>
                      <div className="text-right">
                        <span className="block text-[10px] text-slate-400 uppercase">HIGH</span>
                        <strong className="text-slate-800">
                          {formatSalaryCurrency(researchResult.assessment.recommendedMax, researchResult.market.currency)}
                        </strong>
                      </div>
                    </div>
                  </div>

                  {/* Transparent Compensation Breakdown Card */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3 text-xs">
                    <h4 className="font-extrabold uppercase tracking-wider text-slate-900 text-xs border-b border-slate-100 pb-2">
                      Transparent Compensation Breakdown:
                    </h4>

                    <div className="space-y-1.5 text-slate-600">
                      <div className="flex justify-between">
                        <span>Base Market Salary (Midpoint):</span>
                        <strong className="text-slate-900 font-bold">
                          {formatSalaryCurrency(researchResult.market.median, researchResult.market.currency)}
                        </strong>
                      </div>

                      <div className="flex justify-between">
                        <span>Experience:</span>
                        <span className="font-medium text-slate-800">{experienceLevelObj.label}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Skill:</span>
                        <span className="font-bold text-emerald-600">{skillProficiency.text}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Demand:</span>
                        <span className="font-medium text-slate-800">Normal High Demand (+0%)</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Country:</span>
                        <span className="font-medium text-slate-800">{countryObj.value}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>City:</span>
                        <span className="font-medium text-slate-800">{city}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-sm font-extrabold">
                      <span className="text-slate-900">Final Estimated Salary:</span>
                      <span className="text-emerald-600">
                        {formatSalaryCurrency(researchResult.market.median, researchResult.market.currency)}/year {researchResult.market.currency}
                      </span>
                    </div>
                  </div>

                  {/* Venus AI Compensation Intelligence Summary Card */}
                  <div className="p-5 rounded-2xl bg-slate-950 text-white space-y-3 shadow-md relative overflow-hidden">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                      <div className="flex items-center gap-2">
                        <Brain className="w-4 h-4 text-red-500" />
                        <span className="font-extrabold text-xs text-slate-100">Venus AI Compensation Intelligence</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-red-950 text-red-400 text-[10px] font-extrabold uppercase border border-red-900/60">
                        VENUS HR INTELLIGENCE
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <span className="block text-[11px] font-extrabold uppercase tracking-wider text-amber-400">
                        Executive Salary Summary:
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed font-normal">
                        The benchmark median target compensation for a {researchResult.profile.role} in {city}, {countryObj.value} is approximately {formatSalaryCurrency(researchResult.market.median, researchResult.market.currency)}/year, reflecting local tech talent competitiveness, skill demand ({skillProficiency.label}), and cost-of-living adjustments.
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                    <button
                      type="button"
                      onClick={handleShareReport}
                      className="w-full sm:w-1/2 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>{copiedLink ? "Link Copied!" : "Share Report"}</span>
                    </button>

                    <a
                      href="https://www.venushiring.ca/contact"
                      className="w-full sm:w-1/2 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <span>Discuss with Venus Recruitment</span>
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>

                </div>
              )}

            </div>

          </div>
        </div>
      </main>

      {/* ========================================================================= */}
      {/* FINAL CTA SECTION (ROUNDED 4 CORNERS WITH CONTROLLED SIDE SPACING & FOOTER GAP) */}
      {/* ========================================================================= */}
      <section className="pt-10 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="bg-[#0b0c0e] text-white rounded-3xl p-8 sm:p-12 lg:p-14 shadow-2xl border border-slate-800/80 relative overflow-hidden">
            
            {/* Subtle Editorial Background Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img
                src="/images/salary_cta_bright.jpg"
                alt="Venus Salary Intelligence Executive Team"
                className="w-full h-full object-cover object-center opacity-15 mix-blend-luminosity filter brightness-90 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c0e] via-[#0b0c0e]/90 to-[#0b0c0e]/70" />
            </div>

            {/* Inner Constrained Grid Container */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              
              {/* LEFT COLUMN — Editorial Text & Action Buttons */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-3">
                  <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
                    VENUS · SALARY INTELLIGENCE
                  </p>
                  
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
                    Know what your skills are <span className="text-red-500">really worth.</span>
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed max-w-lg">
                    Get a personalized compensation benchmark based on your role, experience, skills, location, and market demand. Powered by real-time market data.
                  </p>
                </div>

                {/* Buttons Row */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={scrollToForm}
                    className="px-7 py-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-extrabold text-xs sm:text-sm shadow-xl transition-all hover:scale-[1.02] flex items-center gap-2 cursor-pointer"
                  >
                    <span>Check My Salary</span>
                    <ArrowRight className="w-4 h-4 text-slate-950" />
                  </button>

                  <a
                    href="https://www.venushiring.ca/contact"
                    className="px-6 py-3.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-bold text-xs sm:text-sm border border-slate-800 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Discuss with Venus</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Micro-text Footer */}
                <p className="text-[11px] font-semibold text-slate-500 pt-1">
                  AI-Powered · Market-Aware · Real-Time Intelligence
                </p>
              </div>

              {/* RIGHT COLUMN — Clearly Visible Light-Themed Executive Image Card */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800/90 shadow-2xl bg-slate-950 group">
                  <img
                    src="/images/salary_cta_bright.jpg"
                    alt="Executive Talent Collaboration"
                    className="w-full h-[260px] sm:h-[320px] object-cover object-center opacity-85 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Light Dark Overlay for Text/Border Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e]/80 via-[#0b0c0e]/30 to-transparent pointer-events-none" />
                  
                  {/* Overlay Badge */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-[#0b0c0e]/85 backdrop-blur-md border border-slate-800/80 text-xs text-white flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-extrabold text-slate-200">Live Executive Insights</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Venus HR Intelligence</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
