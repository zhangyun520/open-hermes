import { makeMockWorldConnector } from './mockConnectorFactory';
export const genericWorldWebhookConnector = makeMockWorldConnector('world-webhook', 'Generic World Webhook', 'original_virtual_world', { source: 'authorized_sdk', status: 'requires_authorization', permissions: ['read_only', 'no_write'] });
