# Data Contract

What the V2 frontend asks for. Fixtures in `fixtures/` are live examples of every shape below.

## Endpoints V1 already has (the prototype fakes these)

Harvested from the V1 portal's own fetch calls — this is the existing surface, not a proposal.

| Method | Path | Used for |
|---|---|---|
| GET | `/api/jobs/:id` | The whole job. Every tab reads from this. |
| POST | `/api/jobs/:id/overrides` | Save a rep's manual edit to any generated field. |
| POST | `/api/jobs/:id/regenerate` | Re-run generation for the job. |
| POST | `/api/jobs/:id/regenerate/webinar-titles` | Re-run just the titles. |
| POST | `/api/jobs/:id/rerun-tam` | Re-run the TAM estimate. |
| POST | `/api/jobs/:id/rerun-apollo` | Re-run the Apollo lead search. |
| POST | `/api/jobs/:id/leads/reveal` | Reveal contact details on a lead (costs credits). |
| GET/POST | `/api/jobs/:id/prospect-info` | Read/write the prospect brief. |
| POST | `/api/jobs/:id/icp` | Update the ICP filters. |
| POST | `/api/jobs/:id/rep` | Assign the sales rep. |
| POST | `/api/jobs/:id/upload-asset` | Upload an image asset. |
| POST | `/api/jobs/:id/rescan-brand-colors` | Re-scrape the prospect's brand colours. |
| GET | `/api/sales-reps` | Rep list. |
| GET | `/api/portal-data?session=` | Prospect-facing session read. |
| GET | `/api/apollo/suggest?type=&q=` | Typeahead for ICP filter values. |

## NEW for V2 — the case-study library

The one genuinely new thing V2 needs. Everything else is UI on top of data that already exists.

The feature is: on Lead List, Calendar Invite, Webinar Experience and ROI Model, the rep can
show a real past client's version of that same asset next to the prospect's.

That only works if DealForge **stores past clients' real artifacts**. Today it stores generated
assets for the current prospect only. There is no library.

```
GET /api/case-studies                  → the whole library (list)
GET /api/case-studies?match=:jobId     → the 3 auto-matched for this job
```

Per record — see `fixtures/case-studies/` for concrete examples:

| Field | Why it exists |
|---|---|
| `id`, `client_name` | Identity. |
| `tam`, `offering`, `business_model` | The three axes the auto-match runs on. |
| `metrics` — invite volume, show rate, close rate, LTV, clients/month, outcome | Shown on every tab; drives the ROI comparison. |
| `artifacts.lead_list` | Their actual lead list, to swap into the Lead List tab. |
| `artifacts.calendar_invite` | Their actual invite copy — headline + description. |
| `artifacts.webinar_recording_url` | Link to their real webinar recording. |
| `artifacts.roi_inputs` | Their real ROI inputs, so the comparison is real numbers not a re-render. |

**Auto-match rule** (from the source meeting): three slots — one client with a similar TAM,
one with a similar offering, one with a similar business model. Rep can override any slot.

**The honest cost:** this is mostly a data-collection problem, not a coding one. Someone has to
fill the library with real client artifacts and verified numbers before the feature means anything.
