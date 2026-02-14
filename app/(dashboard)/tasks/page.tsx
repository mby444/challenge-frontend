"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTasks } from "@/src/hooks/use-tasks";
import { useTags } from "@/src/hooks/use-tags";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Select } from "@/src/components/ui/select";
import { Spinner } from "@/src/components/ui/spinner";
import { TaskItem } from "@/src/components/tasks/task-item";
import { TaskDialog } from "@/src/components/tasks/task-dialog";
import { DeleteTaskDialog } from "@/src/components/tasks/delete-task-dialog";
import * as tagsApi from "@/src/lib/api/tags";
import type { Task } from "@/src/types/task";
import type {
  CreateTaskFormData,
  UpdateTaskFormData,
} from "@/src/lib/validations";

// Extended types for task forms with tag selection
type CreateTaskFormDataWithTags = CreateTaskFormData & {
  selectedTagIds?: string[];
};
type UpdateTaskFormDataWithTags = UpdateTaskFormData & {
  selectedTagIds?: string[];
};
type TaskFormDataWithTags =
  | CreateTaskFormDataWithTags
  | UpdateTaskFormDataWithTags;

type FilterType = "all" | "active" | "completed";

function TasksContent() {
  const searchParams = useSearchParams();
  const {
    tasks,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleCompletion,
  } = useTasks();
  const { tags, attachToTask, detachFromTask } = useTags();

  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [selectedTagId, setSelectedTagId] = useState<string>("");

  // Dialog states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Delete dialog states
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Filtered tasks
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await fetchTasks();
      setIsLoading(false);
    };
    loadData();

    // Set tag filter from URL if present
    const tagParam = searchParams.get("tag");
    if (tagParam) {
      setSelectedTagId(tagParam);
    }
  }, [searchParams]);

  useEffect(() => {
    let result = [...tasks];

    // Filter by status
    if (filterType === "active") {
      result = result.filter((t) => !t.isCompleted);
    } else if (filterType === "completed") {
      result = result.filter((t) => t.isCompleted);
    }

    // Filter by tag
    if (selectedTagId) {
      result = result.filter((t) =>
        t.tags?.some((tag) => tag.id === selectedTagId),
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.description?.toLowerCase().includes(query),
      );
    }

    setFilteredTasks(result);
  }, [tasks, filterType, selectedTagId, searchQuery]);

  const handleCreateTask = async (data: TaskFormDataWithTags) => {
    const { selectedTagIds, ...taskData } = data;
    const newTask = await createTask(taskData as CreateTaskFormData);

    // Attach selected tags if any
    if (selectedTagIds && selectedTagIds.length > 0) {
      for (const tagId of selectedTagIds) {
        try {
          await tagsApi.attachTagToTask(tagId, newTask.id);
        } catch (error) {
          console.error(`Failed to attach tag ${tagId}:`, error);
        }
      }
      // Refresh tasks to get updated tags
      await fetchTasks();
    }
  };

  const handleUpdateTask = async (data: TaskFormDataWithTags) => {
    if (!editingTask) return;
    const { selectedTagIds, ...taskData } = data;
    const oldTagIds = editingTask.tags.map((tag) => tag.id);
    await updateTask(editingTask.id, taskData as UpdateTaskFormData);
    const detachingTagIds = oldTagIds.filter(
      (tagId) => !selectedTagIds?.includes(tagId),
    );
    const attachingTagIds = selectedTagIds?.filter(
      (tagId) => !oldTagIds.includes(tagId),
    );

    if (detachingTagIds.length > 0) {
      for (const tagId of detachingTagIds) {
        await detachFromTask(tagId, editingTask.id);
      }
    }

    if (attachingTagIds && attachingTagIds.length > 0) {
      for (const tagId of attachingTagIds) {
        await attachToTask(tagId, editingTask.id);
      }
    }

    await fetchTasks();
  };

  const handleOpenCreateDialog = () => {
    setDialogMode("create");
    setEditingTask(null);
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (task: Task) => {
    setDialogMode("edit");
    setEditingTask(task);
    setIsDialogOpen(true);
  };

  const handleOpenDeleteDialog = (task: Task) => {
    setDeletingTask(task);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingTask) return;

    setIsDeleting(true);
    try {
      await deleteTask(deletingTask.id);
      setIsDeleteDialogOpen(false);
      setDeletingTask(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleComplete = async (id: string, isCompleted: boolean) => {
    await toggleCompletion(id, isCompleted);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[hsl(var(--foreground))]">
            Tasks
          </h1>
          <p className="mt-2 text-[hsl(var(--muted-foreground))]">
            Manage and organize your tasks
          </p>
        </div>
        <Button onClick={handleOpenCreateDialog}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          New Task
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col gap-4">
        {/* Search Bar - Full Width */}
        <div className="w-full">
          <Input
            type="search"
            placeholder="Search tasks by title or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Filters - Side by Side */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">
              Status:
            </label>
            <Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as FilterType)}
              options={[
                { value: "all", label: "All Tasks" },
                { value: "active", label: "Active" },
                { value: "completed", label: "Completed" },
              ]}
              className="w-full min-w-[140px] sm:w-auto"
            />
          </div>

          {tags.length > 0 && (
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-[hsl(var(--foreground))]">
                Tag:
              </label>
              <Select
                value={selectedTagId}
                onChange={(e) => setSelectedTagId(e.target.value)}
                options={[
                  { value: "", label: "All Tags" },
                  ...tags.map((tag) => ({ value: tag.id, label: tag.name })),
                ]}
                className="w-full min-w-[140px] sm:w-auto"
              />
            </div>
          )}

          {/* Clear Filters Button */}
          {(searchQuery || filterType !== "all" || selectedTagId) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setFilterType("all");
                setSelectedTagId("");
              }}
              className="ml-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-6 text-sm text-[hsl(var(--muted-foreground))]">
        <div>
          <span className="font-medium text-[hsl(var(--foreground))]">
            {filteredTasks.length}
          </span>{" "}
          {filterType === "all"
            ? "total"
            : filterType === "active"
              ? "active"
              : "completed"}
        </div>
        {filterType === "all" && (
          <>
            <div>
              <span className="font-medium text-[hsl(var(--success))]">
                {tasks.filter((t) => t.isCompleted).length}
              </span>{" "}
              completed
            </div>
            <div>
              <span className="font-medium text-[hsl(var(--primary))]">
                {tasks.filter((t) => !t.isCompleted).length}
              </span>{" "}
              active
            </div>
          </>
        )}
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[hsl(var(--border))] py-16">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mb-4 text-[hsl(var(--muted-foreground))]">
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
          </svg>
          <h3 className="mb-2 text-lg font-semibold text-[hsl(var(--foreground))]">
            {searchQuery || selectedTagId ? "No tasks found" : "No tasks yet"}
          </h3>
          <p className="mb-4 text-sm text-[hsl(var(--muted-foreground))]">
            {searchQuery || selectedTagId
              ? "Try adjusting your filters"
              : "Get started by creating your first task"}
          </p>
          {!searchQuery && !selectedTagId && (
            <Button onClick={handleOpenCreateDialog}>Create Task</Button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onEdit={handleOpenEditDialog}
              onDelete={handleOpenDeleteDialog}
            />
          ))}
        </div>
      )}

      {/* Task Dialog */}
      <TaskDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={dialogMode === "create" ? handleCreateTask : handleUpdateTask}
        task={editingTask}
        mode={dialogMode}
      />

      {/* Delete Dialog */}
      <DeleteTaskDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        task={deletingTask}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}

export default function TaskPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <TasksContent />
    </Suspense>
  );
}
