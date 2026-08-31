import { MapPin, Phone, ExternalLink, Globe2 } from "lucide-react";

export interface OfficeLocation {
  city: string;
  country: string;
  address: string;
  phone: string;
  phoneRaw: string;
  mapUrl: string;
  isHeadquarters?: boolean;
}

export const GLOBAL_OFFICES: OfficeLocation[] = [
  {
    city: "Toronto",
    country: "Canada (Headquarters)",
    address: "#205 - 1085 Bellamy Road North, Toronto, ON M1H 3C7",
    phone: "+1 (647) 616-2677",
    phoneRaw: "+16476162677",
    mapUrl: "https://maps.google.com/?q=1085+Bellamy+Road+North+Toronto+ON",
    isHeadquarters: true,
  },
  {
    city: "Troy",
    country: "Michigan, USA",
    address: "755 W Big Beaver Rd #2020, Troy, MI 48084",
    phone: "+1 (248) 275-1077",
    phoneRaw: "+12482751077",
    mapUrl: "https://maps.google.com/?q=755+W+Big+Beaver+Rd+Troy+MI",
  },
  {
    city: "Vadodara",
    country: "India",
    address: "4th Floor, Venus Heights, Race Course Road, Vadodara, Gujarat 390007",
    phone: "+91 (265) 234-5678",
    phoneRaw: "+912652345678",
    mapUrl: "https://maps.google.com/?q=Race+Course+Road+Vadodara+Gujarat",
  },
];

export function GlobalPresence() {
  return (
    <section className="border-t border-border bg-card/60 section-padding py-16">
      <div className="shell space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 border border-brand/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand">
            <Globe2 className="h-3.5 w-3.5" /> Venus Hiring Operations
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
            Our Global Recruitment Network
          </h2>
          <p className="text-sm text-muted-foreground">
            Delivering executive search, technology recruitment, and cross-border staffing across Canada, USA, and India.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GLOBAL_OFFICES.map((office) => (
            <div
              key={office.city}
              className="relative flex flex-col justify-between rounded-2xl border border-border/80 bg-background p-6 shadow-sm transition-all hover:border-brand/40 hover:shadow-md"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                      {office.city}
                    </h3>
                    <p className="text-xs font-semibold text-brand">{office.country}</p>
                  </div>
                  {office.isHeadquarters && (
                    <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                      HQ
                    </span>
                  )}
                </div>

                <div className="space-y-2.5 text-xs text-muted-foreground pt-2 border-t border-border/60">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                    <span>{office.address}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Phone className="h-4 w-4 text-brand shrink-0" />
                    <a
                      href={`tel:${office.phoneRaw}`}
                      className="font-semibold text-foreground hover:text-brand transition-colors"
                    >
                      {office.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border/60">
                <a
                  href={office.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:underline"
                >
                  Get Directions <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
