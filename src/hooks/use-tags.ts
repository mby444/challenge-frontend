"use client";

import { useState, useCallback } from "react";
import * as tagsApi from "@/src/lib/api/tags";
import type { Tag, CreateTagDto, UpdateTagDto } from "@/src/types/tag";

export function useTags() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchTags = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await tagsApi.getTags();
      setTags(data);
      return data;
    } catch (err) {
      const error = err as Error;
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createTag = useCallback(async (data: CreateTagDto) => {
    setError(null);
    try {
      const newTag = await tagsApi.createTag(data);
      setTags((prev) => [newTag, ...prev]);
      return newTag;
    } catch (err) {
      const error = err as Error;
      setError(error);
      throw error;
    }
  }, []);

  const updateTag = useCallback(async (id: string, data: UpdateTagDto) => {
    setError(null);
    try {
      const updatedTag = await tagsApi.updateTag(id, data);
      setTags((prev) => prev.map((tag) => (tag.id === id ? updatedTag : tag)));
      return updatedTag;
    } catch (err) {
      const error = err as Error;
      setError(error);
      throw error;
    }
  }, []);

  const deleteTag = useCallback(async (id: string) => {
    setError(null);
    try {
      await tagsApi.deleteTag(id);
      setTags((prev) => prev.filter((tag) => tag.id !== id));
    } catch (err) {
      const error = err as Error;
      setError(error);
      throw error;
    }
  }, []);

  const attachToTask = useCallback(async (tagId: string, taskId: string) => {
    setError(null);
    try {
      await tagsApi.attachTagToTask(tagId, taskId);
    } catch (err) {
      const error = err as Error;
      setError(error);
      throw error;
    }
  }, []);

  const detachFromTask = useCallback(async (tagId: string, taskId: string) => {
    setError(null);
    try {
      await tagsApi.detachTagFromTask(tagId, taskId);
    } catch (err) {
      const error = err as Error;
      setError(error);
      throw error;
    }
  }, []);

  return {
    tags,
    isLoading,
    error,
    fetchTags,
    createTag,
    updateTag,
    deleteTag,
    attachToTask,
    detachFromTask,
  };
}
