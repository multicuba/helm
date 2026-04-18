"use client";

import { use, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useThreadsStore } from "@/lib/stores";
import { seedRoles, seedPRDDraft, seedInspiration, interviewGhostMessages } from "@/lib/seed-data";
import { ThreadList } from "@/components/chat/ThreadList";
import { RoleBadge } from "@/components/chat/RoleBadge";
import { MessageList } from "@/components/chat/MessageList";
import { Composer } from "@/components/chat/Composer";
import { ContextPanel } from "@/components/chat/ContextPanel";
import { ConvertToCompanyDialog } from "@/components/chat/ConvertToCompanyDialog";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

const DEMO_KEY = "helm-chat-demo";

export default function ChatThreadPage({
  params,
}: {
  params: Promise<{ threadId: string }>;
}) {
  const { threadId } = use(params);
  const router = useRouter();
  const threads = useThreadsStore((s) => s.threads);
  const activeRoleId = useThreadsStore((s) => s.activeRoleId);
  const setActiveRole = useThreadsStore((s) => s.setActiveRole);
  const setActiveThread = useThreadsStore((s) => s.setActiveThread);
  const appendMessage = useThreadsStore((s) => s.appendMessage);

  const thread = threads.find((t) => t.id === threadId);

  const activeRole = useMemo(
    () => seedRoles.find((r) => r.id === activeRoleId) ?? seedRoles[0],
    [activeRoleId]
  );

  const [demoMode, setDemoMode] = useState(false);
  const [typing, setTyping] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [convertOpen, setConvertOpen] = useState(false);
  const [ghostIdx, setGhostIdx] = useState(0);

  useEffect(() => {
    setActiveThread(threadId);
    if (typeof window !== "undefined") {
      setDemoMode(window.sessionStorage.getItem(DEMO_KEY) === "on");
    }
  }, [threadId, setActiveThread]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.sessionStorage.setItem(DEMO_KEY, demoMode ? "on" : "off");
  }, [demoMode]);

  // Demo-mode ghost streaming: after 8s of silence, Interview Agent drops a new message
  useEffect(() => {
    if (!demoMode || !thread) return;
    if (ghostIdx >= interviewGhostMessages.length) return;

    const typingTimer = setTimeout(() => {
      setTyping(true);
    }, 8_000);

    const settleTimer = setTimeout(() => {
      setTyping(false);
      appendMessage(thread.id, {
        id: `ghost-${Date.now()}-${ghostIdx}`,
        role: "assistant",
        content: interviewGhostMessages[ghostIdx],
        timestamp: new Date().toISOString(),
      });
      setGhostIdx((i) => i + 1);
    }, 10_000);

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(settleTimer);
    };
  }, [demoMode, thread?.messages.length, ghostIdx, appendMessage, thread]);

  // ⌘R cycles role
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "r") {
        e.preventDefault();
        const i = seedRoles.findIndex((r) => r.id === activeRoleId);
        const next = seedRoles[(i + 1) % seedRoles.length];
        setActiveRole(next.id);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeRoleId, setActiveRole]);

  if (!thread) {
    return (
      <div className="flex min-h-[calc(100vh-57px)]">
        <ThreadList
          threads={threads}
          activeThreadId={null}
          roles={seedRoles}
          activeRoleId={activeRoleId}
          onSelectRole={setActiveRole}
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-mono-label mb-2">Thread not found</div>
            <button
              type="button"
              onClick={() => router.push("/chat/t-ev-finder")}
              className="text-brass underline underline-offset-4"
            >
              Open EV Station Finder thread
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSend = (text: string) => {
    appendMessage(thread.id, {
      id: `u-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toISOString(),
    });

    // Simulated streaming ack (no real LLM)
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      appendMessage(thread.id, {
        id: `a-${Date.now()}`,
        role: "assistant",
        content:
          "Anotado. Lo incorporo al PRD. Cuando estés listo, dale a Convert to Company y armo la estructura.",
        timestamp: new Date().toISOString(),
      });
    }, 1800);
  };

  const showPRD = thread.id === "t-ev-finder";

  return (
    <div className="flex min-h-[calc(100vh-57px)]">
      <ThreadList
        threads={threads}
        activeThreadId={thread.id}
        roles={seedRoles}
        activeRoleId={activeRoleId}
        onSelectRole={setActiveRole}
      />

      <section className="flex-1 min-w-0 flex flex-col bg-bg-page">
        <header className="px-10 py-4 border-b border-border-subtle flex items-center justify-between gap-4">
          <RoleBadge role={activeRole} />

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-text-tertiary">
              <kbd className="font-mono text-[10px] px-1.5 py-0.5 bg-bg-surface border border-border-strong rounded-sm">
                ⌘R
              </kbd>
              <span className="font-mono text-[10px]">switch role</span>
            </div>

            <button
              type="button"
              onClick={() => setDemoMode((v) => !v)}
              className={cn(
                "px-3 py-1.5 rounded font-mono text-[10px] tracking-[0.05em] flex items-center gap-2 border transition-colors",
                demoMode
                  ? "bg-brass text-bg-deep border-brass"
                  : "bg-bg-surface text-text-secondary border-border-subtle hover:border-brass-muted"
              )}
              aria-pressed={demoMode}
              title="Demo mode: ghost messages every 8s"
            >
              {demoMode ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              {demoMode ? "DEMO · ON" : "DEMO MODE"}
            </button>
          </div>
        </header>

        <MessageList messages={thread.messages} typing={typing} />

        <Composer
          onSend={handleSend}
          voiceMode={voiceMode}
          onVoiceToggle={setVoiceMode}
          liveStream={demoMode}
        />
      </section>

      {showPRD ? (
        <ContextPanel
          sections={seedPRDDraft}
          inspiration={seedInspiration}
          onConvert={() => setConvertOpen(true)}
        />
      ) : (
        <aside className="w-[320px] bg-bg-deep border-l border-border-subtle flex-shrink-0 px-5 py-6 overflow-y-auto">
          <div className="text-mono-label mb-4">Context</div>
          <div className="font-serif italic text-text-tertiary text-[14px]">
            No PRD in progress.
          </div>
          <div className="text-[12px] text-text-tertiary mt-2 leading-relaxed">
            Start a conversation and the Interview Agent will auto-assemble a PRD
            here as you go.
          </div>
        </aside>
      )}

      {showPRD && (
        <ConvertToCompanyDialog
          open={convertOpen}
          onOpenChange={setConvertOpen}
          productName="EV Station Finder"
        />
      )}
    </div>
  );
}
