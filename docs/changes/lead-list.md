# Lead List — case-study match modal

## What changed
The tab itself is unchanged. One line was added under the TAM number:
"› Two clients with a market like yours". Clicking it opens a modal showing two
clients — one matched on market, one matched on offer — each with their TAM
against the prospect's, and what they got.

Nothing else on the tab moves. The stats, ICP parameters and lead table are as they were.

## Why
Alex, 2026-09-04 at 1:05:04: *"in lead list I just want probably the AI to give you three
names. Just say who had a similar... I want to have the names with a similar tam."*
And at 1:05:50: *"I want the names of the case studies where the similar TAM and their...
and the results they had. I just want to basically say: and by the way, case studies had
the same TAM as you and they achieved X, Y, Z by doing it."*

The tab exists to make that sentence sayable. At 55:46 he demonstrates the motion itself:
*"you're in the lead list. And you mentioned, by the way, we have those three clients who
have the same TAM as you. They achieved those results."*

Two cards not three: Lloyd's call, 2026-09-05. Ryan at 1:06:15 argued matching on TAM alone
is wrong and offer matters too; Alex conceded at 1:07:33 that he picks one per axis.

Lloyd, 2026-09-05, on the form it should take: a pop-up, primary tab unchanged, written in
natural language rather than a data table.

## What the backend needs
`GET /api/jobs/:id/case-study-matches` returning two matches. Shape in
`fixtures/case-studies/matched-demo-prospect.json`.

Per match: axis (market|offer), axis_label, client_name, company, serves, narrative,
tam_line, their_tam, result, result_headline, testimonial, source.

`narrative`, `tam_line` and `result` are written prose, not templated strings — a rep
reads them aloud. Generating them is a Claude call over the case-study record plus the
prospect's ICP, not string interpolation.

**Matching rule:** market axis matches on industries + buyer titles; offer axis matches on
offer type. Alex uses one per axis. DealForge picks; the rep does not choose.

## NOT built, and why
Ryan at 1:06:43 asked for a swap button — *"This is what Cedric's looked like... these were
their lead lists. This is your lead list."* The TAM half of that is live in this modal.
The lead-list half is not, because **no client's lead list is stored anywhere** — not in
their Drive folder, not in the workbooks, and the Apollo targeting sections of the Nextgen
workbooks are unfilled template. Building the button would mean inventing a list of
companies and attributing it to a real client.

To make it real, DealForge would need to retain the generated lead list per client.

## Open questions
Neither client shown has a recorded video testimonial. Both are on the record-these list.
The modal footer says so honestly. Cedric has a video but is a weaker market match for
this prospect.
