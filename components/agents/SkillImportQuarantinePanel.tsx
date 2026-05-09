import { Card } from '@/components/UI';
import { reviewExternalSkillPermissions, type ExternalSkillDescriptor } from '@/src/agents';

export function SkillImportQuarantinePanel({ skills }: { skills: ExternalSkillDescriptor[] }) {
  return <div className="grid gap-4 md:grid-cols-2">{skills.map((skill) => { const review = reviewExternalSkillPermissions(skill); return <Card key={skill.id}><p className="text-xs uppercase tracking-[0.25em] text-tide/70">{skill.source}</p><h3 className="mt-2 text-xl font-semibold">{skill.name}</h3><p className="mt-2 text-sm text-white/60">{skill.description}</p><p className="mt-3 text-sm text-plankton/80">status: {review.status}</p><p className="mt-2 text-xs text-white/45">actions: {review.requiredActions.join(' / ') || 'none'}</p></Card>; })}</div>;
}
