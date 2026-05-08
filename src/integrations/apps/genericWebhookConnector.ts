import { baseReadWriteCapabilities, createMockAppConnector } from './mockAppConnector';
export const genericWebhookConnector = createMockAppConnector({ id: 'webhook', name: 'Generic Webhook', appType: 'webhook', authType: 'webhook', capabilities: { ...baseReadWriteCapabilities, webhook: true, search: false } });
