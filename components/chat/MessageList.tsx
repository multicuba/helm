"use client";

import { useEffect, useRef } from "react";
import type { ChatMessage } from "@/lib/types";
import { Message, TypingIndicator } from "./Message";

export function MessageList({
  messages,
  typing = false,
  userInitial = "D",
  userName = "Daniel",
}: {
  messages: ChatMessage[];
  typing?: boolean;
  userInitial?: string;
  userName?: string;
}) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length, typing]);

  return (
    <div className="flex-1 overflow-y-auto px-10 pt-10 pb-6">
      {messages.map((m) => (
        <Message
          key={m.id}
          message={m}
          userInitial={userInitial}
          userName={userName}
        />
      ))}
      {typing && <TypingIndicator />}
      <div ref={endRef} />
    </div>
  );
}
