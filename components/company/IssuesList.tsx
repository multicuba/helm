"use client";

import { useRouter } from "next/navigation";
import type { Issue } from "@/lib/types";
import { cn } from "@/lib/utils";

const tagClass: Record<Issue["status"], string> = {
  "in-progress":
    "text-brass border-brass-deep bg-brass/5",
  review: "text-warning border-warning/30 bg-warning/5",
  blocked: "text-danger border-danger-muted bg-danger/5",
  done: "text-success border-success/30 bg-success/5",
  queued: "text-text-secondary border-border-strong bg-bg-surface",
};

const tagLabel: Record<Issue["status"], string> = {
  "in-progress": "● in progress",
  review: "⚠ needs review",
  blocked: "● blocked",
  done: "✓ done",
  queued: "○ queued",
};

const assigneeBg: Record<string, string> = {
  brass: "bg-brass text-bg-deep",
  teal: "bg-teal-muted text-teal",
  success: "bg-success/20 text-success",
  warning: "bg-warning/20 text-warning",
  danger: "bg-danger-muted text-danger",
};

export function IssuesList({
  issues,
  companyId,
}: {
  issues: Issue[];
  companyId?: string;
}) {
  const router = useRouter();
  const openCount = issues.filter((i) => i.status !== "done").length;
  const blocked = issues.filter((i) => i.status === "blocked").length;
  const inFlight = issues.filter((i) => i.status === "in-progress" || i.status === "review").length;

  const navigate = (issueId: string) => {
    if (companyId) router.push(`/companies/${companyId}/issues/${issueId}`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3.5">
        <div className="font-serif italic text-base text-text-primary">
          Open issues · this week
        </div>
        <span className="font-mono text-[11px] text-text-tertiary">
          {openCount} open · {blocked} blocked · {inFlight} in flight
        </span>
      </div>
      <div className="bg-bg-surface border border-border-subtle rounded-md overflow-hidden">
        {issues.map((issue) => (
          <div
            key={issue.id}
            role={companyId ? "link" : "button"}
            tabIndex={0}
            onClick={() => navigate(issue.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                navigate(issue.id);
              }
            }}
            aria-label={`Open issue ${issue.code}: ${issue.title}`}
            className="grid grid-cols-[60px_1fr_auto_auto_auto] gap-4 items-center px-5 py-3.5 border-b border-border-subtle last:border-b-0 hover:bg-brass/[0.03] transition-colors cursor-pointer focus:outline-none focus-visible:bg-brass/[0.05]"
          >
            <div className="font-mono text-[10px] tracking-wider text-text-dim">
              {issue.code}
            </div>
            <div className="min-w-0">
              <div className="text-[13px] text-text-primary font-medium truncate">
                {issue.title}
              </div>
              {issue.subtitle && (
                <div className="text-[11px] text-text-tertiary mt-0.5 truncate">
                  {issue.subtitle}
                </div>
              )}
            </div>
            <div
              className={cn(
                "font-mono text-[10px] px-2 py-0.5 rounded-sm border whitespace-nowrap",
                tagClass[issue.status]
              )}
            >
              {tagLabel[issue.status]}
            </div>
            <div
              className={cn(
                "w-[22px] h-[22px] rounded-full flex items-center justify-center font-mono text-[9px] font-semibold",
                assigneeBg[issue.assigneeColor ?? "teal"] ?? assigneeBg.teal
              )}
            >
              {issue.assigneeLabel?.charAt(0) ?? "—"}
            </div>
            <div className="font-mono text-[10px] text-text-tertiary text-right min-w-[50px]">
              ${issue.costSoFar.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
