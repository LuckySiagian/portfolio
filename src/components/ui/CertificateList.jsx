import { useState } from "react";
import Lightbox from "./Lightbox.jsx";

// Grid of certificate thumbnails; each opens a full-size viewer.
export default function CertificateList({ certificates }) {
  const [openIndex, setOpenIndex] = useState(null);
  if (!certificates?.length) return null;
  const current = openIndex !== null ? certificates[openIndex] : null;

  return (
    <div className="pt-4">
      <h3 className="mb-5 font-mono text-xs font-bold uppercase tracking-widest text-muted">
        Certificates
      </h3>
      <ul className="grid gap-5 sm:grid-cols-2">
        {certificates.map((cert, i) => (
          <li key={cert.title} data-reveal>
            <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface/40 sm:flex-row">
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                className="group grid shrink-0 place-items-center bg-slate-950 p-3 sm:w-40"
                aria-label={`View certificate: ${cert.title}`}
              >
                <img
                  src={cert.thumb}
                  alt=""
                  width={cert.thumbWidth}
                  height={cert.thumbHeight}
                  loading="lazy"
                  decoding="async"
                  className="max-h-48 w-auto rounded-md shadow-lg transition-transform duration-300 motion-safe:group-hover:scale-105 sm:max-h-40"
                />
              </button>
              <div className="flex flex-1 flex-col p-5">
                <p className="font-mono text-xs text-faint">
                  {cert.issuer} · {cert.date}
                </p>
                <h4 className="mt-1 font-display text-base font-semibold text-ink">{cert.title}</h4>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{cert.detail}</p>
                <button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  className="mt-4 inline-flex min-h-10 items-center self-start rounded-md border border-line bg-surface-2/60 px-3 font-mono text-xs text-ink transition-colors hover:border-cyan/50 hover:text-cyan"
                >
                  View certificate{cert.pages.length > 1 ? ` (${cert.pages.length} pages)` : ""}
                  <span className="sr-only">: {cert.title}</span>
                </button>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <Lightbox
        open={current !== null}
        onClose={() => setOpenIndex(null)}
        images={current?.pages || []}
        title={current ? `${current.title} — ${current.issuer}` : ""}
      />
    </div>
  );
}
