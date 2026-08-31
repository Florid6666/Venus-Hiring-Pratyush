import { useState, useEffect } from "react";
import { X, Calendar, Clock, Share2, Tag, ArrowLeft, HelpCircle, Plus, Minus, List } from "lucide-react";
import type { BlogPost } from "@/lib/blog-store";

interface BlogModalProps {
  blog: BlogPost | null;
  onClose: () => void;
}

export function BlogModal({ blog, onClose }: BlogModalProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    if (!blog) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [blog, onClose]);

  // Smooth scroll to #faq container if hash is present
  useEffect(() => {
    if (blog && window.location.hash === "#faq") {
      setTimeout(() => {
        const faqEl = document.getElementById("faq");
        if (faqEl) {
          faqEl.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  }, [blog]);

  if (!blog) return null;

  // Generate FAQPage JSON-LD Structured Data Schema for Search Engines (SEO)
  const faqSchema =
    blog.faqs && blog.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: blog.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.a,
            },
          })),
        }
      : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Inject FAQPage Structured Data Schema into Head for Search Engines */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] border border-border bg-background shadow-2xl text-foreground scrollbar-thin">
        {/* Sticky Close Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between bg-background/90 backdrop-blur-md px-6 py-4 border-b border-border/80">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-bold text-foreground hover:bg-brand hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Articles
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:bg-brand hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Article Container */}
        <article className="p-6 sm:p-10">
          {/* Category Tag & Read Time */}
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 border border-brand/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand">
              <Tag className="h-3 w-3" /> {blog.category}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground">
              <Clock className="h-3.5 w-3.5" /> {blog.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
            {blog.title}
          </h1>

          {/* Subtitle Excerpt */}
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground font-medium">
            {blog.excerpt}
          </p>

          {/* Author Card & Date */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 py-4 border-y border-border/80">
            <div className="flex items-center gap-3">
              <img
                src={blog.author.avatar}
                alt={blog.author.name}
                className="h-12 w-12 rounded-full object-cover border-2 border-brand/40"
              />
              <div>
                <p className="text-sm font-bold text-foreground">{blog.author.name}</p>
                <p className="text-xs text-muted-foreground">{blog.author.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-semibold">
              <Calendar className="h-4 w-4 text-brand" /> Published {blog.publishDate}
            </div>
          </div>

          {/* Featured Hero Banner Image */}
          {blog.featuredImage && (
            <div className="my-8 overflow-hidden rounded-2xl border border-border shadow-lg">
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="w-full max-h-[420px] object-cover"
              />
            </div>
          )}

          {/* Quick Table of Contents Header */}
          <div className="my-6 rounded-2xl border border-border/80 bg-card/60 p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <List className="h-4 w-4 text-brand" /> Quick Table of Contents
            </div>
            <ul className="text-xs space-y-1.5 pl-5 list-disc text-muted-foreground font-medium">
              <li>
                <a href="#article-content" className="hover:text-brand transition-colors">
                  Main Article Analysis & Strategy
                </a>
              </li>
              {blog.faqs && blog.faqs.length > 0 && (
                <li>
                  <a
                    href="#faq"
                    onClick={(e) => {
                      e.preventDefault();
                      const faqEl = document.getElementById("faq");
                      if (faqEl) faqEl.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="hover:text-brand transition-colors font-semibold text-brand"
                  >
                    Frequently Asked Questions ({blog.faqs.length})
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Article HTML Content */}
          <div
            id="article-content"
            className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-li:leading-relaxed prose-blockquote:border-l-4 prose-blockquote:border-brand prose-blockquote:pl-4 prose-blockquote:italic"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Render Custom Article FAQs with id="faq" for Smooth Anchor Links */}
          {blog.faqs && blog.faqs.length > 0 && (
            <div id="faq" className="mt-12 pt-10 border-t border-border/80 space-y-6 scroll-mt-20">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  <HelpCircle className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    Frequently Asked Questions
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Key answers and insights regarding this article's topic.
                  </p>
                </div>
              </div>

              {/* Clean Accordion Layout (Single Item Open at a Time) */}
              <div className="space-y-3">
                {blog.faqs.map((f, i) => {
                  const isOpen = openFaqIndex === i;
                  return (
                    <div
                      key={f.id || f.q}
                      className="overflow-hidden rounded-2xl border border-border/80 bg-card/60 transition-all hover:border-brand/40 shadow-sm"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                        className="flex w-full items-center justify-between gap-4 p-4 text-left font-bold text-sm text-foreground hover:text-brand transition-colors"
                      >
                        <span className="leading-snug">▼ {f.q}</span>
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-background text-muted-foreground">
                          {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 pt-1 text-xs leading-relaxed text-muted-foreground border-t border-border/40 animate-in fade-in duration-150">
                          {f.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Share & Call to Action Footer */}
          <div className="mt-12 pt-6 border-t border-border/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Share2 className="h-4 w-4" /> Share Article
              </span>
              <button
                type="button"
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Article link copied to clipboard!");
                  }
                }}
                className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold hover:border-brand hover:text-brand transition-colors"
              >
                Copy Link
              </button>
            </div>
            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-2.5 text-xs font-bold text-white shadow-brand hover:brightness-110 transition-all"
            >
              Consult With Our Recruitment Team →
            </a>
          </div>
        </article>
      </div>
    </div>
  );
}
