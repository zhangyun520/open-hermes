import { Card } from '@/components/UI';
import { evaluateTentacleAdmission, type TentacleManifest } from '@/src/agents';
import { TentacleAdmissionBadge } from './TentacleAdmissionBadge';

export function TentacleManifestCard({ tentacle }: { tentacle: TentacleManifest }) {
  const decision = evaluateTentacleAdmission(tentacle);
  return <Card><div className="flex items-start justify-between gap-3"><div><p className="text-xs uppercase tracking-[0.25em] text-violet-200/70">Tentacle</p><h3 className="mt-2 text-xl font-semibold">{tentacle.name}</h3></div><TentacleAdmissionBadge decision={decision} /></div><p className="mt-3 text-sm text-white/60">{tentacle.purpose}</p><p className="mt-2 text-xs text-white/45">network: {tentacle.networkAccess} · boundary: {tentacle.privacyBoundary}</p><p className="mt-2 text-xs text-white/45">permissions: {tentacle.permissions.join(' / ') || 'none'}</p></Card>;
}
