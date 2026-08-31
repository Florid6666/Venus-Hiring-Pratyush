import { useEffect, useRef, useState } from "react";

/** Reveals an element once it scrolls into view with safety fallback. */
export function useReveal<T extends HTMLElement = HTMLDivElement>(rootMargin = "100px 0px 50px 0px") {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      setShown(true);
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    // Safety fallback: auto-reveal after short timeout so content is never hidden if user scrolls fast or observer is delayed
    const safetyTimer = setTimeout(() => {
      setShown(true);
    }, 450);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
            clearTimeout(safetyTimer);
          }
        }
      },
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      clearTimeout(safetyTimer);
    };
  }, [rootMargin]);

  return { ref, shown };
}
