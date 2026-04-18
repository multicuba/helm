"use client";

import Link from "next/link";
import type { Company } from "@/lib/types";

const roleColorMap: Record<string, { bg: string; text: string }> = {
  brass: { bg: "bg-brass", text: "text-bg-deep" },
  teal: { bg: "bg-teal-muted", text: "text-teal" },
  success: { bg: "bg-success/20", text: "text-success" },
  warning: { bg: "bg-warning/15", text: "text-warning" },
  danger: { bg: "bg-danger-muted", text: "text-danger" },
  neutral: { bg: "bg-bg-elevated", text: "text-text-secondary" },
};

export function CompanyCard({ company }: { company: Company }) {
  const budgetPercent = Math.min(
    100,
    (company.monthlySpendMtd / company.monthlyBudget) * 100
  );
  const isAttention = company.status === "attention";
  const agents = company.agents.slice(0, 4);
  const extraAgents = company.agents.length - agents.length;

  return (
    <Link
      href={`/companies/${company.id}`}
      className="block bg-bg-surface border border-border-subtle rounded-md p-5 hover:border-brass-muted transition-colors relative"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div
            className="w-2.5 h-2.5 rounded-sm"
            style={{ backgroundColor: company.colorHex }}
          />
          <div className="font-serif text-lg font-medium tracking-tight">
            {company.name}
          </div>
        </div>
        <div
          className={`font-mono text-[10px] tracking-wider px-2 py-0.5 border rounded-sm ${
            isAttention
              ? "text-warning border-warning/30 bg-warning/5"
              : "text-success border-success/30 bg-success/5"
          }`}
        >
          {isAttention ? "⚠ Needs review" : "● Active"}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-5 gap-y-3 mb-4">
        <div>
          <div className="text-mono-label mb-1">Open tickets</div>
          <div className="text-[15px] font-medium">
            {company.openTickets}{" "}
            <span className="font-mono text-[11px] text-text-tertiary font-normal ml-1">
              / {company.closedTickets} closed
            </span>
          </div>
        </div>
        <div>
          <div className="text-mono-label mb-1">Pipelines</div>
          <div className="text-[15px] font-medium">
            {company.activePipelines > 0 ? (
              <>
                {company.activePipelines}{" "}
                <span className="font-mono text-[11px] text-text-tertiary font-normal ml-1">
                  active
                </span>
              </>
            ) : (
              "—"
            )}
          </div>
        </div>
        <div>
          <div className="text-mono-label mb-1">Spend · MTD</div>
          <div className="text-[15px] font-medium">
            ${company.monthlySpendMtd}{" "}
            <span className="font-mono text-[11px] text-text-tertiary font-normal ml-1">
              / ${company.monthlyBudget}
            </span>
          </div>
          <div className="h-0.5 bg-bg-deep rounded-sm mt-1 overflow-hidden">
            <div
              className="h-full bg-brass"
              style={{ width: `${budgetPercent}%` }}
            />
          </div>
        </div>
        <div>
          <div className="text-mono-label mb-1">
            {company.keyMetric?.label ?? "Status"}
          </div>
          <div className="text-[15px] font-medium">
            {company.keyMetric?.value ?? "—"}{" "}
            {company.keyMetric?.sub && (
              <span className="font-mono text-[11px] text-text-tertiary font-normal ml-1">
                {company.keyMetric.sub}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
        <div className="flex items-center">
          {agents.map((a, i) => {
            const c = roleColorMap[a.roleColor] ?? roleColorMap.neutral;
            return (
              <div
                key={a.id}
                className={`w-[22px] h-[22px] rounded-full border-2 border-bg-surface flex items-center justify-center font-mono text-[9px] font-semibold ${c.bg} ${c.text}`}
                style={{ marginLeft: i === 0 ? 0 : "-6px" }}
              >
                {a.shortRole.charAt(0)}
              </div>
            );
          })}
          {extraAgents > 0 && (
            <div
              className="w-[22px] h-[22px] rounded-full border-2 border-bg-surface flex items-center justify-center font-mono text-[9px] font-semibold bg-brass-deep text-brass"
              style={{ marginLeft: "-6px" }}
            >
              +{extraAgents}
            </div>
          )}
        </div>
        <div className="font-mono text-[11px] text-text-tertiary flex items-center gap-2">
          <span className="text-text-primary">{company.agents.length}</span>{" "}
          agents
          {company.humans.length > 1 && (
            <>
              {" · "}
              <span className="text-text-primary">{company.humans[0].name}</span>{" "}
              +{company.humans.length - 1}
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
