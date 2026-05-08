import type { AppAction, ModelRequest, PrivacyLevel, RiskLevel } from '../types';

const privacyPatterns = [/1[3-9]\d{9}/, /\d{6}(18|19|20)\d{2}(0[1-9]|1[0-2])([0-2]\d|3[01])\d{3}[0-9Xx]/, /[京沪津渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼][A-Z][A-Z0-9]{5}/, /学生|客户|保单|学校|手机号|身份证|车牌/];
const externalWriteActions = new Set(['send_message', 'send_email', 'create_calendar_event', 'submit_pr', 'git_push', 'delete_file', 'write_page', 'post_webhook']);
const highRiskKeywords = /付款|合同|保险承诺|教育评估报告|群发|邀请|删除|push/i;

export function detectPrivacyLevel(text: string): PrivacyLevel { return privacyPatterns.some((pattern) => pattern.test(text)) ? 'high' : text.length > 1200 ? 'medium' : 'low'; }
export function shouldUseLocalProvider(request: ModelRequest): boolean { return request.privacyLevel === 'high' || request.modelIntent === 'private_local'; }
export function actionRequiresHumanApproval(action: AppAction): boolean { return externalWriteActions.has(action.actionType) || action.riskLevel === 'high' || highRiskKeywords.test(action.summary); }
export function inferActionRisk(action: AppAction): RiskLevel { return action.riskLevel === 'high' || highRiskKeywords.test(action.summary) ? 'high' : action.riskLevel; }
