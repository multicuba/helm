"use client";

import { usePathname, useRouter } from "next/navigation";
import { Search, Plus } from "lucide-react";
import { useCompaniesStore, useCommandPalette } from "@/lib/stores";

export function Topbar() {
  const pathname = usePathname();
  const router = useRouter();
  const openPalette = useCommandPalette((s) => s.setOpen);
  const companies = useCompaniesStore((s) => s.companies);

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0] ?? "command";
  const firstLabel = first.charAt(0).toUpperCase() + first.slice(1).replace("-", " ");

  let secondLabel: string | null = null;
  if (first === "companies" && segments[1]) {
    const c = companies.find((c) => c.id === segments[1]);
    secondLabel = c?.name ?? segments[1];
  } else if (first === "chat" && segments[1]) {
    secondLabel = "Interview";
  }

  return (
    <div className="px-8 py-4 flex items-center justify-between border-b border-border-subtle">
      <div className="text-mono-meta">
        Helm <span className="text-brass mx-1">/</span> {firstLabel}
        {secondLabel && (
          <>
            <span className="text-brass mx-1">/</span>
            <span className="text-text-secondary">{secondLabel}</span>
          </>
        )}
      </div>

      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => openPalette(true)}
          className="bg-bg-surface border border-border-subtle rounded px-2.5 py-1.5 flex items-center gap-2 w-[260px] text-xs text-text-tertiary hover:border-brass-muted hover:text-text-secondary transition-colors"
          aria-label="Open command palette"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="flex-1 text-left">Jump to anything</span>
          <kbd className="font-mono text-[10px] px-1.5 py-0.5 bg-bg-deep border border-border-strong rounded text-text-tertiary">
            ⌘K
          </kbd>
        </button>
        <button
          type="button"
          onClick={() => router.push("/chat/t-ev-finder")}
          className="px-3.5 py-1.5 bg-brass text-bg-deep font-medium text-xs rounded flex items-center gap-2 hover:bg-brass-bright transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          New Company
        </button>
      </div>
    </div>
  );
}
