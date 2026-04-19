"use client";

import Link from "next/link";
import type { Company, Issue } from "@/lib/types";

function resolve(code: string, issues: Issue[]) {
  return issues.find((i) => i.code === code);
}

export function LinkedIssuesSection({
  issue,
  company,
}: {
  issue: Issue;
  company: Company;
}) {
  const blocks = issue.blockedBy ?? [];
  const related = issue.relatedTo ?? [];

  if (blocks.length === 0 && related.length === 0) return null;

  return (
    <MetaSection label="Linked issues">
      <div className="space-y-2.5">
        {blocks.length > 0 && (
          <LinkedGroup
            kind="Blocks"
            codes={blocks}
            companyId={company.id}
            issues={company.issues}
          />
        )}
        {related.length > 0 && (
          <LinkedGroup
            kind="Related"
            codes={related}
            companyId={company.id}
            issues={company.issues}
          />
        )}
      </div>
    </MetaSection>
  );
}

function LinkedGroup({
  kind,
  codes,
  companyId,
  issues,
}: {
  kind: string;
  codes: string[];
  companyId: string;
  issues: Issue[];
}) {
  return (
    <div>
      <div className="font-mono text-[10px] text-text-dim uppercase tracking-[0.1em] mb-1">
        {kind}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {codes.map((code) => {
          const target = resolve(code, issues);
          if (!target) {
            return (
              <span
                key={code}
                className="font-mono text-[11px] px-1.5 py-0.5 rounded-sm bg-bg-surface border border-border-subtle text-text-tertiary"
              >
                {code}
              </span>
            );
          }
          return (
            <Link
              key={code}
              href={`/companies/${companyId}/issues/${target.id}`}
              className="font-mono text-[11px] px-1.5 py-0.5 rounded-sm bg-bg-surface-2 border border-border-subtle text-brass hover:border-brass-muted transition-colors"
              title={target.title}
            >
              {code}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function MetaSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="font-mono text-[10px] text-text-dim uppercase tracking-[0.15em] mb-2">
        {label}
      </div>
      {children}
    </div>
  );
}
