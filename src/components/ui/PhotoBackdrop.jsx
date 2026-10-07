import { useState } from "react";

// Decorative photo behind a section card, with a dark gradient for legibility.
// Falls back to a plain surface if the image fails to load.
export default function PhotoBackdrop({ src, position = "object-center" }) {
  const [error, setError] = useState(false);

  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      {!error ? (
        <img
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setError(true)}
          className={`h-full w-full object-cover ${position} transition-transform duration-700 motion-safe:group-hover:scale-105`}
        />
      ) : (
        <div className="h-full w-full bg-slate-900" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40 pointer-events-none" />
    </div>
  );
}
