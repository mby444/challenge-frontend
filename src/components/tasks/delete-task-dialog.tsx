"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import type { Task } from "@/src/types/task";

interface DeleteTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task | null;
  onConfirm: () => Promise<void>;
  isDeleting: boolean;
}

export function DeleteTaskDialog({
  open,
  onOpenChange,
  task,
  onConfirm,
  isDeleting,
}: DeleteTaskDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Task</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this task? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        {task && (
          <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--accent))]/50 p-4">
            <h4 className="font-medium text-[hsl(var(--foreground))]">
              {task.title}
            </h4>
            {task.description && (
              <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
                {task.description}
              </p>
            )}
          </div>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            isLoading={isDeleting}
            disabled={isDeleting}>
            Delete Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
