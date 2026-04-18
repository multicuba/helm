# Helm — Handoff Package for Claude Code

**For:** Daniel Torres
**Delivered by:** Claude (web chat session, April 18, 2026)
**Purpose:** Complete execution brief for Claude Code to build Helm v0.1 prototype autonomously.

---

## What's inside

```
helm-handoff/
├── README.md                  ← YOU ARE HERE
├── CLAUDE_CODE_BRIEF.md       ← THE PROMPT. Paste this to Claude Code first.
├── SPEC.md                    ← Technical specification (architecture, stack, data model)
├── SPRINT.md                  ← 10-day plan, day by day
├── SCOPE.md                   ← Guardrails: in vs out
│
├── spec/
│   └── mockup-reference.html  ← The aesthetic north star (the mockup you approved)
│
└── code/                      ← Initial project files
    ├── package.json
    ├── tsconfig.json
    ├── next.config.mjs
    ├── postcss.config.mjs
    ├── .gitignore
    ├── README.md
    ├── app/                   ← Next.js App Router (login, command center, shell)
    ├── components/            ← Shell, CompanyCard, StatsBar, ActivityFeed, ApprovalsList
    ├── lib/                   ← stores, types, seed data, utils
    └── public/                ← favicon
```

## What you do (5 minutes)

1. Unzip this package to `~/Documents/helm-handoff/`
2. Open **Claude Code** on your Mac
3. Point it to this folder and paste the prompt from `CLAUDE_CODE_BRIEF.md`
4. Claude Code handles: GitHub repo creation, Vercel setup, DNS config, all 10 days of build

## What Claude Code will ask you

- To run `gh auth login` once (opens browser, you authorize GitHub — **no tokens in chat**)
- To run `vercel login` once (same pattern, OAuth via browser)
- To add a **CNAME record** in Cloudflare DNS: `helm` → `cname.vercel-dns.com`

That's it. No tokens, no keys, no secrets pasted anywhere.

## Success criteria

At the end of Day 1 (today, 2–4 hours of Claude Code execution):
- Repo `helm` exists on your GitHub under your account
- Vercel project connected, auto-deploy on push configured
- `helm.multitopup.com` serves the login screen
- You log in → land on dark Command Center skeleton

At the end of Day 10:
- Full 14-screen prototype, navigable
- 4 guided tours working
- Mobile approval view works on iPhone
- Ready to show Salvador

## One rule I left Claude Code

> *If blocked, stop and ask Daniel. Don't guess. Don't invent features.
> A blocker that costs 10 minutes of his time is cheaper than 4 hours of rework.*

---

Execute when ready. Helm is the bridge between the idea and the shipped product —
this package is the bridge between the design session and the shipped prototype.
