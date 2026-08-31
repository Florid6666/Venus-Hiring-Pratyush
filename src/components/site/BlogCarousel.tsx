import { useState, useMemo } from "react";
import { ArrowUpRight, CalendarDays, Search, Clock } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useBlogs, calculateReadingTime, DEFAULT_FALLBACK_IMAGE } from "@/lib/blog-store";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

interface BlogCarouselProps {
  showSearchFilter?: boolean;
}

export function BlogCarousel({ showSearchFilter = false }: BlogCarouselProps) {
  const { blogs, categories } = useBlogs();
  const { ref, shown } = useReveal<HTMLDivElement>();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Filtered blogs matching search query & category selection
  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      const matchesCategory =
        selectedCategory === "all" || b.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.excerpt.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        (b.tags && b.tags.some((t) => t.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [blogs, selectedCategory, searchQuery]);

  return (
    <section
      id="blog"
      className="relative overflow-hidden border-b border-border bg-porcelain section-padding py-20 lg:py-28"
      aria-label="Recruitment intelligence from our consultants"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 mesh-light opacity-80"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 dot-grid-light opacity-[0.25]"
        aria-hidden
      />

      <div className="shell relative space-y-10">
        {/* Section Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3 text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft/40 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand">
              Workforce Intelligence
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Recruitment & Compliance Insights
            </h2>
            <p className="text-base text-muted-foreground sm:text-lg">
              Stay updated with Canadian & US recruitment trends, executive search strategies, salary benchmarks, and cross-border compliance.
            </p>
          </div>

          {!showSearchFilter && (
            <div className="shrink-0">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-xs font-bold text-white shadow-brand transition-all hover:brightness-110"
              >
                View All Articles <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Search & Category Filter Toolbar (Only rendered when showSearchFilter is true) */}
        {showSearchFilter && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/80 bg-card p-4 shadow-sm">
              {/* Live Search Input */}
              <div className="relative flex-1 min-w-[260px]">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search articles by title, keyword, or topic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/70 focus:border-brand focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground hover:text-foreground"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
                <button
                  type="button"
                  onClick={() => setSelectedCategory("all")}
                  className={cn(
                    "rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all shrink-0",
                    selectedCategory === "all"
                      ? "bg-brand text-white shadow-brand"
                      : "bg-background border border-border text-foreground hover:bg-accent"
                  )}
                >
                  All Categories ({blogs.length})
                </button>
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedCategory(c)}
                    className={cn(
                      "rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all shrink-0",
                      selectedCategory === c
                        ? "bg-brand text-white shadow-brand"
                        : "bg-background border border-border text-foreground hover:bg-accent"
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Content Container */}
        {filteredBlogs.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center space-y-4">
            <Search className="h-10 w-10 text-muted-foreground mx-auto" />
            <h3 className="font-bold text-lg text-foreground">No articles found matching your query</h3>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              Try searching with another keyword or select a different category from above.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2 text-xs font-bold text-white shadow-brand"
            >
              Reset Search & Filters
            </button>
          </div>
        ) : (
          <div ref={ref} className={cn("reveal-item", shown && "is-shown")}>
            {/* UNIFORM 3-COLUMN ARTICLES GRID */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(showSearchFilter ? filteredBlogs : filteredBlogs.slice(0, 3)).map((b) => {
                const readTime = calculateReadingTime(b.content, b.contentBlocks);

                return (
                  <Link
                    key={b.id}
                    to="/blog/$slug"
                    params={{ slug: b.slug || b.id }}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] glass-panel p-3 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-brand/40 bg-card border border-border/80 text-foreground"
                  >
                    <div>
                      {/* Top Image with Date Badge */}
                      <div className="sheen relative aspect-[16/10] overflow-hidden rounded-[1.35rem]">
                        <img
                          src={b.featuredImage || DEFAULT_FALLBACK_IMAGE}
                          alt={b.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <span className="absolute left-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1 text-[11px] font-semibold text-foreground backdrop-blur shadow-sm border border-border/40">
                          <CalendarDays className="h-3.5 w-3.5 text-brand" />
                          {b.publishDate}
                        </span>
                      </div>

                      {/* Details */}
                      <div className="p-4 pt-5 space-y-2.5">
                        <div className="flex items-center justify-between text-[11px] font-bold text-brand uppercase tracking-wider">
                          <span>{b.category}</span>
                          <span className="text-muted-foreground font-semibold flex items-center gap-1">
                            <Clock className="h-3 w-3 text-brand" /> {readTime}
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold leading-snug transition-colors duration-300 group-hover:text-brand text-foreground line-clamp-2">
                          {b.title}
                        </h3>

                        <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground line-clamp-3">
                          {b.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer Action */}
                    <div className="p-4 pt-0">
                      <span className="flex items-center justify-between gap-3 border-t border-border/80 pt-4 text-xs font-semibold text-foreground">
                        <span className="relative group-hover:text-brand transition-colors font-bold">
                          Read full article
                        </span>
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-45">
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
