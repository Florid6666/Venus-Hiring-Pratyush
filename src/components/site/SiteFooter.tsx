import { Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/venus-logo.png";

const OFFICES = [
  {
    flag: "🇨🇦",
    city: "Toronto, Canada",
    address: "#205 - 1085 Bellamy Road North, Toronto, ON",
    phones: ["647-616-2677"],
    email: "info@venushiring.ca",
  },
  {
    flag: "🇺🇸",
    city: "Michigan, USA",
    address: "880 W Long Lake Rd Ste 225 | Troy, MI 48098",
    phones: ["248-275-1077", "718-715-0770"],
    email: "info@venushiring.com",
  },
  {
    flag: "🇮🇳",
    city: "India",
    address: "Mumbai, Surat, Chennai, Hyderabad",
    phones: ["+91-261-2601177", "+91-261-391177"],
    email: null,
  },
];

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Careers", href: "/careers" },
  { label: "Blog Insights", href: "/blog" },
  { label: "Salary Calculator", href: "/salary-calculator" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const CONNECT_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/venushiring" },
  { label: "Facebook", href: "https://www.facebook.com/venushiring" },
  { label: "Instagram", href: "https://www.instagram.com/venushiring" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "https://www.venushiring.ca/privacy-policy" },
  { label: "Terms of Service", href: "https://www.venushiring.ca/terms" },
  { label: "Disclaimer", href: "https://www.venushiring.ca/disclaimer" },
  { label: "HTML Sitemap & Index", href: "/sitemap" },
];

export function SiteFooter() {
  return (
    <>
      {/* ── Office Locations Section (Website Deep Navy Blue Theme) ── */}
      <section
        className="relative isolate overflow-hidden bg-ink section-padding"
        aria-label="Office locations"
      >
        <div
          className="pointer-events-none absolute inset-0 -z-10 dot-grid opacity-[0.15]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-32 top-1/2 -z-10 h-80 w-80 -translate-y-1/2 rounded-full bg-brand/20 blur-[130px]"
          aria-hidden
        />

        <div className="shell relative">
          <h2 className="text-center text-3xl font-bold tracking-tight text-ink-foreground sm:text-4xl">
            Our Office Locations
          </h2>
          <p className="mt-3 text-center text-base text-ink-foreground/70">
            Connect with us across multiple locations worldwide
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {OFFICES.map((o) => (
              <div
                key={o.city}
                className="group flex flex-col gap-5 rounded-2xl glass-ink p-7 border border-ink-line transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-brand/50 hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]"
              >
                {/* Header */}
                <div className="flex items-center gap-3">
                  <span className="text-2xl leading-none">{o.flag}</span>
                  <h3 className="text-base font-bold text-ink-foreground">{o.city}</h3>
                </div>

                {/* Address */}
                <p className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-foreground/75">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                  {o.address}
                </p>

                {/* Phones */}
                <div className="space-y-2">
                  {o.phones.map((ph) => (
                    <a
                      key={ph}
                      href={`tel:${ph.replace(/\D/g, "")}`}
                      className="flex items-center gap-2.5 text-sm text-ink-foreground/75 transition-colors duration-300 hover:text-brand"
                    >
                      <Phone className="h-4 w-4 shrink-0 text-brand" aria-hidden />
                      {ph}
                    </a>
                  ))}
                </div>

                {/* Email */}
                {o.email && (
                  <a
                    href={`mailto:${o.email}`}
                    className="flex items-center gap-2.5 text-sm text-ink-foreground/75 transition-colors duration-300 hover:text-brand"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-brand" aria-hidden />
                    {o.email}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Light Footer (With Website Navy & Brand Colors) ── */}
      <footer className="bg-porcelain border-t border-ink/10">
        <div className="shell py-16">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Quick Links */}
            <nav aria-label="Quick Links">
              <h3 className="text-sm font-bold text-ink">Quick Links</h3>
              <ul className="mt-5 flex flex-col gap-3">
                {QUICK_LINKS.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-ink/70 transition-colors duration-200 hover:text-brand"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Connect */}
            <nav aria-label="Connect">
              <h3 className="text-sm font-bold text-ink">Connect</h3>
              <ul className="mt-5 flex flex-col gap-3">
                {CONNECT_LINKS.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-ink/70 transition-colors duration-200 hover:text-brand"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Legal */}
            <nav aria-label="Legal">
              <h3 className="text-sm font-bold text-ink">Legal</h3>
              <ul className="mt-5 flex flex-col gap-3">
                {LEGAL_LINKS.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-ink/70 transition-colors duration-200 hover:text-brand"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact */}
            <div>
              <h3 className="text-sm font-bold text-ink">Contact</h3>
              <div className="mt-5 space-y-1">
                <p className="text-sm font-semibold text-ink">Toronto Office</p>
                <p className="text-sm text-ink/70">#205 - 1085 Bellamy Road North</p>
                <p className="text-sm text-ink/70">Toronto, ON, Canada</p>
              </div>
              <div className="mt-4 space-y-1">
                <p className="text-sm font-semibold text-ink">Email</p>
                <a
                  href="mailto:info@venushiring.com"
                  className="text-sm text-ink/70 transition-colors hover:text-brand"
                >
                  info@venushiring.com
                </a>
              </div>
              <div className="mt-4 space-y-1">
                <p className="text-sm font-semibold text-ink">Phone</p>
                <a
                  href="tel:6476162677"
                  className="text-sm text-ink/70 transition-colors hover:text-brand"
                >
                  647-616-2677
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-ink/10">
          <div className="shell flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src={logo}
                alt="Venus Consultancy"
                width={28}
                height={28}
                className="h-7 w-7 rounded bg-ink object-contain p-0.5"
              />
              <span className="text-sm font-semibold text-ink">Venus Consultancy</span>
            </div>
            <p className="text-xs text-ink/60">
              © {new Date().getFullYear()} Venus Consultancy. All rights reserved.
            </p>
            <p className="text-xs text-ink/60">Toronto · Troy · Mumbai</p>
          </div>
        </div>
      </footer>
    </>
  );
}
