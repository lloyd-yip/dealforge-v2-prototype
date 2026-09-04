# Fixtures

Fake data the prototype runs on. **These files are the API contract.** If the production
backend returns these shapes, the V2 frontend works without modification.

```
jobs/           one file per sample prospect — the GET /api/jobs/:id payload
case-studies/   the case-study library — NEW in V2, see ../docs/data-contract.md
```

## Rules

- **No real client numbers without Lloyd's explicit approval.** Placeholder records are
  clearly marked `"placeholder": true`. Real data changes the hosting decision for this repo.
- Keep them realistic in *shape* even when the values are invented — a fixture with the wrong
  shape teaches the backend the wrong thing.
- Writes (overrides, regenerate, reveal) are faked in memory by the fetch shim. They look
  like they persist for the session and reset on reload. That is intentional.
