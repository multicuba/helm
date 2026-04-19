import type {
  Company,
  Approval,
  ActivityEntry,
  Thread,
  Agent,
  AgentRole,
  PRDSection,
  InspirationCard,
  Human,
  Pipeline,
  Issue,
  Memory,
  StreamItem,
  Skill,
  BrandGuide,
  SOP,
} from "./types";

// ───── Agents (reusable templates) ─────
const mkCEO = (id: string): Agent => ({
  id,
  role: "CEO · Strategist",
  shortRole: "CEO",
  roleColor: "brass",
  name: "CEO Agent",
  model: "Opus 4.7",
  provider: "anthropic",
  status: "working",
  todayCost: 12.4,
  lifetimeCost: 482.1,
  skills: ["strategy", "delegation", "bilingual-es-en", "daniel-taste-pack"],
  persona: "Senior founder-operator. Challenges assumptions. Bilingual ES/EN.",
});

const mkFrontend = (id: string): Agent => ({
  id,
  role: "Frontend Engineer",
  shortRole: "FE",
  roleColor: "teal",
  name: "Frontend Agent",
  model: "Claude Code · Sonnet",
  provider: "anthropic",
  status: "working",
  todayCost: 8.1,
  lifetimeCost: 214.4,
  skills: ["react-19", "nextjs-15", "tailwind-4", "responsive"],
  persona: "Senior frontend dev. Ships responsive, accessible components.",
});

const mkBackend = (id: string): Agent => ({
  id,
  role: "Backend Engineer",
  shortRole: "BE",
  roleColor: "teal",
  name: "Backend Agent",
  model: "Codex · GPT-5.4",
  provider: "openai",
  status: "idle",
  todayCost: 5.2,
  lifetimeCost: 198.6,
  skills: ["node", "postgres", "api-design", "auth-patterns"],
  persona: "Backend architect. Type-safe by default. Async-first.",
});

const mkDevOps = (id: string): Agent => ({
  id,
  role: "DevOps",
  shortRole: "OPS",
  roleColor: "success",
  name: "DevOps Agent",
  model: "Sonnet · GitHub App",
  provider: "anthropic",
  status: "idle",
  todayCost: 1.8,
  lifetimeCost: 48.2,
  skills: ["ci-cd", "vercel", "cloudflare", "monitoring"],
  persona: "Infra steward. No credentials in code, ever.",
});

const mkQA = (id: string): Agent => ({
  id,
  role: "QA Reviewer",
  shortRole: "QA",
  roleColor: "danger",
  name: "QA Agent",
  model: "Codex · Playwright",
  provider: "openai",
  status: "working",
  todayCost: 4.4,
  lifetimeCost: 132.1,
  skills: ["playwright", "e2e-testing", "accessibility"],
  persona: "Test every button. Report every break.",
});

const mkSecurity = (id: string): Agent => ({
  id,
  role: "Security Advisor",
  shortRole: "SEC",
  roleColor: "warning",
  name: "Security Agent",
  model: "Opus · read-only",
  provider: "anthropic",
  status: "idle",
  todayCost: 0.8,
  lifetimeCost: 22.4,
  skills: ["threat-modeling", "owasp", "secrets-hygiene"],
  persona: "Read-only. Flags risk before it ships.",
});

const mkSEO = (id: string): Agent => ({
  id,
  role: "SEO Specialist",
  shortRole: "SEO",
  roleColor: "teal",
  name: "SEO Agent",
  model: "Sonnet",
  provider: "anthropic",
  status: "idle",
  todayCost: 0.4,
  lifetimeCost: 12.8,
  skills: ["technical-seo", "content-strategy", "keyword-research"],
  persona: "Audit every page. Recommend, don't rewrite.",
});

const mkMarketing = (id: string): Agent => ({
  id,
  role: "Marketing Agent",
  shortRole: "M",
  roleColor: "success",
  name: "Marketing Agent",
  model: "Sonnet",
  provider: "anthropic",
  status: "working",
  todayCost: 3.1,
  lifetimeCost: 86.4,
  skills: ["copywriting-es-en", "brand-voice", "local-seo"],
  persona: "Writes in Daniel's brand voice. Bilingual.",
});

const mkConcierge = (id: string, name: string): Agent => ({
  id,
  role: name,
  shortRole: name === "Guest Concierge" ? "G" : "H",
  roleColor: "success",
  name,
  model: "Sonnet",
  provider: "anthropic",
  status: "working",
  todayCost: 0.6,
  lifetimeCost: 18.4,
  skills: ["hospitality", "bilingual-es-en", "airbnb-messaging"],
  persona: "Warm, professional, replies in <90s.",
});

// ───── Humans ─────
const salvador: Human = {
  id: "salvador",
  name: "Salvador",
  role: "Full-stack developer",
  status: "online",
  initials: "S",
};

const daniel: Human = {
  id: "daniel",
  name: "Daniel (you)",
  role: "Chairman",
  status: "online",
  initials: "DT",
};

// ───── Pipelines ─────
const legacyProfilerPipeline: Pipeline = {
  id: "p-lt-profiler-v3",
  featureName: "Bryan AI — Profiler v3 (trader risk profiles)",
  startedAt: "2026-04-16T09:00:00Z",
  ownerAgentId: "lt-ceo",
  prNumber: 247,
  currentPhaseIndex: 3,
  progressPercent: 55,
  phases: [
    {
      name: "explore",
      displayName: "Explore",
      status: "done",
      assignedAgentId: "lt-ceo",
      assignedLabel: "CEO · Opus",
      durationLabel: "✓ completed in 8m · 14 turns",
      startedAt: "2026-04-16T09:00:00Z",
      completedAt: "2026-04-16T09:08:00Z",
      turnsUsed: 14,
      cost: 0.34,
      artifacts: [
        { id: "p1-e-1", type: "doc", name: "codebase-analysis.md", size: "2.4k tokens" },
        { id: "p1-e-2", type: "doc", name: "engram-context-load.md", size: "1.1k tokens" },
        { id: "p1-e-3", type: "report", name: "risk-scoring-prior-art.md", size: "0.8k tokens" },
      ],
      handoffNote: "Handoff to Propose phase: 3 viable approaches identified (Kelly, Sharpe, modified Sharpe)",
    },
    {
      name: "propose",
      displayName: "Propose",
      status: "done",
      assignedAgentId: "lt-ceo",
      assignedLabel: "CEO · Opus",
      durationLabel: "✓ completed in 12m 41s · 22 turns",
      startedAt: "2026-04-16T09:08:00Z",
      completedAt: "2026-04-16T09:21:00Z",
      turnsUsed: 22,
      cost: 0.18,
      artifacts: [
        { id: "p1-p-1", type: "doc", name: "proposal.md", size: "3 alternatives considered" },
        { id: "p1-p-2", type: "doc", name: "trade-off-matrix.md", size: "1.8k tokens" },
        { id: "p1-p-3", type: "report", name: "kelly-vs-sharpe-benchmark.md", size: "2.1k tokens" },
      ],
      handoffNote: "Handoff to Spec phase: modified Sharpe selected · Daniel approved direction",
    },
    {
      name: "spec",
      displayName: "Spec",
      status: "done",
      assignedAgentId: "lt-be",
      assignedLabel: "Architect · Sonnet",
      durationLabel: "✓ completed in 6m · reviewed by Salvador",
      startedAt: "2026-04-16T09:21:00Z",
      completedAt: "2026-04-16T09:27:00Z",
      turnsUsed: 18,
      cost: 0.45,
      artifacts: [
        { id: "p1-s-1", type: "spec", name: "spec.md", size: "3 acceptance criteria" },
        { id: "p1-s-2", type: "doc", name: "input-output-contract.md", size: "1.4k tokens" },
        { id: "p1-s-3", type: "doc", name: "edge-cases.md", size: "9 cases enumerated" },
        { id: "p1-s-4", type: "report", name: "risk-assessment.md", size: "1.2k tokens" },
      ],
      handoffNote: "Handoff to Design phase: reviewed by Salvador ✓",
    },
    {
      name: "design",
      displayName: "Design",
      status: "active",
      assignedAgentId: "lt-ceo",
      assignedLabel: "Opus 4.7",
      durationLabel: "● running 3m · 7 turns so far",
      startedAt: "2026-04-18T11:42:00Z",
      turnsUsed: 7,
      cost: 0.62,
      artifacts: [
        { id: "p1-d-1", type: "design", name: "architecture-diagram.md", size: "draft" },
        { id: "p1-d-2", type: "doc", name: "ADR-004-modified-sharpe.md", size: "in progress" },
        { id: "p1-d-3", type: "design", name: "module-boundaries.md", size: "0.6k tokens" },
      ],
    },
    {
      name: "implement",
      displayName: "Implement",
      status: "pending",
      assignedLabel: "FE + BE",
      durationLabel: "queued",
      cost: 0,
      artifacts: [],
    },
    {
      name: "verify",
      displayName: "Verify",
      status: "pending",
      assignedLabel: "QA · Playwright",
      durationLabel: "queued",
      cost: 0,
      artifacts: [],
    },
    {
      name: "archive",
      displayName: "Archive",
      status: "pending",
      assignedLabel: "Docs",
      durationLabel: "—",
      cost: 0,
      artifacts: [],
    },
  ],
  events: [
    {
      id: "p1-ev-1",
      type: "phase_started",
      phaseId: "explore",
      agentId: "lt-ceo",
      timestamp: "2026-04-16T09:00:00Z",
      description: "Explore phase kicked off · loading Engram context",
    },
    {
      id: "p1-ev-2",
      type: "phase_completed",
      phaseId: "explore",
      agentId: "lt-ceo",
      timestamp: "2026-04-16T09:08:00Z",
      description: "Explore complete · 3 viable risk-scoring approaches surfaced",
    },
    {
      id: "p1-ev-3",
      type: "handoff",
      phaseId: "propose",
      agentId: "lt-ceo",
      timestamp: "2026-04-16T09:08:30Z",
      description: "Handoff Explore → Propose · CEO retains ownership",
    },
    {
      id: "p1-ev-4",
      type: "review_approved",
      phaseId: "propose",
      timestamp: "2026-04-16T09:20:00Z",
      description: "Daniel approved direction: modified Sharpe over Kelly",
    },
    {
      id: "p1-ev-5",
      type: "phase_completed",
      phaseId: "propose",
      agentId: "lt-ceo",
      timestamp: "2026-04-16T09:21:00Z",
      description: "Propose complete · proposal.md saved to Engram",
    },
    {
      id: "p1-ev-6",
      type: "handoff",
      phaseId: "spec",
      agentId: "lt-be",
      timestamp: "2026-04-16T09:21:30Z",
      description: "Handoff Propose → Spec · Architect agent assigned",
    },
    {
      id: "p1-ev-7",
      type: "review_approved",
      phaseId: "spec",
      timestamp: "2026-04-16T09:26:00Z",
      description: "Salvador reviewed spec.md · 3 ACs accepted",
    },
    {
      id: "p1-ev-8",
      type: "phase_completed",
      phaseId: "spec",
      agentId: "lt-be",
      timestamp: "2026-04-16T09:27:00Z",
      description: "Spec complete · contract + edge cases documented",
    },
    {
      id: "p1-ev-9",
      type: "handoff",
      phaseId: "design",
      agentId: "lt-ceo",
      timestamp: "2026-04-18T11:42:00Z",
      description: "Handoff Spec → Design · Opus 4.7 picking up architecture",
    },
    {
      id: "p1-ev-10",
      type: "phase_started",
      phaseId: "design",
      agentId: "lt-ceo",
      timestamp: "2026-04-18T11:42:00Z",
      description: "Design phase started · drafting ADR-004",
    },
  ],
};

const legacyDashboardPipeline: Pipeline = {
  id: "p-lt-dashboard-ws",
  featureName: "Dashboard — live P&L over WebSocket",
  startedAt: "2026-04-15T10:00:00Z",
  ownerAgentId: "lt-fe",
  prNumber: 251,
  currentPhaseIndex: 4,
  progressPercent: 66,
  phases: [
    {
      name: "explore",
      displayName: "Explore",
      status: "done",
      assignedAgentId: "lt-fe",
      assignedLabel: "FE · Sonnet",
      durationLabel: "✓ completed in 8m · 11 turns",
      startedAt: "2026-04-15T10:00:00Z",
      completedAt: "2026-04-15T10:08:00Z",
      turnsUsed: 11,
      cost: 0.21,
      artifacts: [
        { id: "p2-e-1", type: "doc", name: "websocket-codebase-scan.md", size: "1.9k tokens" },
        { id: "p2-e-2", type: "report", name: "polling-baseline-metrics.md", size: "0.7k tokens" },
        { id: "p2-e-3", type: "doc", name: "browser-compat-notes.md", size: "0.5k tokens" },
      ],
      handoffNote: "Handoff to Propose phase: WebSocket viable · Safari needs keepalive",
    },
    {
      name: "propose",
      displayName: "Propose",
      status: "done",
      assignedAgentId: "lt-fe",
      assignedLabel: "FE · Sonnet",
      durationLabel: "✓ completed in 6m · 9 turns",
      startedAt: "2026-04-15T10:08:00Z",
      completedAt: "2026-04-15T10:14:00Z",
      turnsUsed: 9,
      cost: 0.14,
      artifacts: [
        { id: "p2-p-1", type: "doc", name: "proposal.md", size: "2 alternatives considered" },
        { id: "p2-p-2", type: "doc", name: "ws-vs-sse.md", size: "1.0k tokens" },
        { id: "p2-p-3", type: "report", name: "estimated-cost-savings.md", size: "0.4k tokens" },
      ],
      handoffNote: "Handoff to Spec phase: WebSocket with SSE fallback selected",
    },
    {
      name: "spec",
      displayName: "Spec",
      status: "done",
      assignedAgentId: "lt-be",
      assignedLabel: "Architect · Sonnet",
      durationLabel: "✓ completed in 11m · reviewed by Daniel",
      startedAt: "2026-04-15T10:14:00Z",
      completedAt: "2026-04-15T10:25:00Z",
      turnsUsed: 16,
      cost: 0.38,
      artifacts: [
        { id: "p2-s-1", type: "spec", name: "spec.md", size: "4 acceptance criteria" },
        { id: "p2-s-2", type: "doc", name: "ws-protocol-contract.md", size: "1.6k tokens" },
        { id: "p2-s-3", type: "doc", name: "reconnect-strategy.md", size: "0.9k tokens" },
      ],
      handoffNote: "Handoff to Design phase: reviewed by Daniel ✓",
    },
    {
      name: "design",
      displayName: "Design",
      status: "done",
      assignedAgentId: "lt-fe",
      assignedLabel: "Sonnet",
      durationLabel: "✓ completed in 14m · 24 turns",
      startedAt: "2026-04-15T10:25:00Z",
      completedAt: "2026-04-15T10:39:00Z",
      turnsUsed: 24,
      cost: 0.86,
      artifacts: [
        { id: "p2-d-1", type: "design", name: "architecture-diagram.md", size: "1.8k tokens" },
        { id: "p2-d-2", type: "doc", name: "ADR-005-ws-fallback.md", size: "1.2k tokens" },
        { id: "p2-d-3", type: "design", name: "client-state-machine.md", size: "1.4k tokens" },
        { id: "p2-d-4", type: "doc", name: "backpressure-strategy.md", size: "0.8k tokens" },
      ],
      handoffNote: "Handoff to Implement phase: state machine signed off",
    },
    {
      name: "implement",
      displayName: "Implement",
      status: "blocked",
      assignedAgentId: "lt-fe",
      assignedLabel: "FE + BE",
      durationLabel: "⚠ blocked · awaiting your review",
      startedAt: "2026-04-15T10:39:00Z",
      turnsUsed: 41,
      cost: 2.94,
      artifacts: [
        { id: "p2-i-1", type: "code", name: "8 files changed · +412 -87 lines", size: "WIP" },
        { id: "p2-i-2", type: "report", name: "review-blocker.md", size: "auth handshake concern" },
      ],
      handoffNote: "Blocked: Backend agent flagged auth handshake concern · needs human review",
    },
    {
      name: "verify",
      displayName: "Verify",
      status: "pending",
      assignedLabel: "QA · Playwright",
      durationLabel: "queued",
      cost: 0,
      artifacts: [],
    },
    {
      name: "archive",
      displayName: "Archive",
      status: "pending",
      assignedLabel: "Docs",
      durationLabel: "—",
      cost: 0,
      artifacts: [],
    },
  ],
  events: [
    {
      id: "p2-ev-1",
      type: "phase_started",
      phaseId: "explore",
      agentId: "lt-fe",
      timestamp: "2026-04-15T10:00:00Z",
      description: "Explore kicked off · scanning WebSocket usage in dashboard",
    },
    {
      id: "p2-ev-2",
      type: "phase_completed",
      phaseId: "explore",
      agentId: "lt-fe",
      timestamp: "2026-04-15T10:08:00Z",
      description: "Explore complete · Safari WebSocket flakiness flagged from Engram",
    },
    {
      id: "p2-ev-3",
      type: "handoff",
      phaseId: "propose",
      agentId: "lt-fe",
      timestamp: "2026-04-15T10:08:30Z",
      description: "Handoff Explore → Propose · same agent (FE)",
    },
    {
      id: "p2-ev-4",
      type: "phase_completed",
      phaseId: "propose",
      agentId: "lt-fe",
      timestamp: "2026-04-15T10:14:00Z",
      description: "Propose complete · WebSocket with SSE fallback recommended",
    },
    {
      id: "p2-ev-5",
      type: "handoff",
      phaseId: "spec",
      agentId: "lt-be",
      timestamp: "2026-04-15T10:14:30Z",
      description: "Handoff Propose → Spec · Architect agent assigned",
    },
    {
      id: "p2-ev-6",
      type: "review_approved",
      phaseId: "spec",
      timestamp: "2026-04-15T10:24:00Z",
      description: "Daniel reviewed spec.md · 4 ACs accepted",
    },
    {
      id: "p2-ev-7",
      type: "phase_completed",
      phaseId: "design",
      agentId: "lt-fe",
      timestamp: "2026-04-15T10:39:00Z",
      description: "Design complete · ADR-005 saved to Engram",
    },
    {
      id: "p2-ev-8",
      type: "phase_started",
      phaseId: "implement",
      agentId: "lt-fe",
      timestamp: "2026-04-15T10:39:30Z",
      description: "Implement started · FE + BE pair on the change",
    },
    {
      id: "p2-ev-9",
      type: "commit_pushed",
      phaseId: "implement",
      agentId: "lt-fe",
      timestamp: "2026-04-15T11:10:00Z",
      description: "5 commits pushed to feature/dashboard-ws",
    },
    {
      id: "p2-ev-10",
      type: "commit_pushed",
      phaseId: "implement",
      agentId: "lt-be",
      timestamp: "2026-04-15T11:42:00Z",
      description: "3 commits pushed · auth handshake refactor",
    },
    {
      id: "p2-ev-11",
      type: "phase_started",
      phaseId: "implement",
      agentId: "lt-be",
      timestamp: "2026-04-17T14:20:00Z",
      description: "BE flagged auth handshake concern · pipeline blocked for review",
    },
  ],
};

const legacyAuthPipeline: Pipeline = {
  id: "p-lt-auth-migration",
  featureName: "Auth — Clerk → NextAuth migration",
  startedAt: "2026-04-12T09:00:00Z",
  ownerAgentId: "lt-be",
  prNumber: 248,
  currentPhaseIndex: 5,
  progressPercent: 82,
  phases: [
    {
      name: "explore",
      displayName: "Explore",
      status: "done",
      assignedAgentId: "lt-be",
      assignedLabel: "BE · GPT-5.4",
      durationLabel: "✓ completed in 10m · 16 turns",
      startedAt: "2026-04-12T09:00:00Z",
      completedAt: "2026-04-12T09:10:00Z",
      turnsUsed: 16,
      cost: 0.28,
      artifacts: [
        { id: "p3-e-1", type: "doc", name: "clerk-usage-audit.md", size: "2.7k tokens" },
        { id: "p3-e-2", type: "doc", name: "nextauth-feature-parity.md", size: "1.5k tokens" },
        { id: "p3-e-3", type: "report", name: "migration-risk-areas.md", size: "0.9k tokens" },
      ],
      handoffNote: "Handoff to Propose: 12 Clerk touchpoints identified · 3 are high-risk",
    },
    {
      name: "propose",
      displayName: "Propose",
      status: "done",
      assignedAgentId: "lt-be",
      assignedLabel: "BE · GPT-5.4",
      durationLabel: "✓ completed in 7m · 12 turns",
      startedAt: "2026-04-12T09:10:00Z",
      completedAt: "2026-04-12T09:17:00Z",
      turnsUsed: 12,
      cost: 0.16,
      artifacts: [
        { id: "p3-p-1", type: "doc", name: "proposal.md", size: "2 alternatives considered" },
        { id: "p3-p-2", type: "report", name: "rollout-strategy.md", size: "phased migration plan" },
        { id: "p3-p-3", type: "doc", name: "rollback-criteria.md", size: "0.6k tokens" },
      ],
      handoffNote: "Handoff to Spec: phased dual-write migration approved by Daniel",
    },
    {
      name: "spec",
      displayName: "Spec",
      status: "done",
      assignedAgentId: "lt-be",
      assignedLabel: "Architect · Sonnet",
      durationLabel: "✓ completed in 13m · reviewed by Daniel",
      startedAt: "2026-04-12T09:17:00Z",
      completedAt: "2026-04-12T09:30:00Z",
      turnsUsed: 19,
      cost: 0.42,
      artifacts: [
        { id: "p3-s-1", type: "spec", name: "spec.md", size: "5 acceptance criteria" },
        { id: "p3-s-2", type: "doc", name: "session-migration-contract.md", size: "1.7k tokens" },
        { id: "p3-s-3", type: "doc", name: "jwt-claims-mapping.md", size: "1.0k tokens" },
        { id: "p3-s-4", type: "report", name: "security-considerations.md", size: "1.3k tokens" },
      ],
      handoffNote: "Handoff to Design phase: reviewed by Daniel ✓",
    },
    {
      name: "design",
      displayName: "Design",
      status: "done",
      assignedAgentId: "lt-ceo",
      assignedLabel: "Opus 4.7",
      durationLabel: "✓ completed in 22m · 31 turns",
      startedAt: "2026-04-12T09:30:00Z",
      completedAt: "2026-04-12T09:52:00Z",
      turnsUsed: 31,
      cost: 1.18,
      artifacts: [
        { id: "p3-d-1", type: "design", name: "architecture-diagram.md", size: "2.4k tokens" },
        { id: "p3-d-2", type: "doc", name: "ADR-006-nextauth-adapter.md", size: "1.6k tokens" },
        { id: "p3-d-3", type: "design", name: "session-bridge-flow.md", size: "1.1k tokens" },
        { id: "p3-d-4", type: "doc", name: "feature-flag-rollout.md", size: "0.7k tokens" },
      ],
      handoffNote: "Handoff to Implement: dual-write with Clerk shadow mode",
    },
    {
      name: "implement",
      displayName: "Implement",
      status: "done",
      assignedAgentId: "lt-be",
      assignedLabel: "BE · GPT-5.4",
      durationLabel: "✓ completed in 1h 14m · 87 turns",
      startedAt: "2026-04-12T09:52:00Z",
      completedAt: "2026-04-12T11:06:00Z",
      turnsUsed: 87,
      cost: 4.62,
      artifacts: [
        { id: "p3-i-1", type: "code", name: "23 files changed · +1,247 -589 lines", size: "PR #248" },
        { id: "p3-i-2", type: "doc", name: "migration-runbook.md", size: "1.9k tokens" },
        { id: "p3-i-3", type: "report", name: "test-coverage-delta.md", size: "+18% on auth paths" },
      ],
      handoffNote: "Handoff to Verify: PR #248 ready for security scan",
    },
    {
      name: "verify",
      displayName: "Verify",
      status: "blocked",
      assignedAgentId: "lt-sec",
      assignedLabel: "Security · Opus",
      durationLabel: "⚠ blocked · 2 findings · awaiting decision",
      startedAt: "2026-04-12T11:06:00Z",
      turnsUsed: 23,
      cost: 0.74,
      artifacts: [
        { id: "p3-v-1", type: "report", name: "security-scan.md", size: "2 findings" },
        { id: "p3-v-2", type: "report", name: "finding-1-jwt-leak-vector.md", size: "high severity" },
        { id: "p3-v-3", type: "report", name: "finding-2-session-fixation.md", size: "medium severity" },
      ],
      handoffNote: "Blocked: 2 security findings · rollback executed · awaiting Daniel decision",
    },
    {
      name: "archive",
      displayName: "Archive",
      status: "pending",
      assignedLabel: "Docs",
      durationLabel: "—",
      cost: 0,
      artifacts: [],
    },
  ],
  events: [
    {
      id: "p3-ev-1",
      type: "phase_started",
      phaseId: "explore",
      agentId: "lt-be",
      timestamp: "2026-04-12T09:00:00Z",
      description: "Explore kicked off · auditing Clerk integration",
    },
    {
      id: "p3-ev-2",
      type: "phase_completed",
      phaseId: "explore",
      agentId: "lt-be",
      timestamp: "2026-04-12T09:10:00Z",
      description: "Explore complete · 12 Clerk touchpoints mapped",
    },
    {
      id: "p3-ev-3",
      type: "review_approved",
      phaseId: "propose",
      timestamp: "2026-04-12T09:16:00Z",
      description: "Daniel approved phased dual-write migration",
    },
    {
      id: "p3-ev-4",
      type: "phase_completed",
      phaseId: "propose",
      agentId: "lt-be",
      timestamp: "2026-04-12T09:17:00Z",
      description: "Propose complete · proposal.md saved to Engram",
    },
    {
      id: "p3-ev-5",
      type: "review_approved",
      phaseId: "spec",
      timestamp: "2026-04-12T09:29:00Z",
      description: "Daniel reviewed spec.md · 5 ACs accepted",
    },
    {
      id: "p3-ev-6",
      type: "handoff",
      phaseId: "design",
      agentId: "lt-ceo",
      timestamp: "2026-04-12T09:30:30Z",
      description: "Handoff Spec → Design · Opus picking up architecture",
    },
    {
      id: "p3-ev-7",
      type: "phase_completed",
      phaseId: "design",
      agentId: "lt-ceo",
      timestamp: "2026-04-12T09:52:00Z",
      description: "Design complete · ADR-006 saved · feature flag plan ready",
    },
    {
      id: "p3-ev-8",
      type: "commit_pushed",
      phaseId: "implement",
      agentId: "lt-be",
      timestamp: "2026-04-12T10:24:00Z",
      description: "12 commits pushed · NextAuth adapter scaffolded",
    },
    {
      id: "p3-ev-9",
      type: "commit_pushed",
      phaseId: "implement",
      agentId: "lt-be",
      timestamp: "2026-04-12T10:58:00Z",
      description: "11 more commits · session bridge live in shadow mode",
    },
    {
      id: "p3-ev-10",
      type: "phase_completed",
      phaseId: "implement",
      agentId: "lt-be",
      timestamp: "2026-04-12T11:06:00Z",
      description: "Implement complete · PR #248 opened",
    },
    {
      id: "p3-ev-11",
      type: "phase_started",
      phaseId: "verify",
      agentId: "lt-sec",
      timestamp: "2026-04-12T11:06:30Z",
      description: "Verify started · Security agent running scan",
    },
    {
      id: "p3-ev-12",
      type: "phase_started",
      phaseId: "verify",
      agentId: "lt-sec",
      timestamp: "2026-04-15T16:00:00Z",
      description: "Security flagged 2 findings · rollback executed · pipeline blocked",
    },
  ],
};

// ───── Issues ─────
const legacyIssues: Issue[] = [
  {
    id: "lt-247",
    code: "LT-247",
    title: "Bryan AI profiler v3 — risk score algorithm",
    subtitle: "Pipeline active · design phase · blocks 3 downstream",
    description: `## Context

Bryan AI's risk profiler shipped in **Q4 2025** with a naïve volatility-only score. The model misclassifies traders with low-vol but high-drawdown books — Salvador flagged this on three separate accounts last week.

We need a v3 algorithm that combines:

- **Realized volatility** (rolling 30d, EWMA decay)
- **Maximum drawdown** over the last 90 trading days
- **Modified Sharpe** with downside-only deviation
- **Position concentration** (Herfindahl index across open contracts)

## Goals

1. Score range \`[0, 100]\` mapped to 5 risk tiers (\`conservative\`, \`balanced\`, \`growth\`, \`aggressive\`, \`speculative\`).
2. Backtest must run in **under 90s** for 5y of SPX + VIX history.
3. Stable across the 2020 March crash (no NaN, no infinity).

## Decision log

The CEO agent considered three approaches in [LT-240](#) and the proposal landed on a **modified Sharpe** with downside deviation. See \`docs/profiler/proposal.md\` for the full trade-off matrix.

\`\`\`ts
function riskScore(account: Account): number {
  const sharpe = modifiedSharpe(account.returns);
  const dd = maxDrawdown(account.equityCurve, 90);
  const conc = herfindahl(account.positions);
  return clamp(50 + 12 * sharpe - 30 * dd - 8 * conc, 0, 100);
}
\`\`\`

## Open questions

- Do we backfill scores for accounts created before 2024? Daniel says yes, Salvador says it's not worth the compute.
- Should the score be cached in Postgres or recomputed on read?

> "If we cache, we need an invalidation story for new fills. Recompute is safer but costs ~80ms per page load." — Backend Agent`,
    status: "in-progress",
    assigneeAgentId: "lt-be",
    assigneeLabel: "BE",
    assigneeColor: "teal",
    pipelineId: "p-lt-profiler-v3",
    costSoFar: 42.10,
    createdAt: "2026-04-16T09:00:00Z",
    updatedAt: "2026-04-19T13:37:00Z",
    priority: "p0",
    labels: ["ai", "profiler", "algorithm", "core", "p0"],
    agentTimeMinutes: 504,
    tokenCostUsd: 12.47,
    createdBy: { id: "daniel", label: "Daniel", kind: "human" },
    lastUpdatedBy: { id: "lt-be", label: "Backend Agent", kind: "agent" },
    blocks: ["LT-251", "LT-252"],
    relatedTo: ["LT-240"],
    activity: [
      {
        id: "lt-247-a-1",
        type: "created",
        actorId: "daniel",
        actorType: "human",
        actorLabel: "Daniel",
        timestamp: "2026-04-16T09:00:00Z",
        description: "opened the issue and tagged the CEO agent.",
      },
      {
        id: "lt-247-a-2",
        type: "assigned",
        actorId: "lt-ceo",
        actorType: "agent",
        actorLabel: "CEO Agent",
        timestamp: "2026-04-16T09:08:00Z",
        description: "assigned Backend Agent after exploring 3 algorithmic alternatives.",
      },
      {
        id: "lt-247-a-3",
        type: "commented",
        actorId: "lt-ceo",
        actorType: "agent",
        actorLabel: "CEO Agent",
        timestamp: "2026-04-16T09:21:00Z",
        description: "left a recommendation.",
        meta: {
          comment:
            "Modified Sharpe with downside deviation wins on the 2020 March crash backtest. Kelly criterion blew up — too sensitive to fat tails.",
        },
      },
      {
        id: "lt-247-a-4",
        type: "commit_pushed",
        actorId: "lt-be",
        actorType: "agent",
        actorLabel: "Backend Agent",
        timestamp: "2026-04-16T11:42:00Z",
        description: "pushed first scoring scaffolding.",
        meta: {
          commitSha: "f8c3a2e9b1d4570c",
          files: ["lib/scoring/sharpe.ts", "lib/scoring/drawdown.ts"],
        },
      },
      {
        id: "lt-247-a-5",
        type: "review_requested",
        actorId: "lt-be",
        actorType: "agent",
        actorLabel: "Backend Agent",
        timestamp: "2026-04-17T08:14:00Z",
        description: "requested review from Salvador on the math.",
      },
      {
        id: "lt-247-a-6",
        type: "commented",
        actorId: "salvador",
        actorType: "human",
        actorLabel: "Salvador",
        timestamp: "2026-04-17T10:02:00Z",
        description: "left a comment.",
        meta: {
          comment:
            "Math checks out. Concerned about NaN when account.returns < 30 samples. Add a guard.",
        },
      },
      {
        id: "lt-247-a-7",
        type: "commit_pushed",
        actorId: "lt-be",
        actorType: "agent",
        actorLabel: "Backend Agent",
        timestamp: "2026-04-17T11:18:00Z",
        description: "added sample-size guard + unit tests.",
        meta: {
          commitSha: "c9d18a04e2f73b21",
          files: ["lib/scoring/sharpe.ts", "tests/scoring.spec.ts"],
        },
      },
      {
        id: "lt-247-a-8",
        type: "flag_raised",
        actorId: "lt-sec",
        actorType: "agent",
        actorLabel: "Security Agent",
        timestamp: "2026-04-17T15:50:00Z",
        description: "flagged a low-severity finding.",
        meta: {
          severity: "low",
          comment:
            "Score function reads from account.positions without auth scoping. Confirm caller checks ownership.",
        },
      },
      {
        id: "lt-247-a-9",
        type: "status_changed",
        actorId: "lt-be",
        actorType: "agent",
        actorLabel: "Backend Agent",
        timestamp: "2026-04-18T09:30:00Z",
        description: "moved the issue forward.",
        meta: { fromStatus: "queued", toStatus: "in-progress" },
      },
      {
        id: "lt-247-a-10",
        type: "commit_pushed",
        actorId: "lt-be",
        actorType: "agent",
        actorLabel: "Backend Agent",
        timestamp: "2026-04-18T14:11:00Z",
        description: "wired the API route + Postgres cache.",
        meta: {
          commitSha: "7b29e405ac1d8f60",
          files: [
            "server/routes/profiler.ts",
            "components/profiler/RiskPanel.tsx",
            "db/migrations/0042_profiler_cache.sql",
          ],
        },
      },
      {
        id: "lt-247-a-11",
        type: "review_requested",
        actorId: "lt-be",
        actorType: "agent",
        actorLabel: "Backend Agent",
        timestamp: "2026-04-18T16:40:00Z",
        description: "requested review from QA on edge cases.",
      },
      {
        id: "lt-247-a-12",
        type: "commented",
        actorId: "lt-qa",
        actorType: "agent",
        actorLabel: "QA Agent",
        timestamp: "2026-04-19T13:37:00Z",
        description: "started the test pass.",
        meta: {
          comment:
            "Running 23 scenarios. 2020 March crash: ✓. Bond-only accounts: pending. iPad reflow: pending.",
        },
      },
    ],
    codeChanges: [
      {
        filename: "lib/scoring/sharpe.ts",
        status: "M",
        linesAdded: 42,
        linesRemoved: 8,
        diffSnippet: `--- a/lib/scoring/sharpe.ts
+++ b/lib/scoring/sharpe.ts
@@ -1,12 +1,46 @@
-export function sharpe(returns: number[]): number {
-  const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
-  const variance =
-    returns.reduce((s, r) => s + (r - mean) ** 2, 0) / returns.length;
-  return mean / Math.sqrt(variance);
+const MIN_SAMPLES = 30;
+
+export function modifiedSharpe(returns: number[]): number {
+  if (returns.length < MIN_SAMPLES) return 0;
+
+  const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
+  const downside = returns.filter((r) => r < 0);
+  if (downside.length === 0) return mean > 0 ? 3 : 0;
+
+  const downVar =
+    downside.reduce((s, r) => s + r * r, 0) / downside.length;
+  const downStd = Math.sqrt(downVar);
+  return downStd === 0 ? 0 : mean / downStd;
 }`,
      },
      {
        filename: "components/profiler/RiskPanel.tsx",
        status: "A",
        linesAdded: 87,
        linesRemoved: 0,
        diffSnippet: `--- /dev/null
+++ b/components/profiler/RiskPanel.tsx
@@ -0,0 +1,87 @@
+"use client";
+
+import { useRiskScore } from "@/lib/hooks/useRiskScore";
+import { RiskTierBadge } from "./RiskTierBadge";
+
+const TIER_COLORS = {
+  conservative: "text-success",
+  balanced: "text-teal",
+  growth: "text-brass",
+  aggressive: "text-warning",
+  speculative: "text-danger",
+} as const;
+
+export function RiskPanel({ accountId }: { accountId: string }) {
+  const { score, tier, loading } = useRiskScore(accountId);
+  if (loading) return <RiskPanelSkeleton />;
+  return (
+    <div className="rounded-lg border p-4">
+      <h3 className="font-serif italic">Risk profile</h3>
+      <div className={TIER_COLORS[tier]}>{tier}</div>
+      <div className="font-mono text-2xl">{score.toFixed(0)}</div>
+    </div>
+  );
+}`,
      },
      {
        filename: "server/routes/profiler.ts",
        status: "M",
        linesAdded: 28,
        linesRemoved: 4,
        diffSnippet: `--- a/server/routes/profiler.ts
+++ b/server/routes/profiler.ts
@@ -14,11 +14,35 @@
 export async function GET(req: Request, { params }: Ctx) {
-  const account = await db.account.findUnique({ where: { id: params.id } });
-  if (!account) return new Response("not found", { status: 404 });
-  return Response.json({ score: legacyScore(account) });
+  const session = await getSession(req);
+  if (!session) return new Response("unauthorized", { status: 401 });
+
+  const account = await db.account.findUnique({
+    where: { id: params.id, ownerId: session.userId },
+    include: { positions: true, fills: { take: 500 } },
+  });
+  if (!account) return new Response("not found", { status: 404 });
+
+  const cached = await cache.get(\`risk:\${account.id}\`);
+  if (cached) return Response.json(cached);
+
+  const score = riskScore(account);
+  const tier = scoreToTier(score);
+  const payload = { score, tier, computedAt: new Date().toISOString() };
+  await cache.set(\`risk:\${account.id}\`, payload, { ttl: 60 });
+  return Response.json(payload);
 }`,
      },
      {
        filename: "tests/scoring.spec.ts",
        status: "A",
        linesAdded: 64,
        linesRemoved: 0,
        diffSnippet: `--- /dev/null
+++ b/tests/scoring.spec.ts
@@ -0,0 +1,64 @@
+import { describe, it, expect } from "vitest";
+import { modifiedSharpe, riskScore } from "@/lib/scoring";
+import { fixture } from "./fixtures";
+
+describe("modifiedSharpe", () => {
+  it("returns 0 for short series", () => {
+    expect(modifiedSharpe([0.01, 0.02])).toBe(0);
+  });
+
+  it("survives the 2020 March crash", () => {
+    const out = modifiedSharpe(fixture.spx2020March);
+    expect(out).toBeGreaterThan(-2);
+    expect(out).toBeLessThan(2);
+  });
+
+  it("never returns NaN on bond-only accounts", () => {
+    const out = riskScore(fixture.bondOnlyAccount);
+    expect(Number.isNaN(out)).toBe(false);
+  });
+});`,
      },
    ],
  },
  {
    id: "lt-251",
    code: "LT-251",
    title: "Dashboard — real-time P&L streaming",
    subtitle: "WebSocket refactor · needs your review on approach",
    description: `## Problem

Polling \`/api/positions\` every 2s triggers ~430 requests/min per active session and hits Tradovate's rate limit during open. The dashboard P&L lags 2-4s behind actual fills.

## Approach (proposal)

Subscribe to a single WebSocket channel per account and push deltas. Reconnect on visibility change.

- \`useLiveBook(accountId)\` hook exposes \`{ book, status, lastTick }\`
- Heartbeat every 15s, exponential reconnect on drop
- Falls back to polling if WS handshake fails twice

## Risks

- iPad Safari freezes after ~1min on long-lived sockets — needs investigation, possibly buffering issue
- Reconnect storm if many users come back from background simultaneously

## Out of scope

- Order entry latency (separate issue, [LT-244](#))
- Mobile push notifications`,
    status: "review",
    assigneeAgentId: "lt-fe",
    assigneeLabel: "FE",
    assigneeColor: "teal",
    pipelineId: "p-lt-dashboard-ws",
    costSoFar: 18.44,
    createdAt: "2026-04-17T14:20:00Z",
    updatedAt: "2026-04-19T11:05:00Z",
    priority: "p1",
    labels: ["dashboard", "frontend", "websocket", "performance"],
    agentTimeMinutes: 240,
    tokenCostUsd: 4.80,
    createdBy: { id: "salvador", label: "Salvador", kind: "human" },
    lastUpdatedBy: { id: "lt-fe", label: "Frontend Agent", kind: "agent" },
    blockedBy: ["LT-247"],
    relatedTo: ["LT-244"],
    activity: [
      {
        id: "lt-251-a-1",
        type: "created",
        actorId: "salvador",
        actorType: "human",
        actorLabel: "Salvador",
        timestamp: "2026-04-17T14:20:00Z",
        description: "opened the issue.",
      },
      {
        id: "lt-251-a-2",
        type: "assigned",
        actorId: "lt-ceo",
        actorType: "agent",
        actorLabel: "CEO Agent",
        timestamp: "2026-04-17T14:34:00Z",
        description: "routed to Frontend Agent.",
      },
      {
        id: "lt-251-a-3",
        type: "commented",
        actorId: "lt-fe",
        actorType: "agent",
        actorLabel: "Frontend Agent",
        timestamp: "2026-04-17T15:02:00Z",
        description: "asked a clarifying question.",
        meta: {
          comment:
            "Should I keep polling as a true fallback, or just surface 'reconnecting' and wait? Daniel's call.",
        },
      },
      {
        id: "lt-251-a-4",
        type: "commented",
        actorId: "daniel",
        actorType: "human",
        actorLabel: "Daniel",
        timestamp: "2026-04-17T15:48:00Z",
        description: "answered.",
        meta: {
          comment:
            "Real fallback to polling. Traders can't see a 'reconnecting' modal during NFP.",
        },
      },
      {
        id: "lt-251-a-5",
        type: "commit_pushed",
        actorId: "lt-fe",
        actorType: "agent",
        actorLabel: "Frontend Agent",
        timestamp: "2026-04-17T18:21:00Z",
        description: "pushed initial WS hook.",
        meta: {
          commitSha: "2ad81f4c0e9b3170",
          files: [
            "lib/hooks/useLiveBook.ts",
            "components/dashboard/LiveChart.tsx",
          ],
        },
      },
      {
        id: "lt-251-a-6",
        type: "commit_pushed",
        actorId: "lt-fe",
        actorType: "agent",
        actorLabel: "Frontend Agent",
        timestamp: "2026-04-18T10:14:00Z",
        description: "added polling fallback + reconnect with jitter.",
        meta: {
          commitSha: "9c45e1b2f7da80aa",
          files: ["lib/hooks/useLiveBook.ts"],
        },
      },
      {
        id: "lt-251-a-7",
        type: "flag_raised",
        actorId: "lt-qa",
        actorType: "agent",
        actorLabel: "QA Agent",
        timestamp: "2026-04-18T14:30:00Z",
        description: "flagged a regression.",
        meta: {
          severity: "medium",
          comment:
            "iPad Safari pinned tab freezes ~60s into the session. Reproduces on staging.",
        },
      },
      {
        id: "lt-251-a-8",
        type: "commit_pushed",
        actorId: "lt-fe",
        actorType: "agent",
        actorLabel: "Frontend Agent",
        timestamp: "2026-04-19T09:12:00Z",
        description: "switched to BroadcastChannel for tab sync.",
        meta: {
          commitSha: "31fe7a890c4d2155",
          files: [
            "lib/hooks/useLiveBook.ts",
            "lib/sync/broadcast.ts",
          ],
        },
      },
      {
        id: "lt-251-a-9",
        type: "review_requested",
        actorId: "lt-fe",
        actorType: "agent",
        actorLabel: "Frontend Agent",
        timestamp: "2026-04-19T10:00:00Z",
        description: "requested review from Daniel.",
      },
      {
        id: "lt-251-a-10",
        type: "status_changed",
        actorId: "lt-fe",
        actorType: "agent",
        actorLabel: "Frontend Agent",
        timestamp: "2026-04-19T11:05:00Z",
        description: "moved to review.",
        meta: { fromStatus: "in-progress", toStatus: "review" },
      },
    ],
    codeChanges: [
      {
        filename: "lib/hooks/useLiveBook.ts",
        status: "A",
        linesAdded: 96,
        linesRemoved: 0,
        diffSnippet: `--- /dev/null
+++ b/lib/hooks/useLiveBook.ts
@@ -0,0 +1,96 @@
+"use client";
+
+import { useEffect, useRef, useState } from "react";
+
+type Status = "connecting" | "live" | "polling" | "down";
+
+export function useLiveBook(accountId: string) {
+  const [book, setBook] = useState<Book | null>(null);
+  const [status, setStatus] = useState<Status>("connecting");
+  const wsRef = useRef<WebSocket | null>(null);
+  const retries = useRef(0);
+
+  useEffect(() => {
+    let cancelled = false;
+
+    function connect() {
+      const ws = new WebSocket(\`wss://api.legacytraders.app/book/\${accountId}\`);
+      wsRef.current = ws;
+
+      ws.onopen = () => {
+        retries.current = 0;
+        setStatus("live");
+      };
+      ws.onmessage = (e) => setBook(JSON.parse(e.data));
+      ws.onclose = () => {
+        if (cancelled) return;
+        retries.current += 1;
+        if (retries.current > 2) {
+          setStatus("polling");
+          startPolling(accountId, setBook);
+        } else {
+          const wait = Math.min(8000, 500 * 2 ** retries.current);
+          setTimeout(connect, wait + Math.random() * 250);
+        }
+      };
+    }
+
+    connect();
+    return () => {
+      cancelled = true;
+      wsRef.current?.close();
+    };
+  }, [accountId]);
+
+  return { book, status };
+}`,
      },
      {
        filename: "components/dashboard/LiveChart.tsx",
        status: "M",
        linesAdded: 23,
        linesRemoved: 41,
        diffSnippet: `--- a/components/dashboard/LiveChart.tsx
+++ b/components/dashboard/LiveChart.tsx
@@ -10,30 +10,12 @@
 export function LiveChart({ accountId }: Props) {
-  const [book, setBook] = useState<Book | null>(null);
-  useEffect(() => {
-    const id = setInterval(async () => {
-      const r = await fetch(\`/api/positions/\${accountId}\`);
-      setBook(await r.json());
-    }, 2000);
-    return () => clearInterval(id);
-  }, [accountId]);
+  const { book, status } = useLiveBook(accountId);

   return (
     <div className="rounded-lg p-4">
+      <ConnectionDot status={status} />
       {book ? <Chart data={book} /> : <Skeleton />}
     </div>
   );
 }`,
      },
      {
        filename: "lib/sync/broadcast.ts",
        status: "A",
        linesAdded: 38,
        linesRemoved: 0,
        diffSnippet: `--- /dev/null
+++ b/lib/sync/broadcast.ts
@@ -0,0 +1,38 @@
+const channels = new Map<string, BroadcastChannel>();
+
+export function broadcast<T>(name: string, payload: T) {
+  if (typeof window === "undefined") return;
+  let ch = channels.get(name);
+  if (!ch) {
+    ch = new BroadcastChannel(name);
+    channels.set(name, ch);
+  }
+  ch.postMessage(payload);
+}`,
      },
    ],
  },
  {
    id: "lt-248",
    code: "LT-248",
    title: "Auth: migrate from Clerk to NextAuth",
    subtitle: "Security flagged 2 findings · rolled back",
    description: `## Status: ROLLED BACK

Security agent raised **two high-severity findings** during the verify phase. The migration was reverted on staging on Apr 17. We need to address both before re-attempting.

### Findings

1. **Session token in Referer header** — preview deploy was leaking \`session_id\` in the URL hash on redirect. Mitigation: move tokens to httpOnly cookies before re-deploy.
2. **Missing CSRF on POST /api/auth/callback** — Clerk handled this transparently; NextAuth requires explicit middleware.

### Plan to unblock

- [ ] Wrap \`/api/auth/*\` routes with the [\`csrf-token\`](#) middleware
- [ ] Audit all \`signIn()\` redirects for token leakage
- [ ] Re-run security review (Security Agent)
- [ ] Stage migration with feature flag for 5% rollout

\`\`\`ts
// middleware.ts (proposed)
export const config = { matcher: ["/api/auth/:path*"] };
export function middleware(req: NextRequest) {
  if (req.method !== "POST") return NextResponse.next();
  return verifyCsrf(req);
}
\`\`\`

> "We are not migrating until both findings show green in the next pass." — Daniel`,
    status: "blocked",
    assigneeAgentId: "lt-sec",
    assigneeLabel: "SEC",
    assigneeColor: "warning",
    pipelineId: "p-lt-auth-migration",
    costSoFar: 8.12,
    createdAt: "2026-04-15T11:00:00Z",
    updatedAt: "2026-04-18T17:22:00Z",
    priority: "p0",
    labels: ["auth", "security", "blocked", "p0"],
    agentTimeMinutes: 90,
    tokenCostUsd: 1.80,
    createdBy: { id: "lt-ceo", label: "CEO Agent", kind: "agent" },
    lastUpdatedBy: { id: "lt-sec", label: "Security Agent", kind: "agent" },
    relatedTo: ["LT-247"],
    activity: [
      {
        id: "lt-248-a-1",
        type: "created",
        actorId: "lt-ceo",
        actorType: "agent",
        actorLabel: "CEO Agent",
        timestamp: "2026-04-15T11:00:00Z",
        description: "opened the migration ticket.",
      },
      {
        id: "lt-248-a-2",
        type: "assigned",
        actorId: "lt-ceo",
        actorType: "agent",
        actorLabel: "CEO Agent",
        timestamp: "2026-04-15T11:14:00Z",
        description: "assigned Backend Agent to draft the migration.",
      },
      {
        id: "lt-248-a-3",
        type: "commit_pushed",
        actorId: "lt-be",
        actorType: "agent",
        actorLabel: "Backend Agent",
        timestamp: "2026-04-16T09:30:00Z",
        description: "pushed initial NextAuth scaffolding.",
        meta: {
          commitSha: "a1c4e98b3f720d51",
          files: [
            "lib/auth/index.ts",
            "app/api/auth/[...nextauth]/route.ts",
          ],
        },
      },
      {
        id: "lt-248-a-4",
        type: "commit_pushed",
        actorId: "lt-be",
        actorType: "agent",
        actorLabel: "Backend Agent",
        timestamp: "2026-04-16T15:11:00Z",
        description: "removed Clerk providers + updated middleware.",
        meta: {
          commitSha: "ce8b021df9a44730",
          files: ["middleware.ts", "components/auth/SignInButton.tsx"],
        },
      },
      {
        id: "lt-248-a-5",
        type: "review_requested",
        actorId: "lt-be",
        actorType: "agent",
        actorLabel: "Backend Agent",
        timestamp: "2026-04-17T09:00:00Z",
        description: "requested security review.",
      },
      {
        id: "lt-248-a-6",
        type: "flag_raised",
        actorId: "lt-sec",
        actorType: "agent",
        actorLabel: "Security Agent",
        timestamp: "2026-04-17T11:42:00Z",
        description: "flagged a high-severity finding.",
        meta: {
          severity: "high",
          comment:
            "Preview deploy leaks session_id via Referer header. Token is in the URL fragment after signIn().",
        },
      },
      {
        id: "lt-248-a-7",
        type: "flag_raised",
        actorId: "lt-sec",
        actorType: "agent",
        actorLabel: "Security Agent",
        timestamp: "2026-04-17T11:55:00Z",
        description: "flagged a second finding.",
        meta: {
          severity: "high",
          comment:
            "POST /api/auth/callback has no CSRF protection. Clerk handled this; NextAuth requires explicit middleware.",
        },
      },
      {
        id: "lt-248-a-8",
        type: "status_changed",
        actorId: "daniel",
        actorType: "human",
        actorLabel: "Daniel",
        timestamp: "2026-04-17T12:30:00Z",
        description: "moved to blocked and ordered a rollback.",
        meta: { fromStatus: "review", toStatus: "blocked" },
      },
      {
        id: "lt-248-a-9",
        type: "commit_pushed",
        actorId: "lt-ops",
        actorType: "agent",
        actorLabel: "DevOps Agent",
        timestamp: "2026-04-17T13:14:00Z",
        description: "rolled back staging deploy.",
        meta: {
          commitSha: "0db5749ec3a82f10",
          files: ["infra/vercel/staging.json"],
        },
      },
      {
        id: "lt-248-a-10",
        type: "commented",
        actorId: "salvador",
        actorType: "human",
        actorLabel: "Salvador",
        timestamp: "2026-04-18T10:08:00Z",
        description: "left a note.",
        meta: {
          comment:
            "Let me take a pass on this with you tomorrow morning. NextAuth defaults need a careful review.",
        },
      },
      {
        id: "lt-248-a-11",
        type: "commented",
        actorId: "lt-sec",
        actorType: "agent",
        actorLabel: "Security Agent",
        timestamp: "2026-04-18T17:22:00Z",
        description: "summarized the unblock plan.",
        meta: {
          comment:
            "Both findings have remediation paths. Re-test after csrf middleware lands. ETA: 2 days.",
        },
      },
    ],
    codeChanges: [
      {
        filename: "middleware.ts",
        status: "M",
        linesAdded: 14,
        linesRemoved: 22,
        diffSnippet: `--- a/middleware.ts
+++ b/middleware.ts
@@ -1,30 +1,22 @@
-import { authMiddleware } from "@clerk/nextjs";
-
-export default authMiddleware({
-  publicRoutes: ["/", "/login", "/api/health"],
-});
+import { NextRequest, NextResponse } from "next/server";
+import { getToken } from "next-auth/jwt";
+
+export async function middleware(req: NextRequest) {
+  const token = await getToken({ req });
+  if (!token && !req.nextUrl.pathname.startsWith("/api/auth")) {
+    return NextResponse.redirect(new URL("/login", req.url));
+  }
+  return NextResponse.next();
+}

 export const config = {
   matcher: ["/((?!_next|.*\\\\..*).*)"],
 };`,
      },
      {
        filename: "lib/auth/index.ts",
        status: "A",
        linesAdded: 51,
        linesRemoved: 0,
        diffSnippet: `--- /dev/null
+++ b/lib/auth/index.ts
@@ -0,0 +1,51 @@
+import NextAuth from "next-auth";
+import GitHub from "next-auth/providers/github";
+import Google from "next-auth/providers/google";
+
+export const { handlers, auth, signIn, signOut } = NextAuth({
+  providers: [
+    GitHub({ clientId: process.env.GITHUB_ID!, clientSecret: process.env.GITHUB_SECRET! }),
+    Google({ clientId: process.env.GOOGLE_ID!, clientSecret: process.env.GOOGLE_SECRET! }),
+  ],
+  session: { strategy: "jwt" },
+  callbacks: {
+    async session({ session, token }) {
+      if (token.sub) session.user.id = token.sub;
+      return session;
+    },
+  },
+});`,
      },
      {
        filename: "components/auth/SignInButton.tsx",
        status: "M",
        linesAdded: 8,
        linesRemoved: 14,
        diffSnippet: `--- a/components/auth/SignInButton.tsx
+++ b/components/auth/SignInButton.tsx
@@ -1,18 +1,12 @@
-import { SignInButton as ClerkSignIn } from "@clerk/nextjs";
+"use client";
+
+import { signIn } from "next-auth/react";

 export function SignInButton() {
   return (
-    <ClerkSignIn mode="modal">
-      <button className="btn">Sign in</button>
-    </ClerkSignIn>
+    <button className="btn" onClick={() => signIn("github")}>
+      Sign in with GitHub
+    </button>
   );
 }`,
      },
    ],
  },
  {
    id: "lt-245",
    code: "LT-245",
    title: "Landing page — options strategy explainer",
    subtitle: "Shipped to production · awaiting SEO audit",
    description: "New explainer page for options strategies.",
    status: "done",
    assigneeAgentId: "lt-fe",
    assigneeLabel: "FE",
    assigneeColor: "teal",
    costSoFar: 6.88,
    createdAt: "2026-04-14T10:00:00Z",
    priority: "p3",
    labels: ["marketing", "seo", "landing"],
    agentTimeMinutes: 120,
    tokenCostUsd: 2.40,
  },
  {
    id: "lt-252",
    code: "LT-252",
    title: "Profiler — backtest harness for Sharpe variants",
    subtitle: "Blocks LT-247 verify phase · needs historical dataset",
    description: `## Goal

A reproducible backtest harness for the [LT-247](#) scoring algorithm. Should ingest 5y of SPX, VIX, and 10Y treasury data and produce per-tier hit rates.

## Dataset

- **SPX daily OHLC** — Yahoo Finance, 2020-01-01 → 2025-12-31
- **VIX daily close** — CBOE
- **10Y treasury** — FRED \`DGS10\`

Stored locally under \`fixtures/historical/\` (gzip-compressed CSVs, ~14 MB).

## Output contract

\`\`\`ts
type BacktestResult = {
  scenarioId: string;
  hits: number;       // # accounts whose realized risk matched predicted tier
  total: number;      // # accounts evaluated
  meanScore: number;
  worstDrawdown: number;
};
\`\`\`

## Acceptance

- Runs in < 90s on M1 dev box
- All 23 fixture scenarios produce a result (no crashes, no NaN)
- HTML report written to \`/tmp/backtest/index.html\``,
    status: "in-progress",
    assigneeAgentId: "lt-be",
    assigneeLabel: "BE",
    assigneeColor: "teal",
    pipelineId: "p-lt-profiler-v3",
    costSoFar: 9.20,
    createdAt: "2026-04-17T09:00:00Z",
    updatedAt: "2026-04-19T10:42:00Z",
    priority: "p1",
    labels: ["profiler", "backend", "testing", "data"],
    agentTimeMinutes: 180,
    tokenCostUsd: 3.60,
    createdBy: { id: "lt-be", label: "Backend Agent", kind: "agent" },
    lastUpdatedBy: { id: "lt-be", label: "Backend Agent", kind: "agent" },
    blockedBy: ["LT-247"],
    relatedTo: ["LT-243"],
    activity: [
      {
        id: "lt-252-a-1",
        type: "created",
        actorId: "lt-be",
        actorType: "agent",
        actorLabel: "Backend Agent",
        timestamp: "2026-04-17T09:00:00Z",
        description: "spun off from LT-247 as a separate verify-phase blocker.",
      },
      {
        id: "lt-252-a-2",
        type: "commented",
        actorId: "lt-ceo",
        actorType: "agent",
        actorLabel: "CEO Agent",
        timestamp: "2026-04-17T09:18:00Z",
        description: "scoped the dataset.",
        meta: {
          comment:
            "Use 5y SPX + VIX. Skip equities — too noisy for the v3 model.",
        },
      },
      {
        id: "lt-252-a-3",
        type: "commit_pushed",
        actorId: "lt-be",
        actorType: "agent",
        actorLabel: "Backend Agent",
        timestamp: "2026-04-17T13:42:00Z",
        description: "pulled fixtures + initial harness skeleton.",
        meta: {
          commitSha: "84c1f032ab5d9711",
          files: [
            "scripts/backtest/run.ts",
            "fixtures/historical/spx.csv.gz",
          ],
        },
      },
      {
        id: "lt-252-a-4",
        type: "commit_pushed",
        actorId: "lt-be",
        actorType: "agent",
        actorLabel: "Backend Agent",
        timestamp: "2026-04-18T11:20:00Z",
        description: "wired scenario loader + result aggregator.",
        meta: {
          commitSha: "f67e2bd180a440c1",
          files: [
            "scripts/backtest/run.ts",
            "scripts/backtest/scenarios.ts",
          ],
        },
      },
      {
        id: "lt-252-a-5",
        type: "commented",
        actorId: "salvador",
        actorType: "human",
        actorLabel: "Salvador",
        timestamp: "2026-04-18T15:08:00Z",
        description: "left a heads-up.",
        meta: {
          comment:
            "Make sure to skip federal holidays — last harness counted 252+ trading days/yr in 2020.",
        },
      },
      {
        id: "lt-252-a-6",
        type: "commit_pushed",
        actorId: "lt-be",
        actorType: "agent",
        actorLabel: "Backend Agent",
        timestamp: "2026-04-18T16:55:00Z",
        description: "fixed holiday calendar + added perf instrumentation.",
        meta: {
          commitSha: "2a18f4c0e9b30077",
          files: [
            "scripts/backtest/calendar.ts",
            "scripts/backtest/run.ts",
          ],
        },
      },
      {
        id: "lt-252-a-7",
        type: "commented",
        actorId: "lt-be",
        actorType: "agent",
        actorLabel: "Backend Agent",
        timestamp: "2026-04-19T10:42:00Z",
        description: "posted progress.",
        meta: {
          comment:
            "Harness runs end-to-end in 71s on M1. 19/23 scenarios pass; 4 still throw on bond-only accounts.",
        },
      },
      {
        id: "lt-252-a-8",
        type: "review_requested",
        actorId: "lt-be",
        actorType: "agent",
        actorLabel: "Backend Agent",
        timestamp: "2026-04-19T11:00:00Z",
        description: "asked for an early review on the report layout.",
      },
      {
        id: "lt-252-a-9",
        type: "flag_raised",
        actorId: "lt-qa",
        actorType: "agent",
        actorLabel: "QA Agent",
        timestamp: "2026-04-19T12:14:00Z",
        description: "flagged a low-severity finding.",
        meta: {
          severity: "low",
          comment:
            "Report HTML doesn't escape scenario names. Cosmetic but worth fixing before sharing.",
        },
      },
      {
        id: "lt-252-a-10",
        type: "status_changed",
        actorId: "lt-be",
        actorType: "agent",
        actorLabel: "Backend Agent",
        timestamp: "2026-04-19T13:00:00Z",
        description: "kept in-progress, added subtask for bond accounts.",
        meta: { fromStatus: "in-progress", toStatus: "in-progress" },
      },
    ],
    codeChanges: [
      {
        filename: "scripts/backtest/run.ts",
        status: "A",
        linesAdded: 78,
        linesRemoved: 0,
        diffSnippet: `--- /dev/null
+++ b/scripts/backtest/run.ts
@@ -0,0 +1,78 @@
+import { loadHistorical } from "./loader";
+import { riskScore } from "@/lib/scoring";
+import { scenarios } from "./scenarios";
+import { tradingDaysBetween } from "./calendar";
+
+async function main() {
+  const data = await loadHistorical(["spx", "vix", "dgs10"]);
+  const start = Date.now();
+  const results = [];
+
+  for (const scenario of scenarios) {
+    const days = tradingDaysBetween(scenario.from, scenario.to);
+    const slice = data.slice(scenario.from, scenario.to);
+    let hits = 0;
+    for (const account of scenario.accounts) {
+      const predicted = riskScore({ ...account, returns: slice.returns });
+      if (predicted >= scenario.expectedMin && predicted <= scenario.expectedMax) {
+        hits += 1;
+      }
+    }
+    results.push({
+      scenarioId: scenario.id,
+      hits,
+      total: scenario.accounts.length,
+      days,
+    });
+  }
+
+  const elapsed = Date.now() - start;
+  console.log(\`Backtest finished in \${elapsed}ms\`);
+  console.table(results);
+}
+
+main().catch(console.error);`,
      },
      {
        filename: "scripts/backtest/calendar.ts",
        status: "A",
        linesAdded: 34,
        linesRemoved: 0,
        diffSnippet: `--- /dev/null
+++ b/scripts/backtest/calendar.ts
@@ -0,0 +1,34 @@
+const NYSE_HOLIDAYS_2024 = [
+  "2024-01-01", "2024-01-15", "2024-02-19", "2024-03-29",
+  "2024-05-27", "2024-06-19", "2024-07-04", "2024-09-02",
+  "2024-11-28", "2024-12-25",
+];
+
+export function isTradingDay(date: Date): boolean {
+  const day = date.getDay();
+  if (day === 0 || day === 6) return false;
+  const iso = date.toISOString().slice(0, 10);
+  return !NYSE_HOLIDAYS_2024.includes(iso);
+}
+
+export function tradingDaysBetween(from: Date, to: Date): number {
+  let count = 0;
+  const cur = new Date(from);
+  while (cur <= to) {
+    if (isTradingDay(cur)) count += 1;
+    cur.setDate(cur.getDate() + 1);
+  }
+  return count;
+}`,
      },
      {
        filename: "scripts/backtest/scenarios.ts",
        status: "M",
        linesAdded: 22,
        linesRemoved: 6,
        diffSnippet: `--- a/scripts/backtest/scenarios.ts
+++ b/scripts/backtest/scenarios.ts
@@ -1,8 +1,24 @@
 export const scenarios = [
   { id: "march-2020-crash", from: "2020-03-01", to: "2020-04-15" },
   { id: "summer-2022-rally", from: "2022-06-01", to: "2022-08-15" },
+  { id: "ai-mania-2024",      from: "2024-01-15", to: "2024-04-30" },
+  { id: "rate-cut-fade",      from: "2024-09-15", to: "2024-12-15" },
+  { id: "vol-floor-2025",     from: "2025-03-01", to: "2025-06-30" },
+  { id: "small-cap-recovery", from: "2025-08-01", to: "2025-11-15" },
+  { id: "bond-only-stress",   from: "2025-09-01", to: "2025-12-31" },
 ];`,
      },
    ],
  },
  {
    id: "lt-253",
    code: "LT-253",
    title: "Profiler — UI for risk tier thresholds",
    subtitle: "Queued after design phase · 3 confirmation states",
    description: "Let operator adjust risk tier thresholds via slider.",
    status: "queued",
    assigneeAgentId: "lt-fe",
    assigneeLabel: "FE",
    assigneeColor: "teal",
    pipelineId: "p-lt-profiler-v3",
    costSoFar: 0,
    createdAt: "2026-04-17T12:00:00Z",
    priority: "p2",
    labels: ["profiler", "frontend", "ux"],
    agentTimeMinutes: 0,
    tokenCostUsd: 0,
  },
  {
    id: "lt-250",
    code: "LT-250",
    title: "Observability — dashboard alerting + PagerDuty",
    subtitle: "Implementation phase · writing Terraform",
    description: "Wire alerts for API latency + error rate regressions.",
    status: "in-progress",
    assigneeAgentId: "lt-ops",
    assigneeLabel: "OPS",
    assigneeColor: "success",
    costSoFar: 4.44,
    createdAt: "2026-04-16T15:00:00Z",
    priority: "p2",
    labels: ["ops", "observability", "infra"],
    agentTimeMinutes: 130,
    tokenCostUsd: 2.60,
  },
  {
    id: "lt-249",
    code: "LT-249",
    title: "Checkout — Stripe 3DS edge cases",
    subtitle: "QA caught 3 drop-off paths on mobile Safari",
    description: `## Symptom

Three 3DS scenarios drop off on mobile Safari (iOS 17 / 18). Conversion data shows ~6% of mobile checkouts fail at the SCA step.

### Drop-off paths

1. **3DS challenge dismissed** — user taps outside the bank sheet, no retry CTA
2. **Card rejected after challenge** — error toast shows then disappears, no recovery
3. **Bank webview crash** — Safari shows blank page, no telemetry

### Repro

\`\`\`bash
# in checkout E2E
pnpm test:e2e --grep "stripe-3ds-mobile"
\`\`\`

## Fix shape

- Wrap \`stripe.confirmPayment\` in a recoverable state machine
- Surface a \`tryAgain()\` action on every failure terminal state
- Log the bank-side error code to Sentry (currently swallowed)

> "We're losing real money on this one. Salvador saw two of these in production yesterday." — Daniel`,
    status: "review",
    assigneeAgentId: "lt-qa",
    assigneeLabel: "QA",
    assigneeColor: "danger",
    costSoFar: 11.60,
    createdAt: "2026-04-16T10:30:00Z",
    updatedAt: "2026-04-19T09:48:00Z",
    priority: "p1",
    labels: ["checkout", "payments", "qa", "mobile", "revenue"],
    agentTimeMinutes: 220,
    tokenCostUsd: 4.40,
    createdBy: { id: "lt-qa", label: "QA Agent", kind: "agent" },
    lastUpdatedBy: { id: "lt-fe", label: "Frontend Agent", kind: "agent" },
    relatedTo: ["LT-243"],
    activity: [
      {
        id: "lt-249-a-1",
        type: "created",
        actorId: "lt-qa",
        actorType: "agent",
        actorLabel: "QA Agent",
        timestamp: "2026-04-16T10:30:00Z",
        description: "filed after running the mobile 3DS suite.",
      },
      {
        id: "lt-249-a-2",
        type: "assigned",
        actorId: "lt-ceo",
        actorType: "agent",
        actorLabel: "CEO Agent",
        timestamp: "2026-04-16T10:42:00Z",
        description: "assigned Frontend Agent.",
      },
      {
        id: "lt-249-a-3",
        type: "commented",
        actorId: "lt-fe",
        actorType: "agent",
        actorLabel: "Frontend Agent",
        timestamp: "2026-04-16T13:00:00Z",
        description: "asked a clarifying question.",
        meta: {
          comment:
            "Are we ok dropping the 'auto-retry on dismiss' UX? It's confusing on slow networks.",
        },
      },
      {
        id: "lt-249-a-4",
        type: "commented",
        actorId: "daniel",
        actorType: "human",
        actorLabel: "Daniel",
        timestamp: "2026-04-16T13:24:00Z",
        description: "answered.",
        meta: { comment: "Yes. Explicit retry button, no auto." },
      },
      {
        id: "lt-249-a-5",
        type: "commit_pushed",
        actorId: "lt-fe",
        actorType: "agent",
        actorLabel: "Frontend Agent",
        timestamp: "2026-04-17T11:09:00Z",
        description: "pushed checkout state machine.",
        meta: {
          commitSha: "76a3df2c0e9b4501",
          files: [
            "components/checkout/CheckoutMachine.ts",
            "components/checkout/PaymentStep.tsx",
          ],
        },
      },
      {
        id: "lt-249-a-6",
        type: "commit_pushed",
        actorId: "lt-fe",
        actorType: "agent",
        actorLabel: "Frontend Agent",
        timestamp: "2026-04-18T14:32:00Z",
        description: "wired Sentry capture for 3DS errors.",
        meta: {
          commitSha: "ba1c204fde9ec713",
          files: [
            "components/checkout/PaymentStep.tsx",
            "lib/observability/sentry.ts",
          ],
        },
      },
      {
        id: "lt-249-a-7",
        type: "review_completed",
        actorId: "lt-qa",
        actorType: "agent",
        actorLabel: "QA Agent",
        timestamp: "2026-04-19T08:20:00Z",
        description: "ran the 3DS suite again.",
        meta: {
          comment:
            "All 3 paths now show a retry CTA. Drop-off down to 0.8% in staging.",
        },
      },
      {
        id: "lt-249-a-8",
        type: "status_changed",
        actorId: "lt-fe",
        actorType: "agent",
        actorLabel: "Frontend Agent",
        timestamp: "2026-04-19T09:48:00Z",
        description: "moved to review.",
        meta: { fromStatus: "in-progress", toStatus: "review" },
      },
      {
        id: "lt-249-a-9",
        type: "review_requested",
        actorId: "lt-fe",
        actorType: "agent",
        actorLabel: "Frontend Agent",
        timestamp: "2026-04-19T09:50:00Z",
        description: "requested final sign-off from Daniel.",
      },
    ],
    codeChanges: [
      {
        filename: "components/checkout/CheckoutMachine.ts",
        status: "A",
        linesAdded: 88,
        linesRemoved: 0,
        diffSnippet: `--- /dev/null
+++ b/components/checkout/CheckoutMachine.ts
@@ -0,0 +1,88 @@
+type State =
+  | { kind: "idle" }
+  | { kind: "submitting" }
+  | { kind: "challenging" }
+  | { kind: "succeeded" }
+  | { kind: "failed"; reason: string; retriable: boolean };
+
+type Event =
+  | { type: "SUBMIT" }
+  | { type: "CHALLENGE" }
+  | { type: "OK" }
+  | { type: "FAIL"; reason: string; retriable: boolean }
+  | { type: "RETRY" };
+
+export function reduce(state: State, event: Event): State {
+  switch (event.type) {
+    case "SUBMIT":
+      return { kind: "submitting" };
+    case "CHALLENGE":
+      return { kind: "challenging" };
+    case "OK":
+      return { kind: "succeeded" };
+    case "FAIL":
+      return { kind: "failed", reason: event.reason, retriable: event.retriable };
+    case "RETRY":
+      return state.kind === "failed" && state.retriable
+        ? { kind: "idle" }
+        : state;
+  }
+}`,
      },
      {
        filename: "components/checkout/PaymentStep.tsx",
        status: "M",
        linesAdded: 56,
        linesRemoved: 12,
        diffSnippet: `--- a/components/checkout/PaymentStep.tsx
+++ b/components/checkout/PaymentStep.tsx
@@ -1,12 +1,56 @@
-export function PaymentStep() {
-  const stripe = useStripe();
-  return <button onClick={() => stripe.confirmPayment(...)}>Pay</button>;
-}
+export function PaymentStep() {
+  const stripe = useStripe();
+  const [state, send] = useReducer(reduce, { kind: "idle" });
+
+  async function pay() {
+    send({ type: "SUBMIT" });
+    const result = await stripe.confirmPayment({ /* ... */ });
+    if (result.error) {
+      Sentry.captureMessage("3ds-failure", {
+        extra: { code: result.error.code, message: result.error.message },
+      });
+      send({
+        type: "FAIL",
+        reason: result.error.message ?? "unknown",
+        retriable: result.error.code !== "card_declined",
+      });
+      return;
+    }
+    send({ type: "OK" });
+  }
+
+  if (state.kind === "failed") {
+    return (
+      <div>
+        <p>{state.reason}</p>
+        {state.retriable && <button onClick={() => send({ type: "RETRY" })}>Try again</button>}
+      </div>
+    );
+  }
+
+  return <button onClick={pay}>Pay</button>;
+}`,
      },
      {
        filename: "lib/observability/sentry.ts",
        status: "M",
        linesAdded: 12,
        linesRemoved: 2,
        diffSnippet: `--- a/lib/observability/sentry.ts
+++ b/lib/observability/sentry.ts
@@ -3,6 +3,16 @@
 export function captureMessage(name: string, ctx?: Record<string, unknown>) {
-  Sentry.captureMessage(name, { extra: ctx });
+  Sentry.captureMessage(name, {
+    level: "warning",
+    extra: { ...ctx, ts: Date.now() },
+    tags: { surface: "checkout" },
+  });
 }`,
      },
    ],
  },
  {
    id: "lt-244",
    code: "LT-244",
    title: "P&L chart — candle granularity preference",
    subtitle: "Ship blocker: preference persists but ignored on reload",
    description: "Fix localStorage sync race with Zustand hydration.",
    status: "in-progress",
    assigneeAgentId: "lt-fe",
    assigneeLabel: "FE",
    assigneeColor: "teal",
    costSoFar: 3.22,
    createdAt: "2026-04-15T14:45:00Z",
    priority: "p1",
    labels: ["bug", "frontend", "dashboard"],
    agentTimeMinutes: 80,
    tokenCostUsd: 1.60,
  },
  {
    id: "lt-243",
    code: "LT-243",
    title: "Broker API — Tradovate rate limit retries",
    subtitle: "429s during open · exponential backoff landed",
    description: "Implement adaptive backoff with jitter.",
    status: "done",
    assigneeAgentId: "lt-be",
    assigneeLabel: "BE",
    assigneeColor: "teal",
    costSoFar: 7.88,
    createdAt: "2026-04-14T08:00:00Z",
    priority: "p2",
    labels: ["backend", "api", "infra"],
    agentTimeMinutes: 160,
    tokenCostUsd: 3.20,
  },
  {
    id: "lt-242",
    code: "LT-242",
    title: "SEO — structured data for options strategies",
    subtitle: "Merged · awaiting Google indexing confirmation",
    description: "Add JSON-LD Article + HowTo schema to explainer pages.",
    status: "done",
    assigneeAgentId: "lt-seo",
    assigneeLabel: "SEO",
    assigneeColor: "teal",
    costSoFar: 1.40,
    createdAt: "2026-04-13T11:00:00Z",
    priority: "p3",
    labels: ["seo", "marketing"],
    agentTimeMinutes: 40,
    tokenCostUsd: 0.80,
  },
  {
    id: "lt-241",
    code: "LT-241",
    title: "Onboarding — Spanish locale pass",
    subtitle: "Merged · 42 strings translated · reviewed by Daniel",
    description: "Full ES pass on onboarding flow.",
    status: "done",
    assigneeAgentId: "lt-ceo",
    assigneeLabel: "CEO",
    assigneeColor: "brass",
    costSoFar: 2.60,
    createdAt: "2026-04-12T09:15:00Z",
    priority: "p3",
    labels: ["i18n", "onboarding"],
    agentTimeMinutes: 70,
    tokenCostUsd: 1.40,
  },
];

// ───── Live stream items (per company) ─────
const legacyStreamItems: StreamItem[] = [
  {
    id: "s-1",
    agentLabel: "DESIGN · OPUS",
    action: "thinking",
    timeLabel: "NOW",
    body: "Evaluating trade-offs between Kelly criterion and modified Sharpe for risk scoring. Engram has 3 prior decisions on this — loading context…",
  },
  {
    id: "s-2",
    agentLabel: "FE · SONNET",
    action: "writing",
    timeLabel: "2s",
    body: "Editing <code>components/dashboard/LiveChart.tsx</code> · WebSocket subscription refactor",
  },
  {
    id: "s-3",
    agentLabel: "QA · PLAYWRIGHT",
    action: "testing",
    timeLabel: "12s",
    body: "Running E2E suite on staging · <code>checkout.spec.ts</code> · 14/23 passed, 2 flaky, 0 failed",
  },
  {
    id: "s-4",
    agentLabel: "SALVADOR",
    action: "human commit",
    timeLabel: "4m",
    body: "Pushed 3 commits to <code>feature/profiler-v3</code> · Engram synced · your Claude will see on next pull",
  },
  {
    id: "s-5",
    agentLabel: "CEO · OPUS",
    action: "decision",
    timeLabel: "8m",
    body: "Approved spec handoff to Design phase · saved rationale to Engram as <code>sdd/profiler-v3/spec-rationale</code>",
  },
];

const emptyStream = (name: string): StreamItem[] => [
  {
    id: `${name}-s-1`,
    agentLabel: "CEO · OPUS",
    action: "idle",
    timeLabel: "12m",
    body: "No active pipelines · standing by for next briefing",
  },
];

// ───── Memories ─────
const MEMORY_CLUSTER_CENTERS: Record<
  Memory["type"],
  { x: number; y: number }
> = {
  decision: { x: -280, y: -190 },
  architecture: { x: 280, y: -190 },
  learning: { x: -280, y: 210 },
  bug: { x: 280, y: 210 },
};

function memoryPosition(
  type: Memory["type"],
  typeIndex: number,
  typeTotal: number
): { x: number; y: number } {
  const center = MEMORY_CLUSTER_CENTERS[type];
  if (typeTotal === 1) return { ...center };
  const angle = (typeIndex / typeTotal) * Math.PI * 2 - Math.PI / 2;
  const r = 110 + (typeIndex % 2) * 32;
  return {
    x: Math.round(center.x + Math.cos(angle) * r),
    y: Math.round(center.y + Math.sin(angle) * r),
  };
}

function assignMemoryPositions(
  memories: Omit<Memory, "position">[]
): Memory[] {
  const totals: Record<Memory["type"], number> = {
    decision: 0,
    bug: 0,
    architecture: 0,
    learning: 0,
  };
  memories.forEach((m) => {
    totals[m.type] += 1;
  });
  const seen: Record<Memory["type"], number> = {
    decision: 0,
    bug: 0,
    architecture: 0,
    learning: 0,
  };
  return memories.map((m) => {
    const i = seen[m.type]++;
    return { ...m, position: memoryPosition(m.type, i, totals[m.type]) };
  });
}

const legacyMemoriesRaw: Omit<Memory, "position">[] = [
  {
    id: "m-1",
    title: "Kelly criterion vs modified Sharpe for risk scoring",
    type: "decision",
    content:
      "Chose modified Sharpe after benchmarking both on 18mo of paper-traded data. Kelly over-weighted recent drawdowns — Bryan's profile flipped between conservative/aggressive every 2 weeks. Sharpe with 90d rolling window stabilizes the score.",
    savedBy: "CEO Agent",
    createdAt: "2026-04-17T15:00:00Z",
    tags: ["profiler", "risk", "architecture"],
    pipelineRef: { id: "pl-profiler", label: "Bryan AI — Profiler v3" },
    referencedCount: 14,
    lastAccessedAt: "2026-04-18T22:00:00Z",
  },
  {
    id: "m-2",
    title: "WebSocket flakiness on Safari mobile",
    type: "bug",
    content:
      "Safari iOS 17+ drops idle WebSockets after 60s even with keepalive headers. Fix: client-side ping every 30s, exponential reconnect on close. Affected the live P&L panel on iPad specifically.",
    savedBy: "Frontend Agent",
    createdAt: "2026-04-16T12:00:00Z",
    tags: ["safari", "websocket", "dashboard"],
    pipelineRef: { id: "pl-dashboard", label: "Dashboard — live P&L" },
    issueRef: { code: "LT-251", title: "iPad: P&L freezes after ~1min" },
    referencedCount: 8,
    lastAccessedAt: "2026-04-18T09:12:00Z",
  },
  {
    id: "m-3",
    title: "Clerk → NextAuth migration aborted",
    type: "decision",
    content:
      "2 security findings on JWT handling: (1) refresh tokens persisted in localStorage, (2) no rotation on privilege change. Revert to Clerk until Security Agent approves new design. Salvador has veto until re-review.",
    savedBy: "Salvador",
    createdAt: "2026-04-15T16:00:00Z",
    tags: ["auth", "security", "rollback"],
    pipelineRef: { id: "pl-auth", label: "Auth: Clerk → NextAuth" },
    referencedCount: 21,
    lastAccessedAt: "2026-04-18T17:45:00Z",
  },
  {
    id: "m-4",
    title: "Postgres options-greek cache: materialized view, refresh every 15m",
    type: "architecture",
    content:
      "Pre-compute delta/gamma/vega/theta in a materialized view keyed by (symbol, expiry, strike). Refresh on cron every 15min during market hours, full recompute nightly. Avoids hitting the options vendor on every P&L tick.",
    savedBy: "Backend Agent",
    createdAt: "2026-04-14T11:30:00Z",
    tags: ["postgres", "options", "performance"],
    pipelineRef: { id: "pl-dashboard", label: "Dashboard — live P&L" },
    referencedCount: 6,
    lastAccessedAt: "2026-04-17T14:00:00Z",
  },
  {
    id: "m-5",
    title: "Playwright flake: ResizeObserver loop on chart mount",
    type: "bug",
    content:
      "E2E failed intermittently on Firefox when mounting the P&L chart. Root cause: recharts triggers ResizeObserver during measurement. Wrapped the mount in a raf + added `waitForFunction('window.__chartReady')` hook.",
    savedBy: "QA Agent",
    createdAt: "2026-04-13T18:00:00Z",
    tags: ["playwright", "flake", "chart"],
    referencedCount: 4,
    lastAccessedAt: "2026-04-16T10:20:00Z",
  },
  {
    id: "m-6",
    title: "Daniel's voice: never use 'we' in external copy",
    type: "learning",
    content:
      "Rejected 3 marketing drafts because they used 'we'. Operator tone = 'Helm' or 'you'. Salvador confirmed — this is a hard rule, not a preference. Updated brand guide section 5.",
    savedBy: "Marketing Agent",
    createdAt: "2026-04-12T20:00:00Z",
    tags: ["brand", "copy", "voice"],
    referencedCount: 11,
    lastAccessedAt: "2026-04-18T08:30:00Z",
  },
  {
    id: "m-7",
    title: "Bilingual chat: switch happens on user lang, not agent",
    type: "decision",
    content:
      "Concierge agent defaulted to English even when Daniel typed in Spanish. Fix: detect per-message language via first-token heuristic, mirror it in response. ES/EN switch natural — no forced translation.",
    savedBy: "CEO Agent",
    createdAt: "2026-04-11T14:00:00Z",
    tags: ["bilingual", "es-en", "ux"],
    referencedCount: 9,
    lastAccessedAt: "2026-04-17T21:15:00Z",
  },
  {
    id: "m-8",
    title: "Vercel preview URLs must be password-protected",
    type: "learning",
    content:
      "Security Agent flagged that anon preview links leaked staging data to crawlers. Now: every preview deploy gated by Vercel password protection, rotated weekly. DevOps owns the rotation.",
    savedBy: "Security Agent",
    createdAt: "2026-04-10T09:00:00Z",
    tags: ["vercel", "security", "staging"],
    referencedCount: 5,
    lastAccessedAt: "2026-04-15T16:00:00Z",
  },
  {
    id: "m-9",
    title: "React 19 Actions: don't mix with Zustand in same component",
    type: "architecture",
    content:
      "Tried to combine useActionState with Zustand store updates — caused double renders and stale closure bugs. Rule: Actions for server-boundary forms, Zustand for client cache, never both in the same tree.",
    savedBy: "Frontend Agent",
    createdAt: "2026-04-09T13:00:00Z",
    tags: ["react-19", "actions", "zustand"],
    referencedCount: 7,
    lastAccessedAt: "2026-04-16T11:45:00Z",
  },
  {
    id: "m-10",
    title: "PR handoff notes: required format locked in",
    type: "decision",
    content:
      "Every phase handoff must include: (1) what was done, (2) what's next, (3) open questions, (4) memories created this phase. QA rejects handoffs missing any of the four. Enforced in PR template.",
    savedBy: "QA Agent",
    createdAt: "2026-04-08T17:00:00Z",
    tags: ["sdd", "handoff", "process"],
    referencedCount: 18,
    lastAccessedAt: "2026-04-18T19:00:00Z",
  },
  {
    id: "m-11",
    title: "Options vendor rate limit: 300 req/min, use batching",
    type: "learning",
    content:
      "Hit vendor rate limit during backtest. They only allow 300 symbols/min. Backend agent now batches option-chain fetches into groups of 50 with 10s spacing. Postmortem saved to Engram.",
    savedBy: "Backend Agent",
    createdAt: "2026-04-07T10:00:00Z",
    tags: ["api", "rate-limit", "options"],
    referencedCount: 3,
    lastAccessedAt: "2026-04-14T12:00:00Z",
  },
  {
    id: "m-12",
    title: "Modified Sharpe formula — exact coefficients",
    type: "architecture",
    content:
      "Final formula: (mean_excess_return / stddev) * (1 - 0.3 * max_drawdown_ratio). The 0.3 drawdown penalty came from fitting to Salvador's 2022-2024 live track record. Don't tweak without re-benchmarking.",
    savedBy: "CEO Agent",
    createdAt: "2026-04-06T15:30:00Z",
    tags: ["profiler", "formula", "risk"],
    pipelineRef: { id: "pl-profiler", label: "Bryan AI — Profiler v3" },
    referencedCount: 22,
    lastAccessedAt: "2026-04-18T22:30:00Z",
  },
  {
    id: "m-13",
    title: "Score recompute cadence: nightly batch + intraday deltas",
    type: "decision",
    content:
      "Full rescore runs at 02:30 UTC; intraday ticks update only the volatility band and exposure ratio, not the core Sharpe. Keeps Postgres CPU under 40% during market hours and avoids flicker in Bryan's portfolio view.",
    savedBy: "CEO Agent",
    createdAt: "2026-04-05T14:00:00Z",
    tags: ["profiler", "performance", "risk"],
    pipelineRef: { id: "pl-profiler", label: "Bryan AI — Profiler v3" },
    referencedCount: 9,
    lastAccessedAt: "2026-04-18T20:10:00Z",
  },
  {
    id: "m-14",
    title: "MFA required for accounts above $50k AUM",
    type: "decision",
    content:
      "Threshold came from Salvador's compliance risk sheet. TOTP mandatory, WebAuthn optional. Accounts below the line can opt in — UI nudges every 30 days but never blocks.",
    savedBy: "Security Agent",
    createdAt: "2026-04-04T11:00:00Z",
    tags: ["auth", "security", "mfa"],
    pipelineRef: { id: "pl-auth", label: "Auth: Clerk → NextAuth" },
    referencedCount: 16,
    lastAccessedAt: "2026-04-18T21:05:00Z",
  },
  {
    id: "m-15",
    title: "Session: 2h sliding window, 12h hard ceiling",
    type: "decision",
    content:
      "Sliding session refreshes on any authenticated request; absolute cap of 12h forces re-auth once per trading day. Aligns with FINRA guidance and matches Schwab's defaults. Salvador approved.",
    savedBy: "Security Agent",
    createdAt: "2026-04-03T09:30:00Z",
    tags: ["auth", "security", "session"],
    pipelineRef: { id: "pl-auth", label: "Auth: Clerk → NextAuth" },
    referencedCount: 11,
    lastAccessedAt: "2026-04-18T15:40:00Z",
  },
  {
    id: "m-16",
    title: "iPad landscape: 3-column P&L + order ticket side panel",
    type: "decision",
    content:
      "Portrait collapses to single-column; landscape keeps P&L, positions table, and a 320px order ticket. Decision driven by Bryan's screen usage — 82% landscape during market hours. Breakpoints locked at 1024px / 1366px.",
    savedBy: "Frontend Agent",
    createdAt: "2026-04-02T17:20:00Z",
    tags: ["dashboard", "ipad", "layout"],
    pipelineRef: { id: "pl-dashboard", label: "Dashboard — live P&L" },
    referencedCount: 5,
    lastAccessedAt: "2026-04-17T19:55:00Z",
  },
  {
    id: "m-17",
    title: "Scorer crashes on bond-only portfolios",
    type: "bug",
    content:
      "NaN propagates when options exposure ratio denominator is zero. Patch: return baseline score with a flag when no equity/options present. Caught during paper-trade of a pure fixed-income profile.",
    savedBy: "Backend Agent",
    createdAt: "2026-04-06T10:00:00Z",
    tags: ["profiler", "crash", "bonds"],
    pipelineRef: { id: "pl-profiler", label: "Bryan AI — Profiler v3" },
    issueRef: { code: "LT-278", title: "Scorer throws NaN on bond-only accounts" },
    referencedCount: 6,
    lastAccessedAt: "2026-04-18T11:15:00Z",
  },
  {
    id: "m-18",
    title: "Session cookie leaked via Vercel preview Referer header",
    type: "bug",
    content:
      "Preview deploy had no password gate; outbound links to third-party charts forwarded Referer including session_id fragment. Fixed by (1) enabling preview password, (2) stripping session_id from URL hash client-side on load.",
    savedBy: "Security Agent",
    createdAt: "2026-04-03T13:45:00Z",
    tags: ["auth", "security", "vercel"],
    pipelineRef: { id: "pl-auth", label: "Auth: Clerk → NextAuth" },
    issueRef: { code: "LT-266", title: "Preview deploy leaks session_id via Referer" },
    referencedCount: 12,
    lastAccessedAt: "2026-04-18T18:30:00Z",
  },
  {
    id: "m-19",
    title: "Event sourcing for portfolio history, 24h snapshots",
    type: "architecture",
    content:
      "Every position change emits an event to portfolio_events. Nightly snapshot materializes to portfolio_state. Replay from any snapshot reconstructs exact history — essential for audit and performance attribution.",
    savedBy: "Backend Agent",
    createdAt: "2026-04-05T09:00:00Z",
    tags: ["event-sourcing", "postgres", "audit"],
    referencedCount: 13,
    lastAccessedAt: "2026-04-18T14:00:00Z",
  },
  {
    id: "m-20",
    title: "Feature flags via Vercel Edge Config, 50ms TTL",
    type: "architecture",
    content:
      "Sub-100ms reads at the edge. Fallback to last-known flags if edge misses. Flag changes propagate globally in under 10s. Don't put user-specific rules here — only global kill-switches.",
    savedBy: "Backend Agent",
    createdAt: "2026-04-04T16:00:00Z",
    tags: ["vercel", "feature-flags", "performance"],
    referencedCount: 7,
    lastAccessedAt: "2026-04-17T10:20:00Z",
  },
  {
    id: "m-21",
    title: "Options-chain CDN cache, 30s TTL, varies by symbol",
    type: "architecture",
    content:
      "Cloudflare Workers fronting the options vendor. 30s TTL during market hours, 5min after close. Cache key = symbol + expiry bucket. Cut vendor traffic 68% without noticeable staleness in the P&L panel.",
    savedBy: "Backend Agent",
    createdAt: "2026-04-03T15:30:00Z",
    tags: ["options", "performance", "dashboard"],
    pipelineRef: { id: "pl-dashboard", label: "Dashboard — live P&L" },
    referencedCount: 10,
    lastAccessedAt: "2026-04-18T13:45:00Z",
  },
  {
    id: "m-22",
    title: "Audit log: append-only Postgres, S3 cold after 90d",
    type: "architecture",
    content:
      "All mutations write an append-only audit row (actor, action, before, after, timestamp). Rotate to S3 Glacier after 90 days. Read path for recent audits goes to hot table; historical lookup via Athena.",
    savedBy: "Backend Agent",
    createdAt: "2026-04-02T11:00:00Z",
    tags: ["audit", "postgres", "security"],
    referencedCount: 8,
    lastAccessedAt: "2026-04-16T09:30:00Z",
  },
  {
    id: "m-23",
    title: "Workflow rules in YAML, hot-reload in dev",
    type: "architecture",
    content:
      "Agent workflows declared in /workflows/*.yaml. Boot-time validation via Zod. Dev reloads on save; prod requires explicit deploy. Keeps non-engineers (ops, compliance) able to tweak routing without opening a PR.",
    savedBy: "Backend Agent",
    createdAt: "2026-04-01T14:15:00Z",
    tags: ["workflow", "yaml", "architecture"],
    referencedCount: 4,
    lastAccessedAt: "2026-04-15T08:00:00Z",
  },
  {
    id: "m-24",
    title: "Analytics via dedicated Postgres read replica, 15s lag ok",
    type: "architecture",
    content:
      "All heavy BI queries routed to replica.lt-prod.db. Primary stays <30% CPU. 15s replication lag is fine for analytics; anything needing sub-second freshness hits primary with a label override.",
    savedBy: "Backend Agent",
    createdAt: "2026-03-31T10:00:00Z",
    tags: ["postgres", "analytics", "performance"],
    referencedCount: 6,
    lastAccessedAt: "2026-04-14T12:00:00Z",
  },
  {
    id: "m-25",
    title: "Chart library rule: Recharts only, never Chart.js",
    type: "learning",
    content:
      "Chart.js pulls canvas + full chart types (~120KB gzipped). Recharts tree-shakes down to what you import. On the P&L panel we ship 14KB of Recharts vs ~95KB of Chart.js for the same visual. Locked in.",
    savedBy: "Frontend Agent",
    createdAt: "2026-04-05T18:00:00Z",
    tags: ["chart", "dashboard", "bundle-size"],
    pipelineRef: { id: "pl-dashboard", label: "Dashboard — live P&L" },
    referencedCount: 9,
    lastAccessedAt: "2026-04-18T12:10:00Z",
  },
  {
    id: "m-26",
    title: "OWASP ASVS Level 2 is the compliance bar",
    type: "learning",
    content:
      "All user-facing services must pass ASVS L2 checks before promotion to prod. Security Agent runs the checklist on every pipeline; failures block the verify phase. L3 reserved for anything handling fund movement.",
    savedBy: "Security Agent",
    createdAt: "2026-04-02T09:00:00Z",
    tags: ["security", "compliance", "auth"],
    pipelineRef: { id: "pl-auth", label: "Auth: Clerk → NextAuth" },
    referencedCount: 14,
    lastAccessedAt: "2026-04-18T16:45:00Z",
  },
];

const legacyMemories: Memory[] = assignMemoryPositions(legacyMemoriesRaw);

// ───── Skills (Knowledge) ─────
const legacySkills: Skill[] = [
  {
    id: "sk-react-19",
    name: "react-19-patterns",
    category: "frontend",
    description: "Actions, useActionState, useOptimistic, server-component boundaries.",
    usedByAgentIds: ["lt-fe", "lt-qa"],
    lastUpdatedAt: "2026-04-16T10:00:00Z",
    lastUpdatedBy: "Daniel",
    invocationsThisWeek: 47,
  },
  {
    id: "sk-nextjs-15",
    name: "nextjs-15-app-router",
    category: "frontend",
    description: "App Router conventions, parallel routes, intercepting routes, streaming.",
    usedByAgentIds: ["lt-fe", "lt-be"],
    lastUpdatedAt: "2026-04-15T09:00:00Z",
    lastUpdatedBy: "Daniel",
    invocationsThisWeek: 38,
  },
  {
    id: "sk-tailwind-4",
    name: "tailwind-4-tokens",
    category: "frontend",
    description: "@theme tokens, custom colors, OKLCH migration, v4 utility classes.",
    usedByAgentIds: ["lt-fe"],
    lastUpdatedAt: "2026-04-14T14:00:00Z",
    lastUpdatedBy: "Daniel",
    invocationsThisWeek: 22,
  },
  {
    id: "sk-typescript-strict",
    name: "typescript-strict",
    category: "frontend",
    description: "strict: true, noUncheckedIndexedAccess, satisfies, const-assertions.",
    usedByAgentIds: ["lt-fe", "lt-be", "lt-qa"],
    lastUpdatedAt: "2026-04-10T11:00:00Z",
    lastUpdatedBy: "Backend Agent",
    invocationsThisWeek: 31,
  },
  {
    id: "sk-playwright",
    name: "playwright-e2e",
    category: "frontend",
    description: "Multi-browser, trace viewer, network stubbing, visual regression.",
    usedByAgentIds: ["lt-qa"],
    lastUpdatedAt: "2026-04-12T16:00:00Z",
    lastUpdatedBy: "QA Agent",
    invocationsThisWeek: 15,
  },
  {
    id: "sk-postgres",
    name: "postgres-schemas",
    category: "backend",
    description: "Materialized views, partitioning, row-level security, explain analyze.",
    usedByAgentIds: ["lt-be"],
    lastUpdatedAt: "2026-04-14T11:00:00Z",
    lastUpdatedBy: "Backend Agent",
    invocationsThisWeek: 19,
  },
  {
    id: "sk-oauth",
    name: "oauth-flows",
    category: "security",
    description: "PKCE, refresh-token rotation, scopes, token binding.",
    usedByAgentIds: ["lt-be", "lt-sec"],
    lastUpdatedAt: "2026-04-15T10:00:00Z",
    lastUpdatedBy: "Security Agent",
    invocationsThisWeek: 8,
  },
  {
    id: "sk-websocket",
    name: "websocket-scaling",
    category: "backend",
    description: "Sticky sessions, Redis pub/sub, keepalive, graceful reconnect.",
    usedByAgentIds: ["lt-be", "lt-fe"],
    lastUpdatedAt: "2026-04-16T08:00:00Z",
    lastUpdatedBy: "Backend Agent",
    invocationsThisWeek: 12,
  },
  {
    id: "sk-kelly",
    name: "kelly-criterion-risk-scoring",
    category: "domain",
    description: "Fractional Kelly, drawdown-penalized variants, portfolio allocation sizing.",
    usedByAgentIds: ["lt-ceo", "lt-be"],
    lastUpdatedAt: "2026-04-17T14:00:00Z",
    lastUpdatedBy: "CEO Agent",
    invocationsThisWeek: 6,
  },
  {
    id: "sk-greeks",
    name: "options-greek-calculations",
    category: "domain",
    description: "Delta, gamma, vega, theta, rho — Black-Scholes and binomial models.",
    usedByAgentIds: ["lt-be", "lt-ceo"],
    lastUpdatedAt: "2026-04-14T11:30:00Z",
    lastUpdatedBy: "Backend Agent",
    invocationsThisWeek: 4,
  },
  {
    id: "sk-sharpe",
    name: "modified-sharpe-ratio",
    category: "domain",
    description: "Drawdown-penalized Sharpe, rolling windows, regime-aware coefficients.",
    usedByAgentIds: ["lt-ceo"],
    lastUpdatedAt: "2026-04-17T15:00:00Z",
    lastUpdatedBy: "CEO Agent",
    invocationsThisWeek: 9,
  },
  {
    id: "sk-secrets",
    name: "secrets-hygiene",
    category: "security",
    description: "No secrets in repo, rotated weekly, per-env vaults, audit on every PR.",
    usedByAgentIds: ["lt-sec", "lt-ops"],
    lastUpdatedAt: "2026-04-10T09:00:00Z",
    lastUpdatedBy: "Security Agent",
    invocationsThisWeek: 17,
  },
  {
    id: "sk-pr-review",
    name: "pr-review-checklist",
    category: "ops",
    description: "Tests pass, security scan clean, brand adherence, handoff notes complete.",
    usedByAgentIds: ["lt-qa", "lt-sec", "lt-ops"],
    lastUpdatedAt: "2026-04-11T09:00:00Z",
    lastUpdatedBy: "QA Agent",
    invocationsThisWeek: 28,
  },
  {
    id: "sk-commits",
    name: "commit-message-conventions",
    category: "ops",
    description: "Conventional commits, scope prefixes, body explains why not what.",
    usedByAgentIds: ["lt-fe", "lt-be", "lt-ops"],
    lastUpdatedAt: "2026-04-08T14:00:00Z",
    lastUpdatedBy: "DevOps Agent",
    invocationsThisWeek: 52,
  },
  {
    id: "sk-brand-voice",
    name: "daniel-brand-voice-es-en",
    category: "marketing",
    description: "Operator tone, em-dashes for asides, bilingual aware, never 'we'.",
    usedByAgentIds: ["lt-ceo", "lt-seo"],
    lastUpdatedAt: "2026-04-12T20:00:00Z",
    lastUpdatedBy: "Daniel",
    invocationsThisWeek: 14,
  },
];

// ───── Brand Guide (Knowledge) ─────
const legacyBrandGuide: BrandGuide = {
  updatedAt: "2026-04-17T10:00:00Z",
  updatedBy: "Daniel",
  referencedByAgentIds: ["lt-ceo", "lt-fe", "lt-seo"],
  voice: [
    {
      title: "Direct, no corporate fluff",
      detail: "Say the thing. No 'leverage synergies' — just the verb that matches the action.",
    },
    {
      title: "Bilingual aware (ES/EN)",
      detail: "Switch natural. Spanish for internal ops, English for product copy and external.",
    },
    {
      title: "Operator-to-operator",
      detail: "Never expert-to-beginner. The reader already runs their own company.",
    },
    {
      title: "Respect attention",
      detail: "Lead with the outcome. If the first sentence could be deleted, delete it.",
    },
    {
      title: "Show numbers when they matter",
      detail: "'47 issues closed' beats 'many issues closed'. Concrete > vague.",
    },
  ],
  colors: [
    { label: "Deep", hex: "#0c0a08", token: "bg-deep" },
    { label: "Page", hex: "#110f0c", token: "bg-page" },
    { label: "Surface", hex: "#1a1713", token: "bg-surface" },
    { label: "Elevated", hex: "#2a241d", token: "bg-elevated" },
    { label: "Brass", hex: "#c89b5e", token: "brass" },
    { label: "Brass bright", hex: "#e5b87a", token: "brass-bright" },
    { label: "Brass muted", hex: "#8a6d43", token: "brass-muted" },
    { label: "Teal", hex: "#4a7a82", token: "teal" },
    { label: "Success", hex: "#7ba05b", token: "success" },
    { label: "Warning", hex: "#d4a23e", token: "warning" },
    { label: "Danger", hex: "#c26b55", token: "danger" },
  ],
  typography: [
    {
      label: "Display serif",
      font: "serif",
      sample: "Pipelines in flight.",
      meta: "Fraunces · weight 300 · tracking -0.025em",
    },
    {
      label: "Display italic",
      font: "serif",
      sample: "What your agents know.",
      meta: "Fraunces italic · weight 400 · tracking -0.02em",
    },
    {
      label: "UI body",
      font: "sans",
      sample: "Direct, no corporate fluff. Say the thing.",
      meta: "Inter Tight · 14px · tracking -0.01em",
    },
    {
      label: "Mono meta",
      font: "mono",
      sample: "STARTED 2d AGO · PR #247 · DANIEL",
      meta: "JetBrains Mono · 11px · tracking 0.02em",
    },
    {
      label: "Mono label",
      font: "mono",
      sample: "PHASE TIMELINE",
      meta: "JetBrains Mono · 10px · tracking 0.15em · uppercase",
    },
  ],
  icons: [
    { name: "Home", role: "Command center" },
    { name: "GitBranch", role: "Activity / branches" },
    { name: "Layers", role: "Knowledge" },
    { name: "MessageSquare", role: "Helm Chat" },
    { name: "BarChart3", role: "Reports" },
    { name: "ChevronRight", role: "Breadcrumbs / drill-in" },
    { name: "CheckCircle2", role: "Done / success" },
    { name: "AlertTriangle", role: "Attention / blocked" },
    { name: "Clock", role: "Pending / queued" },
    { name: "Github", role: "PR / repo" },
  ],
  writing: [
    {
      rule: "Use em-dashes for asides, not commas",
      example: "The profiler — rebuilt last month — now uses modified Sharpe.",
    },
    {
      rule: "Avoid 'we' — use 'Helm' or 'you'",
      example: "Helm watches every pipeline. You approve what ships.",
    },
    {
      rule: "Numbers: cardinal under 10, digits over",
      example: "Three agents are idle. 47 issues closed this month.",
    },
    {
      rule: "Bilingual: ES for internal ops, EN for product copy",
      example: "Internal: 'Dale, mandá el handoff'. Product: 'Ship the handoff.'",
    },
    {
      rule: "No exclamation marks, ever",
      example: "'Pipeline done.' not 'Pipeline done!'",
    },
  ],
};

// ───── SOPs (Knowledge) ─────
const legacySOPs: SOP[] = [
  {
    id: "sop-deploy",
    title: "Deploy Process",
    description: "From PR open to production, the six-gate path.",
    linkedAgentIds: ["lt-be", "lt-qa", "lt-sec", "lt-ops"],
    triggeredThisMonth: 12,
    lastTriggeredAt: "2026-04-18T16:00:00Z",
    steps: [
      { title: "Code review", detail: "Backend or Frontend agent reviews the diff, checks patterns." },
      { title: "QA sign-off", detail: "Playwright e2e green on Chrome, Firefox, Safari." },
      { title: "Security scan", detail: "Security agent runs dep audit + secrets scan, must be clean." },
      { title: "Staging deploy", detail: "Auto-deploy to preview URL, password-protected." },
      { title: "Smoke test", detail: "3 critical paths exercised manually or by smoke script." },
      { title: "Prod rollout", detail: "Canary 10% → full. Rollback ready, DevOps on call." },
    ],
  },
  {
    id: "sop-pr-review",
    title: "PR Review Checklist",
    description: "Every PR, every time. No exceptions — ever.",
    linkedAgentIds: ["lt-qa", "lt-sec"],
    triggeredThisMonth: 28,
    lastTriggeredAt: "2026-04-18T21:00:00Z",
    steps: [
      { title: "Tests pass", detail: "pnpm typecheck && pnpm build && pnpm test:e2e all green." },
      { title: "Security scan clean", detail: "No new secrets, no new vulnerable deps." },
      { title: "Brand guide adherence", detail: "Copy matches voice, colors match tokens." },
      { title: "Handoff notes complete", detail: "Four sections: done, next, questions, memories." },
      { title: "Linked memories created", detail: "Every non-obvious decision gets an Engram entry." },
    ],
  },
  {
    id: "sop-agent-onboarding",
    title: "Agent Onboarding",
    description: "Spinning up a new agent inside an existing company.",
    linkedAgentIds: ["lt-ceo"],
    triggeredThisMonth: 2,
    lastTriggeredAt: "2026-04-11T09:00:00Z",
    steps: [
      { title: "Load persona from Knowledge", detail: "Pull role definition and skill list." },
      { title: "Load relevant skills", detail: "Category-matched skills auto-attached." },
      { title: "Seed memories from past similar tasks", detail: "Top 10 memories by tag relevance." },
      { title: "Intro call with CEO agent", detail: "Two-turn handshake confirming scope and budget." },
    ],
  },
  {
    id: "sop-incident",
    title: "Incident Response",
    description: "Prod broke. Here's the five-step lane.",
    linkedAgentIds: ["lt-ops", "lt-be", "lt-sec"],
    triggeredThisMonth: 1,
    lastTriggeredAt: "2026-04-13T02:30:00Z",
    steps: [
      { title: "Detect", detail: "Alert fires or user reports. Page on-call agent + Daniel." },
      { title: "Isolate", detail: "Identify blast radius. Flip feature flag if possible." },
      { title: "Rollback", detail: "Revert to last known good deploy. Confirm recovery." },
      { title: "Investigate", detail: "Root cause. Repro locally. Write fix on branch." },
      { title: "Postmortem", detail: "Blameless. Memory saved to Engram on resolution." },
    ],
  },
  {
    id: "sop-quality",
    title: "Code Quality Gates",
    description: "Four machines that must say yes before merge.",
    linkedAgentIds: ["lt-qa", "lt-fe", "lt-be"],
    triggeredThisMonth: 34,
    lastTriggeredAt: "2026-04-18T20:10:00Z",
    steps: [
      { title: "pnpm typecheck", detail: "Zero errors. No 'any' escapes unless justified in comment." },
      { title: "pnpm build", detail: "Next.js build green, no warnings flagged as errors." },
      { title: "playwright e2e", detail: "Full suite on Chrome + Firefox + Safari." },
      { title: "No console.errors", detail: "Dev-server run, exercise golden path, check console." },
    ],
  },
  {
    id: "sop-bilingual-support",
    title: "Bilingual Customer Support",
    description: "Flagler BNB playbook, applicable to any customer-facing support.",
    linkedAgentIds: ["lt-seo"],
    triggeredThisMonth: 6,
    lastTriggeredAt: "2026-04-17T18:00:00Z",
    steps: [
      { title: "Respond in <90s", detail: "First-touch latency is the #1 driver of NPS." },
      { title: "Tone: warm but precise", detail: "No fake empathy. Just acknowledge + solve." },
      { title: "Match guest language", detail: "ES/EN detected per message. Mirror, don't translate." },
      { title: "Escalate to human if >2 turns", detail: "Loop Salvador or Daniel on the third reply." },
    ],
  },
];

// ───── Companies ─────
export const seedCompanies: Company[] = [
  {
    id: "legacy-traders",
    name: "Legacy Traders",
    slug: "legacy-traders",
    colorHex: "#c26b55",
    industry: "Trading · SaaS",
    status: "active",
    monthlyBudget: 1200,
    monthlySpendMtd: 684,
    openTickets: 12,
    closedTickets: 47,
    activePipelines: 3,
    agents: [
      mkCEO("lt-ceo"),
      mkFrontend("lt-fe"),
      mkBackend("lt-be"),
      mkDevOps("lt-ops"),
      mkQA("lt-qa"),
      mkSecurity("lt-sec"),
      mkSEO("lt-seo"),
    ],
    humans: [salvador, daniel],
    pipelines: [legacyProfilerPipeline, legacyDashboardPipeline, legacyAuthPipeline],
    issues: legacyIssues,
    memories: legacyMemories,
    streamItems: legacyStreamItems,
    skills: legacySkills,
    brandGuide: legacyBrandGuide,
    sops: legacySOPs,
    todaySpend: 38.12,
    yesterdaySpend: 48.90,
    daysLeftInMonth: 12,
    stagePills: ["Trading · SaaS", "Production", "+Salvador"],
    keyMetric: { label: "Velocity", value: "↑ 2.3×", sub: "vs solo" },
  },
  {
    id: "multi-topup",
    name: "Multi Topup",
    slug: "multi-topup",
    colorHex: "#4a7a82",
    industry: "SaaS · Custom Software",
    status: "active",
    monthlyBudget: 800,
    monthlySpendMtd: 312,
    openTickets: 4,
    closedTickets: 23,
    activePipelines: 1,
    agents: [mkCEO("mt-ceo"), mkFrontend("mt-fe"), mkBackend("mt-be"), mkQA("mt-qa")],
    humans: [daniel],
    pipelines: [],
    issues: [],
    memories: [],
    streamItems: emptyStream("mt"),
    todaySpend: 14.20,
    yesterdaySpend: 22.80,
    daysLeftInMonth: 12,
    stagePills: ["SaaS", "Active"],
  },
  {
    id: "mh-home-solutions",
    name: "MH Home Solutions",
    slug: "mh-home-solutions",
    colorHex: "#7ba05b",
    industry: "Home Services · Local",
    status: "attention",
    monthlyBudget: 400,
    monthlySpendMtd: 142,
    openTickets: 7,
    closedTickets: 18,
    activePipelines: 1,
    agents: [mkCEO("mh-ceo"), mkMarketing("mh-mkt"), mkFrontend("mh-fe"), mkSEO("mh-seo"), mkQA("mh-qa")],
    humans: [daniel],
    pipelines: [],
    issues: [],
    memories: [],
    streamItems: emptyStream("mh"),
    todaySpend: 6.40,
    yesterdaySpend: 9.10,
    daysLeftInMonth: 12,
    stagePills: ["Local services", "Growth"],
    keyMetric: { label: "Leads / week", value: "23", sub: "qualified" },
  },
  {
    id: "flagler-bnb",
    name: "Flagler Beach BNB",
    slug: "flagler-bnb",
    colorHex: "#d4a23e",
    industry: "Hospitality · STR",
    status: "active",
    monthlyBudget: 200,
    monthlySpendMtd: 48,
    openTickets: 3,
    closedTickets: 31,
    activePipelines: 0,
    agents: [mkCEO("fb-ceo"), mkConcierge("fb-g", "Guest Concierge"), mkConcierge("fb-h", "Host Assistant")],
    humans: [daniel],
    pipelines: [],
    issues: [],
    memories: [],
    streamItems: emptyStream("fb"),
    todaySpend: 1.80,
    yesterdaySpend: 2.40,
    daysLeftInMonth: 12,
    stagePills: ["Hospitality", "Ops"],
    keyMetric: { label: "Occupancy", value: "87%", sub: "next 60d" },
  },
  {
    id: "charge2go",
    name: "Charge2Go",
    slug: "charge2go",
    colorHex: "#c89b5e",
    industry: "EV Infrastructure",
    status: "active",
    monthlyBudget: 600,
    monthlySpendMtd: 268,
    openTickets: 5,
    closedTickets: 14,
    activePipelines: 2,
    agents: [mkCEO("c2g-ceo"), mkFrontend("c2g-fe"), mkBackend("c2g-be"), mkDevOps("c2g-ops"), mkSEO("c2g-seo")],
    humans: [daniel],
    pipelines: [],
    issues: [],
    memories: [],
    streamItems: emptyStream("c2g"),
    todaySpend: 12.10,
    yesterdaySpend: 18.50,
    daysLeftInMonth: 12,
    stagePills: ["Infra", "Active"],
  },
  {
    id: "minari",
    name: "Minari Solutions",
    slug: "minari",
    colorHex: "#8a6d43",
    industry: "Custom Software",
    status: "active",
    monthlyBudget: 300,
    monthlySpendMtd: 87,
    openTickets: 2,
    closedTickets: 8,
    activePipelines: 1,
    agents: [mkCEO("mn-ceo"), mkBackend("mn-be")],
    humans: [daniel],
    pipelines: [],
    issues: [],
    memories: [],
    streamItems: emptyStream("mn"),
    todaySpend: 3.20,
    yesterdaySpend: 4.60,
    daysLeftInMonth: 12,
    stagePills: ["Custom", "Active"],
  },
];

// ───── Approvals ─────
export const seedApprovals: Approval[] = [
  {
    id: "app-1",
    companyId: "legacy-traders",
    companyName: "Legacy Traders",
    type: "hire",
    title: "Hire: Backend Engineer",
    description: "CEO agent requests backend hire for Bryan AI profiler refactor. GPT-5.4 recommended.",
    requesterAgentLabel: "CEO Agent",
    tag: "$400/mo cap",
    createdAt: "2026-04-18T09:15:00Z",
  },
  {
    id: "app-2",
    companyId: "legacy-traders",
    companyName: "Legacy Traders",
    type: "deploy",
    title: "Deploy to production",
    description: "Checkout v2 passed all QA gates. Playwright E2E ✓ · Security scan ✓",
    requesterAgentLabel: "Backend Agent",
    tag: "Legacy Traders",
    createdAt: "2026-04-18T09:40:00Z",
    impact: {
      "Users affected": "1,247 active",
      "QA pass rate": "100%",
      "Rollback ready": "Yes · 15s",
      "Security scan": "Clean",
    },
  },
  {
    id: "app-3",
    companyId: "mh-home-solutions",
    companyName: "MH Home Solutions",
    type: "budget",
    title: "Budget increase request",
    description: "Marketing agent wants +$150/mo for paid lead acquisition experiments.",
    requesterAgentLabel: "Marketing Agent",
    tag: "+$150/mo",
    createdAt: "2026-04-18T08:20:00Z",
  },
  {
    id: "app-4",
    companyId: "charge2go",
    companyName: "Charge2Go",
    type: "spec-review",
    title: "Spec review: EV Station Finder PRD",
    description: "New sub-product PRD ready for your sign-off before pipeline kicks off.",
    requesterAgentLabel: "CEO Agent",
    tag: "Pre-pipeline",
    createdAt: "2026-04-18T10:05:00Z",
  },
];

// ───── Activity stream ─────
export const seedActivityStream: ActivityEntry[] = [
  {
    id: "a-1",
    timestamp: "2026-04-18T10:41:00Z",
    level: "success",
    agentLabel: "Frontend Dev · Sonnet",
    companyName: "Legacy Traders",
    text: "shipped checkout flow v2 to staging",
    meta: "QA verification passed · 1m 24s · $0.42",
  },
  {
    id: "a-2",
    timestamp: "2026-04-18T10:29:00Z",
    level: "warning",
    agentLabel: "Security Advisor · Opus",
    companyName: "Legacy Traders",
    text: "flagged 2 findings on auth refactor",
    meta: "Awaiting your review · 12m ago",
  },
  {
    id: "a-3",
    timestamp: "2026-04-18T10:07:00Z",
    level: "neutral",
    agentLabel: "Interview Agent",
    companyName: "Charge2Go",
    text: "drafted PRD for EV Station Finder Mobile",
    meta: "Converted to Company · ready for kickoff · 34m ago",
  },
  {
    id: "a-4",
    timestamp: "2026-04-18T09:55:00Z",
    level: "success",
    agentLabel: "Guest Concierge",
    companyName: "Flagler BNB",
    text: "replied to 4 Airbnb inquiries in ES + EN",
    meta: "All under 90s response time · $0.06 total",
  },
];

// ───── Threads (Helm Chat) ─────
export const seedThreads: Thread[] = [
  {
    id: "t-ev-finder",
    title: "EV Station Finder",
    role: "interview",
    messages: [
      {
        id: "m1",
        role: "assistant",
        content:
          "Hola, soy el Interview Agent. Vamos a convertir una idea en una empresa lista para ejecutar. Respondé crudo, como a un socio.\n\n¿Qué estás tratando de construir — y para quién duele tanto este problema que lo pagarían hoy?",
        timestamp: "2026-04-18T11:42:00Z",
      },
      {
        id: "m2",
        role: "user",
        content:
          "Los dueños de Teslas en Florida se frustran cuando viajan a zonas nuevas porque los estimados de las apps no consideran elevación, viento ni clima. La gente termina llegando con 4% de batería o manejando 30 millas fuera de ruta a un charger equivocado. Tengo la data de carga de Charge2Go pero necesito un front para dueños de EV, no para operadores de stations.",
        timestamp: "2026-04-18T11:43:00Z",
        attachments: [
          { id: "att-1", type: "pdf", fileName: "charge2go-research.pdf", sizeLabel: "2.4 MB · 18 pages" },
          { id: "att-2", type: "image", fileName: "whiteboard-sketch.jpg", sizeLabel: "1.1 MB · from iPhone" },
        ],
      },
      {
        id: "m3",
        role: "assistant",
        content:
          "Leí el PDF y el sketch. Entiendo tres cosas: es B2C, datos reales de Charge2Go, y la ventaja competitiva es física (weather + elevation), no mejor UI.\n\nAntes de armarte el PRD, dos cosas que definen el stack:",
        timestamp: "2026-04-18T11:43:30Z",
        suggestionGroups: [
          { label: "Form factor", options: ["🚗 Mobile-first (PWA)", "💻 Landing + web app", "📱 Native app (iOS + Android)"] },
          { label: "Timeline", options: ["⚡ MVP en 2 semanas", "🎯 Producto sólido en 6 semanas", "🏗️ Plataforma completa en 12"] },
        ],
        prdPreview: {
          title: "EV Station Finder",
          description:
            "Mobile-first PWA for EV owners in Florida. Real-time range estimates factoring weather, elevation, and live charger availability from the Charge2Go network.",
          stackPills: ["Next.js 15", "Tailwind", "PWA"],
          parentCompany: "Charge2Go (new sub-product)",
          coreFeatures: "Map · Range calc · Weather API · Live availability",
          agentsToHire: "CEO · Frontend · Backend · QA · SEO",
          confidencePercent: 94,
        },
      },
    ],
    createdAt: "2026-04-18T11:42:00Z",
    updatedAt: "2026-04-18T11:43:30Z",
    totalCost: 0.34,
  },
  {
    id: "t-mh-pricing",
    title: "MH pricing calc",
    role: "strategy",
    messages: [],
    createdAt: "2026-04-17T16:20:00Z",
    updatedAt: "2026-04-17T16:55:00Z",
    totalCost: 0.18,
  },
  {
    id: "t-trading-journal",
    title: "Trading journal v3",
    role: "architect",
    messages: [],
    createdAt: "2026-04-15T09:00:00Z",
    updatedAt: "2026-04-16T14:10:00Z",
    totalCost: 0.52,
  },
  {
    id: "t-dock-pilings",
    title: "Dock pilings Q&A",
    role: "interview",
    messages: [],
    createdAt: "2026-04-13T11:45:00Z",
    updatedAt: "2026-04-13T12:10:00Z",
    totalCost: 0.09,
  },
  {
    id: "t-bryan-roadmap",
    title: "Bryan AI roadmap",
    role: "strategy",
    messages: [],
    createdAt: "2026-04-10T10:15:00Z",
    updatedAt: "2026-04-12T17:40:00Z",
    totalCost: 0.71,
  },
];

// ───── Roles (chat sidebar) ─────
export const seedRoles: AgentRole[] = [
  {
    id: "interview",
    name: "Interview Agent",
    model: "Opus 4.7",
    meta: "bilingual",
    colorHex: "#c89b5e",
  },
  {
    id: "strategy",
    name: "Strategy Advisor",
    model: "Opus 4.7",
    meta: "market · positioning",
    colorHex: "#4a7a82",
  },
  {
    id: "architect",
    name: "Technical Architect",
    model: "Sonnet · GPT-5.4",
    meta: "stack · tradeoffs",
    colorHex: "#7ba05b",
  },
  {
    id: "reviewer",
    name: "QA Reviewer",
    model: "Codex · Playwright",
    meta: "testable · edge cases",
    colorHex: "#d4a23e",
  },
];

// ───── PRD draft progress (right panel) ─────
export const seedPRDDraft: PRDSection[] = [
  { id: "problem", label: "Problem statement", status: "done" },
  { id: "users", label: "Target users", status: "done" },
  { id: "metrics", label: "Success metrics", status: "in-progress" },
  { id: "competitive", label: "Competitive landscape", status: "pending" },
  { id: "tech", label: "Tech requirements", status: "pending" },
];

// ───── Inspiration cards (right panel) ─────
export const seedInspiration: InspirationCard[] = [
  {
    id: "insp-1",
    title: "Mercado Libre logistics",
    subtitle: "Real-time fleet visibility · route optimization at LATAM scale",
    sourceUrl: "envios.mercadolibre.com",
    tag: "Logistics",
  },
  {
    id: "insp-2",
    title: "Tesla Supercharger Map",
    subtitle: "Live availability · queue time · trip planner baseline",
    sourceUrl: "tesla.com/findus",
    tag: "Reference UX",
  },
];

// ───── Interview Agent ghost messages (demo mode) ─────
export const interviewGhostMessages: string[] = [
  "Una pregunta más antes de firmar el PRD: ¿cómo monetizás? ¿suscripción a dueños de EV, revenue share con Charge2Go, o data-as-a-service a fleets?",
  "Pensando en modo negocio: ¿qué pasaría si Tesla lanza la misma feature en 6 semanas? ¿Tu ventaja aguanta o necesitamos pivote?",
  "Te escuché. Antes de cerrar, ¿hay un guardrail no-negociable? ej: no vender ubicación, no push notifications agresivas, no dark patterns.",
];

// ───── EV Station Finder Company seed (built on Convert) ─────
export function buildEVStationFinderCompany(): Company {
  const discoveryPipeline: Pipeline = {
    id: "p-evsf-discovery",
    featureName: "Discovery — Florida EV owner research",
    startedAt: "2026-04-18T12:00:00Z",
    ownerAgentId: "evsf-ceo",
    currentPhaseIndex: 1,
    progressPercent: 18,
    phases: [
      { name: "explore", displayName: "Explore", status: "done", assignedLabel: "CEO", durationLabel: "✓ 4m" },
      { name: "propose", displayName: "Propose", status: "active", assignedLabel: "CEO", durationLabel: "● running" },
      { name: "spec", displayName: "Spec", status: "pending", assignedLabel: "Arch", durationLabel: "queued" },
      { name: "design", displayName: "Design", status: "pending", assignedLabel: "Opus", durationLabel: "—" },
      { name: "implement", displayName: "Implement", status: "pending", assignedLabel: "FE + BE", durationLabel: "—" },
      { name: "verify", displayName: "Verify", status: "pending", assignedLabel: "QA", durationLabel: "—" },
      { name: "archive", displayName: "Archive", status: "pending", assignedLabel: "Docs", durationLabel: "—" },
    ],
  };

  const mvpPipeline: Pipeline = {
    id: "p-evsf-mvp",
    featureName: "MVP — Map + range calc + live availability",
    startedAt: "2026-04-18T12:00:00Z",
    ownerAgentId: "evsf-fe",
    currentPhaseIndex: 0,
    progressPercent: 4,
    phases: [
      { name: "explore", displayName: "Explore", status: "active", assignedLabel: "FE", durationLabel: "● starting" },
      { name: "propose", displayName: "Propose", status: "pending", assignedLabel: "FE", durationLabel: "queued" },
      { name: "spec", displayName: "Spec", status: "pending", assignedLabel: "Arch", durationLabel: "—" },
      { name: "design", displayName: "Design", status: "pending", assignedLabel: "Opus", durationLabel: "—" },
      { name: "implement", displayName: "Implement", status: "pending", assignedLabel: "FE + BE", durationLabel: "—" },
      { name: "verify", displayName: "Verify", status: "pending", assignedLabel: "QA", durationLabel: "—" },
      { name: "archive", displayName: "Archive", status: "pending", assignedLabel: "Docs", durationLabel: "—" },
    ],
  };

  const launchPipeline: Pipeline = {
    id: "p-evsf-launch",
    featureName: "Launch — App store, PWA install, onboarding",
    startedAt: "2026-04-18T12:00:00Z",
    ownerAgentId: "evsf-ceo",
    currentPhaseIndex: 0,
    progressPercent: 0,
    phases: [
      { name: "explore", displayName: "Explore", status: "pending", assignedLabel: "CEO", durationLabel: "scheduled" },
      { name: "propose", displayName: "Propose", status: "pending", assignedLabel: "CEO", durationLabel: "—" },
      { name: "spec", displayName: "Spec", status: "pending", assignedLabel: "Arch", durationLabel: "—" },
      { name: "design", displayName: "Design", status: "pending", assignedLabel: "Opus", durationLabel: "—" },
      { name: "implement", displayName: "Implement", status: "pending", assignedLabel: "FE", durationLabel: "—" },
      { name: "verify", displayName: "Verify", status: "pending", assignedLabel: "QA", durationLabel: "—" },
      { name: "archive", displayName: "Archive", status: "pending", assignedLabel: "Docs", durationLabel: "—" },
    ],
  };

  const issues: Issue[] = [
    {
      id: "evsf-001",
      code: "EVSF-001",
      title: "Research: Florida EV owner pain points",
      subtitle: "Discovery · 10 interviews target · ES + EN",
      description: "Surface top 3 unmet needs for range anxiety on long FL routes.",
      status: "in-progress",
      assigneeAgentId: "evsf-ceo",
      assigneeLabel: "CEO",
      assigneeColor: "brass",
      pipelineId: "p-evsf-discovery",
      costSoFar: 0.04,
      createdAt: "2026-04-18T12:00:00Z",
      priority: "p1",
      labels: ["discovery", "research", "ux"],
      agentTimeMinutes: 60,
      tokenCostUsd: 1.20,
    },
    {
      id: "evsf-002",
      code: "EVSF-002",
      title: "Integrate Charge2Go live availability API",
      subtitle: "MVP · backend · auth + rate limits",
      description: "Connect internal Charge2Go feed with per-station availability.",
      status: "queued",
      assigneeAgentId: "evsf-be",
      assigneeLabel: "BE",
      assigneeColor: "teal",
      pipelineId: "p-evsf-mvp",
      costSoFar: 0,
      createdAt: "2026-04-18T12:00:00Z",
      priority: "p1",
      labels: ["backend", "api", "integration"],
      agentTimeMinutes: 0,
      tokenCostUsd: 0,
    },
    {
      id: "evsf-003",
      code: "EVSF-003",
      title: "Weather + elevation-aware range estimator",
      subtitle: "Core differentiator · physics model",
      description: "Adjust remaining range using NOAA wind + 10m elevation DEM.",
      status: "queued",
      assigneeAgentId: "evsf-be",
      assigneeLabel: "BE",
      assigneeColor: "teal",
      pipelineId: "p-evsf-mvp",
      costSoFar: 0,
      createdAt: "2026-04-18T12:00:00Z",
      priority: "p0",
      labels: ["backend", "ml", "core"],
      agentTimeMinutes: 0,
      tokenCostUsd: 0,
    },
    {
      id: "evsf-004",
      code: "EVSF-004",
      title: "Map view with live charger pins",
      subtitle: "Mapbox · color-coded availability",
      description: "Mobile-first map with clustering + charger detail sheet.",
      status: "queued",
      assigneeAgentId: "evsf-fe",
      assigneeLabel: "FE",
      assigneeColor: "teal",
      pipelineId: "p-evsf-mvp",
      costSoFar: 0,
      createdAt: "2026-04-18T12:00:00Z",
      priority: "p1",
      labels: ["frontend", "mobile", "mapbox"],
      agentTimeMinutes: 0,
      tokenCostUsd: 0,
    },
    {
      id: "evsf-005",
      code: "EVSF-005",
      title: "PWA shell + install prompt",
      subtitle: "Launch · offline map cache",
      description: "Service worker + manifest + install UX.",
      status: "queued",
      assigneeAgentId: "evsf-fe",
      assigneeLabel: "FE",
      assigneeColor: "teal",
      pipelineId: "p-evsf-launch",
      costSoFar: 0,
      createdAt: "2026-04-18T12:00:00Z",
      priority: "p2",
      labels: ["frontend", "pwa", "launch"],
      agentTimeMinutes: 0,
      tokenCostUsd: 0,
    },
    {
      id: "evsf-006",
      code: "EVSF-006",
      title: "Onboarding: select your EV model",
      subtitle: "Pre-populate battery curve per model",
      description: "Model picker → battery profile → personalized range UX.",
      status: "queued",
      assigneeAgentId: "evsf-fe",
      assigneeLabel: "FE",
      assigneeColor: "teal",
      pipelineId: "p-evsf-launch",
      costSoFar: 0,
      createdAt: "2026-04-18T12:00:00Z",
      priority: "p2",
      labels: ["frontend", "onboarding"],
      agentTimeMinutes: 0,
      tokenCostUsd: 0,
    },
    {
      id: "evsf-007",
      code: "EVSF-007",
      title: "E2E test harness: Miami → Orlando trip",
      subtitle: "Playwright · mock GPS · edge-case coverage",
      description: "Automated trip sim with dead-battery and reroute paths.",
      status: "queued",
      assigneeAgentId: "evsf-qa",
      assigneeLabel: "QA",
      assigneeColor: "danger",
      pipelineId: "p-evsf-mvp",
      costSoFar: 0,
      createdAt: "2026-04-18T12:00:00Z",
      priority: "p2",
      labels: ["qa", "testing", "e2e"],
      agentTimeMinutes: 0,
      tokenCostUsd: 0,
    },
    {
      id: "evsf-008",
      code: "EVSF-008",
      title: "SEO landing: florida-ev-charger-map",
      subtitle: "ES + EN · structured data · long-tail",
      description: "Static SEO surface to drive acquisition.",
      status: "queued",
      assigneeLabel: "SEO",
      assigneeColor: "teal",
      pipelineId: "p-evsf-launch",
      costSoFar: 0,
      createdAt: "2026-04-18T12:00:00Z",
      priority: "p3",
      labels: ["seo", "marketing", "i18n"],
      agentTimeMinutes: 0,
      tokenCostUsd: 0,
    },
  ];

  const streamItems: StreamItem[] = [
    {
      id: "evsf-s-1",
      agentLabel: "CEO · OPUS",
      action: "provisioning",
      timeLabel: "NOW",
      body: "Context graph seeded from <code>t-ev-finder</code> · 47 memories linked from Charge2Go",
    },
    {
      id: "evsf-s-2",
      agentLabel: "FE · SONNET",
      action: "scaffolding",
      timeLabel: "2s",
      body: "Generating <code>app/(map)</code> route group + PWA manifest",
    },
    {
      id: "evsf-s-3",
      agentLabel: "BE · GPT-5.4",
      action: "planning",
      timeLabel: "8s",
      body: "Drafting physics-aware range calc spec · weather API shortlist",
    },
  ];

  return {
    id: "ev-station-finder",
    name: "EV Station Finder",
    slug: "ev-station-finder",
    colorHex: "#c89b5e",
    industry: "EV · Mobile",
    status: "active",
    monthlyBudget: 500,
    monthlySpendMtd: 0,
    openTickets: issues.filter((i) => i.status !== "done").length,
    closedTickets: 0,
    activePipelines: 3,
    agents: [
      mkCEO("evsf-ceo"),
      mkFrontend("evsf-fe"),
      mkBackend("evsf-be"),
      mkQA("evsf-qa"),
    ],
    humans: [daniel],
    pipelines: [discoveryPipeline, mvpPipeline, launchPipeline],
    issues,
    memories: [],
    streamItems,
    todaySpend: 0.04,
    yesterdaySpend: 0,
    daysLeftInMonth: 12,
    stagePills: ["EV · Mobile", "Just created", "Charge2Go sub-product"],
    keyMetric: { label: "PRD confidence", value: "94%", sub: "auto-generated" },
  };
}
