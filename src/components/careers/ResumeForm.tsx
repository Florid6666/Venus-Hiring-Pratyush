import { useState, type ChangeEvent } from "react";
import { Plus, Trash2, User, Briefcase, GraduationCap, Code, Award, Globe, Layout, AlertCircle } from "lucide-react";
import type { ResumeData, EducationEntry, ExperienceEntry, ProjectEntry, CertificationEntry, ResumeTemplate } from "./resume-types";

interface ResumeFormProps {
  data: ResumeData;
  onChange: (updated: ResumeData) => void;
}

export function ResumeForm({ data, onChange }: ResumeFormProps) {
  const [skillInput, setSkillInput] = useState("");
  const [languageInput, setLanguageInput] = useState("");

  // Helper for Top-Level Fields
  const handleFieldChange = (field: keyof ResumeData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  // Template Switcher
  const handleTemplateChange = (template: ResumeTemplate) => {
    onChange({ ...data, template });
  };

  // Education Handlers
  const handleEducationChange = (id: string, field: keyof EducationEntry, value: string) => {
    const updated = data.education.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    onChange({ ...data, education: updated });
  };

  const addEducation = () => {
    const newEntry: EducationEntry = {
      id: `edu_${Date.now()}`,
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startYear: "",
      endYear: "",
    };
    onChange({ ...data, education: [...data.education, newEntry] });
  };

  const removeEducation = (id: string) => {
    onChange({ ...data, education: data.education.filter((item) => item.id !== id) });
  };

  // Experience Handlers
  const handleExperienceChange = (id: string, field: keyof ExperienceEntry, value: string) => {
    const updated = data.experience.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    onChange({ ...data, experience: updated });
  };

  const addExperience = () => {
    const newEntry: ExperienceEntry = {
      id: `exp_${Date.now()}`,
      company: "",
      jobTitle: "",
      duration: "",
      description: "",
    };
    onChange({ ...data, experience: [...data.experience, newEntry] });
  };

  const removeExperience = (id: string) => {
    onChange({ ...data, experience: data.experience.filter((item) => item.id !== id) });
  };

  // Skills Handlers
  const addSkill = () => {
    if (!skillInput.trim()) return;
    if (!data.skills.includes(skillInput.trim())) {
      onChange({ ...data, skills: [...data.skills, skillInput.trim()] });
    }
    setSkillInput("");
  };

  const removeSkill = (skillToRemove: string) => {
    onChange({ ...data, skills: data.skills.filter((s) => s !== skillToRemove) });
  };

  // Projects Handlers
  const handleProjectChange = (id: string, field: keyof ProjectEntry, value: string) => {
    const updated = data.projects.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    onChange({ ...data, projects: updated });
  };

  const addProject = () => {
    const newEntry: ProjectEntry = {
      id: `proj_${Date.now()}`,
      name: "",
      description: "",
      technologies: "",
    };
    onChange({ ...data, projects: [...data.projects, newEntry] });
  };

  const removeProject = (id: string) => {
    onChange({ ...data, projects: data.projects.filter((item) => item.id !== id) });
  };

  // Certifications Handlers
  const handleCertChange = (id: string, field: keyof CertificationEntry, value: string) => {
    const updated = data.certifications.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    onChange({ ...data, certifications: updated });
  };

  const addCertification = () => {
    const newEntry: CertificationEntry = {
      id: `cert_${Date.now()}`,
      name: "",
      organization: "",
      year: "",
    };
    onChange({ ...data, certifications: [...data.certifications, newEntry] });
  };

  const removeCertification = (id: string) => {
    onChange({ ...data, certifications: data.certifications.filter((item) => item.id !== id) });
  };

  // Languages Handlers
  const addLanguage = () => {
    if (!languageInput.trim()) return;
    if (!data.languages.includes(languageInput.trim())) {
      onChange({ ...data, languages: [...data.languages, languageInput.trim()] });
    }
    setLanguageInput("");
  };

  const removeLanguage = (langToRemove: string) => {
    onChange({ ...data, languages: data.languages.filter((l) => l !== langToRemove) });
  };

  return (
    <div className="space-y-8">
      {/* TEMPLATE SELECTOR */}
      <div className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-soft">
        <div className="flex items-center gap-2 mb-3">
          <Layout className="h-4 w-4 text-brand" />
          <span className="text-xs font-bold uppercase tracking-wider text-foreground">
            SELECT RESUME TEMPLATE
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleTemplateChange("executive")}
            className={`rounded-xl border p-3.5 text-xs font-bold transition-all text-left ${
              data.template === "executive"
                ? "border-brand bg-brand-soft/50 text-brand shadow-soft"
                : "border-border bg-background text-muted-foreground hover:text-foreground"
            }`}
          >
            Executive Clean
          </button>
          <button
            type="button"
            onClick={() => handleTemplateChange("modern")}
            className={`rounded-xl border p-3.5 text-xs font-bold transition-all text-left ${
              data.template === "modern"
                ? "border-brand bg-brand-soft/50 text-brand shadow-soft"
                : "border-border bg-background text-muted-foreground hover:text-foreground"
            }`}
          >
            Modern Professional
          </button>
        </div>
      </div>

      {/* PERSONAL INFORMATION */}
      <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-soft">
        <div className="flex items-center gap-2 pb-4 mb-4 border-b border-border/60">
          <User className="h-4 w-4 text-brand" />
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
            Personal Information
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Full Name <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              value={data.fullName}
              onChange={(e) => handleFieldChange("fullName", e.target.value)}
              placeholder="Full Name"
              className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs font-medium text-foreground focus:border-brand focus:outline-none"
            />
            {!data.fullName.trim() && (
              <span className="text-[11px] text-destructive flex items-center gap-1 mt-1">
                <AlertCircle className="h-3 w-3" /> Full Name is required
              </span>
            )}
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Email Address <span className="text-destructive">*</span>
            </label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => handleFieldChange("email", e.target.value)}
              placeholder="email@example.com"
              className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs font-medium text-foreground focus:border-brand focus:outline-none"
            />
            {!data.email.trim() && (
              <span className="text-[11px] text-destructive flex items-center gap-1 mt-1">
                <AlertCircle className="h-3 w-3" /> Email is required
              </span>
            )}
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Phone Number <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              value={data.phone}
              onChange={(e) => handleFieldChange("phone", e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs font-medium text-foreground focus:border-brand focus:outline-none"
            />
            {!data.phone.trim() && (
              <span className="text-[11px] text-destructive flex items-center gap-1 mt-1">
                <AlertCircle className="h-3 w-3" /> Phone is required
              </span>
            )}
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">Location</label>
            <input
              type="text"
              value={data.location}
              onChange={(e) => handleFieldChange("location", e.target.value)}
              placeholder="City, Province / Country"
              className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs font-medium text-foreground focus:border-brand focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">LinkedIn URL</label>
            <input
              type="text"
              value={data.linkedin}
              onChange={(e) => handleFieldChange("linkedin", e.target.value)}
              placeholder="https://linkedin.com/in/..."
              className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs font-medium text-foreground focus:border-brand focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">Portfolio / Website</label>
            <input
              type="text"
              value={data.portfolio}
              onChange={(e) => handleFieldChange("portfolio", e.target.value)}
              placeholder="https://..."
              className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs font-medium text-foreground focus:border-brand focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* PROFESSIONAL SUMMARY */}
      <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-soft">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">
          Professional Summary
        </h3>
        <textarea
          rows={4}
          value={data.summary}
          onChange={(e) => handleFieldChange("summary", e.target.value)}
          placeholder="Brief summary of your professional background, core achievements, and goals..."
          className="w-full rounded-xl border border-border bg-background p-3 text-xs font-medium text-foreground focus:border-brand focus:outline-none"
        />
      </div>

      {/* EXPERIENCE */}
      <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-soft space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border/60">
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-brand" />
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
              Work Experience
            </h3>
          </div>
          <button
            type="button"
            onClick={addExperience}
            className="inline-flex items-center gap-1 text-xs font-bold text-brand hover:underline"
          >
            <Plus className="h-3.5 w-3.5" /> Add Experience
          </button>
        </div>

        {data.experience.map((exp, idx) => (
          <div key={exp.id} className="rounded-xl border border-border/60 p-4 bg-porcelain/30 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-foreground">Entry #{idx + 1}</span>
              <button
                type="button"
                onClick={() => removeExperience(exp.id)}
                className="text-muted-foreground hover:text-destructive text-xs flex items-center gap-1"
              >
                <Trash2 className="h-3.5 w-3.5" /> Remove
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                type="text"
                value={exp.jobTitle}
                onChange={(e) => handleExperienceChange(exp.id, "jobTitle", e.target.value)}
                placeholder="Job Title"
                className="h-9 rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground"
              />
              <input
                type="text"
                value={exp.company}
                onChange={(e) => handleExperienceChange(exp.id, "company", e.target.value)}
                placeholder="Company Name"
                className="h-9 rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground"
              />
              <input
                type="text"
                value={exp.duration}
                onChange={(e) => handleExperienceChange(exp.id, "duration", e.target.value)}
                placeholder="Duration (e.g. 2021 - Present)"
                className="h-9 sm:col-span-2 rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground"
              />
              <textarea
                rows={3}
                value={exp.description}
                onChange={(e) => handleExperienceChange(exp.id, "description", e.target.value)}
                placeholder="Key achievements and responsibilities..."
                className="sm:col-span-2 rounded-lg border border-border bg-background p-2.5 text-xs font-medium text-foreground"
              />
            </div>
          </div>
        ))}
      </div>

      {/* EDUCATION */}
      <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-soft space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border/60">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-brand" />
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
              Education
            </h3>
          </div>
          <button
            type="button"
            onClick={addEducation}
            className="inline-flex items-center gap-1 text-xs font-bold text-brand hover:underline"
          >
            <Plus className="h-3.5 w-3.5" /> Add Education
          </button>
        </div>

        {data.education.map((edu, idx) => (
          <div key={edu.id} className="rounded-xl border border-border/60 p-4 bg-porcelain/30 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-foreground">Education #{idx + 1}</span>
              <button
                type="button"
                onClick={() => removeEducation(edu.id)}
                className="text-muted-foreground hover:text-destructive text-xs flex items-center gap-1"
              >
                <Trash2 className="h-3.5 w-3.5" /> Remove
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => handleEducationChange(edu.id, "institution", e.target.value)}
                placeholder="Institution / University"
                className="h-9 rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground"
              />
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => handleEducationChange(edu.id, "degree", e.target.value)}
                placeholder="Degree (e.g. B.Sc)"
                className="h-9 rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground"
              />
              <input
                type="text"
                value={edu.fieldOfStudy}
                onChange={(e) => handleEducationChange(edu.id, "fieldOfStudy", e.target.value)}
                placeholder="Field of Study"
                className="h-9 rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={edu.startYear}
                  onChange={(e) => handleEducationChange(edu.id, "startYear", e.target.value)}
                  placeholder="Start Year"
                  className="h-9 w-1/2 rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground"
                />
                <input
                  type="text"
                  value={edu.endYear}
                  onChange={(e) => handleEducationChange(edu.id, "endYear", e.target.value)}
                  placeholder="End Year"
                  className="h-9 w-1/2 rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SKILLS */}
      <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-soft space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-border/60">
          <Code className="h-4 w-4 text-brand" />
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
            Skills & Expertise
          </h3>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkill();
              }
            }}
            placeholder="Type skill and press Enter (e.g. React)..."
            className="h-9 flex-1 rounded-xl border border-border bg-background px-3 text-xs font-medium text-foreground"
          />
          <button
            type="button"
            onClick={addSkill}
            className="rounded-xl bg-brand px-4 py-2 text-xs font-bold text-white shadow-brand hover:brightness-110"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {data.skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="hover:text-destructive"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* PROJECTS */}
      <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-soft space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border/60">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-brand" />
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
              Projects
            </h3>
          </div>
          <button
            type="button"
            onClick={addProject}
            className="inline-flex items-center gap-1 text-xs font-bold text-brand hover:underline"
          >
            <Plus className="h-3.5 w-3.5" /> Add Project
          </button>
        </div>

        {data.projects.map((proj, idx) => (
          <div key={proj.id} className="rounded-xl border border-border/60 p-4 bg-porcelain/30 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-foreground">Project #{idx + 1}</span>
              <button
                type="button"
                onClick={() => removeProject(proj.id)}
                className="text-muted-foreground hover:text-destructive text-xs flex items-center gap-1"
              >
                <Trash2 className="h-3.5 w-3.5" /> Remove
              </button>
            </div>

            <input
              type="text"
              value={proj.name}
              onChange={(e) => handleProjectChange(proj.id, "name", e.target.value)}
              placeholder="Project Name"
              className="h-9 w-full rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground"
            />
            <textarea
              rows={2}
              value={proj.description}
              onChange={(e) => handleProjectChange(proj.id, "description", e.target.value)}
              placeholder="Project Description..."
              className="w-full rounded-lg border border-border bg-background p-2.5 text-xs font-medium text-foreground"
            />
            <input
              type="text"
              value={proj.technologies}
              onChange={(e) => handleProjectChange(proj.id, "technologies", e.target.value)}
              placeholder="Technologies Used (e.g. React, Node.js)"
              className="h-9 w-full rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground"
            />
          </div>
        ))}
      </div>

      {/* CERTIFICATIONS */}
      <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-soft space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border/60">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-brand" />
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
              Certifications
            </h3>
          </div>
          <button
            type="button"
            onClick={addCertification}
            className="inline-flex items-center gap-1 text-xs font-bold text-brand hover:underline"
          >
            <Plus className="h-3.5 w-3.5" /> Add Certification
          </button>
        </div>

        {data.certifications.map((cert, idx) => (
          <div key={cert.id} className="rounded-xl border border-border/60 p-4 bg-porcelain/30 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-foreground">Certification #{idx + 1}</span>
              <button
                type="button"
                onClick={() => removeCertification(cert.id)}
                className="text-muted-foreground hover:text-destructive text-xs flex items-center gap-1"
              >
                <Trash2 className="h-3.5 w-3.5" /> Remove
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <input
                type="text"
                value={cert.name}
                onChange={(e) => handleCertChange(cert.id, "name", e.target.value)}
                placeholder="Certification Name"
                className="h-9 rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground"
              />
              <input
                type="text"
                value={cert.organization}
                onChange={(e) => handleCertChange(cert.id, "organization", e.target.value)}
                placeholder="Issuing Organization"
                className="h-9 rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground"
              />
              <input
                type="text"
                value={cert.year}
                onChange={(e) => handleCertChange(cert.id, "year", e.target.value)}
                placeholder="Year"
                className="h-9 rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground"
              />
            </div>
          </div>
        ))}
      </div>

      {/* LANGUAGES */}
      <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-soft space-y-4">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider pb-3 border-b border-border/60">
          Languages
        </h3>

        <div className="flex gap-2">
          <input
            type="text"
            value={languageInput}
            onChange={(e) => setLanguageInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addLanguage();
              }
            }}
            placeholder="Add language (e.g. English)..."
            className="h-9 flex-1 rounded-xl border border-border bg-background px-3 text-xs font-medium text-foreground"
          />
          <button
            type="button"
            onClick={addLanguage}
            className="rounded-xl bg-brand px-4 py-2 text-xs font-bold text-white shadow-brand hover:brightness-110"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {data.languages.map((lang) => (
            <span
              key={lang}
              className="inline-flex items-center gap-1.5 rounded-full bg-porcelain border border-border px-3 py-1 text-xs font-semibold text-foreground"
            >
              {lang}
              <button
                type="button"
                onClick={() => removeLanguage(lang)}
                className="hover:text-destructive"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
