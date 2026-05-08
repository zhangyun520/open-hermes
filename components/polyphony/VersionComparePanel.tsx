import type { VersionDiff } from '@/src/polyphony/types';
import { Card } from '@/components/UI';
export function VersionComparePanel({ diff }: { diff: VersionDiff }) { return <Card><h3 className="text-xl font-semibold">版本比较</h3><p className="mt-2 text-white/65">{diff.summary}</p><p className="mt-2 text-tide">适用场景：{diff.useCaseDifference}</p><p className="mt-2 text-coral/80">风险差异：{diff.riskDifference}</p><p className="mt-2 text-white/55">建议：{diff.suggestedAction}</p></Card>; }
