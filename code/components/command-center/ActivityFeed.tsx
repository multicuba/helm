"use client";

import { useActivityStore } from "@/lib/stores";
import { motion, AnimatePresence } from "framer-motion";

const levelColorMap = {
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  neutral: "bg-brass",
};

export function ActivityFeed() {
  const activity = useActivityStore((s) => s.activity);

  return (
    <div className="bg-bg-surface border border-border-subtle rounded-md">
      <div className="px-5 py-4 border-b border-border-subtle flex items-center justify-between">
        <div className="font-serif italic text-base">Recent activity</div>
        <span className="text-mono-meta">Live · last 2h</span>
      </div>
      <div className="py-2">
        <AnimatePresence initial={false}>
          {activity.slice(0, 6).map((a) => (
            <motion.div
              key={a.id}
              layout
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="px-5 py-3 flex items-start gap-3.5 border-b border-border-subtle last:border-b-0"
            >
              <div
                className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  levelColorMap[a.level]
                }`}
              />
              <div className="flex-1 min-w-0">
                <div className="text-[13px] text-text-primary mb-0.5 leading-snug">
                  {a.agentLabel && (
                    <span className="text-brass font-medium">{a.agentLabel}</span>
                  )}{" "}
                  {a.text}{" "}
                  <span className="font-mono text-[11px] text-text-tertiary bg-bg-deep px-1.5 py-px rounded-sm ml-1">
                    {a.companyName}
                  </span>
                </div>
                <div className="font-mono text-[10px] text-text-dim">{a.meta}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
