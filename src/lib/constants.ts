export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  TASKS: "/tasks",
  TAGS: "/tags",
  PROFILE: "/profile",
} as const;

export const TOKEN_KEY = "auth-token";
