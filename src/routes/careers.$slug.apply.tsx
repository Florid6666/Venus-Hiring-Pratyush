import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ApplicationForm } from "@/components/careers/ApplicationForm";
import { MOCK_JOBS } from "@/components/careers/mockJobs";

export const Route = createFileRoute("/careers/$slug/apply")({
  head: ({ params }) => {
    const job = MOCK_JOBS.find((j) => j.slug === params.slug);
    const title = job
      ? `Apply for ${job.title} | Venus Hiring Careers`
      : "Application Form | Venus Hiring Careers";
    const description = job
      ? `Submit your application for the ${job.title} position in ${job.location}.`
      : "Submit your application to Venus Hiring.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
      ],
    };
  },
  component: ApplicationPage,
});

function ApplicationPage() {
  const { slug } = Route.useParams();
  const job = MOCK_JOBS.find((j) => j.slug === slug);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main id="main-content">
        <ApplicationForm job={job} />
      </main>
      <SiteFooter />
    </div>
  );
}
