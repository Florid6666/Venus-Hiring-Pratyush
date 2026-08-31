import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ChevronRight,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Building2,
  Cpu,
  Car,
  Plane,
  ShieldAlert,
  Zap,
  DollarSign,
  Truck,
  Layers,
  Award,
  PhoneCall,
  MessageSquare,
} from "lucide-react";
import { INDUSTRIES_DATA, type IndustryDetail } from "@/lib/industries-store";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import servicesHero from "@/assets/services-hero.jpg";

const TITLE = "Industry Specific Recruitment Practices | Venus Hiring";
const DESCRIPTION =
  "Specialized recruitment practices tailored to Technology, Automotive & EV, Aerospace, Advanced Manufacturing, Healthcare, Finance, and Supply Chain across Canada and the US.";

export const Route = createFileRoute("/industries/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
    ],
  }),
  component: IndustriesIndexPage,
});

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  Cpu,
  Car,
  Plane,
  ShieldAlert,
  Zap,
  DollarSign,
  Truck,
  Layers,
  Award,
};

function IndustriesIndexPage() {
  const industriesList = Object.values(INDUSTRIES_DATA);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between selection:bg-brand selection:text-white">
      <SiteNav />

      <main id="main-content" className="flex-1">
        {/* ── HERO ── */}
        <section className="relative isolate overflow-hidden min-h-screen lg:min-h-[100svh] flex flex-col justify-center bg-slate-950 text-white pt-28 sm:pt-32 pb-16 border-b border-slate-800">
          {/* Background Image with Softened Black Overlay */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <img
              src={servicesHero}
              alt="Industry Specific Recruitment"
              className="h-full w-full object-cover object-center filter brightness-[0.65] contrast-105 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/60 to-slate-950/30" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand/15 via-transparent to-transparent" />
          </div>

          <div className="shell relative z-10 my-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300 mb-6 uppercase tracking-wider">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
              <span className="text-brand font-black">Industries</span>
            </div>

            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/15 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-brand backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5" />
                <span>SECTOR SPECIALIZATION</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
                Industry-Wise Recruitment Practices.
              </h1>

              <p className="text-base sm:text-xl text-slate-200 font-medium leading-relaxed max-w-2xl">
                Domain-deep headhunting and technical screening engineered around the unique regulatory, technical, and talent dynamics of your sector.
              </p>

            </div>
          </div>
        </section>

        {/* ── INDUSTRIES CARDS GRID ── */}
        <section className="py-16 sm:py-24">
          <div className="shell">
            <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-200/80 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-slate-800">
                <span>PRACTICE AREAS</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Domain-Deep Recruitment Expertise
              </h2>
              <p className="text-base text-slate-600 font-medium">
                Select an industry category to explore specialized sub-practices, target roles, and tailored recruitment frameworks.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {industriesList.map((ind) => {
                return (
                  <Link
                    key={ind.slug}
                    to="/industries/$slug"
                    params={{ slug: ind.slug }}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-brand/40 hover:shadow-2xl"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-[11px] font-extrabold text-brand uppercase tracking-wider">
                          {ind.eyebrow}
                        </span>
                        <div className="h-10 w-10 rounded-2xl bg-slate-100 text-slate-900 flex items-center justify-center transition-colors group-hover:bg-brand group-hover:text-white">
                          <Building2 className="h-5 w-5" />
                        </div>
                      </div>

                      <h3 className="font-display text-2xl font-black text-slate-900 group-hover:text-brand transition-colors leading-snug">
                        {ind.name}
                      </h3>

                      <p className="text-sm text-slate-600 font-medium leading-relaxed line-clamp-3">
                        {ind.heroValueProp}
                      </p>

                      {/* Sub-categories Preview */}
                      <div className="pt-3 border-t border-slate-100 space-y-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                          Specialized Practice Hubs:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {ind.subCategories.slice(0, 3).map((sub, i) => (
                            <span
                              key={i}
                              className="rounded-lg bg-slate-50 border border-slate-200 px-2.5 py-1 text-[11px] font-bold text-slate-700"
                            >
                              {sub.title}
                            </span>
                          ))}
                          {ind.subCategories.length > 3 && (
                            <span className="rounded-lg bg-brand/5 text-brand px-2 py-1 text-[11px] font-extrabold">
                              +{ind.subCategories.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Key Roles */}
                      <div className="pt-2 space-y-1.5">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                          Top Placed Roles:
                        </span>
                        {ind.targetRoles.slice(0, 3).map((role, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                            <CheckCircle2 className="h-3.5 w-3.5 text-brand shrink-0" />
                            <span className="truncate">{role}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-8 flex items-center justify-between border-t border-slate-100 mt-6">
                      <span className="text-xs font-black text-brand uppercase tracking-wider group-hover:underline">
                        Explore Industry Practice
                      </span>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-900 group-hover:bg-brand group-hover:text-white transition-colors">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CONVERSION CTA BANNER (VOY-STYLE ETHEREAL LIGHT CARD MATCHING SERVICES PAGE) ── */}
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
                  <span>START YOUR TALENT SEARCH</span>
                </div>

                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  Need Industry-Specific Hiring Support?
                </h2>

                <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
                  Connect directly with our sector recruitment directors for a confidential consultation and customized candidate mapping.
                </p>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-8 py-4 text-xs font-extrabold text-white shadow-xl transition-all hover:bg-slate-900 cursor-pointer"
                  >
                    <span>Book a Consultation</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-8 py-4 text-xs font-extrabold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
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
