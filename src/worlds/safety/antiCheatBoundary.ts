import type { WorldAction, WorldConnector } from '../types';
export function detectCheatRisk(connector: WorldConnector, action: WorldAction): { blocked: boolean; reasons: string[] } {
  const reasons: string[] = [];
  const text = `${action.actionType} ${action.summary}`.toLowerCase();
  if (connector.capabilities.multiplayerLiveControl !== false) reasons.push('live multiplayer control capability must be false');
  if (action.liveMultiplayer || /live control|auto aim|aimbot|外挂|代练|刷分|cheat|bypass anti.?cheat/.test(text)) reasons.push('live multiplayer automation or cheat-like action is forbidden');
  if (action.realMoney || connector.safetyPolicy.allowRealMoneyAutomation) reasons.push('real money automation is forbidden');
  if (!connector.permissions.includes('replay_analysis') && /replay/.test(text) && connector.worldType === 'online_game_replay') reasons.push('replay analysis permission missing');
  return { blocked: reasons.length > 0, reasons };
}
export function requireHumanReviewForWorldAction(action: WorldAction): boolean { return Boolean(action.realWorldImpact || action.realMoney || action.liveMultiplayer || /medical|legal|financial|military|工业安全|未成年人|war|weapon|target/i.test(`${action.actionType} ${action.summary}`)); }
