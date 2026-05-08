import { describe, expect, it } from 'vitest';
import { canAttachModelBlock, createModelBlock } from '../../src/synapse';

describe('modular model mesh', () => {
  it('rejects high safety risk blocks', () => {
    const block = createModelBlock({ type: 'safety_block', title: 'Risky Safety Block', domain: 'safety', trainedFromSynapseIds: ['synapse-1'], capability: 'mock', requiresHumanReview: false });
    expect(canAttachModelBlock({ ...block, risk: { ...block.risk, safety: 'high' }, evaluation: { ...block.evaluation, passed: true } }).allowed).toBe(false);
  });

  it('rejects rejected or quarantined blocks', () => {
    const block = createModelBlock({ type: 'router_block', title: 'Router', domain: 'routing', trainedFromSynapseIds: ['synapse-1'], capability: 'mock', requiresHumanReview: false });
    expect(canAttachModelBlock({ ...block, status: 'rejected', evaluation: { ...block.evaluation, passed: true } }).allowed).toBe(false);
    expect(canAttachModelBlock({ ...block, status: 'quarantined', evaluation: { ...block.evaluation, passed: true } }).allowed).toBe(false);
  });
});
