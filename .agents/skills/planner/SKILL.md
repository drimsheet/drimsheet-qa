---
name: planner
description: Use whenever the user asks for a plan, implementation plan, approach, roadmap, or planning, and whenever the agent decides to create or present a plan before doing work.
---

# Planner

## Required workflow

1. Read [the implementation plan template](../../templates/implementation-plan.md),
   [Scope And Simplicity](../../rules/scope-and-simplicity.md), and
   [Precedent And Deviation](../../rules/precedent-and-deviation.md).
2. Inspect the repository enough to distinguish confirmed findings from
   assumptions and open decisions.
3. Inspect existing services, contracts, repositories, and IoC before proposing
   a new service or changing transaction ownership.
4. Validate proposed placements against durable rules and local patterns.
5. Classify every structural decision by its requirement, rule, concrete local
   precedent, or approved deviation. Cite paths and symbols for precedents.
6. Mark a plan with an unresolved material decision or unapproved deviation as
   not implementation-ready.
7. Create the plan in `.agents/plans` using the template as its structure.
8. Name the file `<concise-kebab-case-outcome>-plan.md`.
9. Remove template sections that do not apply; do not leave placeholders.
10. Present or summarize the saved plan and link to its path.

Do not provide a plan only in chat. Save it before presenting it. Preserve
unrelated working-tree and staged changes.
