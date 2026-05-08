import type { ActionApproval, AppAction, AppActionResult } from '../types';
import { getAppConnector, registerAppConnector } from './connectorRegistry';
import { checkConnectorPermission } from './consentManager';
import { actionRequiresHumanApproval, inferActionRisk } from './safetyGate';

const approvalQueue: ActionApproval[] = [];
export { registerAppConnector };
export { requestConnectorConsent, checkConnectorPermission } from './consentManager';

export function enqueueActionApproval(action: AppAction): ActionApproval {
  const existing = approvalQueue.find((item) => item.actionId === action.actionId);
  if (existing) return existing;
  const approval: ActionApproval = { actionId: action.actionId, connector: action.connectorId, actionType: action.actionType, riskLevel: inferActionRisk(action), summary: action.summary, status: 'pending', createdAt: new Date().toISOString() };
  approvalQueue.push(approval);
  return approval;
}

export function approveExternalAction(actionId: string): ActionApproval | undefined { return decide(actionId, 'approved'); }
export function rejectExternalAction(actionId: string): ActionApproval | undefined { return decide(actionId, 'rejected'); }
function decide(actionId: string, status: ActionApproval['status']) { const approval = approvalQueue.find((item) => item.actionId === actionId); if (approval) { approval.status = status; approval.decidedAt = new Date().toISOString(); } return approval; }
export function listActionApprovals() { return [...approvalQueue]; }
export function clearActionApprovals() { approvalQueue.length = 0; }

export async function executeAppAction(action: AppAction): Promise<AppActionResult> {
  const connector = getAppConnector(action.connectorId);
  if (!connector) return { actionId: action.actionId, connectorId: action.connectorId, status: 'blocked', message: 'connector not registered' };
  if (action.actionType !== 'read' && !checkConnectorPermission(action.connectorId, action)) return { actionId: action.actionId, connectorId: action.connectorId, status: 'blocked', message: 'writeAction blocked: missing explicit connector consent' };
  if (action.actionType !== 'read' || actionRequiresHumanApproval(action) || connector.capabilities.requiresHumanApprovalForWrite) {
    const approval = enqueueActionApproval(action);
    return { actionId: action.actionId, connectorId: action.connectorId, status: 'queued_for_approval', message: 'external write action queued for human approval', approvalId: approval.actionId };
  }
  return connector.writeAction ? connector.writeAction(action) : { actionId: action.actionId, connectorId: action.connectorId, status: 'completed', message: 'mock read/no-op completed' };
}
