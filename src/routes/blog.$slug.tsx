import { useState, useEffect, useRef } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Tag,
  HelpCircle,
  Plus,
  Minus,
  List,
  ChevronRight,
  Sparkles,
  Link2,
  Linkedin,
  Twitter,
  Facebook,
  ArrowUpRight,
  BookOpen,
  ArrowRight,
  Check,
  User,
  MessageSquare,
  Users,
  Building2,
} from "lucide-react";
import {
  useBlogs,
  type BlogPost,
  calculateReadingTime,
  getRelatedArticles,
  getAdjacentArticles,
  DEFAULT_FALLBACK_IMAGE,
} from "@/lib/blog-store";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/blog/$slug")({
  head: () => ({
    meta: [
      { title: "Recruitment Insights & Cross-Border Compliance | Venus Hiring" },
      {
        name: "description",
        content:
          "Executive search strategies, Canadian tech recruitment, and cross-border workforce compliance intelligence from Venus Hiring.",
      },
    ],
  }),
  component: BlogDetailPage,
});

interface TocItem {
  id: string;
  text: string;
  level: "h2" | "h3";
  indexNumber: string;
}

function BlogDetailPage() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const { blogs, loading } = useBlogs();

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTocId, setActiveTocId] = useState<string>("");
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);

  const articleContentRef = useRef<HTMLDivElement | null>(null);

  // Find matching blog by slug or ID
  const blog = blogs.find(
    (b) => b.slug === slug || b.id === slug || encodeURIComponent(b.slug) === slug
  );

  // Compute Related Articles & Adjacent Previous/Next Posts
  const relatedArticles = blog ? getRelatedArticles(blog, blogs, 3) : [];
  const { prevBlog, nextBlog } = blog ? getAdjacentArticles(blog, blogs) : { prevBlog: null, nextBlog: null };

  // Calculate Reading Time dynamically if missing or default
  const readingTime = blog
    ? blog.readTime && blog.readTime !== "0 min read"
      ? blog.readTime
      : calculateReadingTime(blog.content, blog.contentBlocks)
    : "6 min read";

  // Always scroll to top of page when opening an article detail page
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [slug]);

  // Scroll Progress Bar Indicator listener
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dynamically extract ALL H2 and H3 headings for Table of Contents & setup IntersectionObserver for active highlighting
  useEffect(() => {
    if (!blog || !articleContentRef.current) return;

    const headingEls = articleContentRef.current.querySelectorAll("h2, h3");
    const extracted: TocItem[] = [];
    const usedIds = new Set<string>();

    headingEls.forEach((el, index) => {
      const tag = el.tagName.toLowerCase() as "h2" | "h3";
      let headingId = el.id;
      if (!headingId) {
        let baseId = `section-${index + 1}-${el.textContent
          ?.toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "")}`;

        headingId = baseId;
        let counter = 1;
        while (usedIds.has(headingId)) {
          headingId = `${baseId}-${counter}`;
          counter++;
        }
        el.id = headingId;
      }
      usedIds.add(headingId);

      const numStr = (index + 1).toString().padStart(2, "0");
      extracted.push({
        id: headingId,
        text: el.textContent || `Section ${index + 1}`,
        level: tag,
        indexNumber: numStr,
      });
    });

    setTocItems(extracted);

    // Setup active TOC heading observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTocId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -55% 0px" }
    );

    headingEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [blog]);

  // Smooth scroll to #faq container if hash is present
  useEffect(() => {
    if (blog && typeof window !== "undefined" && window.location.hash === "#faq") {
      setTimeout(() => {
        const faqEl = document.getElementById("faq");
        if (faqEl) {
          faqEl.scrollIntoView({ behavior: "smooth" });
        }
      }, 350);
    }
  }, [blog]);

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopyLink = () => {
    if (navigator.clipboard && currentUrl) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (!blog) {
    if (loading) {
      return (
        <div className="min-h-screen bg-background flex flex-col justify-between">
          <SiteNav />
          <div className="shell section-padding text-center py-24">
            <div className="animate-pulse space-y-6 max-w-3xl mx-auto">
              <div className="h-10 bg-muted rounded-xl w-3/4 mx-auto" />
              <div className="h-4 bg-muted rounded-xl w-1/2 mx-auto" />
              <div className="h-72 bg-muted rounded-3xl w-full" />
            </div>
          </div>
          <SiteFooter />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-background flex flex-col justify-between">
        <SiteNav />
        <main className="shell section-padding py-24 text-center">
          <div className="max-w-md mx-auto space-y-6">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10 text-brand border border-brand/30">
              <BookOpen className="h-8 w-8" />
            </span>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Article Not Found
            </h1>
            <p className="text-sm text-muted-foreground">
              The recruitment article you are looking for does not exist or may have been updated.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-xs font-bold text-white shadow-brand hover:brightness-110 transition-all"
            >
              <ArrowLeft className="h-4 w-4" /> Explore All Articles
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  // SEO Meta & Schemas
  const pageTitle = blog.seo?.metaTitle || `${blog.title} | Venus Hiring`;
  const pageDescription = blog.seo?.metaDescription || blog.excerpt;
  // Extract first image from content blocks or body if present
  const contentFirstImage =
    blog.contentBlocks?.find((b) => b.type === "image" && b.mediaUrl)?.mediaUrl;

  const contentHasImages = Boolean(
    contentFirstImage ||
    (blog.content && (blog.content.includes("<img") || blog.content.includes("<figure")))
  );

  const hasCustomFeaturedImage = Boolean(
    blog.featuredImage &&
    blog.featuredImage !== DEFAULT_FALLBACK_IMAGE &&
    !blog.featuredImage.includes("photo-1522071820081-009f0129c71c")
  );

  // Show top hero banner only if the admin gave a featured image AND it is not duplicated in the content body
  const showTopHeroImage = hasCustomFeaturedImage && !contentHasImages;

  // For SEO meta image, use admin's image (either featuredImage or content block image) or fallback
  const featuredImg =
    (hasCustomFeaturedImage ? blog.featuredImage : contentFirstImage) ||
    blog.featuredImage ||
    DEFAULT_FALLBACK_IMAGE;

  // JSON-LD Schemas
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt,
    image: [featuredImg],
    author: {
      "@type": "Person",
      name: blog.author.name,
      jobTitle: blog.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "Venus Hiring",
      logo: {
        "@type": "ImageObject",
        url: "https://venus-hiring.vercel.app/favicon.ico",
      },
    },
    datePublished: blog.publishDate,
    mainEntityOfPage: canonicalUrl,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://venus-hiring.vercel.app/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blogs",
        item: "https://venus-hiring.vercel.app/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: blog.title,
        item: currentUrl,
      },
    ],
  };

  const faqSchema =
    blog.faqs && blog.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: blog.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-brand selection:text-white">
      {/* Dynamic SEO Head Tags */}
      <head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        {blog.seo?.keywords && <meta name="keywords" content={blog.seo.keywords} />}
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={featuredImg} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={featuredImg} />
      </head>

      {/* Structured Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 z-50 h-1 bg-brand transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden
      />

      {/* Global Navbar */}
      <SiteNav />

      <main className="flex-1 pt-20 sm:pt-24">
        {/* Clickable Breadcrumb Bar */}
        <div className="border-b border-border/80 bg-card/60 backdrop-blur-md">
          <div className="shell py-3.5 flex flex-wrap items-center justify-between gap-4">
            <nav
              aria-label="Breadcrumb navigation"
              className="flex items-center gap-2 text-xs font-medium text-muted-foreground overflow-x-auto scrollbar-none"
            >
              <Link to="/" className="hover:text-brand transition-colors shrink-0">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5 opacity-40 shrink-0" />
              <Link to="/blog" className="hover:text-brand transition-colors shrink-0">
                Blogs
              </Link>
              <ChevronRight className="h-3.5 w-3.5 opacity-40 shrink-0" />
              <Link
                to="/blog"
                search={{ category: blog.category }}
                className="text-brand font-semibold shrink-0 hover:underline"
              >
                {blog.category}
              </Link>
              <ChevronRight className="h-3.5 w-3.5 opacity-40 shrink-0 hidden sm:inline" />
              <span className="text-foreground font-medium truncate max-w-[220px] sm:max-w-[340px] hidden sm:inline">
                {blog.title}
              </span>
            </nav>

            <button
              type="button"
              onClick={() => navigate({ to: "/blog" })}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-bold text-foreground hover:bg-brand hover:text-white transition-all shadow-sm shrink-0"
            >
              <ArrowLeft className="h-4 w-4" /> Back to All Articles
            </button>
          </div>
        </div>

        {/* Article Section */}
        <article className="shell section-padding py-10 lg:py-14">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* HERO / ARTICLE HEADER */}
            <header className="space-y-6">
              {/* Category Tag, Reading Time & Publication Date */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 border border-brand/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand">
                  <Tag className="h-3.5 w-3.5" /> {blog.category}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 text-brand" /> {readingTime}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" /> Published {blog.publishDate}
                </span>
              </div>

              {/* H1 Main Heading with controlled max-width and clean typography */}
              <div className="max-w-4xl lg:max-w-5xl">
                <h1 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-foreground leading-snug">
                  {blog.title}
                </h1>
              </div>

              {/* Simple Short Description / Excerpt */}
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground font-normal max-w-3xl border-l-2 border-brand/40 pl-3.5 py-0.5">
                {blog.excerpt}
              </p>

              {/* Author Info Bar & Share Toolbar Header */}
              <div className="flex flex-wrap items-center justify-between gap-6 py-5 border-y border-border/80">
                <div className="flex items-center gap-3.5">
                  <img
                    src={blog.author.avatar}
                    alt={blog.author.name}
                    className="h-12 w-12 rounded-full object-cover border-2 border-brand/40 shadow-sm"
                  />
                  <div>
                    <p className="text-sm font-bold text-foreground">{blog.author.name}</p>
                    <p className="text-xs text-muted-foreground">{blog.author.role}</p>
                  </div>
                </div>

                {/* Share Toolbar (LinkedIn, Facebook, Twitter/X, Copy Link) */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground hidden sm:inline mr-1">
                    Share Article:
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    title="Copy Article Link"
                    aria-label="Copy Article Link"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:border-brand hover:text-brand transition-colors"
                  >
                    {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Link2 className="h-4 w-4" />}
                  </button>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Share on LinkedIn"
                    aria-label="Share on LinkedIn"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:border-blue-600 hover:text-blue-600 transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Share on Facebook"
                    aria-label="Share on Facebook"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:border-blue-700 hover:text-blue-700 transition-colors"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(blog.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Share on Twitter/X"
                    aria-label="Share on Twitter/X"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:border-sky-500 hover:text-sky-500 transition-colors"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* FEATURED HERO IMAGE - Only displayed if explicitly provided and not already present in article content */}
              {showTopHeroImage && (
                <div className="my-8 overflow-hidden rounded-3xl border border-border shadow-xl aspect-[16/9] max-h-[520px]">
                  <img
                    src={blog.featuredImage}
                    alt={blog.title}
                    loading="eager"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                  />
                </div>
              )}
            </header>

            {/* MAIN DESKTOP GRID (Left: 70% Article Content / Right: 30% Sidebar with ONE LARGE TOC CARD) */}
            <div className="grid gap-10 lg:grid-cols-12 lg:items-start pt-2">
              {/* LEFT / MAIN COLUMN (70% - lg:col-span-8) */}
              <div className="min-w-0 space-y-10 lg:col-span-8">
                {/* Mobile Collapsible TOC */}
                {tocItems.length > 0 && (
                  <div className="lg:hidden rounded-2xl border border-border/80 bg-card p-5 space-y-3 shadow-sm">
                    <button
                      type="button"
                      onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
                      className="flex w-full items-center justify-between font-bold text-xs uppercase tracking-wider text-brand"
                    >
                      <span className="flex items-center gap-2">
                        <List className="h-4 w-4" /> Table of Contents ({tocItems.length})
                      </span>
                      <span>{isMobileTocOpen ? "▲ Hide" : "▼ Show"}</span>
                    </button>
                    {isMobileTocOpen && (
                      <div className="pt-3 border-t border-border/60 space-y-2 text-xs">
                        {tocItems.map((item) => (
                          <a
                            key={item.id}
                            href={`#${item.id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              setIsMobileTocOpen(false);
                              const el = document.getElementById(item.id);
                              if (el) el.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="block py-1 text-muted-foreground hover:text-brand truncate"
                          >
                            <span className="font-mono text-brand mr-1.5">{item.indexNumber}.</span>
                            {item.text}
                          </a>
                        ))}
                        {blog.faqs && blog.faqs.length > 0 && (
                          <a
                            href="#faq"
                            onClick={(e) => {
                              e.preventDefault();
                              setIsMobileTocOpen(false);
                              const faqEl = document.getElementById("faq");
                              if (faqEl) faqEl.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="block py-1 font-bold text-amber-600 dark:text-amber-400 hover:text-brand"
                          >
                            <span className="font-mono mr-1.5">FAQ.</span> Frequently Asked Questions ({blog.faqs.length})
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Render Complete Article HTML Body */}
                <div
                  ref={articleContentRef}
                  className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-sans prose-headings:font-semibold prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:tracking-tight prose-h2:text-foreground prose-h2:mt-7 prose-h2:mb-3 prose-h3:text-lg sm:prose-h3:text-xl prose-h3:font-semibold prose-h3:text-foreground prose-h3:mt-5 prose-h3:mb-2 prose-h4:text-base sm:prose-h4:text-lg prose-h4:font-semibold prose-h4:text-foreground prose-h4:mt-4 prose-h4:mb-2 prose-p:text-[15px] sm:prose-p:text-[16px] prose-p:leading-relaxed prose-p:text-foreground/85 prose-li:text-[15px] prose-li:leading-relaxed prose-blockquote:border-l-4 prose-blockquote:border-brand prose-blockquote:pl-5 prose-blockquote:italic prose-blockquote:my-5"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* MAIN RECRUITMENT END CTA BANNER */}
                <div className="my-12 rounded-3xl border border-brand/30 bg-gradient-to-br from-brand/10 via-card to-card p-6 sm:p-8 space-y-4 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand">
                    <Users className="h-4 w-4 text-brand" /> Venus Hiring Talent Solution
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                    READY TO BUILD YOUR CANADIAN TEAM?
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
                    Connect with Venus Hiring to find qualified Canadian talent and navigate cross-border recruitment with confidence.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-xs font-bold text-white shadow-brand hover:brightness-110 transition-all"
                    >
                      Book a Consultation →
                    </a>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-xs font-bold text-foreground hover:bg-accent transition-colors"
                    >
                      Find Talent Now
                    </a>
                  </div>
                </div>

                {/* FAQ ACCORDION SECTION (#faq) */}
                {blog.faqs && blog.faqs.length > 0 && (
                  <div id="faq" className="mt-14 pt-10 border-t border-border/80 space-y-6 scroll-mt-24">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                        <HelpCircle className="h-5 w-5" />
                      </span>
                      <div>
                        <h2 className="font-display text-2xl font-bold text-foreground">
                          Frequently Asked Questions
                        </h2>
                        <p className="text-xs text-muted-foreground">
                          Key answers and compliance insights regarding {blog.title}.
                        </p>
                      </div>
                    </div>

                    {/* Expandable Accordion List */}
                    <div className="space-y-3.5">
                      {blog.faqs.map((f, i) => {
                        const isOpen = openFaqIndex === i;
                        return (
                          <div
                            key={f.id || f.q}
                            className="overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-brand/40 shadow-sm"
                          >
                            <button
                              type="button"
                              onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                              aria-expanded={isOpen}
                              className="flex w-full items-center justify-between gap-4 p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-foreground hover:text-brand transition-colors"
                            >
                              <span className="leading-snug">▼ {f.q}</span>
                              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-background text-muted-foreground">
                                {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                              </span>
                            </button>
                            {isOpen && (
                              <div className="px-5 pb-5 pt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground border-t border-border/40 animate-in fade-in duration-200">
                                {f.a}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* SHARE THIS ARTICLE FOOTER TOOLBAR */}
                <div className="pt-8 border-t border-border/80 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <Share2 className="h-4 w-4" /> Share Article
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-semibold hover:border-brand hover:text-brand transition-colors"
                    >
                      {copied ? "Link Copied!" : "Copy Link"}
                    </button>
                  </div>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-2.5 text-xs font-bold text-white shadow-brand hover:brightness-110 transition-all"
                  >
                    Book a Consultation →
                  </a>
                </div>
              </div>

              {/* RIGHT SIDEBAR COLUMN (30% - lg:col-span-4) - ONE LARGE STICKY TOC CARD & SIDEBAR WIDGETS */}
              <aside className="space-y-6 lg:col-span-4 lg:sticky lg:top-24">
                {/* ONE LARGE TABLE OF CONTENTS CARD */}
                {tocItems.length > 0 && (
                  <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between border-b border-border/60 pb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-brand flex items-center gap-2">
                        <List className="h-4 w-4" /> Table of Contents
                      </span>
                      <span className="text-[11px] font-semibold text-muted-foreground">
                        {tocItems.length} Sections
                      </span>
                    </div>

                    <nav className="text-xs space-y-1.5 max-h-[60vh] overflow-y-auto scrollbar-thin pr-1">
                      {tocItems.map((item) => {
                        const isActive = activeTocId === item.id;
                        return (
                          <a
                            key={item.id}
                            href={`#${item.id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              const el = document.getElementById(item.id);
                              if (el) el.scrollIntoView({ behavior: "smooth" });
                            }}
                            className={`flex items-start gap-2 py-1.5 px-2 rounded-lg leading-snug transition-colors ${
                              item.level === "h3" ? "pl-5 text-[11px]" : "font-semibold"
                            } ${
                              isActive
                                ? "bg-brand/10 text-brand font-bold border-l-2 border-brand"
                                : "text-muted-foreground hover:bg-accent hover:text-foreground"
                            }`}
                          >
                            <span className="font-mono text-brand shrink-0">{item.indexNumber}.</span>
                            <span className="truncate">{item.text}</span>
                          </a>
                        );
                      })}

                      {blog.faqs && blog.faqs.length > 0 && (
                        <a
                          href="#faq"
                          onClick={(e) => {
                            e.preventDefault();
                            const faqEl = document.getElementById("faq");
                            if (faqEl) faqEl.scrollIntoView({ behavior: "smooth" });
                          }}
                          className={`flex items-center gap-2 py-1.5 px-2 rounded-lg leading-snug font-bold transition-colors ${
                            activeTocId === "faq"
                              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-l-2 border-amber-500"
                              : "text-amber-600 dark:text-amber-400 hover:bg-accent"
                          }`}
                        >
                          <span className="font-mono shrink-0">FAQ.</span>
                          <span className="truncate">Frequently Asked Questions ({blog.faqs.length})</span>
                        </a>
                      )}
                    </nav>
                  </div>
                )}



                {/* Share Sidebar Box (All 4 options) */}
                <div className="rounded-2xl border border-border bg-card p-5 space-y-3 shadow-sm">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    SHARE THIS ARTICLE
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-background py-2 text-xs font-bold hover:border-brand hover:text-brand transition-colors"
                    >
                      <Link2 className="h-3.5 w-3.5" /> {copied ? "Copied!" : "Copy"}
                    </button>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-background py-2 text-xs font-bold hover:border-blue-600 hover:text-blue-600 transition-colors"
                    >
                      <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-background py-2 text-xs font-bold hover:border-blue-700 hover:text-blue-700 transition-colors"
                    >
                      <Facebook className="h-3.5 w-3.5" /> Facebook
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(blog.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-background py-2 text-xs font-bold hover:border-sky-500 hover:text-sky-500 transition-colors"
                    >
                      <Twitter className="h-3.5 w-3.5" /> Twitter/X
                    </a>
                  </div>
                </div>

                {/* Recruitment Shortlist Promo Box */}
                <div className="rounded-2xl border border-brand/30 bg-brand/5 p-5 space-y-3">
                  <Sparkles className="h-5 w-5 text-brand" />
                  <h4 className="font-bold text-sm text-foreground leading-snug uppercase">
                    HIRING TOP CANADIAN TALENT?
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Receive a calibrated shortlist of pre-screened Canadian candidates within 5 business days.
                  </p>
                  <a
                    href="#contact"
                    className="inline-flex w-full items-center justify-center gap-1 rounded-xl bg-brand py-2.5 text-xs font-bold text-white shadow-brand hover:brightness-110 transition-all"
                  >
                    Get Talent Shortlist →
                  </a>
                </div>
              </aside>
            </div>

            {/* PREVIOUS / NEXT ARTICLE NAVIGATION */}
            {(prevBlog || nextBlog) && (
              <div className="mt-16 pt-10 border-t border-border/80 grid gap-4 sm:grid-cols-2">
                {prevBlog ? (
                  <Link
                    to="/blog/$slug"
                    params={{ slug: prevBlog.slug || prevBlog.id }}
                    className="group rounded-2xl border border-border/80 bg-card p-5 space-y-2 hover:border-brand/40 transition-all"
                  >
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                      <ArrowLeft className="h-3.5 w-3.5 text-brand" /> Previous Article
                    </span>
                    <h4 className="font-bold text-sm text-foreground group-hover:text-brand transition-colors line-clamp-1">
                      {prevBlog.title}
                    </h4>
                  </Link>
                ) : (
                  <div />
                )}

                {nextBlog && (
                  <Link
                    to="/blog/$slug"
                    params={{ slug: nextBlog.slug || nextBlog.id }}
                    className="group rounded-2xl border border-border/80 bg-card p-5 space-y-2 hover:border-brand/40 transition-all text-right sm:text-right"
                  >
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-end gap-1">
                      Next Article <ArrowRight className="h-3.5 w-3.5 text-brand" />
                    </span>
                    <h4 className="font-bold text-sm text-foreground group-hover:text-brand transition-colors line-clamp-1">
                      {nextBlog.title}
                    </h4>
                  </Link>
                )}
              </div>
            )}

            {/* RELATED ARTICLES SYSTEM */}
            {relatedArticles.length > 0 && (
              <div className="mt-20 pt-12 border-t border-border/80 space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-foreground">
                      Related Articles & Recruitment Insights
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Explore similar workforce compliance and executive hiring intelligence.
                    </p>
                  </div>
                  <Link
                    to="/blog"
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand hover:underline"
                  >
                    View All →
                  </Link>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedArticles.map((rel) => (
                    <Link
                      key={rel.id}
                      to="/blog/$slug"
                      params={{ slug: rel.slug || rel.id }}
                      className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-3 shadow-sm hover:-translate-y-1 hover:border-brand/40 transition-all"
                    >
                      <div>
                        <div className="aspect-[16/10] overflow-hidden rounded-xl">
                          <img
                            src={rel.featuredImage || DEFAULT_FALLBACK_IMAGE}
                            alt={rel.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-3 pt-4 space-y-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-brand">
                            {rel.category}
                          </span>
                          <h4 className="font-bold text-sm text-foreground leading-snug group-hover:text-brand transition-colors line-clamp-2">
                            {rel.title}
                          </h4>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {rel.excerpt}
                          </p>
                        </div>
                      </div>

                      <div className="p-3 pt-0 flex items-center justify-between text-xs font-semibold text-foreground border-t border-border/60 mt-3 pt-3">
                        <span>Read article</span>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-brand" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

      </main>

      {/* Global Website Footer */}
      <SiteFooter />
    </div>
  );
}
