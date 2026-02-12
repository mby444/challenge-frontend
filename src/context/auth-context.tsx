"use client";

import React, { createContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import * as authApi from "@/src/lib/api/auth";
import * as usersApi from "@/src/lib/api/users";
import { setToken, removeToken, getToken } from "@/src/lib/api/client";
import type { User, LoginDto, RegisterDto } from "@/src/types/user";
import { ROUTES } from "@/src/lib/constants";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginDto) => Promise<void>;
  register: (data: RegisterDto) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchCurrentUser = useCallback(async () => {
    try {
      const userData = await usersApi.getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      removeToken();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = getToken();
    if (token) {
      fetchCurrentUser();
    } else {
      setIsLoading(false);
    }
  }, [fetchCurrentUser]);

  const login = async (credentials: LoginDto) => {
    try {
      const { user: userData, access_token } = await authApi.login(credentials);
      setToken(access_token);
      setUser(userData);
      router.push(ROUTES.HOME);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (data: RegisterDto) => {
    try {
      const { user: userData, access_token } = await authApi.register(data);
      setToken(access_token);
      setUser(userData);
      router.push(ROUTES.HOME);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = () => {
    removeToken();
    authApi.logout();
    setUser(null);
    router.push(ROUTES.LOGIN);
  };

  const updateUser = async (data: Partial<User>) => {
    try {
      const updatedUser = await usersApi.updateProfile(data);
      setUser(updatedUser);
    } catch (error) {
      console.error("Failed to update user:", error);
      throw error;
    }
  };

  const refreshUser = async () => {
    await fetchCurrentUser();
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
