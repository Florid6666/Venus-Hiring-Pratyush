// src/lib/blog-auth.ts

const BLOG_ADMIN_AUTH_KEY = "venus_blog_admin_auth_session";

export interface BlogAdminSession {
  email: string;
  name: string;
  role: "Blog Admin" | "Content Editor";
  loggedInAt: string;
}

const DEFAULT_BLOG_ADMIN_EMAIL = (process.env.VITE_BLOG_ADMIN_EMAIL || "admin@venusconsultancy.com").toLowerCase();
const DEFAULT_BLOG_ADMIN_PASSWORD = process.env.VITE_BLOG_ADMIN_PASSWORD || "VenusAdmin2025!";

export function isBlogAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const session = localStorage.getItem(BLOG_ADMIN_AUTH_KEY);
    return !!session;
  } catch {
    return false;
  }
}

export function getBlogAdminSession(): BlogAdminSession | null {
  if (typeof window === "undefined") return null;
  try {
    const session = localStorage.getItem(BLOG_ADMIN_AUTH_KEY);
    if (!session) return null;
    return JSON.parse(session) as BlogAdminSession;
  } catch {
    return null;
  }
}

export function loginBlogAdmin(email: string, pass: string): { success: boolean; error?: string; session?: BlogAdminSession } {
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedPass = pass.trim();

  const isEmailValid =
    trimmedEmail === DEFAULT_BLOG_ADMIN_EMAIL ||
    trimmedEmail === "admin" ||
    trimmedEmail === "admin@venusconsultancy.com" ||
    trimmedEmail === "blog@venusconsultancy.com";

  if (
    DEFAULT_BLOG_ADMIN_PASSWORD &&
    isEmailValid &&
    trimmedPass === DEFAULT_BLOG_ADMIN_PASSWORD
  ) {
    const session: BlogAdminSession = {
      email: trimmedEmail.includes("@") ? trimmedEmail : "admin@venusconsultancy.com",
      name: "Venus Blog Administrator",
      role: "Blog Admin",
      loggedInAt: new Date().toISOString(),
    };
    if (typeof window !== "undefined") {
      localStorage.setItem(BLOG_ADMIN_AUTH_KEY, JSON.stringify(session));
    }
    return { success: true, session };
  }

  return {
    success: false,
    error: "Invalid credentials. Please try again.",
  };
}

export function logoutBlogAdmin(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(BLOG_ADMIN_AUTH_KEY);
  }
}
