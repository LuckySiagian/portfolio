import React from "react";
import { usePortfolio } from "../context/PortfolioContext.jsx";
import PhotoBackdrop from "./ui/PhotoBackdrop.jsx";

export default function About() {
  const { about } = usePortfolio();

  return (
    <section id="about" aria-labelledby="about-title" className="px-5 py-24 sm:px-8 relative">
      <div className="mx-auto max-w-6xl">
        {/* Frame card with campus photo backdrop */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-900 shadow-2xl min-h-[560px] sm:min-h-[620px] flex flex-col justify-between group">
          <PhotoBackdrop src="/images/campus-itdel.webp" position="object-[center_55%]" />

          <div className="relative z-10 p-5 sm:p-10 md:p-12 space-y-6 flex-1 flex flex-col justify-between">
            {/* Section heading box */}
            <div className="inline-block bg-slate-950/85 backdrop-blur-md p-5 rounded-2xl border border-slate-800 shadow-2xl max-w-md self-start" data-reveal-left>
              <p className="font-mono text-xs font-bold tracking-widest text-cyan-400 uppercase mb-1">
                01 // About me
              </p>
              <h2 id="about-title" className="font-display text-xl sm:text-2xl font-bold text-slate-100 leading-snug">
                {about.headline}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-end pt-8">
              {/* Story */}
              <div className="bg-slate-950/85 backdrop-blur-md p-6 sm:p-7 rounded-2xl border border-slate-800 shadow-2xl space-y-4 text-slate-200 text-sm sm:text-[15px] leading-relaxed" data-reveal-left>
                {about.body?.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
                {about.education && (
                  <p className="font-mono text-xs text-cyan-300 pt-1">{about.education}</p>
                )}
              </div>

              {/* Focus areas */}
              <div className="bg-slate-950/85 backdrop-blur-md p-6 sm:p-7 rounded-2xl border border-slate-800 shadow-2xl" data-reveal-right>
                <h3 className="font-mono text-xs font-bold tracking-widest text-cyan-400 uppercase mb-4">
                  What I focus on
                </h3>
                <ul className="space-y-3">
                  {about.focusAreas?.map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      <span className="mt-0.5 text-cyan-400 text-xs shrink-0" aria-hidden="true">▹</span>
                      <div>
                        <p className="text-sm font-semibold text-slate-100">{item.label}</p>
                        <p className="text-xs text-slate-400 font-mono">{item.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
