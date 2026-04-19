"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { format, formatDistanceToNow } from "date-fns";
import { GitBranch, AlertTriangle, Clock, ArrowUpRight } from "lucide-react";
import type { Memory, Company } from "@/lib/types";
import { cn } from "@/lib/utils";

const typeClass: Record<Memory["type"], string> = {
  decision: "text-brass border-brass-deep bg-brass/5",
  bug: "text-danger border-danger-muted bg-danger/5",
  architecture: "text-teal border-teal-muted bg-teal/5",
  learning: "text-success border-success/30 bg-success/5",
};

const typeLabel: Record<Memory["type"], string> = {
  decision: "Decision",
  bug: "Bug",
  architecture: "Architecture",
  learning: "Learning",
};

export function MemoryDetail({
  memory,
  company,
}: {
  memory: Memory | null;
  company: Company;
}) {
  if (!memory) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="font-serif italic text-text-tertiary text-[14px]">
          Select a memory to inspect.
        </div>
      </div>
    );
  }

  let createdAbsolute = memory.createdAt;
  let createdRel = "";
  try {
    const d = new Date(memory.createdAt);
    createdAbsolute = format(d, "MMM d, yyyy · HH:mm");
    createdRel = formatDistanceToNow(d, { addSuffix: true });
  } catch {
    /* keep raw */
  }

  let accessedRel = "";
  if (memory.lastAccessedAt) {
    try {
      accessedRel = formatDistanceToNow(new Date(memory.lastAccessedAt), {
        addSuffix: true,
      });
    } catch {
      accessedRel = memory.lastAccessedAt;
    }
  }

  return (
    <motion.div
      key={memory.id}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="px-8 py-7 max-w-[820px]"
    >
      <div className="flex items-center gap-2 mb-4">
        <span
          className={cn(
            "font-mono text-[10px] tracking-[0.1em] uppercase px-2 py-0.5 border rounded-sm",
            typeClass[memory.type]
          )}
        >
          {typeLabel[memory.type]}
        </span>
        <span className="font-mono text-[10px] text-text-tertiary">
          MEM · {memory.id}
        </span>
      </div>

      <h2 className="text-display-italic text-[28px] leading-[1.15] text-text-primary mb-5">
        {memory.title}
      </h2>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 font-mono text-[11px] text-text-tertiary mb-6">
        <span>
          saved by{" "}
          <span className="text-text-secondary">{memory.savedBy}</span>
        </span>
        <span>·</span>
        <span title={createdAbsolute}>{createdRel || createdAbsolute}</span>
        {memory.referencedCount != null && (
          <>
            <span>·</span>
            <span>
              <span className="text-brass">{memory.referencedCount}</span>{" "}
              agent references
            </span>
          </>
        )}
        {accessedRel && (
          <>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              last accessed {accessedRel}
            </span>
          </>
        )}
      </div>

      <div className="bg-bg-surface border border-border-subtle rounded-lg px-6 py-5 mb-6">
        <div className="text-mono-label mb-3">Content</div>
        <p className="text-[14px] text-text-primary leading-relaxed whitespace-pre-wrap">
          {memory.content}
        </p>
      </div>

      {(memory.pipelineRef || memory.issueRef) && (
        <div className="flex flex-col gap-2 mb-6">
          <div className="text-mono-label mb-1">Linked to</div>
          {memory.pipelineRef && (
            <Link
              href={`/companies/${company.id}/pipelines/${memory.pipelineRef.id}`}
              className="group flex items-center justify-between gap-3 px-4 py-3 bg-bg-surface border border-border-subtle rounded hover:border-brass-muted transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <GitBranch
                  className="w-3.5 h-3.5 text-brass flex-shrink-0"
                  strokeWidth={1.5}
                />
                <div className="min-w-0">
                  <div className="font-mono text-[10px] text-text-tertiary uppercase tracking-[0.08em]">
                    Pipeline
                  </div>
                  <div className="text-[13px] text-text-primary truncate">
                    {memory.pipelineRef.label}
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-text-tertiary group-hover:text-brass transition-colors flex-shrink-0" />
            </Link>
          )}
          {memory.issueRef && (
            <div className="flex items-center justify-between gap-3 px-4 py-3 bg-bg-surface border border-border-subtle rounded">
              <div className="flex items-center gap-3 min-w-0">
                <AlertTriangle
                  className="w-3.5 h-3.5 text-warning flex-shrink-0"
                  strokeWidth={1.5}
                />
                <div className="min-w-0">
                  <div className="font-mono text-[10px] text-text-tertiary uppercase tracking-[0.08em]">
                    Issue · {memory.issueRef.code}
                  </div>
                  <div className="text-[13px] text-text-primary truncate">
                    {memory.issueRef.title}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {memory.tags.length > 0 && (
        <div className="mb-2">
          <div className="text-mono-label mb-2">Tags</div>
          <div className="flex flex-wrap gap-1.5">
            {memory.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] text-text-secondary px-2 py-0.5 bg-bg-surface border border-border-subtle rounded-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
