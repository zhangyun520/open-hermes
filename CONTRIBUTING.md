# CONTRIBUTING.md

Thank you for contributing to Cognitive Jelly / 认知水母.

## Contribution Types

1. Code contribution
2. Protocol contribution
3. Documentation contribution
4. Residual taxonomy contribution
5. Skill capsule contribution
6. Safety review
7. Bias report
8. Human transition proposal
9. UI / aesthetic contribution
10. World experience connector contribution

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
