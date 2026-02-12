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
import { Badge } from "@/src/components/ui/badge";
import type { Tag } from "@/src/types/tag";

interface DeleteTagDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tag: Tag | null;
  taskCount: number;
  onConfirm: () => Promise<void>;
  isDeleting: boolean;
}

export function DeleteTagDialog({
  open,
  onOpenChange,
  tag,
  taskCount,
  onConfirm,
  isDeleting,
}: DeleteTagDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Tag</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this tag?
            {taskCount > 0 && (
              <span className="mt-2 block text-[hsl(var(--warning))]">
                This tag is currently used by {taskCount}{" "}
                {taskCount === 1 ? "task" : "tasks"}. The tag will be removed
                from all tasks.
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        {tag && (
          <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--accent))]/50 p-4">
            <div className="flex items-center gap-2">
              <Badge variant="default">{tag.name}</Badge>
              <span className="text-sm text-[hsl(var(--muted-foreground))]">
                ({taskCount} {taskCount === 1 ? "task" : "tasks"})
              </span>
            </div>
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
            Delete Tag
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
