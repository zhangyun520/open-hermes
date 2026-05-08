import { notFound } from 'next/navigation';
import { PageTitle } from '@/components/UI';
import { VoiceTrackLane } from '@/components/polyphony/VoiceTrackLane';
import { buildPolyphonySummary, getActivePolyphony } from '@/src/polyphony';
export default function PolyphonyFamilyPage({ params }: { params: { id: string } }) { let active; try { active = getActivePolyphony(params.id); } catch { notFound(); } const summary = buildPolyphonySummary(params.id); return <div><PageTitle eyebrow="Version Family" title={active.family.title}>{active.family.description ?? '复调谱面：每条 Voice Track 都是一条并行演化线。'} 当前建议：{summary.recommendedAction}</PageTitle><div className="overflow-x-auto"><div className="flex min-w-max gap-4 pb-4">{active.voiceTracks.map((track) => <VoiceTrackLane key={track.id} track={track} nodes={active.versionNodes.filter((node) => node.voiceTrackId === track.id)} />)}</div></div></div>; }
