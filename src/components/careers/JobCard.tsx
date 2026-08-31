import { MapPin, Briefcase, GraduationCap, ArrowRight } from "lucide-react";
import type { JobItem } from "./mockJobs";

interface JobCardProps {
  job: JobItem;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 sm:p-8 transition-all duration-300 hover:border-brand/40 hover:shadow-lift">
      <div>
        {/* Department Tag & Date */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center rounded-md bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
            {job.department}
          </span>
          <span className="text-xs text-muted-foreground">{job.postedDate}</span>
        </div>

        {/* Job Title */}
        <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-foreground group-hover:text-brand transition-colors sm:text-22">
          {job.title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-2 sm:text-base">
          {job.description}
        </p>

        {/* Badges / Metadata */}
        <div className="mt-6 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-muted-foreground sm:text-sm">
          <div className="flex items-center gap-1.5 font-medium text-foreground/80">
            <MapPin className="h-4 w-4 text-brand" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium text-foreground/80">
            <Briefcase className="h-4 w-4 text-brand" />
            <span>{job.employmentType}</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium text-foreground/80">
            <GraduationCap className="h-4 w-4 text-brand" />
            <span>{job.experienceLevel}</span>
          </div>
        </div>
      </div>

      {/* Card Footer CTA */}
      <div className="mt-8 flex items-center justify-between border-t border-border/60 pt-5">
        {job.salaryRange ? (
          <span className="text-xs font-semibold text-foreground/90 sm:text-sm">
            {job.salaryRange}
          </span>
        ) : <span />}

        <a
          href={`/careers/${job.slug}`}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold text-foreground transition-all duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white"
        >
          View Position
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
}
