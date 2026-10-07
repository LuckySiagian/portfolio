import { useRef, useState } from "react";
import Lightbox from "./Lightbox.jsx";

// Project screenshots: a single image, or a slider when there are several.
// Slides can be changed with the arrow buttons, the dots, the keyboard
// (Left/Right while the slider has focus) or by swiping on touch screens.
// Clicking a slide opens it full size.
export default function ScreenshotCarousel({ shots, title }) {
  const [index, setIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState(null);
  const touchX = useRef(null);
  const count = shots.length;
  const multiple = count > 1;

  const go = (step) => setIndex((i) => (i + step + count) % count);

  const onKeyDown = (e) => {
    if (!multiple) return;
    if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
  };

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };

  const current = shots[index];

  return (
    <div
      role={multiple ? "region" : undefined}
      aria-roledescription={multiple ? "carousel" : undefined}
      aria-label={multiple ? `${title} screenshots` : undefined}
      onKeyDown={onKeyDown}
    >
      <div
        className="group relative overflow-hidden rounded-xl border border-line bg-slate-950"
        onTouchStart={multiple ? onTouchStart : undefined}
        onTouchEnd={multiple ? onTouchEnd : undefined}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {shots.map((shot, i) => {
            const active = i === index;
            return (
              <button
                key={shot.src}
                type="button"
                onClick={() => setOpenIndex(i)}
                tabIndex={active ? 0 : -1}
                aria-hidden={active ? undefined : true}
                aria-label={`View larger: ${shot.alt}`}
                className="block w-full shrink-0"
              >
                <img
                  src={shot.src}
                  alt={shot.alt}
                  loading="lazy"
                  decoding="async"
                  className={`aspect-video w-full ${
                    shot.fit === "contain" ? "object-contain" : "object-cover object-top"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {multiple && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous screenshot"
              className="absolute left-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-slate-700 bg-slate-900/80 text-slate-100 transition-colors hover:bg-cyan hover:text-slate-950"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next screenshot"
              className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-slate-700 bg-slate-900/80 text-slate-100 transition-colors hover:bg-cyan hover:text-slate-950"
            >
              <span aria-hidden="true">→</span>
            </button>
            <span className="absolute right-2 top-2 rounded-full border border-slate-700 bg-slate-900/80 px-2 py-0.5 font-mono text-[11px] text-slate-200">
              {index + 1} / {count}
            </span>
          </>
        )}
      </div>

      <div className="mt-2 flex items-start justify-between gap-3">
        <p className="font-mono text-xs text-faint" aria-live={multiple ? "polite" : undefined}>
          {current.caption} <span className="text-faint/80">· click to enlarge</span>
        </p>
        {multiple && (
          <div className="flex shrink-0 gap-1.5 pt-1">
            {shots.map((shot, i) => (
              <button
                key={shot.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show screenshot ${i + 1}: ${shot.caption || shot.alt}`}
                aria-current={i === index ? "true" : undefined}
                className="grid h-6 w-6 place-items-center"
              >
                <span
                  className={`block h-2 rounded-full transition-all ${
                    i === index ? "w-5 bg-cyan" : "w-2 bg-line hover:bg-faint"
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <Lightbox
        open={openIndex !== null}
        onClose={() => setOpenIndex(null)}
        images={shots}
        startIndex={openIndex ?? 0}
        title={title}
      />
    </div>
  );
}
