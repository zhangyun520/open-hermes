import { PageTitle } from '@/components/UI';
import { SkillImportQuarantinePanel } from '@/components/agents/SkillImportQuarantinePanel';
import { mockExternalSkills } from '@/src/agents';

export default function AgentSkillsPage() {
  return <div><PageTitle eyebrow="Skill Import Quarantine" title="Skill Import Quarantine / 技能导入隔离区">OpenClaw-style 外部技能先进入隔离区，只做 descriptor review 和 mock 验证，不直接执行。</PageTitle><SkillImportQuarantinePanel skills={mockExternalSkills} /></div>;
}
