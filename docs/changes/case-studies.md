# Case Studies tab — REMOVED

## What changed
The standalone `case-studies` tab is removed from the portal. Case studies are integrated
into the four tabs where they carry the story instead: Lead List, Calendar Invite,
Webinar Experience, ROI Model.

## Why
Alex, 2026-09-04 meeting at 1:02:02: *"we can kick out this thing, by the way. No value."*
And at 34:21: *"Case studies is not for the section at the end. You speak about the case study
in your TAM, you speak about the case study in your outreach, you speak about the case study
in your presentation... That's how you use a case study. Not in a separate section at the end."*

Lloyd confirmed the removal 2026-09-04: integrate into each tab in the way that fits the
flow of the story.

## What the backend needs
`GET /api/case-studies` and `GET /api/case-studies?match=:jobId` — see `../data-contract.md`.
The tab going away does not remove the need for the library; it moves where it surfaces.

## Open questions
Where the library gets **managed** now the tab is gone. Options: the rep dashboard, the
settings page, or no UI at all (records edited directly). Not urgent — the prototype reads
`fixtures/case-studies/library.json` and needs no management UI to demonstrate the four tabs.
