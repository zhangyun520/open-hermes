import type {
  Achievement,
  CognitiveMapRegion,
  DailyQuest,
  DailySupply,
  LeaderboardEntry,
  LevelRule,
  Season,
  UserProgress,
  WeeklyQuest
} from './types';

export interface GrowthEvent {
  eventId?: string;
  userId: string;
  action:
    | 'valid_wish'
    | 'valid_residual'
    | 'review_completed'
    | 'reused_contribution'
    | 'skill_hit'
    | 'bias_fix'
    | 'public_wish_completed'
    | 'invalid_dump'
    | 'skill_upgrade'
    | 'cache_hit'
    | 'cross_domain_connection'
    | 'privacy_risk_marked';
  domain?: string;
  valid: boolean;
  compressedD?: number;
  createdAt?: string;
}

export const levelRules: LevelRule[] = [
  { level: 1, name: '初光投喂者', minXP: 0, unlocks: ['基础档案', '默认水母'] },
  { level: 2, name: '残差学徒', minXP: 120, unlocks: ['日常任务', '基础认知配给'] },
  { level: 3, name: '残差学徒', minXP: 260, unlocks: ['更多颜色与徽章'] },
  { level: 5, name: '认知炼金师', minXP: 620, unlocks: ['小岛背景', '技能贡献记录'] },
  { level: 7, name: '技能织工', minXP: 1100, unlocks: ['光效粒子编辑'] },
  { level: 10, name: '审核灯塔', minXP: 1800, unlocks: ['个人海湾', '审核印章'] },
  { level: 12, name: '深海连接者', minXP: 2600, unlocks: ['主题套装命名'] },
  { level: 15, name: '水母共振者', minXP: 4000, unlocks: ['模板分享', '认知海域协作'] }
];

export const achievementCatalog: Achievement[] = [
  { achievementId: 'first-residual-feed', type: 'contribution', name: '第一次投喂残差', description: '投喂 1 条有效残差。', criteria: 'valid_residual', unlocked: false, reward: { feedPoints: 30, glowShards: 8, reputation: 1, cosmeticUnlocks: ['basic-glow'] } },
  { achievementId: 'first-skill-upgrade', type: 'contribution', name: '第一次让技能升级', description: '参与一次有效技能升级。', criteria: 'skill_upgrade', unlocked: false, reward: { feedPoints: 60, glowShards: 12, reputation: 2, cosmeticUnlocks: ['weaver-badge'], title: '触手驯养师' } },
  { achievementId: 'first-cache-hit', type: 'contribution', name: '第一次命中缓存', description: '让技能或缓存命中一次。', criteria: 'cache_hit', unlocked: false, reward: { feedPoints: 35, glowShards: 8, reputation: 1, cosmeticUnlocks: ['echo-ring'] } },
  { achievementId: 'first-reuse', type: 'contribution', name: '第一次被他人复用', description: '贡献被他人复用。', criteria: 'reused_contribution', unlocked: false, reward: { feedPoints: 80, glowShards: 18, reputation: 3, cosmeticUnlocks: ['reuse-nameplate'] } },
  { achievementId: 'high-value-wish', type: 'cognitive', name: '首次发现高价值愿望', description: '提交一个被验证的高价值愿望。', criteria: 'valid_wish', unlocked: false, reward: { feedPoints: 45, glowShards: 10, reputation: 2, cosmeticUnlocks: ['wish-radar'] } },
  { achievementId: 'first-bridge', type: 'cognitive', name: '首次跨领域连接成功', description: '贡献 1 条有效跨领域连接。', criteria: 'cross_domain_connection', unlocked: false, reward: { feedPoints: 55, glowShards: 12, reputation: 2, cosmeticUnlocks: ['bridge-border'], title: '桥接者' } },
  { achievementId: 'bias-repair', type: 'cognitive', name: '首次修复系统偏见', description: '参与一次偏见修复。', criteria: 'bias_fix', unlocked: false, reward: { feedPoints: 90, glowShards: 24, reputation: 4, cosmeticUnlocks: ['guardian-aura'], title: '免疫守灯者' } },
  { achievementId: 'failure-to-skill', type: 'cognitive', name: '首次从失败案例中提炼技能', description: '从失败案例升级技能。', criteria: 'skill_upgrade', unlocked: false, reward: { feedPoints: 75, glowShards: 18, reputation: 3, cosmeticUnlocks: ['alchemy-tentacle'] } },
  { achievementId: 'lv10-tentacle', type: 'community', name: '共同养成第一条 Lv.10 触手', description: '社区共养一个 Lv.10 技能触手。', criteria: 'community_lv10', unlocked: false, reward: { feedPoints: 120, glowShards: 28, reputation: 5, cosmeticUnlocks: ['lv10-tentacle-light'] } }
];

const dailySupplyClaims = new Set<string>();

export function calculateUserLevel(xp: number): LevelRule {
  return [...levelRules].reverse().find((rule) => xp >= rule.minXP) ?? levelRules[0];
}

export function awardXPForContribution(event: GrowthEvent): number {
  if (!event.valid || event.action === 'invalid_dump') return 0;
  const base: Record<GrowthEvent['action'], number> = {
    valid_wish: 45,
    valid_residual: 50,
    review_completed: 35,
    reused_contribution: 80,
    skill_hit: 30,
    bias_fix: 90,
    public_wish_completed: 110,
    invalid_dump: 0,
    skill_upgrade: 75,
    cache_hit: 25,
    cross_domain_connection: 70,
    privacy_risk_marked: 40
  };
  return base[event.action] + Math.round((event.compressedD ?? 0) * 2);
}

export function checkAchievementUnlocks(userState: UserProgress, event: GrowthEvent): Achievement[] {
  if (!event.valid) return [];
  return achievementCatalog
    .filter((achievement) => achievement.criteria === event.action && !userState.unlockedAchievements.includes(achievement.achievementId))
    .map((achievement) => ({ ...achievement, unlocked: true }));
}

export function generateDailyQuests(userState: UserProgress): DailyQuest[] {
  const base: DailyQuest[] = [
    { questId: 'daily-effective-residual', cadence: 'daily', title: '投喂 1 条有效残差', description: '只统计通过分类、脱敏或复用验证的残差。', category: 'residual_compression', completionRule: 'valid_residual && compressedD > 0', antiSpamRule: '无效粘贴、重复文本、未脱敏内容不计入。', reward: { feedPoints: 18, glowShards: 4, reputation: 0 }, completed: false },
    { questId: 'daily-review-one', cadence: 'daily', title: '审核 1 张待审核残差卡', description: '完成一次有证据的审核。', category: 'review', completionRule: 'review_completed && evidence_present', antiSpamRule: '低质量一键通过不计入，并可能降权。', reward: { feedPoints: 16, glowShards: 3, reputation: 1 }, completed: false },
    { questId: 'daily-reverse-match', cadence: 'daily', title: '完成 1 次反向许愿池匹配', description: '把多余能力匹配到真实需求。', category: 'matching', completionRule: 'match_verified_by_need', antiSpamRule: '自我循环匹配不计入。', reward: { feedPoints: 16, glowShards: 3, reputation: 0 }, completed: false },
    { questId: 'daily-privacy-risk', cadence: 'daily', title: '标记 1 个隐私风险', description: '发现并标记手机号、身份证、学校姓名等风险。', category: 'privacy', completionRule: 'privacy_risk_marked && accepted_by_review', antiSpamRule: '误报批量刷标不计入。', reward: { feedPoints: 14, glowShards: 4, reputation: 1 }, completed: false },
    { questId: 'daily-fingerprint-view', cadence: 'daily', title: '查看 1 次认知指纹推荐', description: '用推荐找到更适合接住的任务。', category: 'fingerprint', completionRule: 'fingerprint_recommendation_viewed', antiSpamRule: '刷新页面不重复计入。', reward: { feedPoints: 8, glowShards: 2, reputation: 0 }, completed: false }
  ];
  return base.map((quest) => ({ ...quest, completed: userState.completedQuestIds.includes(quest.questId) }));
}

export function generateWeeklyQuests(): WeeklyQuest[] {
  return [
    { questId: 'weekly-skill-upgrade', cadence: 'weekly', title: '参与 1 次技能升级', description: '从有效残差或失败案例推动技能升级。', category: 'skill', completionRule: 'skill_upgrade_verified', antiSpamRule: '只统计审核通过的升级。', reward: { feedPoints: 80, glowShards: 18, reputation: 3 }, progress: 0, target: 1, completed: false },
    { questId: 'weekly-public-wish', cadence: 'weekly', title: '共同完成 1 个公共愿望', description: '参与公共愿望的拆解、测试或验证。', category: 'community_care', completionRule: 'public_wish_completed', antiSpamRule: '仅留言不计入。', reward: { feedPoints: 100, glowShards: 22, reputation: 4 }, progress: 0, target: 1, completed: false },
    { questId: 'weekly-cold-rescue', cadence: 'weekly', title: '参与冷门残差救助计划', description: '帮助长期无人响应的冷门残差获得一次有效处理。', category: 'community_care', completionRule: 'cold_residual_rescued', antiSpamRule: '只统计被系统确认的有效维护。', reward: { feedPoints: 90, glowShards: 20, reputation: 4 }, progress: 0, target: 1, completed: false }
  ];
}

export function claimDailySupply(userId: string, date = new Date().toISOString().slice(0, 10)): DailySupply {
  const key = `${userId}:${date}`;
  const claimed = dailySupplyClaims.has(key);
  if (!claimed) dailySupplyClaims.add(key);
  return {
    supplyId: `supply-${key}`,
    name: '每日补氧',
    date,
    userId,
    feedPoints: claimed ? 0 : 20,
    glowShards: claimed ? 0 : 3,
    extraReviewChances: claimed ? 0 : 1,
    resonanceRecommendations: claimed ? 0 : 1,
    radarCards: claimed ? 0 : 1,
    claimed: !claimed,
    note: claimed ? '今日已领取，避免签到焦虑与重复领取。' : '固定内容，无概率开箱，无连续签到惩罚。'
  };
}

export function resetDailySupplyClaims() {
  dailySupplyClaims.clear();
}

export function updateSeasonProgress(season: Season, event: GrowthEvent): Season {
  if (!event.valid) return season;
  const increment = Math.max(0, Math.round(event.compressedD ?? awardXPForContribution(event) / 10));
  return { ...season, progress: Math.min(season.target, season.progress + increment) };
}

export function updateCognitiveMapRegion(region: CognitiveMapRegion, event: GrowthEvent): CognitiveMapRegion {
  if (!event.valid) return region;
  const skillHit = event.action === 'skill_hit' || event.action === 'cache_hit';
  const residualPile = event.action === 'valid_residual' && (event.compressedD ?? 0) < 1;
  const publicWish = event.action === 'public_wish_completed';
  return {
    ...region,
    glow: Math.min(100, region.glow + (skillHit ? 18 : 8)),
    fog: Math.max(0, region.fog + (residualPile ? 12 : -6)),
    buildingLevel: Math.min(10, region.buildingLevel + (publicWish ? 1 : 0)),
    microLights: region.microLights + 1,
    status: publicWish ? 'upgrading' : residualPile ? 'foggy' : skillHit ? 'glowing' : 'calm'
  };
}

export function calculateLeaderboardScore(userEvents: GrowthEvent[]): number {
  return userEvents.reduce((score, event) => score + awardXPForContribution(event) + Math.round((event.compressedD ?? 0) * 5), 0);
}

export function buildLeaderboard(eventsByUser: Record<string, GrowthEvent[]>): LeaderboardEntry[] {
  return Object.entries(eventsByUser)
    .map(([userId, events]) => ({
      userId,
      displayName: userId,
      score: calculateLeaderboardScore(events),
      effectiveContributions: events.filter((event) => event.valid).length,
      compressedD: events.reduce((sum, event) => sum + (event.valid ? event.compressedD ?? 0 : 0), 0),
      rank: 0
    }))
    .sort((a, b) => b.score - a.score)
    .map((entry, index) => ({ ...entry, rank: index + 1 }));
}
