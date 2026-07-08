"use client";

import { ReactNode } from "react";
import { AuthProvider } from "./auth-context";
import { AdminAuthProvider } from "./admin-auth-context";

export function AuthProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        {children}
      </AdminAuthProvider>
    </AuthProvider>
  );
}
