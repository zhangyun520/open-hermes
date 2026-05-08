import type { CacheLayer } from '../types';
export function canFederateLayer(source: CacheLayer, target: CacheLayer): boolean { const order: CacheLayer[] = ['private', 'team', 'community', 'public']; return order.indexOf(target) >= order.indexOf(source); }
