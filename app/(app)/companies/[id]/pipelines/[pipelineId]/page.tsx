"use client";

import { use } from "react";
import Link from "next/link";
import { useCompaniesStore } from "@/lib/stores";
import { PipelineHeader } from "@/components/pipeline-detail/PipelineHeader";
import { PhaseTimeline } from "@/components/pipeline-detail/PhaseTimeline";
import { PipelineStreamPanel } from "@/components/pipeline-detail/PipelineStreamPanel";

export default function PipelineDetailPage({
  params,
}: {
  params: Promise<{ id: string; pipelineId: string }>;
}) {
  const { id, pipelineId } = use(params);
  const company = useCompaniesStore((s) => s.companies.find((c) => c.id === id));
  const pipeline = company?.pipelines.find((p) => p.id === pipelineId);

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

  if (!pipeline) {
    return (
      <div className="px-8 py-9">
        <div className="text-mono-label mb-4">Pipeline not found</div>
        <h1 className="text-display text-3xl mb-4">
          Couldn&apos;t find pipeline{" "}
          <em className="text-display-italic text-brass">{pipelineId}</em>
        </h1>
        <Link
          href={`/companies/${id}`}
          className="font-mono text-[11px] text-brass hover:underline"
        >
          ← back to {company.name}
        </Link>
      </div>
    );
  }

  const ownerAgent = company.agents.find((a) => a.id === pipeline.ownerAgentId);
  const completedPhases = pipeline.phases.filter((p) => p.status === "done").length;

  return (
    <div className="flex min-h-[calc(100vh-57px)]">
      <div className="flex-1 min-w-0 bg-bg-page overflow-y-auto">
        <PipelineHeader
          pipeline={pipeline}
          company={company}
          ownerAgent={ownerAgent}
          completedPhases={completedPhases}
          totalPhases={pipeline.phases.length}
        />

        <div className="px-7 py-7">
          <div className="mb-4">
            <div className="text-mono-label mb-1">Phase timeline</div>
            <p className="font-mono text-[11px] text-text-tertiary">
              7 phases · vertical handoffs · click any artifact to inspect
            </p>
          </div>
          <PhaseTimeline pipeline={pipeline} />
        </div>
      </div>

      <PipelineStreamPanel pipeline={pipeline} />
    </div>
  );
}
