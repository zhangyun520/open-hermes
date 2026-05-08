import type { LicensePolicy, WorldConnector, WorldSafetyPolicy, WorldType } from '../types';
export const originalLicense: LicensePolicy = { licenseType: 'original', allowedUses: ['analysis', 'training', 'residual_mapping'], forbiddenUses: ['cheat', 'impersonation'], allowDerivativeScenes: true, allowTrainingUse: true, attributionRequired: false };
export const authorizedLicense: LicensePolicy = { ...originalLicense, licenseType: 'authorized', owner: 'Mock Official Partner', attributionRequired: true };
export const safeWorldPolicy: WorldSafetyPolicy = { allowCheatAutomation: false, allowLiveMultiplayerControl: false, allowRealMoneyAutomation: false, allowExternalHarmOptimization: false, requiresHumanReviewForActions: true, minorDataPolicy: 'high_privacy' };
export function makeMockWorldConnector(id: string, name: string, worldType: WorldType, overrides: Partial<WorldConnector> = {}): WorldConnector {
  const { capabilities, ...rest } = overrides;
  const baseCapabilities = { readState: true, importReplay: false, exportScene: true, receiveEvents: true, sendSuggestions: true, sandboxActions: false, multiplayerLiveControl: false as const };
  return { id, name, worldType, status: 'mock', source: 'mock', permissions: ['read_only', 'no_write'], licensePolicy: originalLicense, safetyPolicy: safeWorldPolicy, ...rest, capabilities: { ...baseCapabilities, ...(capabilities ?? {}), multiplayerLiveControl: false } };
}
