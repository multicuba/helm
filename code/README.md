# Helm

Operator console for running multiple companies with hybrid human+AI teams.

**Status:** v0.1 prototype. Not production.
**Deploy:** [helm.multitopup.com](https://helm.multitopup.com)

---

## What this is

Helm is the console a founder uses to orchestrate agents (and humans) across multiple companies. Org charts, pipelines, approvals, memory — unified.

This repo is the **navigable prototype**: no real AI, no real backend, localStorage-backed state, mock streaming. The goal is to validate UX with Daniel and Salvador before investing in infrastructure.

## Stack

- Next.js 15 App Router + React 19
- TypeScript strict
- Tailwind 4 + shadcn/ui
- Zustand (localStorage persist)
- Framer Motion
- driver.js (tours)
- Fraunces · Inter Tight · JetBrains Mono

## Quick start

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000 → log in as demo → Command Center.

## Structure

```
app/
  (marketing)/login/       # mock login
  (app)/
    command/               # Command Center (home)
    chat/[threadId]/       # Helm Chat
    companies/[id]/        # Company Detail + drill-ins
    approvals/[id]/        # Mobile approval view
    activity/ knowledge/ reports/
components/
  shell/                   # Sidebar, Topbar
  command-center/          # Cards, stats, feed, approvals
  chat/ company/ approval/ memory/ tour/
lib/
  stores.ts                # Zustand stores
  types.ts                 # TS types
  seed-data.ts             # Seeded 6 companies
  utils.ts
```

## Sprint plan

See `SPRINT.md` (handoff package) for the 10-day plan. Each day ends with a deployed preview.

## Scope

See `SCOPE.md` — what's in, what's out. When in doubt, ask: *would Salvador need this to understand Helm's value in 20 minutes?*

## Deploy

Vercel Git integration handles it. Every push to `main` deploys.

Custom domain: `helm.multitopup.com` (CNAME → `cname.vercel-dns.com` in Cloudflare).

## License

MIT (private repo).
