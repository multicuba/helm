export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  initials: string;
}

export interface Company {
  id: string;
  name: string;
  slug: string;
  colorHex: string;
  industry: string;
  status: "active" | "attention" | "paused";
  monthlyBudget: number;
  monthlySpendMtd: number;
  openTickets: number;
  closedTickets: number;
  activePipelines: number;
  agents: Agent[];
  humans: Human[];
  pipelines: Pipeline[];
  issues: Issue[];
  memories: Memory[];
  streamItems: StreamItem[];
  todaySpend: number;
  yesterdaySpend: number;
  daysLeftInMonth?: number;
  stagePills?: string[];
  keyMetric?: { label: string; value: string; sub?: string };
}

export interface StreamItem {
  id: string;
  agentLabel: string; // e.g. "DESIGN · OPUS"
  action: string; // e.g. "thinking", "writing"
  timeLabel: string; // e.g. "NOW", "2s", "4m"
  body: string; // may include <code>…</code> spans
}

export interface Agent {
  id: string;
  role: string;
  shortRole: string;
  roleColor: "brass" | "teal" | "success" | "warning" | "danger" | "neutral";
  name: string;
  model: string;
  provider: "anthropic" | "openai" | "google" | "custom";
  status: "working" | "idle" | "blocked" | "offline";
  currentTaskId?: string;
  todayCost: number;
  lifetimeCost: number;
  skills: string[];
  persona: string;
}

export interface Human {
  id: string;
  name: string;
  role: string;
  status: "online" | "offline";
  initials: string;
}

export type SDDPhaseName =
  | "explore"
  | "propose"
  | "spec"
  | "design"
  | "implement"
  | "verify"
  | "archive";

export interface Pipeline {
  id: string;
  featureName: string;
  startedAt: string; // ISO
  ownerAgentId: string;
  phases: SDDPhase[];
  currentPhaseIndex: number;
  prNumber?: number;
  progressPercent: number;
  events?: PipelineEvent[];
}

export interface SDDPhase {
  name: SDDPhaseName;
  displayName: string;
  status: "pending" | "active" | "done" | "blocked";
  assignedAgentId?: string;
  assignedLabel?: string;
  durationLabel?: string;
  notes?: string;
  startedAt?: string;
  completedAt?: string;
  turnsUsed?: number;
  cost?: number;
  artifacts?: PhaseArtifact[];
  handoffNote?: string;
}

export interface PhaseArtifact {
  id: string;
  name: string;
  size?: string;
  type: "doc" | "spec" | "design" | "code" | "report" | "summary";
  href?: string;
}

export type PipelineEventType =
  | "phase_started"
  | "phase_completed"
  | "handoff"
  | "review_approved"
  | "commit_pushed";

export interface PipelineEvent {
  id: string;
  type: PipelineEventType;
  agentId?: string;
  phaseId?: SDDPhaseName;
  timestamp: string;
  description: string;
}

export interface Issue {
  id: string;
  code: string;
  title: string;
  description: string;
  status: "in-progress" | "review" | "blocked" | "done" | "queued";
  assigneeAgentId?: string;
  assigneeLabel?: string;
  assigneeColor?: string;
  pipelineId?: string;
  costSoFar: number;
  createdAt: string;
  subtitle?: string;
}

export interface Approval {
  id: string;
  companyId: string;
  companyName: string;
  type: "hire" | "deploy" | "budget" | "spec-review" | "security-override";
  title: string;
  description: string;
  requesterAgentLabel: string;
  tag: string;
  createdAt: string;
  impact?: Record<string, string>;
}

export interface Memory {
  id: string;
  title: string;
  type: "decision" | "bug" | "architecture" | "learning";
  content: string;
  savedBy: string;
  createdAt: string;
  tags: string[];
}

export interface ActivityEntry {
  id: string;
  timestamp: string;
  level: "neutral" | "success" | "warning" | "danger";
  agentLabel?: string;
  companyName: string;
  text: string;
  meta: string;
}

export interface Thread {
  id: string;
  title: string;
  role: "interview" | "strategy" | "architect" | "reviewer";
  companyContext?: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
  totalCost: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  attachments?: Attachment[];
  timestamp: string;
  tokens?: number;
  prdPreview?: PRDPreview;
  suggestionGroups?: SuggestionGroup[];
}

export interface SuggestionGroup {
  label: string;
  options: string[];
}

export interface PRDPreview {
  title: string;
  description: string;
  stackPills: string[];
  parentCompany: string;
  coreFeatures: string;
  agentsToHire: string;
  confidencePercent: number;
}

export interface Attachment {
  id: string;
  type: "pdf" | "image" | "audio";
  fileName: string;
  sizeLabel: string;
}

export interface AgentRole {
  id: string;
  name: string;
  model: string;
  meta: string;
  colorHex: string;
}

export interface PRDSection {
  id: string;
  label: string;
  status: "done" | "in-progress" | "pending";
}

export interface InspirationCard {
  id: string;
  title: string;
  subtitle: string;
  sourceUrl: string;
  tag: string;
}
