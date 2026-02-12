"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { useAuth } from "@/src/hooks/use-auth";
import { profileSchema, type ProfileFormData } from "@/src/lib/validations";
import { getErrorMessage } from "@/src/types/error";

export function EditProfileForm() {
  const { user, updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      birth: user?.birth
        ? new Date(user.birth).toISOString().split("T")[0]
        : "",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await updateUser({
        ...data,
        birth: new Date(data.birth).toISOString(),
      });
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
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
            label="Full Name"
            placeholder="Enter your full name"
            error={errors.name?.message}
            {...register("name")}
            required
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            error={errors.email?.message}
            {...register("email")}
            required
          />

          <Input
            label="Date of Birth"
            type="date"
            error={errors.birth?.message}
            {...register("birth")}
            required
          />

          <Button type="submit" isLoading={isLoading} disabled={isLoading}>
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
