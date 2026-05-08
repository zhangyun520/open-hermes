export interface JellyPulseTask { id: string; name: string; interval: 'daily' | 'weekly' | 'seasonal' | 'manual'; targetModule: string; purpose: string; }
export function listJellyPulseTasks(): JellyPulseTask[] { return [
  { id: 'daily-residual-digest', name: 'daily residual digest', interval: 'daily', targetModule: 'ResidualDigestor', purpose: 'digest new failures and garbage into residual candidates' },
  { id: 'daily-bias-scan', name: 'daily bias scan', interval: 'daily', targetModule: 'Bias Shelter', purpose: 'scan systemic pileups and under-reviewed domains' },
  { id: 'weekly-cache-cleanup', name: 'weekly cache cleanup', interval: 'weekly', targetModule: 'Shared Skill Memory Pool', purpose: 'remove stale or quarantined shared objects' },
  { id: 'weekly-skill-review', name: 'weekly skill review', interval: 'weekly', targetModule: 'Review Pool', purpose: 'review skill capsules and promotion candidates' },
  { id: 'seasonal-public-commons-report', name: 'seasonal public commons report', interval: 'seasonal', targetModule: 'Public Skill Commons', purpose: 'publish public commons health report' },
  { id: 'manual-human-transition-audit', name: 'manual human transition audit', interval: 'manual', targetModule: 'Human Transition Layer', purpose: 'review automation that may affect D_human' }
]; }
