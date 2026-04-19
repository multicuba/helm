"use client";

import Link from "next/link";
import { ChevronRight, Plus, GitBranch } from "lucide-react";
import type { Company } from "@/lib/types";

export function KnowledgeHeader({ company }: { company: Company }) {
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
        <span className="text-text-secondary uppercase">Knowledge</span>
      </nav>

      <div className="flex items-start justify-between gap-8">
        <div className="min-w-0 flex-1">
          <h1 className="text-display text-[36px] leading-[1.1] mb-2">
            Knowledge
          </h1>
          <p className="font-serif italic text-[16px] text-text-secondary">
            What your agents know about{" "}
            <span className="text-brass not-italic font-sans">
              {company.name}
            </span>
            .
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            className="px-3 py-1.5 rounded font-mono text-[11px] tracking-[0.05em] flex items-center gap-2 border bg-bg-surface text-text-secondary border-border-subtle hover:border-brass-muted transition-colors"
          >
            <Plus className="w-3 h-3" />
            ADD SKILL
          </button>
          <button
            type="button"
            className="px-3 py-1.5 rounded font-mono text-[11px] tracking-[0.05em] flex items-center gap-2 border bg-bg-surface text-text-secondary border-border-subtle hover:border-brass-muted transition-colors"
          >
            <GitBranch className="w-3 h-3" />
            IMPORT FROM REPO
          </button>
        </div>
      </div>
    </div>
  );
}
