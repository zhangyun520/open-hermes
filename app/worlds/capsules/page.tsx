import { PageTitle } from '@/components/UI';
import { WorldCapsuleCard } from '@/components/worlds/WorldCapsuleCard';
import { mockWorldCapsules } from '@/src/worlds/mockData';
export default function WorldCapsulesPage() { return <div><PageTitle eyebrow="World Capsules" title="世界胶囊库">场景胶囊像漂浮泡泡：游戏训练场、动漫世界观、工业模拟、教育关卡与 AI 工作流沙盒都必须带授权、风险和隐私边界。</PageTitle><section className="grid gap-4 md:grid-cols-2">{mockWorldCapsules.map((capsule) => <div id={capsule.id} key={capsule.id}><WorldCapsuleCard capsule={capsule} /></div>)}</section></div>; }
