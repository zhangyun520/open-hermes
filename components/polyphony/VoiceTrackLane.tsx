import type { VersionNode, VoiceTrack } from '@/src/polyphony/types';
import { VersionNodeCard } from './VersionNodeCard';
export function VoiceTrackLane({ track, nodes }: { track: VoiceTrack; nodes: VersionNode[] }) {
  return <section className="min-w-[18rem] flex-1 rounded-3xl border border-white/10 bg-deep/50 p-4">
    <p className="text-xs uppercase tracking-[0.25em] text-tide/70">{track.type}</p><h2 className="mt-2 text-xl font-semibold">{track.name}</h2><p className="mt-2 min-h-12 text-sm text-white/55">{track.purpose}</p>
    <div className="mt-4 space-y-3">{nodes.map((node) => <VersionNodeCard key={node.id} node={node} />)}</div>
  </section>;
}
