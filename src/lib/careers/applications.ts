export type ApplicationStatus =
  | "New"
  | "Under Review"
  | "Reviewing"
  | "Shortlisted"
  | "Interview Scheduled"
  | "Interview"
  | "Selected"
  | "Hired"
  | "Rejected";

export interface CareerApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location?: string;
  currentTitle?: string;
  currentCompany?: string;
  experienceYears: string;
  education?: string;
  skills?: string[];
  linkedinUrl?: string;
  portfolioUrl?: string;
  resumeFileName?: string;
  resumeFileSize?: string;
  resumeFileType?: string;
  resumeDataUrl?: string;
  isResumeBuiltLive?: boolean;
  coverLetter?: string;
  consentGiven: boolean;
  submittedAt: string;
  status: ApplicationStatus;
  internalNotes?: string;
  interviewDate?: string;
  interviewTime?: string;
  interviewType?: "Phone" | "Video" | "In-person";
  interviewerName?: string;
  interviewNotes?: string;
  interviewFeedback?: string;
  interviewResult?: "Passed" | "Pending" | "Failed";
}

// Initial mock applications for Phase 5 testing
const localApplications: CareerApplication[] = [
  {
    id: "app-101",
    jobId: "job-1",
    jobTitle: "Senior Full Stack Engineer (React & Node.js)",
    firstName: "Marcus",
    lastName: "Vance",
    email: "marcus.vance@example.com",
    phone: "+1 (416) 555-0144",
    location: "Toronto, ON",
    currentTitle: "Full Stack Developer",
    currentCompany: "Shopify",
    experienceYears: "5-8 years",
    linkedinUrl: "https://linkedin.com/in/marcusvance",
    portfolioUrl: "https://marcusvance.dev",
    resumeFileName: "Marcus_Vance_Resume.pdf",
    resumeFileSize: "1.2 MB",
    resumeFileType: "application/pdf",
    isResumeBuiltLive: false,
    coverLetter: "Excited to apply for the Senior Full Stack role. I have extensive experience scaling React and Node.js applications.",
    consentGiven: true,
    submittedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    status: "Reviewing",
  },
  {
    id: "app-102",
    jobId: "job-2",
    jobTitle: "Executive Recruitment Manager",
    firstName: "Elena",
    lastName: "Rostova",
    email: "elena.r@example.com",
    phone: "+1 (647) 555-0199",
    location: "Toronto, ON",
    currentTitle: "Senior Talent Acquisition Lead",
    currentCompany: "KPMG Canada",
    experienceYears: "8+ years",
    linkedinUrl: "https://linkedin.com/in/elenarostova",
    resumeFileName: "Elena_Rostova_CV.pdf",
    resumeFileSize: "850 KB",
    resumeFileType: "application/pdf",
    isResumeBuiltLive: true,
    coverLetter: "Bringing 8+ years of high-touch executive recruitment experience across financial services and technology.",
    consentGiven: true,
    submittedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    status: "Shortlisted",
  },
  {
    id: "app-103",
    jobId: "job-3",
    jobTitle: "Cloud Infrastructure Architect (AWS / Azure)",
    firstName: "David",
    lastName: "Chen",
    email: "dchen.cloud@example.com",
    phone: "+1 (604) 555-0122",
    location: "Vancouver, BC",
    currentTitle: "Principal DevOps Engineer",
    currentCompany: "AWS Partner Network",
    experienceYears: "8+ years",
    linkedinUrl: "https://linkedin.com/in/dchencloud",
    portfolioUrl: "https://dchen.io",
    resumeFileName: "David_Chen_Architect.pdf",
    resumeFileSize: "2.1 MB",
    resumeFileType: "application/pdf",
    isResumeBuiltLive: false,
    coverLetter: "I specialize in multi-region AWS cloud migrations and automated Terraform deployment pipelines.",
    consentGiven: true,
    submittedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    status: "Interview",
  },
];

const APPLICATIONS_STORAGE_KEY = "venus_submitted_applications";

function loadStoredApplications(): CareerApplication[] {
  if (typeof window === "undefined") return localApplications;
  try {
    const stored = localStorage.getItem(APPLICATIONS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(localApplications));
  } catch (err) {
    console.error("Failed to load applications from storage:", err);
  }
  return localApplications;
}

function saveStoredApplications(apps: CareerApplication[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(apps));
  } catch (err) {
    console.error("Failed to save applications to storage:", err);
  }
}

export async function submitCareerApplication(
  data: Omit<CareerApplication, "id" | "submittedAt" | "status">
): Promise<CareerApplication> {
  const newId = `app_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const submittedAt = new Date().toISOString();

  const application: CareerApplication = {
    ...data,
    id: newId,
    submittedAt,
    status: "New",
  };

  // 1. Attempt backend API database insert
  try {
    const res = await fetch("/api/careers/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      console.warn("API database submission returned status:", res.status);
    }
  } catch (err) {
    console.warn("API database submission warning (using persistent storage fallback):", err);
  }

  // 2. Persist locally to guarantee record immediately reaches Career Admin
  const currentApps = loadStoredApplications();
  const updatedApps = [application, ...currentApps];
  saveStoredApplications(updatedApps);

  return application;
}

export function getSubmittedApplications(): CareerApplication[] {
  return loadStoredApplications();
}

export function updateApplicationStatus(id: string, newStatus: ApplicationStatus): boolean {
  const currentApps = loadStoredApplications();
  const app = currentApps.find((a) => a.id === id);
  if (!app) return false;
  app.status = newStatus;
  saveStoredApplications(currentApps);
  return true;
}

export function updateApplicationNotes(id: string, notes: string): boolean {
  const currentApps = loadStoredApplications();
  const app = currentApps.find((a) => a.id === id);
  if (!app) return false;
  app.internalNotes = notes;
  saveStoredApplications(currentApps);
  return true;
}

export function scheduleInterview(id: string, details: Partial<CareerApplication>): boolean {
  const currentApps = loadStoredApplications();
  const app = currentApps.find((a) => a.id === id);
  if (!app) return false;
  Object.assign(app, details);
  app.status = "Interview Scheduled";
  saveStoredApplications(currentApps);
  return true;
}
