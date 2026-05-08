import type { FertilizerGrade } from '@/src/synapse';

const gradeStyle: Record<FertilizerGrade, string> = {
  F0_RAW_WASTE: 'border-coral/50 bg-coral/10 text-coral',
  F1_COMPOSTABLE: 'border-amber-300/40 bg-amber-300/10 text-amber-200',
  F2_STRUCTURED: 'border-tide/40 bg-tide/10 text-tide',
  F3_VERIFIED: 'border-plankton/40 bg-plankton/10 text-plankton',
  F4_TRAINING_CANDIDATE: 'border-violet-300/40 bg-violet-300/10 text-violet-200',
  F5_FOUNDATION_GRADE: 'border-cyan-200/60 bg-cyan-200/10 text-cyan-100'
};

export function FertilizerGradeBadge({ grade }: { grade: FertilizerGrade }) {
  return <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${gradeStyle[grade]}`}>{grade.replaceAll('_', ' ')}</span>;
}
