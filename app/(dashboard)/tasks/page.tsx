export const metadata = {
  title: "Tasks - Task Manager",
  description: "Manage your tasks efficiently",
};

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[hsl(var(--foreground))]">
          Tasks
        </h1>
        <p className="mt-2 text-[hsl(var(--muted-foreground))]">
          Manage and organize your tasks
        </p>
      </div>

      <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed border-[hsl(var(--border))] p-8">
        <p className="text-[hsl(var(--muted-foreground))]">
          Tasks page - Coming in Phase 6
        </p>
      </div>
    </div>
  );
}
