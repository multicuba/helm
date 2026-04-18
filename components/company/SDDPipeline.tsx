"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import type { Pipeline, SDDPhase } from "@/lib/types";
import { cn } from "@/lib/utils";

const DEMO_STEP_MS = 7_000;

export function SDDPipeline({
  pipeline,
  demoMode = false,
}: {
  pipeline: Pipeline;
  demoMode?: boolean;
}) {
  const [liveIndex, setLiveIndex] = useState(pipeline.currentPhaseIndex);

  useEffect(() => {
    setLiveIndex(pipeline.currentPhaseIndex);
  }, [pipeline.currentPhaseIndex, demoMode]);

  useEffect(() => {
    if (!demoMode) return;
    const maxIndex = pipeline.phases.length - 1;
    const id = setInterval(() => {
      setLiveIndex((prev) => (prev >= maxIndex ? pipeline.currentPhaseIndex : prev + 1));
    }, DEMO_STEP_MS);
    return () => clearInterval(id);
  }, [demoMode, pipeline.phases.length, pipeline.currentPhaseIndex]);

  const phases = useMemo<SDDPhase[]>(() => {
    if (!demoMode) return pipeline.phases;
    return pipeline.phases.map((p, i) => {
      if (i < liveIndex) return { ...p, status: "done" };
      if (i === liveIndex) return { ...p, status: "active" };
      return { ...p, status: "pending" };
    });
  }, [pipeline.phases, liveIndex, demoMode]);

  const completed = phases.filter((p) => p.status === "done").length;
  const total = phases.length;
  const progressPct = demoMode
    ? Math.round(((completed + (phases[liveIndex]?.status === "active" ? 0.5 : 0)) / total) * 100)
    : pipeline.progressPercent;

  const startedLabel = useMemo(() => {
    try {
      return format(new Date(pipeline.startedAt), "MMM d");
    } catch {
      return pipeline.startedAt;
    }
  }, [pipeline.startedAt]);

  return (
    <div className="bg-bg-surface border border-border-subtle rounded-lg p-7 pb-6">
      <div className="flex items-start justify-between gap-6 mb-6">
        <div className="min-w-0">
          <div className="font-serif italic text-lg text-text-primary mb-1">
            {pipeline.featureName}
          </div>
          <div className="font-mono text-[11px] text-text-tertiary">
            Pipeline · started {startedLabel}
            {pipeline.prNumber ? ` · PR #${pipeline.prNumber}` : ""}
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="w-[120px] h-1 bg-bg-deep rounded-sm overflow-hidden mb-1 ml-auto">
            <motion.div
              className="h-full bg-gradient-to-r from-brass to-brass-bright"
              initial={false}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <div className="font-mono text-[10px] text-text-tertiary">
            {completed} of {total} phases · {progressPct}%
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {phases.map((phase, i) => (
          <PhaseCard key={phase.name} phase={phase} index={i} />
        ))}
      </div>
    </div>
  );
}

const phaseBg: Record<SDDPhase["status"], string> = {
  done: "bg-success/[0.06] border-success/30",
  active: "bg-brass/[0.06] border-brass shadow-[0_0_0_3px_rgba(200,155,94,0.08)]",
  blocked: "bg-danger/[0.04] border-danger-muted",
  pending: "bg-bg-page border-border-subtle",
};

const dotBg: Record<SDDPhase["status"], string> = {
  done: "bg-success",
  active: "bg-brass",
  blocked: "bg-danger",
  pending: "bg-text-dim",
};

const statusTextColor: Record<SDDPhase["status"], string> = {
  done: "text-success",
  active: "text-brass",
  blocked: "text-danger",
  pending: "text-text-dim",
};

function PhaseCard({ phase, index }: { phase: SDDPhase; index: number }) {
  const numLabel = String(index + 1).padStart(2, "0");
  const num = phase.status === "done"
    ? "text-success"
    : phase.status === "active"
    ? "text-brass"
    : "text-text-dim";
  const statusLabel =
    phase.status === "done"
      ? phase.durationLabel ?? "✓ done"
      : phase.status === "active"
      ? phase.durationLabel ?? "● running"
      : phase.status === "blocked"
      ? phase.durationLabel ?? "⚠ blocked"
      : phase.durationLabel ?? "queued";

  return (
    <div
      className={cn(
        "relative p-3.5 rounded-md border min-h-[110px] flex flex-col transition-colors",
        phaseBg[phase.status]
      )}
    >
      <div className={cn("font-mono text-[10px] tracking-[0.1em] mb-1.5", num)}>
        {numLabel}
      </div>
      <div className="font-serif italic text-[14px] text-text-primary mb-2.5">
        {phase.displayName}
      </div>
      <div className="mt-auto flex items-center gap-1.5 font-mono text-[10px] text-text-tertiary">
        {phase.status === "active" ? (
          <motion.span
            className={cn("w-1.5 h-1.5 rounded-full", dotBg[phase.status])}
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        ) : (
          <span className={cn("w-1.5 h-1.5 rounded-full", dotBg[phase.status])} />
        )}
        {phase.assignedLabel ?? "—"}
      </div>
      <div className={cn("font-mono text-[10px] mt-1", statusTextColor[phase.status])}>
        {statusLabel}
      </div>
    </div>
  );
}
