"use client";

import type { IssueActivity } from "@/lib/types";
import { ActivityItem } from "./ActivityItem";

export function ActivityLog({ activity }: { activity: IssueActivity[] }) {
  const sorted = [...activity].sort(
    (a, b) =>
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  return (
    <div className="border-t border-border-subtle pt-6 mt-8">
      <div className="flex items-center justify-between mb-4">
        <div className="font-serif italic text-[18px] text-text-primary">
          Activity
        </div>
        <span className="font-mono text-[10px] tracking-[0.1em] text-text-tertiary uppercase">
          {activity.length} events
        </span>
      </div>

      <ul className="relative max-h-[520px] overflow-y-auto pr-1">
        {sorted.map((a) => (
          <ActivityItem key={a.id} activity={a} />
        ))}
      </ul>
    </div>
  );
}
