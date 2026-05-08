import type { AvatarForm, MorphStyle, MorphTemplate, MorphUnlockRule, UserAvatarState, UserProgress } from './types';

const blockedPatterns = [
  /宝可梦|pokemon|皮卡丘|迪士尼|mickey|marvel|蜘蛛侠|火影|naruto|初音|奥特曼/i,
  /明星|真人|演员|歌手|网红|本人|身份证照|人脸复刻|冒用/i,
  /低俗|色情|仇恨|攻击|歧视|暴力/i
];

export function unlockAvatarForm(userState: UserAvatarState & { progress?: UserProgress }, unlockRule: MorphUnlockRule): UserAvatarState {
  const levelOK = unlockRule.requiredLevel === undefined || (userState.progress?.level ?? 0) >= unlockRule.requiredLevel;
  const achievementOK = unlockRule.achievementId === undefined || userState.progress?.unlockedAchievements.includes(unlockRule.achievementId);
  if (!levelOK || !achievementOK) return userState;
  return { ...userState, unlockedFormIds: Array.from(new Set([...userState.unlockedFormIds, unlockRule.formId])) };
}

export function applyAvatarMorph(userState: UserAvatarState, morph: { formId: string; templateId?: string; styleTags?: string[] }): UserAvatarState {
  if (!userState.unlockedFormIds.includes(morph.formId)) return userState;
  return {
    ...userState,
    morphFormId: morph.formId,
    styleTags: morph.styleTags ?? userState.styleTags,
    activeSlots: userState.activeSlots.map((slot) => (slot.slotType === 'morphed_form' ? { ...slot, formId: morph.formId, templateId: morph.templateId } : slot))
  };
}

export function validateAvatarMorphRequest(request: { prompt: string; referenceMode?: boolean }): {
  status: 'allowed' | 'blocked' | 'review_required';
  reasons: string[];
} {
  const reasons: string[] = [];
  for (const pattern of blockedPatterns) {
    if (pattern.test(request.prompt)) reasons.push('不支持未经授权的版权角色复刻、真人冒用、低俗或攻击性外观。');
  }
  if (reasons.length) return { status: 'blocked', reasons };
  if (request.referenceMode) return { status: 'review_required', reasons: ['参考图只允许提取风格、气质、色彩与轮廓语言，需要原创转译审核。'] };
  return { status: 'allowed', reasons: ['允许原创风格幻化；幻化只改变外观，不改变能力结构与贡献记录。'] };
}

export function generateAvatarStyleTags(preferences: string[]): string[] {
  const map: Record<string, string[]> = {
    学习: ['学院风', '纸页流光', '星图纹理'],
    工程: ['工程风', '机械珊瑚', '蓝图纹理'],
    梦幻: ['梦幻风', '诗雾', '梦海光点'],
    审核: ['神官风', '印章光环', '灯塔边框'],
    公益: ['自然风', '暖光', '柔性屏障'],
    深海: ['深海风', '潮汐渐变', '水母微光']
  };
  return Array.from(new Set(preferences.flatMap((preference) => map[preference] ?? [preference]))).slice(0, 8);
}

export const officialAvatarForms: AvatarForm[] = [
  { formId: 'form-jelly', name: '默认水母', formType: 'jelly', layer: 'official', starter: true, description: '系统默认母体。' },
  { formId: 'form-whale', name: '小鲸', formType: 'animal_spirit', layer: 'official', starter: true, description: '温和的守护型认知化身。' },
  { formId: 'form-crystal', name: '晶体球', formType: 'crystal', layer: 'official', starter: true, description: '清晰、稳定、适合结构化思考。' },
  { formId: 'form-scholar', name: '学者灵', formType: 'humanoid_spirit', layer: 'style', starter: true, description: '学院风原创灵体，不复刻真人。' },
  { formId: 'form-traveler', name: '深海旅人', formType: 'humanoid_spirit', layer: 'style', starter: true, description: '探索型原创幻化。' },
  { formId: 'form-nebula', name: '星云核', formType: 'abstract_core', layer: 'official', starter: false, description: '高级抽象核心形态。' }
];

export const morphStyles: MorphStyle[] = [
  { styleId: 'style-academy', name: '学院风', tags: ['纸页', '星图', '冷静'], allowed: true },
  { styleId: 'style-engineering', name: '工程风', tags: ['蓝图', '机械珊瑚', '信号脉冲'], allowed: true },
  { styleId: 'style-dream', name: '梦幻风', tags: ['诗雾', '音纹', '梦海光点'], allowed: true },
  { styleId: 'style-lighthouse', name: '审核灯塔风', tags: ['印章', '秩序网格', '灯塔边框'], allowed: true }
];

export const morphTemplates: MorphTemplate[] = [
  { templateId: 'morph-seeker', name: '寻愿者', formId: 'form-jelly', styleId: 'style-academy', careerClass: '愿望发现者系', unlockSource: 'starter', reviewStatus: 'approved', description: '适合发现高价值愿望。' },
  { templateId: 'morph-alchemist', name: '矿渣炼金师', formId: 'form-crystal', styleId: 'style-engineering', careerClass: '残差回收系', unlockSource: 'achievement', reviewStatus: 'approved', description: '适合从失败案例提炼技能。' },
  { templateId: 'morph-judge', name: '灯塔判定官', formId: 'form-scholar', styleId: 'style-lighthouse', careerClass: '审核系', unlockSource: 'review', reviewStatus: 'approved', description: '适合展示审核贡献。' },
  { templateId: 'morph-ferryman', name: '跨域摆渡人', formId: 'form-whale', styleId: 'style-dream', careerClass: '连接系', unlockSource: 'achievement', reviewStatus: 'approved', description: '适合跨领域连接成功的用户。' }
];
