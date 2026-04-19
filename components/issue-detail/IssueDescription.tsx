"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function IssueDescription({ markdown }: { markdown: string }) {
  return (
    <div className="issue-markdown text-[14px] leading-[1.65] text-text-secondary">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="font-serif text-[26px] text-text-primary mt-5 mb-3 leading-[1.2]">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-serif text-[20px] text-text-primary mt-5 mb-2.5 leading-[1.25]">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-serif italic text-[16px] text-text-primary mt-4 mb-2 leading-[1.3]">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="mb-3 text-text-secondary">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-5 mb-3 space-y-1 text-text-secondary marker:text-brass-muted">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-5 mb-3 space-y-1 text-text-secondary marker:text-brass-muted">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="pl-1">{children}</li>,
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-brass underline decoration-brass-muted hover:text-brass-bright transition-colors"
              target="_blank"
              rel="noreferrer"
            >
              {children}
            </a>
          ),
          code: ({ children, className }) => {
            const isInline = !className?.includes("language-");
            if (isInline) {
              return (
                <code className="font-mono text-[12px] px-1.5 py-0.5 rounded bg-bg-surface-2 text-brass-bright border border-border-subtle">
                  {children}
                </code>
              );
            }
            return (
              <code className={`font-mono text-[12px] ${className ?? ""}`}>
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="bg-bg-deep border border-border-subtle rounded-md p-4 overflow-x-auto mb-4 font-mono text-[12px] text-text-secondary leading-[1.55]">
              {children}
            </pre>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-brass-muted pl-4 italic font-serif text-text-secondary my-3">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-5 border-border-subtle" />,
          strong: ({ children }) => (
            <strong className="text-text-primary font-semibold">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-text-primary">{children}</em>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
