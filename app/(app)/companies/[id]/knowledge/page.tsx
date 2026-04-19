"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useCompaniesStore } from "@/lib/stores";
import { KnowledgeHeader } from "@/components/knowledge/KnowledgeHeader";
import { SkillsGrid } from "@/components/knowledge/SkillsGrid";
import { BrandGuideView } from "@/components/knowledge/BrandGuideView";
import { SOPAccordion } from "@/components/knowledge/SOPAccordion";
import { cn } from "@/lib/utils";

const TABS = [
  { key: "skills", label: "Skills" },
  { key: "brand", label: "Brand Guide" },
  { key: "sops", label: "SOPs" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default function KnowledgePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const company = useCompaniesStore((s) =>
    s.companies.find((c) => c.id === id)
  );
  const [activeTab, setActiveTab] = useState<TabKey>("skills");

  if (!company) {
    return (
      <div className="px-8 py-9">
        <div className="text-mono-label mb-4">Company not found</div>
        <h1 className="text-display text-3xl">
          Couldn&apos;t find{" "}
          <em className="text-display-italic text-brass">{id}</em>
        </h1>
      </div>
    );
  }

  const skills = company.skills ?? [];
  const brandGuide = company.brandGuide;
  const sops = company.sops ?? [];

  const tabCounts: Partial<Record<TabKey, number>> = {
    skills: skills.length,
    sops: sops.length,
  };

  return (
    <div className="flex-1 min-w-0 bg-bg-page overflow-y-auto">
      <KnowledgeHeader company={company} />

      <div className="px-7 py-6 max-w-[1400px]">
        <div className="flex border-b border-border-subtle mb-6">
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

          <div className="ml-auto flex items-center pb-2">
            <Link
              href={`/companies/${company.id}/memory`}
              className="font-mono text-[10px] tracking-[0.1em] uppercase text-text-tertiary hover:text-brass transition-colors"
            >
              Engram memory browser →
            </Link>
          </div>
        </div>

        {activeTab === "skills" && (
          <SkillsGrid skills={skills} agents={company.agents} />
        )}

        {activeTab === "brand" && brandGuide && (
          <BrandGuideView guide={brandGuide} agents={company.agents} />
        )}

        {activeTab === "brand" && !brandGuide && (
          <div className="bg-bg-surface border border-border-subtle rounded-md py-12 text-center">
            <div className="font-serif italic text-text-tertiary">
              No brand guide yet.
            </div>
          </div>
        )}

        {activeTab === "sops" && (
          <SOPAccordion sops={sops} agents={company.agents} />
        )}
      </div>
    </div>
  );
}
