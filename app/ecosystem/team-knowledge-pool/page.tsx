'use client';
import { useState } from 'react';
import { Card, Metric, PageTitle } from '@/components/UI';
import '@/src/ecosystem/mockData';
import { listTeamKnowledgePool } from '@/src/ecosystem/commons/teamKnowledgePool';
import { promoteCacheObject } from '@/src/ecosystem/sharedCache/sharedSkillMemoryPool';

export default function TeamKnowledgePoolPage() {
  const [message, setMessage] = useState('');
  const objects = listTeamKnowledgePool('team-edu');
  return <div><PageTitle eyebrow="Team Knowledge Pool" title="团队知识池">用户必须明确选择进入团队池；团队共享仍需要脱敏、授权、贡献链和审核约束。</PageTitle><section className="grid gap-4 md:grid-cols-2">{objects.map((object) => <Card key={object.id}><p className="text-tide">{object.status} · {object.domain}</p><h2 className="text-2xl font-semibold">{object.title}</h2><div className="mt-4 grid grid-cols-3 gap-3"><Metric label="团队命中" value={object.cacheHitCount} /><Metric label="贡献者" value={object.contributors.length} /><Metric label="压缩证明" value={object.verifiedCompressionScore} /></div><button onClick={() => { const result = promoteCacheObject(object.id, 'community'); setMessage(result.allowed ? `${object.title} 已晋升社区候选/验证` : result.reasons.join(' / ')); }} className="mt-5 rounded-xl bg-plankton/20 px-4 py-2 text-plankton">晋升到社区候选</button></Card>)}</section>{message ? <Card className="mt-4 text-coral">{message}</Card> : null}</div>;
}
