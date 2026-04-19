"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { SOP, Agent } from "@/lib/types";
import { cn } from "@/lib/utils";

const roleColorBg: Record<string, string> = {
  brass: "bg-brass/15 text-brass border-brass/40",
  teal: "bg-teal/15 text-teal border-teal/40",
  success: "bg-success/15 text-success border-success/40",
  warning: "bg-warning/15 text-warning border-warning/40",
  danger: "bg-danger/15 text-danger border-danger/40",
  neutral: "bg-bg-surface text-text-secondary border-border-subtle",
};

export function SOPAccordion({
  sops,
  agents,
}: {
  sops: SOP[];
  agents: Agent[];
}) {
  const [openId, setOpenId] = useState<string | null>(sops[0]?.id ?? null);

  if (sops.length === 0) {
    return (
      <div className="bg-bg-surface border border-border-subtle rounded-md py-12 text-center">
        <div className="font-serif italic text-text-tertiary">
          No SOPs documented yet.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {sops.map((sop, i) => {
        const isOpen = openId === sop.id;
        const linkedAgents = sop.linkedAgentIds
          .map((id) => agents.find((a) => a.id === id))
          .filter(Boolean) as Agent[];

        let triggeredRel = "";
        if (sop.lastTriggeredAt) {
          try {
            triggeredRel = formatDistanceToNow(new Date(sop.lastTriggeredAt), {
              addSuffix: true,
            });
          } catch {
            triggeredRel = sop.lastTriggeredAt;
          }
        }

        return (
          <motion.div
            key={sop.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className={cn(
              "bg-bg-surface border rounded-lg overflow-hidden transition-colors",
              isOpen ? "border-brass-muted" : "border-border-subtle"
            )}
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : sop.id)}
              className="w-full flex items-center justify-between gap-5 px-5 py-4 text-left hover:bg-bg-surface-2 transition-colors"
              aria-expanded={isOpen}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-mono text-[10px] text-brass tracking-[0.1em]">
                    SOP · {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[10px] text-text-tertiary">
                    {sop.steps.length} steps
                  </span>
                </div>
                <h3 className="text-display-italic text-[20px] leading-[1.15] text-text-primary">
                  {sop.title}
                </h3>
                <p className="text-[12px] text-text-secondary mt-1">
                  {sop.description}
                </p>
              </div>

              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1.5">
                    {linkedAgents.slice(0, 4).map((a) => {
                      const initial = (a.shortRole ?? a.name).charAt(0).toUpperCase();
                      return (
                        <div
                          key={a.id}
                          className={cn(
                            "w-5 h-5 rounded-full border flex items-center justify-center text-[9px] font-mono font-semibold ring-2 ring-bg-surface",
                            roleColorBg[a.roleColor]
                          )}
                          title={a.name}
                        >
                          {initial}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-text-tertiary"
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="overflow-hidden border-t border-border-subtle"
                >
                  <div className="px-5 py-5 bg-bg-page">
                    <ol className="flex flex-col gap-3">
                      {sop.steps.map((step, si) => (
                        <li key={step.title} className="flex gap-3.5">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full border border-brass-deep bg-brass/5 flex items-center justify-center font-mono text-[10px] text-brass">
                            {si + 1}
                          </span>
                          <div className="flex-1 min-w-0 pt-0.5">
                            <div className="text-[13px] text-text-primary font-medium">
                              {step.title}
                            </div>
                            {step.detail && (
                              <div className="text-[12px] text-text-secondary mt-0.5">
                                {step.detail}
                              </div>
                            )}
                          </div>
                        </li>
                      ))}
                    </ol>

                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-5 pt-4 border-t border-border-subtle font-mono text-[10px] text-text-tertiary">
                      <span>
                        <span className="text-brass">
                          {sop.triggeredThisMonth}
                        </span>{" "}
                        triggers this month
                      </span>
                      {triggeredRel && <span>· last fired {triggeredRel}</span>}
                      <span>
                        · linked agents:{" "}
                        {linkedAgents.map((a) => a.shortRole).join(" · ")}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
