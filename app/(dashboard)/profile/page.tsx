"use client";

import { useState } from "react";
import { useAuth } from "@/src/hooks/use-auth";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { EditProfileForm } from "@/src/components/profile/edit-profile-form";
import { ChangePasswordForm } from "@/src/components/profile/change-password-form";
import { DeleteAccountDialog } from "@/src/components/profile/delete-account-dialog";

export default function ProfilePage() {
  const { user } = useAuth();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  if (!user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-[hsl(var(--muted-foreground))]">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[hsl(var(--foreground))]">
          Profile
        </h1>
        <p className="mt-2 text-[hsl(var(--muted-foreground))]">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Account Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Account Overview</CardTitle>
          <CardDescription>
            Your account information at a glance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-[hsl(var(--border))] p-4">
              <div>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  Full Name
                </p>
                <p className="mt-1 font-medium text-[hsl(var(--foreground))]">
                  {user.name}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-[hsl(var(--border))] p-4">
              <div>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  Email Address
                </p>
                <p className="mt-1 font-medium text-[hsl(var(--foreground))]">
                  {user.email}
                </p>
              </div>
              <Badge variant="success">Verified</Badge>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-[hsl(var(--border))] p-4">
              <div>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  Date of Birth
                </p>
                <p className="mt-1 font-medium text-[hsl(var(--foreground))]">
                  {user.birth
                    ? new Date(user.birth).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Not set"}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-[hsl(var(--border))] p-4">
              <div>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  Account Created
                </p>
                <p className="mt-1 font-medium text-[hsl(var(--foreground))]">
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Profile Form */}
      <EditProfileForm />

      {/* Change Password Form */}
      <ChangePasswordForm />

      {/* Danger Zone */}
      <Card className="border-[hsl(var(--destructive))]">
        <CardHeader>
          <CardTitle className="text-[hsl(var(--destructive))]">
            Danger Zone
          </CardTitle>
          <CardDescription>
            Irreversible actions that affect your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-start justify-between rounded-lg border border-[hsl(var(--destructive))] bg-[hsl(var(--destructive))]/5 p-4">
            <div>
              <h4 className="font-semibold text-[hsl(var(--foreground))]">
                Delete Account
              </h4>
              <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
                Permanently delete your account and all associated data. This
                action cannot be undone.
              </p>
            </div>
            <Button
              variant="destructive"
              onClick={() => setIsDeleteDialogOpen(true)}>
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Delete Account Dialog */}
      <DeleteAccountDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      />
    </div>
  );
}
