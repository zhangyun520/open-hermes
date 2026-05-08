import { listCacheObjects } from '../sharedCache/cacheObjectRegistry';
export function listCognitiveCommons() { return listCacheObjects().filter((object) => object.targetLayer === 'public' || object.targetLayer === 'community'); }
