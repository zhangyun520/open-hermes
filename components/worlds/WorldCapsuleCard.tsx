import Link from 'next/link';
import type { WorldCapsule } from '@/src/worlds/types';
import { Card } from '@/components/UI';
import { WorldRiskBadge } from './WorldRiskBadge';
export function WorldCapsuleCard({ capsule }: { capsule: WorldCapsule }) { return <Card><div className="flex flex-wrap gap-2"><WorldRiskBadge risk={capsule.riskLevel} /><span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">{capsule.licensePolicy.licenseType}</span></div><h3 className="mt-3 text-2xl font-semibold">{capsule.title}</h3><p className="mt-2 text-white/60">{capsule.description}</p><div className="mt-3 grid grid-cols-2 gap-2 text-sm text-white/55"><span>{capsule.worldType}</span><span>{capsule.experienceCount ?? 0} 次体验</span><span>残差 {capsule.linkedResidualCardIds.length}</span><span>技能 {capsule.linkedSkillIds.length}</span></div><Link className="mt-4 inline-block text-sm text-plankton" href={`/worlds/capsules#${capsule.id}`}>查看世界胶囊 →</Link></Card>; }
