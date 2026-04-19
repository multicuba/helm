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
    <div className="px-7 pt-6 pb-5 border-b border-border-subtle bg-bg-page">
      <nav className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.05em] text-text-tertiary mb-4">
        <Link
          href={`/companies/${company.id}`}
          className="hover:text-brass transition-colors uppercase"
        >
          {company.name}
        </Link>
        <ChevronRight className="w-3 h-3 text-text-dim" />
        <span className="text-text-secondary uppercase">Engram</span>
      </nav>

      <div className="flex items-start justify-between gap-8">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Brain className="w-5 h-5 text-brass" strokeWidth={1.5} />
            <div className="text-mono-label">Engram · shared memory</div>
          </div>
          <h1 className="text-display text-[36px] leading-[1.1] mb-2">
            What <em className="text-display-italic text-brass">{company.name}</em>{" "}
            has learned.
          </h1>
          <p className="font-mono text-[11px] text-text-tertiary">
            {totalMemories} memories · decisions, bugs, architecture, learnings ·
            referenced across every pipeline
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            href={`/companies/${company.id}/knowledge`}
            className="px-3 py-1.5 rounded font-mono text-[11px] tracking-[0.05em] flex items-center gap-2 border bg-bg-surface text-text-secondary border-border-subtle hover:border-brass-muted transition-colors"
          >
            ← KNOWLEDGE
          </Link>
          <button
            type="button"
            className="px-3 py-1.5 rounded font-mono text-[11px] tracking-[0.05em] flex items-center gap-2 border bg-bg-surface text-text-secondary border-border-subtle hover:border-brass-muted transition-colors"
          >
            <Plus className="w-3 h-3" />
            SAVE MEMORY
          </button>
        </div>
      </div>
    </div>
  );
}
