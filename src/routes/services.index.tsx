import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { SERVICES_DATA } from "@/lib/services-store";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ServiceOfferingsSection } from "@/components/services/ServiceOfferingsSection";
import { IndustryTalentSection } from "@/components/services/IndustryTalentSection";
import servicesHero from "@/assets/services-hero.jpg";

const TITLE = "Our Recruitment & Workforce Services | Venus Hiring";
const DESCRIPTION =
  "Comprehensive Canadian and US recruitment services, executive search, contract staffing, startup hiring, talent consulting, fractional HR, and SOW project pods.";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ServicesIndexPage,
});

function ServicesIndexPage() {
  const servicesList = Object.values(SERVICES_DATA);
  const [activeServiceTab, setActiveServiceTab] = useState<string>("executive-search");

  const selectedService = SERVICES_DATA[activeServiceTab] || servicesList[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between selection:bg-brand selection:text-white">
      <SiteNav />

      <main id="main-content" className="flex-1">
        {/* ── HERO ── */}
        <section className="relative isolate overflow-hidden min-h-screen lg:min-h-[100svh] flex flex-col justify-center bg-slate-950 text-white pt-28 sm:pt-32 pb-16 border-b border-slate-800">
          {/* Background Image with Black Overlay */}
          <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
            <img
              src={servicesHero}
              alt="Senior recruitment partners discussing workforce strategy in Toronto boardroom"
              className="h-full w-full object-cover object-center filter brightness-[0.65] contrast-105"
            />
            {/* Softened Black Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/60 to-slate-950/30 sm:from-slate-950/85 sm:via-slate-950/55 sm:to-slate-950/30" />
          </div>
          <div className="pointer-events-none absolute inset-0 -z-10 dot-grid opacity-20" aria-hidden />
          <div className="pointer-events-none absolute -left-32 top-1/4 -z-10 h-96 w-96 rounded-full bg-brand/20 blur-[140px]" aria-hidden />

          <div className="shell relative z-10">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-6 uppercase tracking-wider">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
              <span className="text-brand font-black">Services</span>
            </div>

            <div className="max-w-3xl space-y-6">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
                Specialized Talent Practices Engineered for Impact.
              </h1>

              <p className="text-base sm:text-xl text-slate-300 font-medium leading-relaxed max-w-2xl">
                Explore our core recruitment capabilities, executive search practices, contract staffing models, and strategic workforce advisory.
              </p>
            </div>
          </div>
        </section>

        {/* ── CORE VENUS SERVICES ARCHIVE GRID ── */}
        <section className="py-16 sm:py-24">
          <div className="shell">
            <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-200/80 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-slate-800">
                <span>OUR SIX CORE PRACTICES</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Recruitment & Workforce Solutions
              </h2>
              <p className="text-base text-slate-600 font-medium">
                Select a practice model below to explore specialized offerings, process workflows, and candidate roles.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {servicesList.map((service) => (
                <Link
                  key={service.slug}
                  to="/services/$slug"
                  params={{ slug: service.slug }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-brand/40 hover:shadow-2xl"
                >
                  <div className="space-y-4">
                    <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">
                      {service.eyebrow}
                    </span>

                    <h2 className="font-display text-2xl font-black text-slate-900 group-hover:text-brand transition-colors leading-snug">
                      {service.title}
                    </h2>

                    <p className="text-sm text-slate-600 font-medium leading-relaxed line-clamp-3">
                      {service.heroValueProp}
                    </p>

                    <div className="pt-2 space-y-2">
                      {service.introProofIndicators?.slice(0, 3).map((pt, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                          <CheckCircle2 className="h-4 w-4 text-brand shrink-0" />
                          <span className="truncate">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 flex items-center justify-between border-t border-slate-100 mt-6">
                    <span className="text-xs font-black text-brand uppercase tracking-wider group-hover:underline">
                      Explore Practice
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-900 group-hover:bg-brand group-hover:text-white transition-colors">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── NEW SECTION: ADD SPECIALIZED TALENT ACROSS YOUR ORGANIZATION (INDUSTRY SELECTOR) ── */}
        <IndustryTalentSection
          title="Add specialized talent across your organization"
          subtitle="Select an industry sector to explore specialized candidate roles, practice depth, and workforce deployment speed."
          showCurvedTop={true}
        />

        {/* ── SERVICE TAB SELECTOR FOR SPECIALIZED OFFERINGS ── */}
        <section className="pt-16 pb-8 bg-white text-slate-900">
          <div className="shell">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 border border-slate-200 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-slate-800">
                <span>SPECIALIZED SOLUTIONS</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Explore Specialized Solutions & Roles
              </h2>
              <p className="text-base text-slate-600 font-medium leading-relaxed">
                Select a Venus practice area to inspect specialized offerings, candidate roles, and recruitment support models.
              </p>
            </div>

            {/* Service Selector Tabs */}
            <div className="flex flex-wrap justify-center gap-2">
              {servicesList.map((s) => (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => setActiveServiceTab(s.slug)}
                  className={`rounded-full px-5 py-2.5 text-xs font-extrabold transition-all cursor-pointer ${
                    activeServiceTab === s.slug
                      ? "bg-brand text-white shadow-brand scale-105"
                      : "bg-slate-100 text-slate-700 border border-slate-200 hover:border-brand/40 hover:text-slate-900"
                  }`}
                >
                  {s.title.split("&")[0].split("Solutions")[0].trim()}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── SPECIALIZED OFFERINGS CAROUSEL WITH CURVED DIVIDER & ARROWS (< >) ── */}
        {selectedService && (
          <ServiceOfferingsSection
            serviceTitle={selectedService.title}
            offerings={selectedService.specializedOfferings}
            eyebrow={selectedService.eyebrow}
            subtitle={selectedService.heroValueProp}
            ctaText="Preview Candidates & Roles"
          />
        )}

        {/* ── CONVERSION CTA ── */}
        <section className="pt-12 pb-6 sm:pt-16 sm:pb-8">
          <div className="shell">
            <div className="rounded-3xl bg-slate-950 p-8 sm:p-12 text-white shadow-2xl border border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="space-y-3 max-w-xl">
                <h2 className="font-display text-3xl font-black text-white">Need a Custom Workforce Solution?</h2>
                <p className="text-sm text-slate-300 font-medium">
                  Tell us what you're looking for and our recruitment specialists will help you determine the right hiring approach.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand px-7 py-4 text-xs font-extrabold text-white shadow-brand transition-all hover:brightness-110 shrink-0 cursor-pointer"
                >
                  <span>Book a Consultation</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-900 px-7 py-4 text-xs font-extrabold text-white transition-all hover:bg-slate-800 shrink-0 cursor-pointer"
                >
                  <span>Contact Venus</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
