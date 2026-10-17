import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CareerHero } from "@/components/careers/CareerHero";
import CareersBoardPage, { CareersBoard } from "@/components/careers/CareersBoard";

const TITLE = "Careers at Venus Hiring | Executive Recruitment & Workforce Opportunities";
const DESCRIPTION =
  "Join Venus Hiring and build your career with leading executive search, workforce advisory, and technology talent teams across Canada, USA & international markets.";

interface CareersSearch {
  view?: string;
}

export const Route = createFileRoute("/careers/")({
  validateSearch: (search: Record<string, unknown>): CareersSearch => ({
    view: typeof search.view === "string" ? search.view : undefined,
  }),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
    ],
  }),
  component: CareersLandingPage,
});

function CareersLandingPage() {
  const { view } = Route.useSearch();

  // If view=embed is requested, render just the clean standalone iframe
  if (view === "embed") {
    return <CareersBoardPage />;
  }

  // If view=board is requested, render the board directly with website navigation
  if (view === "board") {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-between">
        <SiteNav />
        <main id="main-content" className="pt-20 sm:pt-24 flex-1">
          <div className="shell py-6">
            <CareersBoard showToolbar={true} fullHeight={false} />
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main id="main-content">
        <CareerHero />
        <section id="open-positions" className="section-padding bg-porcelain/50 py-16 sm:py-24">
          <div className="shell">
            <div className="mx-auto max-w-3xl text-center mb-10 sm:mb-14">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-brand-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                LIVE TALENT PIPELINE
              </div>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                OPEN POSITIONS
              </h2>
              <p className="mt-4 text-base text-muted-foreground sm:text-lg">
                Discover roles and apply directly through our real-time Venus CRM recruitment
                engine.
              </p>
            </div>

            <CareersBoard showToolbar={true} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
