const blocks = ['Base Core', 'Skill Blocks', 'Residual Blocks', 'Router Blocks', 'Evaluation Blocks', 'Memory Blocks', 'Safety Blocks', 'Domain Blocks'];

export function ModularModelMeshDiagram() {
  return <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-300/10 via-violet-300/10 to-transparent p-6"><div className="mx-auto mb-5 w-fit rounded-full border border-cyan-200/30 bg-cyan-200/10 px-5 py-3 text-cyan-100">Modular Model Mesh</div><div className="grid gap-3 md:grid-cols-4">{blocks.map((block) => <div key={block} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/75">✦ {block}</div>)}</div></div>;
}
