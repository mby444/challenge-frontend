"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  createTagSchema,
  updateTagSchema,
  type CreateTagFormData,
  type UpdateTagFormData,
} from "@/src/lib/validations";
import type { Tag } from "@/src/types/tag";
import { getErrorMessage } from "@/src/types/error";

interface TagDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateTagFormData | UpdateTagFormData) => Promise<void>;
  tag?: Tag | null;
  mode: "create" | "edit";
}

export function TagDialog({
  open,
  onOpenChange,
  onSubmit,
  tag,
  mode,
}: TagDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const schema = mode === "create" ? createTagSchema : updateTagSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTagFormData | UpdateTagFormData>({
    resolver: zodResolver(schema),
    defaultValues: tag
      ? {
          name: tag.name,
        }
      : {
          name: "",
        },
  });

  useEffect(() => {
    if (tag) {
      reset({ name: tag.name });
    } else {
      reset({ name: "" });
    }
  }, [tag, reset]);

  const handleFormSubmit = async (
    data: CreateTagFormData | UpdateTagFormData,
  ) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmit(data);
      reset();
      onOpenChange(false);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    setError(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create New Tag" : "Edit Tag"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Add a new tag to organize your tasks"
              : "Update tag details"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="space-y-4">
            {error && (
              <div className="rounded-md bg-[hsl(var(--destructive))]/10 border border-[hsl(var(--destructive))] p-3">
                <p className="text-sm text-[hsl(var(--destructive))]">
                  {error}
                </p>
              </div>
            )}

            <Input
              label="Tag Name"
              placeholder="Enter tag name"
              error={errors.name?.message}
              {...register("name")}
              required
              maxLength={50}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isSubmitting}
              disabled={isSubmitting}>
              {mode === "create" ? "Create Tag" : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
