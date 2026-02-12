"use client";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/src/components/ui/dropdown-menu";
import type { Tag } from "@/src/types/tag";

interface TagItemProps {
  tag: Tag;
  taskCount: number;
  onEdit: (tag: Tag) => void;
  onDelete: (tag: Tag) => void;
  onViewTasks?: (tag: Tag) => void;
}

export function TagItem({
  tag,
  taskCount,
  onEdit,
  onDelete,
  onViewTasks,
}: TagItemProps) {
  return (
    <div className="group flex items-center justify-between rounded-lg border border-[hsl(var(--border))] p-4 transition-colors hover:bg-[hsl(var(--accent))]/50">
      <div className="flex items-center gap-4">
        <Badge variant="default" className="text-sm">
          {tag.name}
        </Badge>

        <div className="text-sm text-[hsl(var(--muted-foreground))]">
          <span className="font-medium text-[hsl(var(--foreground))]">
            {taskCount}
          </span>{" "}
          {taskCount === 1 ? "task" : "tasks"}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {taskCount > 0 && onViewTasks && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewTasks(tag)}
            className="opacity-0 group-hover:opacity-100">
            View Tasks
          </Button>
        )}

        <DropdownMenu
          align="right"
          trigger={
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
            </Button>
          }>
          <DropdownMenuItem onClick={() => onEdit(tag)}>
            <svg
              className="mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onDelete(tag)} destructive>
            <svg
              className="mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
            Delete
          </DropdownMenuItem>
        </DropdownMenu>
      </div>
    </div>
  );
}
