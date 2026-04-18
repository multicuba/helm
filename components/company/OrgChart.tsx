"use client";

import type { Agent } from "@/lib/types";
import { cn } from "@/lib/utils";

const roleColorMap: Record<string, string> = {
  brass: "bg-brass text-bg-deep",
  teal: "bg-teal-muted text-teal",
  success: "bg-success/20 text-success",
  warning: "bg-warning/15 text-warning",
  danger: "bg-danger-muted text-danger",
  neutral: "bg-bg-elevated text-text-secondary",
};

const statusDotMap: Record<string, string> = {
  working: "bg-success",
  idle: "bg-text-dim",
  blocked: "bg-danger",
  offline: "bg-text-dim",
};

export function OrgChart({
  agents,
  activeAgentId,
  onSelect,
}: {
  agents: Agent[];
  activeAgentId?: string;
  onSelect?: (id: string) => void;
}) {
  const ceo = agents.find((a) => a.shortRole === "CEO");
  const reports = agents.filter((a) => a.shortRole !== "CEO");

  return (
    <div className="relative">
      {ceo && (
        <AgentNode
          agent={ceo}
          active={activeAgentId === ceo.id}
          onSelect={onSelect}
        />
      )}
      {reports.map((a) => (
        <AgentNode
          key={a.id}
          agent={a}
          indent
          active={activeAgentId === a.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

function AgentNode({
  agent,
  indent = false,
  active = false,
  onSelect,
}: {
  agent: Agent;
  indent?: boolean;
  active?: boolean;
  onSelect?: (id: string) => void;
}) {
  const avatarClass = roleColorMap[agent.roleColor] ?? roleColorMap.neutral;
  const statusDot = statusDotMap[agent.status] ?? "bg-text-dim";

  return (
    <button
      type="button"
      onClick={() => onSelect?.(agent.id)}
      className={cn(
        "group relative flex items-center gap-2.5 w-full text-left px-2.5 py-2 rounded cursor-pointer hover:bg-bg-surface transition-colors",
        indent && "pl-[26px]",
        active && "bg-bg-surface border border-brass-deep"
      )}
    >
      {indent && (
        <>
          <span className="absolute left-4 top-0 bottom-1/2 w-px bg-border-strong" />
          <span className="absolute left-4 top-1/2 w-2 h-px bg-border-strong" />
        </>
      )}
      <span className="relative flex-shrink-0">
        <span
          className={cn(
            "w-6 h-6 rounded-full flex items-center justify-center font-mono text-[9px] font-semibold",
            avatarClass
          )}
        >
          {agent.shortRole}
        </span>
        <span
          className={cn(
            "absolute -bottom-px -right-px w-2 h-2 rounded-full border-2 border-bg-deep",
            statusDot
          )}
        />
      </span>
      <div className="flex-1 min-w-0">
        <div className="text-[12px] text-text-primary font-medium leading-tight truncate">
          {agent.role}
        </div>
        <div className="font-mono text-[10px] text-text-dim truncate">
          {agent.model}
        </div>
      </div>
    </button>
  );
}
