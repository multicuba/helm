"use client";

import { motion } from "framer-motion";
import { format, formatDistanceToNow } from "date-fns";
import {
  PlayCircle,
  CheckCircle2,
  ArrowRightCircle,
  ThumbsUp,
  GitCommit,
} from "lucide-react";
import type { Pipeline, PipelineEvent, PipelineEventType } from "@/lib/types";
import { CostBreakdown } from "./CostBreakdown";
import { cn } from "@/lib/utils";

const eventConfig: Record<
  PipelineEventType,
  { label: string; icon: typeof PlayCircle; color: string }
> = {
  phase_started: { label: "PHASE START", icon: PlayCircle, color: "text-brass" },
  phase_completed: { label: "PHASE DONE", icon: CheckCircle2, color: "text-success" },
  handoff: { label: "HANDOFF", icon: ArrowRightCircle, color: "text-teal" },
  review_approved: { label: "APPROVED", icon: ThumbsUp, color: "text-success" },
  commit_pushed: { label: "COMMIT", icon: GitCommit, color: "text-text-secondary" },
};

export function PipelineStreamPanel({ pipeline }: { pipeline: Pipeline }) {
  const events = [...(pipeline.events ?? [])].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <aside className="w-[380px] bg-bg-deep border-l border-border-subtle flex-shrink-0 px-5 py-6 overflow-y-auto">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-subtle">
        <div className="text-mono-label">Pipeline activity</div>
        <div className="font-mono text-[10px] text-text-tertiary">
          {events.length} event{events.length === 1 ? "" : "s"}
        </div>
      </div>

      <div className="mb-6">
        {events.length === 0 ? (
          <div className="text-[12px] italic text-text-tertiary py-6 text-center">
            No events yet for this pipeline.
          </div>
        ) : (
          events.map((ev, i) => <EventRow key={ev.id} event={ev} delay={i * 0.04} />)
        )}
      </div>

      <CostBreakdown pipeline={pipeline} />
    </aside>
  );
}

function EventRow({ event, delay }: { event: PipelineEvent; delay: number }) {
  const cfg = eventConfig[event.type];
  const Icon = cfg.icon;

  let timeAbsolute = event.timestamp;
  let timeRelative = "";
  try {
    const d = new Date(event.timestamp);
    timeAbsolute = format(d, "MMM d · HH:mm");
    timeRelative = formatDistanceToNow(d, { addSuffix: true });
  } catch {
    /* keep raw */
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="py-3 border-b border-border-subtle last:border-b-0"
    >
      <div className="flex items-center gap-2 mb-1.5">
        <Icon className={cn("w-3 h-3 flex-shrink-0", cfg.color)} />
        <span className={cn("font-mono text-[10px] tracking-[0.1em]", cfg.color)}>
          {cfg.label}
        </span>
        {event.phaseId && (
          <>
            <span className="font-mono text-[10px] text-text-dim">·</span>
            <span className="font-mono text-[10px] text-text-tertiary uppercase">
              {event.phaseId}
            </span>
          </>
        )}
        <span
          className="ml-auto font-mono text-[9px] text-text-dim"
          title={timeAbsolute}
        >
          {timeRelative || timeAbsolute}
        </span>
      </div>
      <div className="text-[12px] text-text-secondary leading-relaxed pl-5">
        {event.description}
      </div>
    </motion.div>
  );
}
