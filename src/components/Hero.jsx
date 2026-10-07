import React, { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext.jsx";
import { useTilt } from "../hooks/useTilt.js";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard.js";
import {
  ArrowUpRightIcon,
  CheckIcon,
  CopyIcon,
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
} from "./ui/Icons.jsx";

const secondaryBtn =
  "inline-flex min-h-11 items-center gap-2 rounded-lg border border-line bg-surface/60 px-4 py-2.5 font-mono text-xs font-semibold text-ink transition-colors duration-200 hover:border-cyan/50 hover:text-cyan";

export default function Hero() {
  const { profile, hasResume } = usePortfolio();
  const { ref, transform, onMouseMove, onMouseLeave } = useTilt(8);
  const { copied, copy } = useCopyToClipboard();
  const [imgError, setImgError] = useState(false);

  const fullName = profile.name || "Lewi Lucky Siagian";
  const words = fullName.split(" ");
  const initials = profile.initials || words.map(n => n[0]).join("").slice(0, 2) || "LL";

  return (
    <section
      id="top"
      className="relative overflow-hidden px-5 pb-20 pt-28 sm:px-8 sm:pt-36"
    >
      {/* Grid backdrop + soft accent glows */}
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-cyan/15 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-40 h-72 w-72 rounded-full bg-violet/15 blur-[120px]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        {/* ---- Left: who I am, what I do ---- */}
        <div className="min-w-0">
          <p className="font-mono text-xs font-semibold tracking-wide text-cyan sm:text-sm">
            {profile.eyebrow}
          </p>

          {/* Name with the letter hover effect. Words wrap on small screens. */}
          <h1
            aria-label={fullName}
            className="mt-3 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            {words.map((word, wi) => (
              <span key={wi} aria-hidden="true" className="inline-block whitespace-nowrap">
                {word.split("").map((char, ci) => (
                  <span
                    key={ci}
                    className="inline-block transition-transform duration-200 ease-out motion-safe:hover:-translate-y-2 motion-safe:hover:scale-110 hover:text-cyan"
                  >
                    {char}
                  </span>
                ))}
                {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
              </span>
            ))}
          </h1>

          <p className="mt-5 max-w-2xl font-display text-xl font-semibold leading-snug text-ink sm:text-2xl">
            {profile.headline}
          </p>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            {profile.intro}
          </p>

          {profile.currently && (
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1.5 font-mono text-xs text-muted">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ok" aria-hidden="true" />
              {profile.currently}
            </p>
          )}

          {/* Primary actions */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {hasResume && (
              <a
                href={profile.resumeUrl}
                download
                className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-cyan px-5 py-2.5 text-sm font-bold text-canvas shadow-lg shadow-cyan/20 transition-transform duration-200 hover:-translate-y-0.5"
              >
                <DownloadIcon />
                Download CV
              </a>
            )}

            <a
              href="#projects"
              className={
                hasResume
                  ? "inline-flex min-h-11 items-center gap-2 rounded-lg border border-cyan/40 bg-cyan/10 px-4 py-2.5 font-mono text-xs font-semibold text-cyan transition-colors duration-200 hover:bg-cyan/20"
                  : "inline-flex min-h-11 items-center gap-2 rounded-lg bg-cyan px-5 py-2.5 text-sm font-bold text-canvas shadow-lg shadow-cyan/20 transition-transform duration-200 hover:-translate-y-0.5"
              }
            >
              View Projects <span aria-hidden="true">→</span>
            </a>

            <a href={`mailto:${profile.email}`} className={secondaryBtn}>
              <MailIcon />
              Email
            </a>

            <button
              type="button"
              onClick={() => copy(profile.email)}
              className={secondaryBtn}
              aria-label={copied ? "Email address copied" : `Copy email address ${profile.email}`}
            >
              {copied ? <CheckIcon /> : <CopyIcon />}
              <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
            </button>
          </div>

          {/* Profiles */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 py-2 font-mono text-xs text-muted transition-colors hover:text-cyan"
              >
                <GitHubIcon />
                GitHub
                <ArrowUpRightIcon />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 py-2 font-mono text-xs text-muted transition-colors hover:text-cyan"
              >
                <LinkedInIcon />
                LinkedIn
                <ArrowUpRightIcon />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>
        </div>

        {/* ---- Right: photo card ---- */}
        <div className="mx-auto w-full max-w-sm lg:mx-0 lg:max-w-md lg:justify-self-end">
          <div
            ref={ref}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{
              transform,
              transition: "transform 200ms ease-out",
              transformStyle: "preserve-3d",
            }}
            className="w-full"
          >
            <div className="motion-safe:animate-float overflow-hidden rounded-3xl border border-line bg-surface/80 p-2.5 shadow-2xl shadow-cyan-950/30">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-slate-950 group">
                {!imgError ? (
                  <img
                    src={profile.avatar}
                    alt={`Portrait of ${fullName} on graduation day`}
                    width="800"
                    height="1067"
                    fetchpriority="high"
                    decoding="async"
                    onError={() => setImgError(true)}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center bg-slate-950">
                    <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-cyan to-violet p-0.5">
                      <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-slate-900 font-display text-2xl font-bold text-cyan">
                        {initials}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
