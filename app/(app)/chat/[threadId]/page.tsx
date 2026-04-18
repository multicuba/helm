export default async function ChatPage({ params }: { params: Promise<{ threadId: string }> }) {
  const { threadId } = await params;
  return (
    <div className="px-8 py-9 max-w-[1400px] mx-auto">
      <div className="text-mono-label mb-4">Thread · {threadId}</div>
      <h1 className="text-display text-4xl mb-4">
        Helm Chat — <em className="text-display-italic text-brass">Day 4</em>
      </h1>
      <p className="text-text-secondary max-w-xl">
        Interview Agent, role switcher, multimodal input, PRD preview, Convert-to-Company flow.
        Implemented in Day 4 per SPRINT.md.
      </p>
    </div>
  );
}
