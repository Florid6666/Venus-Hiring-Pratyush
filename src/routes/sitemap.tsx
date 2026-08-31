import { useState, useMemo, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Search,
  FileCode,
  Bot,
  ExternalLink,
  Briefcase,
  Layers,
  Building2,
  BookOpen,
  Calculator,
  Compass,
  CheckCircle2,
  Globe,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SERVICES_DATA } from "@/lib/services-store";
import { INDUSTRIES_DATA } from "@/lib/industries-store";
import { INITIAL_BLOGS } from "@/lib/blog-store";
import { MOCK_JOBS } from "@/components/careers/mockJobs";

const TITLE = "HTML Sitemap & Google Indexing Directory | Venus Consultancy";
const DESCRIPTION =
  "Complete structural index of Venus Consultancy web pages, recruitment practice areas, industry specializations, active job postings, and salary benchmark tools for search crawlers and users.";
const CANONICAL_URL = "https://www.venushiring.ca/sitemap";

export const Route = createFileRoute("/sitemap")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CANONICAL_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [
      { rel: "canonical", href: CANONICAL_URL },
    ],
  }),
  component: SitemapPage,
});

interface SiteSectionItem {
  title: string;
  url: string;
  description: string;
  badge?: string;
  category: "core" | "services" | "industries" | "careers" | "tools" | "blog";
  priority: string;
  changeFreq: string;
}

function SitemapPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  // Assemble full directory
  const corePages: SiteSectionItem[] = [
    {
      title: "Home — Venus Consultancy",
      url: "/",
      description: "Main landing page showcasing executive search, recruitment services, and Canadian employer solutions.",
      badge: "Primary Hub",
      category: "core",
      priority: "1.0",
      changeFreq: "Daily",
    },
    {
      title: "Services Overview",
      url: "/services",
      description: "Overview of end-to-end recruitment capabilities, permanent placement, and flexible contract staffing.",
      badge: "Hub",
      category: "core",
      priority: "0.9",
      changeFreq: "Weekly",
    },
    {
      title: "Industries Overview",
      url: "/industries",
      description: "Sector-specific recruitment specializations spanning Technology, EV, Aerospace, Healthcare, and Finance.",
      badge: "Hub",
      category: "core",
      priority: "0.9",
      changeFreq: "Weekly",
    },
    {
      title: "Careers & Job Opportunities",
      url: "/careers",
      description: "Live job board featuring open executive, technical, operations, and financial requisitions.",
      badge: "Live Board",
      category: "core",
      priority: "0.9",
      changeFreq: "Daily",
    },
    {
      title: "Insights & Thought Leadership",
      url: "/blog",
      description: "In-depth research reports, compliance advisories, and executive compensation whitepapers.",
      badge: "Insights",
      category: "core",
      priority: "0.9",
      changeFreq: "Daily",
    },
    {
      title: "Contact Us & Regional Offices",
      url: "/contact",
      description: "Direct contact channels for Toronto, Michigan, and India offices plus client inquiry form.",
      badge: "Contact",
      category: "core",
      priority: "0.8",
      changeFreq: "Monthly",
    },
    {
      title: "FAQ — Frequently Asked Questions",
      url: "/faq",
      description: "Comprehensive answers for hiring employers, job seekers, and staffing engagement models.",
      category: "core",
      priority: "0.8",
      changeFreq: "Monthly",
    },
    {
      title: "Gallery — Life at Venus",
      url: "/gallery",
      description: "Team events, company culture milestones, and workplace photo archives.",
      category: "core",
      priority: "0.7",
      changeFreq: "Monthly",
    },
  ];

  const servicePages: SiteSectionItem[] = Object.entries(SERVICES_DATA).map(([slug, s]) => ({
    title: s.title,
    url: `/services/${slug}`,
    description: s.heroHeadline || s.heroValueProp || `Specialized recruitment for ${s.title}`,
    badge: "Service",
    category: "services",
    priority: "0.9",
    changeFreq: "Weekly",
  }));

  const industryPages: SiteSectionItem[] = Object.entries(INDUSTRIES_DATA).map(([slug, ind]) => ({
    title: `${ind.title} Recruitment Practice`,
    url: `/industries/${slug}`,
    description: ind.heroHeadline || ind.heroValueProp || `Talent acquisition for ${ind.title}`,
    badge: "Industry",
    category: "industries",
    priority: "0.8",
    changeFreq: "Weekly",
  }));

  const toolPages: SiteSectionItem[] = [
    {
      title: "Salary Benchmark Calculator",
      url: "/salary-calculator",
      description: "Interactive compensation modeling tool for Canadian & US tech and corporate salaries.",
      badge: "Interactive Tool",
      category: "tools",
      priority: "0.8",
      changeFreq: "Monthly",
    },
    {
      title: "Market Rate Salary Check",
      url: "/salary-check",
      description: "Real-time salary comparison tool across Canadian provinces and metropolitan areas.",
      badge: "Interactive Tool",
      category: "tools",
      priority: "0.8",
      changeFreq: "Monthly",
    },
    {
      title: "Executive Compensation Explorer",
      url: "/salary-2",
      description: "Comprehensive role-by-role compensation intelligence and percentile breakdown.",
      badge: "Interactive Tool",
      category: "tools",
      priority: "0.7",
      changeFreq: "Monthly",
    },
    {
      title: "AI Talent Assistant & Knowledge Bot",
      url: "/ai-assistant",
      description: "Conversational AI assistant for employer requirements, hiring timelines, and role inquiries.",
      badge: "AI Powered",
      category: "tools",
      priority: "0.8",
      changeFreq: "Monthly",
    },
    {
      title: "AI Resume Builder",
      url: "/careers/resume-builder",
      description: "Professional ATS-optimized resume builder for job applicants across North America.",
      badge: "Applicant Tool",
      category: "tools",
      priority: "0.8",
      changeFreq: "Monthly",
    },
  ];

  const careerPages: SiteSectionItem[] = MOCK_JOBS.map((job) => ({
    title: `${job.title} — ${job.location}`,
    url: `/careers/${job.slug}`,
    description: `${job.department} · ${job.employmentType} · ${job.salaryRange || "Competitive"}`,
    badge: job.employmentType,
    category: "careers",
    priority: "0.8",
    changeFreq: "Weekly",
  }));

  const blogPages: SiteSectionItem[] = INITIAL_BLOGS.map((blog) => ({
    title: blog.title,
    url: `/blog/${blog.slug}`,
    description: blog.excerpt,
    badge: blog.category,
    category: "blog",
    priority: "0.8",
    changeFreq: "Monthly",
  }));

  const allItems: SiteSectionItem[] = useMemo(
    () => [
      ...corePages,
      ...servicePages,
      ...industryPages,
      ...toolPages,
      ...careerPages,
      ...blogPages,
    ],
    [],
  );

  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      const matchesCat = activeCategory === "all" || item.category === activeCategory;
      const q = query.toLowerCase().trim();
      if (!q) return matchesCat;
      const matchesQuery =
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.url.toLowerCase().includes(q) ||
        (item.badge && item.badge.toLowerCase().includes(q));
      return matchesCat && matchesQuery;
    });
  }, [allItems, activeCategory, query]);

  const categories = [
    { id: "all", label: "All Pages", count: allItems.length },
    { id: "core", label: "Core Pages", count: corePages.length },
    { id: "services", label: "Recruitment Services", count: servicePages.length },
    { id: "industries", label: "Industry Practices", count: industryPages.length },
    { id: "careers", label: "Career Postings", count: careerPages.length },
    { id: "tools", label: "Salary & AI Tools", count: toolPages.length },
    { id: "blog", label: "Articles & Insights", count: blogPages.length },
  ];

  const SITEMAP_SCHEMA = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${CANONICAL_URL}/#webpage`,
        url: CANONICAL_URL,
        name: TITLE,
        description: DESCRIPTION,
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://www.venushiring.ca/#website",
          name: "Venus Consultancy",
          url: "https://www.venushiring.ca",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${CANONICAL_URL}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.venushiring.ca/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Sitemap & Indexing",
            item: CANONICAL_URL,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-brand selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SITEMAP_SCHEMA) }}
      />
      <SiteNav />

      {/* ── Hero Banner ── */}
      <header className="relative isolate overflow-hidden bg-ink pt-28 pb-16 lg:pt-36 lg:pb-24 border-b border-ink-line">
        <div className="pointer-events-none absolute inset-0 -z-10 dot-grid opacity-[0.12]" aria-hidden />
        <div className="pointer-events-none absolute -top-40 -right-40 -z-10 h-96 w-96 rounded-full bg-brand/25 blur-[140px]" aria-hidden />

        <div className="shell relative">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-medium text-ink-foreground/60">
            <Link to="/" className="hover:text-brand transition-colors">Home</Link>
            <span>/</span>
            <span className="text-ink-foreground">Sitemap &amp; Google Index</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1 text-xs font-semibold text-brand tracking-wide uppercase">
              <Compass className="h-3.5 w-3.5" />
              Website Index &amp; Search Engine Directory
            </div>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-foreground sm:text-4xl lg:text-5xl font-display">
              Site Index &amp; Google Crawl Map
            </h1>

            <p className="mt-4 text-base text-ink-foreground/80 leading-relaxed sm:text-lg">
              Explore the complete directory of Venus Consultancy web pages, specialized recruitment practices, industry solutions, open career opportunities, and compensation research tools.
            </p>

            {/* Quick Webmaster Badges */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-xs font-semibold text-brand-foreground shadow-sm hover:bg-brand/90 transition-colors"
              >
                <FileCode className="h-4 w-4" />
                Raw XML Sitemap
                <ExternalLink className="h-3 w-3 opacity-70" />
              </a>

              <a
                href="/robots.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-ink-line bg-ink-soft/40 px-4 py-2 text-xs font-semibold text-ink-foreground hover:bg-ink-soft/80 transition-colors"
              >
                <Bot className="h-4 w-4 text-brand" />
                robots.txt Directives
                <ExternalLink className="h-3 w-3 opacity-70" />
              </a>

              <div className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Canonical Host: <strong>venushiring.ca</strong></span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Search & Filter Controls ── */}
      <section className="sticky top-16 z-30 bg-background/95 backdrop-blur-md border-b border-border py-4 shadow-sm">
        <div className="shell">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Live Filter Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search pages by keyword, role, or slug..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-lg border border-border bg-card pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Results Counter */}
            <div className="text-xs font-medium text-muted-foreground">
              Showing <span className="text-foreground font-semibold">{filteredItems.length}</span> of {allItems.length} indexed URLs
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-brand text-brand-foreground shadow-sm"
                    : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                    activeCategory === cat.id
                      ? "bg-white/20 text-white"
                      : "bg-background text-muted-foreground"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Links Directory ── */}
      <main className="flex-1 py-12 lg:py-16 bg-porcelain/30">
        <div className="shell">
          {filteredItems.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
              <Search className="mx-auto h-8 w-8 text-muted-foreground" />
              <h3 className="mt-3 text-base font-semibold text-foreground">No indexed pages found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                No URLs matched &ldquo;{query}&rdquo;. Try another keyword or clear filters.
              </p>
              <button
                onClick={() => {
                  setQuery("");
                  setActiveCategory("all");
                }}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-xs font-semibold text-brand-foreground"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item) => (
                <Link
                  key={item.url}
                  to={item.url}
                  className="group relative flex flex-col justify-between rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-1 hover:border-brand/50 hover:shadow-lg"
                >
                  <div>
                    {/* Top Row: Category & Metadata */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-muted-foreground">
                        {item.url}
                      </span>
                      {item.badge && (
                        <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-semibold text-brand">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="mt-2.5 text-base font-bold text-foreground group-hover:text-brand transition-colors line-clamp-2">
                      {item.title}
                    </h2>

                    {/* Description */}
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Footer Stats for Crawlers & UX */}
                  <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Zap className="h-3 w-3 text-brand" />
                      Priority: {item.priority}
                    </span>
                    <span className="inline-flex items-center gap-1 text-brand font-medium group-hover:translate-x-0.5 transition-transform">
                      Visit Page <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* ── Technical Indexing & Search Engine Architecture Block ── */}
          <section className="mt-16 rounded-2xl border border-border bg-card p-8 shadow-sm">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-md bg-muted px-2.5 py-1 text-xs font-semibold text-foreground">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                Search Console &amp; Crawler Compatibility Specs
              </div>

              <h2 className="mt-3 text-xl font-bold text-foreground sm:text-2xl">
                Googlebot &amp; Multi-Engine Indexation Metadata
              </h2>

              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Venus Consultancy implements automated XML schema syndication, Open Graph microformats, JSON-LD structured business entities, and UTF-8 clean canonical URI structures across all endpoints.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border/80 bg-background p-4">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Globe className="h-4 w-4 text-brand" />
                    Canonical Protocol &amp; SSL
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    All requests are strictly enforced over HTTPS on the primary domain <code>https://www.venushiring.ca</code>.
                  </p>
                </div>

                <div className="rounded-xl border border-border/80 bg-background p-4">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Sparkles className="h-4 w-4 text-brand" />
                    Structured Data Graphs
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    Embedded Schema.org schemas for <code>Organization</code>, <code>ProfessionalService</code>, <code>JobPosting</code>, and <code>BreadcrumbList</code>.
                  </p>
                </div>

                <div className="rounded-xl border border-border/80 bg-background p-4">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <FileCode className="h-4 w-4 text-brand" />
                    XML Sitemap Autodiscovery
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    Referenced in <code>robots.txt</code> and pinged at <code>https://www.venushiring.ca/sitemap.xml</code>.
                  </p>
                </div>

                <div className="rounded-xl border border-border/80 bg-background p-4">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Bot className="h-4 w-4 text-brand" />
                    Disallow Constraints
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    Administrative panels (<code>/admin</code>) and private API endpoints (<code>/api/</code>) are properly isolated.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
