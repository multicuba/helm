"use client";

import { useApprovalsStore } from "@/lib/stores";
import { motion, AnimatePresence } from "framer-motion";

export function ApprovalsList() {
  const approvals = useApprovalsStore((s) => s.approvals);
  const approve = useApprovalsStore((s) => s.approve);
  const reject = useApprovalsStore((s) => s.reject);

  return (
    <div className="bg-bg-surface border border-border-subtle rounded-md">
      <div className="px-5 py-4 border-b border-border-subtle flex items-center justify-between">
        <div className="font-serif italic text-base">Pending your approval</div>
        <span className="text-mono-meta">{approvals.length}</span>
      </div>
      <div>
        <AnimatePresence initial={false}>
          {approvals.slice(0, 3).map((a) => (
            <motion.div
              key={a.id}
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="px-5 py-3.5 border-b border-border-subtle last:border-b-0 hover:bg-brass/[0.03] cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="text-[13px] text-text-primary font-medium">
                  {a.title}
                </div>
                <div className="font-mono text-[10px] text-brass px-1.5 py-0.5 border border-brass-deep rounded-sm">
                  {a.tag}
                </div>
              </div>
              <div className="text-xs text-text-tertiary mb-2.5 leading-relaxed">
                {a.description}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    approve(a.id);
                  }}
                  className="px-2.5 py-1 text-[11px] rounded-sm bg-success text-bg-deep font-medium hover:opacity-90 transition-opacity"
                >
                  Approve
                </button>
                <button className="px-2.5 py-1 text-[11px] rounded-sm border border-border-strong text-text-secondary font-medium hover:border-brass-muted hover:text-text-primary transition-colors">
                  Review
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    reject(a.id);
                  }}
                  className="px-2.5 py-1 text-[11px] rounded-sm border border-danger-muted text-danger font-medium hover:bg-danger/5 transition-colors"
                >
                  Reject
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {approvals.length === 0 && (
          <div className="px-5 py-8 text-center text-mono-meta">
            All clear. Nothing pending.
          </div>
        )}
      </div>
    </div>
  );
}
