import { Card, PageTitle } from '@/components/UI';
import { mockUsageRecords } from '@/src/integrations/gateway/integrationMockData';

export default function IntegrationUsagePage() {
  return <div><PageTitle eyebrow="Usage Ledger" title="模型与 App 使用账本">每次 provider 调用、cache hit、人工审核和外部 app action 都应写入账本；当前为 mock。</PageTitle><section className="grid gap-4">{mockUsageRecords.map((record) => <Card key={record.usageId}><div className="grid gap-3 md:grid-cols-7"><b>{record.providerId}</b><span>{record.taskId}</span><span>in {record.inputTokens}</span><span>out {record.outputTokens}</span><span>${record.estimatedCost}</span><span>{record.cacheHit ? 'cache hit' : 'provider'}</span><span>{record.latencyMs}ms</span></div><p className="mt-3 text-sm text-white/60">Privacy: {record.privacyLevel} · Route: {record.routeReason}</p></Card>)}</section></div>;
}
