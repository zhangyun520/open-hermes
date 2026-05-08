import { describe, expect, it } from 'vitest';
import { createVersionNode, getVersionNode, mergeProposalToVersion, proposeMerge } from '../../src/polyphony';
import { setupBasicPolyphony } from './helpers';
describe('polyphony merge proposals', () => {
  it('MergeProposal must have sourceVersionIds', () => { const { stable } = setupBasicPolyphony(); expect(() => proposeMerge([], stable.id, 'merge')).toThrow('sourceVersionIds'); });
  it('merge does not overwrite original versions and creates a new VersionNode', () => { const { family, stable, safety, base } = setupBasicPolyphony(); const safetyNode = createVersionNode({ familyId: family.id, voiceTrackId: safety.id, parentVersionIds: [base.id], title: 'Safety Gate', summary: 'safety branch', contentRef: 'ref://safety', authorIds: ['u2'], status: 'active', riskLevel: 'low', privacyLevel: 'team', safetyScore: 95, compressionScore: 60, metadata: {} }); const proposal = proposeMerge([base.id, safetyNode.id], stable.id, 'merge safety chapter'); const merged = mergeProposalToVersion(proposal.id); expect(merged.parentVersionIds).toEqual([base.id, safetyNode.id]); expect(getVersionNode(base.id)?.title).toBe('Base'); expect(getVersionNode(safetyNode.id)?.title).toBe('Safety Gate'); });
});
