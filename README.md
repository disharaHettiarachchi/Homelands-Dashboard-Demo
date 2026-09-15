# Homelands leadership dashboard demo

A portable static dashboard for presenting sales-agent performance and supervisor ownership. All records are deterministic, fictional demonstration data. No actual recordings, transcripts, customer details or API credentials are included.

Open `dist/index.html` in a modern browser, or serve the `dist` directory with any static HTTP server. JavaScript and styles are local; Google Fonts are optional and have system-font fallbacks. No build or API subscription is needed.

## Demonstration flow

1. Start at Overview: quality, call volume, approved greeting and sentiment change.
2. Select a supervisor to filter every metric. Compare 7, 14 and 28-day periods.
3. Open Supervisor teams, then explore a team's agents.
4. Select an agent to see their 11-criterion scorecard, evidence coverage and recent calls.
5. Open a call to see its greeting check, illustrative transcript, sentiment and score breakdown.
6. Open Coaching, prepare a supervisor-owned plan, save it and mark it complete. Plans stay in this browser only.
7. Export the current agent summary as CSV for a presentation handout.

The dataset covers 19 July–12 September 2026; the reporting end date is fixed for reproducible demos. The call dates display in Asia/Colombo. Period boundaries use UTC midnight consistently.

## Metric definitions

- **QA:** sum of earned points / sum of assessed point caps, across fully evaluated calls only. A call awaiting review has no overall score and is excluded from team/agent QA.
- **Evidence coverage:** assessed point caps / eligible point caps across all selected calls. N/A is excluded from eligible points. Missing evidence is not a zero.
- **Opening:** approved openings / verifiable openings. Approved means the greeting and company identification appear in the first agent turn.
- **Sentiment improved:** calls whose closing ordinal sentiment exceeds opening sentiment / all selected calls. This is a simulated AI estimate, not a CSAT survey.
- **Quality change:** current QA minus the immediately preceding equal-length period, in percentage points.
- **Coaching:** the most frequent criterion below two-thirds of its cap for each agent, considering fully evaluated calls with applicable/scored criteria only. Saved plans are local demo state.

The supplied rubric's 11 names and maximum of 38 points are retained. Partial-credit anchors and 85%/75% demo performance bands are not official Homelands policy. Team averages are weighted by assessed points. The CSV identifies itself as fictional data.

## Production integration boundary

This demo does not change the existing n8n workflows. For production on Google Cloud, serve these static assets from the chosen frontend host and replace `data.js` with authenticated API responses. Keep the hierarchy `supervisor.id -> agent.supervisorId -> call.agentId`; map evaluation criteria using the existing rubric IDs. Implement access enforcement server-side, durable coaching records, paginated calls, agreed retention, authorised recording URLs, and an auditable human-review process. Do not expose model keys to this frontend.

The application is a leadership presentation view; selecting a supervisor is a filter, not an access-control boundary. No calls are sent to Kie.ai or any other model by this demo.
