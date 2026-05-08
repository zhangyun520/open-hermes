import { PageTitle } from '@/components/UI';
import { WorldConnectorCard } from '@/components/worlds/WorldConnectorCard';
import { mockWorldConnectors } from '@/src/worlds/mockData';
export default function WorldConnectorsPage() { return <div><PageTitle eyebrow="World Connectors" title="世界连接器">只支持官方 API、授权 SDK、mod API、回放文件、用户上传和 mock；禁止 live multiplayer control。</PageTitle><section className="grid gap-4 md:grid-cols-2">{mockWorldConnectors.map((connector) => <WorldConnectorCard key={connector.id} connector={connector} />)}</section></div>; }
