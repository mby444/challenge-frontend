import { apiClient } from "./client";
import type { Tag, CreateTagDto, UpdateTagDto } from "@/src/types/tag";

export async function getTags(): Promise<Tag[]> {
  const response = await apiClient.get<Tag[]>("/api/tags");
  return response.data;
}

export async function getTag(id: string): Promise<Tag> {
  const response = await apiClient.get<Tag>(`/api/tags/${id}`);
  return response.data;
}

export async function createTag(data: CreateTagDto): Promise<Tag> {
  const response = await apiClient.post<Tag>("/api/tags", data);
  return response.data;
}

export async function updateTag(id: string, data: UpdateTagDto): Promise<Tag> {
  const response = await apiClient.patch<Tag>(`/api/tags/${id}`, data);
  return response.data;
}

export async function deleteTag(id: string): Promise<void> {
  await apiClient.delete(`/api/tags/${id}`);
}

export async function attachTagToTask(
  tagId: string,
  taskId: string,
): Promise<void> {
  await apiClient.post(`/api/tags/${tagId}/tasks/${taskId}`);
}

export async function detachTagFromTask(
  tagId: string,
  taskId: string,
): Promise<void> {
  await apiClient.delete(`/api/tags/${tagId}/tasks/${taskId}`);
}
