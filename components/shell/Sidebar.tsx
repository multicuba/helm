"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWorkspaceStore, useCompaniesStore } from "@/lib/stores";
import { Home, MessageSquare, GitBranch, Layers, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/command", label: "Command Center", icon: Home },
  { href: "/chat/t-ev-finder", label: "Helm Chat", icon: MessageSquare },
  { href: "/activity", label: "Activity", icon: GitBranch },
  { href: "/knowledge", label: "Knowledge", icon: Layers },
  { href: "/reports", label: "Reports", icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();
  const user = useWorkspaceStore((s) => s.user);
  const companies = useCompaniesStore((s) => s.companies);

  return (
    <aside className="w-[240px] bg-bg-deep border-r border-border-subtle flex flex-col flex-shrink-0">
      <div className="px-5 pt-5 pb-7 flex items-center gap-2.5 border-b border-border-subtle mb-5">
        <div className="relative w-7 h-7 rounded-full border-[1.5px] border-brass flex items-center justify-center">
          <div className="absolute w-[1.5px] h-5 top-[2px] bg-brass" />
          <div className="absolute h-[1.5px] w-5 left-[2px] bg-brass" />
        </div>
        <div className="font-serif text-xl font-medium">Helm</div>
      </div>

      <div className="px-3.5 pb-5">
        <div className="text-mono-label px-2 pb-2">Workspace</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href.split("/[")[0]);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 px-2 py-1.5 rounded text-[13px] relative",
                isActive
                  ? "bg-bg-surface text-text-primary"
                  : "text-text-secondary hover:bg-bg-surface hover:text-text-primary"
              )}
            >
              {isActive && (
                <div className="absolute -left-3.5 top-2 bottom-2 w-0.5 bg-brass" />
              )}
              <Icon className="w-3.5 h-3.5 opacity-80 flex-shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="px-3.5 pb-5 flex-1 overflow-y-auto">
        <div className="text-mono-label px-2 pb-2">
          Companies · {companies.length}
        </div>
        {companies.map((c) => (
          <Link
            key={c.id}
            href={`/companies/${c.id}`}
            className={cn(
              "flex items-center gap-2.5 px-2 py-1.5 rounded text-[13px] justify-between",
              pathname.includes(c.id)
                ? "bg-bg-surface text-text-primary"
                : "text-text-secondary hover:bg-bg-surface hover:text-text-primary"
            )}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className="w-2 h-2 rounded-sm flex-shrink-0"
                style={{ backgroundColor: c.colorHex }}
              />
              <span className="truncate">{c.name}</span>
            </div>
            <span className="font-mono text-[10px] text-text-dim flex-shrink-0">
              {c.openTickets}
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-auto px-5 py-4 border-t border-border-subtle flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brass to-brass-muted flex items-center justify-center font-serif text-[13px] font-medium text-bg-deep flex-shrink-0">
          {user?.initials ?? "DT"}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs text-text-primary truncate">{user?.name ?? "Daniel Torres"}</div>
          <div className="font-mono text-[10px] text-text-dim truncate">{user?.role}</div>
        </div>
      </div>
    </aside>
  );
}
