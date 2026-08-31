import { createFileRoute, Outlet, useMatchRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { JobDetails } from "@/components/careers/JobDetails";
import { MOCK_JOBS } from "@/components/careers/mockJobs";

export const Route = createFileRoute("/careers/$slug")({
  head: ({ params }) => {
    const job = MOCK_JOBS.find((j) => j.slug === params.slug);
    const title = job
      ? `${job.title} | Careers at Venus Hiring`
      : "Position Not Found | Venus Hiring Careers";
    const description = job
      ? `${job.title} in ${job.location} (${job.employmentType}). ${job.description}`
      : "Explore career opportunities at Venus Hiring.";

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
  component: JobDetailPage,
});

function JobDetailPage() {
  const { slug } = Route.useParams();
  const job = MOCK_JOBS.find((j) => j.slug === slug);
  const matchRoute = useMatchRoute();
  const isApplyRoute = matchRoute({ to: "/careers/$slug/apply", fuzzy: false });

  if (isApplyRoute) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main id="main-content">
        <JobDetails job={job} />
      </main>
      <SiteFooter />
    </div>
  );
}
