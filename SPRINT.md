# HELM — 10-Day Sprint Plan

**Target:** Navigable prototype deployed at helm.multitopup.com
**Working style:** Each day ends with a working preview URL and a commit. No partial deploys.

---

## Day 1 — Foundation

**Goal:** Project scaffolded, theme loaded, first screen renders, deployed.

**Tasks:**
- Verify environment (node, pnpm, gh, vercel CLIs authenticated)
- `gh repo create helm --private`
- `cd helm`
- Copy all files from handoff `code/` directory
- `pnpm install`
- Configure next.config.js, tsconfig.json, tailwind.config.ts per spec
- Install shadcn: `pnpm dlx shadcn@latest init` with default settings (dark theme, zinc)
- Install base shadcn components: button, card, dialog, input, select, tabs, avatar, badge, separator, tooltip, dropdown-menu, command, sheet
- Set up layout in `app/(app)/layout.tsx` with sidebar placeholder
- Create `/login` route with mock login form
- Create `/command` route with basic "Command Center" title + dark theme verification
- Set up global CSS with custom tokens (brass palette)
- Install fonts via next/font
- First commit, push to main
- `vercel link` and deploy
- `vercel domains add helm.multitopup.com`
- Report DNS instructions to Daniel

**End of day:** User can visit helm.multitopup.com, see login, log in as demo, land on a dark Command Center skeleton.

---

## Day 2 — Shell + Command Center

**Goal:** Full navigation shell + Command Center with all 6 companies, stats, activity feed, approvals.

**Tasks:**
- Build `<Sidebar>` component (branding, workspace nav, companies list with color dots + counts, user footer)
- Build `<Topbar>` component (breadcrumb, search bar with ⌘K hint, "New Company" button)
- Build `<StatsBar>` with 4 stats (active agents, shipped this week, spend MTD, needs your input)
- Build `<CompanyCard>` — the 3-column grid of company cards with metrics, budget bar, agent stack, footer stats
- Build `<ActivityFeed>` — left-side card of recent events with dots (success/warn/neutral)
- Build `<ApprovalsList>` — right-side card with approval items + approve/review/reject buttons
- Seed data: `lib/seed-data.ts` with the 6 companies from mockup
- Wire up Zustand stores with persist middleware
- Implement ⌘K command palette using shadcn Command component (opens dialog, fuzzy search across companies + actions — non-functional but interactive)

**End of day:** helm.multitopup.com/command shows the full Command Center matching the HTML mockup. Clicking on a company card navigates to `/companies/<id>`.

---

## Day 3 — Company Detail + SDD Pipeline

**Goal:** Clicking into a company shows full Company Detail view with org chart, pipeline, issues, live stream.

**Tasks:**
- Build `<CompanySidebar>` with back button, company logo/title, pill row (industry/status/teammates), org chart tree, humans list, budget widget
- Build `<OrgChart>` with tree visualization (CEO root + indented reports, avatars with status dots, model names, costs)
- Build `<SDDPipeline>` — the 7-phase horizontal pipeline with animated progress bar and phase states (done/active/pending/blocked). Use Framer Motion for the active-phase pulse and progress fill animation.
- Build `<IssuesList>` — grid of issues with code, title, status tag, assignee avatar, cost
- Build `<LiveStreamPanel>` — right-side live activity panel for this specific company, with stream items showing agent + action + time + body, plus the cost preview card at bottom
- Implement "demo mode" toggle that auto-advances pipeline phases (setInterval-based, clean teardown)
- Seed: Legacy Traders gets the fully-detailed data — 3 pipelines, 12 issues, 7 agents + Salvador

**End of day:** Clicking Legacy Traders from Command Center shows a fully-populated Company Detail with animated pipeline.

---

## Day 4 — Helm Chat + Interview Agent

**Goal:** Complete chat interface with role switcher, multimodal input UI, PRD preview card, and the Convert-to-Company flow.

**Tasks:**
- Build `<ThreadList>` sidebar (left column)
- Build `<RoleBadge>` with animated pulse dot, role name, model indicator
- Build `<MessageList>` with user/assistant message bubbles, avatar, timestamp, attachment rows, message body
- Build `<Composer>` — textarea with character count, attachment button, voice note button, image button, send button, keyboard hint (⌘↩ convert · ↩ send)
- Implement simulated token-streaming for assistant responses (use `lib/mock-interview-responses.ts`)
- Build `<PRDPreviewCard>` — the key moment. Shows auto-generated PRD with title, description, stack pills, specs grid, CTA buttons
- Build `<ContextPanel>` right-side — Interview progress checklist, Skills loaded chips, Memories used, Session cost
- Implement "Convert to Company" flow: button click → 4-second dialog with 3-stage progress → new Company seeded in store → redirect to `/companies/<newId>`
- Pre-scripted conversation: EV Station Finder (matches mockup) — Daniel's hardcoded demo scenario

**End of day:** User can open Helm Chat, go through the scripted interview, see PRD generate, click Convert to Company, and land on a new fully-functional Company Detail.

---

## Day 5 — Pipeline Detail + Issue Detail + Agent Profile

**Goal:** Drill-in views for pipelines, issues, and agents.

**Tasks:**
- `/companies/[id]/pipelines/[pipelineId]` — detailed view of a single pipeline: all 7 phases expanded, artifacts per phase (linked PRD, specs, design docs), log of handoffs, agents involved, total cost
- `/companies/[id]/issues/[issueId]` — detailed view: description, history (messages between human and agent), code diff if available, linked pipeline, current assignee with status, cost tracker, actions (reassign, approve, send back)
- `/companies/[id]/agents/[agentId]` — agent profile: persona prompt (editable textarea), skills list (with add/remove), model/provider selector, memory count (link to memory browser), cost history chart (mock), current task
- Implement navigation between these: Company Detail → click issue → Issue Detail → click assignee → Agent Profile → back

**End of day:** Complete drill-in navigation across all entities.

---

## Day 6 — Knowledge Layer + Engram Memory Browser

**Goal:** Knowledge management and memory visualization.

**Tasks:**
- `/companies/[id]/knowledge` — three tabs: Skills, Brand Guides, SOPs
  - Skills grid: cards showing skill name, category, used by N agents, last updated
  - Brand Guides: markdown editor mock (read-only display) for voice, colors, typography per company
  - SOPs: accordion list of procedures (deploy process, PR review, hiring, etc.)
- `/companies/[id]/memory` — Engram Memory Browser
  - Force-directed graph using D3 or Recharts: nodes = memories, edges = relationships (same tag, same decision thread, same agent)
  - Sidebar: filter by type (decision/bug/architecture/learning), tag, agent
  - Click node → memory detail panel shows title, content, saved by, tags, linked memories
- Seed 15-25 memories for Legacy Traders with interconnections

**End of day:** Salvador can see what the system "remembers" — the dent feature beyond Paperclip.

---

## Day 7 — Mobile Approval View + Responsive

**Goal:** The "CEO from the bleachers" experience.

**Tasks:**
- `/approvals/[id]` route — mobile-optimized by default (desktop shows a centered phone-sized card)
- Build `<ApprovalCardMobile>` matching mockup: notification pill, approval card with requester, diff preview, impact grid, 3 action buttons
- Implement approve/review/reject flows with Framer Motion swipe gestures (Framer Motion's drag helpers)
- Build the "Send back with voice note" flow: button → dialog with waveform visualizer (mock, just CSS bars that animate) → "Voice captured" confirmation → routed back to the agent
- Test on actual iPhone Safari (Daniel should verify)

**End of day:** Daniel opens helm.multitopup.com/approvals/XYZ on his iPhone and it feels like a real mobile app.

---

## Day 8 — Guided Tours + Polish

**Goal:** Four tours working + animation polish + microinteractions.

**Tasks:**
- Install driver.js
- Implement `<TourProvider>` that manages tour state
- Write 4 tour definitions in `components/tour/tours.ts`:
  1. `welcome` — 6 steps on Command Center
  2. `idea-to-company` — 8 steps across Chat → PRD → Convert
  3. `pipeline-live` — 5 steps on Legacy Traders pipeline
  4. `mobile-approval` — 4 steps with viewport auto-resize to mobile
- Topbar "Take a tour" dropdown
- First-time user toast ("Hey Daniel, want a quick tour?") on first login
- Animation polish pass: stagger list animations, smooth page transitions, loading skeletons for simulated async
- Microinteractions: hover states on all interactive elements, subtle shadow lifts, focus rings in brass

**End of day:** Product explains itself. Salvador can take the tours solo.

---

## Day 9 — QA + Cross-browser + Bug fixes

**Goal:** Zero visible bugs, tested in Chrome/Safari/Firefox + iPhone.

**Tasks:**
- Full click-through in each browser
- Fix hydration warnings
- Verify keyboard navigation (Tab through forms, Enter to submit)
- Verify reduced-motion respected
- Lighthouse audit — fix issues below 90
- Test with slow 3G throttle (Vercel handles most)
- Dark mode verified on all screens
- iPhone Safari test by Daniel (he sends feedback, we iterate)

**End of day:** Production-quality prototype.

---

## Day 10 — Documentation + Walkthrough

**Goal:** Ship-ready, Salvador-ready.

**Tasks:**
- Write comprehensive README.md:
  - What is Helm
  - Tech stack
  - How to run locally (pnpm install, pnpm dev)
  - How to deploy (Vercel auto from main)
  - Project structure overview
  - Where to find seed data
  - How to add a new screen
  - License (MIT for now, can change)
- Write CONTRIBUTING.md (for Salvador)
- Record walkthrough video (Claude Code writes the script, Daniel records on his side using Loom/QuickTime)
- Write handoff email draft for Daniel to send Salvador with link + tour recommendation
- Final commit with version tag `v0.1.0-prototype`

**End of day:** Send-to-Salvador package complete. Daniel invites him. We wait for feedback.

---

## Rules of engagement

- **End each day with a deploy.** No "I'll finish tomorrow" partial work.
- **If a task takes >2x estimate, stop and ask.** Don't silent-rework.
- **Commit messages describe user-visible changes**, not internals. Good: "feat: Command Center — companies grid with animated budget bars". Bad: "refactor: extract useBudget hook".
- **No new dependencies without justification.** If tempted to add a library, ask: can Tailwind + shadcn + Framer Motion do this?
- **The mockup at /spec/mockup-reference.html is the north star.** Deviate only with reason.

---

*Good luck. You've got this.*
