"use client";

import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { ArrowUpRight } from "lucide-react";
import type { Skill, SkillCategory, Agent } from "@/lib/types";
import { cn } from "@/lib/utils";

const categoryClass: Record<SkillCategory, string> = {
  frontend: "text-teal border-teal/40 bg-teal/5",
  backend: "text-teal border-teal/40 bg-teal/5",
  ops: "text-success border-success/40 bg-success/5",
  security: "text-warning border-warning/40 bg-warning/5",
  seo: "text-brass border-brass/40 bg-brass/5",
  marketing: "text-brass border-brass/40 bg-brass/5",
  domain: "text-danger border-danger/40 bg-danger/5",
};

const roleColorBg: Record<string, string> = {
  brass: "bg-brass/15 text-brass border-brass/40",
  teal: "bg-teal/15 text-teal border-teal/40",
  success: "bg-success/15 text-success border-success/40",
  warning: "bg-warning/15 text-warning border-warning/40",
  danger: "bg-danger/15 text-danger border-danger/40",
  neutral: "bg-bg-surface text-text-secondary border-border-subtle",
};

export function SkillsGrid({
  skills,
  agents,
}: {
  skills: Skill[];
  agents: Agent[];
}) {
  if (skills.length === 0) {
    return (
      <div className="bg-bg-surface border border-border-subtle rounded-md py-12 text-center">
        <div className="font-serif italic text-text-tertiary">
          No skills catalogued yet.
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {skills.map((skill, i) => {
        const skillAgents = skill.usedByAgentIds
          .map((id) => agents.find((a) => a.id === id))
          .filter(Boolean) as Agent[];

        let updatedRel = "";
        try {
          updatedRel = formatDistanceToNow(new Date(skill.lastUpdatedAt), {
            addSuffix: true,
          });
        } catch {
          updatedRel = skill.lastUpdatedAt;
        }

        return (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
            className="group bg-bg-surface border border-border-subtle rounded-lg p-5 hover:border-brass-muted transition-colors flex flex-col gap-3"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-display-italic text-[18px] leading-[1.2] text-text-primary min-w-0 break-words">
                {skill.name}
              </h3>
              <span
                className={cn(
                  "font-mono text-[9px] tracking-[0.1em] uppercase px-1.5 py-0.5 border rounded-sm flex-shrink-0",
                  categoryClass[skill.category]
                )}
              >
                {skill.category}
              </span>
            </div>

            <p className="text-[13px] text-text-secondary leading-relaxed">
              {skill.description}
            </p>

            <div className="flex flex-col gap-2 mt-auto pt-3 border-t border-border-subtle">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1.5">
                  {skillAgents.slice(0, 4).map((agent) => {
                    const initial = (agent.shortRole ?? agent.name ?? "?")
                      .charAt(0)
                      .toUpperCase();
                    return (
                      <div
                        key={agent.id}
                        className={cn(
                          "w-5 h-5 rounded-full border flex items-center justify-center text-[9px] font-mono font-semibold ring-2 ring-bg-surface",
                          roleColorBg[agent.roleColor]
                        )}
                        title={agent.name}
                      >
                        {initial}
                      </div>
                    );
                  })}
                </div>
                <span className="font-mono text-[10px] text-text-tertiary">
                  Used by {skillAgents.length} agent
                  {skillAgents.length === 1 ? "" : "s"}
                </span>
              </div>

              <div className="font-mono text-[10px] text-text-dim">
                Updated {updatedRel} by {skill.lastUpdatedBy}
              </div>

              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-text-tertiary">
                  <span className="text-brass">
                    {skill.invocationsThisWeek}
                  </span>{" "}
                  invocations this week
                </span>
                <span className="font-mono text-[10px] text-text-dim flex items-center gap-1 group-hover:text-brass transition-colors cursor-pointer">
                  View skill
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
