# Rust Jelly Core

`jelly_core` is the stable / low_cost Rust core for Cognitive Jelly residual logic. It extracts deterministic protocol decisions from the current TypeScript application layer while keeping the web app unchanged.

## Residual reduced

This crate reduces `D_core_logic`: the residual created when safety, privacy, routing, digestion, cost, and lifecycle rules are only embedded in UI-adjacent TypeScript modules. A small pure Rust core makes these rules cheaper to test, easier to port, and less dependent on web runtime behavior.

## Voice track

- `stable`: deterministic formulas and protocol decisions are represented as pure functions.
- `low_cost`: the crate has no external dependencies and performs no network or model calls.
- `safety`: CnidocyteSafetyGate and OsmoticPrivacyMembrane rules are first-class APIs.

## Included organs

- `NerveNetRouter`: `route_jelly_signal` routes signals without a central-brain assumption.
- `CnidocyteSafetyGate`: `evaluate_jelly_safety` blocks or reviews privacy leaks, sensitive metadata, cheating, unauthorized IP/persona risks, risky external writes, and human-transition hazards.
- `ResidualDigestor`: `digest_residual_signal` converts safe garbage / world experience / reverse wish material into residual card candidates while refusing harmful or review-required reuse.
- `OsmoticPrivacyMembrane`: `can_cross_privacy_membrane` allows only consented, redacted structures to widen sharing layers; private raw data cannot enter public space.
- `DriftOptimizer`: `optimize_jelly_drift` selects cache/local/cheap-first paths where safe and avoids model calls for critical risk.
- `PolypMedusaLifecycle`: `get_lifecycle_state` matures ideas, skills, residuals, versions, and cache objects through explicit stages while freezing high-risk objects.

## Non-goals and safety boundaries

The crate intentionally does **not**:

- store raw private data;
- write to public cache;
- store or expose secrets;
- call external integrations;
- perform model calls;
- automate high-risk external actions;
- implement tokens, yield, cheating, botting, boosting, anti-cheat bypass, or unauthorized IP/persona replication.

The core returns decisions. Application layers must still enforce those decisions and route uncertain or high-risk outcomes to human review.

## Testing

Run the Rust core tests from the repository root:

```bash
cargo test
```

Run lint checks:

```bash
cargo clippy --all-targets -- -D warnings
```
