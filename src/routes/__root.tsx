import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";
import { VenusAiLauncher } from "@/components/site/VenusAiLauncher";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.venushiring.ca/#organization",
      name: "Venus Consultancy",
      alternateName: "Venus Hiring",
      url: "https://www.venushiring.ca",
      logo: "https://www.venushiring.ca/favicon.ico",
      description:
        "Enterprise recruitment, staffing, executive search, and HR advisory across Canada, USA, and India.",
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+1-647-616-2677",
          contactType: "customer service",
          areaServed: "CA",
          availableLanguage: "English",
        },
        {
          "@type": "ContactPoint",
          telephone: "+1-248-275-1077",
          contactType: "customer service",
          areaServed: "US",
          availableLanguage: "English",
        },
      ],
      sameAs: [
        "https://www.linkedin.com/company/venushiring",
        "https://www.facebook.com/venushiring",
        "https://www.instagram.com/venushiring",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.venushiring.ca/#website",
      url: "https://www.venushiring.ca",
      name: "Venus Consultancy",
      publisher: {
        "@id": "https://www.venushiring.ca/#organization",
      },
    },
  ],
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Venus Consultancy | Recruitment & Staffing Across Canada" },
      {
        name: "description",
        content:
          "Venus Consultancy unites technology, talent and opportunity — permanent, contract and executive recruitment plus HR advisory for Canadian employers and professionals.",
      },
      { name: "author", content: "Venus Consultancy" },
      { name: "robots", content: "index, follow" },
      { property: "og:site_name", content: "Venus Consultancy" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.venushiring.ca/" },
      { property: "og:title", content: "Venus Consultancy | Recruitment & Staffing Across Canada" },
      {
        property: "og:description",
        content:
          "Venus Consultancy unites technology, talent and opportunity — permanent, contract and executive recruitment plus HR advisory for Canadian employers and professionals.",
      },
      { property: "og:locale", content: "en_CA" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@venushiring" },
      {
        name: "twitter:title",
        content: "Venus Consultancy | Recruitment & Staffing Across Canada",
      },
      {
        name: "twitter:description",
        content:
          "Venus Consultancy unites technology, talent and opportunity — permanent, contract and executive recruitment plus HR advisory for Canadian employers and professionals.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://www.venushiring.ca/" },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter+Tight:wght@500;600;700&display=swap",
      },
      { rel: "icon", href: "/images/venus_logo.png", type: "image/png" },
      { rel: "shortcut icon", href: "/images/venus_logo.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/images/venus_logo.png" },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <VenusAiLauncher />
    </QueryClientProvider>
  );
}
