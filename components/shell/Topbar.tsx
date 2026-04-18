"use client";

import { usePathname } from "next/navigation";
import { Search, Plus } from "lucide-react";

export function Topbar() {
  const pathname = usePathname();
  const crumb = pathname.split("/").filter(Boolean)[0] ?? "command";
  const crumbLabel = crumb.charAt(0).toUpperCase() + crumb.slice(1).replace("-", " ");

  return (
    <div className="px-8 py-4 flex items-center justify-between border-b border-border-subtle">
      <div className="text-mono-meta">
        Helm <span className="text-brass mx-1">/</span> {crumbLabel}
      </div>

      <div className="flex items-center gap-2.5">
        <div className="bg-bg-surface border border-border-subtle rounded px-2.5 py-1.5 flex items-center gap-2 w-[260px] text-xs text-text-tertiary">
          <Search className="w-3.5 h-3.5" />
          <span className="flex-1">Jump to anything</span>
          <kbd className="font-mono text-[10px] px-1.5 py-0.5 bg-bg-deep border border-border-strong rounded text-text-tertiary">
            ⌘K
          </kbd>
        </div>
        <button className="px-3.5 py-1.5 bg-brass text-bg-deep font-medium text-xs rounded flex items-center gap-2 hover:bg-brass-bright transition-colors">
          <Plus className="w-3.5 h-3.5" />
          New Company
        </button>
      </div>
    </div>
  );
}
