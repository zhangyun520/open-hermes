import { baseReadWriteCapabilities, createMockAppConnector } from './mockAppConnector';
export const notionConnector = createMockAppConnector({ id: 'notion', name: 'Notion', appType: 'notion', authType: 'oauth', capabilities: { ...baseReadWriteCapabilities, fileAccess: true } });
