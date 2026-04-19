"use client";

import { useState } from "react";
import { FilePlus, FileEdit, FileMinus, Code2 } from "lucide-react";
import type { IssueCodeChange } from "@/lib/types";
import { cn } from "@/lib/utils";
import { MiniDiffViewer } from "./MiniDiffViewer";
import { FullDiffDialog } from "./FullDiffDialog";

const statusBadge: Record<
  IssueCodeChange["status"],
  { label: string; color: string; icon: React.ComponentType<{ className?: string }> }
> = {
  A: { label: "A", color: "text-success border-success/30 bg-success/5", icon: FilePlus },
  M: { label: "M", color: "text-brass border-brass-deep bg-brass/5", icon: FileEdit },
  D: { label: "D", color: "text-danger border-danger-muted bg-danger/5", icon: FileMinus },
};

export function CodeChangesStrip({
  changes,
  issueCode,
}: {
  changes: IssueCodeChange[];
  issueCode: string;
}) {
  const [open, setOpen] = useState(false);

  const featured = changes.find((c) => c.diffSnippet) ?? changes[0];
  const remainingCount = changes.length - 1;

  const totalAdded = changes.reduce((s, c) => s + c.linesAdded, 0);
  const totalRemoved = changes.reduce((s, c) => s + c.linesRemoved, 0);

  return (
    <div className="mt-10 border-t border-border-subtle pt-7">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-brass" />
          <h2 className="font-serif italic text-[18px] text-text-primary">
            Code changes
          </h2>
          <span className="font-mono text-[10px] text-text-tertiary ml-1">
            {changes.length} files ·{" "}
            <span className="text-success">+{totalAdded}</span>{" "}
            <span className="text-danger">−{totalRemoved}</span>
          </span>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="px-3 py-1.5 rounded font-mono text-[10px] tracking-[0.05em] border bg-bg-surface text-text-secondary border-border-subtle hover:border-brass-muted transition-colors"
        >
          VIEW FULL DIFF
        </button>
      </div>

      <ul className="bg-bg-surface border border-border-subtle rounded-md overflow-hidden mb-4">
        {changes.map((c) => {
          const b = statusBadge[c.status];
          const Icon = b.icon;
          return (
            <li
              key={c.filename}
              className="flex items-center gap-3 px-4 py-2.5 border-b border-border-subtle last:border-b-0"
            >
              <span
                className={cn(
                  "font-mono text-[10px] w-5 h-5 rounded-sm border flex items-center justify-center",
                  b.color
                )}
                title={b.label}
              >
                <Icon className="w-3 h-3" />
              </span>
              <span className="font-mono text-[12px] text-text-primary truncate flex-1">
                {c.filename}
              </span>
              <span className="font-mono text-[10px] whitespace-nowrap">
                <span className="text-success">+{c.linesAdded}</span>{" "}
                <span className="text-danger">−{c.linesRemoved}</span>
              </span>
            </li>
          );
        })}
      </ul>

      {featured?.diffSnippet && (
        <div>
          <div className="font-mono text-[10px] text-text-dim uppercase tracking-[0.15em] mb-2">
            Preview · {featured.filename}
          </div>
          <MiniDiffViewer diff={featured.diffSnippet} maxLines={20} />
          {remainingCount > 0 && (
            <p className="font-mono text-[10px] text-text-dim italic mt-2">
              … {remainingCount} more{" "}
              {remainingCount === 1 ? "file" : "files"} in full diff
            </p>
          )}
        </div>
      )}

      <FullDiffDialog
        open={open}
        onOpenChange={setOpen}
        changes={changes}
        issueCode={issueCode}
      />
    </div>
  );
}
