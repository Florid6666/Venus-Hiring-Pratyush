import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Upload,
  FileText,
  Trash2,
  CheckCircle2,
  Loader2,
  Sparkles,
  User,
  Briefcase,
  AlertCircle,
} from "lucide-react";
import type { JobItem } from "./mockJobs";
import { submitCareerApplication } from "@/lib/careers/applications";
import heroOfficeImg from "@/assets/hero-office.jpg";

interface ApplicationFormProps {
  job: JobItem | undefined;
}

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  currentTitle: string;
  currentCompany: string;
  experienceYears: string;
  linkedinUrl: string;
  portfolioUrl: string;
  coverLetter: string;
  consentGiven: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  experienceYears?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  resume?: string;
  consentGiven?: string;
}

export function ApplicationForm({ job }: ApplicationFormProps) {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    currentTitle: "",
    currentCompany: "",
    experienceYears: "",
    linkedinUrl: "",
    portfolioUrl: "",
    coverLetter: "",
    consentGiven: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isResumeBuiltLive, setIsResumeBuiltLive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showBuilderNotice, setShowBuilderNotice] = useState(false);

  if (!job) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-20 px-4">
        <h1 className="font-display text-2xl font-bold text-foreground">Position Not Found</h1>
        <p className="mt-2 text-sm text-muted-foreground">The job position you are applying for could not be found.</p>
        <a
          href="/careers"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-semibold text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Careers
        </a>
      </div>
    );
  }

  // Handle Text Input Changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
      if (errors[name as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
      if (errors[name as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    }
  };

  // Handle Resume File Upload
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    // File validation
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const maxSizeBytes = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
      setErrors((prev) => ({
        ...prev,
        resume: "Please upload a valid PDF, DOC, or DOCX file.",
      }));
      return;
    }

    if (file.size > maxSizeBytes) {
      setErrors((prev) => ({
        ...prev,
        resume: "File size exceeds 10MB limit. Please upload a smaller file.",
      }));
      return;
    }

    setSelectedFile(file);
    setIsResumeBuiltLive(false);
    setErrors((prev) => ({ ...prev, resume: undefined }));
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setIsResumeBuiltLive(false);
  };

  // Format Bytes to Readable String
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Helper to read uploaded resume file as Base64 Data URL
  const readFileAsDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const [submitError, setSubmitError] = useState<string | null>(null);

  // Form Validation
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required.";

    if (!form.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    }

    if (!form.experienceYears) {
      newErrors.experienceYears = "Please select your years of experience.";
    }

    if (form.linkedinUrl.trim()) {
      if (!/^https?:\/\/(www\.)?linkedin\.com\/.*$/i.test(form.linkedinUrl.trim())) {
        newErrors.linkedinUrl = "Please enter a valid LinkedIn profile URL.";
      }
    }

    if (form.portfolioUrl.trim()) {
      if (!/^https?:\/\/.+\..+$/i.test(form.portfolioUrl.trim())) {
        newErrors.portfolioUrl = "Please enter a valid web URL (e.g. https://example.com).";
      }
    }

    if (!selectedFile && !isResumeBuiltLive) {
      newErrors.resume = "Please upload a valid PDF, DOC, or DOCX file.";
    }

    if (!form.consentGiven) {
      newErrors.consentGiven = "You must consent to data processing to submit your application.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setSubmitError("Please complete all required fields.");
    } else {
      setSubmitError(null);
    }
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      // Scroll to first error
      const firstErrEl = document.querySelector(".text-destructive");
      if (firstErrEl) {
        firstErrEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      let resumeDataUrl: string | undefined = undefined;
      if (selectedFile) {
        try {
          resumeDataUrl = await readFileAsDataUrl(selectedFile);
        } catch (fileErr) {
          console.error("Failed to read file Data URL:", fileErr);
        }
      }

      await submitCareerApplication({
        jobId: job.id,
        jobTitle: job.title,
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        location: form.location.trim() || undefined,
        currentTitle: form.currentTitle.trim() || undefined,
        currentCompany: form.currentCompany.trim() || undefined,
        experienceYears: form.experienceYears,
        linkedinUrl: form.linkedinUrl.trim() || undefined,
        portfolioUrl: form.portfolioUrl.trim() || undefined,
        resumeFileName: selectedFile?.name,
        resumeFileSize: selectedFile ? formatFileSize(selectedFile.size) : undefined,
        resumeFileType: selectedFile?.type,
        resumeDataUrl,
        isResumeBuiltLive,
        coverLetter: form.coverLetter.trim() || undefined,
        consentGiven: form.consentGiven,
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Submission failed:", err);
      setIsSubmitting(false);
      setSubmitError("Unable to submit application. Please try again.");
    }
  };

  // SUCCESS SCREEN RENDER
  if (isSubmitted) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center text-center py-20 px-4">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-brand/10 text-brand mb-6 border border-brand/20 shadow-soft">
          <CheckCircle2 className="h-10 w-10 text-brand" />
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brand mb-3">
          CONFIRMATION
        </div>
        <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
          APPLICATION RECEIVED
        </h1>
        <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg leading-relaxed">
          Thank you for applying for <strong className="text-foreground">{job.title}</strong>. Our executive recruitment team will review your application profile and contact you within 12 hours.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/careers"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-brand hover:brightness-110 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            BACK TO CAREERS
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* ==================== 1. FULL SCREEN HERO ==================== */}
      <section className="relative isolate flex min-h-[100vh] w-full items-center overflow-hidden bg-ink text-left">
        <div className="absolute inset-0 -z-20 h-full w-full">
          <img
            src={heroOfficeImg}
            alt="Venus Hiring application workspace"
            className="h-full w-full scale-105 object-cover object-center transition-transform duration-1000 ease-out"
          />
        </div>

        {/* Dark Scrim Overlay */}
        <div className="absolute inset-0 -z-10 bg-black/75 backdrop-blur-[1px]" aria-hidden />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-black/40 to-transparent" aria-hidden />

        <div className="shell relative w-full py-28 sm:py-32 lg:py-36">
          <div className="max-w-6xl text-left">
            {/* Back Button */}
            <Link
              to="/careers/$slug"
              params={{ slug: job.slug }}
              className="inline-flex items-center gap-2 text-xs font-semibold text-white/70 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Position Details
            </Link>

            {/* Department Tag */}
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                APPLICATION FOR
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
              {job.location} &nbsp;·&nbsp; {job.employmentType}
            </p>
          </div>
        </div>
      </section>

      {/* ==================== 2. APPLICATION FORM CONTAINER ==================== */}
      <div id="application-form" className="py-12 sm:py-16 bg-porcelain/40">
        <div className="shell max-w-6xl">

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {submitError && (
            <div className="flex items-center gap-3 rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-xs font-bold text-destructive shadow-soft">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          {/* SECTION 1 — PERSONAL INFORMATION */}
          <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-soft">
            <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-border/60">
              <User className="h-5 w-5 text-brand" />
              <h2 className="font-display text-lg font-bold text-foreground sm:text-xl">
                1. Personal Information
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* First Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="firstName" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  First Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="e.g. Sarah"
                  className={`h-11 w-full rounded-xl border px-3.5 text-sm font-medium text-foreground bg-background transition-colors focus:outline-none focus:ring-2 ${
                    errors.firstName
                      ? "border-destructive focus:ring-destructive/20"
                      : "border-border focus:border-brand focus:ring-brand/20"
                  }`}
                />
                {errors.firstName && (
                  <span className="text-xs font-semibold text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {errors.firstName}
                  </span>
                )}
              </div>

              {/* Last Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="lastName" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Last Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="e.g. Jenkins"
                  className={`h-11 w-full rounded-xl border px-3.5 text-sm font-medium text-foreground bg-background transition-colors focus:outline-none focus:ring-2 ${
                    errors.lastName
                      ? "border-destructive focus:ring-destructive/20"
                      : "border-border focus:border-brand focus:ring-brand/20"
                  }`}
                />
                {errors.lastName && (
                  <span className="text-xs font-semibold text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {errors.lastName}
                  </span>
                )}
              </div>

              {/* Email Address */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Email Address <span className="text-destructive">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="sarah.jenkins@example.com"
                  className={`h-11 w-full rounded-xl border px-3.5 text-sm font-medium text-foreground bg-background transition-colors focus:outline-none focus:ring-2 ${
                    errors.email
                      ? "border-destructive focus:ring-destructive/20"
                      : "border-border focus:border-brand focus:ring-brand/20"
                  }`}
                />
                {errors.email && (
                  <span className="text-xs font-semibold text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {errors.email}
                  </span>
                )}
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Phone Number <span className="text-destructive">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+1 (416) 555-0192"
                  className={`h-11 w-full rounded-xl border px-3.5 text-sm font-medium text-foreground bg-background transition-colors focus:outline-none focus:ring-2 ${
                    errors.phone
                      ? "border-destructive focus:ring-destructive/20"
                      : "border-border focus:border-brand focus:ring-brand/20"
                  }`}
                />
                {errors.phone && (
                  <span className="text-xs font-semibold text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {errors.phone}
                  </span>
                )}
              </div>

              {/* Current Location */}
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label htmlFor="location" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Current Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="City, Province / State (e.g. Toronto, ON)"
                  className="h-11 w-full rounded-xl border border-border bg-background px-3.5 text-sm font-medium text-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2 — PROFESSIONAL INFORMATION */}
          <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-soft">
            <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-border/60">
              <Briefcase className="h-5 w-5 text-brand" />
              <h2 className="font-display text-lg font-bold text-foreground sm:text-xl">
                2. Professional Experience
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Current Job Title */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="currentTitle" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Current Job Title
                </label>
                <input
                  type="text"
                  id="currentTitle"
                  name="currentTitle"
                  value={form.currentTitle}
                  onChange={handleChange}
                  placeholder="e.g. Senior Software Developer"
                  className="h-11 w-full rounded-xl border border-border bg-background px-3.5 text-sm font-medium text-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>

              {/* Current Company */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="currentCompany" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Current Company
                </label>
                <input
                  type="text"
                  id="currentCompany"
                  name="currentCompany"
                  value={form.currentCompany}
                  onChange={handleChange}
                  placeholder="e.g. Acme Corporation"
                  className="h-11 w-full rounded-xl border border-border bg-background px-3.5 text-sm font-medium text-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>

              {/* Years of Experience */}
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label htmlFor="experienceYears" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Total Years of Experience <span className="text-destructive">*</span>
                </label>
                <select
                  id="experienceYears"
                  name="experienceYears"
                  value={form.experienceYears}
                  onChange={handleChange}
                  className={`h-11 w-full rounded-xl border px-3.5 text-sm font-medium text-foreground bg-background transition-colors focus:outline-none focus:ring-2 ${
                    errors.experienceYears
                      ? "border-destructive focus:ring-destructive/20"
                      : "border-border focus:border-brand focus:ring-brand/20"
                  }`}
                >
                  <option value="">Select experience level...</option>
                  <option value="0-1 years">Less than 1 year</option>
                  <option value="1-3 years">1 - 3 years</option>
                  <option value="3-5 years">3 - 5 years</option>
                  <option value="5-8 years">5 - 8 years</option>
                  <option value="8+ years">8+ years</option>
                </select>
                {errors.experienceYears && (
                  <span className="text-xs font-semibold text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {errors.experienceYears}
                  </span>
                )}
              </div>

              {/* LinkedIn URL */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="linkedinUrl" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  id="linkedinUrl"
                  name="linkedinUrl"
                  value={form.linkedinUrl}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/username"
                  className={`h-11 w-full rounded-xl border px-3.5 text-sm font-medium text-foreground bg-background transition-colors focus:outline-none focus:ring-2 ${
                    errors.linkedinUrl
                      ? "border-destructive focus:ring-destructive/20"
                      : "border-border focus:border-brand focus:ring-brand/20"
                  }`}
                />
                {errors.linkedinUrl && (
                  <span className="text-xs font-semibold text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {errors.linkedinUrl}
                  </span>
                )}
              </div>

              {/* Portfolio URL */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="portfolioUrl" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Portfolio / Personal Website URL
                </label>
                <input
                  type="url"
                  id="portfolioUrl"
                  name="portfolioUrl"
                  value={form.portfolioUrl}
                  onChange={handleChange}
                  placeholder="https://yourportfolio.com"
                  className={`h-11 w-full rounded-xl border px-3.5 text-sm font-medium text-foreground bg-background transition-colors focus:outline-none focus:ring-2 ${
                    errors.portfolioUrl
                      ? "border-destructive focus:ring-destructive/20"
                      : "border-border focus:border-brand focus:ring-brand/20"
                  }`}
                />
                {errors.portfolioUrl && (
                  <span className="text-xs font-semibold text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {errors.portfolioUrl}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* SECTION 3 — RESUME / CV */}
          <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-soft">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-border/60">
              <div className="flex items-center gap-2.5">
                <FileText className="h-5 w-5 text-brand" />
                <h2 className="font-display text-lg font-bold text-foreground sm:text-xl">
                  3. Resume / CV <span className="text-destructive">*</span>
                </h2>
              </div>
            </div>

            {/* Option Cards */}
            <div className="space-y-6">
              {/* Option A: Upload Resume */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-foreground block mb-2">
                  Option A: Upload Your Resume File
                </span>

                {!selectedFile ? (
                  <label
                    htmlFor="resume-upload"
                    className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-all ${
                      errors.resume
                        ? "border-destructive/60 bg-destructive/5 hover:bg-destructive/10"
                        : "border-border/80 bg-porcelain/30 hover:border-brand/50 hover:bg-brand-soft/20"
                    }`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand mb-3">
                      <Upload className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">
                      Click to upload or drag and drop your CV file
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Supported formats: PDF, DOC, DOCX (Max size: 10MB)
                    </p>
                    <input
                      type="file"
                      id="resume-upload"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="flex items-center justify-between rounded-xl border border-brand/40 bg-brand-soft/30 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand text-white">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">{selectedFile.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(selectedFile.size)} · Uploaded
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      aria-label="Remove resume file"
                      className="rounded-full p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Divider OR */}
              <div className="relative flex items-center justify-center my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/60" />
                </div>
                <span className="relative bg-card px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  OR
                </span>
              </div>

              {/* Option B: Build Your Resume */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-foreground block mb-2">
                  Option B: Build Your Resume Live
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-border/80 bg-porcelain/40 p-5">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Don't have a PDF ready?
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Use Venus Interactive Resume Builder to create a clean, executive CV in minutes.
                    </p>
                  </div>
                  <a
                    href="/careers/resume-builder"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      setIsResumeBuiltLive(true);
                      setSelectedFile(null);
                      setShowBuilderNotice(true);
                      setErrors((prev) => ({ ...prev, resume: undefined }));
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-brand/40 bg-card px-5 py-2.5 text-xs font-bold text-brand hover:bg-brand hover:text-white transition-all shrink-0"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    BUILD YOUR RESUME
                  </a>
                </div>

                {isResumeBuiltLive && (
                  <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    Live Resume Builder Selected for Application
                  </div>
                )}

                {showBuilderNotice && (
                  <div className="mt-3 rounded-xl border border-brand/30 bg-brand-soft/20 p-4 text-xs text-foreground leading-relaxed">
                    <p className="font-bold text-brand mb-1">Resume Builder Entry Point Selected</p>
                    Candidates can proceed to complete live CV details in the dedicated Resume Builder.
                  </div>
                )}
              </div>

              {errors.resume && (
                <span className="text-xs font-semibold text-destructive flex items-center gap-1 mt-2">
                  <AlertCircle className="h-3 w-3" /> {errors.resume}
                </span>
              )}
            </div>
          </div>

          {/* SECTION 4 — COVER LETTER */}
          <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-soft">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-border/60">
              <h2 className="font-display text-lg font-bold text-foreground sm:text-xl">
                4. Cover Letter (Optional)
              </h2>
              <span className="text-xs text-muted-foreground font-medium">
                {form.coverLetter.length} / 2000 characters
              </span>
            </div>

            <textarea
              id="coverLetter"
              name="coverLetter"
              rows={5}
              maxLength={2000}
              value={form.coverLetter}
              onChange={handleChange}
              placeholder="Introduce yourself and explain why you're a great fit for this position at Venus Hiring..."
              className="w-full rounded-xl border border-border bg-background p-3.5 text-sm font-medium text-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 resize-y"
            />
          </div>

          {/* SECTION 5 — CONSENT & SUBMIT */}
          <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-soft space-y-6">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="consentGiven"
                name="consentGiven"
                checked={form.consentGiven}
                onChange={handleChange}
                className="h-5 w-5 rounded border-border text-brand focus:ring-brand shrink-0 mt-0.5 cursor-pointer"
              />
              <label htmlFor="consentGiven" className="text-xs sm:text-sm text-foreground leading-relaxed cursor-pointer">
                I consent to Venus Hiring storing and processing my application information for recruitment and executive matching purposes in accordance with privacy standards. <span className="text-destructive">*</span>
              </label>
            </div>

            {errors.consentGiven && (
              <span className="text-xs font-semibold text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" /> {errors.consentGiven}
              </span>
            )}

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex h-14 w-full items-center justify-center gap-3 rounded-full bg-primary px-8 text-base font-bold text-primary-foreground shadow-brand transition-all duration-300 hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin text-white" />
                    SUBMITTING APPLICATION...
                  </>
                ) : (
                  <>
                    SUBMIT APPLICATION
                    <CheckCircle2 className="h-5 w-5 text-white transition-transform duration-300 group-hover:scale-110" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
}
