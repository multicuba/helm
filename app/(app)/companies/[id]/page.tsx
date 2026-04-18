"use client";

import { use, useState } from "react";
import { useCompaniesStore } from "@/lib/stores";
import { CompanySidebar } from "@/components/company/CompanySidebar";
import { SDDPipeline } from "@/components/company/SDDPipeline";
import { IssuesList } from "@/components/company/IssuesList";
import { LiveStreamPanel } from "@/components/company/LiveStreamPanel";
import { cn } from "@/lib/utils";
import { Play, Pause } from "lucide-react";
import { motion } from "framer-motion";

const TABS = [
  { key: "pipelines", label: "Pipelines" },
  { key: "issues", label: "Issues" },
  { key: "handoffs", label: "Handoffs" },
  { key: "activity", label: "Activity" },
  { key: "knowledge", label: "Knowledge" },
  { key: "settings", label: "Settings" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default function CompanyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const company = useCompaniesStore((s) => s.companies.find((c) => c.id === id));
  const [activeTab, setActiveTab] = useState<TabKey>("pipelines");
  const [demoMode, setDemoMode] = useState(false);

  if (!company) {
    return (
      <div className="px-8 py-9">
        <div className="text-mono-label mb-4">Company not found</div>
        <h1 className="text-display text-3xl">
          Couldn&apos;t find <em className="text-display-italic text-brass">{id}</em>
        </h1>
      </div>
    );
  }

  const blockedCount = company.pipelines.filter((p) =>
    p.phases.some((ph) => ph.status === "blocked")
  ).length;

  const tabCounts: Partial<Record<TabKey, number>> = {
    pipelines: company.pipelines.length,
    issues: company.issues.filter((i) => i.status !== "done").length,
    handoffs: blockedCount,
  };

  return (
    <div className="flex min-h-[calc(100vh-57px)]">
      <CompanySidebar company={company} />

      <div className="flex-1 min-w-0 bg-bg-page overflow-y-auto px-7 py-6">
        <div className="flex items-start justify-between gap-6 mb-1">
          <div>
            <h1 className="text-display text-[36px] leading-[1.1]">
              Pipelines{" "}
              <em className="text-display-italic text-brass">in flight.</em>
            </h1>
            <div className="font-mono text-[11px] text-text-tertiary mt-1">
              {company.pipelines.length} active · {blockedCount} blocked on your review · last updated 34s ago
            </div>
          </div>

          <button
            type="button"
            onClick={() => setDemoMode((v) => !v)}
            className={cn(
              "px-3 py-1.5 rounded font-mono text-[11px] tracking-[0.05em] flex items-center gap-2 border transition-colors",
              demoMode
                ? "bg-brass text-bg-deep border-brass"
                : "bg-bg-surface text-text-secondary border-border-subtle hover:border-brass-muted"
            )}
            aria-pressed={demoMode}
          >
            {demoMode ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            {demoMode ? "DEMO · ON" : "DEMO MODE"}
          </button>
        </div>

        <div className="flex border-b border-border-subtle mt-6 mb-6">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "px-4 py-2.5 pb-3 text-[13px] border-b-2 transition-colors",
                activeTab === tab.key
                  ? "text-text-primary border-brass"
                  : "text-text-tertiary border-transparent hover:text-text-secondary"
              )}
            >
              {tab.label}
              {tabCounts[tab.key] != null && (
                <span className="ml-1.5 font-mono text-[10px] px-1.5 py-px bg-bg-surface rounded-full text-text-tertiary">
                  {tabCounts[tab.key]}
                </span>
              )}
            </button>
          ))}
        </div>

        {activeTab === "pipelines" && (
          <div className="space-y-6">
            {company.pipelines.length === 0 ? (
              <EmptyState label="No pipelines in flight." />
            ) : (
              company.pipelines.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                >
                  <SDDPipeline pipeline={p} demoMode={demoMode} />
                </motion.div>
              ))
            )}

            {company.issues.length > 0 && (
              <div className="pt-4">
                <IssuesList issues={company.issues} />
              </div>
            )}
          </div>
        )}

        {activeTab === "issues" && (
          company.issues.length > 0 ? (
            <IssuesList issues={company.issues} />
          ) : (
            <EmptyState label="No open issues." />
          )
        )}

        {activeTab !== "pipelines" && activeTab !== "issues" && (
          <EmptyState
            label={`${TABS.find((t) => t.key === activeTab)?.label} — coming soon.`}
          />
        )}
      </div>

      <LiveStreamPanel company={company} demoMode={demoMode} />
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="bg-bg-surface border border-border-subtle rounded-md py-12 text-center">
      <div className="font-serif italic text-text-tertiary">{label}</div>
    </div>
  );
}
