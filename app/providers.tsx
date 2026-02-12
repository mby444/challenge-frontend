"use client";

import { AuthProvider } from "@/src/context/auth-context";
import { ToastProvider } from "@/src/context/toast-context";
import { ToastContainer } from "@/src/components/ui/toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <AuthProvider>
        {children}
        <ToastContainer />
      </AuthProvider>
    </ToastProvider>
  );
}
