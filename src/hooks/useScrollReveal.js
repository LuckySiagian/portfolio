import { useEffect } from "react";

const SELECTOR = "[data-reveal], [data-reveal-left], [data-reveal-right], [data-reveal-zoom]";

/**
 * Fades sections in as they enter the viewport.
 * Skipped entirely for reduced-motion users or browsers without
 * IntersectionObserver — in that case content is simply shown.
 */
export function useScrollReveal() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) return;

    const root = document.documentElement;
    root.classList.add("js-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active");
            observer.unobserve(entry.target);
          }
        });
      },
      // threshold 0: tall cards (e.g. projects on mobile) reveal as soon as they peek in.
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0 }
    );

    document.querySelectorAll(SELECTOR).forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      root.classList.remove("js-reveal");
    };
  }, []);
}
