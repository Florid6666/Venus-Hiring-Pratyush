import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, X } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { GALLERY_ITEMS, type GalleryItem } from "@/data/galleryData";

const TITLE = "Gallery | Venus Hiring";
const DESCRIPTION =
  "Explore Venus Hiring's gallery showcasing our events, diplomatic meetings, team activities, and professional networking experiences across North America.";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
    ],
  }),
  component: GalleryPage,
});

// Premium corporate networking hero background
const HERO_BG_IMAGE =
  "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2070&auto=format&fit=crop";

function GalleryPage() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedItem(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedItem]);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-red-500 selection:text-white">
      <SiteNav />

      <main className="overflow-x-hidden">
        {/* HERO SECTION (Preserved Exactly As Designed) */}
        <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 text-white overflow-hidden bg-slate-950">
          {/* Background Corporate Event Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={HERO_BG_IMAGE}
              alt="Venus Hiring Corporate Events & Networking"
              className="w-full h-full object-cover object-center opacity-35 filter brightness-90 contrast-110"
            />
            {/* Multi-layered Dark Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-transparent to-slate-950/90" />
          </div>

          {/* Red Accent Orbs */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/20 blur-[140px] rounded-full pointer-events-none z-0" />

          {/* Hero Main Content Box */}
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            {/* Breadcrumb Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-medium text-slate-300 mb-8 shadow-lg">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-red-400 font-semibold">Gallery</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-none">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-amber-300">Gallery</span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-3xl mx-auto text-lg sm:text-xl text-slate-200 font-normal leading-relaxed mb-6">
              Capturing moments from our events, collaborations, and professional networking experiences.
            </p>
          </div>
        </section>

        {/* LARGE CARD FULL-WIDTH GALLERY GRID SECTION */}
        <section className="py-12 md:py-16 bg-white">
          <div className="shell">
            
            {/* 3 Columns Grid: Larger Cards filling the viewport */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
              {GALLERY_ITEMS.map((item) => (
                <GalleryCard key={item.id} item={item} onSelect={() => setSelectedItem(item)} />
              ))}
            </div>

          </div>
        </section>
      </main>

      {/* Lightbox Modal (For Viewing Original Full High-Res Photo & Details) */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative w-full max-w-5xl max-h-[90vh] bg-white text-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col md:flex-row animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/70 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-lg"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Side */}
            <div className="relative md:w-3/5 bg-black flex items-center justify-center min-h-[320px] md:min-h-[500px]">
              <img
                src={selectedItem.image}
                alt={selectedItem.eventName}
                className="w-full h-full object-contain max-h-[60vh] md:max-h-[80vh]"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/venuslogo.png";
                  target.className = "w-32 h-32 object-contain p-4";
                }}
              />
            </div>

            {/* Modal Content Side */}
            <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[400px] md:max-h-none bg-white">
              <div>
                {selectedItem.category && (
                  <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 border border-red-100 rounded-full mb-3">
                    {selectedItem.category}
                  </span>
                )}

                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-4 leading-tight">
                  {selectedItem.eventName}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {selectedItem.description}
                </p>

                {selectedItem.attendees && (
                  <div className="p-4 rounded-xl bg-slate-100 border-l-4 border-slate-900 mb-6">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                      Meeting Details:
                    </h4>
                    <p className="text-xs text-slate-700 leading-normal">
                      {selectedItem.attendees}
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span>Venus Consultancy Gallery</span>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}

// LARGE EXPANDED GALLERY CARD COMPONENT (Edge-to-Edge Full Image Coverage)
function GalleryCard({ item, onSelect }: { item: GalleryItem; onSelect: () => void }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      onClick={onSelect}
      className="group relative rounded-2xl overflow-hidden bg-slate-950 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer border border-slate-200/80 w-full aspect-[4/3]"
    >
      <div className="relative w-full h-full overflow-hidden bg-slate-950">
        <img
          src={imageError ? "/venuslogo.png" : item.image}
          alt={item.eventName}
          loading="lazy"
          onError={() => setImageError(true)}
          className={`w-full h-full object-cover ${item.objectPosition || "object-top"} transition-transform duration-500 group-hover:scale-105 ${
            imageError ? "p-8 object-contain opacity-50 bg-slate-900" : ""
          }`}
        />

        {/* Dark Gradient Overlay at the Bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Card Content: Red Category Label + White Title Text */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7 z-10 text-white pointer-events-none">
          {item.category && (
            <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-red-500 mb-1.5">
              {item.category}
            </span>
          )}

          <h3 className="text-lg sm:text-xl font-bold leading-snug text-white line-clamp-2">
            {item.eventName}
          </h3>
        </div>
      </div>
    </div>
  );
}
