export interface ServiceDeliverable {
  number: string;
  title: string;
  desc: string;
  microDetail?: string;
  iconName: string;
}

export interface ServiceUseCase {
  title: string;
  desc: string;
  tag: string;
}

export interface ServiceProcessStep {
  step: string;
  shortTitle: string;
  title: string;
  desc: string;
  detail?: string;
}

export interface MarketInsight {
  title: string;
  desc: string;
}

export interface SocialProofCase {
  quote: string;
  author: string;
  role: string;
  companyType: string;
  metricLabel: string;
  metricValue: string;
}

export interface SpecializedOffering {
  id: string;
  title: string;
  badge?: string;
  desc: string;
  iconName: string;
  topRoles: string[];
  ctaText?: string;
}

export interface ServiceDetail {
  slug: string;
  title: string;
  eyebrow: string;
  heroHeadline: string;
  heroValueProp: string;
  heroImage: string;
  stats: Array<{ label: string; value: string }>;
  introStatement: string;
  introParagraphs: string[];
  introProofIndicators: string[];
  specializedOfferings: SpecializedOffering[];
  deliverables: ServiceDeliverable[];
  whoWeHelp: ServiceUseCase[];
  targetRoles: string[];
  process: ServiceProcessStep[];
  whyVenus: {
    statement: string;
    points: Array<{ title: string; desc: string }>;
  };
  marketIntelligence: MarketInsight[];
  socialProof?: SocialProofCase;
  relatedServicesSlugs: string[];
  faqCategory: "Employers" | "Recruitment Process" | "Services" | "General";
  ctaHeadline: string;
  ctaSubtext: string;
  metaTitle: string;
  metaDescription: string;
}

export const SERVICES_DATA: Record<string, ServiceDetail> = {
  "executive-search": {
    slug: "executive-search",
    title: "Executive Search & Permanent Direct Placement",
    eyebrow: "RECRUITMENT SOLUTIONS",
    heroHeadline: "The Right Leadership. For the Work That Matters.",
    heroValueProp:
      "Precision direct-hire placement and executive search connecting Canadian and US enterprises with calibrated C-Suite leaders, VPs, and specialized technical experts.",
    heroImage:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&h=900&fit=crop&auto=format",
    stats: [
      { label: "Retention Guarantee", value: "98.4% Retention" },
      { label: "Shortlist Velocity", value: "5 Business Days" },
      { label: "Market Reach", value: "Canada & US Midwest" },
    ],
    introStatement:
      "Hiring isn't just about filling a vacancy. It's about finding the leader who moves your business forward.",
    introParagraphs: [
      "Finding high-caliber permanent talent and executive leaders requires more than keyword matching. Venus Hiring combines discreet headhunting, domain-specific technical screening, and cultural alignment mapping across Canada and North America.",
      "We partner directly with founders, board directors, and HR executives to identify passive leaders who elevate your organization's trajectory and maintain long-term tenure.",
    ],
    introProofIndicators: [
      "Calibrated shortlist of pre-vetted candidates within 5 business days",
      "Discreet headhunting targeting non-active job seekers",
      "Multi-stage technical, behavioral, and reference verification",
      "Full replacement guarantee on all permanent placements",
    ],
    specializedOfferings: [
      {
        id: "exec-c-suite",
        title: "C-Suite & Executive Board Search",
        badge: "BOARD LEVEL",
        desc: "Confidential executive search targeting CEOs, CTOs, CFOs, and Board Directors who drive strategic valuation and vision.",
        iconName: "Award",
        topRoles: [
          "Chief Executive Officer (CEO)",
          "Chief Technology Officer (CTO)",
          "Chief Financial Officer (CFO)",
          "Chief Operating Officer (COO)",
          "Board Director",
        ],
        ctaText: "Consult Executive Search Team",
      },
      {
        id: "exec-vps",
        title: "Senior Vice President & Functional Leads",
        badge: "FUNCTIONAL LEADS",
        desc: "Headhunting seasoned VPs of Engineering, Sales, Supply Chain, and HR to lead mission-critical business units.",
        iconName: "Users",
        topRoles: [
          "VP of Engineering",
          "VP of Enterprise Sales",
          "VP of Supply Chain & Logistics",
          "VP of Human Resources",
          "VP of Product Management",
        ],
        ctaText: "Explore VP Candidates",
      },
      {
        id: "exec-direct-hire",
        title: "Specialized Technical Direct Placement",
        badge: "TECHNICAL PLACEMENT",
        desc: "Direct-hire placement of hard-to-find Senior Software Architects, Financial Controllers, Plant Directors, and Principal Engineers.",
        iconName: "Code",
        topRoles: [
          "Senior Software Architect",
          "Financial Controller (CPA)",
          "Plant Operations Director",
          "Principal DevOps Architect",
          "Lead Avionics Architect",
        ],
        ctaText: "Find Technical Leaders",
      },
      {
        id: "exec-stealth",
        title: "Confidential & Stealth Executive Search",
        badge: "CONFIDENTIAL",
        desc: "Discreet talent mapping and headhunting for sensitive leadership transitions, stealth launch initiatives, or internal restructuring.",
        iconName: "ShieldCheck",
        topRoles: [
          "Confidential Business Unit Head",
          "Interim Division President",
          "Stealth Expansion Director",
          "Managing Director",
        ],
        ctaText: "Request Confidential Brief",
      },
    ],
    deliverables: [
      {
        number: "01",
        title: "C-Suite & VP Retained Search",
        desc: "Discreet retained and contingency executive search for CTOs, VPs of Engineering, CFOs, Plant Directors, and Chief Commercial Officers.",
        microDetail: "Confidential candidate outreach & board-level briefs",
        iconName: "Award",
      },
      {
        number: "02",
        title: "Specialized Technical Direct Placement",
        desc: "Direct hire placement of Senior Software Architects, DevOps Engineers, CPAs, Financial Controllers, and Operations Leaders.",
        microDetail: "Validated hard skills & industry domain depth",
        iconName: "Code",
      },
      {
        number: "03",
        title: "Executive Background Audits",
        desc: "Thorough 360-degree reference checks, employment history verification, and leadership style compatibility assessments.",
        microDetail: "Verified past performance & peer reviews",
        iconName: "ShieldCheck",
      },
      {
        number: "04",
        title: "Market Compensation Structuring",
        desc: "Market rate salary benchmarking, equity grant advisory, and competitive offer package structuring to secure top candidates.",
        microDetail: "Regional compensation data & incentive bands",
        iconName: "TrendingUp",
      },
      {
        number: "05",
        title: "Candidate Offer Management",
        desc: "End-to-end offer presentation, counter-offer coaching, resignation support, and formal offer closing.",
        microDetail: "High offer acceptance conversion rates",
        iconName: "CheckCircle",
      },
      {
        number: "06",
        title: "90-Day Post-Placement Guarantee",
        desc: "Structured onboarding milestones and 30, 60, 90-day check-ins backed by our written replacement policy.",
        microDetail: "Written placement guarantee protection",
        iconName: "UserCheck",
      },
    ],
    whoWeHelp: [
      {
        title: "Critical Executive Vacancies",
        desc: "Companies needing confidential, rapid replacement for C-level or VP roles without market disruption.",
        tag: "LEADERSHIP TRANSITION",
      },
      {
        title: "Hard-to-Fill Technical Roles",
        desc: "Organizations seeking niche engineering, finance, or operations leaders unavailable on public job boards.",
        tag: "SPECIALIZED TALENT",
      },
      {
        title: "Canada & US Expansion",
        desc: "US companies scaling technical teams in Canada or Canadian firms building US market leadership.",
        tag: "CROSS-BORDER SCALING",
      },
      {
        title: "Strategic Executive Hires",
        desc: "Discreet talent mapping for new division rollouts, plant operations, or stealth startup launches.",
        tag: "CONFIDENTIAL SEARCH",
      },
    ],
    targetRoles: [
      "Chief Technology Officer (CTO)",
      "VP of Engineering & Product",
      "Financial Controller & CPA",
      "Plant & Operations Director",
      "VP of Supply Chain & Logistics",
      "Senior Cloud / DevOps Architect",
      "Chief Commercial Officer (CCO)",
      "Director of Software Development",
    ],
    process: [
      {
        step: "01",
        shortTitle: "Understand",
        title: "Role Calibration & Discovery",
        desc: "We define core competencies, culture parameters, performance metrics, and search timelines during a deep discovery session.",
        detail: "Aligning hiring managers on role success criteria",
      },
      {
        step: "02",
        shortTitle: "Search",
        title: "Talent Mapping & Sourcing",
        desc: "Our headhunters research competitor landscapes, mapping target candidates and engaging passive leaders directly.",
        detail: "Active outreach to non-job-seeking top 5% leaders",
      },
      {
        step: "03",
        shortTitle: "Screen",
        title: "Multi-Stage Vetting",
        desc: "Candidates complete technical assessments, behavioral interviews, and reference verifications before client introduction.",
        detail: "Rigorous domain depth & leadership evaluation",
      },
      {
        step: "04",
        shortTitle: "Present",
        title: "Shortlist Presentation",
        desc: "You receive 3 to 5 fully vetted candidate dossiers with executive summary profiles and interview briefs.",
        detail: "Calibrated candidates delivered in 5 business days",
      },
      {
        step: "05",
        shortTitle: "Place",
        title: "Offer & Onboarding Support",
        desc: "We manage offer negotiations, resignation guidance, and 90-day post-placement integration check-ins.",
        detail: "Backed by our written replacement policy",
      },
    ],
    whyVenus: {
      statement:
        "We combine deep Canadian market fluency with active headhunting precision to deliver leaders who stay and succeed.",
      points: [
        {
          title: "Dedicated Named Consultant",
          desc: "You work directly with a senior recruitment partner specializing exclusively in your sector.",
        },
        {
          title: "Cross-Border Market Access",
          desc: "Seamless talent sourcing spanning Toronto, Vancouver, Montreal, Michigan, Illinois, and New York.",
        },
        {
          title: "98.4% Long-Term Retention",
          desc: "Our calibrated screening ensures leaders integrate seamlessly and drive sustained business growth.",
        },
      ],
    },
    marketIntelligence: [
      {
        title: "Canadian & US Compensation Data",
        desc: "Access real-time salary benchmark reports for senior technology, finance, and industrial executive roles.",
      },
      {
        title: "Passive Talent Availability Maps",
        desc: "Understand talent density and active vs. passive candidate ratios across Canadian tech corridors.",
      },
      {
        title: "Counter-Offer & Retention Dynamics",
        desc: "Gain strategic insights on candidate retention triggers, equity expectations, and remote work preferences.",
      },
    ],
    socialProof: {
      quote:
        "Venus Hiring placed our VP of Engineering within 12 business days. The depth of technical screening saved our executive team dozens of interview hours.",
      author: "Marcus Vance",
      role: "Chief Executive Officer",
      companyType: "Enterprise Software Scale-Up",
      metricLabel: "Search Velocity",
      metricValue: "12 Days to Hired",
    },
    relatedServicesSlugs: ["contract-staffing", "startup-hiring", "sow-project-pods"],
    faqCategory: "Employers",
    ctaHeadline: "Looking to Hire Executive Talent?",
    ctaSubtext:
      "Connect with our senior recruitment partners to receive a calibrated candidate shortlist.",
    metaTitle: "Executive Search & Direct Placement | Venus Hiring",
    metaDescription:
      "Precision executive search and direct-hire recruitment services in Canada & US. Sourcing C-Suite leaders, VPs, and technical specialists.",
  },

  "direct-hire-staffing": {
    slug: "direct-hire-staffing",
    title: "Direct Hire Staffing & Permanent Placement Solutions",
    eyebrow: "PERMANENT TALENT SOLUTIONS",
    heroHeadline: "Permanent Talent Sourced with Precision & Speed.",
    heroValueProp:
      "End-to-end direct-hire staffing connecting enterprises across Canada and the US with pre-screened full-time specialists, senior managers, and technical domain experts.",
    heroImage:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&h=900&fit=crop&auto=format",
    stats: [
      { label: "Placement Retention", value: "97.8% Retention" },
      { label: "Average Time-to-Fill", value: "3 to 5 Days" },
      { label: "Candidate Guarantee", value: "100% Replacement" },
    ],
    introStatement:
      "Building a high-performing permanent team requires matching deep domain expertise with long-term organizational culture.",
    introParagraphs: [
      "Our direct-hire staffing framework combines passive headhunting, rigorous technical vetting, and cultural compatibility assessments to connect employers with dedicated full-time talent.",
      "From specialized software engineers and financial analysts to plant managers and supply chain directors, Venus Hiring eliminates hiring risk and accelerates your team's growth.",
    ],
    introProofIndicators: [
      "Calibrated 3-to-5 candidate shortlist within 5 business days",
      "Comprehensive multi-stage technical and behavioral evaluation",
      "Full 90-to-180 day replacement guarantee on all direct hires",
      "Transparent flat-rate fee structure with zero hidden costs",
    ],
    specializedOfferings: [
      {
        id: "dh-technical",
        title: "Technical & Engineering Direct Placement",
        badge: "HIGH DEMAND",
        desc: "Direct placement of full-stack developers, cloud architects, DevOps engineers, and technical leads.",
        iconName: "Code",
        topRoles: [
          "Senior Full-Stack Engineer",
          "Cloud Infrastructure Architect",
          "Lead DevOps Engineer",
          "Cybersecurity Specialist",
          "AI/ML Engineer",
        ],
        ctaText: "Source Technical Talent",
      },
      {
        id: "dh-finance",
        title: "Finance & Accounting Permanent Search",
        badge: "FINANCE LEADS",
        desc: "Direct hire recruitment for CPAs, Senior Accountants, Financial Analysts, and Controllers.",
        iconName: "TrendingUp",
        topRoles: [
          "Senior Financial Analyst",
          "Accounting Manager",
          "CPAs & Controllers",
          "Tax & Audit Specialist",
          "Treasury Director",
        ],
        ctaText: "Explore Finance Candidates",
      },
      {
        id: "dh-ops",
        title: "Operations & Supply Chain Direct Hire",
        badge: "OPERATIONS",
        desc: "Full-time placement of Plant Managers, Logistics Directors, Supply Chain Managers, and EHS Leads.",
        iconName: "Briefcase",
        topRoles: [
          "Plant Operations Manager",
          "Supply Chain Lead",
          "Logistics Director",
          "Quality Assurance Manager",
          "EHS Compliance Specialist",
        ],
        ctaText: "Find Operations Leaders",
      },
      {
        id: "dh-corporate",
        title: "Corporate, Sales & HR Direct Placement",
        badge: "CORPORATE",
        desc: "Direct recruitment of Account Executives, HR Business Partners, Marketing Directors, and Operations Leads.",
        iconName: "Users",
        topRoles: [
          "Enterprise Account Executive",
          "HR Business Partner",
          "Director of Marketing",
          "Corporate Recruiter",
          "Legal Counsel",
        ],
        ctaText: "Consult Corporate Recruiter",
      },
    ],
    deliverables: [
      {
        number: "01",
        title: "Targeted Passive Headhunting",
        desc: "Direct outreach to non-active candidates currently working in top-tier organizations across North America.",
        microDetail: "Exclusive passive candidate network",
        iconName: "Users",
      },
      {
        number: "02",
        title: "Domain Technical Vetting",
        desc: "Custom technical challenges, code reviews, and scenario-based assessments by industry domain experts.",
        microDetail: "Rigorous hard-skill validation",
        iconName: "Code",
      },
      {
        number: "03",
        title: "Cultural Alignment Assessment",
        desc: "In-depth personality and workplace value compatibility mapping to ensure multi-year employee tenure.",
        microDetail: "Proven retention framework",
        iconName: "Award",
      },
      {
        number: "04",
        title: "Compensation Benchmarking",
        desc: "Regional salary data, bonus structuring, and offer positioning to convert top talent seamlessly.",
        microDetail: "Data-driven offer structuring",
        iconName: "TrendingUp",
      },
      {
        number: "05",
        title: "Onboarding & Placement Guarantee",
        desc: "Post-placement check-ins and full replacement guarantee coverage throughout the probation period.",
        microDetail: "100% Replacement protection",
        iconName: "ShieldCheck",
      },
    ],
    whoWeHelp: [
      {
        title: "Critical Technical Vacancies",
        desc: "Companies needing rapid, specialized full-time engineering or tech talent without internal recruitment overhead.",
        tag: "ENGINEERING & TECH",
      },
      {
        title: "Hard-to-Fill Specialized Roles",
        desc: "Organizations seeking niche finance, legal, or operations leaders unavailable on public job boards.",
        tag: "SPECIALIZED TALENT",
      },
      {
        title: "Canada & US Market Expansion",
        desc: "US companies scaling technical teams in Canada or Canadian firms building US market leadership.",
        tag: "CROSS-BORDER SCALING",
      },
      {
        title: "Confidential Permanent Search",
        desc: "Discreet talent mapping for new division rollouts, plant operations, or key leadership replacements.",
        tag: "CONFIDENTIAL SEARCH",
      },
    ],
    targetRoles: [
      "Senior Software Engineers",
      "Cloud & DevOps Architects",
      "Financial Controllers (CPAs)",
      "Plant Operations Directors",
      "Supply Chain Managers",
      "Enterprise Sales Directors",
      "HR Business Partners",
      "Data Engineers & AI Leads",
    ],
    process: [
      {
        step: "01",
        shortTitle: "Calibration Brief",
        title: "Requirements & Profile Calibration",
        desc: "Detailed intake session to map technical competencies, compensation bands, and cultural expectations.",
        detail: "Domain requirements & scorecard definition",
      },
      {
        step: "02",
        shortTitle: "Headhunting",
        title: "Targeted Sourcing & Outreach",
        desc: "Direct outreach to top passive talent currently employed at industry leaders across Canada and the US.",
        detail: "Confidential candidate engagement",
      },
      {
        step: "03",
        shortTitle: "Multi-Stage Vetting",
        title: "Technical & Cultural Evaluation",
        desc: "Domain screening, reference audits, and cultural alignment interviews conducted by senior recruiters.",
        detail: "Comprehensive background & skills validation",
      },
      {
        step: "04",
        shortTitle: "Shortlist Delivery",
        title: "Calibrated Candidate Presentation",
        desc: "Delivery of 3 to 5 fully vetted candidates with detailed interview briefs and assessment scorecards.",
        detail: "5 business day turnaround",
      },
      {
        step: "05",
        shortTitle: "Offer & Onboarding",
        title: "Offer Negotiation & Guarantee",
        desc: "Closing candidate offer, managing counter-offers, and supporting smooth transition into your organization.",
        detail: "Full replacement guarantee backing",
      },
    ],
    whyVenus: {
      statement: "Why Enterprise Employers Trust Venus for Direct Hire Staffing",
      points: [
        {
          title: "97.8% 1-Year Retention Rate",
          desc: "Our deep technical vetting and culture-fit assessments guarantee long-term employee commitment.",
        },
        {
          title: "5 Business Day Shortlist",
          desc: "Rapid delivery of calibrated candidates minimizes costly role vacancies.",
        },
        {
          title: "100% Replacement Guarantee",
          desc: "Complete protection with full replacement coverage throughout the probation period.",
        },
      ],
    },
    marketIntelligence: [
      {
        title: "42% Higher Acceptance Rates",
        desc: "Direct-hire technical roles in Canada & US see 42% higher candidate conversion when paired with competitive compensation bands.",
      },
      {
        title: "14-Day Time-to-Fill Average",
        desc: "Standard time-to-fill for specialized engineering and finance roles is reduced from 45 days to 14 days using Venus headhunting.",
      },
      {
        title: "89% Passive Talent Pool",
        desc: "Over 89% of candidates placed through Venus Direct Hire were passive job seekers not active on public job portals.",
      },
    ],
    faqCategory: "Employers",
    ctaHeadline: "Ready to Hire Full-Time Specialized Talent?",
    ctaSubtext:
      "Speak with our direct-hire staffing leads today to receive your calibrated candidate shortlist within 5 business days.",
    metaTitle: "Direct Hire Staffing & Permanent Placement | Venus Hiring",
    metaDescription:
      "Precision direct-hire staffing and permanent recruitment in Canada & US. Sourcing specialized engineers, finance leads, and plant managers.",
    relatedServicesSlugs: ["executive-search", "contract-staffing", "sow-project-pods"],
  },

  "contract-staffing": {
    slug: "contract-staffing",
    title: "Flexible & Contract Staffing Solutions",
    eyebrow: "AGILE WORKFORCE",
    heroHeadline: "Scalable Talent. Exactly When You Need It.",
    heroValueProp:
      "Rapid-deployment contract, temporary, and interim staffing connecting Canadian and US employers with pre-screened technical, financial, and operational professionals.",
    heroImage:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&h=900&fit=crop&auto=format",
    stats: [
      { label: "Deployment Speed", value: "48-72 Hours" },
      { label: "Compliance & Payroll", value: "Turnkey EOR Setup" },
      { label: "Engagement Types", value: "Short & Long-Term" },
    ],
    introStatement:
      "Business demands fluctuate. Your capacity to scale talent shouldn't hold you back.",
    introParagraphs: [
      "Whether managing seasonal peak workloads, covering parental leaves, or executing time-sensitive technical projects, Venus Hiring provides agile contract staffing across Canada and the US.",
      "Our pre-screened contractor network enables organizations to onboard specialized skills within 48 to 72 hours while maintaining total payroll and legal compliance.",
    ],
    introProofIndicators: [
      "Vetted contract professionals ready for deployment within 48-72 hours",
      "Full Employer of Record (EOR) and payroll management included",
      "Flexible contract terms ranging from 30 days to multi-year engagements",
      "Contract-to-hire options with zero conversion penalty after minimum hours",
    ],
    specializedOfferings: [
      {
        id: "contract-short-term",
        title: "Short-Term Contract & Temporary Staffing",
        badge: "RAPID DEPLOYMENT",
        desc: "Rapid deployment of pre-vetted contractors to manage sudden workload spikes, leave coverage, or immediate project deadlines.",
        iconName: "Clock",
        topRoles: [
          "Contract Software Developer",
          "Accounts Payable / Receivable Specialist",
          "Temporary HR Generalist",
          "QA Automation Tester",
          "Customer Support Lead",
        ],
        ctaText: "Request Short-Term Talent",
      },
      {
        id: "contract-project",
        title: "Long-Term & Project Contract Talent",
        badge: "PROJECT EMBEDDED",
        desc: "Embedded contract specialists engaged for multi-month software builds, system migrations, or plant automation projects.",
        iconName: "Briefcase",
        topRoles: [
          "Senior Cloud Migration Engineer",
          "Interim SAP Consultant",
          "Industrial Automation Specialist",
          "Contract Business Analyst",
          "Scrum Master & PM",
        ],
        ctaText: "Hire Project Contractors",
      },
      {
        id: "contract-interim",
        title: "Interim Leadership & Executive Talent",
        badge: "EXECUTIVE INTERIM",
        desc: "Senior interim executives step in during leadership transitions, M&A integrations, or turnaround periods to maintain momentum.",
        iconName: "UserCheck",
        topRoles: [
          "Interim CFO / Financial Controller",
          "Interim VP of HR",
          "Interim Plant Operations Director",
          "Interim CTO",
          "Interim Supply Chain Lead",
        ],
        ctaText: "Engage Interim Executive",
      },
      {
        id: "contract-to-hire",
        title: "Contract-to-Hire Workforce Solutions",
        badge: "ZERO RISK",
        desc: "Evaluate top candidates on-the-job before committing to permanent headcount, eliminating hiring risk and accelerating integration.",
        iconName: "CheckSquare",
        topRoles: [
          "Contract-to-Hire Full Stack Engineer",
          "Contract-to-Hire Accountant",
          "Contract-to-Hire Operations Specialist",
          "Contract-to-Hire DevOps Lead",
        ],
        ctaText: "Explore Contract-to-Hire",
      },
    ],
    deliverables: [
      {
        number: "01",
        title: "Rapid Contractor Deployment",
        desc: "Access pre-screened technical and corporate contractors ready to start within 48 to 72 hours.",
        microDetail: "Zero ramp-up delay for critical roles",
        iconName: "Clock",
      },
      {
        number: "02",
        title: "Turnkey Payroll & EOR Compliance",
        desc: "We handle all statutory deductions, T4/W2 filings, insurance, and employment standards compliance.",
        microDetail: "100% legal risk mitigation",
        iconName: "DollarSign",
      },
      {
        number: "03",
        title: "Pre-Vetted Technical Specialists",
        desc: "Every contractor undergoes code tests, background checks, and reference verifications before assignment.",
        microDetail: "Pre-screened domain expertise",
        iconName: "UserCheck",
      },
      {
        number: "04",
        title: "Flexible Engagement Terms",
        desc: "Scale contractor hours up or down based on project milestones, with easy extensions or ramp-downs.",
        microDetail: "Agile headcount elasticity",
        iconName: "Briefcase",
      },
      {
        number: "05",
        title: "Contract-to-Permanent Conversion",
        desc: "Seamlessly transition high-performing contractors into permanent staff with transparent conversion terms.",
        microDetail: "Try-before-you-hire flexibility",
        iconName: "Layers",
      },
      {
        number: "06",
        title: "Dedicated Contractor Care Lead",
        desc: "Ongoing support for contractor onboarding, time-tracking approval, and weekly performance reviews.",
        microDetail: "Smooth day-to-day administration",
        iconName: "CheckSquare",
      },
    ],
    whoWeHelp: [
      {
        title: "Project Milestone Surges",
        desc: "Engineering and software teams needing immediate technical capacity to meet product release deadlines.",
        tag: "PROJECT SURGE",
      },
      {
        title: "Parental & Medical Leave Coverage",
        desc: "Companies requiring interim finance, HR, or operations leaders to cover extended employee absences.",
        tag: "LEAVE COVERAGE",
      },
      {
        title: "Seasonal & Peak Workloads",
        desc: "Manufacturing and distribution facilities scaling temporary staff during high-demand business quarters.",
        tag: "SEASONAL SCALING",
      },
      {
        title: "Risk-Free Talent Evaluation",
        desc: "Employers preferring a contract-to-hire model to evaluate performance before extending permanent offers.",
        tag: "TRY BEFORE HIRE",
      },
    ],
    targetRoles: [
      "Contract Software Engineer",
      "Interim Financial Controller",
      "Contract DevOps / Cloud Specialist",
      "Temporary HR Generalist",
      "Interim Plant Manager",
      "Contract Business Analyst",
      "Contract QA Specialist",
      "Interim Supply Chain Lead",
    ],
    process: [
      {
        step: "01",
        shortTitle: "Request",
        title: "Workforce Requirement Assessment",
        desc: "We analyze your project scope, required skill sets, start dates, and contract duration.",
        detail: "Defining contractor specs & deliverables",
      },
      {
        step: "02",
        shortTitle: "Match",
        title: "Pre-Vetted Contractor Matching",
        desc: "Our team selects available contract specialists from our active North American talent network.",
        detail: "Matching skills within 24 to 48 hours",
      },
      {
        step: "03",
        shortTitle: "Verify",
        title: "Compliance & Background Check",
        desc: "Contractors undergo background checks, work authorization audits, and contract agreement execution.",
        detail: "Ensuring 100% legal & payroll compliance",
      },
      {
        step: "04",
        shortTitle: "Deploy",
        title: "Rapid Onboarding & Start",
        desc: "Contractor begins work with full administrative support, timesheet automation, and day-one onboarding.",
        detail: "Fast setup with minimum downtime",
      },
      {
        step: "05",
        shortTitle: "Manage",
        title: "Ongoing Performance Support",
        desc: "We manage contractor payroll, check-ins, and performance feedback throughout the engagement.",
        detail: "Hassle-free contract administration",
      },
    ],
    whyVenus: {
      statement:
        "Our contract staffing engine gives you total operational elasticity without long-term overhead or compliance risk.",
      points: [
        {
          title: "48-72 Hour Deployment Window",
          desc: "Fill urgent skill gaps instantly with pre-screened contract specialists ready to start.",
        },
        {
          title: "Full EOR & Payroll Coverage",
          desc: "We handle all payroll, tax withholdings, and statutory compliance across Canada and the US.",
        },
        {
          title: "Seamless Conversion Path",
          desc: "Easily transition top contractors into full-time permanent employees whenever business needs evolve.",
        },
      ],
    },
    marketIntelligence: [
      {
        title: "Contractor Billing Rate Trends",
        desc: "Access regional hourly rate benchmarks for software, engineering, and corporate contract roles.",
      },
      {
        title: "Cross-Border EOR Compliance",
        desc: "Understand Canadian provincial and US state employment laws governing independent contractors.",
      },
      {
        title: "Agile Headcount Optimization",
        desc: "Learn how enterprise firms blend permanent core teams with flexible contract pods.",
      },
    ],
    socialProof: {
      quote:
        "Venus Hiring deployed 4 senior DevOps contractors within 48 hours to help us meet our SOC-2 audit deadline. Exceptional speed and technical accuracy.",
      author: "Elena Rostova",
      role: "VP of Engineering",
      companyType: "Fintech Enterprise",
      metricLabel: "Deployment Speed",
      metricValue: "48 Hours to Onsite",
    },
    relatedServicesSlugs: ["executive-search", "sow-project-pods", "hr-advisory"],
    faqCategory: "Employers",
    ctaHeadline: "Need Contract Talent Right Away?",
    ctaSubtext:
      "Contact our contract staffing team to deploy pre-vetted specialists within 48 to 72 hours.",
    metaTitle: "Contract & Temporary Staffing Solutions | Venus Hiring",
    metaDescription:
      "Agile contract staffing, temporary placement, and interim leadership in Canada & US. Onboard pre-screened contractors in 48-72 hours.",
  },

  "startup-hiring": {
    slug: "startup-hiring",
    title: "Startup & Scale-Up Recruitment Solutions",
    eyebrow: "HIGH-GROWTH TALENT",
    heroHeadline: "Scale Your Team. Fuel Your Runway.",
    heroValueProp:
      "High-velocity recruitment built for Seed, Series A, and venture-backed scaleups seeking founding engineers, product leads, and growth executives.",
    heroImage:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1600&h=900&fit=crop&auto=format",
    stats: [
      { label: "Startup Velocity", value: "Founding Hires in 10 Days" },
      { label: "Equity Advisory", value: "Compensation Banding" },
      { label: "Focus Sectors", value: "SaaS, AI, Fintech & EV" },
    ],
    introStatement:
      "Great startups win on team quality. Early hires determine your product velocity and culture.",
    introParagraphs: [
      "Hiring for early-stage startups requires a different mindset than enterprise recruiting. Founders need resilient, high-ownership builders who thrive in ambiguity and accelerate product-market fit.",
      "Venus Hiring acts as an extended talent partner for venture-backed founders across Toronto, Waterloo, New York, and Silicon Valley, delivering calibrated founding teams and growth squads.",
    ],
    introProofIndicators: [
      "Founding engineer and first leadership candidate shortlists in under 10 days",
      "Compensation & equity grant benchmarking tailored to VC-backed funding stages",
      "Vetting for high adaptability, technical depth, and startup culture alignment",
      "Flexible engagement models structured around startup cash flow and runway",
    ],
    specializedOfferings: [
      {
        id: "startup-founding",
        title: "Founding Team & Seed-Stage Recruitment",
        badge: "SEED TO SERIES A",
        desc: "Sourcing versatile founding engineers, first product managers, and early growth leads for pre-seed and Seed startups.",
        iconName: "Rocket",
        topRoles: [
          "Founding Full-Stack Developer",
          "Founding Product Designer",
          "Head of Growth & Demand Gen",
          "Lead Data Scientist",
          "First Sales Hire",
        ],
        ctaText: "Recruit Founding Team",
      },
      {
        id: "startup-scaleup",
        title: "Series A & B Scale-Up Squads",
        badge: "SCALE-UP PODS",
        desc: "Scaling technical and operational headcount from 10 to 50+ employees post-funding with streamlined recruitment pipelines.",
        iconName: "Users",
        topRoles: [
          "Engineering Team Leads",
          "Senior Backend Developers",
          "Product Marketing Managers",
          "Customer Success Directors",
          "Lead DevOps Engineer",
        ],
        ctaText: "Scale Team Post-Funding",
      },
      {
        id: "startup-fractional",
        title: "Fractional CTO & Technical Leadership",
        badge: "FRACTIONAL LEADER",
        desc: "Seasoned technical leaders who architect system foundations, establish engineering cultures, and mentor early dev teams.",
        iconName: "Code",
        topRoles: [
          "Fractional CTO",
          "Head of Engineering",
          "Principal Systems Architect",
          "VPE Advisory Partner",
        ],
        ctaText: "Find Fractional CTO",
      },
      {
        id: "startup-branding",
        title: "Startup Employer Brand & Talent Pipeline",
        badge: "TALENT BRANDING",
        desc: "Positioning stealth or early-stage startups as top employers to compete directly with tech giants for elite talent.",
        iconName: "Megaphone",
        topRoles: [
          "Technical Recruiter",
          "Employer Brand Strategist",
          "Talent Acquisition Partner",
        ],
        ctaText: "Build Employer Brand",
      },
    ],
    deliverables: [
      {
        number: "01",
        title: "Founding Engineer Headhunting",
        desc: "Discreet sourcing of 10x full-stack, AI, and backend developers with high equity motivation.",
        microDetail: "High-ownership technical builders",
        iconName: "Rocket",
      },
      {
        number: "02",
        title: "Post-Funding Team Scaling",
        desc: "Rapidly build engineering, product, and GTM teams after Series A/B funding rounds.",
        microDetail: "Scale headcount efficiently",
        iconName: "Users",
      },
      {
        number: "03",
        title: "Startup Compensation & Equity Advisory",
        desc: "Benchmark salary vs. stock option equity grants based on seed/Series A market standards.",
        microDetail: "Competitive startup compensation bands",
        iconName: "PieChart",
      },
      {
        number: "04",
        title: "Founder Pitch & Employer Branding",
        desc: "We articulate your startup mission and vision to attract top passive engineers from Big Tech.",
        microDetail: "Compelling founder story pitch",
        iconName: "Megaphone",
      },
      {
        number: "05",
        title: "Culture & Ownership Vetting",
        desc: "Evaluate candidates for resilience, problem-solving speed, and comfort in fast-changing environments.",
        microDetail: "High startup culture fit",
        iconName: "Code",
      },
      {
        number: "06",
        title: "Flexible Startup Recruiting Pricing",
        desc: "Hiring plans designed around startup milestones, preserving early cash runway.",
        microDetail: "Runway-friendly recruitment terms",
        iconName: "TrendingUp",
      },
    ],
    whoWeHelp: [
      {
        title: "Seed-Stage Founders Building V1",
        desc: "Founders seeking technical co-founders or first core engineers to build their initial MVP.",
        tag: "SEED STAGE",
      },
      {
        title: "Series A Teams Scaling Post-Round",
        desc: "Startups with fresh capital needing to hire 5 to 20 engineers and product leads rapidly.",
        tag: "SERIES A EXPANSION",
      },
      {
        title: "Stealth Mode & Stealth Launches",
        desc: "Confidential talent mapping for stealth startups building breakthrough products before public launch.",
        tag: "STEALTH MODE",
      },
      {
        title: "Cross-Border US-Canada Remote Teams",
        desc: "US startups hiring elite Canadian software talent at competitive rates with zero EOR hassle.",
        tag: "CROSS-BORDER STARTUPS",
      },
    ],
    targetRoles: [
      "Founding Software Engineer",
      "Head of Engineering",
      "Lead Product Designer (UI/UX)",
      "Senior Full-Stack Developer",
      "Head of Growth",
      "Senior AI / ML Engineer",
      "Customer Success Lead",
      "DevOps & Infrastructure Lead",
    ],
    process: [
      {
        step: "01",
        shortTitle: "Align",
        title: "Founder Vision & Culture Deep Dive",
        desc: "We meet with founders to understand product roadmap, technical stack, culture values, and equity structure.",
        detail: "Understanding the startup mission & pitch",
      },
      {
        step: "02",
        shortTitle: "Source",
        title: "High-Ownership Talent Mapping",
        desc: "We target senior software engineers and builders with previous startup or high-growth scaleup experience.",
        detail: "Outreach to top 5% startup builders",
      },
      {
        step: "03",
        shortTitle: "Screen",
        title: "Technical & Ownership Vetting",
        desc: "Candidates are evaluated for technical mastery, autonomy, product intuition, and culture alignment.",
        detail: "Assessing code quality & startup mindset",
      },
      {
        step: "04",
        shortTitle: "Pitch",
        title: "Founder Interview & Pitch",
        desc: "We present calibrated candidates and facilitate direct founder interviews and technical deep dives.",
        detail: "Fast-track interview loops in under 7 days",
      },
      {
        step: "05",
        shortTitle: "Close",
        title: "Offer & Equity Closing Support",
        desc: "We help structure competitive salary + stock option offers and support smooth candidate onboarding.",
        detail: "High offer acceptance conversion",
      },
    ],
    whyVenus: {
      statement:
        "We speak the language of founders and VCs, connecting you with builders who treat your startup like their own.",
      points: [
        {
          title: "Founding Hires in 10 Business Days",
          desc: "Accelerate product release timelines with high-speed candidate shortlists.",
        },
        {
          title: "VC & Ecosystem Network",
          desc: "Active relationships across leading Canadian and US startup incubators, accelerators, and VC funds.",
        },
        {
          title: "Runway-Optimized Terms",
          desc: "Recruitment packages designed specifically to protect early startup cash flow.",
        },
      ],
    },
    marketIntelligence: [
      {
        title: "Startup Equity Grant Benchmarks",
        desc: "Access updated data on stock option allocation percentages for Seed vs. Series A early hires.",
      },
      {
        title: "Canadian Tech Salary Corridors",
        desc: "Understand real-time compensation expectations for senior developers in Toronto, Waterloo, and Montreal.",
      },
      {
        title: "Remote vs. Hybrid Startup Dynamics",
        desc: "Learn how top scaleups structure remote team perks, equipment allowances, and offsite cadences.",
      },
    ],
    socialProof: {
      quote:
        "Venus Hiring helped us recruit our Founding Engineer and Lead Product Designer right after our Seed round. Both candidates have been absolute game-changers for our product launch.",
      author: "Siddharth Nair",
      role: "Co-Founder & CEO",
      companyType: "AI-Powered SaaS Startup",
      metricLabel: "Time to First Hire",
      metricValue: "9 Days to Signed",
    },
    relatedServicesSlugs: ["executive-search", "contract-staffing", "sow-project-pods"],
    faqCategory: "Employers",
    ctaHeadline: "Building Your Founding Team?",
    ctaSubtext:
      "Schedule a founder strategy session with our startup recruitment team today.",
    metaTitle: "Startup & Scale-Up Recruitment Solutions | Venus Hiring",
    metaDescription:
      "High-velocity recruitment for Seed, Series A, and VC-backed scaleups. Sourcing founding engineers, product managers, and growth leads.",
  },

  "talent-consulting": {
    slug: "talent-consulting",
    title: "Talent Strategy & Workforce Consulting",
    eyebrow: "STRATEGIC ADVISORY",
    heroHeadline: "Data-Driven Talent Strategy. Built for Scale.",
    heroValueProp:
      "Strategic workforce consulting, compensation benchmarking, candidate experience auditing, and talent acquisition process optimization for growing enterprises.",
    heroImage:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&h=900&fit=crop&auto=format",
    stats: [
      { label: "Data Intelligence", value: "Real-Time Market Benchmarks" },
      { label: "Process Efficiency", value: "35% Faster Time-to-Hire" },
      { label: "Optimization Scope", value: "End-to-End Talent Funnel" },
    ],
    introStatement:
      "Winning the war for talent requires a strategy as sophisticated as your business plan.",
    introParagraphs: [
      "Scaling organizations often struggle with inefficient hiring processes, misaligned compensation bands, and unoptimized candidate pipelines that slow down company expansion.",
      "Venus Hiring provides hands-on talent strategy consulting to re-engineer your recruitment funnel, establish competitive salary benchmarks, and elevate your employer brand across North America.",
    ],
    introProofIndicators: [
      "Comprehensive audit of your internal recruitment process and candidate funnel",
      "Custom salary and total rewards benchmarking reports for Canadian and US roles",
      "Hiring manager training and interview scorecard calibration frameworks",
      "Actionable roadmap to decrease time-to-hire by up to 35%",
    ],
    specializedOfferings: [
      {
        id: "consulting-planning",
        title: "Strategic Workforce & Headcount Planning",
        badge: "HEADCOUNT STRATEGY",
        desc: "Aligning hiring roadmaps with revenue milestones, budget forecasts, and organizational capacity across Canada and the US.",
        iconName: "BarChart3",
        topRoles: [
          "Workforce Planning Director",
          "Headcount Strategist",
          "Organizational Design Lead",
          "HR Business Partner",
        ],
        ctaText: "Build Workforce Strategy",
      },
      {
        id: "consulting-comp",
        title: "Compensation & Market Rate Benchmarking",
        badge: "SALARY INTEL",
        desc: "Real-time Canadian and US salary benchmarking, equity grant structuring, and regional compensation band analysis.",
        iconName: "DollarSign",
        topRoles: [
          "Compensation & Benefits Director",
          "Total Rewards Specialist",
          "Market Salary Analyst",
        ],
        ctaText: "Request Salary Benchmarks",
      },
      {
        id: "consulting-funnel",
        title: "Recruitment Process & Funnel Optimization",
        badge: "FUNNEL EFFICIENCY",
        desc: "Auditing interview workflows, reducing time-to-hire, improving offer acceptance rates, and training hiring managers.",
        iconName: "Sliders",
        topRoles: [
          "Talent Acquisition Director",
          "Recruitment Operations Lead",
          "Interview Calibration Specialist",
        ],
        ctaText: "Optimize Hiring Funnel",
      },
      {
        id: "consulting-evp",
        title: "Employer Value Proposition (EVP) Strategy",
        badge: "EVP ARCHITECTURE",
        desc: "Building compelling employer value propositions (EVP) and frictionless candidate journeys that attract top passive talent.",
        iconName: "Compass",
        topRoles: [
          "Employer Brand Director",
          "Candidate Experience Manager",
          "Talent Brand Strategist",
        ],
        ctaText: "Elevate Employer Brand",
      },
    ],
    deliverables: [
      {
        number: "01",
        title: "Recruitment Funnel Audit",
        desc: "Identify bottlenecks in applicant conversion, interview scheduling, and offer closing.",
        microDetail: "Streamline time-to-hire metrics",
        iconName: "BarChart3",
      },
      {
        number: "02",
        title: "Compensation & Equity Benchmarking",
        desc: "Receive empirical salary and stock option data for tech, finance, and industrial roles in target cities.",
        microDetail: "Market-accurate salary bands",
        iconName: "Compass",
      },
      {
        number: "03",
        title: "Hiring Manager Enablement",
        desc: "Train hiring managers on structured interviewing, rubric scoring, and objective candidate evaluation.",
        microDetail: "Improve interview consistency",
        iconName: "Sliders",
      },
      {
        number: "04",
        title: "Employer Value Proposition (EVP)",
        desc: "Define and communicate your company culture, career paths, and perks to win top passive talent.",
        microDetail: "Differentiate your employer brand",
        iconName: "Target",
      },
      {
        number: "05",
        title: "Diversity & Inclusion Sourcing",
        desc: "Implement equitable job descriptions, unbiased screening protocols, and diverse candidate sourcing.",
        microDetail: "Inclusive hiring best practices",
        iconName: "FileText",
      },
      {
        number: "06",
        title: "Recruitment Tech Stack Selection",
        desc: "Evaluate and implement modern Applicant Tracking Systems (ATS) and talent intelligence tools.",
        microDetail: "Modern recruiting software setup",
        iconName: "ShieldCheck",
      },
    ],
    whoWeHelp: [
      {
        title: "Fast-Growing Companies Scaling Rapidly",
        desc: "Organizations expanding from 50 to 200+ employees needing structured talent acquisition processes.",
        tag: "RAPID SCALING",
      },
      {
        title: "HR Teams Needing Compensation Intelligence",
        desc: "HR leaders seeking accurate salary data to prevent candidate drop-off and counter-offer losses.",
        tag: "COMPENSATION AUDITS",
      },
      {
        title: "Enterprises Modernizing Recruiting Funnels",
        desc: "Established firms looking to overhaul legacy hiring workflows and improve candidate experience.",
        tag: "PROCESS MODERNIZATION",
      },
      {
        title: "Companies Struggling with Long Time-to-Hire",
        desc: "Businesses experiencing candidate drop-off during extended interview cycles.",
        tag: "REDUCE TIME TO HIRE",
      },
    ],
    targetRoles: [
      "VP of Talent Acquisition",
      "Head of People Operations",
      "Compensation & Benefits Director",
      "Recruitment Operations Lead",
      "Employer Brand Strategist",
      "HR Business Partner",
      "Talent Analytics Specialist",
      "Diversity & Inclusion Manager",
    ],
    process: [
      {
        step: "01",
        shortTitle: "Audit",
        title: "Current-State Talent Audit",
        desc: "We analyze your historical hiring metrics, ATS data, interview loops, candidate reviews, and offer acceptance rates.",
        detail: "Mapping hiring bottlenecks & drop-offs",
      },
      {
        step: "02",
        shortTitle: "Benchmark",
        title: "Market & Compensation Intelligence",
        desc: "We benchmark your salary structures and benefits against live market data in Canada and target US markets.",
        detail: "Delivering regional salary benchmark reports",
      },
      {
        step: "03",
        shortTitle: "Design",
        title: "Process & EVP Blueprint",
        desc: "We create a customized recruitment playbook, including structured interview rubrics and employer branding assets.",
        detail: "Standardizing interview stages & rubrics",
      },
      {
        step: "04",
        shortTitle: "Enable",
        title: "Team Training & System Setup",
        desc: "We conduct interactive workshops for hiring managers and recruiters to implement the new hiring framework.",
        detail: "Training managers for objective evaluation",
      },
      {
        step: "05",
        shortTitle: "Measure",
        title: "Continuous Optimization & Review",
        desc: "We track improvements in time-to-hire, offer acceptance, and candidate satisfaction, adjusting as needed.",
        detail: "Ongoing talent performance tracking",
      },
    ],
    whyVenus: {
      statement:
        "We don't just fill roles; we build high-performing talent engines that give you a permanent hiring advantage.",
      points: [
        {
          title: "Empirical Market Data",
          desc: "Gain access to real-time salary and talent availability data gathered across thousands of active searches.",
        },
        {
          title: "35% Average Time-to-Hire Reduction",
          desc: "Eliminate friction points in your interview loop and fast-track top candidate closing.",
        },
        {
          title: "End-to-End Funnel Alignment",
          desc: "Seamlessly align your employer brand, interview rubrics, and offer packages for maximum conversion.",
        },
      ],
    },
    marketIntelligence: [
      {
        title: "2026 Canadian Tech Salary Report",
        desc: "Download our comprehensive salary analysis for software, cloud, and engineering roles in major Canadian hubs.",
      },
      {
        title: "Interview Drop-Off Benchmark Study",
        desc: "Discover why top software engineers drop out of 4+ stage interview loops and how to fix it.",
      },
      {
        title: "Remote Work & Total Rewards Strategy",
        desc: "Explore effective remote benefits, health coverage options, and stipends that drive candidate acceptance.",
      },
    ],
    socialProof: {
      quote:
        "Venus Hiring audited our engineering hiring process and implemented structured scorecards. We reduced our time-to-hire from 48 days to 22 days while increasing offer acceptance to 92%.",
      author: "David Chen",
      role: "Chief People Officer",
      companyType: "Mid-Market Tech Enterprise",
      metricLabel: "Time-to-Hire Reduction",
      metricValue: "48 Days down to 22",
    },
    relatedServicesSlugs: ["executive-search", "hr-advisory", "startup-hiring"],
    faqCategory: "Employers",
    ctaHeadline: "Ready to Optimize Your Talent Strategy?",
    ctaSubtext:
      "Book a complimentary talent strategy consultation with our senior advisors today.",
    metaTitle: "Talent Strategy & Workforce Consulting | Venus Hiring",
    metaDescription:
      "Strategic talent consulting, compensation benchmarking, recruitment funnel optimization, and workforce planning in Canada & US.",
  },

  "hr-advisory": {
    slug: "hr-advisory",
    title: "Fractional HR & Compliance Advisory",
    eyebrow: "HR ADVISORY",
    heroHeadline: "Compliant HR Infrastructure. Empowered Teams.",
    heroValueProp:
      "Fractional HR leadership, Canadian and US labor law compliance, employment audits, performance management frameworks, and HRIS integration.",
    heroImage:
      "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=1600&h=900&fit=crop&auto=format",
    stats: [
      { label: "Compliance Focus", value: "ESA, FLSA & EOR Rules" },
      { label: "Advisory Model", value: "Fractional & Project" },
      { label: "Market Reach", value: "Canada All Provinces & US" },
    ],
    introStatement:
      "Navigating HR compliance across Canadian provinces and US states requires specialized expertise.",
    introParagraphs: [
      "Growing companies often need senior HR leadership and compliance oversight without the expense of a full-time Chief Human Resources Officer.",
      "Venus Hiring provides fractional HR advisory services, helping organizations build legally compliant employment contracts, structured onboarding frameworks, performance review systems, and workplace policies.",
    ],
    introProofIndicators: [
      "Fractional CHRO and senior HR business partner availability on flexible retainers",
      "Comprehensive Canadian provincial and US state employment law compliance audits",
      "Custom employee handbooks, termination protocols, and workplace policies",
      "Structured onboarding, KPI frameworks, and 90-day retention management",
    ],
    specializedOfferings: [
      {
        id: "hr-fractional-chro",
        title: "Fractional CHRO & Executive HR Support",
        badge: "FRACTIONAL CHRO",
        desc: "Experienced HR executives providing strategic guidance on organizational structure, executive coaching, and culture.",
        iconName: "UserCheck",
        topRoles: [
          "Fractional CHRO",
          "Interim People Director",
          "Senior HR Business Partner",
          "Culture & Engagement Lead",
        ],
        ctaText: "Engage Fractional CHRO",
      },
      {
        id: "hr-compliance",
        title: "Cross-Border Compliance & Labor Audits",
        badge: "LEGAL COMPLIANCE",
        desc: "Navigating Canadian provincial employment standards, US FLSA rules, statutory benefits, and contractor risks.",
        iconName: "ShieldAlert",
        topRoles: [
          "HR Compliance Specialist",
          "Labor Relations Advisor",
          "Employment Law Analyst",
          "EOR Operations Lead",
        ],
        ctaText: "Request HR Audit",
      },
      {
        id: "hr-retention",
        title: "Performance Management & Retention Programs",
        badge: "RETENTION SYSTEMS",
        desc: "Designing structured 30-60-90 day onboarding frameworks, KPI frameworks, and employee retention strategies.",
        iconName: "TrendingUp",
        topRoles: [
          "Performance Management Director",
          "People Operations Specialist",
          "Onboarding Manager",
        ],
        ctaText: "Build Retention System",
      },
      {
        id: "hr-technology",
        title: "HRIS & People Technology Implementation",
        badge: "PEOPLE TECH",
        desc: "Selecting, implementing, and optimizing modern HRIS, payroll systems, and performance review software.",
        iconName: "FileText",
        topRoles: [
          "HRIS Systems Manager",
          "People Analytics Specialist",
          "Payroll & Benefits Lead",
        ],
        ctaText: "Optimize HRIS Setup",
      },
    ],
    deliverables: [
      {
        number: "01",
        title: "Employment Compliance Audits",
        desc: "Review existing contracts, contractor agreements, and policies for Canadian provincial and US compliance.",
        microDetail: "Mitigate employment liability",
        iconName: "CheckSquare",
      },
      {
        number: "02",
        title: "Custom Employee Handbooks",
        desc: "Develop legally compliant employee handbooks tailored to remote, hybrid, or multi-provincial workforces.",
        microDetail: "Clear workplace guidelines",
        iconName: "FileText",
      },
      {
        number: "03",
        title: "Performance Review Systems",
        desc: "Implement goal-setting (OKR/KPI) frameworks and bi-annual performance review processes.",
        microDetail: "Drive employee accountability",
        iconName: "TrendingUp",
      },
      {
        number: "04",
        title: "Termination & Offboarding Protocols",
        desc: "Establish compliant termination, severance calculation, and exit interview procedures.",
        microDetail: "Risk-managed employee offboarding",
        iconName: "ShieldAlert",
      },
      {
        number: "05",
        title: "HRIS & Payroll System Implementation",
        desc: "Select and configure modern HRIS tools (Rippling, BambooHR, ADP) for seamless HR automation.",
        microDetail: "Automated HR administration",
        iconName: "Sliders",
      },
      {
        number: "06",
        title: "Onboarding & 90-Day Retention Support",
        desc: "Design structured 30-60-90 day onboarding check-ins to increase first-year employee retention.",
        microDetail: "Higher new-hire retention",
        iconName: "UserCheck",
      },
    ],
    whoWeHelp: [
      {
        title: "US Companies Hiring Remote Talent in Canada",
        desc: "US employers requiring Canadian provincial employment law guidance, contract drafting, and benefits setup.",
        tag: "CROSS-BORDER HIRING",
      },
      {
        title: "Growing Businesses Without Full-Time HR",
        desc: "Companies with 15 to 100 employees needing fractional HR executive guidance and policy structure.",
        tag: "FRACTIONAL HR LEADERSHIP",
      },
      {
        title: "Organizations Facing Compliance Audits",
        desc: "Employers needing immediate review of independent contractor agreements and overtime policies.",
        tag: "COMPLIANCE REMEDIATION",
      },
      {
        title: "Companies Experiencing Early Employee Churn",
        desc: "Businesses looking to fix onboarding processes and build structured 90-day retention frameworks.",
        tag: "FIX RETENTION CHURN",
      },
    ],
    targetRoles: [
      "Fractional Chief Human Resources Officer",
      "Interim People & Culture Director",
      "Senior HR Compliance Specialist",
      "HR Business Partner (HRBP)",
      "HRIS Implementation Lead",
      "People Operations Manager",
      "Compensation & Benefits Specialist",
      "Employee Relations Lead",
    ],
    process: [
      {
        step: "01",
        shortTitle: "Assess",
        title: "HR Compliance & Infrastructure Review",
        desc: "We audit your existing contracts, employee handbooks, benefits programs, and HR systems.",
        detail: "Identifying compliance & policy gaps",
      },
      {
        step: "02",
        shortTitle: "Formulate",
        title: "Tailored HR Strategy Blueprint",
        desc: "We present a customized roadmap prioritizing legal compliance, policy updates, and employee retention tools.",
        detail: "Delivering customized policy documentation",
      },
      {
        step: "03",
        shortTitle: "Implement",
        title: "Policy & System Rollout",
        desc: "We draft compliant documentation, set up HRIS tools, and conduct team briefings for seamless adoption.",
        detail: "Rolling out compliant contracts & handbooks",
      },
      {
        step: "04",
        shortTitle: "Train",
        title: "Manager & Leadership Coaching",
        desc: "We train team leads on performance management, constructive feedback, and compliant HR practices.",
        detail: "Empowering managers on HR protocols",
      },
      {
        step: "05",
        shortTitle: "Advise",
        title: "Ongoing Fractional Advisory",
        desc: "Your dedicated fractional HR advisor remains available for employee relations, contract updates, and HR support.",
        detail: "Retainer-based HR guidance & support",
      },
    ],
    whyVenus: {
      statement:
        "We give you executive HR strength and legal peace of mind at a fraction of the cost of a full-time HR department.",
      points: [
        {
          title: "Dual Canadian & US Legal Fluency",
          desc: "Expert understanding of Ontario Employment Standards Act (ESA), Quebec Labour Code, and US FLSA rules.",
        },
        {
          title: "Flexible Retainer & Project Models",
          desc: "Engage fractional HR advisors on a monthly retainer or fixed-fee project basis as your team grows.",
        },
        {
          title: "Turnkey Policy & HRIS Execution",
          desc: "Receive ready-to-implement employment contracts, handbooks, and automated HRIS workflows.",
        },
      ],
    },
    marketIntelligence: [
      {
        title: "Canadian Employment Law Updates",
        desc: "Stay informed on statutory termination notice rules, non-compete clause bans, and pay transparency mandates.",
      },
      {
        title: "Independent Contractor vs. Employee Risks",
        desc: "Understand CRA and IRS classification guidelines to avoid misclassification tax penalties.",
      },
      {
        title: "Statutory Benefits Across Canadian Provinces",
        desc: "Compare mandatory health tax, vacation pay, and statutory holiday rules across ON, BC, QC, and AB.",
      },
    ],
    socialProof: {
      quote:
        "Venus Hiring restructured our Canadian employment contracts and set up our ripples HRIS. Their fractional HR advice has saved us thousands in legal compliance and offboarding costs.",
      author: "Rachel Sterling",
      role: "Chief Operating Officer",
      companyType: "US Tech Firm Expanding to Canada",
      metricLabel: "Compliance Coverage",
      metricValue: "100% Audit Readiness",
    },
    relatedServicesSlugs: ["executive-search", "talent-consulting", "contract-staffing"],
    faqCategory: "Employers",
    ctaHeadline: "Need Fractional HR Leadership?",
    ctaSubtext:
      "Schedule a consultation with our fractional HR advisors to review your HR compliance today.",
    metaTitle: "Fractional HR & Compliance Advisory | Venus Hiring",
    metaDescription:
      "Fractional HR leadership, employment law compliance audits, employee handbooks, and HRIS setup in Canada & US.",
  },

  "sow-project-pods": {
    slug: "sow-project-pods",
    title: "Statement of Work (SOW) Project Pods",
    eyebrow: "MANAGED DELIVERY PODS",
    heroHeadline: "Guaranteed Milestone Delivery. Managed Pods.",
    heroValueProp:
      "Outcome-based Statement of Work (SOW) project teams engineered for software development, cloud migrations, plant automation, and financial ERP rollouts.",
    heroImage:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1600&h=900&fit=crop&auto=format",
    stats: [
      { label: "Delivery Guarantee", value: "Milestone SLA Commitment" },
      { label: "Pod Composition", value: "Turnkey Managed Teams" },
      { label: "Budget Model", value: "Fixed-Fee Project SOW" },
    ],
    introStatement:
      "When project deadlines are non-negotiable, you need guaranteed team delivery—not just extra headcount.",
    introParagraphs: [
      "Traditional staffing provides individual talent, leaving project management, deliverable quality, and milestone risks on your shoulders.",
      "Venus Hiring SOW Project Pods deliver fully managed multi-disciplinary teams bound by clear Statement of Work (SOW) milestone SLAs, fixed budgets, and quality sign-offs across Canada and North America.",
    ],
    introProofIndicators: [
      "Turnkey project pods equipped with Lead Architects, Senior Engineers, and Scrum Masters",
      "Fixed-fee or capped milestone billing tied directly to deliverable acceptance",
      "Complete SLA accountability with built-in quality assurance and code reviews",
      "Rapid pod deployment within 7 to 14 business days",
    ],
    specializedOfferings: [
      {
        id: "sow-software-cloud",
        title: "Dedicated Software & Cloud Delivery Pods",
        badge: "TURNKEY SOFTWARE",
        desc: "Fully assembled multi-disciplinary pods (Lead Architect, Senior Devs, QA, Scrum Master) delivering milestone software projects.",
        iconName: "Layers",
        topRoles: [
          "Lead Cloud Architect",
          "Senior Full-Stack Developers",
          "QA Automation Lead",
          "Agile Scrum Master",
          "DevOps Specialist",
        ],
        ctaText: "Request Software Pod",
      },
      {
        id: "sow-plant-automation",
        title: "Plant Automation & Engineering Pods",
        badge: "PLANT AUTOMATION",
        desc: "Specialized engineering pods deployed to automotive and industrial plants for assembly line upgrades and automation rollouts.",
        iconName: "CheckCircle",
        topRoles: [
          "PLC Controls Engineer",
          "Robotics Specialist",
          "Tooling Lead",
          "Industrial Automation Specialist",
          "Safety Lead",
        ],
        ctaText: "Deploy Engineering Pod",
      },
      {
        id: "sow-erp-migration",
        title: "Financial ERP & System Migration Pods",
        badge: "ERP MIGRATION",
        desc: "Dedicated accounting and ERP pods executing SAP, NetSuite, or Workday implementations with guaranteed SLAs.",
        iconName: "Lock",
        topRoles: [
          "SAP Implementation Lead",
          "Financial Systems Architect",
          "Senior Data Migration Accountant",
          "ERP Project Lead",
        ],
        ctaText: "Launch ERP Pod",
      },
      {
        id: "sow-product-design",
        title: "Managed UX Product & Design Pods",
        badge: "PRODUCT BUILD",
        desc: "Turnkey product design and build pods taking digital products from discovery and prototype to production launch.",
        iconName: "Kanban",
        topRoles: [
          "Lead UX/UI Architect",
          "Senior Product Designer",
          "Frontend Developer",
          "Product Delivery Lead",
        ],
        ctaText: "Build Product Pod",
      },
    ],
    deliverables: [
      {
        number: "01",
        title: "Agile Software Engineering Pods",
        desc: "Full-stack dev pods delivering custom web/mobile apps, cloud APIs, and microservices.",
        microDetail: "Fixed-sprint milestone delivery",
        iconName: "Layers",
      },
      {
        number: "02",
        title: "Industrial Automation & PLC Pods",
        desc: "Onsite plant engineering teams executing assembly line automation, PLC programming, and robotics.",
        microDetail: "Turnkey factory floor upgrades",
        iconName: "CheckCircle",
      },
      {
        number: "03",
        title: "ERP & Financial Migration Pods",
        desc: "Dedicated finance and tech pods executing NetSuite, SAP, or ERP cloud migrations.",
        microDetail: "Guaranteed data integrity & SLA",
        iconName: "Lock",
      },
      {
        number: "04",
        title: "Cloud Migration & DevOps Pods",
        desc: "Specialized cloud architects re-platforming legacy infrastructure to AWS/Azure/GCP.",
        microDetail: "Zero-downtime cloud migration",
        iconName: "Kanban",
      },
      {
        number: "05",
        title: "Product UX/UI Design & Build Pods",
        desc: "End-to-end product design, prototyping, user testing, and frontend code delivery.",
        microDetail: "Production-ready UI/UX builds",
        iconName: "Code",
      },
      {
        number: "06",
        title: "Milestone SLA Verification",
        desc: "Bi-weekly milestone demonstrations and formal acceptance sign-offs prior to billing release.",
        microDetail: "Predictable deliverable accountability",
        iconName: "ShieldCheck",
      },
    ],
    whoWeHelp: [
      {
        title: "Enterprises with Fixed-Deadline Projects",
        desc: "Companies facing strict product launch or regulatory compliance deadlines requiring turnkey team delivery.",
        tag: "FIXED DEADLINES",
      },
      {
        title: "Firms Preferring Fixed-Budget SOW Delivery",
        desc: "Organizations wanting fixed project costs instead of open-ended time-and-materials billing.",
        tag: "FIXED BUDGET",
      },
      {
        title: "Plants Upgrading Manufacturing Automation",
        desc: "Industrial facilities deploying specialized engineering teams for assembly line overhauls.",
        tag: "FACTORY AUTOMATION",
      },
      {
        title: "Companies Executing Complex ERP Migrations",
        desc: "Finance teams requiring dedicated systems integration pods for SAP, NetSuite, or Workday rollouts.",
        tag: "ERP MIGRATIONS",
      },
    ],
    targetRoles: [
      "Lead Cloud Architect",
      "Senior Full-Stack Developer",
      "PLC Automation Lead",
      "SAP / ERP Migration Architect",
      "Agile Project Manager / Scrum Master",
      "QA Automation Lead Engineer",
      "Lead UX/UI Designer",
      "DevOps & Security Pod Lead",
    ],
    process: [
      {
        step: "01",
        shortTitle: "Define",
        title: "SOW Scope & Milestone Mapping",
        desc: "We collaborate with your technical leads to define project deliverables, technical architecture, and acceptance criteria.",
        detail: "Structuring SOW SLAs & fixed budgets",
      },
      {
        step: "02",
        shortTitle: "Assemble",
        title: "Pod Composition & Lead Selection",
        desc: "We assemble a tailored pod including a Lead Architect, Senior Developers, QA, and Scrum Master.",
        detail: "Assembling pre-vetted team pods in 7-14 days",
      },
      {
        step: "03",
        shortTitle: "Kickoff",
        title: "Onboarding & Tool Integration",
        desc: "The pod integrates with your code repositories, Slack/Jira workflows, and CI/CD deployment pipelines.",
        detail: "Seamless day-one team onboarding",
      },
      {
        step: "04",
        shortTitle: "Execute",
        title: "Agile Sprint & Milestone Delivery",
        desc: "The pod executes in bi-weekly sprints, presenting working software demonstrations and milestone progress reports.",
        detail: "Bi-weekly sprint reviews & QA audits",
      },
      {
        step: "05",
        shortTitle: "Signoff",
        title: "Final Acceptance & Handover",
        desc: "Upon final milestone verification, we transfer complete intellectual property, code documentation, and knowledge.",
        detail: "100% IP transfer & handover support",
      },
    ],
    whyVenus: {
      statement:
        "We take on project milestone risk so you get predictable delivery, fixed budgets, and guaranteed quality.",
      points: [
        {
          title: "Fixed-Budget SOW Accountability",
          desc: "Eliminate budget overruns with clear deliverable milestones tied directly to payment sign-offs.",
        },
        {
          title: "Complete Pod Assembly in 7-14 Days",
          desc: "Skip months of individual hiring and launch fully functioning project pods immediately.",
        },
        {
          title: "100% IP & Knowledge Transfer",
          desc: "Full code documentation, system architecture blueprints, and team handoff upon project completion.",
        },
      ],
    },
    marketIntelligence: [
      {
        title: "Time & Materials vs. SOW Delivery",
        desc: "Compare cost predictability, deliverable quality, and management overhead between T&M staffing and SOW pods.",
      },
      {
        title: "Plant Automation Pod Best Practices",
        desc: "Learn how automotive OEMs structure SOW engineering contracts for zero-downtime assembly line upgrades.",
      },
      {
        title: "Cloud Migration Deliverable Rubrics",
        desc: "Review milestone criteria for AWS/Azure enterprise migrations, from security audits to cutover testing.",
      },
    ],
    socialProof: {
      quote:
        "Venus Hiring delivered a 5-person SOW pod that successfully completed our SAP ERP migration 2 weeks ahead of schedule. Outstanding project management and technical execution.",
      author: "Jonathan Vance",
      role: "Chief Information Officer",
      companyType: "Global Logistics Enterprise",
      metricLabel: "Milestone SLA",
      metricValue: "Delivered 2 Weeks Early",
    },
    relatedServicesSlugs: ["contract-staffing", "executive-search", "startup-hiring"],
    faqCategory: "Employers",
    ctaHeadline: "Need a Dedicated Project Pod?",
    ctaSubtext:
      "Schedule an SOW scope session with our managed project team leads today.",
    metaTitle: "Statement of Work (SOW) Project Pods | Venus Hiring",
    metaDescription:
      "Outcome-based SOW project pods for software engineering, cloud migrations, plant automation, and financial ERP rollouts.",
  },
};

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  if (slug === "direct-hire") return SERVICES_DATA["direct-hire-staffing"];
  return SERVICES_DATA[slug];
}
