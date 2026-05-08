import { notFound } from 'next/navigation';
import { PageTitle } from '@/components/UI';
import { MergeProposalPanel } from '@/components/polyphony/MergeProposalPanel';
import { getMergeProposal } from '@/src/polyphony';

export default async function MergePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const proposal = getMergeProposal(id);
  if (!proposal) notFound();
  return (
    <div>
      <PageTitle eyebrow="Merge Proposal" title="合流提案详情">合流不是覆盖，而是保留原声部并生成新的 VersionNode。</PageTitle>
      <MergeProposalPanel proposal={proposal} />
    </div>
  );
}
