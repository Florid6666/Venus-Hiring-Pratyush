import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/use-reveal";

interface ShowcaseItem {
  id: string;
  title: string;
  copy: string;
  image: string;
  category: string;
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "vetted-before-you-meet",
    title: "Vetted before you meet them",
    copy: "Structured screening, skills assessment and reference depth — shortlists average three candidates, not thirty.",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=1100&fit=crop&auto=format",
    category: "Screening & Quality",
  },
  {
    id: "canadian-market-fluency",
    title: "Canadian market fluency",
    copy: "Provincial compliance, PR and work-permit pathways, and salary benchmarking across every major Canadian metro.",
    image:
      "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&h=1100&fit=crop&auto=format",
    category: "Local Expertise",
  },
  {
    id: "global-sourcing-reach",
    title: "Global sourcing reach",
    copy: "Teams in Toronto, Michigan and India give you round-the-clock sourcing and access to international professionals.",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=1100&fit=crop&auto=format",
    category: "Sourcing & Reach",
  },
  {
    id: "accountable-partnership",
    title: "Accountable partnership",
    copy: "Weekly pipeline reporting, a named consultant and replacement guarantees written into every engagement.",
    image:
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=1100&fit=crop&auto=format",
    category: "Partnership & SLAs",
  },
];

export function PortfolioShowcase() {
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <section
      id="portfolio-showcase"
      className="relative overflow-hidden bg-white pt-24 sm:pt-28 pb-20 sm:pb-28 lg:pb-32 font-sans"
    >
      {/* Section Header */}
      <div className="shell mb-14 sm:mb-16 text-left">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
          Recruitment that behaves like an in-house team
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
          We embed with your hiring managers, run a disciplined process, and stay accountable to the same metrics you are.
        </p>
      </div>

      {/* Full-Screen Edge-to-Edge 4-Column Grid (Zero Borders, Zero Gaps) */}
      <div
        ref={ref}
        className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 p-0 m-0 border-0"
      >
        {SHOWCASE_ITEMS.map((item, index) => (
          <div
            key={item.id}
            tabIndex={0}
            className={cn(
              "group relative isolate flex flex-col justify-end overflow-hidden bg-slate-950 rounded-none border-0",
              "aspect-[3/4] min-h-[460px] w-full cursor-pointer select-none",
              "transition-all duration-500 ease-out focus:outline-none",
              "reveal-item",
              shown && "is-shown",
            )}
            style={{
              transitionDelay: `${index * 60}ms`,
            }}
          >
            {/* Full Background Imagery */}
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              width={800}
              height={1100}
              className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />

            {/* Base Dark Overlay */}
            <div
              className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent transition-opacity duration-300"
              aria-hidden
            />

            {/* ------------------------------------------------------------- */}
            {/* DEFAULT STATE: Bright Blue Banner (Pinned Bottom, No Borders) */}
            {/* ------------------------------------------------------------- */}
            <div className="absolute bottom-0 inset-x-0 z-20 flex items-center px-6 py-4 bg-brand rounded-none border-0 transition-all duration-300 ease-in-out group-hover:opacity-0 group-hover:pointer-events-none group-focus-within:opacity-0">
              <span className="font-bold text-white text-base sm:text-lg tracking-tight truncate">
                {item.title}
              </span>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* HOVER / FOCUS STATE: Slide-Up Dark Container (No Borders)     */}
            {/* ------------------------------------------------------------- */}
            <div className="absolute inset-x-0 bottom-0 z-30 transform translate-y-full opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <div className="bg-ink/95 p-6 sm:p-7 backdrop-blur-md border-0 rounded-none">
                {/* Title */}
                <h3 className="text-xl font-bold tracking-tight text-white mb-2.5">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-slate-300">
                  {item.copy}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
