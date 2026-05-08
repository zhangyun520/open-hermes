import { describe, expect, it } from 'vitest';
import { calculateNeedScore, calculateReviewScore, classifyGarbage, createIdeaNotaryHash, generateCognitiveFingerprint, generateHumanTransitionCard, generateResidualCardFromGarbage, generateResidualCardFromWish, normalizeReviewRecommendation, redactSensitiveInfo, requiresHumanReview } from '../lib/cognitive';
import { buildJellyPetInputsFromEvents, evolveJellyPet, getJellyPetStage } from '../lib/jellyPet';
import { awardXPForContribution, calculateUserLevel, checkAchievementUnlocks, claimDailySupply, generateDailyQuests, resetDailySupplyClaims, updateSeasonProgress } from '../lib/gamification';
import { applyJellyAppearance, isBasicDIYUnlocked, saveCustomizationPreset, unlockCosmetic, validateCosmeticSubmission } from '../lib/workshop';
import { validateAvatarMorphRequest } from '../lib/morphing';
import { activeSeason, starterAppearance } from '../lib/productSystemsMock';
import type { ContributionEvent, CustomizationPreset, GarbageInput, JellyAppearance, Review, Season, UserProgress, Wish } from '../lib/types';

const wish: Wish = { id: 't1', title: '测试愿望', domain: 'edu', pain: 80, targetUser: 'teacher', desiredOutput: 'structured workflow', urgency: 70, publicValue: 90, verifiability: 60, risk: 'low', creator: 'u1' };

const baseProgress: UserProgress = {
  userId: 'u',
  xp: 760,
  level: 5,
  levelName: '认知炼金师',
  feedPoints: 0,
  glowShards: 0,
  reputation: 0,
  unlockedAchievements: [],
  unlockedCosmetics: [],
  completedQuestIds: [],
  claimedSupplyDates: [],
  contributionWeight: 1,
  reviewWeight: 1,
  diyUnlockSignals: ['wish', 'residual'],
  savedPresetIds: []
};

describe('Cognitive Jelly core utilities', () => {
  it('calculates Need Score with weighted signals', () => {
    expect(calculateNeedScore(wish)).toBe(79);
  });

  it('redacts or marks phone, ID, plate, and school-name sensitive content', () => {
    const result = redactSensitiveInfo('手机号13812345678，身份证110105199001011234，车牌京A12345，北京第一中学张伟同学');
    expect(result.redacted).toContain('[手机号已脱敏]');
    expect(result.redacted).toContain('[身份证已脱敏]');
    expect(result.redacted).toContain('[车牌已脱敏]');
    expect(result.redacted).toContain('[姓名已标记]');
    expect(result.risk).toBe('high');
  });

  it('keeps D = 1 - C on generated residual cards', () => {
    const card = generateResidualCardFromWish(wish);
    expect(card.currentD).toBeCloseTo(1 - card.currentC, 2);
  });

  it('blocks high privacy content from becoming a public asset', () => {
    const garbage: GarbageInput = { id: 'g-risk', source: 'ticket', domain: 'ops', creator: 'u1', content: '13812345678 110105199001011234 京A12345' };
    const card = generateResidualCardFromGarbage(garbage);
    expect(card.riskPrivacy).toBe('high');
    expect(card.publicAssetAllowed).toBe(false);
    expect(requiresHumanReview(card)).toBe(true);
  });

  it('routes high-risk reviews to needs_human_review', () => {
    const review: Review = { id: 'r', targetId: 'x', novelty: 90, usefulness: 90, reusability: 90, evidenceStrength: 90, risk: 'high', recommendation: 'assetize', comment: 'unsafe' };
    expect(normalizeReviewRecommendation(review)).toBe('needs_human_review');
    expect(calculateReviewScore(review)).toBeGreaterThan(0);
  });

  it('generates a Human Transition Card for high-risk automation', () => {
    const card = generateHumanTransitionCard({ role: '客服', tasks: ['自动质检'], risk: 'high' });
    expect(card.approvalRequired).toBe(true);
    expect(card.transitionPaths.length).toBeGreaterThan(0);
  });

  it('generates stable Idea Notary hashes', async () => {
    await expect(createIdeaNotaryHash('认知水母')).resolves.toBe(await createIdeaNotaryHash('认知水母'));
  });

  it('builds a basic Cognitive Fingerprint', () => {
    const events: ContributionEvent[] = [
      { id: '1', actor: 'u', action: 'wish', targetId: 'edu-a', weight: 3, createdAt: 'now' },
      { id: '2', actor: 'u', action: 'feed', targetId: 'care-b', weight: 4, createdAt: 'now' }
    ];
    const fp = generateCognitiveFingerprint(events);
    expect(fp.userId).toBe('u');
    expect(fp.questionDomains.edu).toBe(3);
    expect(fp.compressionDomains.care).toBe(4);
  });

  it('classifies privacy-heavy garbage as review_required', () => {
    const classified = classifyGarbage({ id: 'x', source: 'ticket', domain: 'ops', creator: 'u', content: '电话13812345678，身份证110105199001011234' });
    expect(classified.classification).toBe('review_required');
  });

  it('evolves pet jelly from contribution inputs', () => {
    const inputs = buildJellyPetInputsFromEvents([
      { id: '1', actor: 'u', action: 'wish', targetId: 'edu-a', weight: 8, createdAt: 'now' },
      { id: '2', actor: 'u', action: 'feed', targetId: 'edu-b', weight: 8, createdAt: 'now' },
      { id: '3', actor: 'u', action: 'review', targetId: 'ops-c', weight: 5, createdAt: 'now' }
    ]);
    const pet = evolveJellyPet({ ...inputs, skills: 3, cacheHits: 6, biasAlerts: 1, humanTransitionCards: 1 });
    expect(pet.level).toBeGreaterThan(1);
    expect(pet.tentacleCount).toBeGreaterThanOrEqual(6);
    expect(pet.traits).toContain('guardian');
    expect(getJellyPetStage(pet.level)).toBe(pet.stage);
  });

  it('calculates user level from XP thresholds', () => {
    expect(calculateUserLevel(760).name).toBe('认知炼金师');
    expect(calculateUserLevel(0).name).toBe('初光投喂者');
  });

  it('does not unlock duplicate achievements', () => {
    const state: UserProgress = { ...baseProgress, unlockedAchievements: ['first-residual-feed'] };
    const unlocked = checkAchievementUnlocks(state, { userId: 'u', action: 'valid_residual', valid: true, compressedD: 3 });
    expect(unlocked).toHaveLength(0);
  });

  it('allows daily supply only once per day', () => {
    resetDailySupplyClaims();
    const first = claimDailySupply('u', '2026-05-08');
    const second = claimDailySupply('u', '2026-05-08');
    expect(first.feedPoints).toBeGreaterThan(0);
    expect(second.feedPoints).toBe(0);
    expect(second.claimed).toBe(false);
  });

  it('daily quests avoid encouraging invalid garbage dumping', () => {
    const quests = generateDailyQuests(baseProgress);
    expect(quests.map((quest) => quest.completionRule).join(' ')).not.toContain('invalid_dump');
    expect(awardXPForContribution({ userId: 'u', action: 'invalid_dump', valid: false })).toBe(0);
  });

  it('updates season progress with valid compression only', () => {
    const season: Season = { ...activeSeason, progress: 10, target: 100 };
    expect(updateSeasonProgress(season, { userId: 'u', action: 'valid_residual', valid: true, compressedD: 12 }).progress).toBe(22);
    expect(updateSeasonProgress(season, { userId: 'u', action: 'invalid_dump', valid: false, compressedD: 99 }).progress).toBe(10);
  });

  it('lets free users unlock basic DIY from two meaningful signals', () => {
    expect(isBasicDIYUnlocked({ diyUnlockSignals: ['wish', 'residual'] })).toBe(true);
  });

  it('keeps rare cosmetics from changing contribution or review weights', () => {
    const updated = unlockCosmetic(baseProgress, 'season');
    expect(updated.unlockedCosmetics).toContain('season-frame');
    expect(updated.contributionWeight).toBe(baseProgress.contributionWeight);
    expect(updated.reviewWeight).toBe(baseProgress.reviewWeight);
  });

  it('blocks copyright replicas and real-person impersonation in avatar morph requests', () => {
    expect(validateAvatarMorphRequest({ prompt: '复刻宝可梦皮卡丘' }).status).toBe('blocked');
    expect(validateAvatarMorphRequest({ prompt: '生成某明星真人人脸复刻' }).status).toBe('blocked');
  });

  it('saves and applies custom jelly appearance', () => {
    const appearance: JellyAppearance = { ...starterAppearance, appearanceId: 'a-test', name: '测试外观' };
    const applied = applyJellyAppearance({ contributionWeight: 1, reviewWeight: 1 }, appearance);
    const saved = saveCustomizationPreset({ presets: [] as CustomizationPreset[], savedPresetIds: [] as string[] }, { presetId: 'p-test', name: '测试方案', mode: 'deep_diy', appearance, visibility: 'private', reviewStatus: 'approved' });
    expect(applied.activeAppearance.name).toBe('测试外观');
    expect(saved.savedPresetIds).toContain('p-test');
  });

  it('routes high-risk UGC cosmetic submissions to review', () => {
    const result = validateCosmeticSubmission({ name: '参考图转译', description: '上传参考图提取风格', usesReference: true, risk: 'high' });
    expect(result.status).toBe('review_required');
  });
});
