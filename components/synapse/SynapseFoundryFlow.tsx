const steps = ['Residual', 'Fertilizer', 'Candidate', 'Synapse', 'Model Block'];

export function SynapseFoundryFlow() {
  return <div className="grid gap-3 md:grid-cols-5">{steps.map((step, index) => <div key={step} className="rounded-3xl border border-cyan-200/20 bg-cyan-200/10 p-4 text-center shadow-[0_0_30px_rgba(34,211,238,0.08)]"><p className="text-xs text-white/45">0{index + 1}</p><p className="mt-2 font-semibold text-cyan-100">{step}</p>{index < steps.length - 1 ? <p className="mt-2 text-xs text-tide/70">→ NFAP checked</p> : <p className="mt-2 text-xs text-plankton/70">evaluated attach</p>}</div>)}</div>;
}
