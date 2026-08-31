import { Link } from "@tanstack/react-router";
import { MapPin, Briefcase, GraduationCap, DollarSign, Calendar, ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Clock } from "lucide-react";
import heroOfficeImg from "@/assets/hero-office.jpg";
import type { JobItem } from "./mockJobs";

interface JobDetailsProps {
  job: JobItem | undefined;
}

export function JobDetails({ job }: JobDetailsProps) {
  // Gracefully handle position not found
  if (!job) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center py-20 px-4">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10 text-brand mb-6 border border-brand/20">
          <Briefcase className="h-8 w-8" />
        </div>
        <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
          Position Not Found
        </h1>
        <p className="mt-3 max-w-md text-base text-muted-foreground">
          The job position you are looking for does not exist or has been closed. Explore our active open positions below.
        </p>
        <a
          href="/careers"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-brand hover:brightness-110 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Careers
        </a>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-background">
      {/* ==================== 1. HERO SECTION ==================== */}
      <section className="relative isolate flex min-h-[100vh] w-full items-center overflow-hidden bg-ink text-left">
        <div className="absolute inset-0 -z-20 h-full w-full">
          <img
            src={heroOfficeImg}
            alt="Venus Hiring corporate environment"
            className="h-full w-full scale-105 object-cover object-center transition-transform duration-1000 ease-out"
          />
        </div>

        {/* Dark Scrim Overlay */}
        <div className="absolute inset-0 -z-10 bg-black/75 backdrop-blur-[1px]" aria-hidden />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-black/40 to-transparent" aria-hidden />

        <div className="shell relative w-full py-28 sm:py-32 lg:py-36">
          <div className="max-w-4xl text-left">
            {/* Back Button */}
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 text-xs font-semibold text-white/70 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Open Positions
            </Link>

            {/* Department Tag */}
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                CAREER OPPORTUNITY
              </span>
              <span className="inline-flex items-center rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
                {job.department}
              </span>
            </div>

            {/* Main Job Title */}
            <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-[5rem]">
              {job.title}
            </h1>

            {/* Subtitle Meta */}
            <p className="mt-6 text-lg font-medium text-white/80 sm:text-xl lg:text-2xl">
              {job.location} &nbsp;·&nbsp; {job.employmentType} &nbsp;·&nbsp; {job.experienceLevel} Level
            </p>
          </div>
        </div>
      </section>

      {/* ==================== 2. MAIN CONTENT & SIDEBAR ==================== */}
      <div className="shell py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Main Job Content (Left 8 cols) */}
          <main className="lg:col-span-8 space-y-12">
            {/* JOB OVERVIEW GRID */}
            <section className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-soft">
              <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-brand mb-6">
                JOB OVERVIEW
              </h2>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-brand" /> Location
                  </span>
                  <span className="text-sm font-semibold text-foreground">{job.location}</span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Briefcase className="h-3.5 w-3.5 text-brand" /> Employment Type
                  </span>
                  <span className="text-sm font-semibold text-foreground">{job.employmentType}</span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <GraduationCap className="h-3.5 w-3.5 text-brand" /> Experience Level
                  </span>
                  <span className="text-sm font-semibold text-foreground">{job.experienceLevel}</span>
                </div>

                {job.salaryRange && (
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <DollarSign className="h-3.5 w-3.5 text-brand" /> Salary Range
                    </span>
                    <span className="text-sm font-semibold text-foreground">{job.salaryRange}</span>
                  </div>
                )}

                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-brand" /> Posted
                  </span>
                  <span className="text-sm font-semibold text-foreground">{job.postedDate}</span>
                </div>
              </div>
            </section>

            {/* ABOUT THE ROLE */}
            {job.aboutRole && (
              <section className="space-y-4">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  ABOUT THE ROLE
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {job.aboutRole}
                </p>
              </section>
            )}

            {/* RESPONSIBILITIES */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <section className="space-y-4 pt-4">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  KEY RESPONSIBILITIES
                </h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                      <CheckCircle2 className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* WHAT YOU'LL BRING */}
            {job.qualifications && job.qualifications.length > 0 && (
              <section className="space-y-4 pt-4">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  WHAT YOU'LL BRING
                </h2>
                <ul className="space-y-3">
                  {job.qualifications.map((qual, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                      <CheckCircle2 className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                      <span>{qual}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* NICE TO HAVE */}
            {job.niceToHave && job.niceToHave.length > 0 && (
              <section className="space-y-4 pt-4">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  NICE TO HAVE
                </h2>
                <ul className="space-y-3">
                  {job.niceToHave.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                      <span className="h-2 w-2 rounded-full bg-brand/60 shrink-0 mt-2.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* WHAT WE OFFER */}
            {job.benefits && job.benefits.length > 0 && (
              <section className="space-y-4 pt-4 border-t border-border/60">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  WHAT WE OFFER
                </h2>
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {job.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3 rounded-xl border border-border/60 bg-porcelain/40 p-4 text-xs sm:text-sm font-medium text-foreground">
                      <CheckCircle2 className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </main>

          {/* Sticky Sidebar (Right 4 cols) */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-soft space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
                  TAKE THE NEXT STEP
                </span>
                <h3 className="mt-2 font-display text-xl font-bold text-foreground sm:text-2xl">
                  READY TO JOIN VENUS?
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Apply for this position and take the next step in your professional career with Venus Hiring.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  to="/careers/$slug/apply"
                  params={{ slug: job.slug }}
                  className="group flex h-13 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-brand transition-all duration-300 hover:brightness-110 active:translate-y-0"
                >
                  APPLY FOR THIS POSITION
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="border-t border-border/60 pt-6 space-y-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-brand" />
                  <span>100% Confidential Candidate Review</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-brand" />
                  <span>Fast 12-Hour Confirmation Response</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
