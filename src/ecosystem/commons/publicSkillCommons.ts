import { listCacheObjects } from '../sharedCache/cacheObjectRegistry';
export function listPublicSkills() { return listCacheObjects().filter((object) => object.status === 'public_skill'); }
