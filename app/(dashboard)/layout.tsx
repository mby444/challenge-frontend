import { Header } from "@/src/components/layout/header";
import { Sidebar } from "@/src/components/layout/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="mt-16 w-full p-4 md:ml-64 md:p-8">{children}</main>
      </div>
    </div>
  );
}
