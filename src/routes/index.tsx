import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { Hero } from "@/components/site/Hero";
import {
  TrustedStrip,
  WhoWeServe,
  Services,
  Industries,
  Process,
  Stats,
  BlogCarousel,
  PortfolioShowcase,
} from "@/components/site/Sections";
import { Testimonials, Faq, CtaBanner } from "@/components/site/Social";
import { SiteFooter } from "@/components/site/SiteFooter";

const TITLE = "Venus Consultancy | Recruitment & Staffing Across Canada";
const DESCRIPTION =
  "Venus Consultancy unites technology, talent and opportunity — permanent, contract and executive recruitment plus HR advisory for Canadian employers and professionals.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://www.venushiring.ca/#localbusiness-toronto",
      name: "Venus Consultancy - Toronto Office",
      url: "https://www.venushiring.ca",
      telephone: "+1-647-616-2677",
      address: {
        "@type": "PostalAddress",
        streetAddress: "#205 - 1085 Bellamy Road North",
        addressLocality: "Toronto",
        addressRegion: "ON",
        postalCode: "M1H 3C7",
        addressCountry: "CA",
      },
      priceRange: "$$",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.venushiring.ca/#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.venushiring.ca",
        },
      ],
    },
  ],
};

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA) }}
      />
      <SiteNav />
      <main id="main-content">
        <Hero />
        <TrustedStrip />
        <WhoWeServe />
        <Services />
        <PortfolioShowcase />
        <Industries />
        <Process />
        <Stats />
        <Testimonials />
        <BlogCarousel />
        <Faq />
        <CtaBanner />
      </main>
      <SiteFooter />
    </div>
  );
}
