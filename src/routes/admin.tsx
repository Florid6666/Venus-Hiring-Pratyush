import { useState } from "react";
import { createFileRoute, useNavigate, Outlet, useMatchRoute } from "@tanstack/react-router";
import { BlogAdmin } from "@/components/admin/BlogAdmin";
import { CareerAdmin } from "@/components/careers/CareerAdmin";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Sparkles, ArrowLeft, BookOpen, Briefcase } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Control Panel | Venus Consultancy" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const matchRoute = useMatchRoute();
  const isCareersSubRoute = matchRoute({ to: "/admin/careers" });
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminTab, setAdminTab] = useState<"blog" | "careers">("careers");
  const navigate = useNavigate();

  // If visiting /admin/careers subroute, delegate rendering to child route component
  if (isCareersSubRoute) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      {/* Main Admin Page Container */}
      <main className="shell min-h-[80vh] pt-32 pb-16">
        <div className="mx-auto max-w-6xl space-y-10">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/80 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand mb-2">
                <Sparkles className="h-3.5 w-3.5" />
                VENUS EXECUTIVE ADMIN
              </div>
              <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl tracking-tight">
                Control & Management System
              </h1>
            </div>

            <button
              type="button"
              onClick={() => navigate({ to: "/" })}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-xs font-bold text-foreground hover:bg-accent transition-colors shadow-soft"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Website
            </button>
          </div>

          {/* Module Selector Tabs */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setAdminTab("careers");
                setIsAdminOpen(false);
              }}
              className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 text-xs font-bold transition-all cursor-pointer ${
                adminTab === "careers"
                  ? "bg-brand text-white shadow-brand"
                  : "bg-porcelain text-foreground hover:bg-accent border border-border/60"
              }`}
            >
              <Briefcase className="h-4 w-4" />
              Career Panel Management
            </button>

            <button
              type="button"
              onClick={() => {
                setAdminTab("blog");
                setIsAdminOpen(true);
              }}
              className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 text-xs font-bold transition-all cursor-pointer ${
                adminTab === "blog"
                  ? "bg-brand text-white shadow-brand"
                  : "bg-porcelain text-foreground hover:bg-accent border border-border/60"
              }`}
            >
              <BookOpen className="h-4 w-4" />
              Blog CMS Management
            </button>
          </div>

          {/* Module Content */}
          {adminTab === "careers" && <CareerAdmin />}

          {adminTab === "blog" && (
            <div className="rounded-2xl border border-border/80 bg-card p-8 shadow-soft text-center space-y-4 py-16">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand border border-brand/20">
                <BookOpen className="h-7 w-7" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">Blog & Content Management System</h2>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Create, edit, delete recruitment articles, manage SEO meta tags, and configure categories.
              </p>
              <button
                type="button"
                onClick={() => setIsAdminOpen(true)}
                className="rounded-full bg-brand px-6 py-3 text-xs font-bold text-white shadow-brand hover:brightness-110 transition-all"
              >
                Open Blog Admin Panel →
              </button>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />

      {/* Existing Blog Admin Modal - Only rendered when on blog tab and explicitly opened */}
      {adminTab === "blog" && isAdminOpen && (
        <BlogAdmin isOpen={true} onClose={() => setIsAdminOpen(false)} />
      )}
    </div>
  );
}
