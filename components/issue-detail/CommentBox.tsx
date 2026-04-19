"use client";

import { Paperclip, Send } from "lucide-react";

export function CommentBox() {
  return (
    <div className="mt-8">
      <div className="rounded-md border border-border-subtle bg-bg-surface focus-within:border-brass-muted transition-colors">
        <textarea
          rows={3}
          placeholder="Add a comment..."
          className="w-full bg-transparent px-4 py-3 text-[13px] text-text-primary placeholder:text-text-tertiary outline-none resize-none"
        />
        <div className="flex items-center justify-between px-3 py-2 border-t border-border-subtle">
          <button
            type="button"
            className="px-2.5 py-1 rounded font-mono text-[10px] tracking-[0.05em] flex items-center gap-1.5 text-text-tertiary hover:text-brass transition-colors"
          >
            <Paperclip className="w-3 h-3" />
            ATTACH
          </button>
          <button
            type="button"
            className="px-3 py-1.5 rounded font-mono text-[10px] tracking-[0.05em] flex items-center gap-1.5 bg-brass/10 text-brass border border-brass-muted hover:bg-brass/20 transition-colors"
          >
            <Send className="w-3 h-3" />
            SEND
          </button>
        </div>
      </div>
      <p className="mt-2 font-mono text-[10px] text-text-dim tracking-[0.05em]">
        Agents reading this thread will see your comment.
      </p>
    </div>
  );
}
