import type { VersionStatus } from '@/src/polyphony/types';
export function VersionStatusBadge({ status }: { status: VersionStatus }) {
  const tone = status === 'canonical' ? 'border-plankton/40 bg-plankton/10 text-plankton' : status === 'quarantined' || status === 'rejected' ? 'border-coral/40 bg-coral/10 text-coral' : status === 'experimental' || status === 'reviewing' ? 'border-tide/40 bg-tide/10 text-tide' : 'border-white/10 bg-white/5 text-white/65';
  return <span className={`rounded-full border px-3 py-1 text-xs ${tone}`}>{status}</span>;
}
