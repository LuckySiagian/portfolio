// Small monospace "chip" used for tech-stack tags throughout the site.
export default function Tag({ children }) {
  return (
    <span className="inline-flex items-center rounded-md border border-line bg-surface-2/60 px-2.5 py-1 font-mono text-xs text-muted transition-colors duration-200 hover:border-cyan/40 hover:text-cyan">
      {children}
    </span>
  );
}
