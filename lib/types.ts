export type RiskLevel = 'low' | 'medium' | 'high';
export type ResidualStatus = 'draft' | 'review_required' | 'assetized' | 'rejected';
export type GarbageClass = 'recyclable' | 'harmful' | 'compostable' | 'slag' | 'review_required';
export type ReviewRecommendation = 'reject' | 'revise' | 'assetize' | 'needs_human_review';

export type JellyPetStage = 'polyp' | 'ephyra' | 'young_jelly' | 'luminous_jelly' | 'reef_guardian';
export type JellyPetTrait = 'curious' | 'resilient' | 'connector' | 'guardian' | 'archivist';
export interface JellyPetState { id: string; name: string; stage: JellyPetStage; level: number; xp: number; xpToNextLevel: number; luminosity: number; tentacleCount: number; traits: JellyPetTrait[]; unlockedAura: string; evolutionHint: string; }

export interface User { id: string; name: string; domains: string[]; reputation: number; feedValue: number; }
export interface Wish { id: string; title: string; domain: string; pain: number; targetUser: string; desiredOutput: string; urgency: number; publicValue: number; verifiability: number; risk: RiskLevel; creator: string; needScore?: number; }
export interface ReverseWish { id: string; description: string; originalContext: string; possibleUses: string[]; confidence: number; privacyLevel: RiskLevel; creator: string; }
export interface GarbageInput { id: string; content: string; source: 'failure' | 'wrong_answer' | 'ticket' | 'ai_drift' | 'idea_fragment'; domain: string; creator: string; classification?: GarbageClass; privacyRisk?: RiskLevel; redactedContent?: string; }
export interface ResidualCard { residualId: string; sourceType: 'wish' | 'reverse_wish' | 'garbage'; domain: string; task: string; need: string; currentC: number; currentD: number; targetD: number; evidence: string[]; candidateActions: string[]; verificationMetric: string; riskPrivacy: RiskLevel; riskSafety: RiskLevel; riskCompliance: RiskLevel; reusable: boolean; status: ResidualStatus; publicAssetAllowed: boolean; }
export interface Review { id: string; targetId: string; novelty: number; usefulness: number; reusability: number; evidenceStrength: number; risk: RiskLevel; recommendation: ReviewRecommendation; comment: string; }
export interface SkillCapsule { skillId: string; name: string; domain: string; residualTypes: string[]; workflow: string[]; verification: string; riskPolicy: string; level: number; usageCount: number; cacheHitCount: number; verifiedCompressionCount: number; failureCases: string[]; contributors: string[]; xp: number; version: string; }
export interface ContributionEvent { id: string; actor: string; action: 'wish' | 'feed' | 'review' | 'test' | 'upgrade'; targetId: string; weight: number; createdAt: string; }
export interface RewardEvent { id: string; contributionId: string; feedValue: number; reputation: number; compressionCredential: string; revenueRight: string; }
export interface Asset { id: string; residualId: string; skillId?: string; visibility: 'private' | 'community' | 'public'; reusable: boolean; createdAt: string; }
export interface HumanTransitionCard { id: string; role: string; tasksAutomated: string[]; tasksRemainingHuman: string[]; displacementRisk: RiskLevel; transitionPaths: string[]; trainingNeeded: string[]; incomeProtectionSuggestion: string; contributionRights: string; dignityRisk: RiskLevel; approvalRequired: boolean; }
export interface CognitiveFingerprint { userId: string; questionDomains: Record<string, number>; compressionDomains: Record<string, number>; bridgeDomains: string[]; reviewAccuracy: number; skillContribution: number; ownershipNote: string; }
export interface IdeaNotaryRecord { hash: string; createdAt: string; contributorId: string; visibility: 'private' | 'community' | 'public'; version: string; }
export interface BiasAlert { id: string; type: 'domain_residual_pileup' | 'review_power_concentration' | 'cold_wish_neglect' | 'group_undervaluation'; severity: RiskLevel; title: string; evidence: string[]; recommendation: string; }
export interface CognitiveWill { ownerId: string; inherit: string[]; donate: string[]; seal: string[]; destroy: string[]; note: string; }

export type CosmeticRarity = 'common' | 'rare' | 'epic' | 'seasonal' | 'achievement';
export type UnlockSource = 'starter' | 'level' | 'achievement' | 'season' | 'guild' | 'review' | 'bias_fix';
export type AvatarFormType = 'jelly' | 'animal_spirit' | 'crystal' | 'humanoid_spirit' | 'abstract_core';
export type Visibility = 'private' | 'team' | 'public';
export type QuestCadence = 'daily' | 'weekly';
export type QuestCategory = 'residual_compression' | 'review' | 'matching' | 'privacy' | 'fingerprint' | 'skill' | 'community_care';
export type CosmeticReviewStatus = 'approved' | 'review_required' | 'rejected';
export type MorphValidationStatus = 'allowed' | 'blocked';

export interface UserProgress {
  userId: string;
  xp: number;
  level: number;
  levelName: string;
  feedPoints: number;
  glowShards: number;
  reputation: number;
  unlockedAchievements: string[];
  unlockedCosmetics: string[];
  completedQuestIds: string[];
  claimedSupplyDates: string[];
  contributionWeight: number;
  reviewWeight: number;
  diyUnlockSignals: Array<'wish' | 'residual' | 'review' | 'two_day_login' | 'fingerprint_view'>;
  savedPresetIds: string[];
  activePresetId?: string;
  activeAvatarFormId?: string;
}

export interface LevelRule {
  level: number;
  name: string;
  minXP: number;
  unlocks: string[];
}

export interface Achievement {
  achievementId: string;
  type: 'contribution' | 'cognitive' | 'community' | 'season';
  name: string;
  description: string;
  criteria: string;
  unlocked: boolean;
  reward: { feedPoints: number; glowShards: number; reputation: number; cosmeticUnlocks: string[]; title?: string };
}

export interface DailyQuest {
  questId: string;
  cadence: 'daily';
  title: string;
  description: string;
  category: QuestCategory;
  completionRule: string;
  antiSpamRule: string;
  reward: { feedPoints: number; glowShards: number; reputation: number };
  completed: boolean;
}

export interface WeeklyQuest {
  questId: string;
  cadence: 'weekly';
  title: string;
  description: string;
  category: QuestCategory;
  completionRule: string;
  antiSpamRule: string;
  reward: { feedPoints: number; glowShards: number; reputation: number };
  progress: number;
  target: number;
  completed: boolean;
}

export interface DailySupply {
  supplyId: string;
  name: string;
  date: string;
  userId: string;
  feedPoints: number;
  glowShards: number;
  extraReviewChances: number;
  resonanceRecommendations: number;
  radarCards: number;
  claimed: boolean;
  note: string;
}

export interface Season {
  seasonId: string;
  name: string;
  theme: string;
  startDate: string;
  endDate: string;
  publicGoal: string;
  progress: number;
  target: number;
  seasonAchievements: Achievement[];
  seasonCosmetics: string[];
  leaderboard: LeaderboardEntry[];
}

export interface CognitiveMapRegion {
  regionId: string;
  name: string;
  domain: string;
  description: string;
  linkedRoute: string;
  glow: number;
  fog: number;
  buildingLevel: number;
  microLights: number;
  status: 'calm' | 'glowing' | 'foggy' | 'upgrading';
}

export interface Guild {
  guildId: string;
  name: string;
  domain: string;
  members: string[];
  publicGoal: string;
  resonance: number;
}

export interface LeaderboardEntry {
  userId: string;
  displayName: string;
  score: number;
  effectiveContributions: number;
  compressedD: number;
  rank: number;
}

export interface CosmeticItem {
  cosmeticId: string;
  name: string;
  target: 'jelly' | 'identity' | 'space' | 'interface' | 'avatar';
  rarity: CosmeticRarity;
  unlockSource: UnlockSource;
  free: boolean;
  description: string;
  affectsAbility: false;
}

export interface JellyAppearance {
  appearanceId: string;
  name: string;
  mainColor: string;
  secondaryColor: string;
  bellShape: string;
  tentacleStyle: string;
  glowEffect: string;
  texture: string;
  floatPose: string;
  glowIntensity: number;
  opacity: number;
  tentacleSwing: number;
  particleSpeed: number;
  haloSize: number;
  decorationAnchor: string;
}

export interface CustomizationPreset {
  presetId: string;
  name: string;
  mode: 'one_click' | 'template_tweak' | 'deep_diy';
  appearance: JellyAppearance;
  spaceId?: string;
  visibility: Visibility;
  reviewStatus: CosmeticReviewStatus;
}

export interface PersonalSpace {
  spaceId: string;
  name: string;
  type: 'cognitive_bay' | 'glow_island' | 'tidal_courtyard' | 'jelly_habitat';
  background: string;
  decorations: string[];
  visibility: Visibility;
}

export interface ResonanceWorkshopState {
  userId: string;
  diyUnlocked: boolean;
  unlockProgress: string[];
  colorOptions: string[];
  bellOptions: string[];
  tentacleOptions: string[];
  glowOptions: string[];
  backgroundOptions: string[];
  nameplateOptions: string[];
  maxPresetSlots: number;
  presets: CustomizationPreset[];
  activeAppearance: JellyAppearance;
  personalSpaces: PersonalSpace[];
}

export interface AvatarForm {
  formId: string;
  name: string;
  formType: AvatarFormType;
  layer: 'official' | 'style' | 'advanced_diy' | 'reference_translation';
  starter: boolean;
  description: string;
}

export interface MorphStyle {
  styleId: string;
  name: string;
  tags: string[];
  allowed: boolean;
}

export interface MorphTemplate {
  templateId: string;
  name: string;
  formId: string;
  styleId: string;
  careerClass: string;
  unlockSource: UnlockSource;
  reviewStatus: CosmeticReviewStatus;
  description: string;
}

export interface MorphSlot {
  slotId: string;
  slotType: 'core_form' | 'morphed_form';
  formId: string;
  templateId?: string;
  visibleIn: Array<'personal_space' | 'social' | 'ledger' | 'quest' | 'matching'>;
}

export interface MorphUnlockRule {
  ruleId: string;
  source: UnlockSource;
  requiredLevel?: number;
  achievementId?: string;
  skillDomain?: string;
  minReviewAccuracy?: number;
  formId: string;
}

export interface UserAvatarState {
  userId: string;
  coreFormId: string;
  morphFormId: string;
  unlockedFormIds: string[];
  activeSlots: MorphSlot[];
  styleTags: string[];
  boundaryNote: string;
}
