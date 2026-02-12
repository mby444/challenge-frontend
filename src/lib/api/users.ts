import { apiClient } from "./client";
import type { User } from "@/src/types/user";

export async function getCurrentUser(): Promise<User> {
  const response = await apiClient.get<User>("/api/users/me");
  return response.data;
}

export async function updateProfile(
  data: Partial<Pick<User, "name" | "email" | "birth">>,
): Promise<User> {
  const response = await apiClient.patch<User>("/api/users/me", data);
  return response.data;
}

export async function changePassword(data: {
  oldPassword: string;
  newPassword: string;
}): Promise<void> {
  await apiClient.patch("/api/users/me/password", data);
}

export async function deleteAccount(): Promise<void> {
  await apiClient.delete("/api/users/me");
}
