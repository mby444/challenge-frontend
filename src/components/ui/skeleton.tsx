export function TaskSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-start gap-4 rounded-lg border border-[hsl(var(--border))] p-4">
          <div className="h-5 w-5 rounded bg-[hsl(var(--muted))]"></div>
          <div className="flex-1 space-y-2">
            <div className="h-5 w-3/4 rounded bg-[hsl(var(--muted))]"></div>
            <div className="h-4 w-1/2 rounded bg-[hsl(var(--muted))]"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function TagSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-center justify-between rounded-lg border border-[hsl(var(--border))] p-4">
          <div className="flex items-center gap-4">
            <div className="h-6 w-20 rounded-full bg-[hsl(var(--muted))]"></div>
            <div className="h-4 w-16 rounded bg-[hsl(var(--muted))]"></div>
          </div>
          <div className="h-8 w-8 rounded bg-[hsl(var(--muted))]"></div>
        </div>
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="animate-pulse rounded-lg border border-[hsl(var(--border))] p-6">
      <div className="space-y-3">
        <div className="h-6 w-1/3 rounded bg-[hsl(var(--muted))]"></div>
        <div className="h-4 w-1/2 rounded bg-[hsl(var(--muted))]"></div>
        <div className="h-4 w-2/3 rounded bg-[hsl(var(--muted))]"></div>
      </div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="animate-pulse rounded-lg border border-[hsl(var(--border))] p-6">
          <div className="space-y-3">
            <div className="h-4 w-20 rounded bg-[hsl(var(--muted))]"></div>
            <div className="h-8 w-16 rounded bg-[hsl(var(--muted))]"></div>
            <div className="h-3 w-24 rounded bg-[hsl(var(--muted))]"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
