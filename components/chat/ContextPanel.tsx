"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Minus, ExternalLink } from "lucide-react";
import type { PRDSection, InspirationCard } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ContextPanel({
  sections,
  inspiration,
  onConvert,
}: {
  sections: PRDSection[];
  inspiration: InspirationCard[];
  onConvert?: () => void;
}) {
  const completed = sections.filter((s) => s.status === "done").length;
  const inProgress = sections.some((s) => s.status === "in-progress");
  const pct = Math.round(((completed + (inProgress ? 0.5 : 0)) / sections.length) * 100);

  return (
    <aside className="w-[320px] bg-bg-deep border-l border-border-subtle flex-shrink-0 flex flex-col overflow-y-auto">
      <div className="px-5 py-6 border-b border-border-subtle">
        <div className="flex items-center justify-between mb-3">
          <div className="text-mono-label">PRD en progreso</div>
          <div className="font-mono text-[10px] text-brass">{pct}%</div>
        </div>

        <div className="h-1 bg-bg-surface rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-brass"
            initial={false}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>

        <div className="space-y-2.5">
          {sections.map((s) => (
            <div key={s.id} className="flex items-start gap-2.5">
              <StatusDot status={s.status} />
              <div
                className={cn(
                  "text-[12px] leading-[1.4]",
                  s.status === "done"
                    ? "text-text-primary"
                    : s.status === "in-progress"
                      ? "text-brass-bright"
                      : "text-text-tertiary"
                )}
              >
                {s.label}
                {s.status === "in-progress" && (
                  <span className="font-mono text-[10px] text-text-tertiary ml-1.5">
                    · in progress
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 py-6 border-b border-border-subtle">
        <div className="text-mono-label mb-3">Inspiration</div>
        <div className="space-y-2.5">
          {inspiration.map((c) => (
            <a
              key={c.id}
              href={`https://${c.sourceUrl}`}
              target="_blank"
              rel="noreferrer"
              className="block p-3 bg-bg-surface border border-border-subtle rounded-md hover:border-brass-muted transition-colors group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-brass-muted">
                  {c.tag}
                </div>
                <ExternalLink className="w-3 h-3 text-text-dim group-hover:text-brass" />
              </div>
              <div className="text-[13px] text-text-primary font-medium leading-tight mb-1">
                {c.title}
              </div>
              <div className="text-[11px] text-text-tertiary leading-[1.4]">
                {c.subtitle}
              </div>
              <div className="font-mono text-[10px] text-text-dim mt-2 truncate">
                {c.sourceUrl}
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-auto px-5 py-5 border-t border-border-subtle">
        <button
          type="button"
          onClick={onConvert}
          className="w-full px-4 py-2.5 bg-brass text-bg-deep font-medium text-[13px] rounded flex items-center justify-center gap-2 hover:bg-brass-bright transition-colors"
        >
          Convert to Company
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
        <div className="font-mono text-[10px] text-text-dim text-center mt-2">
          Seeds a new company with 3 pipelines + 8 issues
        </div>
      </div>
    </aside>
  );
}

function StatusDot({ status }: { status: PRDSection["status"] }) {
  if (status === "done") {
    return (
      <div className="w-3.5 h-3.5 rounded-full bg-brass flex items-center justify-center flex-shrink-0 mt-[2px]">
        <Check className="w-2 h-2 text-bg-deep" strokeWidth={3.5} />
      </div>
    );
  }
  if (status === "in-progress") {
    return (
      <motion.div
        className="w-3.5 h-3.5 rounded-full border border-brass flex items-center justify-center flex-shrink-0 mt-[2px]"
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-brass" />
      </motion.div>
    );
  }
  return (
    <div className="w-3.5 h-3.5 rounded-full border border-text-dim flex items-center justify-center flex-shrink-0 mt-[2px]">
      <Minus className="w-2 h-2 text-text-dim" />
    </div>
  );
}
