/**
 * Fast, 60fps smooth scrolling to sections without main-thread jank or lag
 */
export function scrollToSection(
  targetId: string,
  options?: {
    offset?: number;
    onComplete?: () => void;
  },
) {
  let targetY = 0;
  if (targetId !== "top") {
    const element = document.getElementById(targetId);
    if (!element) return;
    const offset = options?.offset ?? 75;
    targetY = Math.max(0, element.getBoundingClientRect().top + window.scrollY - offset);
  }

  // Use native smooth scrolling for hardware-accelerated, lag-free navigation
  window.scrollTo({
    top: targetY,
    behavior: "smooth",
  });

  if (options?.onComplete) {
    setTimeout(options.onComplete, 400);
  }
}
