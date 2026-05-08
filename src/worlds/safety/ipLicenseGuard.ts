import type { LicensePolicy, WorldCapsule } from '../types';
export function detectIPRisk(worldCapsule: WorldCapsule): { allowedPublic: boolean; risk: 'low' | 'medium' | 'high'; reasons: string[] } {
  const license = worldCapsule.licensePolicy;
  const reasons: string[] = [];
  if (license.licenseType === 'unknown' || license.licenseType === 'restricted') reasons.push('license is unknown or restricted');
  if (license.licenseType === 'fan_noncommercial' && worldCapsule.status === 'public') reasons.push('fan noncommercial scenes cannot be promoted as public product assets');
  if (!license.allowDerivativeScenes && worldCapsule.allowedActions.some((action) => /remix|derive|fork|改编/.test(action))) reasons.push('derivative scenes are not allowed');
  return { allowedPublic: reasons.length === 0 && ['original', 'authorized'].includes(license.licenseType), risk: reasons.length ? 'high' : license.attributionRequired ? 'medium' : 'low', reasons };
}
export function licenseAllowsPublicUse(license: LicensePolicy): boolean { return ['original', 'authorized'].includes(license.licenseType) && !license.forbiddenUses.includes('public_share'); }
