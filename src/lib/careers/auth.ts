// src/lib/careers/auth.ts

const CAREER_ADMIN_AUTH_KEY = "venus_career_admin_auth_session";

export interface AdminUserSession {
  email: string;
  name: string;
  role: "Super Admin" | "Recruiter";
  loggedInAt: string;
}

// Credentials configuration (env vars fallback)
const DEFAULT_ADMIN_EMAIL = (process.env.VITE_CAREER_ADMIN_EMAIL || "admin@venusconsultancy.com").toLowerCase();
const DEFAULT_ADMIN_PASSWORD = process.env.VITE_CAREER_ADMIN_PASSWORD || "VenusAdmin2025!";

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const session = localStorage.getItem(CAREER_ADMIN_AUTH_KEY);
    return !!session;
  } catch {
    return false;
  }
}

export function getAdminSession(): AdminUserSession | null {
  if (typeof window === "undefined") return null;
  try {
    const session = localStorage.getItem(CAREER_ADMIN_AUTH_KEY);
    if (!session) return null;
    return JSON.parse(session) as AdminUserSession;
  } catch {
    return null;
  }
}

export function loginAdmin(email: string, pass: string): { success: boolean; error?: string; session?: AdminUserSession } {
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedPass = pass.trim();

  // Validate admin credentials (accepts admin@venusconsultancy.com or admin or recruiter)
  const isEmailValid =
    trimmedEmail === DEFAULT_ADMIN_EMAIL ||
    trimmedEmail === "admin" ||
    trimmedEmail === "admin@venusconsultancy.com" ||
    trimmedEmail === "recruiter@venusconsultancy.com" ||
    trimmedEmail === "hr@venusconsultancy.com";

  if (
    DEFAULT_ADMIN_PASSWORD &&
    isEmailValid &&
    trimmedPass === DEFAULT_ADMIN_PASSWORD
  ) {
    const session: AdminUserSession = {
      email: trimmedEmail.includes("@") ? trimmedEmail : "admin@venusconsultancy.com",
      name: trimmedEmail === "recruiter@venusconsultancy.com" ? "Senior Recruiter" : "Venus Super Admin",
      role: trimmedEmail === "recruiter@venusconsultancy.com" ? "Recruiter" : "Super Admin",
      loggedInAt: new Date().toISOString(),
    };
    if (typeof window !== "undefined") {
      localStorage.setItem(CAREER_ADMIN_AUTH_KEY, JSON.stringify(session));
    }
    return { success: true, session };
  }

  return {
    success: false,
    error: "Invalid credentials. Please try again.",
  };
}

export function logoutAdmin(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(CAREER_ADMIN_AUTH_KEY);
  }
}
