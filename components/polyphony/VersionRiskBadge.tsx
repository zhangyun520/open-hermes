import type { PolyphonyRiskLevel } from '@/src/polyphony/types';
export function VersionRiskBadge({ risk }: { risk: PolyphonyRiskLevel }) {
  const tone = risk === 'low' ? 'border-plankton/40 bg-plankton/10 text-plankton' : risk === 'medium' ? 'border-tide/40 bg-tide/10 text-tide' : 'border-coral/40 bg-coral/10 text-coral';
  return <span className={`rounded-full border px-3 py-1 text-xs ${tone}`}>risk: {risk}</span>;
}
