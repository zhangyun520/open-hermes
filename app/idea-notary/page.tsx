import { Card, PageTitle } from '@/components/UI';
import { notaryRecords } from '@/lib/mock';
export default function IdeaNotary() { return <div><PageTitle eyebrow="Idea Notary" title="想法公证处">公证处不判断价值，只证明历史。愿望、灵感与残差在时间戳中留下可验证痕迹。</PageTitle><section className="grid gap-4 md:grid-cols-2">{notaryRecords.map(n => <Card key={n.hash}><p className="text-tide">{n.visibility} · {n.version}</p><h3 className="break-all text-2xl font-semibold">{n.hash}</h3><p className="mt-3 text-white/65">贡献者：{n.contributorId} · {n.createdAt}</p></Card>)}</section></div>; }
