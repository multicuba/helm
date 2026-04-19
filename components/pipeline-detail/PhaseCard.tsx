"use client";

import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, Clock, Circle, FileText } from "lucide-react";
import type { SDDPhase } from "@/lib/types";
import { cn } from "@/lib/utils";

const phaseBg: Record<SDDPhase["status"], string> = {
  done: "bg-success/[0.04] border-success/30",
  active: "bg-brass/[0.06] border-brass shadow-[0_0_0_3px_rgba(200,155,94,0.08)]",
  blocked: "bg-danger/[0.04] border-danger-muted",
  pending: "bg-bg-surface border-border-subtle",
};

const dotBg: Record<SDDPhase["status"], string> = {
  done: "bg-success",
  active: "bg-brass",
  blocked: "bg-danger",
  pending: "bg-text-dim",
};

const numColor: Record<SDDPhase["status"], string> = {
  done: "text-success",
  active: "text-brass",
  blocked: "text-danger",
  pending: "text-text-dim",
};

const StatusIcon = {
  done: CheckCircle2,
  active: Clock,
  blocked: AlertTriangle,
  pending: Circle,
} as const;

export function PhaseCard({
  phase,
  index,
}: {
  phase: SDDPhase;
  index: number;
}) {
  const numLabel = String(index + 1).padStart(2, "0");
  const Icon = StatusIcon[phase.status];

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className={cn(
        "relative rounded-md border p-5 transition-colors",
        phaseBg[phase.status]
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex flex-col items-center flex-shrink-0">
          {phase.status === "active" ? (
            <motion.span
              className={cn("w-3 h-3 rounded-full", dotBg[phase.status])}
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          ) : (
            <span className={cn("w-3 h-3 rounded-full", dotBg[phase.status])} />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-3 mb-1">
            <span className={cn("font-mono text-[10px] tracking-[0.15em]", numColor[phase.status])}>
              PHASE {numLabel}
            </span>
            <span className="font-mono text-[10px] text-text-dim">·</span>
            <span className={cn("font-mono text-[10px] flex items-center gap-1", numColor[phase.status])}>
              <Icon className="w-3 h-3" />
              {phase.status.toUpperCase()}
            </span>
          </div>

          <h3 className="font-serif italic text-[24px] text-text-primary leading-tight mb-2">
            {phase.displayName}
          </h3>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-text-tertiary mb-4">
            <span>{phase.assignedLabel ?? "—"}</span>
            {phase.durationLabel && (
              <>
                <span className="text-text-dim">·</span>
                <span className={cn(numColor[phase.status])}>{phase.durationLabel}</span>
              </>
            )}
            {phase.cost != null && phase.cost > 0 && (
              <>
                <span className="text-text-dim">·</span>
                <span>${phase.cost.toFixed(2)}</span>
              </>
            )}
          </div>

          {phase.artifacts && phase.artifacts.length > 0 && (
            <div className="mb-3">
              <div className="text-mono-label mb-2">Artifacts</div>
              <ul className="space-y-1">
                {phase.artifacts.map((a) => (
                  <li
                    key={a.id}
                    className="flex items-center gap-2 text-[12px] text-text-secondary hover:text-brass transition-colors cursor-pointer"
                  >
                    <FileText className="w-3 h-3 text-text-dim flex-shrink-0" />
                    <span className="font-mono">{a.name}</span>
                    {a.size && (
                      <span className="text-text-dim font-mono text-[10px]">· {a.size}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {phase.handoffNote && (
            <div
              className={cn(
                "mt-3 pt-3 border-t text-[12px] italic",
                phase.status === "blocked"
                  ? "border-danger-muted text-danger"
                  : phase.status === "done"
                  ? "border-success/20 text-text-secondary"
                  : "border-border-subtle text-text-secondary"
              )}
            >
              {phase.handoffNote}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
