"use client";

import { cn } from "@/lib/utils";

export function MiniDiffViewer({
  diff,
  maxLines = 20,
}: {
  diff: string;
  maxLines?: number;
}) {
  const lines = diff.split("\n");
  const truncated = lines.length > maxLines;
  const visible = truncated ? lines.slice(0, maxLines) : lines;

  return (
    <pre className="bg-bg-deep border border-border-subtle rounded-md p-3 overflow-x-auto font-mono text-[11.5px] leading-[1.55]">
      <code>
        {visible.map((line, i) => (
          <DiffLine key={i} line={line} />
        ))}
        {truncated && (
          <div className="text-text-dim italic mt-2">
            … {lines.length - maxLines} more lines
          </div>
        )}
      </code>
    </pre>
  );
}

function DiffLine({ line }: { line: string }) {
  let color = "text-text-secondary";
  let prefix: string | null = null;

  if (line.startsWith("+++") || line.startsWith("---")) {
    color = "text-text-dim";
  } else if (line.startsWith("@@")) {
    color = "text-brass";
  } else if (line.startsWith("+")) {
    color = "text-success";
    prefix = "+";
  } else if (line.startsWith("-")) {
    color = "text-danger";
    prefix = "-";
  }

  const content = prefix ? line.slice(1) : line;

  return (
    <div className={cn("whitespace-pre", color)}>
      {prefix && <span className="select-none mr-1 opacity-70">{prefix}</span>}
      {content}
    </div>
  );
}
