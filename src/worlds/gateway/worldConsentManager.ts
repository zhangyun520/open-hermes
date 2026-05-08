export interface WorldConsent { id: string; userId: string; allowExperienceLogging: boolean; allowTrainingUse: boolean; allowPublicShare: boolean; allowMinorData: boolean; createdAt: string; }
const consents = new Map<string, WorldConsent>();
export function grantWorldConsent(consent: Omit<WorldConsent, 'id' | 'createdAt'> & Partial<Pick<WorldConsent, 'id' | 'createdAt'>>): WorldConsent { const saved = { ...consent, id: consent.id ?? `world-consent-${consent.userId}`, createdAt: consent.createdAt ?? new Date().toISOString() }; consents.set(saved.id, saved); return saved; }
export function getWorldConsent(id: string) { return consents.get(id); }
export function worldConsentAllowsTraining(id: string) { return consents.get(id)?.allowTrainingUse === true; }
