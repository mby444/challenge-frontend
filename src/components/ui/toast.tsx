"use client";

import { useToast } from "@/src/context/toast-context";

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2"
      aria-live="polite"
      aria-atomic="true">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            animate-slide-in-right min-w-[300px] max-w-[400px] rounded-lg border p-4 shadow-lg
            ${
              toast.type === "success"
                ? "border-[hsl(var(--success))] bg-[hsl(var(--success))]/10"
                : toast.type === "error"
                  ? "border-[hsl(var(--destructive))] bg-[hsl(var(--destructive))]/10"
                  : toast.type === "warning"
                    ? "border-[hsl(var(--warning))] bg-[hsl(var(--warning))]/10"
                    : "border-[hsl(var(--border))] bg-[hsl(var(--card))]"
            }
          `}
          role="alert">
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className="flex-shrink-0">
              {toast.type === "success" && (
                <svg
                  className="h-5 w-5 text-[hsl(var(--success))]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              )}
              {toast.type === "error" && (
                <svg
                  className="h-5 w-5 text-[hsl(var(--destructive))]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
              )}
              {toast.type === "warning" && (
                <svg
                  className="h-5 w-5 text-[hsl(var(--warning))]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              )}
              {toast.type === "info" && (
                <svg
                  className="h-5 w-5 text-[hsl(var(--primary))]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              )}
            </div>

            {/* Message */}
            <p className="flex-1 text-sm font-medium text-[hsl(var(--foreground))]">
              {toast.message}
            </p>

            {/* Close button */}
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 rounded-sm opacity-70 transition-opacity hover:opacity-100"
              aria-label="Close notification">
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
