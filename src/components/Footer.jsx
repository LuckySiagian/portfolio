import React from "react";
import { navLinks } from "../data/portfolio.js";
import { usePortfolio } from "../context/PortfolioContext.jsx";

export default function Footer() {
  const { profile } = usePortfolio();
  const year = new Date().getFullYear();
  const initials = profile.initials || profile.name?.split(" ").map(n => n[0]).join("").slice(0, 2) || "LL";

  return (
    <footer className="border-t border-line px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-cyan to-violet font-display text-xs font-bold text-canvas" aria-hidden="true">
            {initials}
          </span>
          <p className="text-sm text-muted">
            © {year} {profile.name} · Built with React, Vite &amp; Tailwind CSS
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {navLinks.slice(1).map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-mono text-sm text-muted transition-colors hover:text-cyan"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#top"
                className="font-mono text-sm text-cyan transition-colors hover:text-cyan-soft"
              >
                Top <span aria-hidden="true">↑</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
