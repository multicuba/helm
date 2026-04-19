"use client";

import type { Pipeline } from "@/lib/types";
import { PhaseCard } from "./PhaseCard";

export function PhaseTimeline({ pipeline }: { pipeline: Pipeline }) {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute left-[33px] top-6 bottom-6 w-px bg-gradient-to-b from-brass-muted/40 via-border-subtle to-border-subtle/30"
      />

      <div className="space-y-3 relative">
        {pipeline.phases.map((phase, i) => (
          <PhaseCard key={phase.name} phase={phase} index={i} />
        ))}
      </div>
    </div>
  );
}
