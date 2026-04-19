"use client";

import { useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Handle,
  Position,
  type Node,
  type Edge,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Lightbulb, Bug, Box, GraduationCap, type LucideIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Memory } from "@/lib/types";

type MemoryType = Memory["type"];

const TYPE_COLORS: Record<
  MemoryType,
  { bg: string; border: string; text: string }
> = {
  decision: {
    bg: "rgba(200, 155, 94, 0.12)",
    border: "#8a6d43",
    text: "#c89b5e",
  },
  bug: {
    bg: "rgba(194, 107, 85, 0.12)",
    border: "#6b3a2e",
    text: "#c26b55",
  },
  architecture: {
    bg: "rgba(74, 122, 130, 0.14)",
    border: "#2d4a52",
    text: "#4a7a82",
  },
  learning: {
    bg: "rgba(123, 160, 91, 0.12)",
    border: "#4d6639",
    text: "#7ba05b",
  },
};

const TYPE_ICON: Record<MemoryType, LucideIcon> = {
  decision: Lightbulb,
  bug: Bug,
  architecture: Box,
  learning: GraduationCap,
};

const CLUSTER_CENTERS: Record<MemoryType, { x: number; y: number }> = {
  decision: { x: -280, y: -190 },
  architecture: { x: 280, y: -190 },
  learning: { x: -280, y: 210 },
  bug: { x: 280, y: 210 },
};

const EDGE_STROKE_DEFAULT = "#3a3228";
const EDGE_STROKE_SELECTED = "#c89b5e";
const SELECTED_BORDER = "#c89b5e";

type MemoryNodeData = {
  memory: Memory;
  tooltip: string;
  createdLabel: string;
  isSelected: boolean;
  isDimmed: boolean;
};

type MemoryNodeType = Node<MemoryNodeData, "memory">;

function MemoryNode({ data }: NodeProps<MemoryNodeType>) {
  const { memory, tooltip, createdLabel, isSelected, isDimmed } = data;
  const Icon = TYPE_ICON[memory.type];
  const colors = TYPE_COLORS[memory.type];

  return (
    <div
      className="group relative transition-opacity duration-200"
      style={{ opacity: isDimmed ? 0.2 : 1 }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ opacity: 0, width: 1, height: 1, background: "transparent" }}
        isConnectable={false}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ opacity: 0, width: 1, height: 1, background: "transparent" }}
        isConnectable={false}
      />
      <div
        className="flex items-center justify-center rounded-full transition-[transform,box-shadow] duration-150 group-hover:scale-110"
        style={{
          width: 48,
          height: 48,
          backgroundColor: colors.bg,
          borderStyle: "solid",
          borderWidth: isSelected ? 2 : 1,
          borderColor: isSelected ? SELECTED_BORDER : colors.border,
          color: colors.text,
          boxShadow: isSelected
            ? "0 0 0 3px rgba(200, 155, 94, 0.25)"
            : "0 1px 0 rgba(0,0,0,0.35)",
        }}
      >
        <Icon size={20} strokeWidth={1.6} />
      </div>

      <div
        className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-150 bg-bg-elevated border border-border-strong rounded px-2.5 py-1.5 shadow-xl"
        style={{ width: 240 }}
      >
        <div className="text-[11px] leading-snug text-text-primary">
          {tooltip}
        </div>
        <div className="font-mono text-[9px] text-text-tertiary mt-0.5 uppercase tracking-[0.08em]">
          {createdLabel}
        </div>
      </div>
    </div>
  );
}

const nodeTypes = { memory: MemoryNode };

function computePositions(
  memories: Memory[]
): Record<string, { x: number; y: number }> {
  const byType: Record<MemoryType, Memory[]> = {
    decision: [],
    bug: [],
    architecture: [],
    learning: [],
  };
  for (const m of memories) byType[m.type].push(m);

  const result: Record<string, { x: number; y: number }> = {};
  (Object.keys(byType) as MemoryType[]).forEach((type) => {
    const items = byType[type];
    const center = CLUSTER_CENTERS[type];
    const n = items.length;
    items.forEach((m, i) => {
      if (n === 1) {
        result[m.id] = { x: center.x, y: center.y };
        return;
      }
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      const r = 110 + (i % 2) * 28;
      result[m.id] = {
        x: center.x + Math.cos(angle) * r,
        y: center.y + Math.sin(angle) * r,
      };
    });
  });
  return result;
}

function computeEdges(memories: Memory[]): Edge[] {
  const edges: Edge[] = [];
  for (let i = 0; i < memories.length; i++) {
    for (let j = i + 1; j < memories.length; j++) {
      const a = memories[i];
      const b = memories[j];
      const tagOverlap = a.tags.filter((t) => b.tags.includes(t)).length;
      const samePipeline =
        a.pipelineRef && b.pipelineRef && a.pipelineRef.id === b.pipelineRef.id;
      if (tagOverlap >= 2 || samePipeline) {
        edges.push({
          id: `${a.id}__${b.id}`,
          source: a.id,
          target: b.id,
        });
      }
    }
  }
  return edges;
}

function formatCreated(iso: string): string {
  try {
    return formatDistanceToNow(new Date(iso), { addSuffix: true });
  } catch {
    return iso;
  }
}

export function MemoryGraph({
  memories,
  matchedIds,
  selectedId,
  onSelect,
}: {
  memories: Memory[];
  matchedIds: Set<string>;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}) {
  const nodes = useMemo<MemoryNodeType[]>(() => {
    const positions = computePositions(memories);
    return memories.map((m) => ({
      id: m.id,
      type: "memory",
      position: positions[m.id] ?? { x: 0, y: 0 },
      data: {
        memory: m,
        tooltip: m.title,
        createdLabel: formatCreated(m.createdAt),
        isSelected: m.id === selectedId,
        isDimmed: !matchedIds.has(m.id),
      },
      draggable: true,
    }));
  }, [memories, matchedIds, selectedId]);

  const edges = useMemo<Edge[]>(() => {
    const base = computeEdges(memories);
    return base.map((e) => {
      const connected =
        selectedId != null && (e.source === selectedId || e.target === selectedId);
      const dimmed = !matchedIds.has(e.source) || !matchedIds.has(e.target);
      return {
        ...e,
        style: {
          stroke: connected ? EDGE_STROKE_SELECTED : EDGE_STROKE_DEFAULT,
          strokeWidth: connected ? 1.4 : 1,
          opacity: dimmed ? 0.12 : connected ? 0.95 : 0.55,
        },
      };
    });
  }, [memories, matchedIds, selectedId]);

  const minimapNodeColor = (node: Node) => {
    const m = (node.data as MemoryNodeData | undefined)?.memory;
    if (!m) return "#6b6358";
    return TYPE_COLORS[m.type].text;
  };

  return (
    <div className="w-full h-full bg-bg-page memory-graph-root">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3, maxZoom: 1.2 }}
        panOnScroll
        nodesDraggable
        nodesConnectable={false}
        elementsSelectable
        onNodeClick={(_, n) => onSelect(n.id)}
        onPaneClick={() => onSelect(null)}
        proOptions={{ hideAttribution: true }}
        minZoom={0.4}
        maxZoom={2}
      >
        <Background color="#2a241d" gap={24} size={1} />
        <Controls showInteractive position="top-right" />
        <MiniMap
          position="bottom-right"
          pannable
          zoomable
          maskColor="rgba(12, 10, 8, 0.7)"
          nodeStrokeWidth={0}
          nodeColor={minimapNodeColor}
          nodeBorderRadius={8}
        />
      </ReactFlow>
    </div>
  );
}
