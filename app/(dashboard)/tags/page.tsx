"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useTags } from "@/src/hooks/use-tags";
import { useTasks } from "@/src/hooks/use-tasks";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Spinner } from "@/src/components/ui/spinner";
import { TagItem } from "@/src/components/tags/tag-item";
import { TagDialog } from "@/src/components/tags/tag-dialog";
import { DeleteTagDialog } from "@/src/components/tags/delete-tag-dialog";
import type { Tag } from "@/src/types/tag";
import type {
  CreateTagFormData,
  UpdateTagFormData,
} from "@/src/lib/validations";
import { ROUTES } from "@/src/lib/constants";

export default function TagsPage() {
  const router = useRouter();
  const { tags, fetchTags, createTag, updateTag, deleteTag } = useTags();
  const { tasks, fetchTasks } = useTasks();

  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Dialog states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [editingTag, setEditingTag] = useState<Tag | null>(null);

  // Delete dialog states
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingTag, setDeletingTag] = useState<Tag | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Calculate task count for each tag
  const tagTaskCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    tags.forEach((tag) => {
      counts[tag.id] = tasks.filter((task) =>
        task.tags?.some((t) => t.id === tag.id),
      ).length;
    });
    return counts;
  }, [tags, tasks]);

  // Filtered tags
  const filteredTags = useMemo(() => {
    if (!searchQuery) return tags;

    const query = searchQuery.toLowerCase();
    return tags.filter((tag) => tag.name.toLowerCase().includes(query));
  }, [tags, searchQuery]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchTags(), fetchTasks()]);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const handleCreateTag = async (data: CreateTagFormData) => {
    await createTag(data);
  };

  const handleUpdateTag = async (data: UpdateTagFormData) => {
    if (!editingTag) return;
    await updateTag(editingTag.id, data);
  };

  const handleOpenCreateDialog = () => {
    setDialogMode("create");
    setEditingTag(null);
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (tag: Tag) => {
    setDialogMode("edit");
    setEditingTag(tag);
    setIsDialogOpen(true);
  };

  const handleOpenDeleteDialog = (tag: Tag) => {
    setDeletingTag(tag);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingTag) return;

    setIsDeleting(true);
    try {
      await deleteTag(deletingTag.id);
      setIsDeleteDialogOpen(false);
      setDeletingTag(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleViewTasks = (tag: Tag) => {
    // Navigate to tasks page with tag filter
    router.push(`${ROUTES.TASKS}?tag=${tag.id}`);
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[hsl(var(--foreground))]">
            Tags
          </h1>
          <p className="mt-2 text-[hsl(var(--muted-foreground))]">
            Organize your tasks with tags
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
          New Tag
        </Button>
      </div>

      {/* Search */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search tags by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchQuery("")}>
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
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-6 text-sm text-[hsl(var(--muted-foreground))]">
        <div>
          <span className="font-medium text-[hsl(var(--foreground))]">
            {filteredTags.length}
          </span>{" "}
          {searchQuery ? "matching" : "total"}{" "}
          {filteredTags.length === 1 ? "tag" : "tags"}
        </div>
        {!searchQuery && (
          <div>
            <span className="font-medium text-[hsl(var(--primary))]">
              {Object.values(tagTaskCounts).reduce(
                (sum, count) => sum + count,
                0,
              )}
            </span>{" "}
            tagged tasks
          </div>
        )}
      </div>

      {/* Tag List */}
      {filteredTags.length === 0 ? (
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
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
            <line x1="7" y1="7" x2="7.01" y2="7"></line>
          </svg>
          <h3 className="mb-2 text-lg font-semibold text-[hsl(var(--foreground))]">
            {searchQuery ? "No tags found" : "No tags yet"}
          </h3>
          <p className="mb-4 text-sm text-[hsl(var(--muted-foreground))]">
            {searchQuery
              ? "Try adjusting your search"
              : "Get started by creating your first tag"}
          </p>
          {!searchQuery && (
            <Button onClick={handleOpenCreateDialog}>Create Tag</Button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTags.map((tag) => (
            <TagItem
              key={tag.id}
              tag={tag}
              taskCount={tagTaskCounts[tag.id] || 0}
              onEdit={handleOpenEditDialog}
              onDelete={handleOpenDeleteDialog}
              onViewTasks={handleViewTasks}
            />
          ))}
        </div>
      )}

      {/* Tag Dialog */}
      <TagDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={dialogMode === "create" ? handleCreateTag : handleUpdateTag}
        tag={editingTag}
        mode={dialogMode}
      />

      {/* Delete Dialog */}
      <DeleteTagDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        tag={deletingTag}
        taskCount={deletingTag ? tagTaskCounts[deletingTag.id] || 0 : 0}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}
