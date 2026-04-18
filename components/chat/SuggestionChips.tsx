"use client";

import type { SuggestionGroup } from "@/lib/types";

export function SuggestionChips({
  groups,
  onPick,
}: {
  groups: SuggestionGroup[];
  onPick?: (value: string) => void;
}) {
  return (
    <div className="ml-[34px] mt-3.5 space-y-2">
      {groups.map((g) => (
        <div key={g.label}>
          <div className="text-mono-label mb-1.5">{g.label}</div>
          <div className="flex flex-wrap gap-2">
            {g.options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => onPick?.(opt)}
                className="px-3 py-1.5 bg-bg-surface border border-border-subtle rounded-full text-[12px] text-text-secondary hover:border-brass hover:text-brass transition-colors"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
