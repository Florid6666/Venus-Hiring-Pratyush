import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";
import type { ResumeData } from "./resume-types";

interface ResumePreviewProps {
  data: ResumeData;
}

export function ResumePreview({ data }: ResumePreviewProps) {
  const isExecutive = data.template === "executive";

  return (
    <div
      className={`w-full min-h-[842px] rounded-2xl border border-border/80 bg-white p-8 sm:p-10 shadow-lift text-slate-900 transition-all ${
        isExecutive ? "font-serif" : "font-sans"
      }`}
    >
      {/* HEADER SECTION */}
      <header
        className={`pb-6 border-b ${
          isExecutive ? "border-slate-800 text-center" : "border-brand/40 text-left border-l-4 border-l-brand pl-4"
        }`}
      >
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          {data.fullName || "Your Full Name"}
        </h1>

        <div
          className={`mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600 ${
            isExecutive ? "justify-center" : "justify-start"
          }`}
        >
          {data.email && (
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3 text-brand" /> {data.email}
            </span>
          )}
          {data.phone && (
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3 text-brand" /> {data.phone}
            </span>
          )}
          {data.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-brand" /> {data.location}
            </span>
          )}
          {data.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="h-3 w-3 text-brand" /> {data.linkedin}
            </span>
          )}
          {data.portfolio && (
            <span className="flex items-center gap-1">
              <Globe className="h-3 w-3 text-brand" /> {data.portfolio}
            </span>
          )}
        </div>
      </header>

      {/* MAIN CV BODY */}
      <div className="mt-6 space-y-6">
        {/* SUMMARY */}
        {data.summary && (
          <section>
            <h2
              className={`text-xs font-bold uppercase tracking-[0.16em] mb-2 pb-1 ${
                isExecutive ? "text-slate-950 border-b border-slate-300" : "text-brand font-sans"
              }`}
            >
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-700 font-sans">
              {data.summary}
            </p>
          </section>
        )}

        {/* EXPERIENCE */}
        {data.experience && data.experience.length > 0 && (
          <section>
            <h2
              className={`text-xs font-bold uppercase tracking-[0.16em] mb-3 pb-1 ${
                isExecutive ? "text-slate-950 border-b border-slate-300" : "text-brand font-sans"
              }`}
            >
              WORK EXPERIENCE
            </h2>
            <div className="space-y-4 font-sans">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <h3 className="text-sm font-bold text-slate-950">
                      {exp.jobTitle}{" "}
                      <span className="font-normal text-slate-600">at {exp.company}</span>
                    </h3>
                    <span className="text-[11px] font-semibold text-slate-500">{exp.duration}</span>
                  </div>
                  {exp.description && (
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-700">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EDUCATION */}
        {data.education && data.education.length > 0 && (
          <section>
            <h2
              className={`text-xs font-bold uppercase tracking-[0.16em] mb-3 pb-1 ${
                isExecutive ? "text-slate-950 border-b border-slate-300" : "text-brand font-sans"
              }`}
            >
              EDUCATION
            </h2>
            <div className="space-y-3 font-sans">
              {data.education.map((edu) => (
                <div key={edu.id} className="flex flex-wrap items-baseline justify-between gap-1">
                  <div>
                    <h3 className="text-sm font-bold text-slate-950">{edu.degree} in {edu.fieldOfStudy}</h3>
                    <p className="text-xs text-slate-600">{edu.institution}</p>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {edu.startYear} - {edu.endYear}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SKILLS */}
        {data.skills && data.skills.length > 0 && (
          <section>
            <h2
              className={`text-xs font-bold uppercase tracking-[0.16em] mb-2 pb-1 ${
                isExecutive ? "text-slate-950 border-b border-slate-300" : "text-brand font-sans"
              }`}
            >
              SKILLS & EXPERTISE
            </h2>
            <div className="flex flex-wrap gap-1.5 pt-1 font-sans">
              {data.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className={`text-xs ${
                    isExecutive
                      ? "rounded bg-slate-100 px-2.5 py-0.5 font-medium text-slate-800"
                      : "rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand"
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* PROJECTS */}
        {data.projects && data.projects.length > 0 && (
          <section>
            <h2
              className={`text-xs font-bold uppercase tracking-[0.16em] mb-3 pb-1 ${
                isExecutive ? "text-slate-950 border-b border-slate-300" : "text-brand font-sans"
              }`}
            >
              PROJECTS
            </h2>
            <div className="space-y-3 font-sans">
              {data.projects.map((proj) => (
                <div key={proj.id}>
                  <h3 className="text-sm font-bold text-slate-950">{proj.name}</h3>
                  <p className="text-xs text-slate-700 mt-0.5">{proj.description}</p>
                  {proj.technologies && (
                    <p className="text-[11px] text-slate-500 mt-1 font-medium">
                      Tech: {proj.technologies}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CERTIFICATIONS */}
        {data.certifications && data.certifications.length > 0 && (
          <section>
            <h2
              className={`text-xs font-bold uppercase tracking-[0.16em] mb-3 pb-1 ${
                isExecutive ? "text-slate-950 border-b border-slate-300" : "text-brand font-sans"
              }`}
            >
              CERTIFICATIONS
            </h2>
            <div className="space-y-2 font-sans text-xs">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-900">
                    {cert.name} <span className="font-normal text-slate-600">({cert.organization})</span>
                  </span>
                  <span className="text-slate-500 font-semibold">{cert.year}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* LANGUAGES */}
        {data.languages && data.languages.length > 0 && (
          <section>
            <h2
              className={`text-xs font-bold uppercase tracking-[0.16em] mb-2 pb-1 ${
                isExecutive ? "text-slate-950 border-b border-slate-300" : "text-brand font-sans"
              }`}
            >
              LANGUAGES
            </h2>
            <p className="text-xs text-slate-700 font-sans">
              {data.languages.join(" · ")}
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
