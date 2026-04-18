"use client";

import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import type { Company } from "@/lib/types";
import { OrgChart } from "./OrgChart";

export function CompanySidebar({ company }: { company: Company }) {
  const logoLetter = company.name.charAt(0);
  const budgetPercent = Math.min(
    100,
    Math.round((company.monthlySpendMtd / company.monthlyBudget) * 100)
  );

  return (
    <aside className="w-[280px] bg-bg-deep border-r border-border-subtle flex-shrink-0 px-5 py-6 overflow-y-auto">
      <div className="pb-6 mb-7 border-b border-border-subtle">
        <Link
          href="/command"
          className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.05em] text-text-dim hover:text-brass transition-colors mb-4"
        >
          <ArrowLeft className="w-3 h-3" />
          COMMAND CENTER
        </Link>
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-md flex items-center justify-center font-serif text-xl font-semibold text-bg-deep flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${company.colorHex}, ${company.colorHex}aa)`,
            }}
            aria-hidden
          >
            {logoLetter}
          </div>
          <div className="min-w-0">
            <div className="font-serif text-[20px] font-medium leading-tight tracking-tight truncate">
              {company.name}
            </div>
            <div className="font-mono text-[10px] text-text-dim mt-0.5 truncate">
              {company.slug}.co
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(company.stagePills ?? [company.industry]).map((pill) => (
            <span
              key={pill}
              className="font-mono text-[10px] text-text-secondary px-2 py-0.5 bg-bg-surface border border-border-subtle rounded-sm"
            >
              {pill}
            </span>
          ))}
        </div>
      </div>

      <section className="mb-6">
        <div className="flex items-center justify-between text-mono-label mb-3.5">
          <span>Org chart</span>
          <button
            type="button"
            className="text-brass hover:text-brass-bright transition-colors"
            aria-label="Add agent"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
        <OrgChart agents={company.agents} activeAgentId={company.agents[0]?.id} />
      </section>

      <section className="mb-6">
        <div className="text-mono-label mb-3.5">Humans</div>
        <div className="flex flex-col gap-0.5">
          {company.humans.map((h) => (
            <div
              key={h.id}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded"
            >
              <div className="w-7 h-7 rounded-full flex items-center justify-center font-mono text-[11px] font-semibold text-bg-deep flex-shrink-0 bg-gradient-to-br from-teal to-teal-muted">
                {h.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[12px] text-text-primary font-medium truncate">
                  {h.name}
                </div>
                <div className="font-mono text-[10px] text-text-dim truncate">
                  {h.role}
                  {h.status === "online" && (
                    <span className="text-success"> · ● online</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="text-mono-label mb-3.5">Budget · April</div>
        <div className="px-0.5">
          <div className="flex justify-between items-baseline mb-1.5">
            <span className="font-serif text-[22px] text-text-primary">
              ${company.monthlySpendMtd}
            </span>
            <span className="font-mono text-[11px] text-text-tertiary">
              of ${company.monthlyBudget}
            </span>
          </div>
          <div className="h-0.5 bg-bg-deep rounded-sm overflow-hidden mb-1.5">
            <div
              className="h-full bg-brass"
              style={{ width: `${budgetPercent}%` }}
            />
          </div>
          <div className="font-mono text-[10px] text-text-tertiary">
            {company.daysLeftInMonth ?? 12} days left · on track
          </div>
        </div>
      </section>
    </aside>
  );
}
