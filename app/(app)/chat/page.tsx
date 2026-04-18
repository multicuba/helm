"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useThreadsStore } from "@/lib/stores";
import { seedRoles } from "@/lib/seed-data";
import { ThreadList } from "@/components/chat/ThreadList";
import { RoleBadge } from "@/components/chat/RoleBadge";
import { Composer } from "@/components/chat/Composer";

export default function ChatIndexPage() {
  const router = useRouter();
  const threads = useThreadsStore((s) => s.threads);
  const activeRoleId = useThreadsStore((s) => s.activeRoleId);
  const setActiveRole = useThreadsStore((s) => s.setActiveRole);
  const addThread = useThreadsStore((s) => s.addThread);
  const activeRole = seedRoles.find((r) => r.id === activeRoleId) ?? seedRoles[0];
  const [voiceMode, setVoiceMode] = useState(false);

  const handleSend = (text: string) => {
    const id = `t-${Date.now()}`;
    const now = new Date().toISOString();
    addThread({
      id,
      title: text.slice(0, 40) + (text.length > 40 ? "…" : ""),
      role: "interview",
      messages: [
        { id: `u-${Date.now()}`, role: "user", content: text, timestamp: now },
      ],
      createdAt: now,
      updatedAt: now,
      totalCost: 0,
    });
    router.push(`/chat/${id}`);
  };

  return (
    <div className="flex min-h-[calc(100vh-57px)]">
      <ThreadList
        threads={threads}
        activeThreadId={null}
        roles={seedRoles}
        activeRoleId={activeRoleId}
        onSelectRole={setActiveRole}
      />

      <section className="flex-1 min-w-0 flex flex-col bg-bg-page">
        <header className="px-10 py-4 border-b border-border-subtle flex items-center justify-between">
          <RoleBadge role={activeRole} />
          <div className="flex items-center gap-1.5 text-text-tertiary">
            <kbd className="font-mono text-[10px] px-1.5 py-0.5 bg-bg-surface border border-border-strong rounded-sm">
              ⌘R
            </kbd>
            <span className="font-mono text-[10px]">switch role</span>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center px-10">
          <div className="max-w-[560px] text-center">
            <div className="text-mono-label mb-3">New thread</div>
            <h1 className="text-display text-[38px] leading-[1.1] mb-3">
              What are you <em className="text-display-italic text-brass">trying to build?</em>
            </h1>
            <p className="text-[14px] text-text-secondary leading-[1.6]">
              Dump raw thoughts. Upload a deck, sketch, or voice note. The
              Interview Agent will structure it into a PRD and spin up a full
              company when you&apos;re ready.
            </p>
          </div>
        </div>

        <Composer
          onSend={handleSend}
          voiceMode={voiceMode}
          onVoiceToggle={setVoiceMode}
          liveStream={false}
          placeholder="Contá la idea — texto, voz, o arrastrá archivos…"
        />
      </section>

      <aside className="w-[320px] bg-bg-deep border-l border-border-subtle flex-shrink-0 px-5 py-6 overflow-y-auto">
        <div className="text-mono-label mb-3">Recent threads</div>
        <div className="space-y-2">
          {threads.slice(0, 5).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => router.push(`/chat/${t.id}`)}
              className="w-full text-left p-3 bg-bg-surface border border-border-subtle rounded-md hover:border-brass-muted transition-colors"
            >
              <div className="text-[13px] text-text-primary font-medium leading-tight mb-1 truncate">
                {t.title}
              </div>
              <div className="font-mono text-[10px] text-text-dim">
                {new Date(t.updatedAt).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
                {" · "}${t.totalCost.toFixed(2)}
              </div>
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}
