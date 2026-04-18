"use client";

import { TrendingUp } from "lucide-react";
import { useCompaniesStore, useApprovalsStore } from "@/lib/stores";

export function StatsBar() {
  const companies = useCompaniesStore((s) => s.companies);
  const approvals = useApprovalsStore((s) => s.approvals);

  const activeAgents = companies.reduce(
    (n, c) => n + c.agents.filter((a) => a.status === "working").length,
    0
  );
  const totalAgents = companies.reduce((n, c) => n + c.agents.length, 0);
  const shippedThisWeek = companies.reduce((n, c) => n + c.closedTickets, 0);
  const spendMtd = Math.round(
    companies.reduce((n, c) => n + c.monthlySpendMtd, 0)
  );
  const budgetMtd = companies.reduce((n, c) => n + c.monthlyBudget, 0);
  const criticalApprovals = approvals.filter(
    (a) => a.type === "deploy" || a.type === "security-override"
  ).length;
  const standardApprovals = approvals.length - criticalApprovals;

  const stats = [
    {
      label: "Active agents",
      value: String(activeAgents),
      change: `of ${totalAgents} total across ${companies.length} companies`,
      changeType: "up" as const,
    },
    {
      label: "Shipped this week",
      value: String(shippedThisWeek),
      change: "↑ 38% vs last week",
      changeType: "up" as const,
    },
    {
      label: "Total spend · MTD",
      value: `$${spendMtd.toLocaleString()}`,
      change: `of $${budgetMtd.toLocaleString()} budget`,
      changeType: "neutral" as const,
    },
    {
      label: "Needs your input",
      value: String(approvals.length),
      change:
        approvals.length === 0
          ? "All clear"
          : `● ${criticalApprovals} critical · ${standardApprovals} standard`,
      changeType: approvals.length === 0 ? ("neutral" as const) : ("warn" as const),
    },
  ];

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
