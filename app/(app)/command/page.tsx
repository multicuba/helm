"use client";

import { useWorkspaceStore, useCompaniesStore, useApprovalsStore } from "@/lib/stores";
import { CompanyCard } from "@/components/command-center/CompanyCard";
import { StatsBar } from "@/components/command-center/StatsBar";
import { ActivityFeed } from "@/components/command-center/ActivityFeed";
import { ApprovalsList } from "@/components/command-center/ApprovalsList";
import { motion } from "framer-motion";
import { format } from "date-fns";

export default function CommandCenterPage() {
  const user = useWorkspaceStore((s) => s.user);
  const companies = useCompaniesStore((s) => s.companies);
  const approvals = useApprovalsStore((s) => s.approvals);

  const today = new Date();
  const agentsWorking = companies.reduce(
    (n, c) => n + c.agents.filter((a) => a.status === "working").length,
    0
  );

  return (
    <div className="px-8 py-9 max-w-[1400px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-display text-[44px] mb-2">
          Good morning,{" "}
          <em className="text-display-italic text-brass">
            {user?.name?.split(" ")[0] ?? "Daniel"}.
          </em>
        </h1>
        <div className="text-mono-meta">
          {format(today, "EEEE · MMMM d, yyyy")} · {companies.length} companies · {agentsWorking} agents active · {approvals.length} pending approval{approvals.length === 1 ? "" : "s"}
        </div>
      </motion.div>

      <StatsBar />

      <div className="flex items-end justify-between mb-5 mt-10">
        <h2 className="text-display-italic text-xl">Your companies</h2>
        <span className="text-mono-meta">Sorted by activity · past 24h</span>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-10">
        {companies.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
          >
            <CompanyCard company={c} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-[1.5fr_1fr] gap-6">
        <ActivityFeed />
        <ApprovalsList />
      </div>
    </div>
  );
}
