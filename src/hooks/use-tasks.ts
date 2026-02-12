"use client";

import { useState, useCallback } from "react";
import * as tasksApi from "@/src/lib/api/tasks";
import type { Task, CreateTaskDto, UpdateTaskDto } from "@/src/types/task";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await tasksApi.getTasks();
      setTasks(data);
      return data;
    } catch (err) {
      const error = err as Error;
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createTask = useCallback(async (data: CreateTaskDto) => {
    setError(null);
    try {
      const newTask = await tasksApi.createTask(data);
      setTasks((prev) => [newTask, ...prev]);
      return newTask;
    } catch (err) {
      const error = err as Error;
      setError(error);
      throw error;
    }
  }, []);

  const updateTask = useCallback(async (id: string, data: UpdateTaskDto) => {
    setError(null);
    try {
      const updatedTask = await tasksApi.updateTask(id, data);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task)),
      );
      return updatedTask;
    } catch (err) {
      const error = err as Error;
      setError(error);
      throw error;
    }
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    setError(null);
    try {
      await tasksApi.deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      const error = err as Error;
      setError(error);
      throw error;
    }
  }, []);

  const toggleCompletion = useCallback(
    async (id: string, isCompleted: boolean) => {
      setError(null);
      try {
        const updatedTask = await tasksApi.toggleTaskCompletion(
          id,
          isCompleted,
        );
        setTasks((prev) =>
          prev.map((task) => (task.id === id ? updatedTask : task)),
        );
        return updatedTask;
      } catch (err) {
        const error = err as Error;
        setError(error);
        throw error;
      }
    },
    [],
  );

  return {
    tasks,
    isLoading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleCompletion,
  };
}
