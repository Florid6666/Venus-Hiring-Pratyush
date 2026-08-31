/**
 * VENUS CONSULTANCY — COMPREHENSIVE GROUNDED KNOWLEDGE BASE & INTENT ENGINE
 * 
 * Verified knowledge source and intent classifier for the Venus AI Assistant chatbot.
 * Contains factual, verified information extracted directly from the Venus Consultancy website codebase.
 */

export interface VenusKnowledgeTopic {
  id: string;
  category: "Overview" | "Services" | "Industries" | "Careers" | "Tools" | "Contact" | "FAQ";
  title: string;
  summary: string;
  details: string[];
  route?: string;
  keywords: string[];
}

export type VenusUserIntent =
  | "HUMAN_HANDOFF"
  | "SALARY_BENCHMARK"
  | "SERVICES_EXECUTIVE_SEARCH"
  | "SERVICES_CONTRACT_STAFFING"
  | "SERVICES_STARTUP_HIRING"
  | "SERVICES_TALENT_CONSULTING"
  | "SERVICES_FRACTIONAL_HR"
  | "SERVICES_SOW_PODS"
  | "SERVICES_GENERAL"
  | "INDUSTRIES"
  | "CAREERS_JOBS"
  | "COMPANY_INFO"
  | "FAQ"
  | "OUT_OF_SCOPE";

export const VENUS_KNOWLEDGE_TOPICS: VenusKnowledgeTopic[] = [
  // ── COMPANY OVERVIEW ──
  {
    id: "company-overview",
    category: "Overview",
    title: "About Venus Consultancy (Venus Hiring)",
    summary: "Venus Consultancy is a premier recruitment agency and executive search firm specializing in Canadian, US, and North American talent acquisition, direct placement, contract staffing, and workforce consulting.",
    details: [
      "Venus Consultancy connects high-growth startups, mid-market enterprises, and Fortune 500 companies with top 1% leadership and technical talent.",
      "Track Record & Commitments: 98.4% candidate retention rate, calibrated shortlist presented within 3 to 5 business days, 100% code-verified technical screening, and a written replacement guarantee on permanent placements.",
      "Dual Headquarters: Corporate offices in Toronto, ON, Canada and global delivery hubs in Bangalore, India.",
      "Website: https://www.venushiring.ca"
    ],
    route: "/",
    keywords: ["venus consultancy", "about venus", "venus hiring", "who is venus", "recruitment agency", "toronto recruiting", "headquarters", "bangalore"]
  },

  // ── SERVICES ──
  {
    id: "service-executive-search",
    category: "Services",
    title: "Executive Search & Permanent Direct Placement",
    summary: "Precision direct-hire placement and headhunting targeting C-Suite executives, VPs, and specialized technical leaders across Canada and North America.",
    details: [
      "Target Roles: Chief Executive Officer (CEO), Chief Technology Officer (CTO), Chief Financial Officer (CFO), VP of Engineering, VP of Enterprise Sales, Senior Software Architects, Financial Controllers.",
      "Highlights: Discreet headhunting targeting passive non-active job seekers, 5-day candidate shortlist turnaround, and 90-day full replacement guarantee.",
      "Route: /services/executive-search"
    ],
    route: "/services/executive-search",
    keywords: ["executive search", "c-suite", "ceo", "cto", "cfo", "vp of engineering", "direct placement", "headhunting", "permanent hiring", "direct hire"]
  },
  {
    id: "service-contract-staffing",
    category: "Services",
    title: "Contract Staffing & Staff Augmentation",
    summary: "Flexible staff augmentation providing pre-vetted interim technical experts, software developers, project managers, and operational specialists.",
    details: [
      "Target Roles: Interim Software Engineers, Contract DevOps Specialists, Agile Project Managers, QA Automation Leads, Systems Engineers.",
      "Highlights: Rapid 48-hour onboarding turnaround, transparent hourly rates, zero long-term commitments, and full payroll compliance.",
      "Route: /services/contract-staffing"
    ],
    route: "/services/contract-staffing",
    keywords: ["contract staffing", "staff augmentation", "contractors", "interim developers", "temp hiring", "48 hour staffing"]
  },
  {
    id: "service-startup-hiring",
    category: "Services",
    title: "Startup & Scaleup Hiring Solutions",
    summary: "Dedicated recruitment packages tailored for seed, Series A, and scaleup technology companies needing to build founding teams and scale engineering fast.",
    details: [
      "Target Roles: Founding Software Engineers, Lead AI Researchers, VP of Product, First Marketing Leads, Head of Growth.",
      "Highlights: Flexible equity-aware fee structures, rapid squad building, and startup ecosystem expertise.",
      "Route: /services/startup-hiring"
    ],
    route: "/services/startup-hiring",
    keywords: ["startup hiring", "scaleup", "founding engineer", "series a hiring", "tech startup", "seed hiring"]
  },
  {
    id: "service-talent-consulting",
    category: "Services",
    title: "Strategic Talent & Workforce Consulting",
    summary: "Workforce architecture, compensation benchmarking, employer branding, and organizational design for scaling companies.",
    details: [
      "Offerings: Compensation structure design, technical hiring workflow optimization, employer value proposition (EVP) consulting, and retention audits.",
      "Route: /services/talent-consulting"
    ],
    route: "/services/talent-consulting",
    keywords: ["talent consulting", "workforce planning", "employer branding", "organizational design", "hr strategy"]
  },
  {
    id: "service-fractional-hr",
    category: "Services",
    title: "Fractional HR & HR Advisory Solutions",
    summary: "On-demand Chief Human Resources Officer (CHRO) leadership, Canadian work permit/LMIA compliance, performance management, and HR policy setup.",
    details: [
      "Offerings: Fractional CHRO leadership, LMIA & Express Entry work-permit guidance, HR policy & compliance setup, performance appraisal frameworks.",
      "Route: /services/fractional-hr"
    ],
    route: "/services/fractional-hr",
    keywords: ["fractional hr", "hr advisory", "chro", "lmia", "work permit canada", "express entry", "hr policies"]
  },
  {
    id: "service-sow-project-pods",
    category: "Services",
    title: "SOW Project Pods & Managed Teams",
    summary: "Turnkey managed software engineering and technology pods delivered on a Statement of Work (SOW) deliverables basis with strict SLAs.",
    details: [
      "Offerings: Dedicated engineering pods, full-stack product development squads, cloud migration pods, and data engineering pods.",
      "Route: /services/sow-project-pods"
    ],
    route: "/services/sow-project-pods",
    keywords: ["sow project pods", "managed teams", "software pods", "turnkey development", "statement of work"]
  },

  // ── INDUSTRIES ──
  {
    id: "industry-technology",
    category: "Industries",
    title: "Technology, Software & AI Practice",
    summary: "Specialized recruitment for software engineering, AI/ML, cloud architecture, cybersecurity, and product management across North America.",
    details: [
      "Target Roles: Full-stack Engineers (React, Node.js, Python, Go), AI/LLM Engineers, MLOps, DevOps/Cloud Architects (AWS, GCP), CISO Security Leads.",
      "Route: /industries/technology"
    ],
    route: "/industries/technology",
    keywords: ["technology", "software engineering", "ai hiring", "machine learning", "cloud architects", "devops", "cybersecurity", "tech roles"]
  },
  {
    id: "industry-finance",
    category: "Industries",
    title: "Finance, Accounting & Banking Practice",
    summary: "Placement of CPAs, Financial Controllers, Investment Analysts, Risk Managers, and Fintech Software Engineers.",
    details: [
      "Target Roles: Chief Financial Officer (CFO), Financial Controller (CPA), Senior Accountant, Quantitative Analyst, Risk Lead.",
      "Route: /industries/finance"
    ],
    route: "/industries/finance",
    keywords: ["finance", "accounting", "cpa", "financial controller", "banking", "fintech", "tax", "risk management"]
  },
  {
    id: "industry-manufacturing",
    category: "Industries",
    title: "Advanced Manufacturing & Operations Practice",
    summary: "Recruitment of plant directors, industrial automation engineers, supply chain leads, and quality assurance directors.",
    details: [
      "Target Roles: Plant Operations Director, Automation Engineer, Supply Chain Manager, QA Director, Process Engineer.",
      "Route: /industries/manufacturing"
    ],
    route: "/industries/manufacturing",
    keywords: ["manufacturing", "plant director", "automation engineer", "industrial", "quality assurance", "operations"]
  },
  {
    id: "industry-automotive",
    category: "Industries",
    title: "Automotive, EV & Supply Chain Practice",
    summary: "Recruitment for EV battery technology, autonomous systems, automotive assembly engineering, and international automotive supply chain.",
    details: [
      "Target Roles: EV Battery Systems Engineer, Autonomous Vehicle Software Lead, Automotive Supply Chain Director, Quality Engineer.",
      "Route: /industries/automotive"
    ],
    route: "/industries/automotive",
    keywords: ["automotive", "ev", "electric vehicles", "battery engineer", "supply chain", "autonomous driving"]
  },
  {
    id: "industry-aerospace",
    category: "Industries",
    title: "Aerospace & Defense Engineering Practice",
    summary: "Recruitment of avionics architects, defense compliance leads, systems engineers, and aerospace manufacturing specialists.",
    details: [
      "Target Roles: Lead Avionics Architect, Defense Systems Engineer, Aerospace Project Manager, Propulsion Engineer.",
      "Route: /industries/aerospace"
    ],
    route: "/industries/aerospace",
    keywords: ["aerospace", "defense", "avionics", "systems engineer", "propulsion", "defense compliance"]
  },
  {
    id: "industry-trades",
    category: "Industries",
    title: "Skilled Trades & Field Technical Services Practice",
    summary: "Placement of licensed industrial electricians, millwrights, HVAC field technicians, and trade supervisors across Canada.",
    details: [
      "Target Roles: Licensed Industrial Electrician (309A/442A), Red Seal Millwright, HVAC Technician, Field Service Engineer, Trades Supervisor.",
      "Route: /industries/trades"
    ],
    route: "/industries/trades",
    keywords: ["skilled trades", "millwright", "electrician", "red seal", "hvac", "field technician", "trades"]
  },

  // ── CAREERS & JOBS ──
  {
    id: "careers-jobs",
    category: "Careers",
    title: "Careers & Job Openings",
    summary: "Browse live job openings across Technology, Engineering, Finance, Operations, and Management with Venus Hiring.",
    details: [
      "Candidate Cost: Venus Hiring services are 100% FREE for job seekers. Employers pay all fees.",
      "Active Jobs: Senior Full Stack Engineer, VP of Engineering, Lead AI Scientist, Financial Controller, Plant Operations Director, and more.",
      "Candidate Screening: 30-minute discovery call with a talent partner covering technical skills, career goals, and compensation requirements.",
      "Resume Builder: Venus provides a free ATS-friendly Resume Builder tool at /careers/resume-builder.",
      "Route: /careers"
    ],
    route: "/careers",
    keywords: ["careers", "job openings", "find jobs", "apply for job", "candidate cost", "free for job seekers", "current vacancies", "job list"]
  },
  {
    id: "resume-builder",
    category: "Careers",
    title: "Free ATS-Friendly Resume Builder",
    summary: "Free online tool provided by Venus Hiring to create professional, ATS-aligned resumes.",
    details: [
      "Features: Modern formatting, structured experience sections, ATS optimization guidance.",
      "Route: /careers/resume-builder"
    ],
    route: "/careers/resume-builder",
    keywords: ["resume builder", "ats resume", "free resume tool", "cv maker"]
  },

  // ── TOOLS & CALCULATORS ──
  {
    id: "salary-check-ai",
    category: "Tools",
    title: "Salary Check AI (Compensation Intelligence)",
    summary: "Venus AI-powered single-page compensation benchmarking tool that calculates personalized market salary baselines.",
    details: [
      "Function: Input role title, experience level, current salary, country, city, and skill proficiency to generate instant AI market median salary, target range, and negotiation ask.",
      "Route: /salary-check"
    ],
    route: "/salary-check",
    keywords: ["salary check", "salary check ai", "my market salary", "compensation benchmark", "salary report", "salary intelligence"]
  },
  {
    id: "salary-calculator",
    category: "Tools",
    title: "Salary Calculator (Cost of Living & Tax Comparison)",
    summary: "Comprehensive salary tax, take-home pay, and cost-of-living calculator for Canadian and North American locations.",
    details: [
      "Features: Tax deductions, net income calculation, city cost-of-living comparison.",
      "Route: /salary-calculator"
    ],
    route: "/salary-calculator",
    keywords: ["salary calculator", "take home pay", "tax calculator", "cost of living"]
  },

  // ── CONTACT & BOOKING ──
  {
    id: "contact-info",
    category: "Contact",
    title: "Contact & Booking a Strategy Call",
    summary: "Get in touch with Venus Consultancy recruitment partners or book a hiring consultation.",
    details: [
      "Office Locations:",
      "• Toronto Office: Toronto, ON, Canada",
      "• Bangalore Hub: Bangalore, Karnataka, India",
      "Contact Options: Fill out the online contact form at /contact to request talent or book a call.",
      "Email: info@venushiring.ca",
      "Route: /contact"
    ],
    route: "/contact",
    keywords: ["contact venus", "book a call", "phone number", "email", "office location", "toronto office", "bangalore office", "speak to recruiter"]
  },

  // ── FAQS ──
  {
    id: "faqs",
    category: "FAQ",
    title: "Frequently Asked Questions (FAQ)",
    summary: "Comprehensive FAQ hub answering top questions from employers and job candidates.",
    details: [
      "Employer Turnaround: Shortlist in 3-5 business days for direct-hire roles.",
      "Pre-Screening: 100% technical, behavioral, and reference verification.",
      "Replacement Guarantee: Full replacement guarantee on permanent placements.",
      "Relocation & LMIA: Assistance with Canadian work permits, Express Entry, and LMIA transitions.",
      "Route: /faq"
    ],
    route: "/faq",
    keywords: ["faq", "frequently asked questions", "guarantee", "turnaround time", "relocation", "screening process"]
  }
];

/**
 * Classifies user intent into distinct categories.
 */
export function classifyUserIntent(query: string): VenusUserIntent {
  const q = query.toLowerCase().trim();

  // Human Handoff / Contact Intent
  if (
    q.includes("connect me") ||
    q.includes("talk to someone") ||
    q.includes("speak to a human") ||
    q.includes("talk to a human") ||
    q.includes("talk to your team") ||
    q.includes("connect me to") ||
    q.includes("speak with someone") ||
    q.includes("someone contact me") ||
    q.includes("talk to a recruiter") ||
    q.includes("speak to a recruiter") ||
    q.includes("speak with venus") ||
    q.includes("reach your team") ||
    q.includes("help from a person") ||
    q.includes("human assistance") ||
    q.includes("discuss this with your team") ||
    q.includes("get me in touch") ||
    q.includes("contact me") ||
    q.includes("book a call") ||
    q.includes("call me") ||
    q.includes("phone number")
  ) {
    return "HUMAN_HANDOFF";
  }

  // Salary Benchmark Intent
  if (
    q.includes("my market salary") ||
    q.includes("calculate my salary") ||
    q.includes("how much should i earn") ||
    q.includes("check my salary") ||
    q.includes("salary check")
  ) {
    return "SALARY_BENCHMARK";
  }

  // Specific Services Intents
  if (q.includes("executive search") || q.includes("c-suite") || q.includes("headhunting") || q.includes("vp hiring")) {
    return "SERVICES_EXECUTIVE_SEARCH";
  }
  if (q.includes("contract staffing") || q.includes("staff augmentation") || q.includes("temp hiring") || q.includes("interim")) {
    return "SERVICES_CONTRACT_STAFFING";
  }
  if (q.includes("startup hiring") || q.includes("scaleup") || q.includes("founding engineer")) {
    return "SERVICES_STARTUP_HIRING";
  }
  if (q.includes("talent consulting") || q.includes("workforce planning") || q.includes("employer branding")) {
    return "SERVICES_TALENT_CONSULTING";
  }
  if (q.includes("fractional hr") || q.includes("hr advisory") || q.includes("lmia") || q.includes("work permit")) {
    return "SERVICES_FRACTIONAL_HR";
  }
  if (q.includes("sow project pods") || q.includes("sow pods") || q.includes("managed teams") || q.includes("software pods")) {
    return "SERVICES_SOW_PODS";
  }

  if (q.includes("services") || q.includes("offerings") || q.includes("what do you offer")) {
    return "SERVICES_GENERAL";
  }

  if (q.includes("industry") || q.includes("industries") || q.includes("technology") || q.includes("finance") || q.includes("manufacturing") || q.includes("automotive") || q.includes("aerospace") || q.includes("trades")) {
    return "INDUSTRIES";
  }

  if (q.includes("job") || q.includes("career") || q.includes("opening") || q.includes("vacancy") || q.includes("apply") || q.includes("resume builder")) {
    return "CAREERS_JOBS";
  }

  if (q.includes("who is venus") || q.includes("about venus") || q.includes("where are you") || q.includes("location") || q.includes("office") || q.includes("toronto") || q.includes("bangalore")) {
    return "COMPANY_INFO";
  }

  if (q.includes("faq") || q.includes("guarantee") || q.includes("turnaround") || q.includes("screening")) {
    return "FAQ";
  }

  // Check out of scope (general trivia unrelated to Venus)
  if (
    q.includes("capital of france") ||
    q.includes("weather today") ||
    q.includes("recipe for") ||
    q.includes("who won the") ||
    q.includes("tell me a joke")
  ) {
    return "OUT_OF_SCOPE";
  }

  return "SERVICES_GENERAL";
}

/**
 * Deterministic knowledge search engine.
 * Finds verified Venus knowledge topics matching the user's query.
 */
export function searchVenusKnowledge(query: string): {
  intent: VenusUserIntent;
  matchedTopics: VenusKnowledgeTopic[];
  suggestedLinks: Array<{ label: string; url: string }>;
  directAnswer?: string;
} {
  const intent = classifyUserIntent(query);

  // 1. Human Handoff / Contact Intent Response
  if (intent === "HUMAN_HANDOFF") {
    return {
      intent,
      matchedTopics: [VENUS_KNOWLEDGE_TOPICS.find((t) => t.id === "contact-info")!],
      suggestedLinks: [
        { label: "Contact Venus Team", url: "/contact" },
        { label: "Book a Call", url: "/contact" }
      ],
      directAnswer: "Absolutely! I can connect you directly with the Venus team.\n\nYou can reach our recruitment partners through our Contact Us page or book a consultation call directly."
    };
  }

  // 2. Salary Benchmark Intent Response
  if (intent === "SALARY_BENCHMARK") {
    return {
      intent,
      matchedTopics: [VENUS_KNOWLEDGE_TOPICS.find((t) => t.id === "salary-check-ai")!],
      suggestedLinks: [
        { label: "Open Salary Check AI", url: "/salary-check" },
        { label: "Salary Calculator", url: "/salary-calculator" }
      ],
      directAnswer: "For personalized compensation benchmarking, you can use our **Salary Check AI** tool.\n\nIt analyzes your role, skills, location, and experience level against real-time market data to generate your personalized market baseline."
    };
  }

  // 3. Out of Scope Intent Response
  if (intent === "OUT_OF_SCOPE") {
    return {
      intent,
      matchedTopics: VENUS_KNOWLEDGE_TOPICS.slice(0, 2),
      suggestedLinks: [
        { label: "Explore Services", url: "/services" },
        { label: "Contact Venus", url: "/contact" }
      ],
      directAnswer: "I am the **Venus Consultancy AI Assistant**, designed specifically to help visitors explore Venus's recruitment practices, executive search, career opportunities, and website tools.\n\nHow can I assist you with Venus Consultancy today?"
    };
  }

  // 4. Keyword Grounding Search
  const normalized = query.toLowerCase().trim();
  const scored = VENUS_KNOWLEDGE_TOPICS.map((topic) => {
    let score = 0;
    for (const kw of topic.keywords) {
      if (normalized.includes(kw)) score += 3;
    }
    if (topic.title.toLowerCase().includes(normalized)) score += 5;
    if (topic.summary.toLowerCase().includes(normalized)) score += 2;

    return { topic, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const matchedTopics = scored.filter((s) => s.score > 0).map((s) => s.topic);
  const finalTopics = matchedTopics.length > 0 ? matchedTopics.slice(0, 3) : VENUS_KNOWLEDGE_TOPICS.slice(0, 3);

  const linkMap = new Map<string, string>();
  for (const t of finalTopics) {
    if (t.route && t.title !== "About Venus Consultancy (Venus Hiring)" && t.route !== "/") {
      linkMap.set(t.title, t.route);
    }
  }

  if (normalized.includes("contact") || normalized.includes("book") || normalized.includes("call")) {
    linkMap.set("Contact & Book Call", "/contact");
  }
  if (normalized.includes("job") || normalized.includes("career") || normalized.includes("vacancy")) {
    linkMap.set("View Career Openings", "/careers");
  }
  if (normalized.includes("service") || normalized.includes("practice")) {
    linkMap.set("Explore Our Services", "/services");
  }

  const suggestedLinks = Array.from(linkMap.entries())
    .filter(([label, url]) => label !== "About Venus Consultancy (Venus Hiring)" && url !== "/")
    .slice(0, 3)
    .map(([label, url]) => ({
      label,
      url
    }));

  return { intent, matchedTopics: finalTopics, suggestedLinks };
}
