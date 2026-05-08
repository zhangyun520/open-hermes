import type { ModelBlock, ModelBlockType } from './types';

export function createModelBlock(input: {
  type: ModelBlockType;
  title: string;
  domain: string;
  trainedFromSynapseIds: string[];
  capability: string;
  requiresHumanReview: boolean;
}): ModelBlock {
  return {
    id: `block-${input.type}-${input.domain}`.replace(/[^a-zA-Z0-9-]+/g, '-').toLowerCase(),
    type: input.type,
    title: input.title,
    domain: input.domain,
    trainedFromSynapseIds: input.trainedFromSynapseIds,
    capability: input.capability,
    evaluation: { benchmarkName: 'mock mesh attach benchmark', passed: false },
    risk: { privacy: 'low', bias: 'low', safety: input.requiresHumanReview ? 'medium' : 'low' },
    status: input.requiresHumanReview ? 'candidate' : 'sandbox',
    requiresHumanReview: input.requiresHumanReview
  };
}

export function canAttachModelBlock(block: ModelBlock): { allowed: boolean; reason: string } {
  if (block.status === 'rejected' || block.status === 'quarantined') return { allowed: false, reason: 'rejected or quarantined model blocks cannot attach' };
  if (block.risk.privacy === 'high' || block.risk.privacy === 'critical') return { allowed: false, reason: 'high privacy risk blocks cannot attach' };
  if (block.risk.safety === 'high' || block.risk.safety === 'critical') return { allowed: false, reason: 'high safety risk blocks cannot attach' };
  if (block.requiresHumanReview && block.status !== 'accepted') return { allowed: false, reason: 'human review is required before attachment' };
  if (!block.evaluation.passed) return { allowed: false, reason: 'model block must pass evaluation before attachment' };
  return { allowed: true, reason: 'evaluated block may attach to the modular model mesh' };
}
