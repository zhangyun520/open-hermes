import { evaluateFertilizerGate, fertilizerGates, type NeuralFertilizer } from '@/src/synapse';

export function FertilizerGateChecklist({ fertilizer }: { fertilizer: NeuralFertilizer }) {
  const results = fertilizerGates.map((gate) => evaluateFertilizerGate(fertilizer, gate));
  return <div className="grid gap-2">{results.map((gate) => <div key={gate.gate} className="rounded-2xl border border-white/10 bg-white/5 p-3"><div className="flex items-center justify-between gap-3"><span className="text-sm font-medium">{gate.passed ? '✓' : '△'} {gate.gate}</span><span className="text-xs text-white/55">{gate.score}/100</span></div>{gate.requiredActions.length ? <p className="mt-1 text-xs text-coral/80">action: {gate.requiredActions.join(', ')}</p> : <p className="mt-1 text-xs text-plankton/70">passed</p>}</div>)}</div>;
}
