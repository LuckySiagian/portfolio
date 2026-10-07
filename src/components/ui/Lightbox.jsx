import { useEffect, useRef, useState } from "react";

// Full-size image viewer built on the native <dialog> element, which already
// handles focus trapping, Escape to close and the backdrop.
// images: [{ src, alt, width, height, caption? }]
export default function Lightbox({ open, onClose, images = [], title, startIndex = 0 }) {
  const ref = useRef(null);
  const [index, setIndex] = useState(startIndex);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      setIndex(startIndex);
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open, startIndex]);

  const count = images.length;
  const image = images[index];
  const go = (step) => setIndex((i) => (i + step + count) % count);

  const onKeyDown = (e) => {
    if (count < 2) return;
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onKeyDown={onKeyDown}
      // Clicking the backdrop (the dialog element itself) closes it.
      onClick={(e) => e.target === ref.current && onClose()}
      aria-label={title}
      className="m-auto max-h-[94vh] w-[min(960px,94vw)] overflow-hidden rounded-2xl border border-line bg-surface p-0 text-ink backdrop:bg-black/80"
    >
      {open && image && (
        <div className="flex max-h-[94vh] flex-col">
          <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
            <p className="min-w-0 truncate font-mono text-xs text-muted">
              {title}
              {count > 1 && <span className="text-faint"> · {index + 1} / {count}</span>}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line text-ink transition-colors hover:border-cyan/50 hover:text-cyan"
              aria-label="Close"
            >
              <span aria-hidden="true">✕</span>
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-auto bg-slate-950 p-2 sm:p-4">
            <img
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              decoding="async"
              className="mx-auto h-auto max-h-[78vh] w-auto max-w-full rounded-lg object-contain"
            />
          </div>

          {(image.caption || count > 1) && (
            <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3">
              <p className="text-xs text-muted">{image.caption}</p>
              {count > 1 && (
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    className="min-h-10 rounded-lg border border-line px-3 font-mono text-xs text-ink hover:border-cyan/50 hover:text-cyan"
                  >
                    ← Prev
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    className="min-h-10 rounded-lg border border-line px-3 font-mono text-xs text-ink hover:border-cyan/50 hover:text-cyan"
                  >
                    Next →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </dialog>
  );
}
