import { useState, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronRight,
  CheckCircle2,
  ArrowRight,
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
  Quote,
  Building2,
  LineChart,
  Cpu,
} from "lucide-react";
import { getServiceBySlug, SERVICES_DATA } from "@/lib/services-store";
import { useFaqs } from "@/lib/faq-store";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ServiceOfferingsSection } from "@/components/services/ServiceOfferingsSection";
import { IndustryTalentSection } from "@/components/services/IndustryTalentSection";
import { FaqSection } from "@/components/site/FaqSection";
import executiveAdvantageBg from "@/assets/executive-advantage-bg.jpg";

export const Route = createFileRoute("/services/$slug")({
  head: ({ params }) => {
    const service = params?.slug ? getServiceBySlug(params.slug) : undefined;
    const title = service ? service.metaTitle : "Service | Venus Hiring";
    const description = service
      ? service.metaDescription
      : "Canadian and US recruitment, executive search, and workforce solutions.";
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
  component: ServiceDetailPage,
});

// Map icon names to Lucide components safely
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
};

function ServiceDetailPage() {
  const params = Route.useParams();
  const slug = params?.slug;
  const navigate = useNavigate();
  const service = slug ? getServiceBySlug(slug) : undefined;
  const { faqs } = useFaqs();

  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  // Scroll to hash target or top when slug changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const targetId = window.location.hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        }
      }, 150);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <SiteNav />
        <main className="py-32 text-center shell">
          <h1 className="text-3xl font-bold text-slate-900">Service Not Found</h1>
          <p className="mt-4 text-slate-600">The requested service page does not exist.</p>
          <Link
            to="/services"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-brand px-6 py-3 text-xs font-bold text-white shadow-brand"
          >
            Explore All Services
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  // Filter FAQs relevant to this service
  const serviceFaqs = faqs.filter(
    (f) =>
      f.category.toLowerCase() === service.faqCategory.toLowerCase() ||
      f.q.toLowerCase().includes(service.slug.replace("-", " "))
  );

  // Related Services Data
  const relatedServices = service.relatedServicesSlugs
    .map((sSlug) => SERVICES_DATA[sSlug])
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between selection:bg-brand selection:text-white">
      <SiteNav />

      <main id="main-content" className="flex-1">
        {/* ── 1. FULL VIEWPORT HERO WITH BACKGROUND IMAGE & OVERLAY ── */}
        <section className="relative isolate overflow-hidden min-h-screen lg:min-h-[100svh] flex flex-col justify-center bg-slate-950 text-white pt-28 sm:pt-32 pb-16">
          {/* Background Image with Black Overlay */}
          <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
            <img
              src={service.heroImage}
              alt={service.title}
              className="h-full w-full object-cover object-center filter brightness-[0.65] contrast-105"
            />
            {/* Softened Black Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/60 to-slate-950/30 sm:from-slate-950/85 sm:via-slate-950/55 sm:to-slate-950/30" />
          </div>
          <div className="pointer-events-none absolute inset-0 -z-10 dot-grid opacity-20" aria-hidden />
          <div className="pointer-events-none absolute -left-32 top-1/4 -z-10 h-96 w-96 rounded-full bg-brand/20 blur-[140px]" aria-hidden />

          <div className="shell relative z-10">
            {/* Breadcrumbs */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-400 mb-6 uppercase tracking-wider">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-600 shrink-0" />
              <Link to="/services" className="hover:text-white transition-colors">
                Services
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-600 shrink-0" />
              <span className="text-brand font-black">{service.title}</span>
            </div>

            <div className="max-w-3xl space-y-6">
              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
                {service.heroHeadline}
              </h1>

              <p className="text-sm sm:text-xl text-slate-300 font-medium leading-relaxed max-w-2xl">
                {service.heroValueProp}
              </p>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href="#process"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-brand px-7 py-4 text-xs font-extrabold text-white shadow-brand transition-all hover:brightness-110 cursor-pointer"
                >
                  <span>Explore Our 5-Step Process</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. EDITORIAL INTRODUCTION & VALUE PROPOSITION ── */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="shell">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              {/* LEFT: Large Statement Quote */}
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3.5 py-1 text-xs font-extrabold text-brand uppercase tracking-wider">
                  <span>STRATEGIC VALUE</span>
                </div>
                <blockquote className="font-display text-2xl sm:text-3xl font-black text-slate-900 leading-snug tracking-tight">
                  "{service.introStatement}"
                </blockquote>
                <div className="h-1 w-16 bg-brand rounded-full" />
              </div>

              {/* RIGHT: Paragraphs & Proof Indicators */}
              <div className="lg:col-span-7 space-y-6">
                {service.introParagraphs.map((p, idx) => (
                  <p key={idx} className="text-base text-slate-600 font-medium leading-relaxed">
                    {p}
                  </p>
                ))}

                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  {service.introProofIndicators.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3.5 text-xs font-bold text-slate-800"
                    >
                      <CheckCircle2 className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. INDUSTRY-SPECIFIC TALENT & ROLES (WITH CURVED SECTION DIVIDER) ── */}
        <IndustryTalentSection
          title={`Add specialized ${service.title.split("&")[0].trim()} talent across your organization`}
          subtitle="Select an industry sector to inspect specialized roles, domain expertise, and candidate deployment capabilities."
          showCurvedTop={true}
        />

        {/* ── 4. SPECIALIZED OFFERINGS & SOLUTIONS ── */}
        {service.specializedOfferings && service.specializedOfferings.length > 0 && (
          <ServiceOfferingsSection
            serviceTitle={service.title}
            offerings={service.specializedOfferings}
          />
        )}

        {/* ── 4. WHAT WE DELIVER (RICH EDITORIAL CARDS WITH CURVED DIVIDER) ── */}
        <section id="deliverables" className="relative bg-slate-50">
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
            <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-200/80 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-slate-800">
                <span>WHAT WE DELIVER</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Core Deliverables & Practice Capabilities
              </h2>
              <p className="text-base text-slate-600 font-medium">
                Service-specific execution standards engineered for speed, accuracy, and long-term retention.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {service.deliverables.map((del, i) => {
                const IconComp = ICON_MAP[del.iconName] || Award;
                return (
                  <div
                    key={i}
                    className="group relative rounded-3xl border border-slate-200/90 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-xl flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-display text-xs font-black text-brand tracking-widest uppercase">
                          {del.number}
                        </span>
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-900 transition-colors group-hover:bg-brand group-hover:text-white">
                          <IconComp className="h-5 w-5" />
                        </div>
                      </div>

                      <h3 className="mt-6 font-display text-xl font-bold text-slate-900 group-hover:text-brand transition-colors">
                        {del.title}
                      </h3>

                      <p className="mt-3 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                        {del.desc}
                      </p>
                    </div>

                    {del.microDetail && (
                      <div className="mt-6 pt-4 border-t border-slate-100">
                        <span className="inline-block rounded-full bg-slate-50 px-3 py-1 text-[11px] font-extrabold text-slate-500">
                          {del.microDetail}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 4. WHO THIS SERVICE IS FOR (EDITORIAL 2-COLUMN OPPORTUNITY GRID WITH CURVED DIVIDER) ── */}
        <section className="relative bg-white">
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
            <div className="w-full space-y-12">
              
              {/* Header aligned with website theme */}
              <div className="max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/5 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-brand">
                  <Target className="h-3.5 w-3.5" />
                  <span>IDEAL HIRING NEED</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  Who This Service Is <span className="text-brand">For</span>
                </h2>
                <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
                  Tailored recruitment frameworks designed to solve specific organizational growth challenges.
                </p>
              </div>

              {/* 2-Column Editorial Grid (01 left | 02 right, 03 left | 04 right) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12">
                {service.whoWeHelp.map((useCase, idx) => (
                  <div
                    key={idx}
                    className="py-8 sm:py-10 border-t border-slate-200/70 flex flex-col justify-between group space-y-6"
                  >
                    <div className="flex items-start gap-5 sm:gap-6">
                      {/* Website Display Number Badge */}
                      <span className="font-display text-3xl sm:text-4xl font-black text-brand shrink-0 leading-none pt-0.5">
                        0{idx + 1}
                      </span>

                      <div className="space-y-2 min-w-0 flex-1">
                        {/* Category Label */}
                        <div className="text-xs font-extrabold text-brand uppercase tracking-widest">
                          {useCase.tag}
                        </div>

                        {/* Website Display Service Title */}
                        <h3 className="font-display text-xl sm:text-2xl font-black text-slate-900 group-hover:text-brand transition-colors leading-snug">
                          {useCase.title}
                        </h3>

                        {/* Clean Website Sans Description */}
                        <p className="text-sm text-slate-600 font-medium leading-relaxed max-w-md pt-1">
                          {useCase.desc}
                        </p>
                      </div>
                    </div>

                    {/* Uppercase Website Action Link */}
                    <div className="flex justify-end pt-2">
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 text-xs font-black text-slate-900 group-hover:text-brand transition-colors uppercase tracking-widest group-hover:translate-x-1 transition-transform"
                      >
                        <span>REQUEST BRIEF</span>
                        <ArrowRight className="h-4 w-4 text-brand" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ── 5. ROLES WE RECRUIT FOR (EXACT FAQ-STYLE STICKY & INDIVIDUAL CARD ARCHITECTURE WITH CURVED DIVIDER) ── */}
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
                    We maintain an active network of non-job-seeking top 5% leaders, pre-screening candidates for domain depth, cultural fit, and long-term retention.
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
                {service.targetRoles.map((role, idx) => {
                  let levelBadge = "LEADERSHIP";
                  if (role.includes("CTO") || role.includes("VP") || role.includes("Chief") || role.includes("Director")) {
                    levelBadge = "EXECUTIVE";
                  } else if (role.includes("Architect") || role.includes("Lead") || role.includes("Manager")) {
                    levelBadge = "SENIOR LEAD";
                  }

                  return (
                    <Link
                      key={idx}
                      to="/contact"
                      className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 flex items-center justify-between gap-4 transition-all duration-300 hover:border-slate-300 hover:shadow-md group cursor-pointer"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <span className="text-xs font-black px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 group-hover:bg-brand/10 group-hover:text-brand transition-colors shrink-0">
                          0{idx + 1}
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

        {/* ── 6. OUR PROCESS — RADIAL BRANCHING CENTRAL HUB ARCHITECTURE (WITH CURVED DIVIDER) ── */}
        <section id="process" className="relative bg-white border-b border-slate-200 overflow-hidden isolate">
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

          {/* Subtle Ambient Glows */}
          <div className="pointer-events-none absolute -left-32 top-1/4 -z-10 h-96 w-96 rounded-full bg-brand/5 blur-[140px]" aria-hidden />
          <div className="pointer-events-none absolute -right-32 bottom-1/4 -z-10 h-96 w-96 rounded-full bg-rose-500/5 blur-[140px]" aria-hidden />

          <div className="py-12 sm:py-20 shell relative z-10 space-y-12">
            
            {/* Header with Top-Right Action Button */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200/90">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/5 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-brand">
                  <Layers className="h-3.5 w-3.5" />
                  <span>END-TO-END WORKFLOW</span>
                </div>

                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  Our Proven 5-Step <span className="text-brand">Execution Process</span>
                </h2>

                <p className="text-base text-slate-600 font-medium leading-relaxed">
                  A structured managed experience ensuring quality candidate presentations and zero-risk onboarding.
                </p>
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-2xl bg-brand text-white px-6 py-3.5 text-xs font-black shadow-brand hover:brightness-110 transition-all shrink-0 cursor-pointer"
              >
                <span>Start 5-Step Process Today</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Main 3-Column Radial Layout Grid (White & Red Theme) */}
            <div className="grid gap-6 lg:grid-cols-12 items-stretch">
              
              {/* LEFT COLUMN: Step 01 & Step 03 */}
              <div className="lg:col-span-4 flex flex-col justify-between gap-6">
                
                {/* Step 01 Card */}
                <div className="group rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 space-y-6 shadow-md hover:shadow-2xl hover:border-brand/40 hover:-translate-y-1 transition-all duration-300 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-serif italic text-4xl sm:text-5xl font-normal text-slate-300 group-hover:text-brand transition-colors">
                        01
                      </span>
                      <span className="rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-[10px] font-black tracking-wider text-brand uppercase">
                        UNDERSTAND
                      </span>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-black text-slate-900 group-hover:text-brand transition-colors">
                      Role Calibration & Discovery
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                      We define core competencies, culture parameters, performance metrics, and search timelines during a deep discovery session.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500 group-hover:text-slate-900">
                    <span>Phase 01 Alignment</span>
                    <Target className="h-4 w-4 text-brand" />
                  </div>
                </div>

                {/* Step 03 Card */}
                <div className="group rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 space-y-6 shadow-md hover:shadow-2xl hover:border-brand/40 hover:-translate-y-1 transition-all duration-300 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-serif italic text-4xl sm:text-5xl font-normal text-slate-300 group-hover:text-brand transition-colors">
                        03
                      </span>
                      <span className="rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-[10px] font-black tracking-wider text-brand uppercase">
                        SCREEN
                      </span>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-black text-slate-900 group-hover:text-brand transition-colors">
                      Multi-Stage Vetting
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                      Candidates complete technical assessments, behavioral interviews, and reference verifications before client introduction.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500 group-hover:text-slate-900">
                    <span>Phase 03 Assessment</span>
                    <ShieldCheck className="h-4 w-4 text-brand" />
                  </div>
                </div>

              </div>

              {/* CENTER COLUMN: Central Recruitment Card & Step 05 Card */}
              <div className="lg:col-span-4 flex flex-col justify-between gap-6">

                {/* Central Card with Full Edge-to-Edge Background Image (Reduced Height) */}
                <div className="relative w-full rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden group flex flex-col justify-end p-6 text-center flex-1 min-h-[240px]">
                  
                  {/* Full Background Image */}
                  <img
                    src={executiveAdvantageBg}
                    alt="Central Recruitment Engine Background"
                    className="absolute inset-0 w-full h-full object-cover object-center filter brightness-90 contrast-105 group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Dark Glass Overlay for Ultra-High Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-slate-950/40" />

                  {/* Text Overlay */}
                  <div className="relative z-10 space-y-3 flex flex-col items-center justify-center h-full my-auto py-4">
                    <span className="inline-block rounded-full border border-white/30 bg-white/15 backdrop-blur-md px-3.5 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-sm">
                      CENTRAL RECRUITMENT ENGINE
                    </span>
                    
                    <h4 className="font-display text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                      Calibrated 5-Stage Pipeline
                    </h4>
                    
                    <p className="text-xs text-slate-200 font-medium leading-relaxed max-w-xs mx-auto drop-shadow-sm">
                      End-to-end talent acquisition architecture driving 98% retention.
                    </p>
                  </div>

                </div>

                {/* Step 05 Card (Exact match in sizing & style with 01, 02, 03, 04) */}
                <div className="group rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 space-y-6 shadow-md hover:shadow-2xl hover:border-brand/40 hover:-translate-y-1 transition-all duration-300 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-serif italic text-4xl sm:text-5xl font-normal text-slate-300 group-hover:text-brand transition-colors">
                        05
                      </span>
                      <span className="rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-[10px] font-black tracking-wider text-brand uppercase">
                        PLACE
                      </span>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-black text-slate-900 group-hover:text-brand transition-colors">
                      Offer & Onboarding Support
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                      We manage offer negotiations, resignation guidance, and 90-day post-placement integration check-ins.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500 group-hover:text-slate-900">
                    <span>Phase 05 Onboarding</span>
                    <UserCheck className="h-4 w-4 text-brand" />
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: Step 02 & Step 04 */}
              <div className="lg:col-span-4 flex flex-col justify-between gap-6">
                
                {/* Step 02 Card */}
                <div className="group rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 space-y-6 shadow-md hover:shadow-2xl hover:border-brand/40 hover:-translate-y-1 transition-all duration-300 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-serif italic text-4xl sm:text-5xl font-normal text-slate-300 group-hover:text-brand transition-colors">
                        02
                      </span>
                      <span className="rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-[10px] font-black tracking-wider text-brand uppercase">
                        SEARCH
                      </span>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-black text-slate-900 group-hover:text-brand transition-colors">
                      Talent Mapping & Sourcing
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                      Our headhunters research competitor landscapes, mapping target candidates and engaging passive leaders directly.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500 group-hover:text-slate-900">
                    <span>Phase 02 Headhunting</span>
                    <Users className="h-4 w-4 text-brand" />
                  </div>
                </div>

                {/* Step 04 Card */}
                <div className="group rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 space-y-6 shadow-md hover:shadow-2xl hover:border-brand/40 hover:-translate-y-1 transition-all duration-300 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-serif italic text-4xl sm:text-5xl font-normal text-slate-300 group-hover:text-brand transition-colors">
                        04
                      </span>
                      <span className="rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-[10px] font-black tracking-wider text-brand uppercase">
                        PRESENT
                      </span>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-black text-slate-900 group-hover:text-brand transition-colors">
                      Shortlist Presentation
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                      You receive 3 to 5 fully vetted candidate dossiers with executive summary profiles and interview briefs.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500 group-hover:text-slate-900">
                    <span>Phase 04 Presentation</span>
                    <FileText className="h-4 w-4 text-brand" />
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* ── 7. WHY VENUS (THE VENUS ADVANTAGE WITH LIGHT THEME RELATABLE BG & BLACK OVERLAY) ── */}
        <section className="relative isolate overflow-hidden py-16 sm:py-24 bg-slate-950 text-white border-b border-slate-800">
          {/* Custom Generated Executive Search Handshake Background Image with Black Overlay */}
          <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
            <img
              src={executiveAdvantageBg}
              alt="Senior Venus executive search recruitment partner shaking hands with corporate leader in Toronto boardroom"
              className="h-full w-full object-cover object-center filter brightness-[0.85] contrast-105"
            />
            {/* Subtle Light Black Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-slate-950/30 to-slate-950/10 sm:from-slate-950/50 sm:via-slate-950/25 sm:to-slate-950/10" />
          </div>
          <div className="pointer-events-none absolute inset-0 -z-10 dot-grid opacity-15" aria-hidden />
          <div className="pointer-events-none absolute -right-32 top-1/3 -z-10 h-96 w-96 rounded-full bg-brand/20 blur-[150px]" aria-hidden />

          <div className="shell relative z-10">
            <div className="max-w-3xl space-y-4 mb-12">
              <h2 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
                Why Employers Choose Venus for {service.title.split(" & ")[0]}
              </h2>
              <p className="text-lg text-slate-300 font-medium">
                "{service.whyVenus.statement}"
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {service.whyVenus.points.map((pt, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl border border-slate-800/80 bg-slate-950/80 p-6 sm:p-8 space-y-4 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-brand/40"
                >
                  <div className="h-2 w-12 rounded-full bg-brand" />
                  <h3 className="font-display text-xl font-bold text-white">{pt.title}</h3>
                  <p className="text-sm text-slate-300 font-medium leading-relaxed">{pt.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 8. MARKET INTELLIGENCE & ADVISORY (HIGH-TECH EXECUTIVE DATA BENTO ARCHITECTURE) ── */}
        <section className="py-16 sm:py-24 bg-white overflow-hidden relative">
          <div className="shell relative z-10">
            <div className="space-y-12">
              
              {/* Header */}
              <div className="max-w-3xl mx-auto text-center space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/5 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-brand">
                  <LineChart className="h-3.5 w-3.5" />
                  <span>MARKET INTELLIGENCE</span>
                </div>

                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  More Than Recruitment.{" "}
                  <span className="text-brand">Strategic Market Insights.</span>
                </h2>

                <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
                  We position your organization for hiring success with empirical labor data, compensation benchmarks, and passive talent density maps.
                </p>
              </div>

              {/* 3 Executive Data Intelligence Cards Grid */}
              <div className="grid gap-8 md:grid-cols-3">
                {service.marketIntelligence.map((mi, idx) => {
                  const icons = [DollarSign, PieChart, ShieldAlert];
                  const IconComp = icons[idx % icons.length];
                  
                  const metricBadges = [
                    "REAL-TIME SALARY BENCHMARKS",
                    "CANDIDATE DENSITY MATRIX",
                    "RETENTION & OFFBOARDING RISK",
                  ];

                  return (
                    <div
                      key={idx}
                      className="group relative rounded-3xl border border-slate-200/90 bg-slate-50/80 hover:bg-white p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-xl hover:border-brand/40 hover:-translate-y-1.5 transition-all duration-300"
                    >
                      <div className="space-y-5">
                        {/* Top Icon & Metric Badge */}
                        <div className="flex items-center justify-between">
                          <div className="h-12 w-12 rounded-2xl bg-brand text-white flex items-center justify-center font-bold shadow-brand shadow-md group-hover:scale-110 transition-transform">
                            <IconComp className="h-6 w-6" />
                          </div>

                          <span className="rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-[10px] font-black tracking-wider text-brand uppercase">
                            0{idx + 1} INSIGHT
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-display text-xl font-black text-slate-900 leading-snug group-hover:text-brand transition-colors">
                          {mi.title}
                        </h3>

                        {/* Custom Metric Micro-Widget */}
                        {idx === 0 && (
                          <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2">
                            <div className="flex justify-between text-[11px] font-bold text-slate-600">
                              <span>P25: $165K</span>
                              <span className="text-brand">P50: $210K</span>
                              <span>P75: $285K+</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-rose-400 to-brand w-3/4 rounded-full" />
                            </div>
                          </div>
                        )}

                        {idx === 1 && (
                          <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2">
                            <div className="flex justify-between text-[11px] font-bold text-slate-600">
                              <span className="text-brand">84% Passive Talent</span>
                              <span>16% Active</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-slate-100 flex overflow-hidden">
                              <div className="h-full bg-brand w-[84%]" />
                              <div className="h-full bg-slate-300 w-[16%]" />
                            </div>
                          </div>
                        )}

                        {idx === 2 && (
                          <div className="rounded-2xl border border-slate-200 bg-white p-4 flex items-center justify-between">
                            <span className="text-[11px] font-bold text-slate-600">
                              12-Month Retention Rate
                            </span>
                            <div className="flex items-center gap-1.5 text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                              <span>98.4%</span>
                            </div>
                          </div>
                        )}

                        <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                          {mi.desc}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold text-slate-700">
                        <span>{metricBadges[idx]}</span>
                        <ArrowRight className="h-4 w-4 text-brand group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Custom Analytics Advisory Banner */}
              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/90">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="font-display text-base sm:text-lg font-black text-slate-900">
                    Need a custom compensation benchmark or labor density study?
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium">
                    Our executive research team compiles custom labor analytics for active search engagements.
                  </p>
                </div>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-2xl bg-brand px-6 py-3.5 text-xs font-black text-white shadow-brand hover:brightness-110 transition-all shrink-0 cursor-pointer"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Request Labor Analytics Report</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* ── 10. SERVICE-SPECIFIC FAQ ACCORDION (VERSION 2.0 - LIGHT STICKY LAYOUT) ── */}
        {serviceFaqs.length > 0 && (
          <FaqSection
            faqs={serviceFaqs}
            eyebrow="SERVICE FAQ"
            title={`Frequently Asked Questions for ${service.title.split(" & ")[0]}`}
            subtitle="Explore transparent details regarding our engagement models, replacement guarantees, and candidate shortlisting speed."
          />
        )}

        {/* ── 11. RELATED SERVICES (CROSS-NAVIGATION WITH CURVED DIVIDER) ── */}
        {relatedServices.length > 0 && (
          <section className="relative bg-white">
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
              <div className="space-y-10">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div className="space-y-2">
                    <span className="text-xs font-black text-brand uppercase tracking-widest">
                      CROSS-PRACTICE SOLUTIONS
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl font-black text-slate-900">
                      Explore More Venus Solutions
                    </h2>
                  </div>
                  <Link
                    to="/services"
                    className="text-xs font-extrabold text-brand hover:underline flex items-center gap-1 shrink-0"
                  >
                    <span>View All 6 Services</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  {relatedServices.map((rel) => (
                    <button
                      key={rel.slug}
                      onClick={() => navigate({ to: `/services/$slug`, params: { slug: rel.slug } })}
                      className="group text-left rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-sm transition-all hover:border-brand/40 hover:bg-white hover:shadow-lg flex flex-col justify-between cursor-pointer"
                    >
                      <div className="space-y-3">
                        <span className="inline-block rounded-full bg-white border border-slate-200 px-3 py-1 text-[10px] font-extrabold text-slate-700 uppercase">
                          {rel.eyebrow}
                        </span>
                        <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-brand transition-colors">
                          {rel.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed line-clamp-3">
                          {rel.heroValueProp}
                        </p>
                      </div>

                      <div className="pt-6 flex items-center justify-between border-t border-slate-200/60 mt-6">
                        <span className="text-xs font-extrabold text-brand">Explore Practice</span>
                        <ArrowRight className="h-4 w-4 text-brand transition-transform group-hover:translate-x-1" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── 12. FINAL CONVERSION BANNER (VOY ETHEREAL CTA DESIGN) ── */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="shell">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-white via-slate-50/50 to-rose-50/30 p-10 sm:p-20 text-center shadow-xl border border-slate-200/80">
              
              {/* Ethereal Bottom Glow Orb (Soft Peach/Rose/Venus Red Gradient Mesh Glow) */}
              <div
                className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 h-80 w-[32rem] sm:w-[48rem] rounded-full bg-gradient-to-t from-rose-500/25 via-brand/15 to-transparent blur-3xl opacity-80"
                aria-hidden
              />

              <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-brand">
                  <PhoneCall className="h-3.5 w-3.5" />
                  <span>START YOUR TALENT SEARCH</span>
                </div>

                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                  {service.ctaHeadline}
                </h2>

                <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-xl mx-auto">
                  {service.ctaSubtext}
                </p>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2.5 rounded-full bg-slate-950 px-9 py-4.5 text-xs font-black text-white shadow-xl hover:bg-brand transition-all duration-300 cursor-pointer"
                  >
                    <span>Book a Consultation</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-8 py-4 text-xs font-black text-slate-800 shadow-sm hover:border-slate-900 hover:bg-slate-950 hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    <MessageSquare className="h-4 w-4 text-brand" />
                    <span>Contact Venus</span>
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
