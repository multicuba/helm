"use client";

import Link from "next/link";
import { ChevronRight, UserPlus, CircleDot, X, Pencil } from "lucide-react";
import type { Issue, Company } from "@/lib/types";
import { cn } from "@/lib/utils";

const statusTag: Record<Issue["status"], string> = {
  "in-progress": "text-brass border-brass-deep bg-brass/5",
  review: "text-warning border-warning/30 bg-warning/5",
  blocked: "text-danger border-danger-muted bg-danger/5",
  done: "text-success border-success/30 bg-success/5",
  queued: "text-text-secondary border-border-strong bg-bg-surface",
};

const statusLabel: Record<Issue["status"], string> = {
  "in-progress": "● in progress",
  review: "⚠ in review",
  blocked: "● blocked",
  done: "✓ done",
  queued: "○ queued",
};

const priorityTag: Record<string, string> = {
  p0: "text-danger border-danger/40 bg-danger/10",
  p1: "text-warning border-warning/40 bg-warning/10",
  p2: "text-teal border-teal-muted bg-teal/10",
  p3: "text-text-secondary border-border-strong bg-bg-surface",
};

function formatMinutes(mins: number) {
  if (mins < 60) return `${mins}m agent time`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (m === 0) return `${h}h agent time`;
  return `${h}h ${m}m agent time`;
}

export function IssueHeader({
  issue,
  company,
}: {
  issue: Issue;
  company: Company;
}) {
  return (
    <div className="px-7 pt-6 pb-5 border-b border-border-subtle bg-bg-page">
      <nav className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.05em] text-text-tertiary mb-4">
        <Link
          href={`/companies/${company.id}`}
          className="hover:text-brass transition-colors uppercase"
        >
          {company.name}
        </Link>
        <ChevronRight className="w-3 h-3 text-text-dim" />
        <Link
          href={`/companies/${company.id}`}
          className="hover:text-brass transition-colors uppercase"
        >
          Issues
        </Link>
        <ChevronRight className="w-3 h-3 text-text-dim" />
        <span className="text-text-secondary uppercase">{issue.code}</span>
      </nav>

      <div className="flex items-start justify-between gap-8">
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-4 flex-wrap mb-3">
            <h1 className="font-mono text-[22px] tracking-[0.02em] text-brass">
              {issue.code}
            </h1>
            <span className="text-display-italic text-[26px] leading-[1.15] text-text-primary">
              {issue.title}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className={cn(
                "font-mono text-[10px] px-2 py-0.5 rounded-sm border",
                statusTag[issue.status]
              )}
            >
              {statusLabel[issue.status]}
            </span>
            <span
              className={cn(
                "font-mono text-[10px] px-2 py-0.5 rounded-sm border uppercase tracking-[0.08em]",
                priorityTag[issue.priority] ?? priorityTag.p2
              )}
            >
              {issue.priority}
            </span>
            {issue.labels?.map((label) => (
              <span
                key={label}
                className="font-mono text-[10px] px-2 py-0.5 rounded-sm border border-border-subtle bg-bg-surface text-text-tertiary"
              >
                {label}
              </span>
            ))}
          </div>

          <div className="font-mono text-[11px] text-text-tertiary">
            <span className="text-brass">${issue.costSoFar.toFixed(2)}</span>{" "}
            spent · {formatMinutes(issue.agentTimeMinutes)}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <div className="flex items-center gap-2">
            <HeaderButton icon={UserPlus} label="ASSIGN" />
            <HeaderButton icon={CircleDot} label="CHANGE STATUS" />
            <HeaderButton icon={X} label="CLOSE" />
            <HeaderButton icon={Pencil} label="EDIT" />
          </div>
        </div>
      </div>
    </div>
  );
}

function HeaderButton({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <button
      type="button"
      className="px-3 py-1.5 rounded font-mono text-[10px] tracking-[0.05em] flex items-center gap-2 border bg-bg-surface text-text-secondary border-border-subtle hover:border-brass-muted transition-colors"
    >
      <Icon className="w-3 h-3" />
      {label}
    </button>
  );
}
