"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { useCompaniesStore } from "@/lib/stores";
import { cn } from "@/lib/utils";

const STAGES = [
  "Creating company entry",
  "Provisioning 3 pipelines (Discovery, MVP, Launch)",
  "Generating 8 issues from PRD",
  "Assigning 4 agents (Strategy, Tech, QA, Research)",
  "Setting up context graph",
] as const;

const STAGE_DELAY_MS = 600;

export function ConvertToCompanyDialog({
  open,
  onOpenChange,
  productName,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName: string;
}) {
  const router = useRouter();
  const convert = useCompaniesStore((s) => s.convertEVStationFinder);
  const [completed, setCompleted] = useState<number>(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!open) {
      setCompleted(0);
      setDone(false);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    STAGES.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setCompleted(i + 1);
          if (i === 0) {
            // Seed the company right when the first stage lands
            convert();
          }
          if (i === STAGES.length - 1) {
            setDone(true);
          }
        }, (i + 1) * STAGE_DELAY_MS)
      );
    });

    return () => timers.forEach(clearTimeout);
  }, [open, convert]);

  const handleOpen = () => {
    onOpenChange(false);
    router.push("/companies/ev-station-finder");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-bg-deep/80 backdrop-blur-sm" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Converting PRD to Company"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 4 }}
            transition={{ duration: 0.25 }}
            className="relative bg-bg-surface border border-brass-deep rounded-lg w-[480px] max-w-[92vw] shadow-2xl"
          >
            <div className="px-6 pt-6 pb-4">
              <div className="text-mono-label mb-2">From idea to factory</div>
              <h2 className="font-serif text-[22px] leading-[1.15] mb-1">
                {done ? (
                  <>
                    Ready. <em className="text-display-italic text-brass">{productName}</em> is live.
                  </>
                ) : (
                  <>
                    Converting PRD to <em className="text-display-italic text-brass">Company</em>…
                  </>
                )}
              </h2>
              <div className="font-mono text-[11px] text-text-tertiary">
                {done ? "All systems provisioned" : "~4 seconds · no refresh needed"}
              </div>
            </div>

            <div className="px-6 pb-5 space-y-2.5">
              {STAGES.map((label, i) => {
                const isDone = i < completed;
                const isActive = i === completed && !done;
                return (
                  <motion.div
                    key={label}
                    layout
                    className="flex items-start gap-3"
                    initial={false}
                    animate={{ opacity: isActive || isDone ? 1 : 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className={cn(
                        "w-4 h-4 rounded-full border flex-shrink-0 mt-[2px] flex items-center justify-center",
                        isDone
                          ? "bg-brass border-brass"
                          : isActive
                            ? "border-brass"
                            : "border-text-dim"
                      )}
                    >
                      {isDone && <Check className="w-3 h-3 text-bg-deep" strokeWidth={3} />}
                      {isActive && (
                        <motion.span
                          className="w-1.5 h-1.5 rounded-full bg-brass"
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 0.9, repeat: Infinity }}
                        />
                      )}
                    </div>
                    <div
                      className={cn(
                        "text-[13px] leading-[1.45]",
                        isDone || isActive ? "text-text-primary" : "text-text-tertiary"
                      )}
                    >
                      {label}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="px-6 py-4 border-t border-border-subtle flex items-center justify-end gap-2">
              {!done && (
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="px-3 py-1.5 text-[12px] text-text-tertiary hover:text-text-secondary transition-colors"
                >
                  Cancel
                </button>
              )}
              <motion.button
                type="button"
                onClick={handleOpen}
                disabled={!done}
                initial={false}
                animate={{
                  opacity: done ? 1 : 0.35,
                  y: done ? 0 : 2,
                }}
                transition={{ duration: 0.25 }}
                className={cn(
                  "px-3.5 py-2 font-medium text-[12px] rounded flex items-center gap-1.5 transition-colors",
                  done
                    ? "bg-brass text-bg-deep hover:bg-brass-bright cursor-pointer"
                    : "bg-brass-deep text-text-tertiary cursor-not-allowed"
                )}
              >
                Open {productName}
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
