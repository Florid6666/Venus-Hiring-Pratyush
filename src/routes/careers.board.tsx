import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import CareersBoardPage, { CareersBoard } from "@/components/careers/CareersBoard";

const TITLE = "Careers Board | Venus Global Tech";
const DESCRIPTION =
  "Browse open positions and career opportunities with Venus Global Tech & Venus Hiring.";

export const Route = createFileRoute("/careers/board")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
    ],
  }),
  component: CareersBoardRouteView,
});

function CareersBoardRouteView() {
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
