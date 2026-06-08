# How to run

## Prerequisites

- Node.js
- npm

## Installation

- npm install

## Run Development Server

- npm run dev

The application will start locally at http://localhost:3000/

## Build for Production

- npm run build

## Preview Production Build

- npm run preview

# Part A — Product & UX Thinking

## Brief interpretation

The core information in the brief is that **developers and admins look at the same VMs fleet with different purposes**: a developer cares about _"are my machines up, and can I get to work,"_ while an admin cares about _"is the fleet healthy, efficient, and within budget."_ Rather than building one VM table and reskinning it per role, I treated this as two distinct products sharing a domain model — same `VM`/`VMTemplate`/`User` types and the same mock data layer, but different navigation, layouts, and visuals.

That distinction starts at login: single `LoginPage` authenticates against the mock `User` list, and the user's `role` (`"engineer"` | `"admin"`) drives which dashboard they land on (routes are private and dependant on the role). From there the two experiences never cross paths.

## Information architecture

**Engineer console (`/dev`)** — single-surface, list-first:

- **My VMs**: one searchable table of _only the developer's own_ VMs (filtered server-side by `ownerId`), each row showing status, template, live CPU/memory/disk utilization, region, and cost, plus a per-row actions menu (Connect, Start/Stop/Restart, VM details).
- No tabs, no fleet-wide information, keeping it simple. An engineer's job is to find appropriate machine and start working - so everything is one click away from the row itself rather than behind a separate and complicated detail page.

**Admin console (`/admin`)** — tabbed, dense, fleet-scoped:

- **Fleet overview** — statistics (total/running/stopped VMs, users, aggregate CPU/memory utilization, total cost) plus status breakdown, derived in `useFleetOverview` from `useAllVMs` + `useAllUsers`.
- **VM inventory** — every VM in the org, searchable and filterable (by name/owner/region), with owner, template, status, and per-VM utilization bars; idle/underused VMs are surfaced via status chips.
- **Fleet utilization** — aggregate CPU/memory chart trend over time plus a ranked "hottest / most idle" VM list, so an admin can answer "is the infra healthy" _and_ "where's the waste" from one tab.
- **Templates** — CRUD over `VMTemplate` (name, base image, vCPU, memory, disk), via a modal form backed by create/update mock mutations.

Both routes share a `DashboardHeader` (route-aware heading + role badge + the dark/light mode switch), but there's intentional variation: the engineer view reads like a lightweight ops console; the admin view reads like a management instrument panel - tabs, filters, and trend charts for someone responsible for infrastructure.

## Key flows I prioritized, and why

1. **Lifecycle controls with transition states.** Start/Stop/Restart aren't instant in real infrastructure, so the mock service walks the VM through `stopping → starting → running`, each phase held longer than the table's refetch interval.
2. **Connect, front and center.** The brief frames the developer's job as "use my environment from the browser," so Connect is the first action in the row menu, it opens a mock `vscode-server`-style session URL - the shortest path from dashboard to starting work.
3. **VM detail as a lightweight modal, not a separate page.** Specs, uptime, current load, and a usage-over-time chart (CPU + memory) live in a modal reachable from the same row — keeping the engineer in the list (their primary context) rather than navigating away from it.
4. **Idle/hot-spot visibility accent for admins.** Aggregate numbers and charts alone don't tell an admin where to act, so the dashboard flags idle VMs and the utilization tab ranks the hottest and most idle machines — it helps highlight "which 3 VMs should I look at first."
5. **Every view handles loading / empty / error / in-progress.** The mock backend intentionally simulates latency and ~10% random failure, and every data-driven panel renders skeleton, empty, and error states.

## Notable decisions & trade-offs

- **Polling over WebSockets** (user's VMs state refetches every 5s) - a pragmatic stand-in for the "real-time updates" stretch goal that's trivial to swap for a websockets later without touching components, since everything already flows through TanStack Query hooks.
- **Dark mode by default, light mode as a considered second theme** - Engineering teams spend hours in IDEs and terminals and often prefer consistent dark-mode experience that limits eye strain in low-light environments, but for some people light mode performs better for readability, so the solution was to offer a toggle.
- **One mock data layer, two consumption patterns** — `getUserVms`/`getVMs` both read from the same in-memory array, so the two dashboards are guaranteed to stay consistent with each other (an admin stopping a VM and an engineer seeing it stop are the same source of truth), which mirrors a real backend.

## What I'd do with more time

- **Policies & quotas** (max VMs/user, idle auto-stop) — the data shape exists in the brief; I prioritized making the two core experiences feel complete over adding another admin layer.
- **Per-VM activity/usage logs** — would pair naturally with the work already in place.
- **Real-time updates via simulated WebSocket** — the polling groundwork is there; swapping it for a subscription-based hook would be a contained change.
- **User sessions** - mock JWT workflow.
- **Mobile UI** - currently some tables aren't mobile-friendly, they can be switched to different elements to represent data for mobile users.
