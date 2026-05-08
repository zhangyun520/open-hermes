import { baseReadWriteCapabilities, createMockAppConnector } from './mockAppConnector';
export const slackConnector = createMockAppConnector({ id: 'slack', name: 'Slack', appType: 'slack', authType: 'oauth', capabilities: { ...baseReadWriteCapabilities, messageSend: true, webhook: true } });
