import { useCallback, useRef, useState } from "react";

/**
 * useTilt — lightweight 3D pointer-parallax tilt (no libraries).
 *
 * Tracks the cursor over an element and returns a CSS transform that rotates it
 * slightly toward the pointer, creating a subtle depth effect. Honors
 * `prefers-reduced-motion` and is a no-op on touch / when the pointer leaves.
 *
 * @param {number} max - maximum rotation in degrees on each axis.
 * @returns {{ ref, transform: string, onMouseMove, onMouseLeave }}
 */
export function useTilt(max = 8) {
  const ref = useRef(null);
  const [transform, setTransform] = useState("");

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMouseMove = useCallback(
    (event) => {
      if (prefersReducedMotion || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width; // 0 → 1 (left → right)
      const py = (event.clientY - rect.top) / rect.height; // 0 → 1 (top → bottom)

      const rotateY = (px - 0.5) * 2 * max; // turn toward horizontal cursor
      const rotateX = -(py - 0.5) * 2 * max; // tilt toward vertical cursor

      setTransform(
        `perspective(900px) rotateX(${rotateX.toFixed(
          2
        )}deg) rotateY(${rotateY.toFixed(2)}deg) scale(1.02)`
      );
    },
    [max, prefersReducedMotion]
  );

  const onMouseLeave = useCallback(() => setTransform(""), []);

  return { ref, transform, onMouseMove, onMouseLeave };
}
