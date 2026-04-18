# HELM — Scope Guardrails

Keep this visible. When in doubt, re-read.

---

## ✅ IN SCOPE (prototype v0.1)

**Screens (14):**
1. Login (mock)
2. Command Center
3. Helm Chat (Interview mode)
4. Company Detail (overview)
5. Pipeline Detail
6. Issue Detail
7. Agent Profile
8. Org Chart (expanded view)
9. Knowledge Layer (Skills / Brand Guides / SOPs)
10. Engram Memory Browser
11. Mobile Approval
12. Settings (workspace)
13. Activity Feed (global)
14. 404 / empty states

**Features:**
- All navigation works between screens
- Zustand store with localStorage persistence
- Create Company (via Convert-to-Company flow in Chat)
- "Hire" an agent (adds to org chart visually)
- Approve / reject approvals (state changes)
- 4 guided tours (driver.js)
- ⌘K command palette
- Dark theme throughout
- Mobile responsive on Approval view only
- Simulated LLM streaming (token-by-token reveal)
- Auto-advancing pipeline in demo mode
- Live activity feed with periodic new events
- Cost tracker that ticks up

**Mock but realistic:**
- 6 seeded companies matching Daniel's portfolio
- ~50 seeded issues across companies
- ~15 pipelines in various states
- ~20 agents with varied models and status
- ~30 activity entries
- ~25 Engram memories (Legacy Traders)

---

## ❌ OUT OF SCOPE (absolutely do not build)

**Backend:**
- No server API routes (beyond Next.js server components for rendering)
- No database
- No Prisma, Drizzle, or any ORM
- No user accounts (real)
- No multi-user (everything is single-user demo)

**Integrations:**
- No Claude API calls
- No OpenAI API calls
- No real GitHub App
- No real Vercel/Cloudflare deploy from within app
- No real Playwright execution
- No webhooks
- No Stripe / billing

**Auth:**
- No Clerk
- No NextAuth
- No OAuth
- No JWT handling
- Just a mock login screen that accepts anything

**Realtime:**
- No WebSockets
- No Server-Sent Events
- No Pusher / Ably
- Activity feed uses setInterval locally

**Advanced UI:**
- No internationalization framework (i18next, next-intl) — copy is hardcoded bilingual
- No theme switcher (dark only)
- No user customization of layouts
- No drag-and-drop re-ordering (can add in v0.2)

**Analytics / Monitoring:**
- No Plausible, GA, Segment, PostHog
- No Sentry
- No log aggregation

**Mobile:**
- No native app
- No PWA manifest / service worker (maybe in v0.2)
- Only the Approval screen needs to look good on mobile

**Performance optimizations beyond default:**
- No image optimization pipelines beyond Next/Image defaults
- No code splitting strategies beyond Next 15 defaults
- No edge caching config

---

## ⚠️ GRAY AREAS — ASK DANIEL

If you find yourself wondering about these, ping Daniel before building:

- Copy in English vs Spanish (match mockup; if unsure, bilingual-sprinkle)
- Specific agent personas (use placeholder personas; real ones come from Daniel's Taste Transfer work)
- Specific brand guides for each company (one SOP + one brand guide per company is enough; Daniel fills in post-prototype)
- Empty states (design something simple; Daniel will review)
- Loading states (skeleton loaders using shadcn's `<Skeleton>`; good enough)

---

## 🎯 THE ONE QUESTION TO ASK

Before adding ANY feature, ask:

> **"Is this required for Salvador to click through the product in 20 minutes and understand Helm's value?"**

If yes → build it.
If no → note it in `BACKLOG.md` for v0.2 and move on.

---

## BACKLOG (v0.2 and beyond — not for this prototype)

Create `BACKLOG.md` in the repo and append anything that comes up:

- Real Clerk auth
- Neon Postgres + Drizzle ORM
- Real Claude API integration for Interview Agent
- GitHub App registration + OAuth flow
- Playwright MCP integration
- Infisical secrets
- Engram server backend (forked Go binary)
- Sync protocol between Helm and Gentleman AI Stack
- Clipmart-style company template import/export
- Stripe billing
- Multi-user workspaces with RBAC
- Email notifications (Resend)
- Push notifications (web push)
- Voice note transcription (Whisper)
- Real activity feed over WebSockets
- i18n framework

---

*Stay in scope. Ship the prototype.*
