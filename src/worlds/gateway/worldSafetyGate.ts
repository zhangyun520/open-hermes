import type { WorldAction, WorldConnector } from '../types';
import { detectCheatRisk, requireHumanReviewForWorldAction } from '../safety/antiCheatBoundary';
export function validateWorldConnector(connector: WorldConnector): { allowed: boolean; reasons: string[] } {
  const reasons: string[] = [];
  if (connector.capabilities.multiplayerLiveControl !== false) reasons.push('multiplayerLiveControl must be false');
  if (connector.safetyPolicy.allowCheatAutomation !== false) reasons.push('cheat automation must be false');
  if (connector.safetyPolicy.allowLiveMultiplayerControl !== false) reasons.push('live multiplayer control must be false');
  if (connector.safetyPolicy.allowRealMoneyAutomation !== false) reasons.push('real money automation must be false');
  if (connector.worldType === 'online_game_replay' && !connector.permissions.includes('replay_analysis')) reasons.push('online replay connector requires replay_analysis permission');
  return { allowed: reasons.length === 0, reasons };
}
export function evaluateWorldAction(connector: WorldConnector, action: WorldAction): { allowed: boolean; requiresHumanReview: boolean; reasons: string[] } {
  const cheat = detectCheatRisk(connector, action);
  return { allowed: !cheat.blocked, requiresHumanReview: connector.safetyPolicy.requiresHumanReviewForActions || requireHumanReviewForWorldAction(action), reasons: cheat.reasons };
}
