import { createStarterCosmetics, createWorkshopState } from './workshop';
import { achievementCatalog, generateDailyQuests, generateWeeklyQuests, type GrowthEvent } from './gamification';
import { generateAvatarStyleTags, morphStyles, morphTemplates, officialAvatarForms } from './morphing';
import type {
  CognitiveMapRegion,
  CustomizationPreset,
  Guild,
  JellyAppearance,
  LeaderboardEntry,
  Season,
  UserAvatarState,
  UserProgress
} from './types';

export const growthEvents: GrowthEvent[] = [
  { eventId: 'ge1', userId: 'u-lan', action: 'valid_wish', domain: 'education', valid: true, compressedD: 12, createdAt: '2026-05-01T09:00:00Z' },
  { eventId: 'ge2', userId: 'u-lan', action: 'valid_residual', domain: 'education', valid: true, compressedD: 18, createdAt: '2026-05-02T09:00:00Z' },
  { eventId: 'ge3', userId: 'u-lan', action: 'review_completed', domain: 'ops', valid: true, compressedD: 7, createdAt: '2026-05-03T09:00:00Z' },
  { eventId: 'ge4', userId: 'u-lan', action: 'cache_hit', domain: 'customer-success', valid: true, compressedD: 5, createdAt: '2026-05-04T09:00:00Z' },
  { eventId: 'ge5', userId: 'u-moon', action: 'bias_fix', domain: 'care', valid: true, compressedD: 16, createdAt: '2026-05-04T12:00:00Z' }
];

export const userProgress: UserProgress = {
  userId: 'u-lan',
  xp: 760,
  level: 5,
  levelName: '认知炼金师',
  feedPoints: 1380,
  glowShards: 86,
  reputation: 84,
  unlockedAchievements: ['first-residual-feed', 'high-value-wish'],
  unlockedCosmetics: ['starter-deepsea-blue', 'starter-soft-bell', 'wish-radar'],
  completedQuestIds: ['daily-fingerprint-view'],
  claimedSupplyDates: [],
  contributionWeight: 1,
  reviewWeight: 1,
  diyUnlockSignals: ['wish', 'residual', 'fingerprint_view'],
  savedPresetIds: ['preset-scholar'],
  activePresetId: 'preset-scholar',
  activeAvatarFormId: 'form-jelly'
};

export const levelAchievements = achievementCatalog.map((achievement) => ({
  ...achievement,
  unlocked: userProgress.unlockedAchievements.includes(achievement.achievementId)
}));

export const dailyQuests = generateDailyQuests(userProgress);
export const weeklyQuests = generateWeeklyQuests();

export const activeSeason: Season = {
  seasonId: 's1-education-residuals',
  name: 'S1：教育残差季',
  theme: '共同把难题、错题和解释失败转化为可复用技能。',
  startDate: '2026-05-01',
  endDate: '2026-06-30',
  publicGoal: '本赛季共同压缩 10000 点教育残差。',
  progress: 3820,
  target: 10000,
  seasonAchievements: levelAchievements.slice(0, 3),
  seasonCosmetics: ['education-paper-glow', 'season-s1-frame', 'learning-tower'],
  leaderboard: [
    { userId: 'u-lan', displayName: '蓝藻策展人', score: 920, effectiveContributions: 23, compressedD: 118, rank: 1 },
    { userId: 'u-moon', displayName: '月潮审核员', score: 760, effectiveContributions: 18, compressedD: 96, rank: 2 }
  ]
};

export const cognitiveMapRegions: CognitiveMapRegion[] = [
  { regionId: 'wish-bay', name: '启愿海湾', domain: '愿望', description: '高价值愿望在这里形成坐标。', linkedRoute: '/wish-pool', glow: 72, fog: 8, buildingLevel: 4, microLights: 128, status: 'glowing' },
  { regionId: 'reverse-port', name: '逆潮港', domain: '供给', description: '多余经验在这里等待被需求接住。', linkedRoute: '/reverse-wish-pool', glow: 55, fog: 12, buildingLevel: 3, microLights: 82, status: 'calm' },
  { regionId: 'garbage-abyss', name: '残渣深渊', domain: '残差', description: '失败、错题和跑偏输出先被脱敏再回收。', linkedRoute: '/garbage-station', glow: 48, fog: 42, buildingLevel: 2, microLights: 64, status: 'foggy' },
  { regionId: 'echo-islands', name: '回响群岛', domain: '缓存', description: '缓存命中的技能会点亮岛链。', linkedRoute: '/skill-memory-pool', glow: 84, fog: 6, buildingLevel: 5, microLights: 203, status: 'glowing' },
  { regionId: 'lighthouse-council', name: '灯塔议会', domain: '审核', description: '审核权重必须透明、分散、可复核。', linkedRoute: '/review-pool', glow: 66, fog: 18, buildingLevel: 4, microLights: 97, status: 'calm' },
  { regionId: 'bias-marsh', name: '偏见沼泽', domain: '系统免疫', description: '系统病会在这里显影。', linkedRoute: '/bias-shelter', glow: 38, fog: 58, buildingLevel: 2, microLights: 33, status: 'foggy' },
  { regionId: 'notary-tower', name: '公证塔', domain: '历史', description: '只证明历史，不判断价值。', linkedRoute: '/idea-notary', glow: 61, fog: 5, buildingLevel: 4, microLights: 77, status: 'calm' }
];

export const guilds: Guild[] = [
  { guildId: 'guild-edu', name: '教育残差学会', domain: '教育大陆', members: ['u-lan', 'u-moon'], publicGoal: '压缩 10000 点教育残差', resonance: 76 },
  { guildId: 'guild-care', name: '照护暖流公会', domain: '公益/安置系', members: ['u-moon'], publicGoal: '修复被低估的照护愿望', resonance: 61 }
];

export const leaderboard: LeaderboardEntry[] = activeSeason.leaderboard;

export const starterAppearance: JellyAppearance = {
  appearanceId: 'appearance-scholar-blue',
  name: '深海学者',
  mainColor: '#83f7ff',
  secondaryColor: '#6d7cff',
  bellShape: '月伞',
  tentacleStyle: '纸页流光',
  glowEffect: '柔光',
  texture: '星图纹理',
  floatPose: '安静漂浮',
  glowIntensity: 72,
  opacity: 78,
  tentacleSwing: 46,
  particleSpeed: 32,
  haloSize: 58,
  decorationAnchor: '右上'
};

export const customizationPresets: CustomizationPreset[] = [
  { presetId: 'preset-scholar', name: '深海学者', mode: 'one_click', appearance: starterAppearance, spaceId: 'space-bay', visibility: 'public', reviewStatus: 'approved' },
  { presetId: 'preset-engineer', name: '珊瑚工程师', mode: 'template_tweak', appearance: { ...starterAppearance, appearanceId: 'appearance-engineer', name: '珊瑚工程师', mainColor: '#78ffd6', texture: '蓝图纹理', tentacleStyle: '机械珊瑚' }, visibility: 'team', reviewStatus: 'approved' }
];

export const cosmetics = createStarterCosmetics();
export const resonanceWorkshopState = createWorkshopState(userProgress, customizationPresets, starterAppearance);

export const userAvatarState: UserAvatarState = {
  userId: 'u-lan',
  coreFormId: 'form-jelly',
  morphFormId: 'form-scholar',
  unlockedFormIds: ['form-jelly', 'form-whale', 'form-crystal', 'form-scholar', 'form-traveler'],
  activeSlots: [
    { slotId: 'slot-core', slotType: 'core_form', formId: 'form-jelly', visibleIn: ['matching', 'quest'] },
    { slotId: 'slot-morph', slotType: 'morphed_form', formId: 'form-scholar', templateId: 'morph-seeker', visibleIn: ['personal_space', 'social', 'ledger'] }
  ],
  styleTags: generateAvatarStyleTags(['学习', '深海']),
  boundaryNote: '我们支持原创化身与风格幻化，不支持未经授权的版权角色复刻或真人冒用。'
};

export const avatarForms = officialAvatarForms;
export const avatarStyles = morphStyles;
export const avatarTemplates = morphTemplates;
