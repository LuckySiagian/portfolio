import React from "react";
import SectionHeading from "./ui/SectionHeading.jsx";
import { usePortfolio } from "../context/PortfolioContext.jsx";
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

const linkClass =
  "inline-flex min-h-11 items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:text-cyan";

export default function Contact() {
  const { profile, contact, hasResume } = usePortfolio();
  const { copied, copy } = useCopyToClipboard();

  return (
    <section id="contact" aria-labelledby="contact-title" className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeading index="05" label="CONTACT" title="Get in touch" id="contact-title" />

        <div className="space-y-6 rounded-3xl border border-line bg-surface/50 p-6 text-center shadow-2xl sm:p-12" data-reveal>
          <h3 className="font-display text-2xl font-bold text-ink sm:text-3xl">{contact.headline}</h3>

          <p className="mx-auto max-w-xl text-base leading-relaxed text-muted">{contact.body}</p>

          {contact.roles?.length > 0 && (
            <ul className="flex flex-wrap justify-center gap-2" aria-label="Roles I'm interested in">
              {contact.roles.map((role) => (
                <li
                  key={role}
                  className="rounded-full border border-line bg-canvas/60 px-3 py-1 font-mono text-xs text-ink"
                >
                  {role}
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-cyan px-6 py-3 font-mono text-sm font-bold text-canvas transition-transform hover:-translate-y-0.5"
            >
              <MailIcon />
              Send email
            </a>

            <button
              type="button"
              onClick={() => copy(profile.email)}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-line bg-surface-2/60 px-6 py-3 font-mono text-sm font-medium text-ink transition-colors hover:border-cyan/50 hover:text-cyan"
              aria-label={copied ? "Email address copied" : `Copy email address ${profile.email}`}
            >
              {copied ? <CheckIcon /> : <CopyIcon />}
              <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
            </button>

            {hasResume && (
              <a
                href={profile.resumeUrl}
                download
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-cyan/40 bg-cyan/10 px-6 py-3 font-mono text-sm font-semibold text-cyan transition-colors hover:bg-cyan/20"
              >
                <DownloadIcon />
                Download CV
              </a>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 border-t border-line/60 pt-6 font-mono text-xs text-muted">
            <a href={`mailto:${profile.email}`} className={`${linkClass} break-all`}>
              {profile.email}
            </a>
            {profile.github && (
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <GitHubIcon className="h-3.5 w-3.5" />
                GitHub
                <ArrowUpRightIcon className="h-3 w-3" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <LinkedInIcon className="h-3.5 w-3.5" />
                LinkedIn
                <ArrowUpRightIcon className="h-3 w-3" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>

          {profile.location && (
            <p className="font-mono text-xs text-faint">Based in {profile.location}</p>
          )}
        </div>
      </div>
    </section>
  );
}
