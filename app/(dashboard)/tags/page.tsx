export const metadata = {
  title: "Tags - Task Manager",
  description: "Manage your tags",
};

export default function TagsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[hsl(var(--foreground))]">
          Tags
        </h1>
        <p className="mt-2 text-[hsl(var(--muted-foreground))]">
          Organize your tasks with tags
        </p>
      </div>

      <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed border-[hsl(var(--border))] p-8">
        <p className="text-[hsl(var(--muted-foreground))]">
          Tags page - Coming in Phase 7
        </p>
      </div>
    </div>
  );
}
