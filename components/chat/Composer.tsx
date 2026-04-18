"use client";

import { useRef, useState } from "react";
import { Paperclip, Mic, Video, Monitor, Send, Radio } from "lucide-react";
import { cn } from "@/lib/utils";

export function Composer({
  onSend,
  voiceMode,
  onVoiceToggle,
  liveStream = true,
  placeholder = "Mensajé cualquier cosa que esté en tu cabeza…",
}: {
  onSend?: (text: string) => void;
  voiceMode?: boolean;
  onVoiceToggle?: (on: boolean) => void;
  liveStream?: boolean;
  placeholder?: string;
}) {
  const [value, setValue] = useState("");
  const taRef = useRef<HTMLTextAreaElement>(null);

  const send = () => {
    const text = value.trim();
    if (!text) return;
    onSend?.(text);
    setValue("");
    requestAnimationFrame(() => {
      if (taRef.current) taRef.current.style.height = "auto";
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="px-10 pt-5 pb-7 border-t border-border-subtle">
      <div className="bg-bg-surface border border-border-strong rounded-lg px-4 pt-3 pb-2.5 focus-within:border-brass-muted transition-colors">
        <div className="flex items-center gap-1 pb-2.5 border-b border-border-subtle/60">
          <ToolButton icon={<Paperclip className="w-3.5 h-3.5" />} title="Attach file" />
          <ToolButton icon={<Mic className="w-3.5 h-3.5" />} title="Voice note" />
          <ToolButton icon={<Video className="w-3.5 h-3.5" />} title="Video" />
          <ToolButton icon={<Monitor className="w-3.5 h-3.5" />} title="Screen share" />
        </div>

        <textarea
          ref={taRef}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            const el = e.currentTarget;
            el.style.height = "auto";
            el.style.height = Math.min(el.scrollHeight, 240) + "px";
          }}
          onKeyDown={handleKeyDown}
          rows={2}
          placeholder={placeholder}
          className="w-full bg-transparent border-none outline-none text-text-primary text-[14px] leading-[1.5] resize-none placeholder:text-text-tertiary py-2.5"
        />

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onVoiceToggle?.(!voiceMode)}
              className={cn(
                "flex items-center gap-2 px-2.5 py-1 rounded-full border text-[11px] font-mono tracking-[0.05em] transition-colors",
                voiceMode
                  ? "bg-brass text-bg-deep border-brass"
                  : "bg-transparent text-text-tertiary border-border-subtle hover:border-brass-muted hover:text-text-secondary"
              )}
              aria-pressed={!!voiceMode}
            >
              <Mic className="w-3 h-3" />
              Voice mode
            </button>
            {liveStream && (
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-danger">
                <span className="relative inline-flex">
                  <span className="w-1.5 h-1.5 rounded-full bg-danger animate-helm-pulse" />
                </span>
                <Radio className="w-3 h-3 opacity-70" />
                En vivo
              </div>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[10px] text-text-dim hidden sm:block">
              ⌘↩ convert · ↩ send
            </span>
            <button
              type="button"
              onClick={send}
              className="px-3.5 py-1.5 bg-brass text-bg-deep font-medium text-[12px] rounded flex items-center gap-1.5 hover:bg-brass-bright transition-colors"
            >
              Send
              <Send className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolButton({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <button
      type="button"
      title={title}
      className="w-7 h-7 rounded flex items-center justify-center text-text-tertiary hover:bg-bg-elevated hover:text-brass transition-colors"
    >
      {icon}
    </button>
  );
}
