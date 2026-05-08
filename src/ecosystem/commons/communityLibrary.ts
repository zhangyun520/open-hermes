import { listCacheObjects } from '../sharedCache/cacheObjectRegistry';
export function listCommunityLibrary() { return listCacheObjects().filter((object) => object.targetLayer === 'community' || object.status === 'community_candidate'); }
