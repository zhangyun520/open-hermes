import { generateBiasAlert, generateCognitiveFingerprint, generateResidualCardFromGarbage, generateResidualCardFromReverseWish, generateResidualCardFromWish } from './cognitive';
import { evolveJellyPet } from './jellyPet';
import type { CognitiveWill, ContributionEvent, GarbageInput, HumanTransitionCard, IdeaNotaryRecord, Review, ReverseWish, SkillCapsule, User, Wish } from './types';

export const users: User[] = [
  { id: 'u-lan', name: '蓝藻策展人', domains: ['education', 'care'], reputation: 82, feedValue: 1300 },
  { id: 'u-moon', name: '月潮审核员', domains: ['ops', 'policy'], reputation: 91, feedValue: 980 }
];

export const wishes: Wish[] = [
  { id: 'w1', title: '把客服失败工单变成训练卡', domain: 'customer-success', pain: 86, targetUser: '一线客服', desiredOutput: '可复用的回复工作流与风险提示', urgency: 78, publicValue: 82, verifiability: 88, risk: 'medium', creator: 'u-lan' },
  { id: 'w2', title: '给独居老人整理药盒提醒', domain: 'care', pain: 92, targetUser: '社区照护者', desiredOutput: '低打扰提醒模板', urgency: 90, publicValue: 74, verifiability: 70, risk: 'high', creator: 'u-moon' }
];

export const reverseWishes: ReverseWish[] = [
  { id: 'rw1', description: '多余的课程错题解析流程', originalContext: '高中数学助教项目', possibleUses: ['错题分层', '学生薄弱点摘要'], confidence: 76, privacyLevel: 'medium', creator: 'u-lan' },
  { id: 'rw2', description: '闲置的工单标签体系', originalContext: 'SaaS 售后团队', possibleUses: ['垃圾站分类', '客服技能胶囊'], confidence: 81, privacyLevel: 'low', creator: 'u-moon' }
];

export const garbageInputs: GarbageInput[] = [
  { id: 'g1', source: 'ai_drift', domain: 'education', creator: 'u-lan', content: 'AI 把上海星河中学张伟同学的错题原因归因为懒惰，实际是概念迁移失败。电话 13812345678' },
  { id: 'g2', source: 'idea_fragment', domain: 'ops', creator: 'u-moon', content: '灵感：把审核评论压缩成技能胶囊的反例库。' }
];

export const residualCards = [
  ...wishes.map(generateResidualCardFromWish),
  ...reverseWishes.map(generateResidualCardFromReverseWish),
  ...garbageInputs.map(generateResidualCardFromGarbage)
];

export const skills: SkillCapsule[] = [
  { skillId: 's1', name: '错题残差压缩', domain: 'education', residualTypes: ['wrong_answer', 'wish'], workflow: ['脱敏', '定位概念断点', '生成练习'], verification: '二次测验提升', riskPolicy: '未脱敏不得公开', level: 5, usageCount: 128, cacheHitCount: 46, verifiedCompressionCount: 31, failureCases: ['误把情绪归因为能力'], contributors: ['u-lan', 'u-moon'], xp: 520, version: '0.3.1' },
  { skillId: 's2', name: '工单复用路由', domain: 'customer-success', residualTypes: ['ticket', 'reverse_wish'], workflow: ['聚类', '匹配', '生成行动'], verification: '首次解决率', riskPolicy: '高风险转人工', level: 4, usageCount: 74, cacheHitCount: 29, verifiedCompressionCount: 18, failureCases: ['忽略少数语言用户'], contributors: ['u-moon'], xp: 390, version: '0.2.0' }
];

export const reviews: Review[] = [
  { id: 'r1', targetId: 'res-wish-w1', novelty: 78, usefulness: 86, reusability: 83, evidenceStrength: 72, risk: 'medium', recommendation: 'assetize', comment: '可转技能，但需补充失败样本。' },
  { id: 'r2', targetId: 'res-gar-g1', novelty: 65, usefulness: 70, reusability: 42, evidenceStrength: 80, risk: 'high', recommendation: 'needs_human_review', comment: '包含学校姓名与手机号，必须人工审核。' }
];

export const contributions: ContributionEvent[] = [
  { id: 'c1', actor: 'u-lan', action: 'wish', targetId: 'education-w1', weight: 8, createdAt: '2026-05-01T09:00:00Z' },
  { id: 'c2', actor: 'u-lan', action: 'feed', targetId: 'education-g1', weight: 7, createdAt: '2026-05-02T09:00:00Z' },
  { id: 'c3', actor: 'u-moon', action: 'review', targetId: 'ops-r1', weight: 9, createdAt: '2026-05-03T09:00:00Z' },
  { id: 'c4', actor: 'u-lan', action: 'upgrade', targetId: 'education-s1', weight: 6, createdAt: '2026-05-04T09:00:00Z' }
];

export const notaryRecords: IdeaNotaryRecord[] = [
  { hash: '8f7c...jelly', createdAt: '2026-05-01T10:11:00Z', contributorId: 'u-lan', visibility: 'private', version: 'v1' },
  { hash: '21bd...reef', createdAt: '2026-05-04T08:30:00Z', contributorId: 'u-moon', visibility: 'community', version: 'v2' }
];

export const transitionCards: HumanTransitionCard[] = [
  { id: 'ht1', role: '客服质检', tasksAutomated: ['重复工单归类', '回复草稿'], tasksRemainingHuman: ['升级判断', '共情解释', '责任确认'], displacementRisk: 'medium', transitionPaths: ['技能审核员', '反例策展人'], trainingNeeded: ['隐私识别', '工单残差标注'], incomeProtectionSuggestion: '技能分润 + 过渡补贴', contributionRights: '保留历史工单经验署名权', dignityRisk: 'medium', approvalRequired: false }
];

export const fingerprint = generateCognitiveFingerprint(contributions.filter(c => c.actor === 'u-lan'));
export const biasAlerts = generateBiasAlert({ residualByDomain: { education: 24, care: 8, ops: 16 }, reviewerWeights: { moon: 0.62, lan: 0.28 }, coldWishes: 7, undervaluedGroups: ['社区照护者'] });
export const cognitiveWill: CognitiveWill = { ownerId: 'u-lan', inherit: ['私有技能索引'], donate: ['公开反例库'], seal: ['未完成愿望'], destroy: ['敏感原文'], note: '一个人的想法、技能和贡献在离开系统后，如何闭环。' };

export const jellyPet = evolveJellyPet({
  wishes: wishes.length,
  failures: garbageInputs.length,
  residuals: residualCards.length,
  reviews: reviews.length,
  skills: skills.length,
  cacheHits: 9,
  biasAlerts: biasAlerts.length,
  humanTransitionCards: transitionCards.length
});
