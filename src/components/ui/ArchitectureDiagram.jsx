// Simple, responsive architecture diagram built from data (no images).
// Each flow is a vertical chain of nodes; a node can list parallel items as chips.
//
// architecture = {
//   flows: [{ title, note?, nodes: [{ label, detail?, items?: string[] }] }]
// }

function Connector() {
  return (
    <div className="flex justify-center py-1" aria-hidden="true">
      <div className="flex flex-col items-center">
        <span className="h-4 w-px bg-cyan/50" />
        <span className="-mt-1 text-[10px] leading-none text-cyan/80">▼</span>
      </div>
    </div>
  );
}

function Node({ node }) {
  return (
    <div className="rounded-xl border border-line bg-canvas/70 px-4 py-3 text-center">
      <p className="font-mono text-sm font-semibold text-ink">{node.label}</p>
      {node.detail && <p className="mt-0.5 text-xs text-muted">{node.detail}</p>}
      {node.items && (
        <ul className="mt-2 flex flex-wrap justify-center gap-1.5">
          {node.items.map((item) => (
            <li
              key={item}
              className="rounded-md border border-cyan/30 bg-cyan/10 px-2 py-0.5 font-mono text-[11px] text-cyan"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ArchitectureDiagram({ architecture, title }) {
  const flows = architecture?.flows || [];
  if (flows.length === 0) return null;

  return (
    <figure aria-label={`${title} architecture diagram`}>
      <div className={`grid gap-6 ${flows.length > 1 ? "md:grid-cols-2" : "max-w-md mx-auto"}`}>
        {flows.map((flow) => (
          <div key={flow.title} className="rounded-2xl border border-line/70 bg-surface-2/20 p-4">
            <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-wider text-faint">
              {flow.title}
            </p>
            <ol className="list-none">
              {flow.nodes.map((node, i) => (
                <li key={`${node.label}-${i}`}>
                  {i > 0 && <Connector />}
                  <Node node={node} />
                </li>
              ))}
            </ol>
            {flow.note && <p className="mt-3 text-center text-xs text-faint">{flow.note}</p>}
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-xs text-faint">
        Simplified view of how the main parts connect.
      </figcaption>
    </figure>
  );
}
