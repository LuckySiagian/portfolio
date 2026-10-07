import React, { useId, useRef, useState } from "react";
import SectionHeading from "./ui/SectionHeading.jsx";
import Tag from "./ui/Tag.jsx";
import ArchitectureDiagram from "./ui/ArchitectureDiagram.jsx";
import { ArrowUpRightIcon, GitHubIcon, LockIcon } from "./ui/Icons.jsx";
import { usePortfolio } from "../context/PortfolioContext.jsx";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Architecture" },
  { id: "features", label: "Features" },
  { id: "contribution", label: "My contribution" },
];

function ProjectLinks({ project, compact = false }) {
  const size = compact ? "px-3 py-2 text-xs" : "px-3.5 py-2 text-xs";
  return (
    <div className="flex flex-wrap items-center gap-2">
      {project.githubUrl ? (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex min-h-10 items-center gap-2 rounded-md border border-line bg-surface-2/60 font-mono text-ink transition-colors hover:border-cyan/50 hover:text-cyan ${size}`}
        >
          <GitHubIcon className="h-3.5 w-3.5" />
          <span>Source code</span>
          <ArrowUpRightIcon className="h-3 w-3" />
          <span className="sr-only">for {project.title} on GitHub (opens in a new tab)</span>
        </a>
      ) : (
        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-faint">
          <LockIcon className="h-3 w-3" />
          {project.linkNote || "Private repository"}
        </span>
      )}
      {project.demoUrl && (
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex min-h-10 items-center gap-2 rounded-md border border-cyan/40 bg-cyan/10 font-mono font-semibold text-cyan transition-colors hover:bg-cyan/20 ${size}`}
        >
          Live demo
          <ArrowUpRightIcon className="h-3 w-3" />
          <span className="sr-only">for {project.title} (opens in a new tab)</span>
        </a>
      )}
    </div>
  );
}

// Accessible tabs: arrow keys move between tabs, only the active tab is focusable.
function ProjectTabs({ project }) {
  const baseId = useId();
  const [active, setActive] = useState("overview");
  const tabRefs = useRef([]);
  const tabs = TABS.filter((t) => t.id !== "architecture" || project.architecture);

  const onKeyDown = (e, index) => {
    let next = null;
    if (e.key === "ArrowRight") next = (index + 1) % tabs.length;
    if (e.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = tabs.length - 1;
    if (next === null) return;
    e.preventDefault();
    setActive(tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="mt-6">
      <div
        role="tablist"
        aria-label={`${project.title} details`}
        className="grid grid-cols-2 gap-1 sm:flex sm:shadow-[inset_0_-1px_0_var(--color-line)]"
      >
        {tabs.map((tab, i) => {
          const selected = active === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => (tabRefs.current[i] = el)}
              id={`${baseId}-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`min-h-11 whitespace-nowrap rounded-md border-b-2 px-3 py-2.5 font-mono text-xs font-semibold transition-colors sm:rounded-none ${
                selected
                  ? "border-cyan bg-cyan/10 text-cyan sm:bg-transparent"
                  : "border-transparent bg-surface-2/40 text-muted hover:text-ink sm:bg-transparent"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`${baseId}-panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          hidden={active !== tab.id}
          tabIndex={0}
          className="pt-5 focus-visible:outline-none"
        >
          {tab.id === "overview" && <OverviewPanel project={project} />}
          {tab.id === "architecture" && (
            <ArchitectureDiagram architecture={project.architecture} title={project.title} />
          )}
          {tab.id === "features" && (
            <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {project.features?.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-muted">
                  <span className="mt-0.5 text-ok" aria-hidden="true">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          )}
          {tab.id === "contribution" && (
            <div className="space-y-4">
              {project.role && (
                <p className="font-mono text-xs text-faint">
                  Role: <span className="text-ink">{project.role}</span>
                </p>
              )}
              <ul className="space-y-2.5">
                {project.contributions?.map((c) => (
                  <li key={c} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                    <span className="mt-0.5 shrink-0 text-cyan" aria-hidden="true">▹</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function OverviewPanel({ project }) {
  const blocks = [
    { label: "Problem", text: project.problem },
    { label: "What I built", text: project.solution },
    { label: "Result", text: project.outcome },
  ].filter((b) => b.text);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 lg:grid-cols-3">
        {blocks.map((b) => (
          <div key={b.label} className="rounded-xl border border-line/70 bg-canvas/40 p-4">
            <h4 className="mb-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-faint">
              {b.label}
            </h4>
            <p className="text-sm leading-relaxed text-muted">{b.text}</p>
          </div>
        ))}
      </div>

      {project.facts && (
        <dl className="grid gap-3 sm:grid-cols-3">
          {project.facts.map((f) => (
            <div key={f.label} className="rounded-xl border border-line/70 px-4 py-3">
              <dt className="font-mono text-[11px] uppercase tracking-wider text-faint">{f.label}</dt>
              <dd className="mt-1 font-mono text-xs text-ink">{f.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

function DetailProjectCard({ project }) {
  const isMain = project.tier === "main";

  return (
    <article
      className={`rounded-2xl border p-5 sm:p-8 transition-colors duration-300 ${
        isMain
          ? "border-cyan/40 bg-surface/60 shadow-xl shadow-cyan/5"
          : "border-line bg-surface/40 hover:border-cyan/30"
      }`}
      data-reveal
    >
      <div className="flex flex-wrap items-center gap-2">
        {isMain && (
          <span className="rounded-full border border-cyan/40 bg-cyan/10 px-2.5 py-0.5 font-mono text-[11px] font-bold text-cyan">
            Main project
          </span>
        )}
        <span className="rounded-full border border-line bg-canvas/60 px-2.5 py-0.5 font-mono text-[11px] text-muted">
          {project.category}
        </span>
        <span className="font-mono text-xs text-faint">
          {project.year}
          {project.status && <> · {project.status}</>}
        </span>
      </div>

      <h3
        className={`mt-3 font-display font-semibold leading-tight text-ink ${
          isMain ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
        }`}
      >
        {project.title}
        {project.org && project.tier === "main" && (
          <span className="text-muted"> – {project.org}</span>
        )}
      </h3>

      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted">{project.summary}</p>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        {project.tags?.length > 0 && (
          <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
            {project.tags.map((tag) => (
              <li key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
          </ul>
        )}
        <ProjectLinks project={project} />
      </div>

      <ProjectTabs project={project} />
    </article>
  );
}

function OtherProjectCard({ project }) {
  return (
    <article
      className="flex flex-col rounded-2xl border border-line bg-surface/40 p-5 transition-colors duration-300 hover:border-cyan/30"
      data-reveal
    >
      <p className="font-mono text-xs text-faint">
        {project.category} · {project.year}
      </p>
      <h4 className="mt-2 font-display text-base font-semibold text-ink">{project.title}</h4>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>
      {project.tags?.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tech stack">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 border-t border-line/60 pt-3">
        <ProjectLinks project={project} compact />
      </div>
    </article>
  );
}

export default function Projects() {
  const { projects } = usePortfolio();

  const detailed = projects.filter((p) => p.tier === "main" || p.tier === "featured");
  const others = projects.filter((p) => p.tier === "other");

  return (
    <section id="projects" aria-labelledby="projects-title" className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="03" label="PROJECTS" title="Things I've built" id="projects-title">
          <p className="mt-4 text-base leading-relaxed text-muted">
            The monitoring platform from my internship is my main project. Each card has tabs for
            the architecture, features, and the parts I worked on.
          </p>
        </SectionHeading>

        <div className="space-y-8">
          {detailed.map((project) => (
            <DetailProjectCard key={project.title} project={project} />
          ))}
        </div>

        {others.length > 0 && (
          <div className="mt-16">
            <h3 className="mb-6 flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-widest text-muted">
              Other projects
              <span className="h-px flex-1 bg-line/60" aria-hidden="true" />
            </h3>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((project) => (
                <OtherProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
