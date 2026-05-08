export type CacheLayer = 'private' | 'team' | 'community' | 'public';
export type SharedCacheObjectType = 'residual_card' | 'skill_capsule' | 'verification_proof' | 'route_policy' | 'failure_case' | 'template' | 'dataset_schema';
export type CacheObjectStatus = 'draft' | 'private' | 'team_candidate' | 'team_verified' | 'community_candidate' | 'community_verified' | 'public_candidate' | 'public_skill' | 'deprecated' | 'quarantined' | 'rejected';
export type PrivacyLevel = 'low' | 'medium' | 'high';
export type RiskLevel = 'low' | 'medium' | 'high';
export type LicenseMode = 'private' | 'team_internal' | 'community_share' | 'public_commons' | 'attribution_required';

export interface ProvenanceRecord {
  originalContributorId: string;
  ideaNotaryHash: string;
  timestamp: string;
  parentObjectIds: string[];
  transformationSteps: string[];
  reviewIds: string[];
  verificationIds: string[];
}

export interface ConsentPolicy {
  allowPrivate: boolean;
  allowTeamShare: boolean;
  allowCommunityShare: boolean;
  allowPublicShare: boolean;
  allowTrainingUse: boolean;
  allowDerivativeSkills: boolean;
  allowAttribution: boolean;
  allowAnonymousAttribution: boolean;
}

export interface SharedCacheObject {
  id: string;
  type: SharedCacheObjectType;
  title: string;
  domain: string;
  sourceLayer: CacheLayer;
  targetLayer: CacheLayer;
  privacyLevel: PrivacyLevel;
  riskLevel: RiskLevel;
  ownerId: string;
  organizationId?: string;
  contributors: string[];
  provenance: ProvenanceRecord;
  consent: ConsentPolicy;
  licenseMode: LicenseMode;
  status: CacheObjectStatus;
  version: string;
  createdAt: string;
  updatedAt: string;
  usageCount: number;
  cacheHitCount: number;
  reviewScore: number;
  verifiedCompressionScore: number;
  qualityScore: number;
  safetyScore: number;
  anonymized: boolean;
  promotionHistory: Array<{ from: CacheLayer; to: CacheLayer; at: string; by: string; result: 'approved' | 'blocked' }>;
}

export interface CachePromotionPolicy {
  minReviewScore: number;
  minUsageCount: number;
  minVerifiedCompression: number;
  maxRiskLevel: RiskLevel;
  requiresHumanReview: boolean;
  requiresAnonymization: boolean;
  requiresSourceLicense: boolean;
}

export interface CacheHitRecord {
  id: string;
  cacheObjectId: string;
  userId: string;
  taskId: string;
  layer: CacheLayer;
  savedEstimatedCost: number;
  qualityFeedback: number;
  createdAt: string;
}

export interface CacheRewardEvent {
  id: string;
  cacheObjectId: string;
  contributorId: string;
  rewardType: 'feed_points' | 'reputation' | 'compression_credit' | 'mock_revenue_share';
  amount: number;
  reason: string;
  status: 'pending' | 'released' | 'blocked';
}

export interface SharedCacheSearchQuery { userId: string; text: string; domain?: string; teamId?: string; includePublic?: boolean; }
export interface SharedCacheSearchContext { userId: string; teamIds: string[]; organizationIds: string[]; allowedLayers: CacheLayer[]; }
export interface SharedCacheSearchResult { exactHits: SharedCacheObject[]; semanticHits: SharedCacheObject[]; skillHits: SharedCacheObject[]; routeSuggestions: string[]; riskWarnings: string[]; searchOrder: CacheLayer[]; }

export interface EcosystemConnector {
  id: string;
  name: string;
  type: 'user' | 'team' | 'organization' | 'app' | 'model' | 'tool' | 'community';
  capabilities: string[];
  permissions: string[];
  status: 'active' | 'pending' | 'disabled' | 'error';
}

export interface OrganizationRecord { organizationId: string; name: string; type: 'team' | 'organization' | 'community'; members: string[]; defaultLayer: CacheLayer; }
export interface QuarantineRecord { id: string; cacheObjectId: string; reason: string; riskLevel: RiskLevel; createdAt: string; status: 'open' | 'resolved'; }
export interface PoisoningSignal { type: 'duplicate_spam' | 'hit_farming' | 'low_quality_batch' | 'abnormal_contributor'; severity: RiskLevel; message: string; objectIds: string[]; }
export interface BiasImmuneAlert { type: 'domain_pileup' | 'reward_concentration' | 'hot_domain_bias'; severity: RiskLevel; message: string; evidence: string[]; }
