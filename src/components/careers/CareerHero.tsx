import { useEffect, useState } from "react";
import heroTeamImg from "@/assets/hero-team.jpg";
import { ArrowDown } from "lucide-react";

export function CareerHero() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const nextOffset = Math.min(window.scrollY, 700) * 0.15;
        setOffset(nextOffset);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const handleScrollToPositions = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("open-positions");
    if (target) {
      const topOffset = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  return (
    <section className="relative isolate flex min-h-[100vh] w-full items-center overflow-hidden bg-ink text-left">
      {/* Full-bleed background image with subtle parallax */}
      <div
        className="absolute inset-0 -z-20 h-full w-full overflow-hidden"
        style={{ transform: `translate3d(0, ${offset}px, 0)` }}
      >
        <img
          src={heroTeamImg}
          alt="Professional recruitment and office team at Venus Hiring"
          className="h-full w-full scale-105 object-cover object-center transition-transform duration-1000 ease-out"
        />
      </div>

      {/* Dark overlay ensuring maximum contrast and legibility */}
      <div className="absolute inset-0 -z-10 bg-black/75 backdrop-blur-[1px]" aria-hidden />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-black/40 to-transparent"
        aria-hidden
      />

      {/* Main hero content container */}
      <div className="shell relative w-full py-28 sm:py-32 lg:py-36">
        <div className="max-w-4xl text-left">
          {/* Eyebrow */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-brand" aria-hidden />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
              CAREERS AT VENUS
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[5.25rem]">
            BUILD YOUR FUTURE WITH VENUS
          </h1>

          {/* Supporting Text */}
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl lg:text-2xl font-normal">
            Explore opportunities to work with talented teams and build meaningful solutions with
            Venus Hiring.
          </p>

          {/* CTA Button */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#open-positions"
              onClick={handleScrollToPositions}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-brand transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0"
            >
              EXPLORE OPEN POSITIONS
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#open-positions"
        onClick={handleScrollToPositions}
        aria-label="Scroll to Open Positions"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/60 transition-colors duration-300 hover:text-white sm:flex"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em]">Explore</span>
        <span className="relative grid h-9 w-5 place-items-start justify-center overflow-hidden rounded-full border border-white/20 pt-1.5">
          <span className="block h-1.5 w-1 animate-bounce rounded-full bg-brand" aria-hidden />
        </span>
      </a>
    </section>
  );
}
