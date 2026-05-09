import type { AgentCapabilityRecommendation, ExternalAgentCapability, ExternalAgentProvider } from './types';

const baseMap: Record<ExternalAgentCapability, AgentCapabilityRecommendation['organs']> = {
  code_review: ['transparent_audit', 'swarm_commons'],
  code_execution: ['tentacle', 'cnidocyte', 'privacy_membrane'],
  browser_qa: ['digestor', 'bioluminescence', 'transparent_audit'],
  skill_marketplace: ['swarm_commons', 'cnidocyte', 'lifecycle'],
  container_sandbox: ['privacy_membrane', 'regenerative_recovery', 'cnidocyte'],
  long_running_task: ['lifecycle', 'transparent_audit', 'regenerative_recovery'],
  mcp_tooling: ['tentacle', 'cnidocyte', 'transparent_audit']
};

export function recommendJellyOrgansForAgentCapability(provider: ExternalAgentProvider, capability: ExternalAgentCapability): AgentCapabilityRecommendation {
  const providerSafety: Record<ExternalAgentProvider, string[]> = {
    codex: ['repo scope', 'test command', 'PR review audit'],
    claude_code: ['permission mode', 'MCP tool review', 'terminal command sandbox'],
    openclaw: ['skill quarantine', 'permission manifest', 'network allowlist'],
    herm_container_agent: ['ephemeral container', 'no secrets by default', 'provider isolation'],
    generic_agent: ['human review', 'mock-only adapter', 'least privilege']
  };
  return { provider, capability, organs: baseMap[capability], requiredSafety: providerSafety[provider] };
}
