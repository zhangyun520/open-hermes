import type { CacheLayer, SharedCacheObject } from '../types';
const privacyPatterns = [/1[3-9]\d{9}/, /身份证|手机号|车牌|保单|学校|学生|客户/, /[京沪津渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼][A-Z][A-Z0-9]{5}/];
export function detectPrivacyFields(text: string): string[] { return privacyPatterns.filter((pattern) => pattern.test(text)).map((pattern) => pattern.source); }
export function privacyGateAllowsPromotion(object: SharedCacheObject, targetLayer: CacheLayer): { allowed: boolean; reasons: string[] } {
  const reasons: string[] = [];
  if (targetLayer === 'public' && object.privacyLevel === 'high') reasons.push('high privacy cannot enter public');
  if (targetLayer !== 'private' && !object.anonymized) reasons.push('object must be anonymized before sharing');
  return { allowed: reasons.length === 0, reasons };
}
