export interface IndustrySubCategory {
  title: string;
  desc: string;
  iconName: string;
  badge?: string;
  topRoles?: string[];
}

export interface IndustryWhoWeHelp {
  title: string;
  desc: string;
  tag: string;
}

export interface IndustryProcessStep {
  step: string;
  shortTitle: string;
  title: string;
  desc: string;
  detail: string;
}

export interface IndustryMarketMetric {
  title: string;
  desc: string;
}

export interface IndustryDetail {
  slug: string;
  name: string;
  eyebrow: string;
  heroHeadline: string;
  heroValueProp: string;
  heroImage: string;
  stats: Array<{ label: string; value: string }>;
  overview: {
    heading: string;
    quoteStatement?: string;
    paragraphs: string[];
    keyPoints: string[];
  };
  subCategories: IndustrySubCategory[];
  whoWeHelp?: IndustryWhoWeHelp[];
  process?: IndustryProcessStep[];
  marketIntelligence?: IndustryMarketMetric[];
  targetRoles: string[];
  recommendedServicesSlugs: string[];
  faqCategory: "Employers" | "Recruitment Process" | "Services" | "General";
  metaTitle: string;
  metaDescription: string;
}

export const INDUSTRIES_DATA: Record<string, IndustryDetail> = {
  technology: {
    slug: "technology",
    name: "Technology, Software & AI",
    eyebrow: "TECH RECRUITMENT PRACTICE",
    heroHeadline: "Top 1% Engineering & AI Talent. Scaled for Impact.",
    heroValueProp:
      "Specialized technical recruitment connecting Canadian and US companies with vetted Software Architects, AI/ML Engineers, DevOps leads, and Product Executives.",
    heroImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&h=900&fit=crop&auto=format",
    stats: [
      { label: "Shortlist Turnaround", value: "3-5 Business Days" },
      { label: "Technical Vetting", value: "100% Code Verified" },
      { label: "Market Footprint", value: "Toronto, Van & US" },
    ],
    overview: {
      heading: "Engineering Recruitment Engine Built for High-Growth Tech",
      paragraphs: [
        "In software engineering and AI development, hiring speed and code quality define your product velocity. Venus Hiring provides dedicated technical headhunting across North America.",
        "We source passive software engineers, cloud architects, data scientists, and technical leaders who excel in agile environments and drive product innovation.",
      ],
      keyPoints: [
        "Rigorous technical vetting covering system design, code quality, & scalability",
        "Discreet headhunting targeting passive engineers in Big Tech & high-growth scaleups",
        "Cross-border US-Canada technical hiring with turnkey EOR and payroll compliance",
        "Full 90-day replacement guarantee on all permanent software placements",
      ],
    },
    subCategories: [
      {
        title: "Full-Stack & Backend Engineering",
        desc: "Senior React, Node.js, Python, Java, Go, and Rust software developers.",
        iconName: "Code",
      },
      {
        title: "AI, Machine Learning & Data Science",
        desc: "LLM engineers, MLOps specialists, data pipeline architects, and AI researchers.",
        iconName: "Cpu",
      },
      {
        title: "Cloud Infrastructure & DevOps",
        desc: "AWS, Azure, GCP, Kubernetes, Terraform, and Site Reliability Engineers (SRE).",
        iconName: "Layers",
      },
      {
        title: "Cybersecurity & InfoSec",
        desc: "SOC 2 compliance leads, penetration testers, CISO executives, and security architects.",
        iconName: "ShieldCheck",
      },
      {
        title: "Product & Technical Leadership",
        desc: "CTOs, VPs of Engineering, Directors of Product, and Engineering Managers.",
        iconName: "Award",
      },
      {
        title: "QA & Automation Engineering",
        desc: "SDETs, automated test engineers, and continuous integration specialists.",
        iconName: "CheckSquare",
      },
    ],
    targetRoles: [
      "Chief Technology Officer (CTO)",
      "VP of Engineering",
      "Senior Full-Stack Developer",
      "AI / ML Solutions Architect",
      "DevOps / SRE Lead",
      "Staff Software Engineer",
      "Director of Product Management",
      "Cybersecurity Director",
    ],
    recommendedServicesSlugs: ["executive-search", "startup-hiring", "sow-project-pods"],
    faqCategory: "Employers",
    metaTitle: "Technology & Software Engineering Recruitment | Venus Hiring",
    metaDescription:
      "Specialized technology recruitment sourcing top 1% Software Engineers, AI/ML Specialists, Cloud Architects, and CTOs in Canada & US.",
  },

  "automotive-ev": {
    slug: "automotive-ev",
    slugAlt: "automotive-ev",
    name: "Automotive & EV Mobility",
    eyebrow: "AUTOMOTIVE PRACTICE",
    heroHeadline: "Next-Gen Mobility Talent. Driving EV Innovation.",
    heroValueProp:
      "Specialized automotive recruitment connecting EV battery manufacturers, OEM assembly plants, and autonomous mobility companies with certified engineering and plant leadership.",
    heroImage:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?w=1600&h=900&fit=crop&auto=format",
    stats: [
      { label: "Industry Reach", value: "OEM & Tier-1 Suppliers" },
      { label: "Plant Placement", value: "Directors & Engineers" },
      { label: "Coverage", value: "Ontario & US Midwest" },
    ],
    overview: {
      heading: "Powering the Transition to Electric & Autonomous Mobility",
      paragraphs: [
        "The shift toward electric vehicles and autonomous transportation demands specialized engineers with deep knowledge of high-voltage battery architecture, plant automation, and TS16949 quality standards.",
        "Venus Hiring partners with automotive OEMs and Tier-1 suppliers across the Ontario Automotive Corridor and US Midwest (Detroit/Troy) to recruit mission-critical plant and engineering talent.",
      ],
      keyPoints: [
        "EV battery cell design, battery management system (BMS), & thermal management leads",
        "Automotive plant directors, assembly line managers, & lean manufacturing experts",
        "Autonomous driving software, ADAS sensor fusion, & CAN bus embedded systems talent",
        "ISO/IATF 16949 quality managers and automotive supply chain directors",
      ],
    },
    subCategories: [
      {
        title: "EV Battery Architecture",
        desc: "Cell design, Battery Management Systems (BMS), and thermal safety engineers.",
        iconName: "Zap",
      },
      {
        title: "Plant & Assembly Operations",
        desc: "Automotive Plant Directors, Operations Managers, and Lean Manufacturing leads.",
        iconName: "Building2",
      },
      {
        title: "Autonomous & ADAS Systems",
        desc: "ADAS software engineers, sensor fusion leads, and vehicle control architects.",
        iconName: "Car",
      },
      {
        title: "Automotive Quality & TS16949",
        desc: "IATF 16949 Quality Directors, APQP/PPAP managers, and audit leads.",
        iconName: "CheckSquare",
      },
      {
        title: "Robotics & Automated Tooling",
        desc: "PLC programmers, robotic welding leads, and automated assembly engineers.",
        iconName: "Cpu",
      },
      {
        title: "Automotive Supply Chain",
        desc: "Global automotive buyers, logistics directors, and material managers.",
        iconName: "Truck",
      },
    ],
    targetRoles: [
      "EV Battery Systems Engineer",
      "Automotive Plant Director",
      "BMS Firmware Developer",
      "IATF 16949 Quality Manager",
      "ADAS Sensor Fusion Specialist",
      "Robotics & Controls Engineer",
      "Automotive Tooling Specialist",
      "VP of Supply Chain (Automotive)",
    ],
    recommendedServicesSlugs: ["executive-search", "contract-staffing", "sow-project-pods"],
    faqCategory: "Employers",
    metaTitle: "Automotive & EV Mobility Recruitment | Venus Hiring",
    metaDescription:
      "Automotive and EV recruitment placing Battery Engineers, Plant Operations Directors, ADAS Engineers, and Quality Managers in Canada & US.",
  },

  aerospace: {
    slug: "aerospace",
    name: "Aerospace & Defense Engineering",
    eyebrow: "AEROSPACE PRACTICE",
    heroHeadline: "Certified Aerospace Talent. Engineered for Precision.",
    heroValueProp:
      "Sourcing certified avionics engineers, flight test specialists, structural analysts, and defense program leads for aerospace manufacturers across North America.",
    heroImage:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1600&h=900&fit=crop&auto=format",
    stats: [
      { label: "Compliance Focus", value: "Transport Canada & FAA" },
      { label: "Vetting Precision", value: "100% Verified Credentials" },
      { label: "Talent Access", value: "Commercial & Defense" },
    ],
    overview: {
      heading: "High-Precision Engineering Recruitment for Aviation & Defense",
      paragraphs: [
        "Aerospace development requires uncompromising engineering standards, regulatory compliance expertise, and specialized knowledge of flight dynamics, avionics, and composite materials.",
        "Venus Hiring connects aerospace manufacturers, defense contractors, and commercial aviation innovators with qualified engineers and program directors who meet Transport Canada, FAA, and AS9100 standards.",
      ],
      keyPoints: [
        "Avionics, embedded flight software, & MIL-STD defense systems engineers",
        "Structural analysts, FEA stress modeling leads, & composite materials specialists",
        "FAA & Transport Canada regulatory compliance managers & DER engineers",
        "Flight test engineers and aerospace program management directors",
      ],
    },
    subCategories: [
      {
        title: "Avionics & Flight Systems",
        desc: "Avionics hardware, flight controls, and embedded firmware aerospace engineers.",
        iconName: "Plane",
      },
      {
        title: "Structural & Stress Analysis",
        desc: "Finite Element Analysis (FEA), stress analysts, and composite structures leads.",
        iconName: "Layers",
      },
      {
        title: "Regulatory Compliance & DER",
        desc: "FAA, Transport Canada, AS9100 quality, and airworthiness certification leads.",
        iconName: "ShieldCheck",
      },
      {
        title: "Flight Testing & Integration",
        desc: "Flight test engineers, systems integration leads, and instrumentation experts.",
        iconName: "Activity",
      },
      {
        title: "Propulsion & Thermal Systems",
        desc: "Turbine design, jet engine thermal engineers, and fuel system architects.",
        iconName: "Zap",
      },
      {
        title: "Aerospace Program Management",
        desc: "Defense contract directors, EVTOL program managers, and engineering VPs.",
        iconName: "Award",
      },
    ],
    targetRoles: [
      "Senior Avionics Engineer",
      "Structural Stress Analyst (FEA)",
      "Flight Control Systems Architect",
      "Airworthiness Certification Specialist",
      "Aerospace Quality Director (AS9100)",
      "Flight Test Lead Engineer",
      "Propulsion Design Specialist",
      "VP of Aerospace Engineering",
    ],
    recommendedServicesSlugs: ["executive-search", "contract-staffing", "hr-advisory"],
    faqCategory: "Employers",
    metaTitle: "Aerospace & Defense Engineering Recruitment | Venus Hiring",
    metaDescription:
      "Aerospace recruitment placing Avionics Engineers, Structural Analysts, Airworthiness Certification Specialists, and Program Directors.",
  },

  manufacturing: {
    slug: "manufacturing",
    name: "Advanced Manufacturing & Industrial",
    eyebrow: "INDUSTRIAL PRACTICE",
    heroHeadline: "Operational Excellence. Industrial Leadership.",
    heroValueProp:
      "Placing experienced Plant Operations Directors, Maintenance Supervisors, Quality Managers, and EHS Directors to drive industrial output and safety.",
    heroImage:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&h=900&fit=crop&auto=format",
    stats: [
      { label: "Plant Leadership", value: "Multi-Site Directors" },
      { label: "Safety & ISO", value: "100% EHS Compliant" },
      { label: "Regional Reach", value: "Ontario, Quebec & US" },
    ],
    overview: {
      heading: "Optimizing Plant Throughput with Proven Operational Leaders",
      paragraphs: [
        "Industrial facilities require operational leaders who understand lean manufacturing, preventative maintenance, safety regulations, and labor management in fast-paced production environments.",
        "Venus Hiring recruits top-tier Plant Managers, Industrial Engineers, Maintenance Directors, and Quality Assurance Specialists across food processing, plastics, steel, chemical, and heavy manufacturing.",
      ],
      keyPoints: [
        "Plant operations directors and multi-site manufacturing vice presidents",
        "Lean & Six Sigma Black Belts focused on continuous improvement and scrap reduction",
        "ISO 9001 quality managers and EHS safety directors enforcing regulatory compliance",
        "Industrial maintenance supervisors, millwrights, & PLC automation specialists",
      ],
    },
    subCategories: [
      {
        title: "Plant Operations & Management",
        desc: "Plant Directors, General Managers, and Multi-Site Operations Vice Presidents.",
        iconName: "Building2",
      },
      {
        title: "Industrial & Process Engineering",
        desc: "Manufacturing Engineers, Process Optimization Leads, and Tooling Designers.",
        iconName: "Sliders",
      },
      {
        title: "Quality Assurance & ISO Audits",
        desc: "ISO 9001 Quality Directors, CAPA Managers, and Quality Audit Leads.",
        iconName: "CheckSquare",
      },
      {
        title: "EHS & Environmental Safety",
        desc: "EHS Managers, Safety Directors, and Industrial Hygiene Specialists.",
        iconName: "ShieldAlert",
      },
      {
        title: "Maintenance & Reliability",
        desc: "Maintenance Supervisors, Millwright Leads, and Reliability Engineers.",
        iconName: "Wrench",
      },
      {
        title: "Lean & Continuous Improvement",
        desc: "Six Sigma Black Belts, Kaizen Leads, and Operational Excellence Directors.",
        iconName: "TrendingUp",
      },
    ],
    targetRoles: [
      "Plant Operations Director",
      "Manufacturing Engineering Manager",
      "ISO 9001 Quality Manager",
      "EHS & Safety Director",
      "Industrial Maintenance Supervisor",
      "Six Sigma Continuous Improvement Lead",
      "Process Optimization Engineer",
      "VP of Industrial Operations",
    ],
    recommendedServicesSlugs: ["executive-search", "contract-staffing", "hr-advisory"],
    faqCategory: "Employers",
    metaTitle: "Advanced Manufacturing & Industrial Recruitment | Venus Hiring",
    metaDescription:
      "Industrial and manufacturing recruitment placing Plant Operations Directors, Quality Managers, EHS Directors, and Industrial Engineers.",
  },

  healthcare: {
    slug: "healthcare",
    name: "Healthcare & Life Sciences",
    eyebrow: "HEALTHCARE PRACTICE",
    heroHeadline: "Clinical Excellence. Medical Innovation.",
    heroValueProp:
      "Recruiting clinical operations leads, medical device engineers, regulatory affairs managers, and healthcare executives across North America.",
    heroImage:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&h=900&fit=crop&auto=format",
    stats: [
      { label: "Compliance", value: "Health Canada & FDA" },
      { label: "Talent Scope", value: "Clinical & Device R&D" },
      { label: "Placement Reach", value: "Canada & US" },
    ],
    overview: {
      heading: "Connecting Lifesaving Organizations with Specialized Talent",
      paragraphs: [
        "Healthcare providers, pharmaceutical firms, and medical device startups face rigorous regulatory oversight and acute specialized talent shortages.",
        "Venus Hiring sources experienced Clinical Trial Managers, Health Canada/FDA Regulatory Affairs Directors, ISO 13485 Medical Device Engineers, and Healthcare Operations VPs.",
      ],
      keyPoints: [
        "Health Canada & FDA regulatory affairs managers ensuring rapid product clearance",
        "ISO 13485 medical device hardware engineers and bio-analytical researchers",
        "Clinical operations leads, biostatisticians, & clinical trial trial managers",
        "Healthcare facility operations directors and clinical service managers",
      ],
    },
    subCategories: [
      {
        title: "Regulatory Affairs & Quality",
        desc: "Health Canada & FDA compliance directors, regulatory submission managers.",
        iconName: "ShieldCheck",
      },
      {
        title: "Medical Device Engineering",
        desc: "ISO 13485 medical hardware developers, bio-instrumentation leads.",
        iconName: "Cpu",
      },
      {
        title: "Clinical Operations & Trials",
        desc: "Clinical Trial Managers, CRA leads, and biostatisticians.",
        iconName: "Activity",
      },
      {
        title: "Pharma R&D & Biotech",
        desc: "Bioanalytical researchers, formulation scientists, and lab managers.",
        iconName: "Layers",
      },
      {
        title: "Healthcare Facility Leadership",
        desc: "Clinical Operations VPs, Nursing Directors, and Facility Administrators.",
        iconName: "Building2",
      },
      {
        title: "Health IT & Digital Health",
        desc: "EHR system architects, Telehealth product managers, and HIPAA leads.",
        iconName: "Code",
      },
    ],
    targetRoles: [
      "Regulatory Affairs Director (Health Canada / FDA)",
      "Medical Device Hardware Engineer (ISO 13485)",
      "Clinical Operations Manager",
      "Biostatistician & Clinical Data Lead",
      "Pharmaceutical R&D Scientist",
      "VP of Healthcare Operations",
      "Digital Health Product Manager",
      "Quality Assurance Manager (Pharma)",
    ],
    recommendedServicesSlugs: ["executive-search", "talent-consulting", "hr-advisory"],
    faqCategory: "Employers",
    faqCategoryAlt: "General",
    metaTitle: "Healthcare & Life Sciences Recruitment | Venus Hiring",
    metaDescription:
      "Healthcare recruitment placing Regulatory Affairs Directors, Medical Device Engineers, Clinical Operations Leads, and Biotech Scientists.",
  },

  "finance-corporate": {
    slug: "finance-corporate",
    name: "Finance, Accounting & Corporate Services",
    eyebrow: "FINANCE & CORPORATE PRACTICE",
    heroHeadline: "Fiscal Precision. Strategic Leadership.",
    heroValueProp:
      "Direct placement and executive search for CPAs, Financial Controllers, FP&A Leads, VPs of Sales, and HR Directors.",
    heroImage:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&h=900&fit=crop&auto=format",
    stats: [
      { label: "Financial Placement", value: "CPAs & Controllers" },
      { label: "Executive Level", value: "CFOs & VPs of Finance" },
      { label: "Market Reach", value: "Canada & US" },
    ],
    overview: {
      heading: "Powering Corporate Growth with Proven Financial Leaders",
      paragraphs: [
        "Sound financial governance, transparent reporting, and strategic capital allocation are critical for enterprise valuation and operational stability.",
        "Venus Hiring connects corporations, private equity portfolio firms, and financial institutions with experienced CFOs, Financial Controllers, Senior Accountants, and Corporate Counsel.",
      ],
      keyPoints: [
        "CPAs, Chartered Accountants, & Financial Controllers with IFRS & US GAAP mastery",
        "FP&A Directors, M&A financial analysts, & corporate treasury managers",
        "VPs of Sales, Enterprise Account Executives, & Business Development Directors",
        "Chief Human Resources Officers (CHROs) & Corporate Operations Vice Presidents",
      ],
    },
    subCategories: [
      {
        title: "Financial Controllership & Accounting",
        desc: "CPAs, Financial Controllers, Senior Accountants, and Audit Managers.",
        iconName: "DollarSign",
      },
      {
        title: "FP&A & Strategic Finance",
        desc: "FP&A Directors, Financial Analysts, M&A Leads, and Treasury Managers.",
        iconName: "BarChart3",
      },
      {
        title: "Executive Financial Leadership",
        desc: "CFOs, VPs of Finance, and Interim Financial Executives.",
        iconName: "Award",
      },
      {
        title: "Enterprise Sales & GTM",
        desc: "VPs of Sales, Enterprise Sales Directors, and Commercial Leads.",
        iconName: "TrendingUp",
      },
      {
        title: "Corporate HR & People Leadership",
        desc: "CHROs, VPs of HR, and Strategic Talent Acquisition Leads.",
        iconName: "Users",
      },
      {
        title: "Corporate Legal & Governance",
        desc: "General Counsel, Corporate Secretaries, and Compliance Officers.",
        iconName: "ShieldCheck",
      },
    ],
    targetRoles: [
      "Financial Controller (CPA)",
      "Chief Financial Officer (CFO)",
      "Senior FP&A Manager",
      "VP of Enterprise Sales",
      "Chief Human Resources Officer (CHRO)",
      "Senior Corporate Accountant",
      "Director of Business Operations",
      "General Counsel / Legal Director",
    ],
    recommendedServicesSlugs: ["executive-search", "talent-consulting", "hr-advisory"],
    faqCategory: "Employers",
    metaTitle: "Finance, Accounting & Corporate Recruitment | Venus Hiring",
    metaDescription:
      "Finance and corporate recruitment placing CPAs, Financial Controllers, CFOs, FP&A Leads, VPs of Sales, and HR Executives.",
  },

  "supply-chain": {
    slug: "supply-chain",
    name: "Supply Chain & Logistics",
    eyebrow: "SUPPLY CHAIN PRACTICE",
    heroHeadline: "Resilient Logistics. Global Procurement.",
    heroValueProp:
      "Recruiting Supply Chain Directors, Global Procurement Specialists, Warehouse Operations Managers, and Logistics Directors.",
    heroImage:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&h=900&fit=crop&auto=format",
    stats: [
      { label: "Scope", value: "Global Sourcing & Distribution" },
      { label: "Leadership Level", value: "VPs & Operations Leads" },
      { label: "Coverage", value: "Canada & US Hubs" },
    ],
    overview: {
      heading: "Building Agility & Continuity Across Global Supply Networks",
      paragraphs: [
        "Global trade disruptions, inventory optimization challenges, and freight volatility demand experienced supply chain leaders who mitigate risk and streamline distribution.",
        "Venus Hiring places experienced Supply Chain VPs, Procurement Directors, Distribution Center Managers, and Logistics Engineers across North America.",
      ],
      keyPoints: [
        "Global procurement directors & strategic sourcing specialists with multi-vendor networks",
        "Distribution center general managers & automated warehouse operations leaders",
        "Logistics engineers, customs compliance managers, & freight optimization specialists",
        "Demand planning managers, S&OP directors, & inventory control leads",
      ],
    },
    subCategories: [
      {
        title: "Global Procurement & Sourcing",
        desc: "Procurement Directors, Strategic Sourcing Leads, and Vendor Managers.",
        iconName: "Compass",
      },
      {
        title: "Warehouse & Distribution Ops",
        desc: "Distribution Center Managers, Fulfillment Ops Leads, and WMS Specialists.",
        iconName: "Building2",
      },
      {
        title: "Logistics & Freight Management",
        desc: "Logistics Directors, Freight Transportation Leads, and Customs Managers.",
        iconName: "Truck",
      },
      {
        title: "Demand Planning & S&OP",
        desc: "Demand Planners, Inventory Control Directors, and S&OP Leads.",
        iconName: "BarChart3",
      },
      {
        title: "Supply Chain Technology & ERP",
        desc: "SAP Supply Chain Consultants, Kinaxis Leads, and Supply Chain Analysts.",
        iconName: "Sliders",
      },
      {
        title: "Executive Supply Chain Leadership",
        desc: "VPs of Global Supply Chain and Chief Logistics Officers.",
        iconName: "Award",
      },
    ],
    targetRoles: [
      "VP of Global Supply Chain",
      "Strategic Procurement Director",
      "Distribution Center Manager",
      "Demand Planning & S&OP Manager",
      "Logistics Operations Lead",
      "Customs & Trade Compliance Specialist",
      "SAP Supply Chain Consultant",
      "Inventory Operations Director",
    ],
    recommendedServicesSlugs: ["executive-search", "contract-staffing", "sow-project-pods"],
    faqCategory: "Employers",
    metaTitle: "Supply Chain & Logistics Recruitment | Venus Hiring",
    metaDescription:
      "Supply chain recruitment placing Procurement Directors, Distribution Center Managers, Logistics Leads, and Demand Planners in Canada & US.",
  },

  "professional-services": {
    slug: "professional-services",
    name: "Professional & Corporate Services",
    eyebrow: "CORPORATE & CONSULTING PRACTICE",
    heroHeadline: "Corporate Leadership. Strategic Execution.",
    heroValueProp:
      "Executive search and direct placement for Management Consultants, VPs of Business Development, Corporate Recruiter leads, and Operations Executives.",
    heroImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&h=900&fit=crop&auto=format",
    stats: [
      { label: "Placements", value: "Partners & VPs" },
      { label: "Retention Rate", value: "98.1% Tenure" },
      { label: "Coverage", value: "Canada & US Corporate" },
    ],
    overview: {
      heading: "Empowering Professional Services & Corporate Enterprise Scaling",
      paragraphs: [
        "Professional services firms, management consultancies, and corporate operations require agile leaders who drive revenue growth, manage key client accounts, and optimize organizational efficiency.",
        "Venus Hiring recruits experienced Management Consultants, VPs of Business Operations, Chief Marketing Officers, and Corporate Legal Counsel across North America.",
      ],
      keyPoints: [
        "Management consultants & transformation directors with top-tier firm background",
        "VPs of Enterprise Sales, Commercial Leads, & Business Development Directors",
        "Chief Human Resources Officers (CHROs) & Talent Acquisition Leaders",
        "Corporate Legal Counsel, General Counsel, & Compliance Directors",
      ],
    },
    subCategories: [
      {
        title: "Management & Strategy Consulting",
        desc: "Partner-level search, strategy directors, and digital transformation leads.",
        iconName: "Award",
      },
      {
        title: "Enterprise Sales & Commercial Leadership",
        desc: "VPs of Sales, Account Executives, and Business Development Directors.",
        iconName: "TrendingUp",
      },
      {
        title: "Corporate HR & Talent Acquisition",
        desc: "CHROs, VPs of People, and Strategic Talent Acquisition Leads.",
        iconName: "Users",
      },
      {
        title: "Corporate Legal & Compliance",
        desc: "General Counsel, Legal Directors, and Compliance Officers.",
        iconName: "ShieldCheck",
      },
      {
        title: "Marketing & Demand Generation",
        desc: "CMOs, Vice Presidents of Marketing, and Brand Strategy Leads.",
        iconName: "Megaphone",
      },
      {
        title: "Business Operations & Strategy",
        desc: "VPs of Operations, Chief of Staff, and Strategy Directors.",
        iconName: "BarChart3",
      },
    ],
    targetRoles: [
      "VP of Business Development",
      "Senior Strategy Consultant",
      "Chief Marketing Officer (CMO)",
      "General Counsel",
      "Director of Talent Acquisition",
      "VP of Enterprise Operations",
      "Chief of Staff",
      "Managing Director (Consulting)",
    ],
    recommendedServicesSlugs: ["executive-search", "direct-hire-staffing", "talent-consulting"],
    faqCategory: "Employers",
    metaTitle: "Professional & Corporate Services Recruitment | Venus Hiring",
    metaDescription:
      "Specialized recruitment placing Management Consultants, VPs of Business Development, Corporate Counsel, and HR Executives across Canada & US.",
  },
};

export function getIndustryBySlug(slug: string): IndustryDetail | undefined {
  if (slug === "technology-saas" || slug === "technology-software") return INDUSTRIES_DATA["technology"];
  if (slug === "finance-accounting" || slug === "financial-services") return INDUSTRIES_DATA["finance-corporate"];
  if (slug === "aerospace-engineering") return INDUSTRIES_DATA["aerospace"];
  if (slug === "industrial-manufacturing" || slug === "manufacturing-industrial") return INDUSTRIES_DATA["manufacturing"];
  if (slug === "healthcare-biotech" || slug === "healthcare-life-sciences") return INDUSTRIES_DATA["healthcare"];
  if (slug === "professional-corporate-services") return INDUSTRIES_DATA["professional-services"];
  if (slug === "logistics-supply-chain" || slug === "supply-chain-logistics") return INDUSTRIES_DATA["supply-chain"];
  return INDUSTRIES_DATA[slug];
}
