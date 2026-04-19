"use client";

import { useMemo } from "react";
import {
  ReactFlow,
  Background,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { Memory } from "@/lib/types";

export function MemoryGraph({
  memories,
  selectedId,
  onSelect,
}: {
  memories: Memory[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const nodes = useMemo<Node[]>(() => {
    return memories.map((m, i) => {
      const col = i % 5;
      const row = Math.floor(i / 5);
      return {
        id: m.id,
        position: { x: col * 180, y: row * 140 },
        data: { label: m.title },
      };
    });
  }, [memories]);

  const edges = useMemo<Edge[]>(() => [], []);

  return (
    <div className="w-full h-full bg-bg-page">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        onNodeClick={(_, n) => onSelect(n.id)}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="var(--color-border-subtle)" gap={24} size={1} />
      </ReactFlow>
    </div>
  );
}
