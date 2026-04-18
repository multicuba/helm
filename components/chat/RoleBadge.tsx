"use client";

import type { AgentRole } from "@/lib/types";

export function RoleBadge({ role }: { role: AgentRole }) {
  return (
    <div
      className="inline-flex items-center gap-2.5 pl-2.5 pr-3 py-1.5 rounded-full bg-brass-deep border border-brass-muted"
      style={{ borderColor: "color-mix(in srgb, var(--color-brass-muted) 80%, transparent)" }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full animate-helm-pulse flex-shrink-0"
        style={{ backgroundColor: role.colorHex }}
      />
      <span className="font-serif italic text-[13px] text-brass-bright">
        {role.name}
      </span>
      <span className="font-mono text-[10px] text-text-tertiary tracking-[0.05em]">
        · {role.model} · {role.meta}
      </span>
    </div>
  );
}
