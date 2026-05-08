import { listCacheObjects } from '../sharedCache/cacheObjectRegistry';
export function listTeamKnowledgePool(teamId?: string) { return listCacheObjects().filter((object) => object.targetLayer === 'team' && (!teamId || object.organizationId === teamId)); }
