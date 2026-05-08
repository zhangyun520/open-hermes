import type {
  BiasAlert,
  CognitiveFingerprint,
  ContributionEvent,
  GarbageClass,
  GarbageInput,
  HumanTransitionCard,
  ResidualCard,
  Review,
  ReverseWish,
  RiskLevel,
  SkillCapsule,
  Wish
} from './types';

const riskWeight: Record<RiskLevel, number> = { low: 1, medium: 0.76, high: 0.42 };
const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const round2 = (value: number) => Math.round(value * 100) / 100;

function hasHighRisk(...risks: RiskLevel[]) {
  return risks.includes('high');
}

export function calculateNeedScore(wish: Wish): number {
  const outputClarityBonus = wish.desiredOutput.length > 8 ? 10 : 0;
  const rawScore =
    wish.pain * 0.28 +
    wish.urgency * 0.22 +
    wish.publicValue * 0.24 +
    wish.verifiability * 0.16 +
    outputClarityBonus;

  return Math.round(rawScore * riskWeight[wish.risk]);
}

export function redactSensitiveInfo(text: string): { redacted: string; findings: string[]; risk: RiskLevel } {
  const patterns: Array<{ pattern: RegExp; label: string; replacement: string }> = [
    { pattern: /(?<!\d)1[3-9]\d{9}(?!\d)/g, label: '手机号', replacement: '[手机号已脱敏]' },
    {
      pattern: /(?<!\d)(\d{6}(18|19|20)\d{2}(0[1-9]|1[0-2])([0-2]\d|3[01])\d{3}[0-9Xx])(?!\d)/g,
      label: '身份证',
      replacement: '[身份证已脱敏]'
    },
    {
      pattern: /[京沪津渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼][A-Z][A-Z0-9]{5}/g,
      label: '车牌',
      replacement: '[车牌已脱敏]'
    },
    {
      pattern: /([\u4e00-\u9fa5]{2,12}(学校|大学|学院|中学|小学))([\u4e00-\u9fa5]{2,4})(同学|老师|学生)?/g,
      label: '学校姓名',
      replacement: '$1[姓名已标记]$4'
    }
  ];

  const findings: string[] = [];
  let redacted = text;

  for (const item of patterns) {
    item.pattern.lastIndex = 0;
    if (item.pattern.test(redacted)) findings.push(item.label);
    item.pattern.lastIndex = 0;
    redacted = redacted.replace(item.pattern, item.replacement);
  }

  const risk: RiskLevel = findings.length >= 2 ? 'high' : findings.length === 1 ? 'medium' : 'low';
  return { redacted, findings, risk };
}

export function classifyGarbage(input: GarbageInput): {
  classification: GarbageClass;
  privacyRisk: RiskLevel;
  redactedContent: string;
} {
  const privacy = redactSensitiveInfo(input.content);
  const normalized = input.content.toLowerCase();
  let classification: GarbageClass = 'recyclable';

  if (privacy.risk === 'high') classification = 'review_required';
  else if (/攻击|自残|仇恨|exploit|password|密钥/.test(normalized)) classification = 'harmful';
  else if (/灵感|想法|maybe|草稿|启发/.test(normalized)) classification = 'compostable';
  else if (input.content.trim().length < 8) classification = 'slag';

  return { classification, privacyRisk: privacy.risk, redactedContent: privacy.redacted };
}

function buildResidualCard(partial: Omit<ResidualCard, 'currentD' | 'publicAssetAllowed'>): ResidualCard {
  const currentD = round2(1 - partial.currentC);
  const publicAssetAllowed = partial.reusable && !hasHighRisk(partial.riskPrivacy, partial.riskSafety, partial.riskCompliance);

  return { ...partial, currentD, publicAssetAllowed };
}

export function generateResidualCardFromWish(wish: Wish): ResidualCard {
  const score = wish.needScore ?? calculateNeedScore(wish);

  return buildResidualCard({
    residualId: `res-wish-${wish.id}`,
    sourceType: 'wish',
    domain: wish.domain,
    task: wish.title,
    need: wish.desiredOutput,
    currentC: clamp01(score / 100),
    targetD: 0.18,
    evidence: [wish.targetUser, `pain:${wish.pain}`, `public:${wish.publicValue}`],
    candidateActions: ['拆解愿望', '生成验证任务', '寻找可复用技能'],
    verificationMetric: '用户确认输出可用 + 复用次数',
    riskPrivacy: wish.risk,
    riskSafety: 'low',
    riskCompliance: wish.risk === 'high' ? 'medium' : 'low',
    reusable: wish.publicValue >= 55,
    status: wish.risk === 'high' ? 'review_required' : 'draft'
  });
}

export function generateResidualCardFromReverseWish(reverseWish: ReverseWish): ResidualCard {
  return buildResidualCard({
    residualId: `res-rev-${reverseWish.id}`,
    sourceType: 'reverse_wish',
    domain: 'latent-supply',
    task: reverseWish.description,
    need: reverseWish.possibleUses.join(' / '),
    currentC: clamp01(reverseWish.confidence / 100),
    targetD: 0.24,
    evidence: [reverseWish.originalContext],
    candidateActions: ['匹配愿望池', '转换为技能原料', '生成安置建议'],
    verificationMetric: '被需求匹配并完成一次验证',
    riskPrivacy: reverseWish.privacyLevel,
    riskSafety: 'low',
    riskCompliance: 'low',
    reusable: reverseWish.privacyLevel !== 'high',
    status: reverseWish.privacyLevel === 'high' ? 'review_required' : 'draft'
  });
}

export function generateResidualCardFromGarbage(input: GarbageInput): ResidualCard {
  const classified = classifyGarbage(input);
  const harmful = classified.classification === 'harmful';
  const reviewRequired = classified.classification === 'review_required' || classified.privacyRisk === 'high';

  return buildResidualCard({
    residualId: `res-gar-${input.id}`,
    sourceType: 'garbage',
    domain: input.domain,
    task: input.source,
    need: classified.redactedContent.slice(0, 80),
    currentC: classified.classification === 'recyclable' ? 0.48 : classified.classification === 'compostable' ? 0.34 : 0.18,
    targetD: 0.3,
    evidence: [classified.classification, `privacy:${classified.privacyRisk}`],
    candidateActions: ['脱敏', '分类', '转残差卡', '必要时人工审核'],
    verificationMetric: '脱敏通过 + 分类一致性',
    riskPrivacy: classified.privacyRisk,
    riskSafety: harmful ? 'high' : 'low',
    riskCompliance: classified.privacyRisk === 'high' ? 'high' : 'low',
    reusable: classified.privacyRisk !== 'high' && !harmful,
    status: reviewRequired ? 'review_required' : 'draft'
  });
}

export function calculateCompressionPotential(card: ResidualCard): number {
  return round2(Math.max(0, card.currentD - card.targetD));
}

export function normalizeReviewRecommendation(review: Review): Review['recommendation'] {
  if (review.risk === 'high') return 'needs_human_review';
  return review.recommendation;
}

export function calculateReviewScore(review: Review): number {
  const rawScore =
    review.novelty * 0.18 +
    review.usefulness * 0.28 +
    review.reusability * 0.22 +
    review.evidenceStrength * 0.22;

  return Math.round(rawScore * riskWeight[review.risk]);
}

export function requiresHumanReview(card: ResidualCard): boolean {
  return card.status === 'review_required' || hasHighRisk(card.riskPrivacy, card.riskSafety, card.riskCompliance);
}

export function calculatePendingReward(contribution: ContributionEvent, reviewScore: number) {
  return {
    feedValue: Math.round(contribution.weight * reviewScore * 0.8),
    reputation: Math.round(reviewScore / 10),
    compressionCredential: `CJ-${contribution.targetId}-${reviewScore}`,
    revenueRight: reviewScore > 70 ? 'mock-share-eligible' : 'learning-credit'
  };
}

export function updateSkillXP(skill: SkillCapsule, assetizedResidualCard: ResidualCard): SkillCapsule {
  const gain = assetizedResidualCard.status === 'assetized' ? Math.round(calculateCompressionPotential(assetizedResidualCard) * 100) : 0;
  const nextXP = skill.xp + gain;
  const nextLevel = skill.level + (nextXP >= (skill.level + 1) * 100 ? 1 : 0);

  return { ...skill, xp: nextXP, level: nextLevel, usageCount: skill.usageCount + 1 };
}

export function generateHumanTransitionCard(automatedWorkflow: {
  role: string;
  tasks: string[];
  risk: RiskLevel;
}): HumanTransitionCard {
  return {
    id: `ht-${automatedWorkflow.role.replace(/\s+/g, '-').toLowerCase()}`,
    role: automatedWorkflow.role,
    tasksAutomated: automatedWorkflow.tasks,
    tasksRemainingHuman: ['复杂判断', '关系维护', '责任确认'],
    displacementRisk: automatedWorkflow.risk,
    transitionPaths: ['审核员', '训练数据策展人', '领域解释员'],
    trainingNeeded: ['残差标注', '工具协作', '风险识别'],
    incomeProtectionSuggestion: '保留贡献权与过渡期补偿池',
    contributionRights: '参与技能升级分润与署名',
    dignityRisk: automatedWorkflow.risk,
    approvalRequired: automatedWorkflow.risk === 'high'
  };
}

export function generateCognitiveFingerprint(userEvents: ContributionEvent[]): CognitiveFingerprint {
  const questionDomains: Record<string, number> = {};
  const compressionDomains: Record<string, number> = {};

  for (const event of userEvents) {
    const domain = event.targetId.split('-')[0] || 'general';
    if (event.action === 'wish') questionDomains[domain] = (questionDomains[domain] ?? 0) + event.weight;
    if (['feed', 'test', 'upgrade'].includes(event.action)) {
      compressionDomains[domain] = (compressionDomains[domain] ?? 0) + event.weight;
    }
  }

  return {
    userId: userEvents[0]?.actor ?? 'anonymous',
    questionDomains,
    compressionDomains,
    bridgeDomains: Array.from(new Set([...Object.keys(questionDomains), ...Object.keys(compressionDomains)])).slice(0, 5),
    reviewAccuracy: userEvents.some((event) => event.action === 'review') ? 0.86 : 0.5,
    skillContribution: Object.values(compressionDomains).reduce((sum, value) => sum + value, 0),
    ownershipNote: '你的认知指纹默认属于你自己'
  };
}

export async function createIdeaNotaryHash(content: string): Promise<string> {
  const data = new TextEncoder().encode(content);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

export function generateBiasAlert(state: {
  residualByDomain: Record<string, number>;
  reviewerWeights: Record<string, number>;
  coldWishes: number;
  undervaluedGroups: string[];
}): BiasAlert[] {
  const alerts: BiasAlert[] = [];
  const maxDomain = Object.entries(state.residualByDomain).sort((a, b) => b[1] - a[1])[0];

  if (maxDomain && maxDomain[1] > 20) {
    alerts.push({
      id: 'bias-domain',
      type: 'domain_residual_pileup',
      severity: 'medium',
      title: `${maxDomain[0]} 残差长期堆积`,
      evidence: [`${maxDomain[1]} 张未压缩残差卡`],
      recommendation: '提高匹配优先级并邀请跨域审核'
    });
  }

  const maxReviewer = Math.max(...Object.values(state.reviewerWeights));
  if (maxReviewer > 0.55) {
    alerts.push({
      id: 'bias-review',
      type: 'review_power_concentration',
      severity: 'high',
      title: '审核权重过于集中',
      evidence: [`最高审核权重 ${(maxReviewer * 100).toFixed(0)}%`],
      recommendation: '触发多元审核与权重冷却'
    });
  }

  if (state.coldWishes > 5) {
    alerts.push({
      id: 'bias-cold',
      type: 'cold_wish_neglect',
      severity: 'low',
      title: '冷门愿望长期无人响应',
      evidence: [`${state.coldWishes} 个愿望超过 14 天无匹配`],
      recommendation: '发放探索饲料值'
    });
  }

  if (state.undervaluedGroups.length > 0) {
    alerts.push({
      id: 'bias-group',
      type: 'group_undervaluation',
      severity: 'medium',
      title: '某些用户群体持续被低估',
      evidence: state.undervaluedGroups.map((group) => `${group} 的愿望长期低匹配`),
      recommendation: '提高弱势群体愿望的探索配额并复核评分特征'
    });
  }

  return alerts;
}
