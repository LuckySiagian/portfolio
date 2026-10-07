// Reusable section heading: a mono "01 / LABEL" eyebrow above a display title.
// Optional children (e.g. a short intro paragraph) render below the title.
export default function SectionHeading({ index, label, title, id, children }) {
  return (
    <div className="mb-12 max-w-2xl" data-reveal>
      <span className="font-mono text-xs tracking-[0.25em] text-cyan">
        {index} / {label}
      </span>
      <h2 id={id} className="mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {children}
    </div>
  );
}
