import { Tag } from "./tag";

export interface Task {
  id: string;
  title: string;
  description: string | null;
  isCompleted: boolean;
  userId: string;
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  isCompleted?: boolean;
}
