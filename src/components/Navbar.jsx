import { useEffect, useMemo, useState } from "react";
import { navLinks } from "../data/portfolio.js";
import { usePortfolio } from "../context/PortfolioContext.jsx";
import { useScrollSpy } from "../hooks/useScrollSpy.js";
import ThemeToggle from "./ui/ThemeToggle.jsx";
import { DownloadIcon } from "./ui/Icons.jsx";

export default function Navbar({ theme, onToggleTheme }) {
  const { profile, hasResume } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const sectionIds = useMemo(
    () => navLinks.map((link) => link.href.replace("#", "")),
    []
  );
  const activeId = useScrollSpy(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu with Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handleNavigate = () => setOpen(false);
  const isActive = (href) => {
    if (href === "#top" && (!activeId || activeId === "top")) return true;
    return href === `#${activeId}`;
  };

  const initials = profile.initials || profile.name?.split(" ").map(n => n[0]).join("").slice(0, 2) || "LL";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-line bg-canvas/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        {/* Brand Logo */}
        <a
          href="#top"
          className="flex items-center gap-3 group rounded-lg"
          aria-label={`${profile.name} — back to top`}
        >
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-cyan to-violet font-display text-sm font-bold text-canvas transition-transform group-hover:scale-110">
            {initials}
          </span>
          <span className="hidden font-display text-sm font-semibold text-ink sm:block">
            {profile.name}
          </span>
        </a>

        {/* Desktop links + CV + Theme Toggle */}
        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-5 lg:gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive(link.href) ? "true" : undefined}
                  className={`font-mono text-sm transition-colors duration-200 hover:text-cyan ${
                    isActive(link.href) ? "text-cyan font-bold" : "text-muted"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {hasResume && (
            <a
              href={profile.resumeUrl}
              download
              className="hidden lg:inline-flex items-center gap-1.5 rounded-md border border-cyan/40 bg-cyan/10 px-3 py-1.5 font-mono text-xs font-semibold text-cyan hover:bg-cyan/20 transition-colors"
            >
              <DownloadIcon className="h-3.5 w-3.5" />
              <span>CV</span>
            </a>
          )}

          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>

        {/* Mobile: Theme + Menu Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-line text-lg text-ink transition-colors hover:border-cyan/50"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span aria-hidden="true">{open ? "✕" : "≡"}</span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <ul
          id="mobile-menu"
          className="space-y-1 border-t border-line bg-canvas/95 px-5 py-4 backdrop-blur-md md:hidden"
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={handleNavigate}
                aria-current={isActive(link.href) ? "true" : undefined}
                className={`block rounded-lg px-3 py-3 font-mono text-sm transition-colors hover:bg-surface-2 hover:text-cyan ${
                  isActive(link.href) ? "bg-surface-2 text-cyan font-bold" : "text-muted"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          {hasResume && (
            <li>
              <a
                href={profile.resumeUrl}
                download
                onClick={handleNavigate}
                className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-cyan/10 border border-cyan/30 px-3 py-3 font-mono text-sm font-bold text-cyan transition-colors hover:bg-cyan/20"
              >
                <DownloadIcon />
                Download CV
              </a>
            </li>
          )}
        </ul>
      )}
    </header>
  );
}
