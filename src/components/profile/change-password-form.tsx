"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import * as usersApi from "@/src/lib/api/users";
import {
  changePasswordSchema,
  type ChangePasswordFormData,
} from "@/src/lib/validations";
import { getErrorMessage } from "@/src/types/error";

export function ChangePasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await usersApi.changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      setSuccess("Password changed successfully!");
      reset();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>
          Update your password to keep your account secure
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="rounded-md bg-[hsl(var(--destructive))]/10 border border-[hsl(var(--destructive))] p-3">
              <p className="text-sm text-[hsl(var(--destructive))]">{error}</p>
            </div>
          )}

          {success && (
            <div className="rounded-md bg-[hsl(var(--success))]/10 border border-[hsl(var(--success))] p-3">
              <p className="text-sm text-[hsl(var(--success))]">{success}</p>
            </div>
          )}

          <Input
            label="Current Password"
            type="password"
            placeholder="Enter your current password"
            error={errors.oldPassword?.message}
            {...register("oldPassword")}
            required
          />

          <Input
            label="New Password"
            type="password"
            placeholder="Enter your new password"
            error={errors.newPassword?.message}
            {...register("newPassword")}
            required
          />

          <Input
            label="Confirm New Password"
            type="password"
            placeholder="Confirm your new password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
            required
          />

          <Button type="submit" isLoading={isLoading} disabled={isLoading}>
            Change Password
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
