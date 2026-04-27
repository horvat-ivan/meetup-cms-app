---
name: to-issues
description: Split the active app seed issue into FE/BE sub-issues based on the SDD. Each gets labels feature:<slug>, role:app, and area:fe or area:be. Use when user says "/split-issue".
disable-model-invocation: true
---

# Split App Seed → FE/BE Sub-Issues

You are in the **app** repo. The user has a seed issue open (auto-created by dispatch) and an SDD written. Split the work.

## Sub-issue characteristics

Each sub-issue should:
- Be **vertically sliced** for FE (one user-visible outcome).
- Be **horizontally sliced** for BE (one endpoint, one job, one schema change).
- Be **independently testable**.
- Have an explicit `area:fe` OR `area:be` label.

## Required labels

Every sub-issue MUST have:
- `feature:<slug>` (same as seed)
- `role:app`
- `area:fe` OR `area:be` (exactly one)
- `feature` (bare, for project)

## Required body

```markdown
## Context
Sub-task of the app seed: meetup-cms-app#<seed-number>
SDD: docs/sdd/<slug>.md
Feature: meetup-cms-product PRD <link>

## Acceptance Criteria
- <specific, testable behavior>

## Technical Notes
- <data model, API contract, perf budget — referenced from SDD>
```

## Process

1. Read the seed issue (`gh issue view <number>`).
2. Read the SDD (`docs/sdd/<slug>.md`).
3. Propose sub-issues, separating FE from BE:
   - BE first (data model + API + jobs).
   - FE second (UI components, state mgmt, screen wiring).
4. Show the user the proposed split.
5. For each accepted sub-issue:
   ```bash
   AREA_LABEL="area:fe"  # or area:be
   ISSUE_URL=$(gh issue create \
     --repo horvat-ivan/meetup-cms-app \
     --title "[$AREA_LABEL] <title>" \
     --body "<body>" \
     --label "feature:<slug>,role:app,$AREA_LABEL,feature")
   gh project item-add 1 --owner horvat-ivan --url "$ISSUE_URL"
   ```
6. Comment on the seed listing the sub-issues.
7. Report back to user.

## What you NEVER do

- Create sub-issues in design or product.
- Create a sub-issue without `area:fe` or `area:be`.
- Skip the project board add.
