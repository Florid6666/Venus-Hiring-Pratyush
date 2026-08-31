import { MOCK_JOBS, type JobItem } from "@/components/careers/mockJobs";

export interface AdminJobItem extends JobItem {
  status: "Draft" | "Published" | "Paused" | "Closed";
  category?: string;
  workMode?: "Remote" | "Hybrid" | "On-site";
  currency?: string;
  minExperience?: string;
  maxExperience?: string;
  openingsCount?: number;
  hiringManager?: string;
  applicationDeadline?: string;
  preferredQualifications?: string[];
  aboutCompany?: string;
  createdAt?: string;
}

// In-memory store initialized with MOCK_JOBS
let jobsStore: AdminJobItem[] = MOCK_JOBS.map((j) => ({
  ...j,
  status: "Published",
  createdAt: new Date().toISOString(),
}));

export async function fetchAllAdminJobs(): Promise<AdminJobItem[]> {
  return [...jobsStore];
}

export async function createAdminJob(jobData: Omit<AdminJobItem, "id" | "postedDate">): Promise<AdminJobItem> {
  const newJob: AdminJobItem = {
    ...jobData,
    id: `job_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    postedDate: "Just now",
    createdAt: new Date().toISOString(),
  };

  jobsStore.unshift(newJob);
  return newJob;
}

export async function updateAdminJob(id: string, updatedFields: Partial<AdminJobItem>): Promise<AdminJobItem | null> {
  const idx = jobsStore.findIndex((j) => j.id === id);
  if (idx === -1) return null;

  jobsStore[idx] = {
    ...jobsStore[idx],
    ...updatedFields,
  };

  return jobsStore[idx];
}

export async function deleteAdminJob(id: string): Promise<boolean> {
  const initialLength = jobsStore.length;
  jobsStore = jobsStore.filter((j) => j.id !== id);
  return jobsStore.length < initialLength;
}

export async function duplicateAdminJob(id: string): Promise<AdminJobItem | null> {
  const existing = jobsStore.find((j) => j.id === id);
  if (!existing) return null;

  const duplicated: AdminJobItem = {
    ...existing,
    id: `job_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    title: `${existing.title} (Copy)`,
    slug: `${existing.slug}-copy-${Date.now().toString(36)}`,
    status: "Draft",
    postedDate: "Just now",
    createdAt: new Date().toISOString(),
  };

  jobsStore.unshift(duplicated);
  return duplicated;
}
