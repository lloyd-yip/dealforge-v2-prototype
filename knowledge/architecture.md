---
tags: [architecture, stack, conventions, portal, fixtures]
last_updated: 2026-09-04
---
# Architecture — Core Facts

## Stack
Static HTML/CSS/vanilla JS. No framework, no build step, no package manager, no backend.
Served by any static file server. Data comes from JSON files in `fixtures/`.

## The portal is one enormous file
`app/portal.html` is ~407KB / 6,600+ lines, forked from V1's `mockup-portal.html`.
Markup, styles and all logic are in that one file. That is how V1 is built; keeping it
that way means Geri reads a diff instead of reconciling two architectures.

## Tab slugs (V1, unchanged)
`how-it-works · lead-list · calendar-invite · webinar-experience · onboarding · roi-model ·
case-studies · prospect-info`

V1 routes them as `/<jobId>/<tab-slug>`; the prototype resolves the slug from the URL hash
or query instead, since there is no server to route.

## Two things V1 does server-side that the prototype must fake
1. **`{{ROI_SEED_JSON}}`** — V1's `server.js` injects the ROI calculator's starting values
   into the HTML before serving, so saved numbers appear on first paint instead of flashing
   defaults. The prototype substitutes a fixture value at the same spot.
2. **`/api/*` calls** — 26 fetch call sites. A shim intercepts `window.fetch` and serves
   from `fixtures/`. Writes are merged into an in-memory copy so edits look like they
   persist for the session, and reset on reload.

## Never
No requests to production DealForge, Supabase, Apollo, Anthropic, Fireflies or GHL.
This repo has no credentials and must never acquire any.
