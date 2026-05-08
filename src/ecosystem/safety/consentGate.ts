import type { CacheLayer, ConsentPolicy } from '../types';
export function consentAllowsLayer(consent: ConsentPolicy, targetLayer: CacheLayer): boolean {
  if (targetLayer === 'private') return consent.allowPrivate;
  if (targetLayer === 'team') return consent.allowTeamShare;
  if (targetLayer === 'community') return consent.allowCommunityShare;
  if (targetLayer === 'public') return consent.allowPublicShare;
  return false;
}
