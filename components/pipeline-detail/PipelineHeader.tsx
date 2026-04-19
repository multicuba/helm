"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { format, formatDistanceToNow } from "date-fns";
import { Pause, Github, Archive, ChevronRight } from "lucide-react";
import type { Pipeline, Agent, Company } from "@/lib/types";
import { cn } from "@/lib/utils";

const roleColorBg: Record<string, string> = {
  brass: "bg-brass/15 text-brass border-brass/40",
  teal: "bg-teal/15 text-teal border-teal/40",
  success: "bg-success/15 text-success border-success/40",
  warning: "bg-warning/15 text-warning border-warning/40",
  danger: "bg-danger/15 text-danger border-danger/40",
  neutral: "bg-bg-surface text-text-secondary border-border-subtle",
};

export function PipelineHeader({
  pipeline,
  company,
  ownerAgent,
  completedPhases,
  totalPhases,
}: {
  pipeline: Pipeline;
  company: Company;
  ownerAgent?: Agent;
  completedPhases: number;
  totalPhases: number;
}) {
  let startedAbsolute = pipeline.startedAt;
  let startedRelative = "";
  try {
    const d = new Date(pipeline.startedAt);
    startedAbsolute = format(d, "MMM d, yyyy");
    startedRelative = formatDistanceToNow(d, { addSuffix: true });
  } catch {
    /* keep raw */
  }

  const ownerColor = ownerAgent?.roleColor ?? "neutral";
  const initial = (ownerAgent?.shortRole ?? ownerAgent?.name ?? "?").charAt(0).toUpperCase();

  return (
    <div className="px-7 pt-6 pb-5 border-b border-border-subtle bg-bg-page">
      <nav className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.05em] text-text-tertiary mb-4">
        <Link href={`/companies/${company.id}`} className="hover:text-brass transition-colors uppercase">
          {company.name}
        </Link>
        <ChevronRight className="w-3 h-3 text-text-dim" />
        <Link href={`/companies/${company.id}`} className="hover:text-brass transition-colors uppercase">
          Pipelines
        </Link>
        <ChevronRight className="w-3 h-3 text-text-dim" />
        <span className="text-text-secondary uppercase truncate max-w-[420px]">
          {pipeline.featureName}
        </span>
      </nav>

      <div className="flex items-start justify-between gap-8">
        <div className="min-w-0 flex-1">
          <h1 className="text-display-italic text-[34px] leading-[1.1] text-text-primary mb-3">
            {pipeline.featureName}
          </h1>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] text-text-tertiary">
            <span>started {startedRelative || startedAbsolute}</span>
            {pipeline.prNumber && (
              <span>
                · PR{" "}
                <span className="text-brass">#{pipeline.prNumber}</span>
              </span>
            )}
            {ownerAgent && (
              <Link
                href={`/companies/${company.id}/agents/${ownerAgent.id}`}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <span className="text-text-dim">·</span>
                <span
                  className={cn(
                    "w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-mono",
                    roleColorBg[ownerColor]
                  )}
                >
                  {initial}
                </span>
                <span className="text-text-secondary">{ownerAgent.name}</span>
                <span className="text-text-dim">· {ownerAgent.model}</span>
              </Link>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 flex-shrink-0 w-[260px]">
          <div className="flex items-center justify-between w-full font-mono text-[10px] text-text-tertiary">
            <span>{completedPhases} of {totalPhases} phases</span>
            <span className="text-brass">{pipeline.progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-bg-deep rounded-sm overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-brass to-brass-bright"
              initial={false}
              animate={{ width: `${pipeline.progressPercent}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-5">
        <button
          type="button"
          className="px-3 py-1.5 rounded font-mono text-[11px] tracking-[0.05em] flex items-center gap-2 border bg-bg-surface text-text-secondary border-border-subtle hover:border-brass-muted transition-colors"
        >
          <Pause className="w-3 h-3" />
          PAUSE PIPELINE
        </button>
        <button
          type="button"
          className="px-3 py-1.5 rounded font-mono text-[11px] tracking-[0.05em] flex items-center gap-2 border bg-bg-surface text-text-secondary border-border-subtle hover:border-brass-muted transition-colors"
        >
          <Github className="w-3 h-3" />
          VIEW PR
          {pipeline.prNumber && <span className="text-brass">#{pipeline.prNumber}</span>}
        </button>
        <button
          type="button"
          disabled
          className="px-3 py-1.5 rounded font-mono text-[11px] tracking-[0.05em] flex items-center gap-2 border bg-bg-surface/40 text-text-dim border-border-subtle cursor-not-allowed"
        >
          <Archive className="w-3 h-3" />
          ARCHIVE
        </button>
      </div>
    </div>
  );
}
