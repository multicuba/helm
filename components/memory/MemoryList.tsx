"use client";

import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import type { Memory } from "@/lib/types";
import { cn } from "@/lib/utils";

const typeClass: Record<Memory["type"], string> = {
  decision: "text-brass border-brass-deep bg-brass/5",
  bug: "text-danger border-danger-muted bg-danger/5",
  architecture: "text-teal border-teal-muted bg-teal/5",
  learning: "text-success border-success/30 bg-success/5",
};

const typeGlyph: Record<Memory["type"], string> = {
  decision: "◆",
  bug: "⚠",
  architecture: "▱",
  learning: "✶",
};

export function MemoryList({
  memories,
  selectedId,
  onSelect,
}: {
  memories: Memory[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  if (memories.length === 0) {
    return (
      <div className="py-10 text-center">
        <div className="font-serif italic text-text-tertiary text-[13px]">
          No memories match.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {memories.map((m, i) => {
        const isActive = m.id === selectedId;
        let createdRel = "";
        try {
          createdRel = formatDistanceToNow(new Date(m.createdAt), {
            addSuffix: true,
          });
        } catch {
          createdRel = m.createdAt;
        }

        return (
          <motion.button
            key={m.id}
            type="button"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.02 }}
            onClick={() => onSelect(m.id)}
            className={cn(
              "text-left px-4 py-3.5 border-b border-border-subtle transition-colors relative",
              isActive
                ? "bg-bg-surface-2"
                : "bg-transparent hover:bg-bg-surface-2/50"
            )}
          >
            {isActive && (
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-brass" />
            )}
            <div className="flex items-start gap-2.5">
              <span
                className={cn(
                  "font-mono text-[9px] tracking-[0.1em] uppercase px-1.5 py-0.5 border rounded-sm flex items-center gap-1 flex-shrink-0 mt-0.5",
                  typeClass[m.type]
                )}
              >
                <span>{typeGlyph[m.type]}</span>
                {m.type}
              </span>
              <div className="min-w-0 flex-1">
                <div
                  className={cn(
                    "text-[13px] leading-[1.35] line-clamp-2",
                    isActive
                      ? "text-text-primary"
                      : "text-text-secondary"
                  )}
                >
                  {m.title}
                </div>
                <div className="font-mono text-[10px] text-text-tertiary mt-1.5 flex items-center gap-2 flex-wrap">
                  <span>{m.savedBy}</span>
                  <span className="text-text-dim">·</span>
                  <span>{createdRel}</span>
                  {m.referencedCount != null && (
                    <>
                      <span className="text-text-dim">·</span>
                      <span className="text-brass">
                        {m.referencedCount} refs
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
