# RFC 0002: Push Flow Router

## Summary

Define a router for deciding when Jellyfish should surface a prompt, review request, benchmark, or crystal suggestion to a contributor.

## Motivation

Open co-creation needs useful routing without spam, manipulation, or gambling mechanics.

## Proposal

The router should consider:

- contributor intent
- residual type
- safety risk
- privacy layer
- urgency
- review load
- benchmark value

## Safety and Privacy

No private raw data should be pushed into public spaces. High-risk prompts require human review. The router must not optimize for addictive engagement.

## Benchmark / Verification

Benchmark scenarios should test whether high-risk or private items are withheld from public routing.

## Open Questions

- How should contributors control notification frequency?
- How should the router explain why an item was suggested?
