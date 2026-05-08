import type { SecretRef } from '../types';
export function createEnvSecretRef(secretId: string, providerId?: string, connectorId?: string): SecretRef { return { secretId, providerId, connectorId, storage: 'env', masked: `${secretId.slice(0, 4)}_****` }; }
export function resolveSecret(_ref?: SecretRef): string | undefined { return undefined; }
