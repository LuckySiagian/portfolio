import React from "react";
import { usePortfolio } from "../context/PortfolioContext.jsx";
import PhotoBackdrop from "./ui/PhotoBackdrop.jsx";

function SkillGroupCard({ group }) {
  return (
    <div className="bg-slate-950/85 backdrop-blur-md p-5 rounded-2xl border border-slate-800 shadow-2xl space-y-3">
      <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400">
        {group.title}
      </h3>
      <ul className="space-y-2">
        {group.items.map((item) => (
          <li key={item.name} className="flex items-start gap-2">
            <span className="text-cyan-400 text-xs mt-1 shrink-0" aria-hidden="true">▹</span>
            <p className="text-sm leading-relaxed">
              <span className="font-semibold text-slate-100">{item.name}</span>
              {item.note && (
                <span className="text-xs text-slate-400 font-mono"> — {item.note}</span>
              )}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Skills() {
  const { skillGroups, skillsNote } = usePortfolio();

  // Two columns: first 3 groups left, last 3 right.
  const leftGroups = skillGroups.slice(0, 3);
  const rightGroups = skillGroups.slice(3);

  return (
    <section id="skills" aria-labelledby="skills-title" className="px-5 py-24 sm:px-8 relative">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-900 shadow-2xl min-h-[560px] sm:min-h-[620px] flex flex-col justify-between group">
          <PhotoBackdrop src="/images/pelindo-terminal.webp" position="object-[center_60%]" />

          <div className="relative z-10 p-5 sm:p-10 md:p-12 space-y-6 flex-1 flex flex-col justify-between">
            <div className="inline-block bg-slate-950/85 backdrop-blur-md p-5 rounded-2xl border border-slate-800 shadow-2xl max-w-md self-start" data-reveal-zoom>
              <p className="font-mono text-xs font-bold tracking-widest text-cyan-400 uppercase mb-1">
                02 // Technical skills
              </p>
              <h2 id="skills-title" className="font-display text-xl sm:text-2xl font-bold text-slate-100 leading-snug">
                What I use and how I've used it
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-end pt-6">
              <div className="space-y-4" data-reveal-left>
                {leftGroups.map((group) => (
                  <SkillGroupCard key={group.title} group={group} />
                ))}
              </div>

              <div className="space-y-4" data-reveal-right>
                {rightGroups.map((group) => (
                  <SkillGroupCard key={group.title} group={group} />
                ))}
                {skillsNote && (
                  <p className="font-mono text-xs text-slate-300 pt-1 pl-1">{skillsNote}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
