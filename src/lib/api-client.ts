const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

interface ApiResponse<T = Record<string, unknown>> {
  success: boolean;
  message: string;
  data: T;
  errors?: string[];
}

let accessToken: string | null = null;
let adminAccessToken: string | null = null;
let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;
let isAdminRefreshing = false;
let adminRefreshPromise: Promise<string | null> | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export function setAdminAccessToken(token: string | null) {
  adminAccessToken = token;
}

export function getAccessToken() {
  return accessToken;
}

export function getAdminAccessToken() {
  return adminAccessToken;
}

async function refreshToken(): Promise<string | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) return null;
    const data = await response.json();
    if (data.success && data.data?.accessToken) {
      accessToken = data.data.accessToken as string;
      return accessToken;
    }
    return null;
  } catch {
    return null;
  }
}

async function refreshAdminToken(): Promise<string | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/refresh`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) return null;
    const data = await response.json();
    if (data.success && data.data?.accessToken) {
      adminAccessToken = data.data.accessToken as string;
      return adminAccessToken;
    }
    return null;
  } catch {
    return null;
  }
}

async function request<T = Record<string, unknown>>(
  endpoint: string,
  options: RequestInit = {},
  isAdmin = false
): Promise<ApiResponse<T>> {
  const token = isAdmin ? adminAccessToken : accessToken;
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  let response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });

  if (response.status === 401 && token) {
    if (isAdmin) {
      if (!isAdminRefreshing) {
        isAdminRefreshing = true;
        adminRefreshPromise = refreshAdminToken().finally(() => {
          isAdminRefreshing = false;
          adminRefreshPromise = null;
        });
      }
      const newToken = await adminRefreshPromise;
      if (newToken) {
        headers["Authorization"] = `Bearer ${newToken}`;
        response = await fetch(`${API_BASE_URL}${endpoint}`, {
          ...options,
          headers,
          credentials: "include",
        });
      }
    } else {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = refreshToken().finally(() => {
          isRefreshing = false;
          refreshPromise = null;
        });
      }
      const newToken = await refreshPromise;
      if (newToken) {
        headers["Authorization"] = `Bearer ${newToken}`;
        response = await fetch(`${API_BASE_URL}${endpoint}`, {
          ...options,
          headers,
          credentials: "include",
        });
      }
    }
  }

  const data = await response.json();
  return data as ApiResponse<T>;
}

export const api = {
  get: <T = Record<string, unknown>>(endpoint: string, isAdmin = false) =>
    request<T>(endpoint, { method: "GET" }, isAdmin),

  post: <T = Record<string, unknown>>(endpoint: string, body?: unknown, isAdmin = false) =>
    request<T>(endpoint, { method: "POST", body: body ? JSON.stringify(body) : undefined }, isAdmin),

  patch: <T = Record<string, unknown>>(endpoint: string, body?: unknown, isAdmin = false) =>
    request<T>(endpoint, { method: "PATCH", body: body ? JSON.stringify(body) : undefined }, isAdmin),

  put: <T = Record<string, unknown>>(endpoint: string, body?: unknown, isAdmin = false) =>
    request<T>(endpoint, { method: "PUT", body: body ? JSON.stringify(body) : undefined }, isAdmin),

  delete: <T = Record<string, unknown>>(endpoint: string, isAdmin = false) =>
    request<T>(endpoint, { method: "DELETE" }, isAdmin),

  upload: <T = Record<string, unknown>>(endpoint: string, formData: FormData, isAdmin = false) =>
    request<T>(endpoint, { method: "POST", body: formData }, isAdmin),
};
