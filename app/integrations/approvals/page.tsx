'use client';
import { useState } from 'react';
import { Card, PageTitle } from '@/components/UI';
import { approvalQueue } from '@/src/integrations/gateway/integrationMockData';
import type { ActionApproval } from '@/src/integrations/types';

export default function IntegrationApprovalsPage() {
  const [items, setItems] = useState<ActionApproval[]>(approvalQueue);
  return <div><PageTitle eyebrow="Action Approval Queue" title="外部动作确认队列">发送消息、发邮件、日历邀请、Git push、删文件、合同/保险承诺/教育评估报告对外发送等高风险动作必须人工确认。</PageTitle><section className="grid gap-4">{items.map((item) => <Card key={item.actionId}><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-tide">{item.connector} · {item.actionType} · {item.riskLevel}</p><h2 className="text-2xl font-semibold">{item.summary}</h2><p className="mt-2 text-white/60">状态：{item.status}</p></div><div className="flex gap-2"><button onClick={() => setItems((current) => current.map((x) => x.actionId === item.actionId ? { ...x, status: 'approved' } : x))} className="rounded-xl bg-plankton/20 px-4 py-2 text-plankton">approve</button><button onClick={() => setItems((current) => current.map((x) => x.actionId === item.actionId ? { ...x, status: 'rejected' } : x))} className="rounded-xl bg-coral/20 px-4 py-2 text-coral">reject</button><button onClick={() => setItems((current) => current.map((x) => x.actionId === item.actionId ? { ...x, status: 'revision_required' } : x))} className="rounded-xl bg-white/10 px-4 py-2 text-white/70">require revision</button></div></div></Card>)}</section></div>;
}
