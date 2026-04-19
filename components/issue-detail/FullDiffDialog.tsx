"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, FilePlus, FileEdit, FileMinus } from "lucide-react";
import type { IssueCodeChange } from "@/lib/types";
import { cn } from "@/lib/utils";
import { MiniDiffViewer } from "./MiniDiffViewer";

const statusBadge: Record<
  IssueCodeChange["status"],
  { label: string; color: string; icon: React.ComponentType<{ className?: string }> }
> = {
  A: { label: "added", color: "text-success border-success/30 bg-success/5", icon: FilePlus },
  M: { label: "modified", color: "text-brass border-brass-deep bg-brass/5", icon: FileEdit },
  D: { label: "deleted", color: "text-danger border-danger-muted bg-danger/5", icon: FileMinus },
};

export function FullDiffDialog({
  open,
  onOpenChange,
  changes,
  issueCode,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  changes: IssueCodeChange[];
  issueCode: string;
}) {
  const totalAdded = changes.reduce((s, c) => s + c.linesAdded, 0);
  const totalRemoved = changes.reduce((s, c) => s + c.linesRemoved, 0);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-bg-deep/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className="fixed left-1/2 top-1/2 z-50 w-full max-w-[900px] max-h-[85vh] -translate-x-1/2 -translate-y-1/2 bg-bg-page border border-border-strong rounded-lg shadow-2xl shadow-bg-deep/80 overflow-hidden flex flex-col"
          aria-label={`Full diff for ${issueCode}`}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-border-subtle">
            <div>
              <DialogPrimitive.Title className="font-serif italic text-[18px] text-text-primary">
                Full diff — {issueCode}
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="font-mono text-[10px] text-text-tertiary mt-0.5 tracking-[0.05em]">
                {changes.length} files ·{" "}
                <span className="text-success">+{totalAdded}</span>{" "}
                <span className="text-danger">−{totalRemoved}</span>
              </DialogPrimitive.Description>
            </div>
            <DialogPrimitive.Close
              className="w-7 h-7 flex items-center justify-center rounded hover:bg-bg-surface text-text-tertiary hover:text-text-primary transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </DialogPrimitive.Close>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
            {changes.map((change) => {
              const b = statusBadge[change.status];
              const Icon = b.icon;
              return (
                <div key={change.filename}>
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={cn(
                        "font-mono text-[10px] px-1.5 py-0.5 rounded-sm border flex items-center gap-1",
                        b.color
                      )}
                    >
                      <Icon className="w-3 h-3" />
                      {b.label}
                    </span>
                    <span className="font-mono text-[12px] text-text-primary truncate">
                      {change.filename}
                    </span>
                    <span className="font-mono text-[10px] ml-auto whitespace-nowrap">
                      <span className="text-success">+{change.linesAdded}</span>{" "}
                      <span className="text-danger">−{change.linesRemoved}</span>
                    </span>
                  </div>
                  {change.diffSnippet ? (
                    <MiniDiffViewer diff={change.diffSnippet} maxLines={200} />
                  ) : (
                    <div className="font-mono text-[11px] text-text-dim italic px-3 py-2 border border-border-subtle rounded-md bg-bg-surface">
                      binary or diff not available
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
