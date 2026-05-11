# RFC 0003: Context Compiler

## Summary

Define a Context Compiler that turns scattered project context into a minimal, safe, task-specific packet for humans or AI tools.

## Motivation

Large context dumps create privacy risk, cost, and confusion. Jellyfish needs small context packets with explicit scope and safety boundaries.

## Proposal

A compiled context packet should include:

- task goal
- relevant files or docs
- known constraints
- accepted terminology
- safety and privacy notes
- required checks
- excluded private data

## Safety and Privacy

The compiler must default to redaction, avoid secrets, and separate private source material from shareable structure.

## Benchmark / Verification

Benchmarks should measure whether the packet is sufficient for the task while excluding private or irrelevant material.

## Open Questions

- How should context packets expire?
- How should compiled context cite source materials?
