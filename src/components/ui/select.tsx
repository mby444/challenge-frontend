"use client";

import * as React from "react";
import { cn } from "@/src/lib/utils";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, placeholder, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 block text-sm font-medium text-[hsl(var(--foreground))]">
            {label}
            {props.required && (
              <span className="ml-1 text-[hsl(var(--destructive))]">*</span>
            )}
          </label>
        )}
        <select
          className={cn(
            "flex h-10 w-full rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--card))] px-3 py-2 text-sm text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            error &&
              "border-[hsl(var(--destructive))] focus:ring-[hsl(var(--destructive))]",
            className,
          )}
          ref={ref}
          {...props}>
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-1 text-sm text-[hsl(var(--destructive))]">{error}</p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";

export { Select };
