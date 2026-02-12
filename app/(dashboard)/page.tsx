"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/src/hooks/use-auth";
import { useTasks } from "@/src/hooks/use-tasks";
import { useTags } from "@/src/hooks/use-tags";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Spinner } from "@/src/components/ui/spinner";
import { ROUTES } from "@/src/lib/constants";
import type { Task } from "@/src/types/task";

export default function DashboardPage() {
  const { user } = useAuth();
  const { tasks, fetchTasks, isLoading: tasksLoading } = useTasks();
  const { tags, fetchTags, isLoading: tagsLoading } = useTags();
  const [recentTasks, setRecentTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
    fetchTags();
  }, []);

  useEffect(() => {
    // Get 5 most recent tasks
    const sorted = [...tasks].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    setRecentTasks(sorted.slice(0, 5));
  }, [tasks]);

  const stats = {
    totalTasks: tasks.length,
    completedTasks: tasks.filter((t) => t.isCompleted).length,
    activeTags: tags.length,
    completionRate:
      tasks.length > 0
        ? Math.round(
            (tasks.filter((t) => t.isCompleted).length / tasks.length) * 100,
          )
        : 0,
  };

  const isLoading = tasksLoading || tagsLoading;

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-[hsl(var(--foreground))]">
          Welcome back, {user?.name || "User"}! 👋
        </h1>
        <p className="mt-2 text-[hsl(var(--muted-foreground))]">
          Here's an overview of your tasks and productivity
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
              Total Tasks
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[hsl(var(--muted-foreground))]">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[hsl(var(--foreground))]">
              {stats.totalTasks}
            </div>
            <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
              All your tasks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
              Completed
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[hsl(var(--success))]">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[hsl(var(--success))]">
              {stats.completedTasks}
            </div>
            <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
              Tasks finished
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
              Active Tags
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[hsl(var(--accent))]">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
              <line x1="7" y1="7" x2="7.01" y2="7"></line>
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[hsl(var(--accent))]">
              {stats.activeTags}
            </div>
            <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
              Organization tags
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
              Completion Rate
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[hsl(var(--primary))]">
              <line x1="12" y1="2" x2="12" y2="6"></line>
              <line x1="12" y1="18" x2="12" y2="22"></line>
              <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
              <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
              <line x1="2" y1="12" x2="6" y2="12"></line>
              <line x1="18" y1="12" x2="22" y2="12"></line>
              <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
              <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[hsl(var(--primary))]">
              {stats.completionRate}%
            </div>
            <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
              Overall progress
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Link href={ROUTES.TASKS}>
            <Button>
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
          </Link>
          <Link href={ROUTES.TAGS}>
            <Button variant="outline">
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
          </Link>
          <Link href={ROUTES.TASKS}>
            <Button variant="ghost">
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
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
              View All Tasks
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Recent Tasks */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Tasks</CardTitle>
            <Link href={ROUTES.TASKS}>
              <Button variant="ghost" size="sm">
                View All →
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {recentTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
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
                No tasks yet
              </h3>
              <p className="mb-4 text-sm text-[hsl(var(--muted-foreground))]">
                Get started by creating your first task
              </p>
              <Link href={ROUTES.TASKS}>
                <Button>Create Task</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start justify-between rounded-lg border border-[hsl(var(--border))] p-4 transition-colors hover:bg-[hsl(var(--accent))]/50">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4
                        className={`font-medium ${
                          task.isCompleted
                            ? "text-[hsl(var(--muted-foreground))] line-through"
                            : "text-[hsl(var(--foreground))]"
                        }`}>
                        {task.title}
                      </h4>
                      {task.isCompleted && (
                        <Badge variant="success">Completed</Badge>
                      )}
                    </div>
                    {task.description && (
                      <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
                        {task.description.length > 100
                          ? `${task.description.substring(0, 100)}...`
                          : task.description}
                      </p>
                    )}
                    {task.tags && task.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {task.tags.map((tag) => (
                          <Badge key={tag.id} variant="default">
                            {tag.name}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <Link href={ROUTES.TASKS}>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
