export default async function CompanyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="px-8 py-9 max-w-[1400px] mx-auto">
      <div className="text-mono-label mb-4">Company · {id}</div>
      <h1 className="text-display text-4xl mb-4">
        Coming <em className="text-display-italic text-brass">Day 3</em>
      </h1>
      <p className="text-text-secondary max-w-xl">
        This is where the Company Detail lives — org chart, SDD pipeline, issues, live stream.
        Implemented in Day 3 per SPRINT.md.
      </p>
    </div>
  );
}
