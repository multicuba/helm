"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Company, StreamItem } from "@/lib/types";

export function LiveStreamPanel({
  company,
  demoMode = false,
}: {
  company: Company;
  demoMode?: boolean;
}) {
  const activeAgents = company.agents.filter((a) => a.status === "working").length;
  const [spend, setSpend] = useState(company.todaySpend);

  useEffect(() => {
    setSpend(company.todaySpend);
  }, [company.todaySpend]);

  useEffect(() => {
    if (!demoMode) return;
    const id = setInterval(() => {
      setSpend((prev) => +(prev + Math.random() * 0.04 + 0.01).toFixed(2));
    }, 3_000);
    return () => clearInterval(id);
  }, [demoMode]);

  const deltaPct = company.yesterdaySpend
    ? Math.round(((company.todaySpend - company.yesterdaySpend) / company.yesterdaySpend) * 100)
    : 0;
  const isDown = deltaPct < 0;

  const costBarPct = Math.min(
    100,
    Math.round((spend / Math.max(1, company.monthlyBudget / 30)) * 100)
  );

  return (
    <aside className="w-[320px] bg-bg-deep border-l border-border-subtle flex-shrink-0 px-5 py-6 overflow-y-auto">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-subtle">
        <div className="text-mono-label">Live stream</div>
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-success">
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-success"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          {activeAgents} agent{activeAgents === 1 ? "" : "s"}
        </div>
      </div>

      <div>
        {company.streamItems.map((item, i) => (
          <StreamRow key={item.id} item={item} delay={i * 0.05} />
        ))}
      </div>

      <div className="mt-5 p-3.5 bg-bg-surface border border-border-subtle rounded-md">
        <div className="flex items-center justify-between mb-2.5">
          <div className="text-mono-label">Today&apos;s spend</div>
          <div className="font-mono text-[10px] text-text-tertiary">
            {new Date().toLocaleString("en-US", { month: "long", day: "numeric" })}
          </div>
        </div>
        <div className="font-serif text-2xl text-text-primary mb-1">
          ${spend.toFixed(2)}
        </div>
        <div className="font-mono text-[10px] text-text-tertiary">
          {isDown ? "↓" : "↑"} {Math.abs(deltaPct)}% vs yesterday · model routing tuned
        </div>
        <div className="h-[3px] bg-bg-deep rounded-sm mt-2.5 overflow-hidden">
          <motion.div
            className="h-full bg-brass"
            initial={false}
            animate={{ width: `${costBarPct}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </div>
    </aside>
  );
}

function StreamRow({ item, delay }: { item: StreamItem; delay: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="py-3 border-b border-border-subtle last:border-b-0"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="font-mono text-[10px] text-brass tracking-[0.05em]">
          {item.agentLabel}
        </span>
        <span className="font-mono text-[10px] text-text-dim">{item.action}</span>
        <span className="ml-auto font-mono text-[9px] text-text-dim">
          {item.timeLabel}
        </span>
      </div>
      <div
        className="text-[12px] text-text-secondary leading-relaxed [&_code]:font-mono [&_code]:text-[11px] [&_code]:text-brass [&_code]:bg-bg-surface [&_code]:px-1.5 [&_code]:py-px [&_code]:rounded-sm"
        dangerouslySetInnerHTML={{ __html: item.body }}
      />
    </motion.div>
  );
}
