"use client";

import { use } from "react";
import Link from "next/link";
import { useCompaniesStore } from "@/lib/stores";
import { ChevronRight } from "lucide-react";

export default function AgentProfileStub({
  params,
}: {
  params: Promise<{ id: string; agentId: string }>;
}) {
  const { id, agentId } = use(params);
  const company = useCompaniesStore((s) => s.companies.find((c) => c.id === id));
  const agent = company?.agents.find((a) => a.id === agentId);

  return (
    <div className="px-8 py-9 max-w-3xl">
      <nav className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.05em] text-text-tertiary mb-6">
        <Link href={`/companies/${id}`} className="hover:text-brass transition-colors uppercase">
          {company?.name ?? id}
        </Link>
        <ChevronRight className="w-3 h-3 text-text-dim" />
        <span className="text-text-secondary uppercase">Agents</span>
        <ChevronRight className="w-3 h-3 text-text-dim" />
        <span className="text-text-secondary uppercase">{agent?.name ?? agentId}</span>
      </nav>

      <div className="text-mono-label mb-3">Agent profile</div>
      <h1 className="text-display text-[36px] leading-[1.1] mb-2">
        {agent?.name ?? agentId}{" "}
        <em className="text-display-italic text-brass">— coming soon.</em>
      </h1>
      <p className="font-mono text-[11px] text-text-tertiary mb-8">
        Day 5c will land the full agent profile: skills, prompts, cost, lifetime work.
      </p>

      <Link
        href={`/companies/${id}`}
        className="font-mono text-[11px] text-brass hover:underline"
      >
        ← back to {company?.name ?? "company"}
      </Link>
    </div>
  );
}
