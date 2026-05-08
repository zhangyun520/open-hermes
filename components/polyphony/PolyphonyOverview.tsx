import { Card, Metric } from '@/components/UI';
import { mockMergeProposals, mockVersionFamilies, mockVersionNodes, mockVoiceTracks } from '@/src/polyphony/mockData';
export function PolyphonyOverview() {
  const codexRecent = mockVersionNodes.find((node) => node.metadata.aiGenerated);
  return <div className="grid gap-4 md:grid-cols-4"><Metric label="活跃家族" value={mockVersionFamilies.length} /><Metric label="活跃声部" value={mockVoiceTracks.filter((track) => track.status === 'active').length} /><Metric label="审核中版本" value={mockVersionNodes.filter((node) => node.status === 'reviewing').length} /><Metric label="合流提案" value={mockMergeProposals.length} /><Metric label="隔离高风险" value={mockVersionNodes.filter((node) => node.status === 'quarantined').length} /><Metric label="Canonical" value={mockVersionNodes.filter((node) => node.status === 'canonical').length} /><Metric label="Experimental" value={mockVersionNodes.filter((node) => node.status === 'experimental').length} /><Card><p className="text-sm text-white/55">最近 Codex 自动分支</p><p className="mt-2 text-lg font-semibold text-plankton">{codexRecent?.title ?? '暂无'}</p></Card></div>;
}
