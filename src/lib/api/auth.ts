import { apiClient, setToken, removeToken } from "./client";
import type { LoginDto, RegisterDto, AuthResponse } from "@/src/types/user";

export async function register(
  data: RegisterDto,
): Promise<AuthResponse | undefined> {
  try {
    const response = await apiClient.post<AuthResponse>(
      "/api/auth/register",
      data,
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
}

export async function login(credentials: LoginDto): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>(
    "/api/auth/login",
    credentials,
  );
  return response.data;
}

export function logout(): void {
  removeToken();
}
