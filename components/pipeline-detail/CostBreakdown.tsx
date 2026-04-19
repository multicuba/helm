"use client";

import { motion } from "framer-motion";
import type { Pipeline, SDDPhase } from "@/lib/types";
import { cn } from "@/lib/utils";

const barColor: Record<SDDPhase["status"], string> = {
  done: "bg-success",
  active: "bg-brass",
  blocked: "bg-danger",
  pending: "bg-text-dim/40",
};

export function CostBreakdown({ pipeline }: { pipeline: Pipeline }) {
  const total = pipeline.phases.reduce((sum, p) => sum + (p.cost ?? 0), 0);
  const max = Math.max(0.01, ...pipeline.phases.map((p) => p.cost ?? 0));

  return (
    <div className="p-4 bg-bg-surface border border-border-subtle rounded-md">
      <div className="flex items-center justify-between mb-3">
        <div className="text-mono-label">Cost by phase</div>
        <div className="font-mono text-[10px] text-text-tertiary">USD · this pipeline</div>
      </div>

      <div className="space-y-2 mb-4">
        {pipeline.phases.map((p) => {
          const cost = p.cost ?? 0;
          const pct = max > 0 ? (cost / max) * 100 : 0;
          return (
            <div key={p.name} className="grid grid-cols-[64px_1fr_56px] items-center gap-2">
              <span className="font-mono text-[10px] text-text-tertiary truncate">
                {p.displayName}
              </span>
              <div className="h-1.5 bg-bg-deep rounded-sm overflow-hidden">
                <motion.div
                  className={cn("h-full", barColor[p.status])}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
              <span
                className={cn(
                  "font-mono text-[10px] text-right tabular-nums",
                  cost > 0 ? "text-text-secondary" : "text-text-dim"
                )}
              >
                ${cost.toFixed(2)}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border-subtle">
        <span className="text-mono-label">Pipeline total</span>
        <span className="font-serif text-[18px] text-brass tabular-nums">
          ${total.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
