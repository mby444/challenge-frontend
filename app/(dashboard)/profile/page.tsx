export const metadata = {
  title: "Profile - Task Manager",
  description: "Manage your profile settings",
};

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[hsl(var(--foreground))]">
          Profile
        </h1>
        <p className="mt-2 text-[hsl(var(--muted-foreground))]">
          Manage your account settings
        </p>
      </div>

      <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed border-[hsl(var(--border))] p-8">
        <p className="text-[hsl(var(--muted-foreground))]">
          Profile page - Coming in Phase 8
        </p>
      </div>
    </div>
  );
}
