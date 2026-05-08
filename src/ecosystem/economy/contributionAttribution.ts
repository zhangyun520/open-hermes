import type { SharedCacheObject } from '../types';
export function calculateContributionShares(object: SharedCacheObject): Array<{ contributorId: string; share: number }> {
  const contributors = object.contributors.length ? object.contributors : [object.ownerId];
  const share = Number((1 / contributors.length).toFixed(4));
  return contributors.map((contributorId) => ({ contributorId, share }));
}
