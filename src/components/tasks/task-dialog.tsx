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
import { Textarea } from "@/src/components/ui/textarea";
import { Badge } from "@/src/components/ui/badge";
import { useTags } from "@/src/hooks/use-tags";
import {
  createTaskSchema,
  updateTaskSchema,
  type CreateTaskFormData,
  type UpdateTaskFormData,
} from "@/src/lib/validations";
import type { Task } from "@/src/types/task";
import type { Tag } from "@/src/types/tag";
import { getErrorMessage } from "@/src/types/error";

// Extended form data types that include selectedTagIds
type CreateTaskFormDataWithTags = CreateTaskFormData & {
  selectedTagIds?: string[];
};
type UpdateTaskFormDataWithTags = UpdateTaskFormData & {
  selectedTagIds?: string[];
};
type TaskFormDataWithTags =
  | CreateTaskFormDataWithTags
  | UpdateTaskFormDataWithTags;

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: TaskFormDataWithTags) => Promise<void>;
  task?: Task | null;
  mode: "create" | "edit";
}

export function TaskDialog({
  open,
  onOpenChange,
  onSubmit,
  task,
  mode,
}: TaskDialogProps) {
  const { tags, fetchTags } = useTags();
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(
    task?.tags?.map((t) => t.id) || [],
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const schema = mode === "create" ? createTaskSchema : updateTaskSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTaskFormData | UpdateTaskFormData>({
    resolver: zodResolver(schema),
    defaultValues: task
      ? {
          title: task.title,
          description: task.description || "",
        }
      : {
          title: "",
          description: "",
        },
  });

  useEffect(() => {
    if (open && tags.length === 0) {
      fetchTags();
    }
  }, [open]);

  useEffect(() => {
    if (task) {
      setSelectedTagIds(task.tags?.map((t) => t.id) || []);
    } else {
      setSelectedTagIds([]);
    }
  }, [task]);

  const handleFormSubmit = async (
    data: CreateTaskFormData | UpdateTaskFormData,
  ) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Pass data with selected tag IDs
      const formDataWithTags: TaskFormDataWithTags = {
        ...data,
        selectedTagIds,
      };
      await onSubmit(formDataWithTags);
      reset();
      setSelectedTagIds([]);
      onOpenChange(false);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTag = (tagId: string) => {
    setSelectedTagIds((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId],
    );
  };

  const handleClose = () => {
    reset();
    setSelectedTagIds([]);
    setError(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create New Task" : "Edit Task"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Add a new task to your list"
              : "Update task details"}
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
              label="Title"
              placeholder="Enter task title"
              error={errors.title?.message}
              {...register("title")}
              required
            />

            <Textarea
              label="Description"
              placeholder="Enter task description (optional)"
              rows={4}
              error={errors.description?.message}
              {...register("description")}
            />

            <div>
              <label className="mb-2 block text-sm font-medium text-[hsl(var(--foreground))]">
                Tags (Optional)
              </label>
              {tags.length === 0 ? (
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  No tags available. Create tags first.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag.id}
                      variant={
                        selectedTagIds.includes(tag.id) ? "default" : "default"
                      }
                      className={
                        selectedTagIds.includes(tag.id)
                          ? "cursor-pointer"
                          : "cursor-pointer opacity-50 hover:opacity-100"
                      }
                      onClick={() => toggleTag(tag.id)}>
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
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
              {mode === "create" ? "Create Task" : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
