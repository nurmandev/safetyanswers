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
import { api, setAdminAccessToken } from "./api-client";

interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AdminAuthContextType {
  admin: Admin | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  refreshAdmin: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const refreshAdmin = useCallback(async () => {
    try {
      const res = await api.get<{ admin: Admin }>("/admin/me", true);
      if (res.success && res.data?.admin) {
        setAdmin(res.data.admin);
        return;
      }
    } catch {
      setAdmin(null);
      setAdminAccessToken(null);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        const res = await api.post<{ accessToken: string }>("/admin/refresh", {}, true);
        if (res.success && res.data?.accessToken) {
          setAdminAccessToken(res.data.accessToken);
          await refreshAdmin();
        }
      } catch {
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [refreshAdmin]);

  const login = useCallback(async (email: string, password: string) => {
    const res = await api.post<{ admin: Admin; accessToken: string }>("/admin/login", { email, password }, true);
    if (res.success && res.data) {
      setAdminAccessToken(res.data.accessToken);
      setAdmin(res.data.admin);
      return { success: true, message: res.message };
    }
    return { success: false, message: res.message || "Login failed" };
  }, []);

  const logout = useCallback(async () => {
    await api.post("/admin/logout", {}, true);
    setAdminAccessToken(null);
    setAdmin(null);
    router.push("/login");
  }, [router]);

  return (
    <AdminAuthContext.Provider value={{ admin, loading, login, logout, refreshAdmin }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}
