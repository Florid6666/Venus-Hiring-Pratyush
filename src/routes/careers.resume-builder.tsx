import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ResumeBuilder } from "@/components/careers/ResumeBuilder";

const TITLE = "Interactive Executive Resume Builder | Venus Hiring";
const DESCRIPTION =
  "Build a clean, executive CV in minutes with Venus Hiring interactive Resume Builder.";

export const Route = createFileRoute("/careers/resume-builder")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ResumeBuilderPage,
});

function ResumeBuilderPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main id="main-content">
        <ResumeBuilder />
      </main>
      <SiteFooter />
    </div>
  );
}
