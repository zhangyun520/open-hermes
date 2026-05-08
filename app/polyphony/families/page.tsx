import Link from 'next/link';
import { Card, PageTitle } from '@/components/UI';
import { mockVersionFamilies } from '@/src/polyphony/mockData';
export default function PolyphonyFamiliesPage() { return <div><PageTitle eyebrow="Version Families" title="版本家族列表">每个家族对应一个核心对象：白皮书、技能胶囊、共享缓存、UI 主题、Agent 规则或世界模型。</PageTitle><div className="grid gap-4 md:grid-cols-2">{mockVersionFamilies.map((family) => <Link key={family.id} href={`/polyphony/family/${family.id}`}><Card><h2 className="text-2xl font-semibold">{family.title}</h2><p className="mt-2 text-white/60">{family.objectType} / {family.objectId}</p><p className="mt-3 text-sm text-tide">tags: {family.tags.join(' / ')}</p></Card></Link>)}</div></div>; }
