# DealForge V2 Prototype — Claude Code Context

## Always-Load Context

@project-control/project_state.json
@knowledge/architecture.md

---

## What This Is

A frontend-only prototype of DealForge V2. Static HTML, fixture-driven, no backend.
Built so Lloyd can see and judge V2 changes before they're built, and so Geri
(Gergo Nagy) gets a precise target to build against in production DealForge.

Production DealForge: `accounting-qs/dealforge`, live on Render, Supabase `lcryrllxityssyamcvst`.

## Hard Rules

1. **Never call the production API.** No requests to any `onrender.com` host, no Supabase,
   no Apollo/Anthropic/Fireflies/GHL keys. All data comes from `fixtures/`.
2. **No backend.** If something appears to need a server, fake it in the fetch shim
   and write down what the real backend must do in `docs/changes/<tab>.md`.
3. **Fork, don't rewrite.** V1 markup and styles stay unless a change requires otherwise,
   so Geri reads the diff instead of reconciling two designs.
4. **Every UI change gets a note.** A change with no entry in `docs/changes/` is
   invisible at handoff time and will not get built.
5. **No real client data in fixtures** unless Lloyd has explicitly approved it — the repo
   holds case-study numbers and client names, and hosting decisions may change.

## Stack

Static HTML/CSS/vanilla JS. No framework, no build step, no package manager.
The V1 portal is one large self-contained HTML file; that stays true here.
