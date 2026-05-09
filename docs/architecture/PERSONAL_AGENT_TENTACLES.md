# Personal Agent Tentacles / 个人 Agent 触手

## Purpose

Personal agents are the local, human-owned entry point for Cognitive Jelly tentacles. They can propose capabilities, but they do not receive real network, write, secret, or execution power by default.

## Protocol Flow

```text
PersonalAgent
→ TentacleManifest
→ TentacleAdmissionGate
→ SandboxPolicy / SkillImportQuarantine
→ dry-run
→ human approval when required
→ mock execution
→ verification
→ residual digest
→ transparent audit
```

## Safety Defaults

- Network access defaults to `none` or explicit allowlist.
- External writes require consent and human review.
- Secrets are denied by default.
- Executable tasks require sandbox review.
- Raw task logs do not enter public cache or NFAP.
- Imported external skills remain quarantined until reviewed.

## Current Scope

This is mock-only scaffolding. It does not call real APIs, execute real commands, send messages, write repositories, or upload private data.
