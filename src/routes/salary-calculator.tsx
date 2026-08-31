import { useState, useMemo, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Calculator,
  ChevronRight,
  Sparkles,
  TrendingUp,
  DollarSign,
  Briefcase,
  Award,
  MapPin,
  Building2,
  ArrowRight,
  ShieldCheck,
  Brain,
  Lightbulb,
  CheckCircle2,
  Target,
  Loader2,
} from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import {
  JOB_ROLES,
  EXPERIENCE_LEVELS,
  SKILL_LEVELS,
  LOCATIONS,
  getCitiesForCountry,
  calculateSalaryRange,
  parseAnnualSalaryInput,
  type SalaryCalculationResult,
} from "@/data/salaryData";
import {
  saveSalaryAssistantContext,
  getSalaryAssistantContext,
  getSalaryAssistantResult,
  generateContextId,
  isMatchingAssistantContextAndResult,
  restoreCalculatorFromAssistantContext,
  isValidCalculatorResult,
  type SalaryAssistantContext,
} from "@/lib/salaryAssistantContext";

const TITLE = "Salary Calculator | Venus Hiring";
const DESCRIPTION =
  "Estimate your expected market salary range based on job role, experience, location, city market, and skill level with Venus Hiring's Global HR Salary Estimator.";

export const Route = createFileRoute("/salary-calculator")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
    ],
  }),
  component: SalaryCalculatorPage,
});

export interface AIInsightsData {
  salaryInsights: string;
  marketAnalysis: string;
  negotiationSuggestions: string[];
  careerGrowthRecommendations: string[];
}

function SalaryCalculatorPage() {
  const navigate = useNavigate();

  // Form input state
  const [selectedRole, setSelectedRole] = useState("Full Stack Developer");
  const [selectedExp, setSelectedExp] = useState("mid");
  const [selectedSkill, setSelectedSkill] = useState("intermediate");
  const [selectedLocation, setSelectedLocation] = useState("canada");
  const [selectedCity, setSelectedCity] = useState("toronto");
  const [currentSalaryInput, setCurrentSalaryInput] = useState<string>("70000");

  const [activeResult, setActiveResult] = useState<SalaryCalculationResult>(() =>
    calculateSalaryRange("Full Stack Developer", "mid", "intermediate", "canada", "toronto", 70000)
  );

  // AI Insights Backend Integration State
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [aiSource, setAiSource] = useState<"pending" | "groq-ai" | "fallback-engine">("pending");
  const [aiInsights, setAiInsights] = useState<AIInsightsData | null>(null);

  // Function to fetch Groq AI Insights from /api/salary-insights backend
  const fetchAIInsights = async (calcResult: SalaryCalculationResult) => {
    setAiLoading(true);
    const expObj = EXPERIENCE_LEVELS.find((e) => e.id === selectedExp);
    const skillObj = SKILL_LEVELS.find((s) => s.id === selectedSkill);
    const locObj = LOCATIONS.find((l) => l.id === selectedLocation);
    const cities = getCitiesForCountry(selectedLocation);
    const cityObj = cities.find((c) => c.id === selectedCity) || cities[0];

    try {
      const res = await fetch("/api/salary-insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobRole: calcResult.jobRole,
          experience: expObj?.label || selectedExp,
          skill: skillObj?.label || selectedSkill,
          location: locObj?.name || selectedLocation,
          city: cityObj?.name || selectedCity,
          currencySymbol: calcResult.currencySymbol,
          currencyCode: calcResult.currencyCode,
          lowSalary: calcResult.lowSalary,
          midSalary: calcResult.midSalary,
          highSalary: calcResult.highSalary,
          currentSalary: calcResult.currentSalary,
          confidenceScore: calcResult.confidenceScore,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.insights && data.source === "groq-ai") {
          setAiInsights(data.insights);
          setAiSource("groq-ai");
        } else if (data.insights) {
          setAiInsights(data.insights);
          setAiSource("fallback-engine");
        } else {
          setAiSource("fallback-engine");
        }
      } else {
        setAiSource("fallback-engine");
      }
    } catch (err) {
      console.warn("[Client Salary AI Fetch Notice]: Serving local compensation intelligence.", err);
      setAiSource("fallback-engine");
    } finally {
      setAiLoading(false);
    }
  };

  // Automatically fetch initial AI insights on mount & check for returned assistant results
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const params = new URLSearchParams(window.location.search);
        const contextId = params.get("contextId");
        const assistantResultFlag = params.get("assistantResult");

        if (contextId && assistantResultFlag === "1") {
          const context = getSalaryAssistantContext(contextId);
          const savedResult = getSalaryAssistantResult(contextId);

          if (
            context &&
            savedResult &&
            isMatchingAssistantContextAndResult(context, savedResult, contextId)
          ) {
            // Restore calculator state from deterministic context BEFORE displaying AI narrative
            const restored = restoreCalculatorFromAssistantContext(context);
            setSelectedRole(restored.formState.selectedRole);
            setSelectedExp(restored.formState.selectedExp);
            setSelectedSkill(restored.formState.selectedSkill);
            setSelectedLocation(restored.formState.selectedLocation);
            setSelectedCity(restored.formState.selectedCity);
            setCurrentSalaryInput(restored.formState.currentSalaryInput);
            setActiveResult(restored.calcResult);

            setAiInsights({
              salaryInsights: savedResult.message,
              marketAnalysis: `Personalized AI analysis for exact role: "${savedResult.exactRoleInput}".`,
              negotiationSuggestions: savedResult.suggestedQuestions || [],
              careerGrowthRecommendations: [],
            });
            setAiSource(savedResult.source);
            window.history.replaceState({}, document.title, window.location.pathname);
            return;
          } else {
            console.warn("[Salary Integration Warning]: Assistant context or result validation failed.");
            window.history.replaceState({}, document.title, window.location.pathname);
          }
        }
      } catch (e) {
        console.warn("[Assistant Result Read Notice]:", e);
      }
    }

    fetchAIInsights(activeResult);
  }, []);

  const handleAskAIAboutResult = () => {
    const expObj = EXPERIENCE_LEVELS.find((e) => e.id === selectedExp);
    const skillObj = SKILL_LEVELS.find((s) => s.id === selectedSkill);
    const locObj = LOCATIONS.find((l) => l.id === selectedLocation);
    const cities = getCitiesForCountry(selectedLocation);
    const cityObj = cities.find((c) => c.id === selectedCity) || cities[0];

    const contextId = generateContextId();
    const ctx: SalaryAssistantContext = {
      contextId,
      createdAt: Date.now(),
      jobRole: activeResult.jobRole,
      experience: expObj?.label || selectedExp,
      skillLevel: skillObj?.label || selectedSkill,
      country: locObj?.name || selectedLocation,
      city: cityObj?.name || selectedCity,
      currentSalary: activeResult.currentSalary,
      currencyCode: activeResult.currencyCode,
      currencySymbol: activeResult.currencySymbol,
      estimatedLow: activeResult.lowSalary,
      estimatedMid: activeResult.midSalary,
      estimatedHigh: activeResult.highSalary,
      confidenceScore: activeResult.confidenceScore,
      benchmarkSourceLevel: activeResult.benchmarkSourceLevel,
      exactRoleInput: selectedRole,
      experienceId: selectedExp,
      skillLevelId: selectedSkill,
      countryId: selectedLocation,
      cityId: selectedCity,
    };

    saveSalaryAssistantContext(ctx);
    navigate({ to: "/salary-2", search: { contextId } });
  };

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const numSalary = parseAnnualSalaryInput(currentSalaryInput);
    
    // 1. Unchanged Salary Calculation Logic
    const result = calculateSalaryRange(
      selectedRole,
      selectedExp,
      selectedSkill,
      selectedLocation,
      selectedCity,
      numSalary
    );
    setActiveResult(result);

    // 2. Automatically trigger Groq AI insights backend API
    fetchAIInsights(result);
  };

  const selectedLocObj = useMemo(
    () => LOCATIONS.find((l) => l.id === selectedLocation) || LOCATIONS[0],
    [selectedLocation]
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-red-500 selection:text-white">
      <SiteNav />

      {/* Main Container below navbar */}
      <main className="pt-[70px] sm:pt-[76px] overflow-x-hidden">
        
        {/* HERO HEADER SECTION */}
        <section className="relative py-10 sm:py-14 bg-slate-950 text-white overflow-hidden">
          {/* Grid Accent */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
          
          {/* Red Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/20 blur-[130px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Breadcrumb */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-medium text-slate-300 mb-5 shadow-lg">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-red-400 font-semibold">Salary Calculator</span>
            </div>

            {/* Title & Subtitle */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
              Salary <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-amber-300">Calculator</span>
            </h1>

            <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Find your market value and understand your expected salary range.
            </p>
          </div>
        </section>

        {/* CALCULATOR MAIN SECTION */}
        <section className="py-8 sm:py-12 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Top-and-Bottom Stacked Layout */}
            <div className="flex flex-col gap-8 sm:gap-10">
              
              {/* TOP FORM INPUTS CARD */}
              <div className="w-full bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200/90 shadow-xl shadow-slate-200/40">
                
                <div>
                  <div className="flex items-center gap-3.5 mb-8 pb-5 border-b border-slate-100">
                    <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center font-bold shadow-sm">
                      <Calculator className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Enter Your Details
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-500 font-medium">
                        Customize parameters to calculate accurate recruitment market benchmarks.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleCalculate} className="space-y-6 sm:space-y-7">
                    
                    {/* 1. Job Role (Pure Manual Text Entry) */}
                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-red-500" />
                        Job Role
                      </label>
                      <input
                        type="text"
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        placeholder="Type any job role (e.g. Software Engineer)"
                        className="w-full px-4.5 py-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-semibold text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all shadow-sm"
                      />
                    </div>

                    {/* 2. Experience */}
                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                        <Award className="w-4 h-4 text-red-500" />
                        Experience Level
                      </label>
                      <select
                        value={selectedExp}
                        onChange={(e) => setSelectedExp(e.target.value)}
                        className="w-full px-4.5 py-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-semibold text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all shadow-sm"
                      >
                        {EXPERIENCE_LEVELS.map((e) => (
                          <option key={e.id} value={e.id}>
                            {e.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* 3. Current / Previous Salary */}
                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-red-500" />
                        Current / Previous Salary ({selectedLocObj.currency})
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-base">
                          {selectedLocObj.symbol}
                        </span>
                        <input
                          type="text"
                          value={currentSalaryInput}
                          onChange={(e) => setCurrentSalaryInput(e.target.value)}
                          placeholder="70,000"
                          className="w-full pl-9 pr-4.5 py-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-extrabold text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all shadow-sm"
                        />
                      </div>
                    </div>

                    {/* 4. Two-Level Location & City System */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-red-500" />
                          Country / Region
                        </label>
                        <select
                          value={selectedLocation}
                          onChange={(e) => {
                            const newLoc = e.target.value;
                            setSelectedLocation(newLoc);
                            const cities = getCitiesForCountry(newLoc);
                            if (cities.length > 0) setSelectedCity(cities[0].id);
                          }}
                          className="w-full px-4.5 py-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-semibold text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all shadow-sm"
                        >
                          {LOCATIONS.map((l) => (
                            <option key={l.id} value={l.id}>
                              {l.name} ({l.currency})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-red-500" />
                          City / Metro Market
                        </label>
                        <select
                          value={selectedCity}
                          onChange={(e) => setSelectedCity(e.target.value)}
                          className="w-full px-4.5 py-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-semibold text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all shadow-sm"
                        >
                          {getCitiesForCountry(selectedLocation).map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* 5. Skill Level */}
                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-red-500" />
                        Skill Proficiency Level
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {SKILL_LEVELS.map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setSelectedSkill(s.id)}
                            className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-bold border transition-all text-center ${
                              selectedSkill === s.id
                                ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-600/30 scale-[1.02]"
                                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                            }`}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Calculate CTA Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={aiLoading}
                        className="w-full py-4 sm:py-4.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-base sm:text-lg transition-all duration-300 shadow-lg shadow-red-600/30 hover:shadow-xl hover:shadow-red-600/40 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 disabled:opacity-70"
                      >
                        {aiLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin text-white" />
                            <span>Calculating & Fetching AI Insights...</span>
                          </>
                        ) : (
                          <>
                            <span>Calculate My Salary</span>
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </div>

                  </form>
                </div>

              </div>

              {/* BOTTOM SALARY RESULT CARD */}
              <div className="w-full bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200/90 shadow-xl shadow-slate-200/40 relative overflow-hidden flex flex-col justify-between">
                
                {/* Red Accent Top Bar */}
                <div className="absolute top-0 inset-x-0 h-2.5 bg-gradient-to-r from-red-600 via-red-500 to-amber-400" />

                  <div>
                    {/* Header Badge & Confidence Score */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-xs sm:text-sm font-extrabold text-red-600">
                        <Calculator className="w-4 h-4" />
                        <span>Salary for {activeResult.jobRole}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full shadow-sm">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          Salary Confidence: {activeResult.confidenceScore}%
                        </span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2.5 py-1 rounded-md">
                          {activeResult.currencyCode}
                        </span>
                      </div>
                    </div>

                    {/* Estimated Salary Range Highlight */}
                    <div className="mb-7">
                      <div className="text-2xl sm:text-3xl lg:text-3xl font-extrabold text-emerald-600 tracking-tight leading-snug">
                        {activeResult.currencySymbol}
                        {activeResult.lowSalary.toLocaleString()} - {activeResult.currencySymbol}
                        {activeResult.highSalary.toLocaleString()}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1.5 font-semibold flex items-center justify-between">
                        <span>Estimated Annual Compensation Range</span>
                        <span className="text-slate-700 font-bold">Midpoint: {activeResult.currencySymbol}{activeResult.midSalary.toLocaleString()}</span>
                      </p>
                    </div>

                    {/* SALARY RANGE INDICATOR BAR (LOW | MID | HIGH) */}
                    <div className="mb-6 p-5 rounded-2xl bg-slate-50 border border-slate-200/70 shadow-inner">
                      
                      {/* Bar Segment Labels */}
                      <div className="flex justify-between text-xs font-extrabold tracking-wider mb-2.5">
                        <span className="text-red-500">LOW</span>
                        <span className="text-amber-500">MID</span>
                        <span className="text-emerald-600">HIGH</span>
                      </div>

                      {/* Color Segmented Bar */}
                      <div className="relative h-3.5 w-full rounded-full overflow-hidden flex bg-slate-200">
                        <div className="w-1/3 bg-red-500" />
                        <div className="w-1/3 bg-amber-500" />
                        <div className="w-1/3 bg-emerald-500" />

                        {/* Position Indicator Pointer Pin */}
                        <div
                          className="absolute top-1/2 -translate-y-1/2 w-4.5 h-4.5 rounded-full bg-slate-900 border-2 border-white shadow-xl -translate-x-1/2 transition-all duration-500"
                          style={{ left: `${activeResult.positionPercentage}%` }}
                        />
                      </div>

                      {/* Dollar Marker Labels Underneath */}
                      <div className="flex justify-between text-xs font-extrabold text-slate-800 mt-3 pt-2.5 border-t border-slate-200/80">
                        <div className="text-left">
                          <span className="block text-[10px] text-slate-400 font-semibold uppercase">Low</span>
                          {activeResult.currencySymbol}
                          {activeResult.lowSalary.toLocaleString()}
                        </div>
                        <div className="text-center">
                          <span className="block text-[10px] text-slate-400 font-semibold uppercase">Market Midpoint</span>
                          {activeResult.currencySymbol}
                          {activeResult.midSalary.toLocaleString()}
                        </div>
                        <div className="text-right">
                          <span className="block text-[10px] text-slate-400 font-semibold uppercase">High</span>
                          {activeResult.currencySymbol}
                          {activeResult.highSalary.toLocaleString()}
                        </div>
                      </div>

                    </div>

                    {/* IMPROVED SALARY FACTORS & MULTIPLIERS BREAKDOWN SECTION */}
                    <div className="mb-6 p-4.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-3">
                        Transparent Compensation Breakdown:
                      </h4>
                      <div className="space-y-2 text-xs text-slate-700 font-medium">
                        <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/60">
                          <span className="text-slate-500 font-medium">Estimated Market Midpoint:</span>
                          <span className="font-extrabold text-slate-900">
                            {activeResult.currencySymbol}{activeResult.midSalary.toLocaleString()} {activeResult.currencyCode}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 font-medium">Experience:</span>
                          <span className="font-extrabold text-slate-900">{activeResult.multipliersBreakdown.experienceLabel}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 font-medium">Skill:</span>
                          <span className="font-extrabold text-slate-900">{activeResult.multipliersBreakdown.skillLabel}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 font-medium">Demand:</span>
                          <span className="font-extrabold text-slate-900">{activeResult.multipliersBreakdown.demandLabel}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 font-medium">Country:</span>
                          <span className="font-extrabold text-slate-900">{activeResult.multipliersBreakdown.countryLabel}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 font-medium">City:</span>
                          <span className="font-extrabold text-slate-900">{activeResult.multipliersBreakdown.cityLabel}</span>
                        </div>
                        
                        <div className="pt-2.5 border-t border-slate-200/80">
                          <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                            <span>Final Estimated Salary:</span>
                            <div className="text-right">
                              <span className="text-emerald-600 font-extrabold text-sm block">
                                {activeResult.currencySymbol}{activeResult.midSalary.toLocaleString()}/year {activeResult.currencyCode}
                              </span>
                              {activeResult.currencyCode !== "USD" && (
                                <span className="text-[11px] text-slate-500 font-medium block">
                                  USD Reference Conversion (Base Midpoint): ${activeResult.multipliersBreakdown.usdSalary.toLocaleString()} USD
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* ESTIMATED RANGE BREAKDOWN (LOW, MEDIAN, HIGH) */}
                        <div className="pt-2.5 border-t border-slate-200/80 space-y-1.5">
                          <span className="block text-[11px] font-extrabold text-slate-900 uppercase tracking-wider mb-1">
                            Estimated Market Range:
                          </span>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-500">Low (85%):</span>
                            <span className="font-bold text-slate-800">{activeResult.currencySymbol}{activeResult.rangeEstimates.lowEstimate.toLocaleString()} {activeResult.currencyCode}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-500 font-semibold">Median (Target):</span>
                            <span className="font-extrabold text-emerald-600">{activeResult.currencySymbol}{activeResult.rangeEstimates.medianEstimate.toLocaleString()} {activeResult.currencyCode}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-500">High (115%):</span>
                            <span className="font-bold text-slate-800">{activeResult.currencySymbol}{activeResult.rangeEstimates.highEstimate.toLocaleString()} {activeResult.currencyCode}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* GROQ AI LIVE COMPENSATION INSIGHTS UI SECTION */}
                    <div className="mb-6 p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white shadow-xl border border-slate-800 relative overflow-hidden">
                      <div className="absolute -top-12 -right-12 w-36 h-36 bg-red-600/15 rounded-full blur-2xl pointer-events-none" />

                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <Brain className="w-5 h-5 text-red-400 animate-pulse" />
                          <h4 className="text-sm font-extrabold tracking-tight text-white">
                            Venus AI Compensation Intelligence
                          </h4>
                        </div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-300 bg-white/10 border border-white/15 px-2.5 py-0.5 rounded-full">
                          {aiSource === "groq-ai" ? "Groq AI Powered" : "Venus HR Intelligence"}
                        </span>
                      </div>

                      {aiLoading ? (
                        <div className="py-6 text-center space-y-3">
                          <Loader2 className="w-7 h-7 animate-spin text-red-500 mx-auto" />
                          <p className="text-xs font-semibold text-slate-300 animate-pulse">
                            Synthesizing real-time market insights & negotiation tactics...
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
                          {aiInsights ? (
                            <>
                              {/* Executive Summary */}
                              <div>
                                <span className="block font-bold text-slate-200 text-xs mb-1 flex items-center gap-1.5">
                                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                                  Executive Salary Summary:
                                </span>
                                <p className="bg-white/5 p-3 rounded-xl border border-white/10 text-slate-200">
                                  {aiInsights.salaryInsights}
                                </p>
                              </div>

                              {/* Regional Market Analysis */}
                              <div>
                                <span className="block font-bold text-slate-200 text-xs mb-1 flex items-center gap-1.5">
                                  <Target className="w-3.5 h-3.5 text-red-400" />
                                  Regional Market Analysis:
                                </span>
                                <p className="bg-white/5 p-3 rounded-xl border border-white/10 text-slate-300">
                                  {aiInsights.marketAnalysis}
                                </p>
                              </div>

                              {/* Negotiation Tactics */}
                              {aiInsights.negotiationSuggestions?.length > 0 && (
                                <div>
                                  <span className="block font-bold text-slate-200 text-xs mb-1.5 flex items-center gap-1.5">
                                    <Lightbulb className="w-3.5 h-3.5 text-emerald-400" />
                                    Strategic Negotiation Tactics:
                                  </span>
                                  <ul className="space-y-1.5 pl-1">
                                    {aiInsights.negotiationSuggestions.map((item, idx) => (
                                      <li key={idx} className="flex items-start gap-2 text-slate-300">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Career Growth Recommendations */}
                              {aiInsights.careerGrowthRecommendations?.length > 0 && (
                                <div>
                                  <span className="block font-bold text-slate-200 text-xs mb-1.5 flex items-center gap-1.5">
                                    <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                                    Top 10% Compensation Growth Roadmap:
                                  </span>
                                  <ul className="space-y-1.5 pl-1">
                                    {aiInsights.careerGrowthRecommendations.map((item, idx) => (
                                      <li key={idx} className="flex items-start gap-2 text-slate-300">
                                        <ChevronRight className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </>
                          ) : (
                            <div>
                              <span className="block font-bold text-slate-200 text-xs mb-1 flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                                Executive Salary Summary:
                              </span>
                              <p className="bg-white/5 p-3 rounded-xl border border-white/10 text-slate-200">
                                Deterministic market estimation calculated for {activeResult.jobRole} ({activeResult.currencyCode}).
                              </p>
                            </div>
                          )}

                          {/* ACTION BUTTON TO ASK AI ABOUT THIS RESULT */}
                          {isValidCalculatorResult(activeResult) && (
                            <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                              <span className="text-[11px] text-slate-400 font-medium">Want natural language negotiation advice?</span>
                              <button
                                type="button"
                                onClick={handleAskAIAboutResult}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-extrabold transition-all shadow-md shrink-0 cursor-pointer"
                              >
                                <span>Ask AI About This Result</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* METRICS RESULTS BREAKDOWN GRID */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      
                      {/* Current Salary */}
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
                        <span className="block text-xs text-slate-500 font-semibold mb-1">
                          Your Current Salary
                        </span>
                        <span className="text-base sm:text-lg font-extrabold text-slate-900">
                          {activeResult.currencySymbol}
                          {activeResult.currentSalary.toLocaleString()}
                        </span>
                      </div>

                      {/* Estimated Market Value */}
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
                        <span className="block text-xs text-slate-500 font-semibold mb-1">
                          Estimated Market Value
                        </span>
                        <span className="text-base sm:text-lg font-extrabold text-emerald-600">
                          {activeResult.currencySymbol}
                          {activeResult.estimatedMarketValue.toLocaleString()}
                        </span>
                      </div>

                      {/* Potential Increase */}
                      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                        <span className="block text-xs text-emerald-700 font-semibold mb-1">
                          Potential Increase
                        </span>
                        <span className="text-base sm:text-lg font-extrabold text-emerald-700 flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          {activeResult.potentialIncreasePercent > 0
                            ? `+${activeResult.potentialIncreasePercent}%`
                            : `${activeResult.potentialIncreasePercent}%`}
                        </span>
                      </div>

                      {/* Market Position */}
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
                        <span className="block text-xs text-slate-500 font-semibold mb-1">
                          Market Position
                        </span>
                        <span
                          className={`inline-block px-3 py-1 text-xs font-extrabold rounded-full ${
                            activeResult.marketPosition === "Below Market"
                              ? "bg-red-100 text-red-700"
                              : activeResult.marketPosition === "Above Market"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-emerald-100 text-emerald-700"
                          }`}
                        >
                          {activeResult.marketPosition}
                        </span>
                      </div>

                    </div>

                    {/* DYNAMIC EXPLANATION TEXT */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed mb-5">
                      <p className="font-bold text-slate-900 mb-1">HR Assessment Note:</p>
                      {activeResult.explanation}
                    </div>

                    {/* PRIVACY STATEMENT */}
                    <div className="p-3.5 rounded-xl bg-slate-100/80 border border-slate-200 text-[11px] text-slate-500 leading-normal mb-5">
                      🔒 {activeResult.privacyNotice}
                    </div>
                  </div>

                  {/* Bottom Advice CTA */}
                  <div className="pt-4 border-t border-slate-100 text-center">
                    <a
                      href="https://www.venushiring.ca/contact"
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-red-600 hover:text-red-700 transition-colors"
                    >
                      <span>Discuss Your Salary & Career Opportunities With Venus Recruitment</span>
                      <ChevronRight className="w-4 h-4" />
                    </a>
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
