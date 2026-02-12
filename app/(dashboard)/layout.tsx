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
        <main className="ml-64 mt-16 w-full p-8">{children}</main>
      </div>
    </div>
  );
}
