# DealForge V2 — Prototype

A **frontend-only** prototype of DealForge V2. No backend, no database, no API keys, no infra.
It runs as static files and reads fake data from `fixtures/`.

**It is not a working app and is not meant to become one.** It exists to do two things:

1. Let Lloyd *see* a V2 change and say yes or no, fast, before anyone builds it.
2. Hand Geri a precise target — working screens plus the exact data shape they need to return.

Production DealForge lives at [accounting-qs/dealforge](https://github.com/accounting-qs/dealforge)
(live on Render). **Nothing here touches it.** This repo never calls the real API, never
writes to Supabase, never spends Apollo or Anthropic credits.

## Run it

```bash
cd app && python3 -m http.server 8080
```
Then open http://localhost:8080/portal.html

## What's in here

| Folder | What it holds |
|---|---|
| `app/` | The prototype frontend. Forked from V1 so changes read as a diff, not a rewrite. |
| `fixtures/` | Fake data the prototype runs on. **This is the API contract** — the shape the real backend has to return. |
| `docs/changes/` | One file per tab: what changed vs V1, why, and what the backend needs for it. |
| `docs/data-contract.md` | The endpoint + payload surface, in one place. Geri's starting point. |
| `reference/` | Source material — the meeting the requests came from, formulas, design references. |
| `parity/` | Which V1 commit this was forked from, plus before/after screenshots. |
| `project-control/` | Project state. |
| `knowledge/` | Behavioural facts discovered while building. |

## Handing it over

`docs/handoff-to-geri.md` is the one document to read first. Everything else supports it.
