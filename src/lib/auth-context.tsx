"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { api, setAccessToken, setAdminAccessToken } from "./api-client";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
  phone?: string;
  avatar?: string;
  country?: string;
  institution?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const refreshUser = useCallback(async () => {
    try {
      const res = await api.get<{ user: User }>("/auth/me");
      if (res.success && res.data?.user) {
        setUser(res.data.user);
        return;
      }
    } catch {
      setUser(null);
      setAccessToken(null);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        const res = await api.post<{ accessToken: string }>("/auth/refresh");
        if (res.success && res.data?.accessToken) {
          setAccessToken(res.data.accessToken);
          await refreshUser();
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [refreshUser]);

  const login = useCallback(async (email: string, password: string) => {
    const res = await api.post<{ user: User; accessToken: string }>("/auth/login", { email, password });
    if (res.success && res.data) {
      setAccessToken(res.data.accessToken);
      setUser(res.data.user);
      return { success: true, message: res.message };
    }
    return { success: false, message: res.message || "Login failed" };
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const res = await api.post<{ user: User; accessToken: string }>("/auth/register", { name, email, password });
    if (res.success && res.data) {
      setAccessToken(res.data.accessToken);
      setUser(res.data.user);
      return { success: true, message: res.message };
    }
    return { success: false, message: res.message || "Registration failed", ...(res.errors && { errors: res.errors }) };
  }, []);

  const logout = useCallback(async () => {
    await api.post("/auth/logout");
    setAccessToken(null);
    setUser(null);
    router.push("/login");
  }, [router]);

  const updateUser = useCallback((data: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : null));
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
