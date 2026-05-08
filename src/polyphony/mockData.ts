import { createCounterpointRelation } from './counterpoint';
import { generateCodexPolyphonyTask } from './codexPolyphonyAdapter';
import { proposeMerge } from './mergeProposal';
import { createVersionFamily, listVersionFamilies, resetVersionFamilies } from './versionFamily';
import { createVersionNode, listVersionNodes, resetVersionNodes } from './versionNode';
import { createVoiceTrack, listVoiceTracks, resetVoiceTracks } from './voiceTrack';
import { resetCounterpointRelations } from './counterpoint';
import { resetMergeProposals, listMergeProposals } from './mergeProposal';
import { resetVersionReviews, reviewVersion } from './review';

resetVersionFamilies(); resetVoiceTracks(); resetVersionNodes(); resetCounterpointRelations(); resetMergeProposals(); resetVersionReviews();

export const whitepaperFamily = createVersionFamily('whitepaper', 'cognitive-city-whitepaper', '认知城市白皮书', { createdBy: 'u-lan', tags: ['whitepaper', 'cognitive-city'], visibility: 'community', description: 'Cognitive Jelly 的城市级愿景、治理、安全和生态版本家族。' });
const stable = createVoiceTrack(whitepaperFamily.id, 'stable', 'Stable 主旋律', '低风险、可运行、可解释的白皮书主线。', { contributorIds: ['u-lan'] });
const experimental = createVoiceTrack(whitepaperFamily.id, 'experimental', 'Experimental 实验声部', '探索认知城市的激进组织形态。', { contributorIds: ['u-moon'] });
const safety = createVoiceTrack(whitepaperFamily.id, 'safety', 'Safety 安全声部', '审查隐私、公共缓存、人类安置与外部连接风险。', { contributorIds: ['u-reef'] });
const codex = createVoiceTrack(whitepaperFamily.id, 'codex_auto', 'Codex Auto 自动开发声部', 'Codex 并行产物进入 review，不直接 canonical。', { contributorIds: ['codex'] });
const world = createVoiceTrack(whitepaperFamily.id, 'world_model', 'World-model 世界模型声部', '记录宏观假设、置信度、失效条件和历史误差。', { contributorIds: ['u-reef'] });

const vStable = createVersionNode({ familyId: whitepaperFamily.id, voiceTrackId: stable.id, parentVersionIds: [], title: '认知城市白皮书 v1 stable', summary: '最小可解释版本：愿望、残差、技能、共享缓存与安全治理闭环。', contentRef: 'whitepaper://stable-v1', authorIds: ['u-lan'], status: 'canonical', riskLevel: 'low', privacyLevel: 'public', validationScore: 88, compressionScore: 70, safetyScore: 92, usefulnessScore: 86, reusabilityScore: 84, costProfile: { cacheHitRate: 0.61, expectedReuseCount: 30 }, safetyMetadata: { requiresHumanReview: false, affectsPublicCache: true, affectsExternalActions: false, affectsHumanTransition: false, containsSensitiveData: false }, metadata: { useCase: 'public narrative' } });
whitepaperFamily.canonicalVersionId = vStable.id;
const vExperimental = createVersionNode({ familyId: whitepaperFamily.id, voiceTrackId: experimental.id, parentVersionIds: [vStable.id], title: '认知城市白皮书 / DAO 实验声部', summary: '探索社区共创和公共技能公地治理，但默认不进入 public cache。', contentRef: 'whitepaper://experimental-dao', authorIds: ['u-moon'], status: 'experimental', riskLevel: 'medium', privacyLevel: 'community', validationScore: 68, compressionScore: 64, safetyScore: 76, usefulnessScore: 80, originalityScore: 92, metadata: { useCase: 'governance experiments' } });
const vSafety = createVersionNode({ familyId: whitepaperFamily.id, voiceTrackId: safety.id, parentVersionIds: [vStable.id], title: '公共缓存安全红线', summary: '阻止未脱敏、未授权、高风险或 AI 未审版本进入 canonical/public cache。', contentRef: 'whitepaper://safety-redline', authorIds: ['u-reef'], status: 'active', riskLevel: 'low', privacyLevel: 'public', validationScore: 90, compressionScore: 58, safetyScore: 96, usefulnessScore: 82, safetyMetadata: { requiresHumanReview: false, affectsPublicCache: true, affectsExternalActions: true, affectsHumanTransition: true, containsSensitiveData: false }, metadata: { useCase: 'release gate' } });
const vCodex = createVersionNode({ familyId: whitepaperFamily.id, voiceTrackId: codex.id, parentVersionIds: [vStable.id], title: 'Codex 生成：章节重排建议', summary: 'AI 自动提出章节结构与任务拆解，等待人工审核。', contentRef: 'codex://whitepaper-rewrite', authorIds: ['codex'], status: 'reviewing', riskLevel: 'medium', privacyLevel: 'team', validationScore: 60, compressionScore: 55, safetyScore: 72, usefulnessScore: 74, metadata: { aiGenerated: true, changedFiles: ['README.md'] } });
const vWorld = createVersionNode({ familyId: whitepaperFamily.id, voiceTrackId: world.id, parentVersionIds: [vStable.id], title: '世界模型：共享缓存增长假设', summary: '预测共享缓存命中率增长，但显式记录假设、置信度和失效条件。', contentRef: 'world-model://cache-growth', authorIds: ['u-reef'], status: 'active', riskLevel: 'medium', privacyLevel: 'community', validationScore: 66, compressionScore: 45, safetyScore: 84, usefulnessScore: 72, uncertaintyMetadata: { assumptions: ['用户愿意提交脱敏残差', '审核池能跟上增长'], confidence: 0.62, knownUnknowns: ['真实组织采用率', '行业隐私差异'], failureConditions: ['审核积压超过 7 天', '公共缓存出现隐私事故'], lastValidatedAt: '2026-05-08T00:00:00Z' }, metadata: { useCase: 'planning' } });
createCounterpointRelation(vSafety.id, vCodex.id, 'blocks_public_release', 'Codex 自动版本必须人工 review 后才允许 canonical。');
createCounterpointRelation(vExperimental.id, vStable.id, 'extends', '实验治理线扩展 stable 主旋律，但不覆盖。');
export const sampleMergeProposal = proposeMerge([vStable.id, vSafety.id], stable.id, '把安全红线作为 stable 发布前置章节，保留独立 safety 声部。', { proposedBy: 'u-lan', reviewerIds: ['u-reef'] });
reviewVersion(vStable.id, { reviewerId: 'u-reef', clarity: 90, usefulness: 88, safety: 94, reusability: 84, originality: 78, compatibility: 90, recommendation: 'promote_to_canonical', comment: '可作为当前主旋律规范发布。' });

export const skillFamily = createVersionFamily('skill_capsule', 'cache-skill-edu-baby', '压轴题婴儿版讲解技能', { createdBy: 'u-lan', tags: ['skill', 'education'], visibility: 'team' });
const skillStable = createVoiceTrack(skillFamily.id, 'stable', 'Stable 教育技能', '保持可靠讲解流程。');
const skillLowCost = createVoiceTrack(skillFamily.id, 'low_cost', 'Low-cost 蒸馏声部', '降低模型调用，提高缓存命中。');
createVersionNode({ familyId: skillFamily.id, voiceTrackId: skillStable.id, parentVersionIds: [], title: '三步讲解稳定版', summary: '识别题型、拆解公式、给出婴儿版类比。', contentRef: 'skill://edu-stable', authorIds: ['u-lan'], status: 'active', riskLevel: 'low', privacyLevel: 'team', validationScore: 82, compressionScore: 68, safetyScore: 90, usefulnessScore: 88, costProfile: { cacheHitRate: 0.48, expectedReuseCount: 18 }, metadata: { domain: 'education' } });
createVersionNode({ familyId: skillFamily.id, voiceTrackId: skillLowCost.id, parentVersionIds: [], title: '低成本缓存优先版', summary: '先查题型缓存和残差模板，只有低置信度时调用模型。', contentRef: 'skill://edu-low-cost', authorIds: ['u-moon'], status: 'experimental', riskLevel: 'low', privacyLevel: 'team', validationScore: 76, compressionScore: 82, safetyScore: 86, usefulnessScore: 80, costProfile: { cacheHitRate: 0.73, expectedReuseCount: 24 }, metadata: { domain: 'education' } });

export const codexPolyphonyTasks = generateCodexPolyphonyTask('设计认知大陆地图', ['stable', 'aesthetic', 'low_cost', 'safety', 'gameplay', 'world_model']);
export const mockVersionFamilies = listVersionFamilies();
export const mockVoiceTracks = listVoiceTracks();
export const mockVersionNodes = listVersionNodes();
export const mockMergeProposals = listMergeProposals();
