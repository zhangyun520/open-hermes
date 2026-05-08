import { Card, PageTitle } from '@/components/UI';
import { FertilizerGateChecklist } from '@/components/synapse/FertilizerGateChecklist';
import { FertilizerGradeBadge } from '@/components/synapse/FertilizerGradeBadge';
import { admitFertilizer, gradeFertilizer, mockNeuralFertilizers } from '@/src/synapse';

export default function FertilizerPage() {
  return <div><PageTitle eyebrow="NFAP Fertilizer Gate" title="Neural Fertilizer / 神经肥料">展示 F0-F5 mock 肥料、九重准入门，以及是否可进入训练候选池或基础模型级候选。</PageTitle><section className="grid gap-4 xl:grid-cols-2">{mockNeuralFertilizers.map((fertilizer) => { const admission = admitFertilizer(fertilizer); return <Card key={fertilizer.id}><div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-xl font-semibold">{fertilizer.title}</h2><FertilizerGradeBadge grade={gradeFertilizer(fertilizer)} /></div><p className="mt-3 text-sm text-white/60">candidate pool: {admission.canEnterTrainingCandidatePool ? 'yes' : 'no'} · foundation: {admission.canTrainFoundationModel ? 'yes' : 'no'}</p><div className="mt-4"><FertilizerGateChecklist fertilizer={fertilizer} /></div></Card>; })}</section></div>;
}
