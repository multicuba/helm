"use client";

import {
  UserPlus,
  GitCommit,
  MessageSquare,
  CheckCircle,
  AlertTriangle,
  Eye,
  Circle,
  X,
  Plus,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { IssueActivity } from "@/lib/types";
import { cn } from "@/lib/utils";

const iconByType: Record<
  IssueActivity["type"],
  { icon: React.ComponentType<{ className?: string }>; color: string }
> = {
  created: { icon: Plus, color: "text-text-tertiary" },
  assigned: { icon: UserPlus, color: "text-teal" },
  status_changed: { icon: Circle, color: "text-brass" },
  commented: { icon: MessageSquare, color: "text-text-secondary" },
  commit_pushed: { icon: GitCommit, color: "text-brass-bright" },
  flag_raised: { icon: AlertTriangle, color: "text-warning" },
  review_requested: { icon: Eye, color: "text-teal" },
  review_completed: { icon: CheckCircle, color: "text-success" },
  closed: { icon: X, color: "text-text-tertiary" },
};

export function ActivityItem({ activity }: { activity: IssueActivity }) {
  const { icon: Icon, color } = iconByType[activity.type];

  let relative = activity.timestamp;
  try {
    relative = formatDistanceToNow(new Date(activity.timestamp), {
      addSuffix: true,
    });
  } catch {
    /* keep raw */
  }

  return (
    <li className="relative flex gap-3 pb-4 last:pb-0">
      <span className="absolute left-[11px] top-6 bottom-0 w-px bg-border-subtle group-last:hidden" />
      <div
        className={cn(
          "relative z-[1] flex-shrink-0 w-[22px] h-[22px] rounded-full bg-bg-surface border border-border-subtle flex items-center justify-center",
          color
        )}
      >
        <Icon className="w-3 h-3" />
      </div>

      <div className="flex-1 min-w-0 pt-0.5">
        <div className="text-[13px] text-text-secondary leading-[1.5]">
          <span className="text-text-primary font-medium">
            {activity.actorLabel}
          </span>{" "}
          {activity.description}{" "}
          <span className="font-mono text-[10px] text-text-dim ml-0.5">
            · {relative}
          </span>
        </div>

        {activity.meta?.comment && (
          <div className="mt-2 p-3 rounded bg-bg-surface border border-border-subtle text-[12.5px] text-text-secondary italic">
            “{activity.meta.comment}”
          </div>
        )}

        {activity.meta?.files && activity.meta.files.length > 0 && (
          <div className="mt-2 pl-3 border-l border-border-subtle space-y-0.5">
            {activity.meta.files.map((f) => (
              <div
                key={f}
                className="font-mono text-[11px] text-text-tertiary"
              >
                {f}
              </div>
            ))}
            {activity.meta.commitSha && (
              <div className="font-mono text-[10px] text-text-dim pt-1">
                {activity.meta.commitSha.slice(0, 7)}
              </div>
            )}
          </div>
        )}

        {activity.meta?.fromStatus && activity.meta?.toStatus && (
          <div className="mt-1 font-mono text-[10px] text-text-tertiary">
            {activity.meta.fromStatus} → {activity.meta.toStatus}
          </div>
        )}

        {activity.meta?.severity && (
          <div
            className={cn(
              "mt-1 inline-block font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 border rounded",
              activity.meta.severity === "high"
                ? "text-danger border-danger-muted bg-danger/10"
                : activity.meta.severity === "medium"
                ? "text-warning border-warning/40 bg-warning/10"
                : "text-text-secondary border-border-strong bg-bg-surface"
            )}
          >
            {activity.meta.severity} severity
          </div>
        )}
      </div>
    </li>
  );
}
