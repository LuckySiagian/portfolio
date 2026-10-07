import React from "react";
import SectionHeading from "./ui/SectionHeading.jsx";
import Tag from "./ui/Tag.jsx";
import { usePortfolio } from "../context/PortfolioContext.jsx";

function PeriodBadge({ children }) {
  return (
    <span className="shrink-0 rounded-full border border-line bg-canvas/60 px-3 py-1 font-mono text-xs text-muted">
      {children}
    </span>
  );
}

export default function Experience() {
  const { experience, education, organizations } = usePortfolio();

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="border-y border-line/60 bg-surface/20 px-5 py-24 sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="04"
          label="EXPERIENCE"
          title="Internship, education & activities"
          id="experience-title"
        />

        <div className="space-y-8">
          {/* Internship */}
          {experience.map((job) => (
            <article
              key={job.org}
              className="relative grid gap-8 overflow-hidden rounded-2xl border border-line bg-surface/50 p-5 sm:p-8 lg:grid-cols-[1.35fr_1fr]"
              data-reveal
            >
              <span className="absolute left-0 top-6 h-12 w-1 rounded-r bg-gradient-to-b from-cyan to-violet" aria-hidden="true" />

              <div className="min-w-0 space-y-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-faint">{job.type}</p>
                    <h3 className="mt-1 font-display text-xl font-semibold text-ink">{job.role}</h3>
                    <p className="mt-1 font-mono text-sm text-cyan">
                      {job.org}
                      {job.location && <span className="text-faint"> · {job.location}</span>}
                    </p>
                  </div>
                  <PeriodBadge>{job.period}</PeriodBadge>
                </div>

                {job.summary && <p className="leading-relaxed text-muted">{job.summary}</p>}

                {job.bullets?.length > 0 && (
                  <ul className="space-y-3">
                    {job.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-muted">
                        <span className="mt-0.5 text-cyan" aria-hidden="true">▹</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {job.tags?.length > 0 && (
                  <ul className="flex flex-wrap gap-2" aria-label="Tools used">
                    {job.tags.map((tag) => (
                      <li key={tag}>
                        <Tag>{tag}</Tag>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {job.photo && (
                <figure className="self-start">
                  <div className="overflow-hidden rounded-xl border border-line bg-slate-950">
                    <img
                      src={job.photo.src}
                      alt={job.photo.alt}
                      width={job.photo.width}
                      height={job.photo.height}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] w-full object-cover object-[center_35%]"
                    />
                  </div>
                  {job.photo.caption && (
                    <figcaption className="mt-2 font-mono text-xs text-faint">{job.photo.caption}</figcaption>
                  )}
                </figure>
              )}
            </article>
          ))}

          {/* Education */}
          {education && (
            <article
              className="relative rounded-2xl border border-line bg-surface/50 p-5 sm:p-8"
              data-reveal
            >
              <span className="absolute left-0 top-6 h-12 w-1 rounded-r bg-violet" aria-hidden="true" />
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-faint">Education</p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-ink">{education.degree}</h3>
                  <p className="mt-1 font-mono text-sm text-violet-soft">
                    {education.school} · {education.location}
                  </p>
                </div>
                <PeriodBadge>{education.period}</PeriodBadge>
              </div>
              <p className="mt-4 text-sm text-muted">
                GPA <span className="font-mono text-ink">{education.gpa}</span>
                {education.note && <> · {education.note}</>}
              </p>
            </article>
          )}

          {/* Organizational activities */}
          {organizations?.length > 0 && (
            <div className="pt-4">
              <h3 className="mb-5 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Organizational experience
              </h3>
              <div className="grid gap-5 md:grid-cols-2">
                {organizations.map((org) => (
                  <article
                    key={org.role}
                    className="relative space-y-3 rounded-2xl border border-line bg-surface/40 p-5"
                    data-reveal
                  >
                    <span className="absolute left-0 top-5 h-8 w-0.5 rounded-r bg-violet" aria-hidden="true" />
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h4 className="font-display text-base font-semibold text-ink">{org.role}</h4>
                        <p className="mt-0.5 font-mono text-xs text-violet-soft">{org.org}</p>
                      </div>
                      <span className="rounded-full border border-line bg-canvas/60 px-2.5 py-0.5 font-mono text-[11px] text-muted">
                        {org.period}
                      </span>
                    </div>
                    {org.summary && <p className="text-sm leading-relaxed text-muted">{org.summary}</p>}
                    {org.bullets?.length > 0 && (
                      <ul className="space-y-1.5">
                        {org.bullets.map((b) => (
                          <li key={b} className="flex gap-2 text-sm text-muted">
                            <span className="mt-0.5 shrink-0 text-violet-soft" aria-hidden="true">▹</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
