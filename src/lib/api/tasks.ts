import { apiClient } from "./client";
import type { Task, CreateTaskDto, UpdateTaskDto } from "@/src/types/task";

export async function getTasks(): Promise<Task[]> {
  const response = await apiClient.get<Task[]>("/api/tasks");
  return response.data;
}

export async function getTask(id: string): Promise<Task> {
  const response = await apiClient.get<Task>(`/api/tasks/${id}`);
  return response.data;
}

export async function createTask(data: CreateTaskDto): Promise<Task> {
  const response = await apiClient.post<Task>("/api/tasks", data);
  return response.data;
}

export async function updateTask(
  id: string,
  data: UpdateTaskDto,
): Promise<Task> {
  const response = await apiClient.patch<Task>(`/api/tasks/${id}`, data);
  return response.data;
}

export async function deleteTask(id: string): Promise<void> {
  await apiClient.delete(`/api/tasks/${id}`);
}

export async function toggleTaskCompletion(
  id: string,
  isCompleted: boolean,
): Promise<Task> {
  return updateTask(id, { isCompleted });
}
