"use client";

import Link from "next/link";
import { ChevronRight, Brain, Plus } from "lucide-react";
import type { Company } from "@/lib/types";

export function MemoryHeader({
  company,
  totalMemories,
}: {
  company: Company;
  totalMemories: number;
}) {
  return (
    <div className="px-7 pt-4 pb-3 border-b border-border-subtle bg-bg-page flex-shrink-0">
      <nav className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.05em] text-text-tertiary mb-2">
        <Link
          href={`/companies/${company.id}`}
          className="hover:text-brass transition-colors uppercase"
        >
          {company.name}
        </Link>
        <ChevronRight className="w-3 h-3 text-text-dim" />
        <span className="text-text-secondary uppercase">Engram</span>
      </nav>

      <div className="flex items-end justify-between gap-6">
        <div className="flex items-baseline gap-3 min-w-0 flex-1 flex-wrap">
          <Brain
            className="w-4 h-4 text-brass flex-shrink-0 self-center"
            strokeWidth={1.5}
          />
          <h1 className="text-display text-[26px] leading-[1.1]">
            What{" "}
            <em className="text-display-italic text-brass">{company.name}</em>{" "}
            has learned.
          </h1>
          <p className="font-mono text-[11px] text-text-tertiary">
            {totalMemories} memories · referenced across every pipeline
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            href={`/companies/${company.id}/knowledge`}
            className="px-2.5 py-1 rounded font-mono text-[10px] tracking-[0.05em] flex items-center gap-1.5 border bg-bg-surface text-text-secondary border-border-subtle hover:border-brass-muted transition-colors"
          >
            ← KNOWLEDGE
          </Link>
          <button
            type="button"
            className="px-2.5 py-1 rounded font-mono text-[10px] tracking-[0.05em] flex items-center gap-1.5 border bg-bg-surface text-text-secondary border-border-subtle hover:border-brass-muted transition-colors"
          >
            <Plus className="w-3 h-3" />
            SAVE MEMORY
          </button>
        </div>
      </div>
    </div>
  );
}
