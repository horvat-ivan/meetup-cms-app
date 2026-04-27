---
description: Interrogate the technical approach via grill-me and write a Software Design Document at docs/sdd/<slug>.md
---

You are about to help the user write a Software Design Document.

Workflow:
1. Read the active app seed issue (most recently created `seed`-labeled issue in this repo).
2. Read the linked PRD from the issue body.
3. Run the **grill-me** skill in tech-flavor — walk every branch (data model, API, validation, auth, errors, perf, concurrency, migrations, deployment, observability, testing).
4. As decisions are made, write them to `docs/sdd/<YYYY-MM-DD>-<slug>.md`.
5. The SDD becomes the contract for the FE/BE sub-issue split.

User input: $ARGUMENTS
