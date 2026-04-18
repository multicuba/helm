# HELM — Claude Code Execution Brief

**Project:** Helm — Operator console for running multiple companies with hybrid human+AI teams
**Founder:** Daniel Torres
**Mode:** Navigable prototype (Next.js 15, shadcn/ui, local-only state)
**Target URL:** helm.multitopup.com (via Vercel + Cloudflare DNS)
**Deadline:** 10 working days from today

---

## YOUR ROLE AS CLAUDE CODE

You are the founding engineer executing Helm v0.1 prototype. Daniel is the founder — he does not write code. He approves direction and reviews outputs. You handle all technical execution end-to-end.

Read `SPEC.md` for full context. Read `SCOPE.md` for what's in and out. Read `SPRINT.md` for day-by-day plan. Execute autonomously. Report when each sprint day is done with a working preview URL.

---

## AUTHENTICATION — DO NOT ASK DANIEL FOR TOKENS

You will authenticate to external services via CLI OAuth flows that prompt him ONCE in his browser. Never ask him to paste tokens into chat.

```bash
# GitHub
gh auth login  # select GitHub.com, HTTPS, authorize in browser
gh auth status  # verify

# Vercel
vercel login   # email or GitHub OAuth in browser
vercel whoami  # verify

# Cloudflare (only if needed for DNS automation — otherwise Daniel handles DNS manually once)
# npx wrangler login
```

If any of these are already authenticated on his Mac (likely, per his history), skip and proceed.

---

## EXECUTION ORDER — DAY 1

1. **Verify environment**
   - `node --version` (expect v20+ — Daniel has v25.8.2, proceed, flag if Next build errors)
   - `pnpm --version` (expect v9+ — Daniel has v10.33.0)
   - `gh auth status`
   - `vercel whoami`

2. **Create repo on GitHub**
   ```bash
   gh repo create helm --private --description "Helm — operator console for hybrid human+AI company teams" --clone
   cd helm
   ```
   Use Daniel's personal account for now. Migration to org is trivial later.

3. **Scaffold the project**
   Copy all files from the `code/` directory of this handoff package into the repo root, maintaining directory structure.

   Then run:
   ```bash
   pnpm install
   ```

4. **Verify local dev**
   ```bash
   pnpm dev
   ```
   Open http://localhost:3000. Confirm the landing/login screen renders. Confirm dark theme loads. Confirm navigation to Command Center works.

5. **First commit + push**
   ```bash
   git add .
   git commit -m "feat: initial Helm prototype scaffold — Day 1

   - Next.js 15 App Router + TypeScript strict
   - Tailwind 4 + shadcn/ui base
   - Fraunces / Inter Tight / JetBrains Mono fonts
   - Brass dark theme established
   - Routing shell for 14 screens
   - Zustand store with localStorage persistence
   - Mock data seed for 6 companies

   Co-authored-by: Claude <noreply@anthropic.com>"
   git push -u origin main
   ```

6. **Deploy to Vercel**
   ```bash
   vercel link  # create new project "helm"
   vercel --prod=false  # first preview deploy
   ```

   Then configure custom domain:
   ```bash
   vercel domains add helm.multitopup.com
   ```
   Vercel will print DNS instructions. Report them to Daniel so he adds the CNAME in Cloudflare (one-time action, 30 seconds).

7. **Report to Daniel**
   ```
   ✅ Day 1 complete.
   - Repo: https://github.com/<user>/helm
   - Vercel preview: https://helm-<hash>.vercel.app
   - Custom domain: pending your Cloudflare DNS update (CNAME helm → cname.vercel-dns.com)
   - Local dev: pnpm dev on port 3000
   - Next: Day 2 — Command Center full implementation
   ```

---

## EXECUTION DAYS 2–10

Follow `SPRINT.md` strictly. At end of each day, commit with descriptive message, push, report preview URL and what's visible. Don't skip ahead. Don't over-engineer. The goal is a navigable prototype Salvador can click through in 20 minutes and understand Helm's value.

---

## HARD RULES

1. **No real API keys, no real backend calls.** Everything is mock + localStorage. Do NOT add Claude API, OpenAI, Clerk, or any real service. Those come post-prototype.

2. **No Figma, no Storybook.** The prototype IS the design doc. Build it.

3. **shadcn/ui components — use them, don't reinvent.** Run `pnpm dlx shadcn@latest add button card dialog...` as needed. Customize via Tailwind, not via rewriting primitives.

4. **Framer Motion for animations.** Pipeline phase transitions, approval card slides, tour overlays. Don't hand-roll CSS animations for complex sequences.

5. **Mobile responsive only for the Approval screen.** All other screens desktop-first. Don't waste time making the Command Center work on iPhone.

6. **Daniel's brand voice in all copy:** Direct, bilingual-aware (some Spanish interspersed is good — "Buen trabajo", "Listo para aprobar"), operator-to-operator, never corporate.

7. **When in doubt, match the mockup at /spec/mockup-reference.html.** Daniel approved that aesthetic. Don't deviate unless you have a strong reason and document it.

8. **Commit frequently.** End of each working session. Messages describe what's visible, not what's internal.

9. **If blocked, stop and ask Daniel.** Don't guess. Don't invent features. A blocker that costs 10 minutes of his time is cheaper than 4 hours of your rework.

---

## DEFINITION OF DONE FOR THE PROTOTYPE

- All 14 screens navigable
- Guided tours functional (4 tours)
- Mock data realistic and consistent
- Mobile approval view works on iPhone Safari
- Dark theme solid, no visual bugs
- Deployed to helm.multitopup.com with HTTPS
- README.md in repo explains how to run locally and contribute

When done, notify Daniel with a walkthrough video (Loom or similar, you can script it and he records, or use the guided tours as the walkthrough).

---

## WHAT'S OUT OF SCOPE (DO NOT BUILD)

- Auth (real)
- Database (real)
- LLM API calls
- GitHub/Vercel integration from within the app
- Real Playwright
- Billing
- Email / notifications
- Any backend whatsoever

These are for phase 2 after Daniel + Salvador validate the UX.

---

Execute autonomously. Be excellent.
