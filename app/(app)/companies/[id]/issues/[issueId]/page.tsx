"use client";

import { use } from "react";
import Link from "next/link";
import { useCompaniesStore } from "@/lib/stores";
import { IssueHeader } from "@/components/issue-detail/IssueHeader";
import { IssueDescription } from "@/components/issue-detail/IssueDescription";
import { ActivityLog } from "@/components/issue-detail/ActivityLog";
import { CommentBox } from "@/components/issue-detail/CommentBox";
import { IssueMetadataPanel } from "@/components/issue-detail/IssueMetadataPanel";
import { CodeChangesStrip } from "@/components/issue-detail/CodeChangesStrip";

export default function IssueDetailPage({
  params,
}: {
  params: Promise<{ id: string; issueId: string }>;
}) {
  const { id, issueId } = use(params);
  const company = useCompaniesStore((s) => s.companies.find((c) => c.id === id));
  const issue = company?.issues.find((i) => i.id === issueId);

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

  if (!issue) {
    return (
      <div className="px-8 py-9">
        <div className="text-mono-label mb-4">Issue not found</div>
        <h1 className="text-display text-3xl mb-4">
          Couldn&apos;t find issue{" "}
          <em className="text-display-italic text-brass">{issueId}</em>
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

  return (
    <div className="flex min-h-[calc(100vh-57px)]">
      <div className="flex-1 min-w-0 bg-bg-page overflow-y-auto">
        <IssueHeader issue={issue} company={company} />

        <div className="px-7 py-7 max-w-[1200px]">
          <div className="flex gap-10">
            <div className="flex-1 min-w-0">
              {issue.description && (
                <IssueDescription markdown={issue.description} />
              )}

              {issue.activity && issue.activity.length > 0 && (
                <ActivityLog activity={issue.activity} />
              )}

              <CommentBox />
            </div>

            <IssueMetadataPanel issue={issue} company={company} />
          </div>

          {issue.codeChanges && issue.codeChanges.length > 0 && (
            <CodeChangesStrip
              changes={issue.codeChanges}
              issueCode={issue.code}
            />
          )}
        </div>
      </div>
    </div>
  );
}
