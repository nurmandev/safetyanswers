export function sanitizeUser(user: Record<string, unknown>) {
  const sanitized = { ...user };
  delete sanitized.password;
  delete sanitized.refreshToken;
  delete sanitized.passwordChangedAt;
  return sanitized;
}

export function sanitizeAdmin(admin: Record<string, unknown>) {
  const sanitized = { ...admin };
  delete sanitized.password;
  delete sanitized.refreshToken;
  delete sanitized.passwordChangedAt;
  return sanitized;
}

export function getCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" as const : "lax" as const,
    path: "/",
  };
}
