import Link from 'next/link';
import { PageTitle, Card } from '@/components/UI';
import { PolyphonyOverview } from '@/components/polyphony/PolyphonyOverview';
import { mockVersionFamilies } from '@/src/polyphony/mockData';
export default function PolyphonyPage() { return <div><PageTitle eyebrow="Polyphonic Versioning" title="复调版本接口">版本不是单线升级，而是多声部并行演化；稳定、安全、美学、低成本、社区、Codex 与世界模型可以长期共存、对位、合流和冻结。</PageTitle><PolyphonyOverview /><section className="mt-6 grid gap-4 md:grid-cols-2">{mockVersionFamilies.map((family) => <Link key={family.id} href={`/polyphony/family/${family.id}`}><Card><p className="text-tide">{family.objectType} · {family.visibility}</p><h2 className="mt-2 text-2xl font-semibold">{family.title}</h2><p className="mt-2 text-white/60">{family.description}</p><p className="mt-3 text-sm text-plankton">{family.voiceTrackIds.length} 声部 · {family.versionNodeIds.length} 节点</p></Card></Link>)}</section></div>; }
