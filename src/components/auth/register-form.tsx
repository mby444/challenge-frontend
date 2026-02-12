"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useAuth } from "@/src/hooks/use-auth";
import { registerSchema, type RegisterFormData } from "@/src/lib/validations";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/src/components/ui/card";
import { ROUTES } from "@/src/lib/constants";

export function RegisterForm() {
  const { register: registerUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch("password", "");

  const getPasswordStrength = () => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength();
  const strengthColors = [
    "bg-[hsl(var(--destructive))]",
    "bg-[hsl(var(--destructive))]",
    "bg-[hsl(var(--warning))]",
    "bg-[hsl(var(--warning))]",
    "bg-[hsl(var(--success))]",
  ];
  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      await registerUser(data);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Sign up to start managing your tasks</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {error && (
            <div className="rounded-md bg-[hsl(var(--destructive))]/10 border border-[hsl(var(--destructive))] p-3">
              <p className="text-sm text-[hsl(var(--destructive))]">{error}</p>
            </div>
          )}

          <Input
            label="Full Name"
            type="text"
            placeholder="John Doe"
            error={errors.name?.message}
            {...register("name")}
            required
          />

          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register("email")}
            required
          />

          <div>
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register("password")}
              required
            />
            {password && (
              <div className="mt-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        level <= passwordStrength
                          ? strengthColors[passwordStrength - 1]
                          : "bg-[hsl(var(--border))]"
                      }`}
                    />
                  ))}
                </div>
                {passwordStrength > 0 && (
                  <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
                    Password strength: {strengthLabels[passwordStrength - 1]}
                  </p>
                )}
              </div>
            )}
          </div>

          <Input
            label="Birth Date"
            type="date"
            error={errors.birth?.message}
            {...register("birth")}
            required
          />
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
            disabled={isLoading}>
            Create Account
          </Button>

          <p className="text-center text-sm text-[hsl(var(--muted-foreground))]">
            Already have an account?{" "}
            <Link
              href={ROUTES.LOGIN}
              className="font-medium text-[hsl(var(--primary))] hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
