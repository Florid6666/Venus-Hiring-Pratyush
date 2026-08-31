import { createFileRoute } from "@tanstack/react-router";
import { SERVICES_DATA } from "@/lib/services-store";
import { INDUSTRIES_DATA } from "@/lib/industries-store";
import { INITIAL_BLOGS } from "@/lib/blog-store";
import { MOCK_JOBS } from "@/components/careers/mockJobs";

const BASE_URL = "https://www.venushiring.ca";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const today = new Date().toISOString().split("T")[0];

        const coreEntries: SitemapEntry[] = [
          { path: "/", changefreq: "daily", priority: "1.0", lastmod: today },
          { path: "/services", changefreq: "weekly", priority: "0.9", lastmod: today },
          { path: "/industries", changefreq: "weekly", priority: "0.9", lastmod: today },
          { path: "/careers", changefreq: "daily", priority: "0.9", lastmod: today },
          { path: "/blog", changefreq: "daily", priority: "0.9", lastmod: today },
          { path: "/contact", changefreq: "monthly", priority: "0.8", lastmod: today },
          { path: "/faq", changefreq: "monthly", priority: "0.8", lastmod: today },
          { path: "/gallery", changefreq: "monthly", priority: "0.7", lastmod: today },
          { path: "/sitemap", changefreq: "weekly", priority: "0.8", lastmod: today },
          { path: "/salary-calculator", changefreq: "monthly", priority: "0.8", lastmod: today },
          { path: "/salary-check", changefreq: "monthly", priority: "0.8", lastmod: today },
          { path: "/salary-2", changefreq: "monthly", priority: "0.7", lastmod: today },
          { path: "/ai-assistant", changefreq: "monthly", priority: "0.8", lastmod: today },
          { path: "/careers/resume-builder", changefreq: "monthly", priority: "0.8", lastmod: today },
        ];

        const serviceEntries: SitemapEntry[] = Object.keys(SERVICES_DATA).map((slug) => ({
          path: `/services/${slug}`,
          changefreq: "weekly",
          priority: "0.9",
          lastmod: today,
        }));

        const industryEntries: SitemapEntry[] = Object.keys(INDUSTRIES_DATA).map((slug) => ({
          path: `/industries/${slug}`,
          changefreq: "weekly",
          priority: "0.8",
          lastmod: today,
        }));

        const jobEntries: SitemapEntry[] = MOCK_JOBS.map((job) => ({
          path: `/careers/${job.slug}`,
          changefreq: "weekly",
          priority: "0.8",
          lastmod: today,
        }));

        const blogEntries: SitemapEntry[] = INITIAL_BLOGS.map((blog) => ({
          path: `/blog/${blog.slug}`,
          changefreq: "monthly",
          priority: "0.8",
          lastmod: today,
        }));

        const allEntries: SitemapEntry[] = [
          ...coreEntries,
          ...serviceEntries,
          ...industryEntries,
          ...jobEntries,
          ...blogEntries,
        ];

        const urls = allEntries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=UTF-8",
            "Cache-Control": "public, max-age=3600, s-maxage=86400",
          },
        });
      },
    },
  },
});
