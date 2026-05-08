import { Card, PageTitle } from '@/components/UI';
import { providerSummaries } from '@/src/integrations/gateway/integrationMockData';
import { providerTaskFit } from '@/src/integrations/gateway/capabilityMatrix';

export default function IntegrationModelsPage() {
  return <div><PageTitle eyebrow="Model Providers" title="模型连接">MVP 仅使用 mock provider；支持 env Key 预留，但不强制、不在前端暴露。</PageTitle><section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{providerSummaries.map((provider) => <Card key={provider.id}><div className="flex items-center justify-between"><h2 className="text-2xl font-semibold">{provider.name}</h2><span className="rounded-full border border-tide/20 px-3 py-1 text-tide">{provider.status}</span></div><p className="mt-2 text-white/60">Vendor: {provider.vendor}</p><p className="mt-4 text-sm text-plankton">适合任务：{(providerTaskFit[provider.id] ?? ['custom']).join(' / ')}</p><div className="mt-4 flex flex-wrap gap-2">{Object.entries(provider.capabilities).filter(([, enabled]) => enabled === true).slice(0, 8).map(([cap]) => <span key={cap} className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/70">{cap}</span>)}</div><button className="mt-5 rounded-2xl bg-tide/10 px-4 py-2 text-tide">配置（mock）</button></Card>)}</section></div>;
}
