"use client";

import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import type { PRDPreview } from "@/lib/types";
import { ConvertToCompanyDialog } from "./ConvertToCompanyDialog";

export function PRDPreviewCard({ preview }: { preview: PRDPreview }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="max-w-[580px] bg-bg-surface border border-brass-deep rounded-md overflow-hidden">
        <div className="px-[18px] py-3.5 border-b border-border-subtle flex items-center justify-between">
          <div className="font-mono text-[10px] text-brass tracking-[0.15em] uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brass" />
            Draft PRD · auto-generated
          </div>
          <div className="font-mono text-[10px] text-text-tertiary">
            v0.1 · {preview.confidencePercent}% complete
          </div>
        </div>

        <div className="p-[18px]">
          <div className="font-serif text-[22px] font-medium tracking-[-0.02em] mb-2">
            {preview.title}
          </div>
          <div className="text-[13px] text-text-secondary leading-[1.5] mb-5">
            {preview.description}
          </div>

          <div className="grid grid-cols-2 gap-x-5 gap-y-3 mb-5">
            <Spec label="Recommended stack">
              <div className="flex flex-wrap gap-1">
                {preview.stackPills.map((p) => (
                  <span
                    key={p}
                    className="inline-block px-2 py-[2px] bg-brass-deep border border-brass-muted rounded-sm font-mono text-[11px] text-brass-bright"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </Spec>
            <Spec label="Parent company">
              <div className="text-[13px] text-text-primary">{preview.parentCompany}</div>
            </Spec>
            <Spec label="Core features · v1">
              <div className="text-[13px] text-text-primary">{preview.coreFeatures}</div>
            </Spec>
            <Spec label="Agents to hire">
              <div className="text-[13px] text-text-primary">{preview.agentsToHire}</div>
            </Spec>
          </div>

          <div className="flex items-center gap-2 pt-4 border-t border-border-subtle">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="px-3 py-2 bg-brass text-bg-deep font-medium text-[12px] rounded flex items-center gap-1.5 hover:bg-brass-bright transition-colors"
            >
              <Check className="w-3.5 h-3.5" />
              Convert to Company
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              className="px-3 py-2 bg-transparent text-text-secondary font-medium text-[12px] rounded border border-border-subtle hover:border-brass-muted hover:text-text-primary transition-colors"
            >
              Refine PRD
            </button>
            <button
              type="button"
              className="px-3 py-2 bg-transparent text-text-tertiary font-medium text-[12px] rounded hover:text-text-secondary transition-colors"
            >
              Export as PDF
            </button>
          </div>
        </div>
      </div>

      <ConvertToCompanyDialog
        open={open}
        onOpenChange={setOpen}
        productName={preview.title}
      />
    </>
  );
}

function Spec({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-mono-label mb-1">{label}</div>
      {children}
    </div>
  );
}
