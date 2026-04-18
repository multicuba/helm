"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Command } from "cmdk";
import {
  Home,
  MessageSquare,
  GitBranch,
  Layers,
  BarChart3,
  Plus,
  Compass,
  Sparkles,
} from "lucide-react";
import { useCompaniesStore, useCommandPalette } from "@/lib/stores";

const workspaceItems = [
  { label: "Command Center", href: "/command", icon: Home, hint: "home" },
  { label: "Helm Chat", href: "/chat/t-ev-finder", icon: MessageSquare, hint: "interview" },
  { label: "Activity", href: "/activity", icon: GitBranch, hint: "feed" },
  { label: "Knowledge", href: "/knowledge", icon: Layers, hint: "skills · sops" },
  { label: "Reports", href: "/reports", icon: BarChart3, hint: "spend · velocity" },
];

export function CommandPalette() {
  const router = useRouter();
  const open = useCommandPalette((s) => s.open);
  const setOpen = useCommandPalette((s) => s.setOpen);
  const toggle = useCommandPalette((s) => s.toggle);
  const companies = useCompaniesStore((s) => s.companies);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggle]);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-bg-deep/70 backdrop-blur-sm" />
        <DialogPrimitive.Content
          className="fixed left-1/2 top-[22%] z-50 w-full max-w-[560px] -translate-x-1/2 bg-bg-surface border border-border-strong rounded-lg shadow-2xl shadow-bg-deep/80 overflow-hidden"
          aria-label="Command palette"
        >
          <DialogPrimitive.Title className="sr-only">
            Jump to anything
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Search companies, screens, and quick actions.
          </DialogPrimitive.Description>

          <Command
            loop
            className="bg-transparent"
            filter={(value, search) => {
              if (!search) return 1;
              return value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
            }}
          >
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border-subtle">
              <Compass className="w-4 h-4 text-brass flex-shrink-0" />
              <Command.Input
                autoFocus
                placeholder="Jump to anything — company, screen, action…"
                className="flex-1 bg-transparent outline-none text-[14px] text-text-primary placeholder:text-text-tertiary"
              />
              <kbd className="font-mono text-[10px] px-1.5 py-0.5 bg-bg-deep border border-border-strong rounded text-text-tertiary">
                ESC
              </kbd>
            </div>

            <Command.List className="max-h-[360px] overflow-y-auto px-2 py-2">
              <Command.Empty className="px-3 py-8 text-center text-mono-meta">
                No matches. Try another keyword.
              </Command.Empty>

              <Command.Group
                heading="Companies"
                className="[&_[cmdk-group-heading]]:text-mono-label [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:pb-1.5"
              >
                {companies.map((c) => (
                  <Command.Item
                    key={c.id}
                    value={`company ${c.name} ${c.industry}`}
                    onSelect={() => go(`/companies/${c.id}`)}
                    className="flex items-center gap-3 px-2 py-2 rounded text-[13px] text-text-secondary cursor-pointer data-[selected=true]:bg-bg-surface-2 data-[selected=true]:text-text-primary"
                  >
                    <div
                      className="w-2 h-2 rounded-sm flex-shrink-0"
                      style={{ backgroundColor: c.colorHex }}
                    />
                    <span className="flex-1 truncate">{c.name}</span>
                    <span className="font-mono text-[10px] text-text-dim">
                      {c.industry}
                    </span>
                  </Command.Item>
                ))}
              </Command.Group>

              <Command.Group
                heading="Workspace"
                className="[&_[cmdk-group-heading]]:text-mono-label [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1.5"
              >
                {workspaceItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Command.Item
                      key={item.href}
                      value={`screen ${item.label} ${item.hint}`}
                      onSelect={() => go(item.href)}
                      className="flex items-center gap-3 px-2 py-2 rounded text-[13px] text-text-secondary cursor-pointer data-[selected=true]:bg-bg-surface-2 data-[selected=true]:text-text-primary"
                    >
                      <Icon className="w-3.5 h-3.5 opacity-80 flex-shrink-0" />
                      <span className="flex-1 truncate">{item.label}</span>
                      <span className="font-mono text-[10px] text-text-dim">
                        {item.hint}
                      </span>
                    </Command.Item>
                  );
                })}
              </Command.Group>

              <Command.Group
                heading="Actions"
                className="[&_[cmdk-group-heading]]:text-mono-label [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1.5"
              >
                <Command.Item
                  value="action new company interview"
                  onSelect={() => go("/chat/t-ev-finder")}
                  className="flex items-center gap-3 px-2 py-2 rounded text-[13px] text-text-secondary cursor-pointer data-[selected=true]:bg-bg-surface-2 data-[selected=true]:text-text-primary"
                >
                  <Plus className="w-3.5 h-3.5 text-brass flex-shrink-0" />
                  <span className="flex-1 truncate">
                    New company — start interview
                  </span>
                  <span className="font-mono text-[10px] text-text-dim">
                    chat
                  </span>
                </Command.Item>
                <Command.Item
                  value="action take tour walkthrough"
                  onSelect={() => setOpen(false)}
                  className="flex items-center gap-3 px-2 py-2 rounded text-[13px] text-text-secondary cursor-pointer data-[selected=true]:bg-bg-surface-2 data-[selected=true]:text-text-primary"
                >
                  <Sparkles className="w-3.5 h-3.5 text-brass flex-shrink-0" />
                  <span className="flex-1 truncate">Take a tour</span>
                  <span className="font-mono text-[10px] text-text-dim">
                    day 8
                  </span>
                </Command.Item>
              </Command.Group>
            </Command.List>

            <div className="flex items-center justify-between px-4 py-2.5 border-t border-border-subtle bg-bg-deep/40">
              <div className="font-mono text-[10px] text-text-dim flex items-center gap-3">
                <span>
                  <kbd className="px-1 py-0.5 bg-bg-surface border border-border-strong rounded-sm">↑↓</kbd>{" "}
                  navigate
                </span>
                <span>
                  <kbd className="px-1 py-0.5 bg-bg-surface border border-border-strong rounded-sm">↩</kbd>{" "}
                  select
                </span>
              </div>
              <div className="font-mono text-[10px] text-text-dim">
                {companies.length} companies · 5 screens
              </div>
            </div>
          </Command>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
