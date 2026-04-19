"use client";

import { formatDistanceToNow } from "date-fns";
import { Pencil } from "lucide-react";
import type { BrandGuide, Agent } from "@/lib/types";
import { cn } from "@/lib/utils";

const roleColorBg: Record<string, string> = {
  brass: "bg-brass/15 text-brass border-brass/40",
  teal: "bg-teal/15 text-teal border-teal/40",
  success: "bg-success/15 text-success border-success/40",
  warning: "bg-warning/15 text-warning border-warning/40",
  danger: "bg-danger/15 text-danger border-danger/40",
  neutral: "bg-bg-surface text-text-secondary border-border-subtle",
};

const fontClass: Record<string, string> = {
  serif: "font-serif",
  sans: "font-sans",
  mono: "font-mono",
};

function Section({
  index,
  label,
  title,
  children,
}: {
  index: string;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-8 first:pt-0 last:pb-0 border-b border-brass/20 last:border-b-0">
      <div className="flex items-baseline gap-4 mb-5">
        <span className="font-mono text-[11px] text-brass tracking-[0.1em]">
          {index}
        </span>
        <div>
          <div className="text-mono-label mb-1">{label}</div>
          <h2 className="text-display-italic text-[26px] leading-[1.1] text-text-primary">
            {title}
          </h2>
        </div>
      </div>
      {children}
    </section>
  );
}

export function BrandGuideView({
  guide,
  agents,
}: {
  guide: BrandGuide;
  agents: Agent[];
}) {
  let updatedRel = "";
  try {
    updatedRel = formatDistanceToNow(new Date(guide.updatedAt), {
      addSuffix: true,
    });
  } catch {
    updatedRel = guide.updatedAt;
  }

  const referencedAgents = guide.referencedByAgentIds
    .map((id) => agents.find((a) => a.id === id))
    .filter(Boolean) as Agent[];

  return (
    <article className="bg-bg-surface border border-border-subtle rounded-lg px-8 py-7">
      <Section index="01" label="Voice & Tone" title="How Helm sounds.">
        <ul className="flex flex-col gap-3 pl-7">
          {guide.voice.map((v) => (
            <li key={v.title} className="flex gap-3">
              <span
                className="w-1 h-1 rounded-full bg-brass mt-[9px] flex-shrink-0"
                aria-hidden
              />
              <div className="flex-1">
                <div className="text-[14px] text-text-primary font-medium">
                  {v.title}
                </div>
                <div className="text-[13px] text-text-secondary">
                  {v.detail}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section index="02" label="Colors" title="Tokens, not hexes.">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {guide.colors.map((c) => (
            <div
              key={c.token}
              className="flex items-center gap-3 p-2.5 rounded border border-border-subtle bg-bg-page"
            >
              <div
                className="w-10 h-10 rounded-sm flex-shrink-0 border border-border-subtle"
                style={{ background: c.hex }}
                aria-hidden
              />
              <div className="min-w-0 flex-1">
                <div className="text-[12px] text-text-primary truncate">
                  {c.label}
                </div>
                <div className="font-mono text-[10px] text-text-tertiary uppercase">
                  {c.hex}
                </div>
                <div className="font-mono text-[9px] text-text-dim truncate">
                  --{c.token}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section index="03" label="Typography" title="Three faces, every surface.">
        <div className="flex flex-col gap-5">
          {guide.typography.map((t) => (
            <div
              key={t.label}
              className="flex items-baseline justify-between gap-6 border-l border-brass-deep pl-4"
            >
              <div className="min-w-0">
                <div className="text-mono-label mb-1.5">{t.label}</div>
                <div
                  className={cn(
                    fontClass[t.font],
                    t.label.startsWith("Display")
                      ? "text-[28px] leading-[1.1]"
                      : t.label === "UI body"
                      ? "text-[15px]"
                      : "text-[11px] tracking-[0.08em] uppercase",
                    t.label === "Display italic" && "italic",
                    "text-text-primary break-words"
                  )}
                >
                  {t.sample}
                </div>
              </div>
              <div className="font-mono text-[10px] text-text-tertiary flex-shrink-0 text-right max-w-[220px]">
                {t.meta}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section index="04" label="Iconography" title="Lucide, stroke 1.5.">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {guide.icons.map((icon) => (
            <div
              key={icon.name}
              className="flex items-center gap-2.5 p-2.5 rounded border border-border-subtle bg-bg-page"
            >
              <div className="w-7 h-7 rounded bg-bg-surface border border-border-subtle flex items-center justify-center flex-shrink-0">
                <span className="font-mono text-[9px] text-brass">
                  {icon.name.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-mono text-[11px] text-text-primary truncate">
                  {icon.name}
                </div>
                <div className="text-[11px] text-text-tertiary truncate">
                  {icon.role}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="font-mono text-[10px] text-text-tertiary mt-4">
          stroke-width: 1.5 · default size: w-3.5 h-3.5 · inline size: w-3 h-3
        </div>
      </Section>

      <Section index="05" label="Writing patterns" title="Small rules, big compounding.">
        <div className="flex flex-col gap-4">
          {guide.writing.map((w) => (
            <div
              key={w.rule}
              className="grid grid-cols-[1fr_auto] md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-3 md:gap-6 items-start p-4 rounded border border-border-subtle bg-bg-page"
            >
              <div>
                <div className="text-[13px] text-text-primary font-medium">
                  {w.rule}
                </div>
              </div>
              <div className="font-mono text-[11px] text-text-secondary italic leading-relaxed">
                {w.example}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <footer className="flex items-center justify-between pt-6 mt-2 border-t border-border-subtle gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="font-mono text-[10px] text-text-tertiary">
            Last updated {updatedRel} by {guide.updatedBy}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              {referencedAgents.slice(0, 5).map((a) => {
                const initial = (a.shortRole ?? a.name).charAt(0).toUpperCase();
                return (
                  <div
                    key={a.id}
                    className={cn(
                      "w-5 h-5 rounded-full border flex items-center justify-center text-[9px] font-mono font-semibold ring-2 ring-bg-surface",
                      roleColorBg[a.roleColor]
                    )}
                    title={a.name}
                  >
                    {initial}
                  </div>
                );
              })}
            </div>
            <span className="font-mono text-[10px] text-text-tertiary">
              Referenced by {referencedAgents.length} agents
            </span>
          </div>
        </div>

        <button
          type="button"
          className="px-3 py-1.5 rounded font-mono text-[11px] tracking-[0.05em] flex items-center gap-2 border bg-bg-surface text-text-secondary border-border-subtle hover:border-brass-muted transition-colors flex-shrink-0"
        >
          <Pencil className="w-3 h-3" />
          EDIT BRAND GUIDE
        </button>
      </footer>
    </article>
  );
}
