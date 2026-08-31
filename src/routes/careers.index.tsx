import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CareerHero } from "@/components/careers/CareerHero";
import { JobSearch } from "@/components/careers/JobSearch";

const TITLE = "Careers at Venus Hiring | Executive Recruitment & Workforce Opportunities";
const DESCRIPTION =
  "Join Venus Hiring and build your career with leading executive search, workforce advisory, and technology talent teams across Canada, USA & international markets.";

export const Route = createFileRoute("/careers/")({
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
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main id="main-content">
        <CareerHero />
        <JobSearch />
      </main>
      <SiteFooter />
    </div>
  );
}
