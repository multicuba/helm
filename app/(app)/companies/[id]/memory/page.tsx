"use client";

import { use, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Brain } from "lucide-react";
import { useCompaniesStore } from "@/lib/stores";
import { MemoryHeader } from "@/components/memory/MemoryHeader";
import { MemoryDetail } from "@/components/memory/MemoryDetail";
import {
  MemoryFilters,
  type MemoryTypeFilter,
} from "@/components/memory/MemoryFilters";

const MemoryGraph = dynamic(
  () => import("@/components/memory/MemoryGraph").then((m) => m.MemoryGraph),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="font-serif italic text-text-tertiary text-[13px]">
          Loading graph…
        </div>
      </div>
    ),
  }
);

export default function MemoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const company = useCompaniesStore((s) =>
    s.companies.find((c) => c.id === id)
  );
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<MemoryTypeFilter>("all");
  const [selectedMemoryId, setSelectedMemoryId] = useState<string | null>(null);

  const memories = company?.memories ?? [];

  const counts = useMemo(() => {
    return {
      all: memories.length,
      decision: memories.filter((m) => m.type === "decision").length,
      bug: memories.filter((m) => m.type === "bug").length,
      architecture: memories.filter((m) => m.type === "architecture").length,
      learning: memories.filter((m) => m.type === "learning").length,
    } satisfies Record<MemoryTypeFilter, number>;
  }, [memories]);

  const matchedIds = useMemo(() => {
    const q = query.trim().toLowerCase();
    const ids = new Set<string>();
    memories.forEach((m) => {
      if (typeFilter !== "all" && m.type !== typeFilter) return;
      if (q) {
        const hit =
          m.title.toLowerCase().includes(q) ||
          m.content.toLowerCase().includes(q) ||
          m.tags.some((t) => t.toLowerCase().includes(q)) ||
          m.savedBy.toLowerCase().includes(q);
        if (!hit) return;
      }
      ids.add(m.id);
    });
    return ids;
  }, [memories, query, typeFilter]);

  const selected =
    memories.find((m) => m.id === selectedMemoryId) ?? null;

  if (!company) {
    return (
      <div className="px-8 py-9">
        <div className="text-mono-label mb-4">Company not found</div>
        <h1 className="text-display text-3xl">
          Couldn&apos;t find{" "}
          <em className="text-display-italic text-brass">{id}</em>
        </h1>
      </div>
    );
  }

  return (
    <div className="h-full bg-bg-page flex flex-col overflow-hidden">
      <MemoryHeader company={company} totalMemories={memories.length} />

      <MemoryFilters
        query={query}
        onQueryChange={setQuery}
        typeFilter={typeFilter}
        onTypeChange={setTypeFilter}
        counts={counts}
      />

      {/* Desktop: graph + detail panel */}
      <div className="flex-1 min-h-0 hidden md:flex">
        <div className="flex-1 min-w-0 relative h-full">
          <MemoryGraph
            memories={memories}
            matchedIds={matchedIds}
            selectedId={selectedMemoryId}
            onSelect={setSelectedMemoryId}
          />
        </div>

        <aside className="w-[360px] border-l border-border-subtle bg-bg-page overflow-y-auto flex-shrink-0">
          <MemoryDetail memory={selected} company={company} />
        </aside>
      </div>

      {/* Mobile: graph-too-narrow fallback */}
      <div className="flex-1 min-h-0 flex md:hidden items-center justify-center px-8">
        <div className="max-w-xs text-center">
          <Brain
            className="w-8 h-8 text-brass mx-auto mb-4 opacity-80"
            strokeWidth={1.3}
          />
          <div className="text-display-italic text-[22px] leading-tight text-text-primary mb-3">
            Graph view is desktop-only.
          </div>
          <p className="font-mono text-[11px] leading-relaxed text-text-tertiary">
            Engram&apos;s memory graph needs more room than a phone can give.
            Open this page on a wider screen to explore the{" "}
            {memories.length} memories and their connections.
          </p>
        </div>
      </div>
    </div>
  );
}
