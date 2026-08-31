import { useState, useMemo, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Search,
  HelpCircle,
  ChevronRight,
  Plus,
  Minus,
  MessageSquare,
  PhoneCall,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  X,
} from "lucide-react";
import { useFaqs, type FaqItem } from "@/lib/faq-store";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import faqHero from "@/assets/faq-hero.jpg";
import faqCard1 from "@/assets/faq-card-1.png";
import faqCard2 from "@/assets/faq-card-2.png";
import faqCard3 from "@/assets/faq-card-3.png";
import faqCard4 from "@/assets/faq-card-4.png";

const FEATURED_FAQ_IMAGES = [faqCard1, faqCard2, faqCard3, faqCard4];

const TITLE = "Frequently Asked Questions | Venus Hiring";
const DESCRIPTION =
  "Find answers to common questions about Venus Hiring recruitment services, hiring processes, candidates, workforce solutions, and employer support.";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
    ],
  }),
  component: FaqPage,
});

const CATEGORIES = ["All", "Employers", "Candidates", "Recruitment Process", "Services", "General"];

function FaqPage() {
  const { faqs } = useFaqs();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "faq-emp-1": true, // First question open by default
  });

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  // Filter FAQs by category & live search query
  const filteredFaqs = useMemo(() => {
    return faqs.filter((item) => {
      const matchesCat =
        selectedCategory === "All" ||
        item.category.toLowerCase() === selectedCategory.toLowerCase();

      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        item.q.toLowerCase().includes(query) ||
        item.a.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      return matchesCat && matchesQuery;
    });
  }, [faqs, selectedCategory, searchQuery]);

  const toggleAccordion = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Structured Data Schema for FAQPage
  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between selection:bg-brand selection:text-white">
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />

      <SiteNav />

      <main id="main-content" className="flex-1">
        {/* ── 1. FAQ HERO SECTION ── */}
        <section className="relative isolate overflow-hidden min-h-screen lg:min-h-[100svh] flex flex-col justify-center bg-slate-950 text-white pt-28 sm:pt-32 pb-16 border-b border-slate-800">
          {/* Background Image with Black Overlay */}
          <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
            <img
              src={faqHero}
              alt="Executive recruitment directors reviewing workforce strategy and candidate portfolios"
              className="h-full w-full object-cover object-center filter brightness-90 contrast-105"
            />
            {/* Dark Slate / Black Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/60 sm:from-slate-950/95 sm:via-slate-950/80 sm:to-slate-950/50" />
            <div className="absolute inset-0 bg-slate-950/40" />
          </div>

          {/* Ambient Lighting & Decorative Grid Background */}
          <div className="pointer-events-none absolute inset-0 -z-10 dot-grid opacity-20" aria-hidden />
          <div className="pointer-events-none absolute -left-32 top-1/4 -z-10 h-96 w-96 rounded-full bg-brand/20 blur-[140px]" aria-hidden />
          <div className="pointer-events-none absolute -right-32 bottom-10 -z-10 h-80 w-80 rounded-full bg-slate-800/40 blur-[120px]" aria-hidden />

          <div className="shell relative z-10">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-6 uppercase tracking-wider">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
              <span className="text-brand font-black">FAQ</span>
            </div>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-brand mb-4 backdrop-blur-md">
                <HelpCircle className="h-3.5 w-3.5" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
                Questions? We Have Answers.
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-300 font-medium leading-relaxed max-w-2xl">
                Find answers to common questions about our recruitment services, hiring process, candidates, and workforce solutions.
              </p>

              {/* Integrated Search Bar inside Hero */}
              <div className="mt-8 relative max-w-xl">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search questions (e.g. recruitment process, pre-screened, candidates)..."
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900/90 pl-12 pr-10 py-4 text-sm font-medium text-white placeholder:text-slate-400 focus:border-brand focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-brand/30 shadow-2xl transition-all"
                  />
                  <Search className="absolute left-4 h-5 w-5 text-brand" />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 text-xs font-bold text-slate-400 hover:text-white transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. CATEGORY FILTER TABS & 4-COLUMN ALWAYS-OPEN FAQ CARD GRID ── */}
        <section className="py-12 sm:py-20 bg-white text-slate-900 relative">
          <div className="shell">
            <div className="w-full space-y-8">
              
              {/* Prominent Content Search Bar & Category Filter Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
                {/* Search Bar */}
                <div className="relative w-full sm:max-w-md">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search any question (e.g. process, candidates, fees)..."
                    className="w-full rounded-full border border-slate-200 bg-slate-50 pl-11 pr-10 py-3 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/20 shadow-2xs transition-all"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-brand" />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Category Filter Pills */}
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
                  {CATEGORIES.map((cat) => {
                    const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`rounded-full px-5 py-2.5 text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                          isActive
                            ? "bg-brand text-white shadow-brand shadow-md scale-105"
                            : "bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 hover:text-slate-900"
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4-Cards Per Row Always-Open FAQ Cards Grid */}
              {filteredFaqs.length === 0 ? (
                <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
                  <HelpCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-900">No questions found</h3>
                  <p className="mt-2 text-sm text-slate-500 font-medium max-w-md mx-auto">
                    No questions matched your search criteria. Try a different search term or select another category.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory("All");
                      setSearchQuery("");
                    }}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-xs font-extrabold text-white shadow-brand transition-all hover:brightness-110 cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch w-full">
                  {filteredFaqs.map((faq, idx) => {
                    return (
                      <div
                        key={faq.id}
                        className="group rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-brand/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4"
                      >
                        <div className="space-y-3">
                          {/* Top Badge & Number */}
                          <div className="flex items-center justify-between">
                            <span className="inline-block rounded-full bg-slate-100 border border-slate-200/80 px-3 py-1 text-[10px] font-extrabold text-slate-700 uppercase tracking-wider">
                              {faq.category}
                            </span>
                            <span className="text-[10px] font-black text-slate-400">
                              {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                            </span>
                          </div>

                          {/* Question Title */}
                          <h3 className="font-display text-base sm:text-lg font-black text-slate-900 group-hover:text-brand transition-colors leading-snug">
                            {faq.q}
                          </h3>

                          {/* Always-Open Full Answer */}
                          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed pt-1">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ── 3. STILL HAVE QUESTIONS CTA ── */}
              <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-8 sm:p-12 text-white shadow-2xl border border-slate-800">
                <div className="pointer-events-none absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-brand/25 blur-3xl" aria-hidden />

                <div className="relative z-10 max-w-2xl space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-brand">
                    <PhoneCall className="h-3.5 w-3.5" />
                    <span>WE'RE HERE TO HELP</span>
                  </div>

                  <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    Still Have Questions?
                  </h2>

                  <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
                    Our recruitment specialists are here to help. Talk to the Venus team and get the answers you need.
                  </p>

                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand px-6 py-3.5 text-xs font-extrabold text-white shadow-brand transition-all hover:brightness-110 cursor-pointer"
                    >
                      <span>Book a Call</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-900 px-6 py-3.5 text-xs font-extrabold text-white transition-all hover:bg-slate-800 hover:border-slate-600 cursor-pointer"
                    >
                      <MessageSquare className="h-4 w-4 text-brand" />
                      <span>Contact Us</span>
                    </Link>
                  </div>
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

function filteredBlogsCount(count: number): string {
  if (count === 1) return "1 question";
  return `${count} questions`;
}
