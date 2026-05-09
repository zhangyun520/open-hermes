import { PageTitle } from '@/components/UI';
import { SandboxPolicyPanel } from '@/components/agents/SandboxPolicyPanel';
import { mockSandboxProfiles } from '@/src/agents';

export default function AgentSandboxPage() {
  return <div><PageTitle eyebrow="Sandbox Policy" title="Sandbox Policy / 沙盒策略">Herm-style 执行能力必须先进入可丢弃、无 secrets、allowlist-first 的 sandbox policy；当前只做决策，不执行命令。</PageTitle><SandboxPolicyPanel profiles={mockSandboxProfiles} /></div>;
}
