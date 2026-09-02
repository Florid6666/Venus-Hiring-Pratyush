import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  Building2,
  Car,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Cpu,
  Crown,
  Factory,
  FlaskConical,
  Globe,
  Globe2,
  Handshake,
  Headphones,
  MapPin,
  Plane,
  Rocket,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  Target,
  TrendingUp,
  Users,
  Users2,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/use-reveal";
import { CtaLink, SectionHeading } from "./primitives";
import whyImg from "@/assets/hero-team.jpg";
import employersImg from "@/assets/employers-card.png";
import professionalsImg from "@/assets/professionals-card.png";

/* ------------------------------ Trusted advisory ------------------------------ */

const STRIP_ROW1 =
  "Workforce Planning // Talent Acquisition // Executive Search // Leadership Hiring // Skills Assessment //";
const STRIP_ROW2 =
  "Contract Staffing // Permanent Staffing // HR Advisory // Talent Consulting // Recruitment Process Outsourcing //";

function OutlineRow({
  text,
  reverse,
  duration,
}: {
  text: string;
  reverse?: boolean;
  duration: number;
}) {
  return (
    <div className="group overflow-hidden select-none cursor-default" aria-hidden>
      <div
        className={cn(
          "marquee-lane flex w-max items-center gap-0 transition-[animation-play-state] group-hover:[animation-play-state:paused]",
          reverse && "marquee-lane-reverse",
        )}
        style={{ animationDuration: `${duration}s` }}
      >
        {[0, 1].map((half) => (
          <span
            key={half}
            className="shrink-0 whitespace-nowrap font-display text-[4rem] font-bold uppercase leading-none tracking-tight sm:text-[5.5rem] lg:text-[7rem]"
            style={{
              color: "transparent",
              WebkitTextStroke:
                "1.5px color-mix(in oklab, var(--color-foreground) 28%, transparent)",
              transition:
                "color 0.45s cubic-bezier(0.22,1,0.36,1), -webkit-text-stroke-color 0.45s cubic-bezier(0.22,1,0.36,1), transform 0.45s cubic-bezier(0.22,1,0.36,1)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "var(--color-brand)";
              el.style.webkitTextStrokeColor = "var(--color-brand)";
              el.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "transparent";
              el.style.webkitTextStrokeColor =
                "color-mix(in oklab, var(--color-foreground) 28%, transparent)";
              el.style.transform = "scale(1)";
            }}
          >
            {text}&nbsp;
          </span>
        ))}
      </div>
    </div>
  );
}

export function TrustedStrip() {
  return (
    <section
      aria-label="Trusted advisory"
      className="section-curve relative overflow-hidden border-b border-border bg-background py-16 sm:py-20"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 mesh-light opacity-70"
        aria-hidden
      />
      <div className="shell relative text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-muted-foreground">
          Trusted Advisory
        </p>
        <span
          className="mx-auto mt-5 block h-px w-16 bg-gradient-to-r from-transparent via-brand to-transparent"
          aria-hidden
        />
      </div>

      <div
        className="relative mt-10 space-y-4 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <OutlineRow text={STRIP_ROW1} duration={40} />
        <OutlineRow text={STRIP_ROW2} reverse duration={52} />
      </div>
    </section>
  );
}

/* ------------------------------- Who We Serve ------------------------------- */

export function WhoWeServe() {
  const { ref, shown } = useReveal<HTMLDivElement>();

  const CARDS = [
    {
      id: "employers",
      title: "EMPLOYERS",
      icon: Building2,
      copy: "Hire qualified professionals faster with structured recruitment, staffing and talent solutions.",
      ctaText: "Hire Top Talent →",
      href: "/contact",
      tag: "For Organizations",
      image:
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1000&h=750&fit=crop&auto=format",
      imgPosition: "object-center",
    },
    {
      id: "professionals",
      title: "PROFESSIONALS",
      icon: Users,
      copy: "Discover career opportunities matched to your experience, skills and goals.",
      ctaText: "Find Jobs →",
      href: "https://www.venushiring.ca/jobs",
      tag: "For Candidates",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1000&h=750&fit=crop&auto=format",
      imgPosition: "object-top",
    },
    {
      id: "startups",
      title: "STARTUPS & SCALEUPS",
      icon: Rocket,
      copy: "Build your early team, hiring infrastructure and talent pipeline as you grow.",
      ctaText: "Build Your Team →",
      href: "https://www.venushiring.ca/contact",
      tag: "For Scaleups",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&h=750&fit=crop&auto=format",
      imgPosition: "object-center",
    },
  ];

  return (
    <section
      id="who-we-serve"
      className="relative overflow-hidden border-b border-border bg-porcelain section-padding"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 mesh-light opacity-80"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 dot-grid-light opacity-[0.25]"
        aria-hidden
      />

      <div className="shell relative">
        <SectionHeading
          title="Tailored Solutions for Employers, Candidates & Scaleups"
          copy="Whether you are an enterprise building specialized teams, a professional pursuing your next leadership role, or a high-growth startup scaling fast."
        />

        <div ref={ref} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, i) => {
            const { icon: Icon } = card;
            return (
              <a
                key={card.id}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group relative isolate flex flex-col justify-between overflow-hidden rounded-[2.25rem] p-6 sm:p-7",
                  "border border-border/80 bg-background/95 backdrop-blur-xl shadow-lg",
                  "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "hover:-translate-y-2 hover:border-brand/60 hover:shadow-[0_25px_60px_-25px_rgba(224,30,55,0.25)]",
                  "reveal-item",
                  shown && "is-shown",
                )}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* Card Header Image Banner */}
                <div className="relative h-44 sm:h-48 w-full overflow-hidden rounded-2xl border border-border/60 shadow-sm">
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    className={cn(
                      "h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105",
                      card.imgPosition
                    )}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <span className="absolute top-3 left-3 inline-flex items-center rounded-full border border-white/30 bg-black/40 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
                    {card.tag}
                  </span>

                  <span className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-brand shadow-md backdrop-blur-md transition-all group-hover:bg-brand group-hover:text-white group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>

                <div className="mt-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                      {card.title}
                    </h3>

                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
                      {card.copy}
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-border/60">
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-brand transition-all group-hover:translate-x-1">
                      {card.ctaText}
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- About Venus -------------------------------- */

export function AboutVenus() {
  const { ref, shown } = useReveal<HTMLDivElement>();

  const FOOTPRINTS = [
    {
      city: "Toronto, Canada",
      role: "Canadian HQ & Talent Hub",
      icon: MapPin,
      desc: "Provincial compliance & Canadian talent pool coverage.",
    },
    {
      city: "Michigan / Troy, US",
      role: "North American Industrial Hub",
      icon: Building2,
      desc: "Automotive, EV, and cross-border US-Canada staffing.",
    },
    {
      city: "India Operations",
      role: "Global Sourcing Hub",
      icon: Globe2,
      desc: "Round-the-clock sourcing & technical candidate research.",
    },
  ];

  const PILLARS = [
    "Canadian market knowledge",
    "North American recruitment",
    "Global sourcing reach",
    "Structured candidate assessment",
    "Strategic talent advisory",
    "Long-term partnership",
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden border-b border-border bg-background section-padding"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 mesh-light opacity-60"
        aria-hidden
      />

      <div className="shell relative">
        <div ref={ref} className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div
            className={cn(
              "space-y-6 lg:col-span-6 reveal-item",
              shown && "is-shown",
            )}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand-soft/50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-brand">
              <Sparkles className="h-3.5 w-3.5 text-brand" /> About Venus Consultancy
            </span>

            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-tight">
              Canadian expertise. Global reach. Human partnership.
            </h2>

            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
              Venus Consultancy connects Canadian employers with exceptional talent while providing comprehensive recruitment, staffing, executive search, HR advisory, and talent consulting capabilities across North America.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              {PILLARS.map((p) => (
                <div
                  key={p}
                  className="flex items-center gap-2 rounded-xl border border-border/80 bg-slate-50/80 p-3 text-xs font-semibold text-foreground shadow-sm"
                >
                  <CheckCircle2 className="h-4 w-4 text-brand shrink-0" />
                  <span>{p}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <CtaLink href="https://www.venushiring.ca/contact" variant="brand" size="lg">
                Meet Venus Consultancy →
              </CtaLink>
            </div>
          </div>

          <div
            className={cn(
              "space-y-4 lg:col-span-6 reveal-item",
              shown && "is-shown",
            )}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="rounded-[2.5rem] border border-border/80 bg-ink p-8 text-white shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/15 pb-5">
                <div>
                  <h3 className="text-xl font-bold text-white">Geographic Footprint</h3>
                  <p className="text-xs text-white/70">Connecting North American & International Talent</p>
                </div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white">
                  <Globe2 className="h-5 w-5" />
                </span>
              </div>

              <div className="space-y-4">
                {FOOTPRINTS.map((fp) => {
                  const { icon: FpIcon } = fp;
                  return (
                    <div
                      key={fp.city}
                      className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-brand backdrop-blur-md">
                        <FpIcon className="h-5 w-5" />
                      </span>
                      <div>
                        <h4 className="text-base font-bold text-white">{fp.city}</h4>
                        <p className="text-xs font-semibold text-brand">{fp.role}</p>
                        <p className="mt-1 text-xs text-white/70">{fp.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Why us ---------------------------------- */

const REASONS = [
  {
    pill: "Screening",
    title: "Vetted before you meet them",
    copy: "Structured screening, skills assessment and reference depth — shortlists average three candidates, not thirty.",
    Icon: BadgeCheck,
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=600&fit=crop&auto=format",
  },
  {
    pill: "Local expertise",
    title: "Canadian market fluency",
    copy: "Provincial compliance, PR and work-permit pathways, and salary benchmarking across every major Canadian metro.",
    Icon: Globe2,
    image:
      "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&h=600&fit=crop&auto=format",
  },
  {
    pill: "Sourcing",
    title: "Global sourcing reach",
    copy: "Teams in Toronto, Michigan and India give you round-the-clock sourcing and access to international professionals.",
    Icon: Users2,
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop&auto=format",
  },
  {
    pill: "Partnership",
    title: "Accountable partnership",
    copy: "Weekly pipeline reporting, a named consultant and replacement guarantees written into every engagement.",
    Icon: Handshake,
    image:
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=600&fit=crop&auto=format",
  },
];

export function WhyUs() {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const [active, setActive] = useState(0);

  return (
    <section
      id="why"
      className="relative isolate flex flex-col justify-center overflow-hidden bg-white section-padding border-b border-slate-200"
    >
      <div className="shell relative my-auto">
        <SectionHeading
          tone="light"
          title="Recruitment that behaves like an in-house team"
          copy="We embed with your hiring managers, run a disciplined process, and stay accountable to the same metrics you are."
        />

        <div
          ref={ref}
          className="mt-8 lg:mt-10 flex flex-col gap-5 lg:flex-row lg:h-[460px] lg:gap-4"
        >
          {REASONS.map((reason, i) => {
            const isActive = active === i;
            const { Icon } = reason;
            return (
              <button
                key={reason.title}
                type="button"
                aria-expanded={isActive}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                style={{ transitionDelay: shown ? "0ms" : `${i * 110}ms` }}
                className={cn(
                  "group relative isolate flex min-h-[22rem] flex-col overflow-hidden rounded-[2rem] p-8 text-left sm:min-h-[28rem]",
                  "glass-frost shadow-[0_30px_70px_-40px_rgba(0,0,0,0.9)]",
                  "hover:-translate-y-1 lg:h-full lg:min-h-0 process-accordion-item",
                  isActive ? "is-active border-brand/60" : "border-white/20",
                  "reveal-item",
                  shown && "is-shown",
                )}
              >
                {/* Large Card background image */}
                <img
                  src={reason.image}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  className={cn(
                    "pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isActive
                      ? "scale-105 opacity-70"
                      : "scale-100 opacity-35 group-hover:opacity-50",
                  )}
                />
                {/* Gradient scrim for readable high-contrast text */}
                <span
                  className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/75 to-transparent transition-opacity duration-700 ease-out"
                  aria-hidden
                />

                <span
                  className={cn(
                    "pointer-events-none absolute inset-0 -z-10 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    "bg-[radial-gradient(90%_70%_at_20%_0%,color-mix(in_oklab,var(--color-brand)_45%,transparent),transparent_72%)]",
                    isActive ? "opacity-100" : "opacity-0",
                  )}
                  aria-hidden
                />

                <div className="flex items-start justify-between gap-3">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      isActive
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 -translate-y-2 scale-90 pointer-events-none",
                    )}
                  >
                    {reason.pill}
                  </span>
                  <span
                    className={cn(
                      "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/20 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] backdrop-blur-md",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-brand scale-110"
                        : "bg-white/10 text-white group-hover:bg-white/20",
                    )}
                  >
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </span>
                </div>

                <h3 className="mt-auto pt-8 text-xl font-bold leading-snug text-white sm:text-2xl lg:text-[1.75rem]">
                  {reason.title}
                </h3>

                <div
                  className={cn(
                    "grid transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isActive
                      ? "mt-3 grid-rows-[1fr] opacity-100"
                      : "mt-0 grid-rows-[0fr] opacity-0 pointer-events-none",
                  )}
                >
                  <p className="overflow-hidden text-base leading-relaxed text-white/90">
                    {reason.copy}
                  </p>
                </div>

                <span
                  className={cn(
                    "mt-5 block h-1 rounded-full bg-gradient-to-r from-brand via-brand to-transparent transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isActive ? "w-full opacity-100" : "w-10 opacity-30",
                  )}
                  aria-hidden
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Services --------------------------------- */

const SERVICES_BENTO = [
  {
    id: "perm",
    slug: "executive-search",
    tag: "Permanent Placement & Executive Search",
    metric: "98.4% Retention Rate",
    title: "Permanent & Executive Search",
    copy: "Full-time professionals and executive leadership across technology, engineering, corporate functions, and specialized operations.",
    features: ["Executive Search", "Full-Time Hiring", "Guaranteed Retention", "Skilled Trades"],
    ctaText: "Explore Permanent Placement →",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=900&fit=crop&auto=format",
    gridClass: "lg:col-span-2 min-h-[24rem] lg:min-h-[28rem]",
  },
  {
    id: "contract",
    slug: "contract-staffing",
    tag: "Flexible Staffing",
    metric: "12hr Deployment",
    title: "Contract & Temporary Staffing",
    copy: "Short- or long-term talent that flexes with project demand, fully compliant and payrolled.",
    features: ["Project Staffing", "Turnkey Payroll", "Skill Augmentation", "Flex Capacity"],
    ctaText: "Explore Contract Staffing →",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&auto=format",
    gridClass: "lg:col-span-1 min-h-[24rem] lg:min-h-[28rem]",
  },
  {
    id: "startup",
    slug: "startup-hiring",
    tag: "Startup Scaling & Early Team",
    metric: "0-50 Team Scale",
    title: "Startup Hiring",
    copy: "Specialized recruitment solutions for startups and growing companies, connecting organizations with innovative talent ready to scale.",
    features: [
      "Founding-Team Hiring",
      "Early-Stage Recruitment",
      "Employer Branding",
      "0–50 Scaleup Pods",
    ],
    ctaText: "Explore Startup Hiring →",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=900&fit=crop&auto=format",
    gridClass: "lg:col-span-2 min-h-[24rem] lg:min-h-[28rem]",
  },
  {
    id: "consulting",
    slug: "talent-consulting",
    tag: "Strategic Advisory",
    metric: "Pipeline Architecture",
    title: "Talent Consulting & Advisory",
    copy: "Strategic talent consulting services to help organizations optimize hiring processes, build talent pipelines, and develop effective recruitment strategies.",
    features: [
      "Talent Strategy",
      "Workforce Planning",
      "Pipeline Architecture",
      "Process Optimization",
    ],
    ctaText: "Explore Talent Consulting →",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1000&h=600&fit=crop&auto=format",
    gridClass: "lg:col-span-1 min-h-[24rem] lg:min-h-[28rem]",
  },
  {
    id: "advisory",
    slug: "hr-advisory",
    tag: "Fractional Leadership",
    metric: "C-Level HR Pods",
    title: "Fractional HR & HR Advisory",
    copy: "Interim HR leadership for workforce planning, compliance frameworks, and employee engagement.",
    features: ["Compliance Audits", "Org Planning", "Policy Design", "Labour Standards"],
    ctaText: "Explore HR Advisory →",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop&auto=format",
    gridClass: "lg:col-span-1 min-h-[24rem] lg:min-h-[28rem]",
  },
  {
    id: "sow",
    slug: "sow-project-pods",
    tag: "Outcome-Based Pods",
    metric: "100% SLA Guarantee",
    title: "Statement of Work & Project Delivery",
    copy: "Specialized pods deployed against defined deliverables — outcomes, not headcount commitments.",
    features: ["Outcome SLAs", "Agile Pods", "Fixed Budget", "Project Deliverables"],
    ctaText: "Explore SOW Pods →",
    image:
      "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?w=1000&h=600&fit=crop&auto=format",
    gridClass: "lg:col-span-2 min-h-[24rem] lg:min-h-[28rem]",
  },
];

export function Services() {
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <section
      id="services"
      className="relative isolate overflow-hidden bg-porcelain section-padding border-b border-border scroll-mt-20 sm:scroll-mt-24"
    >
      {/* Background Watermark Marquee */}
      <div
        className="pointer-events-none absolute top-12 left-0 right-0 -z-10 overflow-hidden opacity-[0.06] select-none"
        aria-hidden
      >
        <div className="flex w-max marquee-lane gap-8 font-display text-[7rem] lg:text-[10rem] font-black uppercase tracking-tighter text-slate-900">
          <span>
            Solutions // Permanent Staffing // Startup Hiring // Talent Consulting // SOW Pods // HR Advisory //
          </span>
          <span>
            Solutions // Permanent Staffing // Startup Hiring // Talent Consulting // SOW Pods // HR Advisory //
          </span>
        </div>
      </div>

      {/* Light background mesh, ambient glows & grid textures */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 mesh-light opacity-90"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 dot-grid-light opacity-50"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 top-1/4 -z-10 h-96 w-96 rounded-full bg-brand/15 blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-1/4 -z-10 h-96 w-96 rounded-full bg-brand/15 blur-[120px]"
        aria-hidden
      />

      <div className="shell relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            title="Comprehensive Talent & Workforce Solutions"
            copy="End-to-end recruitment capabilities, agile staffing models, startup team scaling, and strategic talent consulting tailored for high-growth enterprises and industry leaders."
          />
          <div className="flex items-center gap-3 shrink-0 self-start lg:self-end">
            <CtaLink href="https://www.venushiring.ca/contact" variant="outline" size="lg">
              Talk to a consultant
            </CtaLink>
          </div>
        </div>

        {/* Outer Panel Wrapper */}
        <div className="mt-10 rounded-[3rem] border border-slate-200/80 bg-slate-100/60 p-3 sm:p-5 lg:p-6 shadow-inner backdrop-blur-md">
          {/* Bento Grid */}
          <div ref={ref} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES_BENTO.map((item, i) => (
              <a
                key={item.id}
                href={`/services/${item.slug}`}
                className={cn(
                  "group relative isolate flex flex-col justify-between overflow-hidden rounded-[2.25rem] p-8 sm:p-10",
                  "border border-border/80 bg-background/90 backdrop-blur-xl shadow-[0_20px_50px_-20px_rgba(15,23,42,0.15)]",
                  "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_25px_60px_-25px_rgba(224,30,55,0.25)]",
                  "reveal-item",
                  shown && "is-shown",
                  item.gridClass,
                )}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Card background image with zoom effect */}
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover brightness-[0.4] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:brightness-[0.48]"
                />
                {/* Gradient scrim */}
                <span
                  className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/85 to-ink/30"
                  aria-hidden
                />

                {/* Hover red radial glow */}
                <span
                  className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(80%_80%_at_50%_0%,color-mix(in_oklab,var(--color-brand)_35%,transparent),transparent_75%)]"
                  aria-hidden
                />

                {/* Top badges bar */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md">
                    {item.tag}
                  </span>
                </div>

                {/* Card Bottom content */}
                <div className="mt-10 flex flex-col justify-end">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-[1.85rem]">
                      {item.title}
                    </h3>
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all duration-300 group-hover:rotate-45 group-hover:bg-brand group-hover:border-brand group-hover:text-white backdrop-blur-md">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>

                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/85">
                    {item.copy}
                  </p>

                  {/* Feature pills */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.features.map((feat) => (
                      <span
                        key={feat}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm transition-colors group-hover:border-white/30 group-hover:bg-white/20"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-brand" />
                        {feat}
                      </span>
                    ))}
                  </div>

                  {/* Explicit CTA Link */}
                  <div className="mt-6 pt-4 border-t border-white/15">
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-white group-hover:text-brand transition-colors">
                      {item.ctaText}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Industries & Roles -------------------------------- */

const INDUSTRIES = [
  {
    id: "01",
    slug: "technology",
    category: "TECHNOLOGY",
    title: "Engineering & IT",
    copy: "Building intelligent, secure, and scalable solutions for a connected future.",
    roles: [
      "Software Engineers",
      "Data Engineers",
      "DevOps Specialists",
      "Product Leaders",
    ],
    ctaText: "Explore Technology Roles",
    icon: Cpu,
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: "02",
    slug: "automotive-ev",
    category: "AUTOMOTIVE & EV",
    title: "Automotive & EV",
    copy: "Driving the future of mobility with innovation, quality, and sustainability.",
    roles: [
      "EV Battery Engineers",
      "Automotive Plant Managers",
      "Quality & Controls Engineers",
      "Autonomous Vehicle Engineers",
    ],
    ctaText: "Explore Automotive Roles",
    icon: Car,
    image:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: "03",
    slug: "aerospace",
    category: "AEROSPACE",
    title: "Aerospace",
    copy: "Certified aerospace professionals delivering precision, safety, and performance.",
    roles: [
      "Aerospace Systems Engineers",
      "Avionics Specialists",
      "Flight Test Engineers",
      "Quality & Compliance Leads",
    ],
    ctaText: "Explore Aerospace Roles",
    icon: Plane,
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: "04",
    slug: "automotive-ev",
    category: "AUTOTECH",
    title: "AutoTech",
    copy: "Bridging software innovation with automotive hardware to build smarter vehicles.",
    roles: [
      "Automotive Software Engineers",
      "Embedded Systems Engineers",
      "ADAS Engineers",
      "Connected Vehicle Architects",
    ],
    ctaText: "Explore AutoTech Roles",
    icon: Zap,
    image:
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: "05",
    slug: "technology",
    category: "CUSTOMER SUPPORT",
    title: "Customer Service & Tech Support",
    copy: "Delivering outstanding support experiences that build trust and loyalty.",
    roles: [
      "Technical Support Leads",
      "Tier 1-3 Support Specialists",
      "Customer Success Directors",
      "CX Managers",
    ],
    ctaText: "Explore Support Roles",
    icon: Headphones,
    image:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: "06",
    slug: "finance-corporate",
    category: "FINANCE & CORPORATE",
    title: "Finance & Accounting",
    copy: "Connecting top financial controllers, CPAs, FP&A leaders, and finance managers.",
    roles: [
      "Financial Controller",
      "Senior Accountant",
      "FP&A Specialist",
      "CFO / Finance Director",
    ],
    ctaText: "Explore Finance Roles",
    icon: Building2,
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: "07",
    slug: "finance-corporate",
    category: "EXECUTIVE SEARCH",
    title: "C-Suite & Executive",
    copy: "Retained executive search for visionary CEOs, CTOs, CFOs, VPs, and Board Directors.",
    roles: [
      "CEO / President",
      "Chief Technology Officer",
      "Chief Financial Officer",
      "VP Operations & Eng.",
    ],
    ctaText: "Explore Executive Roles",
    icon: Crown,
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: "08",
    slug: "healthcare",
    category: "HEALTHCARE & CLINICAL",
    title: "Clinical Research",
    copy: "Pharma, biotech, and clinical trial managers ensuring regulatory compliance and trial excellence.",
    roles: [
      "Clinical Research Associates",
      "Clinical Trial Managers",
      "Regulatory Affairs Specialists",
      "Biostatisticians",
    ],
    ctaText: "Explore Healthcare Roles",
    icon: Stethoscope,
    image:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: "09",
    slug: "manufacturing-supply-chain",
    category: "SUPPLY CHAIN & E-COM",
    title: "E-Commerce & Supply Chain",
    copy: "End-to-end logistics, procurement, warehouse management, and fulfillment operational leaders.",
    roles: [
      "Supply Chain Directors",
      "Logistics Managers",
      "Warehouse Operations Leads",
      "Fulfillment Specialists",
    ],
    ctaText: "Explore Supply Chain Roles",
    icon: ShoppingBag,
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: "10",
    slug: "manufacturing-supply-chain",
    category: "MANUFACTURING & TRADES",
    title: "Manufacturing & Trades",
    copy: "Skilled trades professionals, millwrights, CNC programmers, and industrial plant operations leaders.",
    roles: [
      "Manufacturing Engineers",
      "CNC Programmers",
      "Industrial Millwrights",
      "Plant Production Managers",
    ],
    ctaText: "Explore Manufacturing Roles",
    icon: Factory,
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=500&fit=crop&auto=format",
  },
];

const BOTTOM_HIGHLIGHTS = [
  {
    icon: Users,
    title: "Diverse Industries",
    description: "Experts across high-growth sectors",
  },
  {
    icon: ShieldCheck,
    title: "Vetted & Verified",
    description: "Top 1% certified professionals",
  },
  {
    icon: TrendingUp,
    title: "Future-Ready Talent",
    description: "Built for today. Ready for tomorrow.",
  },
  {
    icon: Globe,
    title: "North America Focus",
    description: "Strong presence in Canada & beyond",
  },
];

export function Industries() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [activePageIndex, setActivePageIndex] = useState(0);

  const updateActivePage = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      setActivePageIndex(0);
      return;
    }
    const ratio = scrollLeft / maxScroll;
    if (ratio < 0.3) {
      setActivePageIndex(0);
    } else if (ratio < 0.7) {
      setActivePageIndex(1);
    } else {
      setActivePageIndex(2);
    }
  };

  const handleScroll = () => {
    updateActivePage();
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.clientX - containerRef.current.offsetLeft);
    setScrollLeftState(containerRef.current.scrollLeft);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.clientX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    containerRef.current.scrollLeft = scrollLeftState - walk;
    updateActivePage();
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const scrollNav = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const scrollAmount = Math.max(containerRef.current.clientWidth * 0.75, 340);
    const current = containerRef.current.scrollLeft;
    const target = direction === "left" ? current - scrollAmount : current + scrollAmount;

    containerRef.current.scrollTo({
      left: target,
      behavior: "smooth",
    });
  };

  const goToPage = (pageIdx: number) => {
    if (!containerRef.current) return;
    const { scrollWidth, clientWidth } = containerRef.current;
    const maxScroll = scrollWidth - clientWidth;
    const target = (pageIdx / 2) * maxScroll;
    containerRef.current.scrollTo({
      left: target,
      behavior: "smooth",
    });
    setActivePageIndex(pageIdx);
  };

  return (
    <section
      id="industries"
      className="relative isolate overflow-hidden bg-white py-16 sm:py-20 lg:py-24 border-b border-slate-200/80 scroll-mt-20 sm:scroll-mt-24"
      aria-label="Industries and Roles We Hire For"
    >
      {/* Subtle Dot-Matrix World Map Background on Top Right */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-[480px] w-full max-w-2xl opacity-35 select-none overflow-hidden"
        aria-hidden
      >
        <svg
          viewBox="0 0 700 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full object-contain object-right-top text-slate-300"
        >
          <g fill="currentColor">
            {/* North America Dotted Cluster */}
            <circle cx="120" cy="90" r="2.5" />
            <circle cx="140" cy="85" r="2.5" />
            <circle cx="160" cy="80" r="2.5" />
            <circle cx="180" cy="75" r="2.5" />
            <circle cx="130" cy="110" r="2.5" />
            <circle cx="150" cy="105" r="2.5" />
            <circle cx="170" cy="100" r="2.5" />
            <circle cx="190" cy="95" r="2.5" />
            <circle cx="210" cy="90" r="2.5" />
            <circle cx="120" cy="130" r="2.5" />
            <circle cx="140" cy="125" r="2.5" />
            <circle cx="160" cy="120" r="2.5" />
            <circle cx="180" cy="115" r="2.5" />
            <circle cx="200" cy="110" r="2.5" />
            <circle cx="220" cy="105" r="2.5" />
            <circle cx="240" cy="100" r="2.5" />
            <circle cx="140" cy="150" r="2.5" />
            <circle cx="160" cy="145" r="2.5" />
            <circle cx="180" cy="140" r="2.5" />
            <circle cx="200" cy="135" r="2.5" />
            <circle cx="220" cy="130" r="2.5" />
            <circle cx="240" cy="125" r="2.5" />
            <circle cx="160" cy="170" r="2.5" />
            <circle cx="180" cy="165" r="2.5" />
            <circle cx="200" cy="160" r="2.5" />
            <circle cx="220" cy="155" r="2.5" />
            <circle cx="240" cy="150" r="2.5" />
            <circle cx="180" cy="190" r="2.5" />
            <circle cx="200" cy="185" r="2.5" />
            <circle cx="220" cy="180" r="2.5" />
            {/* Europe & Global Dotted Cluster */}
            <circle cx="380" cy="80" r="2.5" />
            <circle cx="400" cy="75" r="2.5" />
            <circle cx="420" cy="70" r="2.5" />
            <circle cx="440" cy="75" r="2.5" />
            <circle cx="390" cy="100" r="2.5" />
            <circle cx="410" cy="95" r="2.5" />
            <circle cx="430" cy="90" r="2.5" />
            <circle cx="450" cy="85" r="2.5" />
            <circle cx="470" cy="90" r="2.5" />
            <circle cx="400" cy="120" r="2.5" />
            <circle cx="420" cy="115" r="2.5" />
            <circle cx="440" cy="110" r="2.5" />
            <circle cx="460" cy="105" r="2.5" />
            <circle cx="480" cy="100" r="2.5" />
            <circle cx="500" cy="95" r="2.5" />
            <circle cx="420" cy="140" r="2.5" />
            <circle cx="440" cy="135" r="2.5" />
            <circle cx="460" cy="130" r="2.5" />
            <circle cx="480" cy="125" r="2.5" />
            <circle cx="500" cy="120" r="2.5" />
            <circle cx="520" cy="115" r="2.5" />
            <circle cx="540" cy="110" r="2.5" />
            <circle cx="460" cy="155" r="2.5" />
            <circle cx="480" cy="150" r="2.5" />
            <circle cx="500" cy="145" r="2.5" />
            <circle cx="520" cy="140" r="2.5" />
            <circle cx="540" cy="135" r="2.5" />
            <circle cx="560" cy="130" r="2.5" />
            <circle cx="500" cy="170" r="2.5" />
            <circle cx="520" cy="165" r="2.5" />
            <circle cx="540" cy="160" r="2.5" />
            <circle cx="560" cy="155" r="2.5" />
            <circle cx="580" cy="150" r="2.5" />
            <circle cx="520" cy="190" r="2.5" />
            <circle cx="540" cy="185" r="2.5" />
            <circle cx="560" cy="180" r="2.5" />
            <circle cx="580" cy="175" r="2.5" />
            <circle cx="600" cy="170" r="2.5" />
          </g>
        </svg>
      </div>

      <div className="shell relative z-10">
        {/* Header Section */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <p className="text-[#dc2626] font-bold text-xs tracking-[0.18em] uppercase mb-2 sm:mb-2.5">
              INDUSTRIES & ROLES
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold text-slate-900 tracking-tight leading-[1.12]">
              Industries & Roles <br />
              <span className="text-[#dc2626]">We Hire For</span>
            </h2>
            <p className="mt-3.5 text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-xl">
              Explore the specialized technical, executive, and operational positions we recruit across Canada and North America.
            </p>
          </div>

          {/* Controls & Pagination Bars */}
          <div className="flex flex-col items-start sm:items-end gap-3 shrink-0">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => scrollNav("left")}
                aria-label="Scroll left"
                className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-xs transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollNav("right")}
                aria-label="Scroll right"
                className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-xs transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 active:scale-95 cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Pagination Dash Indicators */}
            <div className="flex items-center gap-1.5 pt-1">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goToPage(idx)}
                  aria-label={`Go to slide page ${idx + 1}`}
                  className={cn(
                    "h-1 rounded-full transition-all duration-300 cursor-pointer",
                    activePageIndex === idx
                      ? "w-7 bg-[#dc2626]"
                      : "w-7 bg-slate-200 hover:bg-slate-300"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className={cn(
            "no-scrollbar flex gap-4 sm:gap-5 overflow-x-auto select-none py-2 pb-4 touch-pan-y scroll-smooth",
            isDragging ? "cursor-grabbing" : "cursor-grab"
          )}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {INDUSTRIES.map((ind) => {
            const { icon: IndIcon } = ind;
            return (
              <div
                key={ind.id}
                className="group relative flex w-[280px] sm:w-[305px] md:w-[315px] shrink-0 flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
              >
                {/* Image Header with Number Badge */}
                <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={ind.image}
                    alt={ind.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span className="absolute top-3 right-3 rounded-full bg-slate-900/80 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-mono font-bold text-white/95 shadow-xs">
                    {ind.id}
                  </span>
                </div>

                {/* Overlapping Floating Circle Icon Badge */}
                <div className="-mt-5 ml-4 relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-rose-100 bg-white text-[#dc2626] shadow-sm">
                  <IndIcon className="h-4 w-4" />
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col px-5 pt-2.5 pb-5 space-y-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      {ind.category}
                    </p>
                    <h3 className="font-serif text-lg font-bold text-slate-900 transition-colors duration-200 group-hover:text-[#dc2626] leading-snug">
                      {ind.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {ind.copy}
                  </p>

                  {/* Roles We Hire For */}
                  <div className="pt-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#dc2626] mb-2">
                      ROLES WE HIRE FOR:
                    </p>
                    <div className="flex flex-wrap gap-1.5 min-h-[58px]">
                      {ind.roles.map((role) => (
                        <span
                          key={role}
                          className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700 transition-colors group-hover:bg-slate-200/70"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Link */}
                  <div className="pt-3.5 mt-auto border-t border-slate-100">
                    <a
                      href={ind.slug ? `/industries/${ind.slug}` : "/industries"}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 transition-colors group-hover:text-[#dc2626]"
                    >
                      <span>{ind.ctaText}</span>
                      <span className="text-[#dc2626] font-bold text-sm transition-transform duration-200 group-hover:translate-x-1">
                        →
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Feature Strip (Diverse Industries, Vetted & Verified, Future-Ready, North America Focus) */}
        <div className="mt-10 sm:mt-12 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-0 lg:divide-x lg:divide-slate-100">
          {BOTTOM_HIGHLIGHTS.map((item) => {
            const { icon: FeatureIcon } = item;
            return (
              <div
                key={item.title}
                className="flex items-center gap-3.5 lg:px-5 first:pl-0 last:pr-0"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-rose-100 bg-rose-50 text-[#dc2626]">
                  <FeatureIcon className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-normal mt-0.5 leading-snug">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Process ---------------------------------- */

const PROCESS_STEPS = [
  {
    n: "01",
    tag: "Discovery",
    title: "Deep Role & Culture Discovery",
    copy: "We map position requirements, compensation, team culture, and non-negotiables in one focused calibration session.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=1200&fit=crop&auto=format",
    topNumber: true,
  },
  {
    n: "02",
    tag: "Sourcing",
    title: "Targeted Precision Sourcing",
    copy: "Agile outreach across top-tier Canadian and international talent pools to present candidates within 5 days.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&h=1200&fit=crop&auto=format",
    topNumber: false,
  },
  {
    n: "03",
    tag: "Assessment",
    title: "Rigorous Skills Verification",
    copy: "Structured interviews, technical evaluations, and deep reference checks before any profile reaches your desk.",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=900&h=1200&fit=crop&auto=format",
    topNumber: true,
  },
  {
    n: "04",
    tag: "Shortlist",
    title: "Calibrated Shortlist Delivery",
    copy: "Three to five interview-ready candidates with written rationale, skill assessments, and salary expectations.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&h=1200&fit=crop&auto=format",
    topNumber: false,
  },
  {
    n: "05",
    tag: "Offer & Onboard",
    title: "Offer & Retention Onboarding",
    copy: "We manage offer negotiation, compliance, and guaranteed 90-day retention check-ins for complete peace of mind.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&h=1200&fit=crop&auto=format",
    topNumber: true,
  },
];

export function Process() {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const [activeStep, setActiveStep] = useState<number | null>(0);

  return (
    <section
      id="process"
      className="relative overflow-hidden border-b border-border bg-porcelain section-padding"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 mesh-light opacity-80"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 dot-grid-light opacity-[0.25]"
        aria-hidden
      />

      <div className="shell relative">
        <SectionHeading
          title="A hiring process built for speed and precision"
          copy="Five transparent stages, defined timelines, and dedicated recruitment experts committed to your success."
        />

        <div ref={ref} className="mt-14 flex flex-col gap-4 lg:flex-row lg:h-[580px] lg:gap-5">
          {PROCESS_STEPS.map((s, i) => {
            const isActive = activeStep === i;
            return (
              <div
                key={s.n}
                onMouseEnter={() => setActiveStep(i)}
                onFocus={() => setActiveStep(i)}
                onClick={() => setActiveStep(i)}
                onTouchStart={() => setActiveStep(i)}
                className={cn(
                  "group relative isolate flex flex-col justify-between overflow-hidden rounded-[2.25rem] p-7 sm:p-9",
                  "cursor-pointer transform-gpu process-accordion-item",
                  "shadow-[0_15px_45px_-20px_rgba(15,23,42,0.25)] hover:shadow-[0_30px_70px_-20px_rgba(224,30,55,0.35)]",
                  "min-h-[420px] lg:min-h-0 lg:h-full",
                  isActive ? "is-active border-brand/60" : "border-transparent",
                  "reveal-item",
                  shown && "is-shown",
                )}
              >
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  width={900}
                  height={1200}
                  className={cn(
                    "pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isActive ? "scale-105" : "scale-100 group-hover:scale-105",
                  )}
                />

                {/* Dark overlay for inactive cards */}
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-ink/95 via-ink/65 to-ink/20 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isActive ? "opacity-0" : "opacity-100",
                  )}
                  aria-hidden
                />

                {/* Brand red overlay for active card */}
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-brand/95 via-brand/80 to-black/30 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isActive ? "opacity-100" : "opacity-0",
                  )}
                  aria-hidden
                />

                {/* Top badge and step number */}
                <div className="absolute top-6 left-6 right-6 sm:top-8 sm:left-8 sm:right-8 z-30 flex items-center justify-between pointer-events-none">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border px-3 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] transition-all duration-500 ease-out backdrop-blur-md shadow-sm truncate max-w-[calc(100%-48px)]",
                      isActive
                        ? "border-white bg-white text-brand"
                        : "border-white/30 bg-black/50 text-white group-hover:border-white group-hover:bg-white group-hover:text-brand",
                    )}
                  >
                    {s.tag}
                  </span>
                  <span
                    className={cn(
                      "font-mono text-2xl sm:text-3xl font-black tracking-tight transition-all duration-500 ease-out shrink-0 ml-2 drop-shadow-md",
                      isActive ? "text-white opacity-100" : "text-white/80 opacity-90 group-hover:opacity-100",
                    )}
                  >
                    {s.n}
                  </span>
                </div>

                {/* Bottom-right action circle */}
                <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-30 pointer-events-none">
                  <span
                    className={cn(
                      "inline-flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full transition-all duration-500 ease-out backdrop-blur-md shadow-lg",
                      isActive
                        ? "bg-white text-brand scale-110"
                        : "bg-white/25 text-white group-hover:bg-white group-hover:text-brand group-hover:scale-110",
                    )}
                  >
                    <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>

                {/* Collapsed State: Static Vertical Title for Desktop (No rotation, smooth fade) */}
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 hidden lg:flex items-center justify-center z-10 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isActive ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100 delay-100",
                  )}
                  aria-hidden={isActive}
                >
                  <span className="[writing-mode:vertical-rl] rotate-180 text-2xl font-bold tracking-wide text-white drop-shadow-sm whitespace-nowrap select-none">
                    {s.title}
                  </span>
                </div>

                {/* Expanded State: Clean Horizontal Content (Smooth slide and CSS grid reveal) */}
                <div
                  className={cn(
                    "relative z-10 flex h-full flex-col justify-end pt-14 pb-8 sm:pt-16 sm:pb-10 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isActive
                      ? "opacity-100 translate-y-0 delay-75"
                      : "max-lg:opacity-100 lg:opacity-0 lg:pointer-events-none lg:translate-y-3",
                  )}
                >
                  <div>
                    <h3 className="font-bold leading-tight text-white text-2xl sm:text-3xl drop-shadow-sm">
                      {s.title}
                    </h3>

                    <div
                      className={cn(
                        "grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        isActive
                          ? "grid-rows-[1fr] opacity-100 mt-3"
                          : "max-lg:grid-rows-[1fr] max-lg:opacity-100 max-lg:mt-3 lg:grid-rows-[0fr] lg:opacity-0 lg:mt-0 pointer-events-none",
                      )}
                    >
                      <div className="overflow-hidden pr-12">
                        <p className="text-sm sm:text-[15px] leading-relaxed text-white/95 mb-4">
                          {s.copy}
                        </p>
                        <div className="pt-3 border-t border-white/30">
                          <span className="text-xs font-bold uppercase tracking-wider text-white">
                            Phase {s.n}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------- Stats ----------------------------------- */

const METRICS = [
  {
    value: 12,
    suffix: "+",
    label: "Years of expertise",
    sub: "Decades of refined recruitment strategy",
  },
  {
    value: 4800,
    suffix: "+",
    label: "Successful placements",
    sub: "Connecting talent with opportunity",
  },
  {
    value: 98,
    suffix: "%",
    label: "Client satisfaction",
    sub: "Consistently exceeding expectations",
  },
  { value: 14, suffix: " days", label: "Average time to hire", sub: "From brief to signed offer" },
];

function useCountUp(target: number, run: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return;
    let frame = 0;
    const total = 60;
    const id = setInterval(() => {
      frame += 1;
      const p = 1 - Math.pow(1 - frame / total, 3);
      setValue(Math.round(target * p));
      if (frame >= total) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [target, run]);
  return value;
}

function Metric({
  metric,
  run,
  index,
}: {
  metric: (typeof METRICS)[number];
  run: boolean;
  index: number;
}) {
  const v = useCountUp(metric.value, run);
  return (
    <div
      className={cn(
        "group relative isolate overflow-hidden rounded-[1.75rem] glass-panel p-8",
        "shadow-[0_1px_2px_rgba(15,23,42,0.04),0_30px_70px_-40px_rgba(15,23,42,0.5)]",
        "transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:-translate-y-2 hover:ring-brand-soft",
        "reveal-item",
        run && "is-shown",
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <span
        className="pointer-events-none absolute inset-x-0 -top-16 -z-10 h-40 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(50%_100%_at_50%_100%,var(--color-brand-soft),transparent_70%)]"
        aria-hidden
      />
      <p className="font-display text-5xl font-semibold tracking-[-0.04em] lg:text-6xl">
        {v.toLocaleString("en-CA")}
        <span className="text-brand">{metric.suffix}</span>
      </p>
      <p className="mt-5 text-base font-semibold">{metric.label}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{metric.sub}</p>
      <span
        className="mt-6 block h-px w-12 bg-brand/70 transition-all duration-500 ease-out group-hover:w-full"
        aria-hidden
      />
    </div>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setRun(true)),
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section-curve relative -mt-8 overflow-hidden border-b border-border bg-porcelain section-padding">
      <div
        className="pointer-events-none absolute inset-0 -z-10 mesh-light opacity-80"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 dot-grid-light opacity-[0.28]"
        aria-hidden
      />
      <div className="shell relative" ref={ref}>
        <SectionHeading
          title="Our proven track record speaks volumes"
          copy="We deliver measurable results through strategic talent solutions across Canadian and North American industries."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((m, i) => (
            <Metric key={m.label} metric={m} run={run} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export { BlogCarousel } from "./BlogCarousel";
export { PortfolioShowcase } from "./PortfolioShowcase";
