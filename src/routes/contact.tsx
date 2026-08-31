import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { ContactRedesign } from "@/components/site/ContactRedesign";
import { SiteFooter } from "@/components/site/SiteFooter";

const TITLE = "Contact Venus Consultancy | Canadian Recruitment & Workforce Advisory";
const DESCRIPTION =
  "Get in touch with Venus Consultancy for executive search, direct-hire staffing, project pods, and HR advisory across Canada and the US. 12-hour response guaranteed.";

const CONTACT_PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://www.venushiring.ca/contact#webpage",
      url: "https://www.venushiring.ca/contact",
      name: TITLE,
      description: DESCRIPTION,
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://www.venushiring.ca/#localbusiness-toronto",
      name: "Venus Consultancy - Head Office",
      url: "https://www.venushiring.ca",
      telephone: "+1-647-616-2677",
      email: "info@venushiring.ca",
      address: {
        "@type": "PostalAddress",
        streetAddress: "#205 - 1085 Bellamy Road North",
        addressLocality: "Toronto",
        addressRegion: "ON",
        postalCode: "M1H 3C7",
        addressCountry: "CA",
      },
    },
  ],
};

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(CONTACT_PAGE_SCHEMA) }}
      />
      <SiteNav />
      <main id="main-content">
        <ContactRedesign />
      </main>
      <SiteFooter />
    </div>
  );
}
