"use client";

import { TrendingUp } from "lucide-react";

const stats = [
  { label: "Active Agents", value: "23", change: "+4 since yesterday", changeType: "up" as const },
  { label: "Shipped this week", value: "47", change: "↑ 38% vs last week", changeType: "up" as const },
  { label: "Total spend · MTD", value: "$1,847", change: "of $4,500 budget", changeType: "neutral" as const },
  { label: "Needs your input", value: "4", change: "● 1 critical · 3 standard", changeType: "warn" as const },
];

export function StatsBar() {
  return (
    <div className="grid grid-cols-4 gap-px bg-border-subtle border border-border-subtle rounded-md overflow-hidden mb-9">
      {stats.map((s) => (
        <div key={s.label} className="bg-bg-page px-5 py-5">
          <div className="text-mono-label mb-2.5">{s.label}</div>
          <div className="font-serif font-normal text-[32px] leading-none tracking-tight mb-2">
            {s.value}
          </div>
          <div
            className={`font-mono text-[11px] flex items-center gap-1.5 ${
              s.changeType === "up"
                ? "text-success"
                : s.changeType === "warn"
                ? "text-warning"
                : "text-text-tertiary"
            }`}
          >
            {s.changeType === "up" && <TrendingUp className="w-2.5 h-2.5" />}
            {s.change}
          </div>
        </div>
      ))}
    </div>
  );
}
