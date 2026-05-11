# RFC 0001: Memory Crystal

## Summary

Define a Memory Crystal as a reusable, reviewed structure distilled from repeated interactions, failures, or benchmark scenarios.

## Motivation

Jellyfish should not cache raw private memories. It should preserve redacted structure: problem pattern, answer program, verifier, failure boundary, provenance, and consent state.

## Proposal

A Memory Crystal contains:

- semantic signature
- residual pattern
- answer program
- verifier
- failure cases
- provenance
- privacy layer
- review status

## Safety and Privacy

Raw data stays private. Public crystals must be redacted, reviewed, attributed, and safe for reuse.

## Benchmark / Verification

A crystal should include at least one synthetic or redacted benchmark scenario and an expected pass/fail criterion.

## Open Questions

- What is the minimum evidence needed before public promotion?
- How should consent withdrawal affect derived crystals?
