import { baseReadWriteCapabilities, createMockAppConnector } from './mockAppConnector';
export const calendarConnector = createMockAppConnector({ id: 'calendar', name: 'Google Calendar', appType: 'calendar', authType: 'oauth', capabilities: { ...baseReadWriteCapabilities, calendarWrite: true } });
