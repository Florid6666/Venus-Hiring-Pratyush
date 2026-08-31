export interface JobItem {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  employmentType: string;
  experienceLevel: string;
  salaryRange?: string;
  description: string;
  postedDate: string;
  aboutRole?: string;
  responsibilities?: string[];
  qualifications?: string[];
  niceToHave?: string[];
  benefits?: string[];
}

export const MOCK_JOBS: JobItem[] = [
  {
    id: "job-1",
    title: "Senior Full Stack Engineer (React & Node.js)",
    slug: "senior-full-stack-engineer",
    department: "Technology",
    location: "Toronto, ON (Hybrid)",
    employmentType: "Full-Time",
    experienceLevel: "Senior",
    salaryRange: "$135,000 - $165,000 CAD",
    description: "Lead the development of scalable enterprise web applications, collaborating with cross-functional product and design teams across North America.",
    postedDate: "2 days ago",
    aboutRole: "As a Senior Full Stack Engineer at Venus Hiring, you will architect and build modern cloud-native web applications that connect top talent with industry-leading enterprises. You will champion clean code, performance optimization, and robust system design while mentoring junior developers.",
    responsibilities: [
      "Architect and build high-performance React and Node.js applications with TanStack & TypeScript.",
      "Design and maintain secure RESTful APIs, PostgreSQL databases, and microservices.",
      "Collaborate closely with product managers, recruiters, and UI/UX designers to translate requirements into elegant technical solutions.",
      "Implement automated testing, CI/CD pipelines, and cloud infrastructure monitoring.",
      "Conduct code reviews, mentor engineering peers, and enforce architectural best practices."
    ],
    qualifications: [
      "5+ years of software engineering experience with modern JavaScript/TypeScript frameworks (React, Node.js, Next.js or Vite).",
      "Strong database experience with PostgreSQL or MySQL, including complex queries and ORMs.",
      "Demonstrated experience building responsive, accessible, and high-performance Web UIs.",
      "Solid understanding of REST API design, HTTP protocols, state management, and web security.",
      "Bachelor's degree in Computer Science, Software Engineering, or equivalent practical experience."
    ],
    niceToHave: [
      "Experience with TanStack Router, TanStack Query, or Nitro server runtime.",
      "Familiarity with Tailwind CSS v4 and micro-frontends.",
      "Knowledge of Docker, AWS, or GCP deployments."
    ],
    benefits: [
      "Competitive base salary with annual performance bonus.",
      "Comprehensive health, dental, and vision benefit plan starting day one.",
      "Flexible hybrid work environment (2 days in Toronto office, 3 days remote).",
      "$2,000 annual professional development & learning stipend.",
      "4 weeks paid vacation + extra company wellness days."
    ]
  },
  {
    id: "job-2",
    title: "Executive Recruitment Manager",
    slug: "executive-recruitment-manager",
    department: "Executive & HR",
    location: "Toronto, ON",
    employmentType: "Full-Time",
    experienceLevel: "Executive",
    salaryRange: "$120,000 - $150,000 CAD + Bonus",
    description: "Drive end-to-end executive search and strategic talent placement for enterprise clients across North America.",
    postedDate: "3 days ago",
    aboutRole: "The Executive Recruitment Manager will lead high-touch executive search mandates across C-suite, VP, and Director-level positions. You will build long-term relationships with enterprise clients, lead market research, and manage candidate engagement with utmost professionalism.",
    responsibilities: [
      "Lead end-to-end executive search engagements for key corporate partners across North America.",
      "Develop deep market intelligence and executive talent pipelines across technology, finance, and operations.",
      "Advise client executive teams on talent strategy, compensation benchmarks, and organizational scaling.",
      "Manage candidate lifecycle from initial confidential outreach to final negotiation and onboarding.",
      "Represent Venus Hiring at industry conferences and corporate networking forums."
    ],
    qualifications: [
      "6+ years of executive search, agency recruitment, or corporate talent acquisition experience.",
      "Proven track record of successfully placing VP and C-level executives in technology or professional services.",
      "Exceptional verbal and written communication, negotiation, and executive relationship management skills.",
      "Deep understanding of the Canadian and US executive employment landscape.",
      "Bachelor's degree in Business, Human Resources, or related field."
    ],
    niceToHave: [
      "Existing network of executive contacts in Canadian technology or finance sectors.",
      "Bilingual (English/French) proficiency."
    ],
    benefits: [
      "Uncapped performance commission and quarterly executive bonus incentives.",
      "Full health, dental, and executive wellness coverage.",
      "Downtown Toronto office access with premium amenities.",
      "Generous paid time off and sabbatical opportunities."
    ]
  },
  {
    id: "job-3",
    title: "Cloud Infrastructure Architect (AWS / Azure)",
    slug: "cloud-infrastructure-architect",
    department: "Technology",
    location: "Remote (Canada)",
    employmentType: "Full-Time",
    experienceLevel: "Senior",
    salaryRange: "$150,000 - $185,000 CAD",
    description: "Design and implement secure, high-availability cloud architecture and automated deployment pipelines for client infrastructure.",
    postedDate: "5 days ago",
    aboutRole: "Join our Cloud Solutions pod as a Senior Architect driving enterprise cloud transformations. You will design, build, and optimize multi-region AWS/Azure infrastructure for tier-1 enterprise clients.",
    responsibilities: [
      "Design multi-cloud infrastructure solutions ensuring enterprise-grade security, scalability, and cost efficiency.",
      "Implement Infrastructure as Code (IaC) using Terraform, Pulumi, or CloudFormation.",
      "Architect CI/CD pipelines, Kubernetes container orchestration, and zero-downtime deployment strategies.",
      "Perform cloud security audits, compliance evaluations, and disaster recovery planning.",
      "Provide technical leadership to client engineering teams during migration phases."
    ],
    qualifications: [
      "7+ years of experience in Cloud Engineering, DevOps, or Infrastructure Architecture.",
      "AWS Certified Solutions Architect Professional or Azure Solutions Architect Expert certification.",
      "Expert knowledge of Kubernetes, Docker, Terraform, and GitOps workflows.",
      "Demonstrated experience designing high-availability systems with 99.99% uptime SLAs."
    ],
    niceToHave: [
      "Experience with cloud cost optimization (FinOps).",
      "Background in financial services or healthcare cloud compliance (SOC2, HIPAA)."
    ],
    benefits: [
      "100% remote work flexibility from anywhere in Canada.",
      "Home office setup allowance ($1,500 CAD).",
      "Full medical, dental, and vision insurance.",
      "Uncapped learning and certification reimbursement."
    ]
  },
  {
    id: "job-4",
    title: "Financial Planning & Analysis Lead",
    slug: "financial-planning-analysis-lead",
    department: "Finance & Operations",
    location: "Vancouver, BC",
    employmentType: "Full-Time",
    experienceLevel: "Mid-Level",
    salaryRange: "$110,000 - $135,000 CAD",
    description: "Manage financial modeling, annual budgeting, and strategic corporate performance forecasting for workforce operations.",
    postedDate: "1 week ago",
    aboutRole: "As the FP&A Lead at Venus Hiring, you will serve as a key strategic finance partner to senior leadership, providing data-driven financial analysis, forecasting models, and operational metrics.",
    responsibilities: [
      "Own the annual financial budgeting, monthly rolling forecasts, and strategic 3-year financial models.",
      "Prepare monthly executive reporting packages, variance analysis, and key performance metric dashboards.",
      "Partner with business unit heads to analyze unit economics, pricing strategies, and head-count planning.",
      "Automate reporting processes using advanced BI tools and ERP integrations."
    ],
    qualifications: [
      "4+ years of FP&A, corporate finance, or financial consulting experience.",
      "Strong financial modeling skills (Excel, SQL, PowerBI/Tableau).",
      "CPA, CFA, or MBA designation is strongly preferred.",
      "Ability to communicate complex financial insights to non-financial executives."
    ],
    niceToHave: [
      "Experience in professional services, staffing, or SaaS business models."
    ],
    benefits: [
      "Competitive salary + annual performance bonus.",
      "Hybrid flexible work arrangements in Vancouver.",
      "Health & wellness spending account."
    ]
  },
  {
    id: "job-5",
    title: "Enterprise Talent Acquisition Specialist",
    slug: "enterprise-talent-acquisition-specialist",
    department: "Executive & HR",
    location: "Montreal, QC (Hybrid)",
    employmentType: "Full-Time",
    experienceLevel: "Mid-Level",
    salaryRange: "$85,000 - $105,000 CAD",
    description: "Source, screen, and match high-performing professionals with top-tier technology and healthcare partners.",
    postedDate: "1 week ago",
    aboutRole: "Venus Hiring is expanding its Montreal team! We are looking for an Enterprise Talent Acquisition Specialist to drive recruitment campaigns for specialized technical and healthcare clients.",
    responsibilities: [
      "Manage full-lifecycle recruitment for active client requisitions in Quebec and Eastern Canada.",
      "Utilize advanced sourcing methods, Boolean search, and professional networks to engage passive candidates.",
      "Conduct structured behavioral interviews and present qualified shortlists to hiring managers.",
      "Ensure an exceptional candidate experience throughout all recruitment stages."
    ],
    qualifications: [
      "3+ years of full-cycle recruitment experience in agency or corporate environments.",
      "Bilingualism in English and French (written and spoken) is required.",
      "Proven capability to manage 10-15 active requisitions simultaneously.",
      "Strong client-facing skills and interview evaluation techniques."
    ],
    niceToHave: [
      "Experience sourcing in tech or life sciences industries."
    ],
    benefits: [
      "Base salary plus competitive commission structure.",
      "Hybrid work setting in central Montreal.",
      "Full health and lifestyle benefit program."
    ]
  },
  {
    id: "job-6",
    title: "Senior Product Marketing Manager",
    slug: "senior-product-marketing-manager",
    department: "Sales & Marketing",
    location: "Remote (US)",
    employmentType: "Contract",
    experienceLevel: "Senior",
    salaryRange: "$90 - $110 / hr USD",
    description: "Define product messaging, competitive positioning, and go-to-market strategies for corporate recruitment solutions.",
    postedDate: "2 weeks ago",
    aboutRole: "We are seeking a seasoned Product Marketing Manager for a 6-month contract engagement to develop high-impact product positioning, client case studies, and sales enablement assets.",
    responsibilities: [
      "Develop core messaging, value propositions, and positioning frameworks for Venus recruitment solutions.",
      "Create high-converting sales collateral, whitepapers, client pitch decks, and case studies.",
      "Analyze market trends, competitor offerings, and customer buyer personas to inform GTM strategies."
    ],
    qualifications: [
      "6+ years of B2B SaaS or professional services product marketing experience.",
      "Portfolio of impactful sales enablement content and GTM campaign executions.",
      "Strong analytical mindset combined with creative storytelling abilities."
    ],
    niceToHave: [
      "Experience in HR tech or recruitment marketplace marketing."
    ],
    benefits: [
      "Flexible contract arrangement with competitive USD hourly rate.",
      "Fully remote position based in the US."
    ]
  }
];
