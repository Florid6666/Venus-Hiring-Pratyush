import React, { useState, useEffect, useRef } from "react";
import heroOffice from "@/assets/hero-office.jpg";
import heroConsultation from "@/assets/hero-consultation.jpg";
import {
  CheckCircle2,
  Loader2,
  Mail,
  Phone,
  Building2,
  ShieldCheck,
  Users2,
  Clock,
  ArrowRight,
  Briefcase,
  UserCheck,
  Sparkles,
  X,
  UploadCloud,
  FileText,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/use-reveal";

const ALL_COUNTRIES = [
  { id: "ca", label: "Canada", flag: "🇨🇦", code: "+1", placeholder: "+1 (647) 000-0000" },
  { id: "us", label: "USA", flag: "🇺🇸", code: "+1", placeholder: "+1 (248) 000-0000" },
  { id: "in", label: "India", flag: "🇮🇳", code: "+91", placeholder: "+91 98765 43210" },
  { id: "gb", label: "United Kingdom", flag: "🇬🇧", code: "+44", placeholder: "+44 7911 123456" },
  { id: "au", label: "Australia", flag: "🇦🇺", code: "+61", placeholder: "+61 412 345 678" },
  { id: "de", label: "Germany", flag: "🇩🇪", code: "+49", placeholder: "+49 151 12345678" },
  { id: "fr", label: "France", flag: "🇫🇷", code: "+33", placeholder: "+33 6 12 34 56 78" },
  { id: "ae", label: "UAE", flag: "🇦🇪", code: "+971", placeholder: "+971 50 123 4567" },
  { id: "sg", label: "Singapore", flag: "🇸🇬", code: "+65", placeholder: "+65 9123 4567" },
  { id: "jp", label: "Japan", flag: "🇯🇵", code: "+81", placeholder: "+81 90 1234 5678" },
  { id: "mx", label: "Mexico", flag: "🇲🇽", code: "+52", placeholder: "+52 55 1234 5678" },
  { id: "br", label: "Brazil", flag: "🇧🇷", code: "+55", placeholder: "+55 11 91234-5678" },
  { id: "nl", label: "Netherlands", flag: "🇳🇱", code: "+31", placeholder: "+31 6 12345678" },
  { id: "ie", label: "Ireland", flag: "🇮🇪", code: "+353", placeholder: "+353 87 123 4567" },
  { id: "nz", label: "New Zealand", flag: "🇳🇿", code: "+64", placeholder: "+64 21 123 4567" },
  { id: "za", label: "South Africa", flag: "🇿🇦", code: "+27", placeholder: "+27 82 123 4567" },
  { id: "pk", label: "Pakistan", flag: "🇵🇰", code: "+92", placeholder: "+92 300 1234567" },
  { id: "bd", label: "Bangladesh", flag: "🇧🇩", code: "+880", placeholder: "+880 1712-345678" },
  { id: "ph", label: "Philippines", flag: "🇵🇭", code: "+63", placeholder: "+63 917 123 4567" },
  { id: "ng", label: "Nigeria", flag: "🇳🇬", code: "+234", placeholder: "+234 803 123 4567" },
  { id: "ke", label: "Kenya", flag: "🇰🇪", code: "+254", placeholder: "+254 712 345678" },
  { id: "sa", label: "Saudi Arabia", flag: "🇸🇦", code: "+966", placeholder: "+966 50 123 4567" },
  { id: "qa", label: "Qatar", flag: "🇶🇦", code: "+974", placeholder: "+974 5512 3456" },
  { id: "ch", label: "Switzerland", flag: "🇨🇭", code: "+41", placeholder: "+41 79 123 45 67" },
  { id: "se", label: "Sweden", flag: "🇸🇪", code: "+46", placeholder: "+46 70 123 45 67" },
  { id: "es", label: "Spain", flag: "🇪🇸", code: "+34", placeholder: "+34 612 34 56 78" },
  { id: "it", label: "Italy", flag: "🇮🇹", code: "+39", placeholder: "+39 312 345 6789" },
  { id: "cn", label: "China", flag: "🇨🇳", code: "+86", placeholder: "+86 139 1234 5678" },
  { id: "kr", label: "South Korea", flag: "🇰🇷", code: "+82", placeholder: "+82 10-1234-5678" },
  { id: "id", label: "Indonesia", flag: "🇮🇩", code: "+62", placeholder: "+62 812-3456-7890" },
  { id: "my", label: "Malaysia", flag: "🇲🇾", code: "+60", placeholder: "+60 12-345 6789" },
  { id: "vn", label: "Vietnam", flag: "🇻🇳", code: "+84", placeholder: "+84 91 234 56 78" },
];

const POPULAR_COUNTRIES = ALL_COUNTRIES.slice(0, 3);

const LOOKING_FOR_OPTIONS = [
  { value: "Hire Talent", label: "Hire Talent (Permanent / Executive)" },
  { value: "Contract & Project Pods", label: "Contract Staffing & SOW Project Pods" },
  { value: "Recruitment Partnership", label: "Recruitment Process Outsourcing (RPO)" },
  { value: "Workforce & HR Advisory", label: "Workforce & HR Advisory Services" },
  { value: "Career Opportunity", label: "Career Opportunity / Job Seeker" },
  { value: "General Enquiry", label: "General Enquiry" },
];

/* ---------------- CUSTOM DOWNWARD COUNTRY CODE DROPDOWN ---------------- */
function CountryCodeDropdown({
  selectedId,
  onSelect,
  disabled,
}: {
  selectedId: string;
  onSelect: (country: (typeof ALL_COUNTRIES)[0]) => void;
  disabled?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCountry = ALL_COUNTRIES.find((c) => c.id === selectedId) || ALL_COUNTRIES[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCountries = ALL_COUNTRIES.filter(
    (c) =>
      c.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.includes(searchQuery)
  );

  return (
    <div
      ref={dropdownRef}
      className="relative shrink-0 rounded-l-2xl border-r border-slate-200 bg-slate-100/90 text-xs font-bold text-slate-800 transition-colors hover:bg-slate-200/80"
    >
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 px-3 py-3.5 text-xs font-extrabold text-slate-900 focus:outline-none cursor-pointer rounded-l-2xl"
      >
        <span className="text-base">{selectedCountry.flag}</span>
        <span className="font-extrabold">{selectedCountry.code}</span>
        <ChevronDown className={cn("h-3.5 w-3.5 text-slate-500 transition-transform duration-200 ml-0.5", isOpen && "rotate-180")} />
      </button>

      {/* Downward Popover Menu (ALWAYS OPENS DOWNWARD) */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-2.5 shadow-[0_20px_50px_-10px_rgba(15,23,42,0.22)] z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Search Box */}
          <div className="mb-2 relative">
            <input
              type="text"
              placeholder="Search country or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-brand focus:outline-none"
              autoFocus
            />
          </div>

          {/* Country List (Max Height 210px with Smooth Scrollbar) */}
          <div className="max-h-52 overflow-y-auto space-y-0.5 custom-scrollbar pr-1">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((c) => {
                const isSelected = c.id === selectedId;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      onSelect(c);
                      setIsOpen(false);
                      setSearchQuery("");
                    }}
                    className={cn(
                      "flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-left",
                      isSelected
                        ? "bg-brand text-white font-bold"
                        : "text-slate-800 hover:bg-slate-100 hover:text-brand"
                    )}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <span className="text-base">{c.flag}</span>
                      <span className="truncate">{c.label}</span>
                    </span>
                    <span className={cn("font-bold text-[11px] shrink-0 ml-2", isSelected ? "text-white" : "text-slate-500")}>
                      {c.code}
                    </span>
                  </button>
                );
              })
            ) : (
              <div className="p-3 text-center text-xs text-slate-400 font-medium">No countries found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function ContactRedesign() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <div className="relative overflow-hidden bg-white text-slate-900">
      {/* 1. Hero Section */}
      <ContactHero />

      {/* 2. Employer vs Candidate Dual Path */}
      <EmployerVsCandidatePath onOpenResumeModal={() => setIsResumeModalOpen(true)} />

      {/* 3. Main Contact Form & Info Centerpiece ("TALK TO VENUS") */}
      <ContactMainSection />

      {/* 4. Resume Submission Modal Pop-up */}
      <ResumeModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />
    </div>
  );
}

/* ---------------- 1. HERO SECTION (Emphires Reference Style with Dark Overlay) ---------------- */
function ContactHero() {
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <section className="relative isolate overflow-hidden min-h-screen lg:min-h-screen flex flex-col justify-center pt-28 sm:pt-32 pb-12 text-white border-b border-slate-800 bg-slate-950">
      {/* Background Image with Black Overlay */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        <img
          src={heroConsultation}
          alt="HR recruitment consultation meeting with senior talent directors"
          className="h-full w-full object-cover object-center filter brightness-95 contrast-105"
        />
        {/* Black / Dark Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/50 sm:from-slate-950/95 sm:via-slate-950/85 sm:to-slate-950/60" />
      </div>

      <div className="shell relative z-10 w-full">
        <div
          ref={ref}
          className={cn(
            "max-w-3xl text-left reveal-item transition-all duration-700",
            shown && "is-shown"
          )}
        >
          {/* Top Pill Badge (Reference Style) */}
          <div className="inline-block bg-[#00a8ff] text-white text-xs sm:text-sm font-black uppercase tracking-[0.18em] px-4 py-2 rounded-sm shadow-lg mb-6">
            HR IS ALL ABOUT PEOPLE
          </div>

          {/* Main Headline (Outlined White + Bold Solid White Dual Style) */}
          <h1 className="font-display tracking-tight text-white leading-[1.05]">
            <span className="block text-4xl sm:text-6xl lg:text-7xl font-extrabold text-transparent [-webkit-text-stroke:2px_#ffffff] drop-shadow-md">
              Value your people
            </span>
            <span className="block text-5xl sm:text-7xl lg:text-8xl font-black text-white mt-1 drop-shadow-md">
              Think Advantage
            </span>
          </h1>

          {/* Supporting Subtitle */}
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-200 max-w-xl font-medium drop-shadow">
            Whether you're scaling an engineering team in Toronto, hiring executives in Michigan, or seeking your next executive career move — our talent advisory team is ready.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 2. MAIN CONTACT FORM & INFO CENTERPIECE ---------------- */
function ContactMainSection() {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [phoneCountry, setPhoneCountry] = useState("ca");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    serviceType: "Hire Talent",
    phone: "",
    company: "",
    role: "",
    budget: "$50k – $100k",
    country: "Canada",
    brief: "",
    honeypot: "",
  });

  const selectedPrefix = ALL_COUNTRIES.find((c) => c.id === phoneCountry) || ALL_COUNTRIES[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setErrorMsg(null);
    setLoading(true);

    try {
      const formattedPhone =
        formData.phone.trim().startsWith("+") ||
        formData.phone.trim().startsWith("🇨🇦") ||
        formData.phone.trim().startsWith("🇺🇸") ||
        formData.phone.trim().startsWith("🇮🇳")
          ? formData.phone
          : `${selectedPrefix.flag} ${selectedPrefix.code} ${formData.phone}`;

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          serviceType: formData.serviceType || "Permanent Placement",
          phone: formattedPhone,
          company: formData.company || "Not Specified",
          role: formData.role || "Hiring Manager",
          budget: formData.budget || "Not Specified",
          location: formData.country || "Canada",
          brief: formData.brief,
          honeypot: formData.honeypot || "",
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          serviceType: "Hire Talent",
          phone: "",
          company: "",
          role: "",
          budget: "$50k – $100k",
          country: "Canada",
          brief: "",
          honeypot: "",
        });
      } else {
        setErrorMsg(
          data.message || "Something went wrong while submitting your brief. Please try again."
        );
      }
    } catch {
      setErrorMsg("Something went wrong while submitting your brief. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact-form" className="relative isolate bg-white min-h-screen lg:min-h-screen flex flex-col justify-center py-16 text-slate-900 border-b border-slate-200">
      {/* Background Subtle Gradient Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand/5 via-transparent to-transparent opacity-80" aria-hidden />

      <div className="shell relative">
        <div
          ref={ref}
          className={cn(
            "grid gap-12 lg:grid-cols-12 lg:gap-14 items-start reveal-item",
            shown && "is-shown"
          )}
        >
          {/* LEFT COLUMN: Talk to Venus / Contact Information Modules */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand">
                TALK TO VENUS
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                Our Recruitment Advisory Team is Ready to Assist.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Have a strategic hiring challenge, executive role to fill, or workforce query? Reach out directly to our senior recruitment directors.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="flex flex-col gap-4">
              {/* Email Card */}
              <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-brand/40 hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand transition-transform duration-300 group-hover:scale-110">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">Email Us Direct</h3>
                    <p className="mt-1 text-sm font-bold text-brand hover:underline">
                      <a href="mailto:info@venushiring.ca">info@venushiring.ca</a>
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">Careers: <a href="mailto:careers@venushiring.ca" className="text-slate-700 hover:underline font-medium">careers@venushiring.ca</a></p>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-brand/40 hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand transition-transform duration-300 group-hover:scale-110">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">Call Our Advisory Team</h3>
                    <p className="mt-1 text-base font-bold text-slate-900">
                      <a href="tel:+16476162677" className="hover:text-brand transition-colors">+1 (647) 616-2677</a>
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">Mon – Fri: 8:30 AM – 6:00 PM EST</p>
                  </div>
                </div>
              </div>

              {/* Toronto HQ Office Card */}
              <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-brand/40 hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand transition-transform duration-300 group-hover:scale-110">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">Toronto Headquarters</h3>
                    <p className="mt-1 text-sm font-semibold leading-snug text-slate-800">
                      #205 - 1085 Bellamy Road North
                    </p>
                    <p className="text-xs text-slate-500">Toronto, ON M1H 3C7, Canada</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist Promises */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-sm">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-brand" />
                <span className="text-xs font-bold text-slate-800">12-Hour Guaranteed Response</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 shrink-0 text-brand" />
                <span className="text-xs font-bold text-slate-800">Full NDA & Strict Confidentiality</span>
              </div>
              <div className="flex items-center gap-3">
                <Users2 className="h-5 w-5 shrink-0 text-brand" />
                <span className="text-xs font-bold text-slate-800">No Sales Pitch — Itemized Proposal</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Polished White Elevated Contact Form Card */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white text-slate-900 p-7 sm:p-10 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.08)]">
              <div className="mb-6 pb-5 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    Consultation & Hiring Brief
                  </h3>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-700">
                    <Clock className="h-3.5 w-3.5 text-brand" /> 12h Turnaround
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Fill in your details below and our team will get back to you with a custom proposal.
                </p>
              </div>

              {submitted ? (
                <div className="rounded-3xl border border-emerald-500/30 bg-emerald-50 p-8 sm:p-10 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h4 className="mt-5 text-2xl font-bold text-slate-900">Enquiry Received!</h4>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">
                    Thank you for reaching out to Venus Consultancy. Your request has been logged, and one of our Senior Talent Partners will review your requirement and respond within 12 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-slate-800 transition-colors shadow-md"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Honeypot Spam Protection */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    className="sr-only hidden"
                    aria-hidden="true"
                  />

                  {errorMsg && (
                    <div className="rounded-2xl border border-rose-500/30 bg-rose-50 p-4 text-xs font-semibold text-rose-700">
                      {errorMsg}
                    </div>
                  )}

                  {/* Row 1: Name & Work Email */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Full Name <span className="text-brand">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        disabled={loading}
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/20 shadow-sm disabled:opacity-60 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Work Email <span className="text-brand">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        disabled={loading}
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/20 shadow-sm disabled:opacity-60 font-medium"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone & Country Selector */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                          Phone Number <span className="text-brand">*</span>
                        </label>
                      </div>

                      {/* Popular Quick Country Pills (Canada, USA, India) */}
                      <div className="flex flex-wrap items-center gap-1 mb-2">
                        {POPULAR_COUNTRIES.map((c) => {
                          const isActive = phoneCountry === c.id;
                          return (
                            <button
                              key={c.id}
                              type="button"
                              disabled={loading}
                              onClick={() => {
                                setPhoneCountry(c.id);
                                setFormData((prev) => ({
                                  ...prev,
                                  country: c.label,
                                }));
                              }}
                              className={cn(
                                "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold transition-all duration-200 border cursor-pointer",
                                isActive
                                  ? "bg-brand text-white border-brand shadow-sm font-bold"
                                  : "bg-slate-100 text-slate-600 border-slate-200 hover:border-brand/40 hover:text-slate-900"
                              )}
                            >
                              <span>{c.flag}</span>
                              <span>{c.label}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Phone Input with Custom Downward Country Code Dropdown */}
                      <div className="relative flex items-center rounded-2xl border border-slate-200 bg-slate-50/80 transition-all focus-within:border-brand focus-within:bg-white focus-within:ring-2 focus-within:ring-brand/20 shadow-sm">
                        <CountryCodeDropdown
                          selectedId={phoneCountry}
                          disabled={loading}
                          onSelect={(c) => {
                            setPhoneCountry(c.id);
                            setFormData((prev) => ({
                              ...prev,
                              country: c.label,
                            }));
                          }}
                        />

                        <input
                          type="tel"
                          required
                          disabled={loading}
                          placeholder={selectedPrefix.placeholder}
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-transparent px-3.5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none disabled:opacity-60 font-medium rounded-r-2xl"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Company Name <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        disabled={loading}
                        placeholder="Company Inc."
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/20 shadow-sm disabled:opacity-60 font-medium mt-[25px] sm:mt-[25px]"
                      />
                    </div>
                  </div>

                  {/* Row 3: "I'm Looking For" Select */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      I'm Looking For <span className="text-brand">*</span>
                    </label>
                    <select
                      required
                      disabled={loading}
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 text-sm text-slate-900 font-semibold transition-all focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/20 shadow-sm cursor-pointer disabled:opacity-60"
                    >
                      {LOOKING_FOR_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Row 4: Hiring Brief / Message */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Hiring Brief / Message <span className="text-brand">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      disabled={loading}
                      placeholder="Describe your requirement: target position, team size, key skills required, expected timeline, or general questions..."
                      value={formData.brief}
                      onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/20 resize-none shadow-sm disabled:opacity-60 font-medium"
                    />
                  </div>

                  {/* Primary CTA */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-brand py-4 px-8 text-base font-extrabold text-white shadow-brand transition-all duration-300 hover:brightness-110 hover:shadow-lg active:scale-[0.99] disabled:opacity-75 cursor-pointer overflow-hidden"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin text-white" />
                          <span>Submitting Your Brief...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Enquiry</span>
                          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                    <p className="mt-3 text-center text-[11px] font-medium text-slate-500">
                      🔒 100% Confidentiality Guaranteed. Response within 12 business hours.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 3. EMPLOYER VS CANDIDATE DUAL PATH ---------------- */
function EmployerVsCandidatePath({ onOpenResumeModal }: { onOpenResumeModal?: () => void }) {
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <section className="relative isolate bg-white py-20 text-slate-900">
      <div className="shell">
        <div
          ref={ref}
          className={cn(
            "grid gap-8 lg:grid-cols-2 reveal-item transition-all duration-700",
            shown && "is-shown"
          )}
        >
          {/* Card 1: For Employers */}
          <div className="group relative overflow-hidden rounded-[2.25rem] border-2 border-slate-200/90 bg-slate-50/80 p-8 sm:p-10 shadow-md transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.01] hover:border-brand hover:bg-white hover:shadow-2xl hover:shadow-brand/15 active:scale-[0.99]">
            {/* Ambient Red Glow on Hover */}
            <div className="pointer-events-none absolute -right-12 -bottom-12 h-56 w-56 rounded-full bg-brand/15 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />

            <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
              <Briefcase className="h-3.5 w-3.5" />
              <span>FOR EMPLOYERS & EXECUTIVES</span>
            </div>

            <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl transition-colors duration-300 group-hover:text-brand">
              Need Qualified Talent For Your Team?
            </h3>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 font-medium">
              Access pre-vetted Canadian and US talent across Software Engineering, Executive Leadership, Finance, and Industrial Operations with guaranteed placement SLAs.
            </p>

            <div className="mt-8">
              <a
                href="https://wa.me/16476162677?text=Hello%20Venus%20Consultancy%2C%20I%20am%20looking%20for%20qualified%20talent%20for%20my%20team."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-2xl bg-brand px-7 py-3.5 text-sm font-extrabold text-white shadow-brand transition-all duration-300 hover:brightness-110 hover:gap-3.5 active:scale-[0.98]"
              >
                <span>Talk to Our Recruitment Team</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Card 2: For Candidates */}
          <div className="group relative overflow-hidden rounded-[2.25rem] border-2 border-slate-200/90 bg-slate-50/80 p-8 sm:p-10 shadow-md transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.01] hover:border-slate-900 hover:bg-white hover:shadow-2xl hover:shadow-slate-900/10 active:scale-[0.99]">
            {/* Ambient Dark Glow on Hover */}
            <div className="pointer-events-none absolute -right-12 -bottom-12 h-56 w-56 rounded-full bg-slate-900/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />

            <div className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-200/80 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-slate-800 transition-colors duration-300 group-hover:bg-slate-900 group-hover:text-white">
              <UserCheck className="h-3.5 w-3.5 text-brand group-hover:text-white transition-colors" />
              <span>FOR CANDIDATES & PROFESSIONALS</span>
            </div>

            <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl transition-colors duration-300 group-hover:text-slate-900">
              Ready for Your Next Career Move?
            </h3>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 font-medium">
              Connect with top Canadian employers hiring for direct-hire, executive, and high-impact contract roles. Submit your resume to our confidential career database.
            </p>

            <div className="mt-8">
              <button
                type="button"
                onClick={onOpenResumeModal}
                className="inline-flex items-center gap-2.5 rounded-2xl border border-slate-300 bg-slate-900 px-7 py-3.5 text-sm font-extrabold text-white transition-all duration-300 hover:bg-slate-800 hover:gap-3.5 active:scale-[0.98] shadow-md cursor-pointer"
              >
                <span>Submit Your CV / Resume</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 4. RESUME SUBMISSION MODAL POP-UP ---------------- */
function ResumeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialization: "Software Engineering & Tech",
    note: "",
  });

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate uploading file to candidate pipeline
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden
      />

      {/* Modal Dialog Container */}
      <div className="relative w-full max-w-xl rounded-[2.5rem] border border-slate-200 bg-white p-7 sm:p-10 shadow-[0_30px_100px_-15px_rgba(15,23,42,0.35)] z-10 my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="py-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="mt-5 font-display text-2xl font-bold text-slate-900">Resume Received!</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Thank you, <span className="font-bold text-slate-900">{formData.name}</span>. Your resume has been added to our executive candidate pipeline. Our talent partners will reach out to you directly when matching executive or specialized opportunities open.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setSelectedFile(null);
                onClose();
              }}
              className="mt-8 inline-flex items-center justify-center rounded-2xl bg-slate-900 px-8 py-3.5 text-sm font-extrabold text-white hover:bg-slate-800 transition-colors shadow-md cursor-pointer"
            >
              Done & Close
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6 pb-4 border-b border-slate-100">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-brand mb-2">
                <UserCheck className="h-3.5 w-3.5" /> Confidential Career Match
              </span>
              <h3 className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Submit Your Resume / CV
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Join Canada & US executive talent pipeline. 100% confidential.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Name & Email */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Full Name <span className="text-brand">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    disabled={loading}
                    placeholder="Jane Smith"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Email Address <span className="text-brand">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    disabled={loading}
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 font-medium"
                  />
                </div>
              </div>

              {/* Specialization / Target Field */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Target Industry / Role <span className="text-brand">*</span>
                </label>
                <select
                  required
                  disabled={loading}
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 font-semibold focus:bg-white focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 cursor-pointer"
                >
                  <option value="Software Engineering & Tech">Software Engineering & Technology</option>
                  <option value="Executive & C-Suite Leadership">Executive & C-Suite Leadership</option>
                  <option value="Finance & Accounting">Finance & Accounting</option>
                  <option value="Industrial & Operations">Industrial & Supply Chain Operations</option>
                  <option value="Sales & Business Development">Sales & Business Development</option>
                  <option value="Other Industry">Other Professional Field</option>
                </select>
              </div>

              {/* File Upload Box */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Upload Resume File <span className="text-brand">*</span>
                </label>

                {selectedFile ? (
                  <div className="flex items-center justify-between rounded-2xl border border-emerald-300 bg-emerald-50/80 px-4 py-3.5">
                    <div className="flex items-center gap-3 min-w-0">
                      <FileText className="h-6 w-6 shrink-0 text-emerald-600" />
                      <div className="truncate">
                        <p className="text-xs font-bold text-slate-900 truncate">{selectedFile.name}</p>
                        <p className="text-[10px] text-slate-500 font-medium">
                          {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedFile(null)}
                      className="text-xs font-extrabold text-slate-500 hover:text-rose-600 underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <label className="group flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/80 px-4 py-6 text-center transition-all hover:border-brand hover:bg-red-50/20 cursor-pointer">
                    <UploadCloud className="h-8 w-8 text-slate-400 transition-transform group-hover:scale-110 group-hover:text-brand" />
                    <p className="mt-2 text-xs font-bold text-slate-700">
                      Click to upload or drag & drop resume file
                    </p>
                    <p className="mt-0.5 text-[10px] text-slate-400">PDF, DOCX, DOC, or TXT (Max 10MB)</p>
                    <input
                      type="file"
                      required
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileChange}
                      className="sr-only hidden"
                    />
                  </label>
                )}
              </div>

              {/* Cover Note / Brief */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Brief Note / Target Location <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={2}
                  disabled={loading}
                  placeholder="e.g. Seeking Senior Engineering roles in Toronto / Remote..."
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 resize-none font-medium"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-brand py-3.5 px-6 text-sm font-extrabold text-white shadow-brand transition-all hover:brightness-110 active:scale-[0.99] disabled:opacity-70 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-white" />
                      <span>Uploading Resume...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Resume Now</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
                <p className="mt-2 text-center text-[10px] font-medium text-slate-400">
                  🔒 Confidential & Protected by Venus Talent Privacy SLAs.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
