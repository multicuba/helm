"use client";

import Link from "next/link";
import { MessageSquare } from "lucide-react";
import type { Thread, AgentRole } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ThreadList({
  threads,
  activeThreadId,
  roles,
  activeRoleId,
  onSelectRole,
}: {
  threads: Thread[];
  activeThreadId: string | null;
  roles: AgentRole[];
  activeRoleId: string;
  onSelectRole?: (id: string) => void;
}) {
  return (
    <aside className="w-[240px] bg-bg-deep border-r border-border-subtle flex-shrink-0 flex flex-col overflow-hidden">
      <div className="px-3.5 pt-5 pb-4">
        <div className="text-mono-label px-2 pb-2">Threads · {threads.length}</div>
        <div className="space-y-px">
          {threads.map((t) => (
            <Link
              key={t.id}
              href={`/chat/${t.id}`}
              className={cn(
                "flex items-center gap-2.5 px-2 py-1.5 rounded text-[13px] justify-between relative",
                t.id === activeThreadId
                  ? "bg-bg-surface text-text-primary"
                  : "text-text-secondary hover:bg-bg-surface hover:text-text-primary"
              )}
            >
              {t.id === activeThreadId && (
                <div className="absolute -left-3.5 top-2 bottom-2 w-0.5 bg-brass" />
              )}
              <div className="flex items-center gap-2.5 min-w-0">
                <MessageSquare className="w-3.5 h-3.5 opacity-70 flex-shrink-0" />
                <span className="truncate">{t.title}</span>
              </div>
              {t.id === "t-ev-finder" && (
                <span className="font-mono text-[9px] px-1.5 py-px bg-brass-deep text-brass-bright rounded-sm border border-brass-muted flex-shrink-0">
                  new
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>

      <div className="px-3.5 pb-5 border-t border-border-subtle pt-4">
        <div className="text-mono-label px-2 pb-2">Roles available</div>
        <div className="space-y-px">
          {roles.map((r) => {
            const isActive = r.id === activeRoleId;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => onSelectRole?.(r.id)}
                className={cn(
                  "w-full flex items-center gap-2.5 px-2 py-1.5 rounded text-[13px] text-left transition-colors",
                  isActive
                    ? "bg-brass/10 text-brass"
                    : "text-text-secondary hover:bg-bg-surface hover:text-text-primary"
                )}
              >
                <span
                  className="w-2 h-2 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: r.colorHex }}
                />
                <span className="truncate">{r.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-auto px-5 py-4 border-t border-border-subtle">
        <div className="text-mono-label mb-1.5">Shortcut</div>
        <div className="font-mono text-[11px] text-text-tertiary flex items-center gap-1.5">
          <kbd className="px-1.5 py-px bg-bg-surface border border-border-strong rounded-sm text-[10px]">⌘R</kbd>
          switch role
        </div>
      </div>
    </aside>
  );
}
