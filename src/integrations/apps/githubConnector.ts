import { baseReadWriteCapabilities, createMockAppConnector } from './mockAppConnector';
export const githubConnector = createMockAppConnector({ id: 'github', name: 'GitHub', appType: 'github', authType: 'oauth', capabilities: { ...baseReadWriteCapabilities, fileAccess: true, repoWrite: true } });
