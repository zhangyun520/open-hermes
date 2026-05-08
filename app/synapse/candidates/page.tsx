import { PageTitle } from '@/components/UI';
import { TrainingCandidateCard } from '@/components/synapse/TrainingCandidateCard';
import { createTrainingCandidate, mockNeuralFertilizers } from '@/src/synapse';

export default function CandidatesPage() {
  const candidates = mockNeuralFertilizers.filter((fertilizer) => fertilizer.grade === 'F4_TRAINING_CANDIDATE' || fertilizer.grade === 'F5_FOUNDATION_GRADE').map((fertilizer) => createTrainingCandidate(fertilizer, fertilizer.grade === 'F5_FOUNDATION_GRADE' ? ['routing', 'evaluation', 'embedding'] : ['evaluation', 'residual']));
  return <div><PageTitle eyebrow="Training Candidate Pool" title="训练候选池">这里只展示通过 NFAP 的 mock candidates；F0/F1 不会进入训练候选池。</PageTitle><section className="grid gap-4 md:grid-cols-2">{candidates.map((candidate) => <TrainingCandidateCard key={candidate.id} candidate={candidate} />)}</section></div>;
}
