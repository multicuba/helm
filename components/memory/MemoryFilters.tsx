"use client";

import { Search } from "lucide-react";
import type { Memory } from "@/lib/types";
import { cn } from "@/lib/utils";

export type MemoryTypeFilter = Memory["type"] | "all";

export function MemoryFilters({
  query,
  onQueryChange,
  typeFilter,
  onTypeChange,
  counts,
}: {
  query: string;
  onQueryChange: (q: string) => void;
  typeFilter: MemoryTypeFilter;
  onTypeChange: (t: MemoryTypeFilter) => void;
  counts: Record<MemoryTypeFilter, number>;
}) {
  const filters: { key: MemoryTypeFilter; label: string; glyph?: string }[] = [
    { key: "all", label: "All" },
    { key: "decision", label: "Decisions", glyph: "◆" },
    { key: "bug", label: "Bugs", glyph: "⚠" },
    { key: "architecture", label: "Architecture", glyph: "▱" },
    { key: "learning", label: "Learnings", glyph: "✶" },
  ];

  return (
    <div className="px-7 py-2.5 border-b border-border-subtle flex items-center gap-4 flex-shrink-0">
      <div className="relative w-[280px] flex-shrink-0">
        <Search
          className="w-3.5 h-3.5 text-text-dim absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
          strokeWidth={1.5}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search memories, tags, content…"
          className="w-full bg-bg-page border border-border-subtle rounded px-8 py-1.5 text-[12px] text-text-primary placeholder:text-text-dim focus:outline-none focus:border-brass-muted transition-colors"
        />
      </div>

      <div className="flex flex-wrap gap-1 min-w-0">
        {filters.map((f) => {
          const isActive = typeFilter === f.key;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => onTypeChange(f.key)}
              className={cn(
                "font-mono text-[10px] tracking-[0.05em] uppercase px-2 py-1 rounded flex items-center gap-1.5 border transition-colors",
                isActive
                  ? "text-brass border-brass-deep bg-brass/5"
                  : "text-text-tertiary border-transparent hover:text-text-secondary hover:bg-bg-surface"
              )}
            >
              {f.glyph && <span>{f.glyph}</span>}
              {f.label}
              <span
                className={cn(
                  "font-mono text-[9px]",
                  isActive ? "text-brass/80" : "text-text-dim"
                )}
              >
                {counts[f.key]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
