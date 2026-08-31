export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: string;
  endYear: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  jobTitle: string;
  duration: string;
  description: string;
}

export interface ProjectEntry {
  id: string;
  name: string;
  description: string;
  technologies: string;
}

export interface CertificationEntry {
  id: string;
  name: string;
  organization: string;
  year: string;
}

export type ResumeTemplate = "executive" | "modern";

export interface ResumeData {
  // Personal Info
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolio: string;

  // Professional Summary
  summary: string;

  // Arrays
  education: EducationEntry[];
  experience: ExperienceEntry[];
  skills: string[];
  projects: ProjectEntry[];
  certifications: CertificationEntry[];
  languages: string[];

  // Settings
  template: ResumeTemplate;
}

export const INITIAL_RESUME_DATA: ResumeData = {
  fullName: "Alex Morgan",
  email: "alex.morgan@example.com",
  phone: "+1 (416) 555-0188",
  location: "Toronto, ON",
  linkedin: "https://linkedin.com/in/alexmorgan",
  portfolio: "https://alexmorgan.dev",
  summary:
    "Results-driven Senior Software Engineer with over 6 years of experience architecting high-availability enterprise cloud platforms and scalable React applications. Adept at leading cross-functional teams and implementing modern DevOps workflows.",
  education: [
    {
      id: "edu-1",
      institution: "University of Toronto",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science & Engineering",
      startYear: "2015",
      endYear: "2019",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "Apex Tech Solutions",
      jobTitle: "Senior Full Stack Engineer",
      duration: "2021 - Present",
      description:
        "Architected scalable microservices handling 5M+ daily API calls. Led a pod of 5 engineers in rebuilding core recruitment workflow engine using React, TypeScript, and Node.js.",
    },
    {
      id: "exp-2",
      company: "Vanguard Systems",
      jobTitle: "Software Developer",
      duration: "2019 - 2021",
      description:
        "Developed key user-facing dashboard features, optimized PostgreSQL database queries reducing API latency by 35%, and implemented CI/CD deployment pipelines.",
    },
  ],
  skills: [
    "TypeScript",
    "React",
    "Node.js",
    "PostgreSQL",
    "Next.js",
    "Tailwind CSS",
    "Docker",
    "AWS",
    "GraphQL",
  ],
  projects: [
    {
      id: "proj-1",
      name: "Enterprise Talent Matcher",
      description:
        "Open-source automated candidate-job matching algorithm using vector embeddings and semantic search.",
      technologies: "React, Node.js, Python, PostgreSQL",
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "AWS Certified Solutions Architect",
      organization: "Amazon Web Services",
      year: "2022",
    },
  ],
  languages: ["English (Native)", "French (Professional)"],
  template: "executive",
};
