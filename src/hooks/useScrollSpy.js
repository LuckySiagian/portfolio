import { useEffect, useState } from "react";

/**
 * useScrollSpy — returns the id of the section currently in view.
 *
 * Uses a single IntersectionObserver (efficient, no scroll-event spam).
 * The rootMargin shrinks the viewport's active band toward the middle so a
 * section is considered "active" when it occupies the center of the screen.
 *
 * @param {string[]} ids - section ids to observe, in document order.
 * @returns {string} the active section id ("" until the first match).
 */
export function useScrollSpy(ids) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) setActiveId(visible[0].target.id);
      },
      {
        // Active band ≈ middle 5% of the viewport height.
        rootMargin: "-45% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
    // Re-run only when the set of ids changes.
  }, [ids.join(",")]);

  return activeId;
}
