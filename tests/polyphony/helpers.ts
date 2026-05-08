import type { VersionNode } from '../../src/polyphony/types';
import { resetCounterpointRelations, resetMergeProposals, resetVersionFamilies, resetVersionNodes, resetVersionReviews, resetVoiceTracks, createVersionFamily, createVoiceTrack, createVersionNode } from '../../src/polyphony';
export function resetPolyphony() { resetCounterpointRelations(); resetMergeProposals(); resetVersionReviews(); resetVersionNodes(); resetVoiceTracks(); resetVersionFamilies(); }
export function setupBasicPolyphony() {
  resetPolyphony();
  const family = createVersionFamily('skill_capsule', 'skill-1', 'Skill Family', { createdBy: 'tester', visibility: 'team' });
  const stable = createVoiceTrack(family.id, 'stable', 'Stable', 'reliable');
  const experimental = createVoiceTrack(family.id, 'experimental', 'Experimental', 'bold');
  const safety = createVoiceTrack(family.id, 'safety', 'Safety', 'risk review');
  const codex = createVoiceTrack(family.id, 'codex_auto', 'Codex', 'ai generated');
  const base = createVersionNode({ familyId: family.id, voiceTrackId: stable.id, parentVersionIds: [], title: 'Base', summary: 'base stable version', contentRef: 'ref://base', authorIds: ['u1'], status: 'active', riskLevel: 'low', privacyLevel: 'team', validationScore: 80, compressionScore: 70, safetyScore: 90, usefulnessScore: 85, reusabilityScore: 80, costProfile: { cacheHitRate: 0.5, expectedReuseCount: 10 }, metadata: {} });
  return { family, stable, experimental, safety, codex, base };
}
export function node(overrides: Partial<VersionNode>) { const setup = setupBasicPolyphony(); return createVersionNode({ familyId: setup.family.id, voiceTrackId: setup.stable.id, parentVersionIds: [], title: 'Node', summary: 'summary', contentRef: 'ref://node', authorIds: ['u1'], status: 'active', riskLevel: 'low', privacyLevel: 'team', safetyScore: 90, usefulnessScore: 80, compressionScore: 70, metadata: {}, ...overrides }); }
