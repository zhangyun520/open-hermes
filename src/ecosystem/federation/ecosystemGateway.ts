import { ecosystemConnectors } from './ecosystemConnector';
import { organizations } from './organizationRegistry';
import { listCacheObjects } from '../sharedCache/cacheObjectRegistry';
import { listCacheHitRecords } from '../sharedCache/cacheHitLedger';
import { listQuarantineRecords } from '../sharedCache/cacheQuarantine';

export function getEcosystemOverview() {
  const objects = listCacheObjects();
  const hits = listCacheHitRecords();
  return { totalCacheObjects: objects.length, publicSkillCount: objects.filter((object) => object.status === 'public_skill').length, todayCacheHits: hits.length, estimatedSavedCost: hits.reduce((sum, hit) => sum + hit.savedEstimatedCost, 0), pendingSharedObjects: objects.filter((object) => object.status.includes('candidate')).length, quarantinedObjects: listQuarantineRecords().length + objects.filter((object) => object.status === 'quarantined').length, activeOrganizations: organizations.length, activeConnectors: ecosystemConnectors.filter((connector) => connector.status === 'active').length };
}
