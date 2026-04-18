"use client";

import type { Attachment as AttachmentType } from "@/lib/types";
import { cn } from "@/lib/utils";

const typeStyles: Record<AttachmentType["type"], { wrap: string; label: string }> = {
  pdf: { wrap: "bg-danger-muted text-danger", label: "PDF" },
  image: { wrap: "bg-teal-muted text-teal", label: "IMG" },
  audio: { wrap: "bg-brass-deep text-brass-bright", label: "WAV" },
};

export function Attachment({ attachment }: { attachment: AttachmentType }) {
  const s = typeStyles[attachment.type];
  return (
    <div className="inline-flex items-center gap-2.5 px-3.5 py-2 bg-bg-surface border border-border-subtle rounded-md">
      <div
        className={cn(
          "w-8 h-10 rounded-sm flex items-center justify-center font-mono text-[9px] font-semibold flex-shrink-0",
          s.wrap
        )}
      >
        {s.label}
      </div>
      <div className="leading-tight">
        <div className="text-[12px] text-text-primary font-medium">
          {attachment.fileName}
        </div>
        <div className="font-mono text-[10px] text-text-dim">
          {attachment.sizeLabel}
        </div>
      </div>
    </div>
  );
}
