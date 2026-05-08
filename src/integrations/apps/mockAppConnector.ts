import type { AppAction, AppActionResult, AppCapabilities, AppConnector, AppResource, AppType, AuthType, ConnectorConfig, ConnectorHealth, ConnectorStatus, ConnectorStatusValue, ResourceList, ResourceQuery } from '../types';

export function createMockAppConnector(options: { id: string; name: string; appType: AppType; authType: AuthType; status?: ConnectorStatusValue; capabilities: AppCapabilities }): AppConnector {
  return {
    id: options.id,
    name: options.name,
    appType: options.appType,
    status: options.status ?? 'mock',
    authType: options.authType,
    capabilities: options.capabilities,
    connect: async (_config: ConnectorConfig): Promise<ConnectorStatus> => ({ connectorId: options.id, status: options.status ?? 'mock', connected: true, message: 'mock connector connected; official OAuth/API placeholder only' }),
    listResources: async (_query: ResourceQuery): Promise<ResourceList> => ({ resources: [{ resourceId: `${options.id}-resource-1`, title: `${options.name} mock resource`, contentPreview: 'Mock resource list; no external app called.' }] }),
    readResource: async (resourceId: string): Promise<AppResource> => ({ resourceId, title: `${options.name} mock read`, contentPreview: 'Mock content; no external app called.' }),
    writeAction: async (action: AppAction): Promise<AppActionResult> => ({ actionId: action.actionId, connectorId: options.id, status: 'queued_for_approval', message: 'writeAction is queued by default and must pass ConsentManager + SafetyGate' }),
    healthCheck: async (): Promise<ConnectorHealth> => ({ connectorId: options.id, ok: true, status: options.status ?? 'mock', message: 'mock connector healthy' })
  };
}

export const baseReadWriteCapabilities: AppCapabilities = { read: true, write: true, search: true, webhook: false, fileAccess: false, messageSend: false, calendarWrite: false, repoWrite: false, requiresHumanApprovalForWrite: true };
