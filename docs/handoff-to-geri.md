# Handoff — DealForge V2 Prototype → Production

**Read this first.** Everything else in `docs/` supports it.

## What this repo is

A clickable prototype of V2. It is a **specification in the form of working screens**,
not code to merge. Take the behaviour and the data shape; write the implementation
the way it should be written in production.

## How to read it

1. **Run it.** `cd app && python3 -m http.server 8080` → http://localhost:8080/portal.html
2. **Read `docs/changes/`.** One file per tab. Each says what changed vs V1, why the
   change was asked for (with a source), and what the backend has to provide.
3. **Read `docs/data-contract.md`.** The endpoints and payloads V2 needs. Anything new
   is marked NEW.
4. **Look at `fixtures/`.** Those files are what the frontend actually eats. If your API
   returns that shape, the frontend works unmodified.

## What was deliberately left out

- **No chat/conversational interface.** It was requested but scoped out — it's a separate
  product, not a DealForge feature. See `reference/meeting-2026-09-04.md`.
- **No auth, no persistence.** Edits in the prototype live in memory and vanish on reload.
- **No real generation.** Every AI output is a canned fixture.

## Forked from

See `parity/V1-BASELINE.txt` for the exact V1 commit this started from.
