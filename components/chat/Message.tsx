"use client";

import { motion } from "framer-motion";
import type { ChatMessage } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Attachment } from "./Attachment";
import { SuggestionChips } from "./SuggestionChips";
import { PRDPreviewCard } from "./PRDPreviewCard";

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function splitQuestion(content: string): { body: string[]; question?: string } {
  const lines = content.split(/\n{2,}/).map((s) => s.trim()).filter(Boolean);
  if (lines.length === 0) return { body: [] };
  const last = lines[lines.length - 1];
  if (last.endsWith("?") || last.endsWith("¿")) {
    return { body: lines.slice(0, -1), question: last };
  }
  return { body: lines };
}

export function Message({
  message,
  userInitial = "D",
  userName = "Daniel",
  delay = 0,
  emphasizeFirstAsQuestion = false,
}: {
  message: ChatMessage;
  userInitial?: string;
  userName?: string;
  delay?: number;
  emphasizeFirstAsQuestion?: boolean;
}) {
  const isAssistant = message.role === "assistant";
  const { body, question } = isAssistant
    ? splitQuestion(message.content)
    : { body: message.content.split(/\n{2,}/).map((s) => s.trim()).filter(Boolean), question: undefined };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="mb-7 max-w-[720px]"
    >
      <div className="flex items-center gap-2.5 mb-2.5">
        <div
          className={cn(
            "w-6 h-6 rounded-full flex items-center justify-center font-serif text-[12px] font-medium flex-shrink-0",
            isAssistant
              ? "bg-transparent border border-brass text-brass"
              : "bg-gradient-to-br from-brass to-brass-muted text-bg-deep"
          )}
        >
          {isAssistant ? "H" : userInitial}
        </div>
        <div className="text-[13px] text-text-primary font-medium">
          {isAssistant ? "Interview Agent" : userName}
        </div>
        <div className="font-mono text-[10px] text-text-dim ml-auto">
          {formatTime(message.timestamp)}
        </div>
      </div>

      {message.attachments && message.attachments.length > 0 && (
        <div className="ml-[34px] flex flex-wrap gap-2.5 mb-3">
          {message.attachments.map((a) => (
            <Attachment key={a.id} attachment={a} />
          ))}
        </div>
      )}

      <div className="ml-[34px] text-[14px] leading-[1.65] text-text-primary">
        {body.map((p, i) => (
          <p
            key={i}
            className={cn(
              "mb-3 last:mb-0",
              !isAssistant && "text-text-primary",
              isAssistant && emphasizeFirstAsQuestion && i === 0 && "text-text-secondary text-[13px]",
              isAssistant && !emphasizeFirstAsQuestion && i === 0 && "text-text-secondary text-[13px]"
            )}
          >
            {p}
          </p>
        ))}
        {question && (
          <p className="font-serif italic font-normal text-[19px] leading-[1.4] text-text-primary tracking-[-0.01em]">
            {question}
          </p>
        )}
      </div>

      {message.suggestionGroups && message.suggestionGroups.length > 0 && (
        <SuggestionChips groups={message.suggestionGroups} />
      )}

      {message.prdPreview && (
        <div className="ml-[34px] mt-4">
          <PRDPreviewCard preview={message.prdPreview} />
        </div>
      )}
    </motion.div>
  );
}

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="mb-7 max-w-[720px]"
    >
      <div className="flex items-center gap-2.5 mb-2.5">
        <div className="w-6 h-6 rounded-full flex items-center justify-center font-serif text-[12px] font-medium bg-transparent border border-brass text-brass">
          H
        </div>
        <div className="text-[13px] text-text-primary font-medium">Interview Agent</div>
        <div className="font-mono text-[10px] text-text-dim ml-auto">typing…</div>
      </div>
      <div className="ml-[34px] flex items-center gap-1.5 h-5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-brass"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </motion.div>
  );
}
