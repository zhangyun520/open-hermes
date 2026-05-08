import { PageTitle } from '@/components/UI';
import { WorldOverview } from '@/components/worlds/WorldOverview';
import { WorldCapsuleCard } from '@/components/worlds/WorldCapsuleCard';
import { mockWorldCapsules } from '@/src/worlds/mockData';
export default function WorldsPage() { return <div><PageTitle eyebrow="World Experience Gateway" title="世界体验接口层">游戏世界是可交互世界模型沙盒；动漫世界是可叙事化场景；体验者反馈是 Proof of Experience，不是外挂、代练或侵权二创。</PageTitle><WorldOverview /><section className="mt-6 grid gap-4 md:grid-cols-3">{mockWorldCapsules.slice(0, 3).map((capsule) => <WorldCapsuleCard key={capsule.id} capsule={capsule} />)}</section></div>; }
