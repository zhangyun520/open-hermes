import type { ExperienceRewardEvent, TesterReputation, WorldCapsule } from './types';
import { mockAnimeWorldConnector } from './connectors/mockAnimeWorldConnector';
import { mockGameConnector } from './connectors/mockGameConnector';
import { mockOnlineGameReplayConnector } from './connectors/mockOnlineGameReplayConnector';
import { mockSimulationConnector } from './connectors/mockSimulationConnector';
import { genericWorldWebhookConnector } from './connectors/genericWorldWebhookConnector';
import { makeMockWorldConnector, originalLicense, authorizedLicense } from './connectors/mockConnectorFactory';
import { registerWorldConnector, resetWorldConnectors } from './gateway/worldConnectorRegistry';
import { createWorldCapsule, resetWorldCapsules } from './scenes/worldCapsule';
import { createExperienceSession, recordExperienceEvent, resetExperienceSessions } from './experience/experienceSession';
import { submitExperienceFeedback, resetExperienceFeedback } from './experience/experienceFeedback';
import { generateProofOfExperience, resetProofsOfExperience } from './experience/proofOfExperience';
import { calculateExperienceReward } from './experience/experienceRewardEngine';
import { defaultTesterReputation } from './experience/testerReputation';

resetWorldConnectors(); resetWorldCapsules(); resetExperienceSessions(); resetExperienceFeedback(); resetProofsOfExperience();
export const mockWorldConnectors = [mockGameConnector, mockOnlineGameReplayConnector, makeMockWorldConnector('world-official-api', '官方 API 游戏连接器', 'online_game_official_api', { source: 'official_api', status: 'requires_authorization', permissions: ['read_only', 'official_api_write'] }), mockAnimeWorldConnector, makeMockWorldConnector('world-original-vr', '原创虚拟世界连接器', 'original_virtual_world', { permissions: ['read_only', 'training_mode', 'sandbox_write'] }), mockSimulationConnector, genericWorldWebhookConnector].map(registerWorldConnector);

function capsule(input: Omit<WorldCapsule, 'id' | 'createdAt' | 'linkedResidualCardIds' | 'linkedSkillIds' | 'linkedWorldModelSpecIds'> & { id: string }) { return createWorldCapsule({ ...input, linkedResidualCardIds: [], linkedSkillIds: [], linkedWorldModelSpecIds: [] }); }
export const mockWorldCapsules = [
  capsule({ id: 'world-village-economy', title: '村庄经济循环模拟', worldType: 'single_player_game', domain: 'gameplay', description: '测试资源、任务、奖励循环是否自洽。', sourceConnectorId: 'world-single-player', licensePolicy: originalLicense, privacyLevel: 'team', riskLevel: 'low', allowedActions: ['observe economy loop', 'sandbox balance changes'], forbiddenActions: ['real money automation'], createdBy: 'u-lan', version: '0.1.0', status: 'active', experienceCount: 18 }),
  capsule({ id: 'world-moba-replay', title: 'MOBA 团战回放分析', worldType: 'online_game_replay', domain: 'gameplay', description: '只分析回放，不自动操控，不提供作弊建议。', sourceConnectorId: 'world-online-replay', licensePolicy: authorizedLicense, privacyLevel: 'team', riskLevel: 'medium', allowedActions: ['replay analysis', 'strategy reflection'], forbiddenActions: ['live multiplayer control', 'cheat suggestion'], createdBy: 'u-reef', version: '0.1.0', status: 'reviewing', experienceCount: 9 }),
  capsule({ id: 'world-deepsea-academy', title: '深海学院原创世界观', worldType: 'anime_world', domain: 'anime', description: '测试角色、设定、剧情残差与认知水母世界观连接。', sourceConnectorId: 'world-anime', licensePolicy: originalLicense, privacyLevel: 'community', riskLevel: 'low', allowedActions: ['original character scene', 'narrative consistency review'], forbiddenActions: ['copy protected character'], createdBy: 'u-moon', version: '0.2.0', status: 'active', experienceCount: 27 }),
  capsule({ id: 'world-industrial-alarm', title: '设备报警排查训练场', worldType: 'simulation', domain: 'industry', description: '模拟新人如何根据工单排查故障。', sourceConnectorId: 'world-simulation', licensePolicy: originalLicense, privacyLevel: 'team', riskLevel: 'high', allowedActions: ['training mode', 'human reviewed recommendation'], forbiddenActions: ['automatic real equipment control'], createdBy: 'u-ops', version: '0.1.0', status: 'reviewing', experienceCount: 6 }),
  capsule({ id: 'world-math-maze', title: '高考压轴题迷宫', worldType: 'original_virtual_world', domain: 'education', description: '把数学题拆成可体验关卡。', sourceConnectorId: 'world-original-vr', licensePolicy: originalLicense, privacyLevel: 'community', riskLevel: 'low', allowedActions: ['story experience', 'learning feedback'], forbiddenActions: ['student personal data public share'], createdBy: 'u-lan', version: '0.1.0', status: 'active', experienceCount: 21 }),
  capsule({ id: 'world-prompt-recycle-lab', title: 'Prompt 失败回收实验室', worldType: 'simulation', domain: 'training', description: '体验 AI 输出跑偏如何被回收成技能。', sourceConnectorId: 'world-simulation', licensePolicy: originalLicense, privacyLevel: 'community', riskLevel: 'medium', allowedActions: ['prompt failure analysis', 'residual mapping'], forbiddenActions: ['save real api keys'], createdBy: 'codex', version: '0.1.0', status: 'active', experienceCount: 14 })
];

export const sampleExperienceSession = createExperienceSession('tester-lan', 'world-village-economy', 'sandbox_test', { connectorId: 'world-single-player', consentId: 'consent-demo' });
recordExperienceEvent(sampleExperienceSession.id, { eventType: 'failure', summary: '玩家在第三轮资源循环后无法理解奖励来源。', metadata: { loop: 3 } });
recordExperienceEvent(sampleExperienceSession.id, { eventType: 'residual_found', summary: '任务奖励说明缺少中间状态反馈。', metadata: { residualType: 'interaction' } });
export const sampleExperienceFeedback = submitExperienceFeedback(sampleExperienceSession.id, { feedbackType: 'residual_discovery', title: '经济循环反馈缺失', content: '第三轮后资源上涨但没有解释，玩家无法建立任务-奖励因果。', usefulnessScore: 86, clarityScore: 90, evidenceStrength: 82, residualValue: 88, status: 'accepted' });
export const sampleProof = generateProofOfExperience(sampleExperienceSession);
export const sampleTesterReputation: TesterReputation = { ...defaultTesterReputation('tester-lan'), acceptedFeedbackCount: 8, rejectedFeedbackCount: 1, feedbackAccuracy: 89, trustLevel: 'trusted', domains: { gameplay: 31 } };
export const sampleExperienceRewards: ExperienceRewardEvent[] = calculateExperienceReward(sampleExperienceFeedback, sampleProof, sampleTesterReputation, 3600);
