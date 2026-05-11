# CONTRIBUTING.md

Thank you for contributing to Cognitive Jelly / 认知水母.

## Contribution Types

Jellyfish uses a **wide entrance, narrow trunk** model: many contribution forms are welcome, while important changes move through review, attribution, and governance before becoming canonical.

You can contribute:

- `idea` — new concepts, sketches, metaphors, workflows, or RFC seeds.
- `failure case` — mistakes, bad outputs, broken workflows, safety misses, or residuals that should be digested instead of hidden.
- `benchmark scenario` — reproducible tasks, eval prompts, expected behaviors, counterexamples, and regression cases.
- `code` — implementation, tests, refactors, mocks, safety gates, UI, or tooling.
- `documentation` — guides, diagrams, glossary entries, protocol notes, examples, and translations.
- `research note` — literature notes, hypotheses, measurement plans, or open questions.
- `product design` — flows, wireframes, interaction patterns, onboarding, and user research summaries.

Failure cases and benchmark scenarios are first-class contributions. Do not include private raw data, secrets, or sensitive user material; redact before sharing.

All important accepted contributions should be added to `CONTRIBUTORS.md` under the relevant type.

## Required Contribution Questions

Every contribution should explain:

- Which `D` does this attempt to reduce?
- Does it involve privacy or sensitive data?
- Does it require human review?
- Does it affect public cache?
- Does it affect human transition?
- Could it create or amplify system bias?
- How is it tested?

## Pull Request Template

Use this structure in PR descriptions when possible:

```md
## Goal

## Residual addressed

## Files changed

## Risk level
low / medium / high / critical

## Privacy impact

## Public cache impact

## Human transition impact

## External integration impact

## Tests

## Screenshots if UI

## Version voice track
stable / experimental / safety / aesthetic / low_cost / community / world_model / human_transition
```

## Development Principles

- Prefer clear protocols over clever implementation.
- Keep mock integrations clearly marked as mock.
- Do not commit secrets or real API keys.
- Add or update tests for logic changes.
- Update documentation when introducing new concepts.
- If unsure about safety, route to human review.

## Neural Fertilizer Contributions

When contributing NFAP or Nebula Synapse Network changes, keep the work protocol-first and mock-only unless a later human-reviewed proposal explicitly authorizes real training.

- Do not submit raw private data as training material.
- Do not promote F0/F1 material into training candidates.
- Keep provenance, consent, privacy, review, verification, risk, and contribution chain fields intact.
- Treat minor data as high privacy and enterprise-sensitive material as private by default.
- Model blocks must pass evaluation and required human review before attachment.
- Do not promise token value, yield, model-improvement rewards, or training income.
- Respect consent withdrawal and use pruning actions (dormant, compost, quarantine, forget) instead of treating pruning as deletion-only.
