import { Card } from '@/components/UI';
import type { SandboxProfile } from '@/src/agents';

export function SandboxPolicyPanel({ profiles }: { profiles: SandboxProfile[] }) {
  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{profiles.map((profile) => <Card key={profile.id}><p className="text-xs uppercase tracking-[0.25em] text-tide/70">Sandbox</p><h3 className="mt-2 text-lg font-semibold">{profile.name}</h3><p className="mt-2 text-sm text-white/60">network: {profile.networkAccess}</p><p className="mt-2 text-xs text-white/45">write: {profile.canWriteWorkspace ? 'scoped only' : 'no'} · secrets: {profile.canAccessSecrets ? 'yes' : 'no'}</p></Card>)}</div>;
}
