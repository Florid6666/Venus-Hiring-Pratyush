import { useMemo } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Search,
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Newspaper,
  ChevronLeft,
  TrendingUp,
  PhoneCall,
} from "lucide-react";
import { useBlogs, DEFAULT_FALLBACK_IMAGE } from "@/lib/blog-store";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import blogHeroArchive from "@/assets/blog-hero-archive.jpg";

const TITLE = "Workforce Intelligence & Recruitment Insights | Venus Consultancy";
const DESCRIPTION =
  "Explore Canadian & US recruitment trends, executive search strategies, salary benchmarks, and cross-border compliance insights from Venus Consultancy.";

interface BlogSearchSchema {
  page?: number;
  category?: string;
  q?: string;
}

export const Route = createFileRoute("/blog/")({
  validateSearch: (search: Record<string, unknown>): BlogSearchSchema => {
    const pageNum = Number(search.page);
    return {
      page: pageNum && pageNum > 0 ? pageNum : 1,
      category: typeof search.category === "string" && search.category ? search.category : "All",
      q: typeof search.q === "string" ? search.q : "",
    };
  },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
    ],
  }),
  component: BlogArchivePage,
});

function BlogArchivePage() {
  const { blogs, loading } = useBlogs();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const currentPage = search.page || 1;
  const selectedCategory = search.category || "All";
  const searchQuery = search.q || "";

  // Articles per page for clean listing & growth
  const POSTS_PER_PAGE = 4;

  // Helper functions to update URL search parameters safely
  const setPage = (newPage: number) => {
    navigate({
      search: (old: BlogSearchSchema) => ({
        ...old,
        page: newPage === 1 ? undefined : newPage,
      }),
    });
    setTimeout(() => {
      document.getElementById("articles")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const setSelectedCategory = (newCat: string) => {
    navigate({
      search: (old: BlogSearchSchema) => ({
        ...old,
        category: newCat === "All" ? undefined : newCat,
        page: undefined, // Reset to Page 1 when changing category
      }),
    });
    setTimeout(() => {
      document.getElementById("articles")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const setSearchQuery = (newQ: string) => {
    navigate({
      search: (old: BlogSearchSchema) => ({
        ...old,
        q: newQ ? newQ : undefined,
        page: undefined, // Reset to Page 1 when typing search
      }),
    });
  };

  // Extract unique categories & counts from blogs
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: blogs.length };
    blogs.forEach((b) => {
      if (b.category) {
        counts[b.category] = (counts[b.category] || 0) + 1;
      }
    });
    return counts;
  }, [blogs]);

  const categories = useMemo(() => Object.keys(categoryCounts), [categoryCounts]);

  // Filter blogs by search query & selected category
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesCategory =
        selectedCategory === "All" ||
        blog.category.toLowerCase() === selectedCategory.toLowerCase();

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        blog.title.toLowerCase().includes(query) ||
        blog.excerpt.toLowerCase().includes(query) ||
        blog.category.toLowerCase().includes(query) ||
        (blog.tags && blog.tags.some((t) => t.toLowerCase().includes(query)));

      return matchesCategory && matchesSearch;
    });
  }, [blogs, selectedCategory, searchQuery]);

  // Primary featured post
  const featuredPost = useMemo(() => {
    return blogs.find((b) => b.isFeatured) || blogs[0];
  }, [blogs]);

  // Grid blogs excluding featured post when on default view
  const displayBlogs = useMemo(() => {
    if (searchQuery || selectedCategory !== "All") {
      return filteredBlogs;
    }
    return filteredBlogs.filter((b) => b.id !== featuredPost?.id);
  }, [filteredBlogs, featuredPost, searchQuery, selectedCategory]);

  // Paginated blogs
  const totalPages = Math.max(1, Math.ceil(displayBlogs.length / POSTS_PER_PAGE));
  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return displayBlogs.slice(start, start + POSTS_PER_PAGE);
  }, [displayBlogs, currentPage, POSTS_PER_PAGE]);

  // Trending articles for sidebar
  const trendingBlogs = useMemo(() => {
    return blogs.slice(0, 4);
  }, [blogs]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <SiteNav />

      <main id="main-content" className="flex-1">
        {/* ── 1. HERO BANNER WITH FULL VIEWPORT HEIGHT & OVERLAY ── */}
        <section className="relative isolate overflow-hidden bg-slate-950 text-white min-h-screen lg:min-h-screen flex flex-col justify-center pt-28 sm:pt-32 pb-16 border-b border-slate-800">
          {/* Background Image with Black Overlay */}
          <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
            <img
              src={blogHeroArchive}
              alt="Executive recruitment directors analyzing workforce reports"
              className="h-full w-full object-cover object-center filter brightness-90 contrast-105"
            />
            {/* Dark Slate / Black Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/60 sm:from-slate-950/95 sm:via-slate-950/80 sm:to-slate-950/50" />
            <div className="absolute inset-0 bg-slate-950/40" />
          </div>

          <div className="shell relative z-10">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300 mb-6 uppercase tracking-wider">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
              <span className="text-brand font-black">Blog Archive</span>
            </div>

            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-brand mb-4 backdrop-blur-md">
                <Newspaper className="h-3.5 w-3.5" />
                <span>WORKFORCE INTELLIGENCE & INSIGHTS</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] drop-shadow-md">
                Canadian & US Hiring Trends, Executive Search & Compliance
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-200 font-medium leading-relaxed max-w-3xl drop-shadow">
                Stay updated with Canadian & US recruitment intelligence, compensation benchmarks, executive hiring strategies, and cross-border compliance guides from senior recruitment partners.
              </p>
            </div>
          </div>
        </section>

        {/* ── 2. MAIN 2-COLUMN LAYOUT (CAPERMINT STYLE GRID & SIDEBAR) ── */}
        <section className="py-12 sm:py-16">
          <div className="shell">
            <div className="grid gap-12 lg:grid-cols-12 items-start">
              
              {/* ── LEFT MAIN STREAM (8 COLUMNS) ── */}
              <div className="lg:col-span-8 space-y-12">
                
                {/* ── FEATURED POST SPOTLIGHT (Shown when no search/category filter active) ── */}
                {!searchQuery && selectedCategory === "All" && featuredPost && currentPage === 1 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-brand" />
                      <span className="text-xs font-black uppercase tracking-widest text-slate-500">
                        FEATURED ARTICLE
                      </span>
                    </div>

                    <div className="group relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-xl transition-all duration-300 hover:border-brand/40 hover:shadow-2xl">
                      <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                        <img
                          src={featuredPost.featuredImage || DEFAULT_FALLBACK_IMAGE}
                          alt={featuredPost.title}
                          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
                        
                        <div className="absolute top-5 left-5">
                          <span className="inline-block rounded-full bg-brand px-4 py-1.5 text-xs font-extrabold text-white uppercase tracking-wider shadow-md">
                            {featuredPost.category}
                          </span>
                        </div>

                        <div className="absolute bottom-6 left-6 right-6 text-white hidden sm:block">
                          <div className="flex items-center gap-4 text-xs font-bold text-slate-300 mb-2">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5 text-brand" />
                              {featuredPost.publishDate}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5 text-brand" />
                              {featuredPost.readTime}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-8 sm:p-10 space-y-4">
                        <div className="sm:hidden flex items-center gap-4 text-xs font-bold text-slate-500">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-brand" />
                            {featuredPost.publishDate}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-brand" />
                            {featuredPost.readTime}
                          </span>
                        </div>

                        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-snug group-hover:text-brand transition-colors duration-300">
                          <Link to="/blog/$slug" params={{ slug: featuredPost.slug }}>
                            {featuredPost.title}
                          </Link>
                        </h2>

                        <p className="text-sm sm:text-base leading-relaxed text-slate-600 line-clamp-3 font-medium">
                          {featuredPost.excerpt}
                        </p>

                        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img
                              src={
                                featuredPost.author?.avatar ||
                                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop"
                              }
                              alt={featuredPost.author?.name || "Venus Team"}
                              className="h-10 w-10 rounded-full object-cover border border-slate-200"
                            />
                            <div>
                              <p className="text-xs font-extrabold text-slate-900">{featuredPost.author?.name || "Venus Hiring Team"}</p>
                              <p className="text-[11px] font-medium text-slate-500">{featuredPost.author?.role || "Workforce Specialist"}</p>
                            </div>
                          </div>

                          <Link
                            to="/blog/$slug"
                            params={{ slug: featuredPost.slug }}
                            className="inline-flex items-center gap-2 rounded-2xl bg-brand px-6 py-3 text-xs font-extrabold text-white shadow-brand transition-all duration-300 hover:brightness-110 hover:gap-3"
                          >
                            <span>Read Full Article</span>
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── CATEGORY FILTER BAR ── */}
                <div id="articles" className="flex items-center justify-between border-b border-slate-200 pb-4 scroll-mt-28">
                  <h3 className="font-display text-xl font-extrabold text-slate-900 tracking-tight">
                    {searchQuery || selectedCategory !== "All"
                      ? `Articles (${filteredBlogs.length})`
                      : `Latest Articles (Page ${currentPage} of ${totalPages})`}
                  </h3>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                    {categories.map((cat) => {
                      const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
                      return (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`rounded-xl px-3.5 py-1.5 text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                            isActive
                              ? "bg-brand text-white shadow-brand shadow-sm scale-[1.02]"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                          }`}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ── ARTICLE CARDS GRID ── */}
                {loading ? (
                  <div className="grid gap-8 sm:grid-cols-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="animate-pulse rounded-3xl border border-slate-200 bg-white p-6 h-96" />
                    ))}
                  </div>
                ) : paginatedBlogs.length === 0 ? (
                  <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
                    <BookOpen className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-900">No matching articles found</h3>
                    <p className="mt-2 text-sm text-slate-500 font-medium max-w-md mx-auto">
                      We couldn't find any articles matching "{searchQuery}". Try searching for terms like "executive search" or "compliance".
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("All");
                        setPage(1);
                      }}
                      className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-brand px-6 py-3 text-xs font-extrabold text-white shadow-brand transition-all hover:brightness-110 cursor-pointer"
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-8 sm:grid-cols-2">
                    {paginatedBlogs.map((post) => (
                      <article
                        key={post.id}
                        className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-xl"
                      >
                        {/* Image Thumbnail */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                          <img
                            src={post.featuredImage || DEFAULT_FALLBACK_IMAGE}
                            alt={post.title}
                            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="inline-block rounded-full bg-slate-900/90 backdrop-blur-md px-3 py-1 text-[11px] font-extrabold text-white uppercase tracking-wider shadow-sm">
                              {post.category}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                          <div>
                            <div className="flex items-center gap-3 text-xs font-bold text-slate-400 mb-3">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5 text-brand" />
                                {post.publishDate}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5 text-brand" />
                                {post.readTime}
                              </span>
                            </div>

                            <h3 className="font-display text-xl font-bold tracking-tight text-slate-900 leading-snug group-hover:text-brand transition-colors duration-200">
                              <Link to="/blog/$slug" params={{ slug: post.slug }}>
                                {post.title}
                              </Link>
                            </h3>

                            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-3 font-medium">
                              {post.excerpt}
                            </p>
                          </div>

                          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={
                                  post.author?.avatar ||
                                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop"
                                }
                                alt={post.author?.name || "Venus Team"}
                                className="h-8 w-8 rounded-full object-cover border border-slate-200"
                              />
                              <span className="text-xs font-bold text-slate-800">{post.author?.name || "Venus Hiring Team"}</span>
                            </div>

                            <Link
                              to="/blog/$slug"
                              params={{ slug: post.slug }}
                              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-brand transition-all hover:gap-2"
                            >
                              <span>Read Article</span>
                              <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}

                {/* ── REUSABLE PAGINATION BAR ── */}
                {totalPages > 1 && (
                  <div className="pt-10 flex items-center justify-center gap-2">
                    {/* Previous Button */}
                    <button
                      disabled={currentPage <= 1}
                      onClick={() => setPage(currentPage - 1)}
                      className="inline-flex items-center justify-center h-10 px-4 rounded-xl border border-slate-200 bg-white text-slate-700 font-extrabold text-xs transition-all hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-sm gap-1"
                      aria-label="Previous Page"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span>Previous</span>
                    </button>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => {
                      const isActive = currentPage === pageNum;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setPage(pageNum)}
                          className={`h-10 w-10 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                            isActive
                              ? "bg-brand text-white shadow-brand shadow-md scale-105"
                              : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 shadow-sm"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    {/* Next Button */}
                    <button
                      disabled={currentPage >= totalPages}
                      onClick={() => setPage(currentPage + 1)}
                      className="inline-flex items-center justify-center h-10 px-4 rounded-xl border border-slate-200 bg-white text-slate-700 font-extrabold text-xs transition-all hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-sm gap-1"
                      aria-label="Next Page"
                    >
                      <span>Next</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* ── RIGHT SIDEBAR WIDGET COLUMN (4 COLUMNS) ── */}
              <div className="lg:col-span-4 space-y-8 sticky top-28">
                
                {/* WIDGET 1: SEARCH BAR */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                    <Search className="h-4 w-4 text-brand" />
                    <span>Search Articles</span>
                  </h4>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search articles..."
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-4 pr-10 py-3 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all"
                    />
                    <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  </div>
                </div>

                {/* WIDGET 2: TRENDING ARTICLES */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-brand" />
                    <span>Trending Articles</span>
                  </h4>
                  <div className="space-y-4">
                    {trendingBlogs.map((b) => (
                      <div key={b.id} className="group flex items-start gap-3.5 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                        <img
                          src={b.featuredImage || DEFAULT_FALLBACK_IMAGE}
                          alt={b.title}
                          className="h-14 w-14 rounded-xl object-cover shrink-0 border border-slate-200"
                        />
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand">
                            {b.category}
                          </span>
                          <h5 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-brand transition-colors">
                            <Link to="/blog/$slug" params={{ slug: b.slug }}>
                              {b.title}
                            </Link>
                          </h5>
                          <span className="text-[10px] text-slate-400 font-medium mt-0.5 block">
                            {b.publishDate}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* WIDGET 3: STRATEGIC RECRUITMENT ADVISORY CALLOUT */}
                <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-6 text-white shadow-xl border border-slate-800">
                  <div className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-brand/20 blur-2xl" aria-hidden />

                  <div className="inline-flex items-center gap-1.5 rounded-full bg-brand/20 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-brand mb-3">
                    <PhoneCall className="h-3 w-3" />
                    <span>HIRING CONSULTATION</span>
                  </div>

                  <h4 className="font-display text-lg font-bold tracking-tight text-white">
                    Scaling Your Team Across Canada or USA?
                  </h4>
                  <p className="mt-2 text-xs text-slate-300 leading-relaxed font-medium">
                    Speak directly with our senior talent partners to receive pre-screened candidate shortlists within 12 business hours.
                  </p>

                  <div className="mt-5">
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center gap-2 w-full rounded-2xl bg-brand py-3 text-xs font-extrabold text-white shadow-brand transition-all hover:brightness-110 cursor-pointer"
                    >
                      <span>Book Advisory Call</span>
                      <ArrowRight className="h-3.5 w-3.5" />
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
