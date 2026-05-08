import { Card, PageTitle } from '@/components/UI';
import { connectorSummaries } from '@/src/integrations/gateway/integrationMockData';

export default function IntegrationAppsPage() {
  return <div><PageTitle eyebrow="App Connectors" title="App 连接">所有 Connector 必须经过 ConsentManager；写入动作默认禁用，除非用户明确授权并进入审批队列。</PageTitle><section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{connectorSummaries.map((connector) => <Card key={connector.id}><div className="flex items-center justify-between"><h2 className="text-2xl font-semibold">{connector.name}</h2><span className="rounded-full border border-white/10 px-3 py-1 text-sm">{connector.status}</span></div><p className="mt-2 text-white/60">Auth: {connector.authType} · Last sync: {connector.lastSync}</p><div className="mt-4 grid grid-cols-2 gap-2 text-sm text-white/70"><span>读权限：{connector.capabilities.read ? '可申请' : '否'}</span><span>写权限：{connector.capabilities.write ? '需授权' : '否'}</span><span>消息发送：{connector.capabilities.messageSend ? '需确认' : '否'}</span><span>人工确认：{connector.capabilities.requiresHumanApprovalForWrite ? '默认需要' : '按策略'}</span></div></Card>)}</section></div>;
}
