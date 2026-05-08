import type { AppAction, ConsentRecord } from '../types';
const consentRecords = new Map<string, ConsentRecord>();
const key = (connectorId: string, userId: string) => `${connectorId}:${userId}`;

export function requestConnectorConsent(connectorId: string, scopes: string[], userId = 'demo-user'): ConsentRecord {
  const record: ConsentRecord = { connectorId, userId, read: scopes.includes('read'), write: scopes.includes('write'), messageSend: scopes.includes('messageSend'), fileWrite: scopes.includes('fileWrite'), calendarCreate: scopes.includes('calendarCreate'), submitPR: scopes.includes('submitPR'), requireEveryTimeConfirmation: true, allowAutomation: false, scopes, updatedAt: new Date().toISOString() };
  consentRecords.set(key(connectorId, userId), record);
  return record;
}

export function getConsent(connectorId: string, userId: string) { return consentRecords.get(key(connectorId, userId)); }
export function clearConsentRecords() { consentRecords.clear(); }

export function checkConnectorPermission(connectorId: string, action: AppAction): boolean {
  const consent = getConsent(connectorId, action.userId);
  if (!consent) return false;
  if (action.actionType === 'read') return consent.read;
  if (action.actionType === 'send_message' || action.actionType === 'send_email') return consent.write && consent.messageSend;
  if (action.actionType === 'create_calendar_event') return consent.write && consent.calendarCreate;
  if (action.actionType === 'submit_pr' || action.actionType === 'git_push') return consent.write && consent.submitPR;
  if (action.actionType === 'delete_file' || action.actionType === 'write_page') return consent.write && consent.fileWrite;
  return consent.write;
}
