"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import type { Company, Issue, Agent } from "@/lib/types";
import { cn } from "@/lib/utils";
import { LinkedIssuesSection } from "./LinkedIssuesSection";

const roleColorBg: Record<string, string> = {
  brass: "bg-brass/15 text-brass border-brass/40",
  teal: "bg-teal/15 text-teal border-teal/40",
  success: "bg-success/15 text-success border-success/40",
  warning: "bg-warning/15 text-warning border-warning/40",
  danger: "bg-danger-muted/40 text-danger border-danger-muted",
  neutral: "bg-bg-surface text-text-secondary border-border-subtle",
};

const statusDot: Record<Agent["status"], string> = {
  working: "bg-success",
  idle: "bg-text-tertiary",
  blocked: "bg-danger",
  offline: "bg-text-dim",
};

function relative(ts?: string) {
  if (!ts) return null;
  try {
    return formatDistanceToNow(new Date(ts), { addSuffix: true });
  } catch {
    return ts;
  }
}

function formatMinutes(mins: number) {
  if (mins < 60) return `${mins}m`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export function IssueMetadataPanel({
  issue,
  company,
}: {
  issue: Issue;
  company: Company;
}) {
  const assignee = company.agents.find(
    (a) => a.id === issue.assigneeAgentId
  );
  const pipeline = company.pipelines.find((p) => p.id === issue.pipelineId);
  const pipelineCurrentPhase = pipeline?.phases[pipeline.currentPhaseIndex];

  return (
    <aside className="w-[280px] flex-shrink-0 space-y-6">
      <MetaSection label="Assignee">
        {assignee ? (
          <Link
            href={`/companies/${company.id}/agents/${assignee.id}`}
            className="flex items-center gap-3 group"
          >
            <div
              className={cn(
                "w-9 h-9 rounded-full border flex items-center justify-center font-mono text-[12px] font-semibold",
                roleColorBg[assignee.roleColor] ?? roleColorBg.neutral
              )}
            >
              {assignee.shortRole?.charAt(0).toUpperCase() ??
                assignee.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="text-[13px] text-text-primary font-medium group-hover:text-brass transition-colors truncate">
                {assignee.name}
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-text-tertiary">
                <span
                  className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    statusDot[assignee.status]
                  )}
                />
                {assignee.model} · {assignee.status}
              </div>
            </div>
          </Link>
        ) : (
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-9 h-9 rounded-full border flex items-center justify-center font-mono text-[12px]",
                issue.assigneeColor
                  ? roleColorBg[issue.assigneeColor] ?? roleColorBg.neutral
                  : roleColorBg.neutral
              )}
            >
              {issue.assigneeLabel?.charAt(0) ?? "—"}
            </div>
            <div>
              <div className="text-[13px] text-text-primary font-medium">
                {issue.assigneeLabel ?? "Unassigned"}
              </div>
              <div className="font-mono text-[10px] text-text-tertiary">
                no agent record
              </div>
            </div>
          </div>
        )}
      </MetaSection>

      {pipeline && (
        <MetaSection label="Pipeline">
          <Link
            href={`/companies/${company.id}/pipelines/${pipeline.id}`}
            className="block group"
          >
            <div className="text-[13px] text-text-primary font-medium group-hover:text-brass transition-colors truncate">
              {pipeline.featureName}
            </div>
            <div className="font-mono text-[10px] text-text-tertiary mt-0.5">
              {pipelineCurrentPhase?.displayName ?? "—"}
              {typeof pipeline.progressPercent === "number" &&
                ` · ${pipeline.progressPercent}%`}
            </div>
            <div className="mt-2 w-full h-1 bg-bg-deep rounded-sm overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-brass to-brass-bright"
                initial={false}
                animate={{ width: `${pipeline.progressPercent}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
          </Link>
        </MetaSection>
      )}

      <MetaSection label="Metadata">
        <div className="space-y-1.5 text-[12px] font-mono text-text-tertiary">
          <MetaRow
            label="Created"
            value={`${issue.createdBy?.label ?? "—"} · ${
              relative(issue.createdAt) ?? ""
            }`}
          />
          {issue.updatedAt && (
            <MetaRow
              label="Updated"
              value={`${issue.lastUpdatedBy?.label ?? "—"} · ${
                relative(issue.updatedAt) ?? ""
              }`}
            />
          )}
          <MetaRow
            label="Agent time"
            value={formatMinutes(issue.agentTimeMinutes)}
          />
          <MetaRow
            label="Token cost"
            value={`$${issue.tokenCostUsd.toFixed(2)}`}
          />
        </div>
      </MetaSection>

      <LinkedIssuesSection issue={issue} company={company} />

      {issue.labels.length > 0 && (
        <MetaSection label="Labels">
          <div className="flex flex-wrap gap-1.5">
            {issue.labels.map((l) => (
              <span
                key={l}
                className="font-mono text-[10px] px-1.5 py-0.5 rounded-sm border border-border-subtle bg-bg-surface text-text-secondary"
              >
                {l}
              </span>
            ))}
          </div>
        </MetaSection>
      )}
    </aside>
  );
}

function MetaSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="font-mono text-[10px] text-text-dim uppercase tracking-[0.15em] mb-2">
        {label}
      </div>
      {children}
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="text-text-dim">{label}</span>
      <span className="text-text-secondary text-right truncate">{value}</span>
    </div>
  );
}
