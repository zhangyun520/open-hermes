import { baseReadWriteCapabilities, createMockAppConnector } from './mockAppConnector';
export const gmailConnector = createMockAppConnector({ id: 'gmail', name: 'Gmail', appType: 'gmail', authType: 'oauth', capabilities: { ...baseReadWriteCapabilities, messageSend: true } });
