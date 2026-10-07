import { useEffect, useState } from "react";

const STORAGE_KEY = "portfolio-theme";

// Resolve the initial theme: stored preference → system preference → dark.
function getInitialTheme() {
  if (typeof window === "undefined") return "dark";

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // Storage blocked (e.g. some private modes): fall back to the system theme.
  }

  const prefersLight = window.matchMedia(
    "(prefers-color-scheme: light)"
  ).matches;
  return prefersLight ? "light" : "dark";
}

/**
 * useTheme — manages the dark/light theme.
 *
 * Applies the `.light` class to <html> (which flips the CSS variable theme),
 * keeps the native `color-scheme` in sync (for form controls/scrollbars), and
 * persists the choice to localStorage so it survives reloads.
 *
 * @returns {{ theme: "dark"|"light", toggle: () => void }}
 */
export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light", theme === "light");
    root.style.colorScheme = theme;
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Ignore: the theme still applies for this visit.
    }
  }, [theme]);

  const toggle = () =>
    setTheme((current) => (current === "dark" ? "light" : "dark"));

  return { theme, toggle };
}
