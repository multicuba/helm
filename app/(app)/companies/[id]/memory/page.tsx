"use client";

import { use, useMemo, useState } from "react";
import dynamic from "next/dynamic";
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
  const [selectedId, setSelectedId] = useState<string | null>(null);

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

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return memories.filter((m) => {
      if (typeFilter !== "all" && m.type !== typeFilter) return false;
      if (!q) return true;
      return (
        m.title.toLowerCase().includes(q) ||
        m.content.toLowerCase().includes(q) ||
        m.tags.some((t) => t.toLowerCase().includes(q)) ||
        m.savedBy.toLowerCase().includes(q)
      );
    });
  }, [memories, query, typeFilter]);

  const selected = memories.find((m) => m.id === selectedId) ?? null;

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
    <div className="flex-1 min-w-0 bg-bg-page flex flex-col overflow-hidden">
      <MemoryHeader company={company} totalMemories={memories.length} />

      <MemoryFilters
        query={query}
        onQueryChange={setQuery}
        typeFilter={typeFilter}
        onTypeChange={setTypeFilter}
        counts={counts}
      />

      <div className="flex-1 min-h-0 flex">
        <div className="flex-1 min-w-0 relative">
          <MemoryGraph
            memories={filtered}
            selectedId={selected?.id ?? null}
            onSelect={(id) => setSelectedId(id)}
          />
        </div>

        <aside className="w-[440px] border-l border-border-subtle bg-bg-page overflow-y-auto flex-shrink-0">
          <MemoryDetail memory={selected} company={company} />
        </aside>
      </div>
    </div>
  );
}
