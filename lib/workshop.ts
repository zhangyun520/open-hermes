import type {
  CosmeticItem,
  CosmeticReviewStatus,
  CustomizationPreset,
  JellyAppearance,
  ResonanceWorkshopState,
  UnlockSource,
  UserProgress
} from './types';

const unsafeCosmeticPatterns = [/低俗|色情|仇恨|攻击|歧视|暴力/i, /迪士尼|宝可梦|pokemon|marvel|mickey|naruto|火影/i, /明星|真人|身份证|手机号/i];

export function isBasicDIYUnlocked(userState: Pick<UserProgress, 'diyUnlockSignals'>): boolean {
  return new Set(userState.diyUnlockSignals).size >= 2;
}

export function unlockCosmetic(userState: UserProgress, unlockSource: UnlockSource): UserProgress {
  const cosmeticBySource: Record<UnlockSource, string> = {
    starter: 'starter-deepsea-blue',
    level: 'level-glow-badge',
    achievement: 'achievement-halo',
    season: 'season-frame',
    guild: 'guild-bay-banner',
    review: 'review-lighthouse-seal',
    bias_fix: 'guardian-soft-barrier'
  };
  const cosmeticId = cosmeticBySource[unlockSource];
  return {
    ...userState,
    unlockedCosmetics: Array.from(new Set([...userState.unlockedCosmetics, cosmeticId])),
    contributionWeight: userState.contributionWeight,
    reviewWeight: userState.reviewWeight
  };
}

export function applyJellyAppearance<T extends { activeAppearance?: JellyAppearance; contributionWeight?: number; reviewWeight?: number }>(
  userState: T,
  appearance: JellyAppearance
): T & { activeAppearance: JellyAppearance } {
  return { ...userState, activeAppearance: appearance };
}

export function saveCustomizationPreset<T extends { presets?: CustomizationPreset[]; savedPresetIds?: string[] }>(userState: T, preset: CustomizationPreset): T {
  const presets = userState.presets ?? [];
  const savedPresetIds = userState.savedPresetIds ?? [];
  return {
    ...userState,
    presets: [...presets.filter((item) => item.presetId !== preset.presetId), preset],
    savedPresetIds: Array.from(new Set([...savedPresetIds, preset.presetId]))
  };
}

export function validateCosmeticSubmission(submission: { name: string; description: string; risk?: 'low' | 'medium' | 'high'; usesReference?: boolean }): {
  status: CosmeticReviewStatus;
  reasons: string[];
} {
  const content = `${submission.name} ${submission.description}`;
  const reasons: string[] = [];
  for (const pattern of unsafeCosmeticPatterns) {
    if (pattern.test(content)) reasons.push('包含低俗、侵权、攻击性、真人冒用或敏感信息风险');
  }
  if (submission.risk === 'high') reasons.push('提交者自评或系统检测为高风险');
  if (submission.usesReference) reasons.push('参考图原创转译需要人工确认版权边界');
  if (reasons.some((reason) => reason.includes('低俗') && /低俗|色情|仇恨|攻击|歧视|暴力/i.test(content))) return { status: 'rejected', reasons };
  return { status: reasons.length ? 'review_required' : 'approved', reasons };
}

export function createStarterCosmetics(): CosmeticItem[] {
  return [
    { cosmeticId: 'starter-deepsea-blue', name: '深海蓝基础色', target: 'jelly', rarity: 'common', unlockSource: 'starter', free: true, description: '免费基础主色，不影响能力。', affectsAbility: false },
    { cosmeticId: 'starter-soft-bell', name: '柔光伞盖', target: 'jelly', rarity: 'common', unlockSource: 'starter', free: true, description: '免费基础伞盖，不制造丑用户。', affectsAbility: false },
    { cosmeticId: 'review-lighthouse-seal', name: '灯塔审核印章', target: 'interface', rarity: 'achievement', unlockSource: 'review', free: true, description: '审核贡献纪念外观，不影响审核权重。', affectsAbility: false }
  ];
}

export function createWorkshopState(userState: UserProgress, presets: CustomizationPreset[], activeAppearance: JellyAppearance): ResonanceWorkshopState {
  return {
    userId: userState.userId,
    diyUnlocked: isBasicDIYUnlocked(userState),
    unlockProgress: userState.diyUnlockSignals,
    colorOptions: ['#83f7ff', '#6d7cff', '#ff9dce', '#b9ffd8', '#f6d365', '#78ffd6', '#a78bfa', '#ffffff'],
    bellOptions: ['月伞', '花瓣伞', '晶体伞', '纸页伞'],
    tentacleOptions: ['丝带', '星链', '珊瑚枝', '蓝图线'],
    glowOptions: ['柔光', '星尘', '潮汐脉冲'],
    backgroundOptions: ['认知海湾', '微光小岛', '潮汐庭院', '水母栖居地'],
    nameplateOptions: ['透明牌', '灯塔牌', '纸页牌'],
    maxPresetSlots: 3,
    presets,
    activeAppearance,
    personalSpaces: [
      { spaceId: 'space-bay', name: '认知海湾', type: 'cognitive_bay', background: 'deepsea', decorations: ['微光石', '柔性屏障'], visibility: 'private' },
      { spaceId: 'space-island', name: '微光小岛', type: 'glow_island', background: 'island', decorations: ['学塔', '星图纹理'], visibility: 'team' }
    ]
  };
}
