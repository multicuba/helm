# HELM — Technical Specification v0.1
## Prototype Phase

**Last updated:** 2026-04-18
**Status:** Ready for build
**Target:** Navigable Next.js prototype deployed at helm.multitopup.com

---

## 1. Vision

Helm is an operator console for founders running multiple companies with hybrid human+AI teams. It unifies org charts, pipelines, agent activity, approvals, and memory into a single dashboard. The founder thinks; the agents execute; Helm coordinates.

This prototype is a **navigable mockup** — no real AI, no real backend. The goal: let Daniel and Salvador click through the complete UX in 20 minutes and confirm the product vision before we invest in infrastructure.

---

## 2. Aesthetic

**Theme:** Dark warm, brass-accented. Editorial-serif display, clean sans UI, monospace for data.

**Fonts (already loaded via next/font):**
- **Fraunces** — display, italic for emphasis
- **Inter Tight** — UI body
- **JetBrains Mono** — metadata, IDs, technical

**Color tokens (Tailwind CSS variables):**

```css
--bg-deep: #0c0a08;
--bg-page: #110f0c;
--bg-surface: #1a1713;
--bg-surface-2: #221e18;
--bg-elevated: #2a241d;
--border-subtle: #2a241d;
--border-strong: #3a3228;
--text-primary: #f5efe4;
--text-secondary: #a89f91;
--text-tertiary: #6b6358;
--text-dim: #4a433a;
--brass: #c89b5e;
--brass-bright: #e5b87a;
--brass-muted: #8a6d43;
--brass-deep: #3d2f1c;
--teal: #4a7a82;
--success: #7ba05b;
--warning: #d4a23e;
--danger: #c26b55;
```

**Reference implementation:** `/spec/mockup-reference.html` (the HTML mockup Daniel approved). Port the aesthetic faithfully. Component styling in React/Tailwind must match.

---

## 3. Stack

| Layer | Choice | Version | Rationale |
|---|---|---|---|
| Framework | Next.js | 15 (App Router) | RSC + streaming, matches prod stack |
| Language | TypeScript | strict | Type safety from day one |
| Styling | Tailwind CSS | 4 | Atomic, matches shadcn |
| Components | shadcn/ui | latest | Customizable primitives, no lock-in |
| State | Zustand | latest | Simple, localStorage-backed |
| URL state | nuqs | latest | Deep-linkable views |
| Animations | Framer Motion | latest | Pipeline, approvals, tours |
| Forms | React Hook Form + Zod | latest | Type-safe validation |
| Icons | Lucide React | latest | Matches mockup |
| Fonts | next/font (Google) | — | Optimized loading |
| Date/time | date-fns | latest | Lightweight |
| Tours | driver.js | latest | Declarative guided tours |
| Charts (later) | Recharts | latest | Only if dashboard stats need real charts |

**Package manager:** pnpm (Daniel has 10.33.0)
**Node:** v20+ (Daniel has v25.8.2 — monitor for compat issues)
**Deploy:** Vercel (free tier sufficient for prototype)
**DNS:** Cloudflare (existing on multitopup.com) → CNAME `helm` → `cname.vercel-dns.com`

---

## 4. Routing structure (Next.js App Router)

```
app/
├── (marketing)/
│   └── login/                    # Mock login screen
├── (app)/
│   ├── layout.tsx                # Shell with sidebar + topbar
│   ├── command/                  # Command Center (home)
│   │   └── page.tsx
│   ├── chat/
│   │   └── [threadId]/           # Helm Chat with role switcher
│   │       └── page.tsx
│   ├── companies/
│   │   └── [companyId]/
│   │       ├── page.tsx          # Overview (pipelines, issues)
│   │       ├── pipelines/
│   │       │   └── [pipelineId]/
│   │       │       └── page.tsx
│   │       ├── issues/
│   │       │   └── [issueId]/
│   │       │       └── page.tsx
│   │       ├── agents/
│   │       │   └── [agentId]/
│   │       │       └── page.tsx
│   │       ├── knowledge/
│   │       │   └── page.tsx      # Skills, brand guides, SOPs
│   │       ├── memory/
│   │       │   └── page.tsx      # Engram memory browser
│   │       └── settings/
│   │           └── page.tsx
│   ├── approvals/
│   │   └── [approvalId]/         # Mobile-optimized
│   │       └── page.tsx
│   ├── activity/                 # Global activity feed
│   │   └── page.tsx
│   └── settings/                 # Workspace settings
│       └── page.tsx
```

**Route-level rule:** Every route is a server component by default; mark `'use client'` only when interactivity requires (forms, animations, state).

---

## 5. State management

### Zustand stores

**`useWorkspaceStore`** — Current user, current workspace, theme prefs
**`useCompaniesStore`** — Array of companies with their full nested data (agents, pipelines, issues, memories)
**`useChatStore`** — Threads and messages for Helm Chat
**`useApprovalsStore`** — Pending approvals
**`useTourStore`** — Active tour state, which tour, current step
**`useActivityStore`** — Rolling activity feed (cross-company)

All stores use `zustand/middleware/persist` with localStorage.

### Seed data

On first load (`localStorage` empty), seed with:
- 1 user (Daniel Torres)
- 6 companies matching mockup: Legacy Traders, Multi Topup, MH Home Solutions, Flagler Beach BNB, Charge2Go, Minari Solutions
- Each company: 3-7 agents, 2-12 issues, 1-3 pipelines
- Legacy Traders gets the most detail (it's the pilot per Daniel's decision)
- 4 pending approvals of mixed types
- ~30 activity feed entries spanning past 24h

Seed file: `lib/seed-data.ts`

---

## 6. Component architecture

```
components/
├── ui/                 # shadcn primitives (button, card, dialog, etc.)
├── shell/
│   ├── AppShell.tsx    # Sidebar + topbar wrapper
│   ├── Sidebar.tsx
│   ├── Topbar.tsx
│   └── CommandPalette.tsx  # ⌘K
├── command-center/
│   ├── CompanyCard.tsx
│   ├── StatsBar.tsx
│   ├── ActivityFeed.tsx
│   └── ApprovalsList.tsx
├── chat/
│   ├── ThreadList.tsx
│   ├── MessageList.tsx
│   ├── RoleBadge.tsx
│   ├── ContextPanel.tsx
│   ├── Composer.tsx
│   └── PRDPreviewCard.tsx
├── company/
│   ├── OrgChart.tsx
│   ├── SDDPipeline.tsx
│   ├── IssuesList.tsx
│   ├── LiveStreamPanel.tsx
│   └── CompanyHeader.tsx
├── approval/
│   ├── ApprovalCardMobile.tsx
│   ├── DiffPreview.tsx
│   └── ImpactGrid.tsx
├── knowledge/
│   ├── SkillsGrid.tsx
│   ├── BrandGuideEditor.tsx
│   └── SOPBrowser.tsx
├── memory/
│   └── EngramGraph.tsx # Force-directed memory graph
└── tour/
    ├── TourProvider.tsx
    └── tours.ts         # Tour definitions
```

---

## 7. Data model (TypeScript types)

```typescript
// lib/types.ts

export type CompanyId = string;
export type AgentId = string;
export type IssueId = string;
export type PipelineId = string;

export interface Company {
  id: CompanyId;
  name: string;
  slug: string;
  colorHex: string;
  industry: string;
  status: 'active' | 'attention' | 'paused';
  monthlyBudget: number;
  monthlySpendMtd: number;
  humanTeammates: Human[];
  agents: Agent[];
  pipelines: Pipeline[];
  issues: Issue[];
  memories: Memory[];
  brandGuide?: string;
  sops: SOP[];
}

export interface Agent {
  id: AgentId;
  role: 'CEO' | 'Frontend' | 'Backend' | 'DevOps' | 'QA' | 'Security' | 'SEO' | 'Marketing' | 'Concierge' | 'Custom';
  name: string;
  model: string;
  provider: 'anthropic' | 'openai' | 'google' | 'custom';
  status: 'working' | 'idle' | 'blocked' | 'offline';
  currentTask?: IssueId;
  todayCost: number;
  lifetimeCost: number;
  skills: string[];
  persona: string;
}

export interface Pipeline {
  id: PipelineId;
  featureName: string;
  startedAt: Date;
  ownerAgentId: AgentId;
  phases: SDDPhase[];
  currentPhaseIndex: number;
  prNumber?: number;
}

export type SDDPhaseName = 'explore' | 'propose' | 'spec' | 'design' | 'implement' | 'verify' | 'archive';

export interface SDDPhase {
  name: SDDPhaseName;
  status: 'pending' | 'active' | 'done' | 'blocked';
  assignedAgentId?: AgentId;
  startedAt?: Date;
  completedAt?: Date;
  durationSec?: number;
  notes?: string;
}

export interface Issue {
  id: IssueId;
  companyId: CompanyId;
  code: string; // "LT-247"
  title: string;
  description: string;
  status: 'in-progress' | 'review' | 'blocked' | 'done' | 'queued';
  assigneeAgentId?: AgentId;
  pipelineId?: PipelineId;
  costSoFar: number;
  createdAt: Date;
  updatedAt: Date;
  messages: IssueMessage[];
}

export interface Approval {
  id: string;
  companyId: CompanyId;
  type: 'hire' | 'deploy' | 'budget-increase' | 'spec-review' | 'security-override';
  title: string;
  description: string;
  requesterAgentId: AgentId;
  createdAt: Date;
  expiresAt?: Date;
  impact: Record<string, string>;
  diffPreview?: DiffBlock;
}

export interface DiffBlock {
  fileName: string;
  filesChangedCount: number;
  lines: Array<{
    type: 'add' | 'remove' | 'context';
    lineNum: number;
    content: string;
  }>;
}

export interface Memory {
  id: string;
  companyId: CompanyId;
  title: string;
  type: 'decision' | 'bug' | 'architecture' | 'learning';
  content: string;
  savedByAgentId?: AgentId;
  savedByHumanId?: string;
  createdAt: Date;
  tags: string[];
  isPrivate: boolean;
}

export interface Thread {
  id: string;
  title: string;
  role: 'interview' | 'strategy' | 'architect' | 'reviewer';
  companyIdContext?: CompanyId;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
  costToDate: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  attachments?: Attachment[];
  timestamp: Date;
  tokensUsed?: number;
}

export interface Attachment {
  id: string;
  type: 'pdf' | 'image' | 'audio';
  fileName: string;
  sizeBytes: number;
  previewUrl?: string;
}

export interface Human {
  id: string;
  name: string;
  role: string;
  email: string;
  status: 'online' | 'offline';
  avatarColor: string;
}

export interface SOP {
  id: string;
  title: string;
  category: string;
  content: string; // markdown
  updatedAt: Date;
}
```

---

## 8. Mock interactions (the "feels real" layer)

The prototype must simulate realism without a backend. Key patterns:

**Simulated streaming:** When user sends a message in Chat, split the mock response into tokens and render them with a 15-40ms delay per token using `useEffect` + `setInterval`. Use the exact pre-scripted response from `lib/mock-interview-responses.ts`.

**Live activity feed:** On Command Center, the activity panel receives a new entry every 12-20 seconds (randomized). Pull from a pre-defined pool in `lib/mock-activity-stream.ts`. Use Framer Motion layout animations for entry.

**Pipeline auto-advance:** If the user enables "demo mode" (in Company view), pipeline phases advance automatically over 30-45 seconds each, with the active phase pulsing. Progress bar animates up.

**Cost tracker tick:** Today's spend on Company View live panel ticks up $0.01-$0.05 every few seconds while agents are "working."

**Convert-to-Company flow:** When user clicks the button in the PRD preview card, show a dialog → "Creating company…" with 3-stage progress (setup → hiring CEO → assigning first tasks) → redirect to new Company Detail with seeded data. ~4 seconds total, feels like real magic.

---

## 9. Guided tours

Use **driver.js** (open source, tiny, declarative).

Four tours defined in `components/tour/tours.ts`:

1. **`welcome`** — 6 steps across Command Center. Introduces companies grid, stats, activity, approvals.
2. **`idea-to-company`** — 8 steps. Starts on Helm Chat, walks through interview, PRD generation, Convert to Company, lands on new Company Detail.
3. **`pipeline-live`** — 5 steps on Legacy Traders Company Detail. Shows SDD pipeline visualization, active phase, live stream, handoff protocol.
4. **`mobile-approval`** — 4 steps, switches to mobile-emulator view of the Approval screen. Shows notification, diff, impact, approve flow.

Tours are triggerable from a "Take a tour" menu in the topbar. First-time users see a toast inviting them to start `welcome`.

---

## 10. Authentication (mock)

**Login screen** at `/login`:
- Accept any email + any password
- Button "Continue as demo (Daniel Torres)"
- Sets `useWorkspaceStore` with Daniel's user profile
- Redirects to `/command`

**Logout:** Clears localStorage, redirects to `/login`.

No real auth. When real auth lands (phase 2), replace with Clerk.

---

## 11. Performance targets

- LCP < 2.0s on Vercel production
- No hydration errors
- Lighthouse score ≥ 90 on desktop
- Bundle size < 500KB (gzipped, initial route)
- Framer Motion animations at 60fps on M1 MacBook

If Tailwind 4 / Next 15 has any cold-start slowness, enable `experimental.turbo` in next.config.js.

---

## 12. Accessibility baseline

- All interactive elements keyboard-reachable
- Focus states visible (use `ring-brass` utility for focus)
- `aria-label` on icon-only buttons
- Color contrast AA minimum (brass on bg-deep = 4.8:1 ✓)
- Reduced motion respected via `prefers-reduced-motion`

---

## 13. Browser support

- Chrome/Edge latest
- Safari 17+
- Firefox latest
- Mobile Safari for approval view only

No IE, no legacy.

---

## 14. Out of scope for prototype (explicit)

- Real authentication (Clerk, NextAuth)
- Database (Postgres, Neon, any)
- Real LLM API calls
- GitHub/Vercel integrations from within the app
- Real Playwright execution
- Billing
- Email / push notifications
- Multi-user real-time collaboration
- i18n framework (copy is bilingual but hardcoded)
- SSR caching strategies
- Analytics (add Plausible post-launch if needed)

---

## 15. Success criteria

Daniel (and Salvador, on handoff) can:

1. Log in
2. See all 6 companies with realistic data
3. Click into Legacy Traders and understand the org structure
4. Watch a pipeline progress through SDD phases
5. Open a pending approval on mobile and approve it
6. Start a new Helm Chat in Interview mode, upload an attachment, and convert the thread to a new Company
7. Take each of the 4 guided tours without confusion
8. Do all of the above at helm.multitopup.com with <2s page loads

If those 8 work, prototype ships. Anything beyond is polish.

---

*End of spec v0.1. Sprint plan in `SPRINT.md`. Scope guardrails in `SCOPE.md`.*
