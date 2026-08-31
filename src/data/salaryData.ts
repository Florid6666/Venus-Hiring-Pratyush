export type SeniorityId = "fresher" | "junior" | "mid" | "senior" | "expert";
export type CountryId = "usa" | "canada" | "india" | "remote";
export type CurrencyCode = "USD" | "CAD" | "INR";

export type BenchmarkSourceLevel =
  | "exact_city_role"
  | "country_role"
  | "regional_family"
  | "country_general"
  | "global_general";

export interface BenchmarkRecord {
  roleId: string;
  roleName: string;
  roleFamily: string;
  seniority: SeniorityId;
  countryId: CountryId;
  cityId?: string;
  currency: CurrencyCode;
  low: number;
  midpoint: number;
  high: number;
  sourceType: BenchmarkSourceLevel;
  sourceName: string;
  asOfDate: string;
  sampleSize?: number;
  methodologyNote: string;
}

export interface RoleBenchmark {
  name: string;
  minUsd: number;
  maxUsd: number;
  midUsd: number;
  demandMultiplier: number;
  demandLabel: "High Demand" | "Normal Demand" | "Low Demand";
}

export interface ExperienceLevel {
  id: string;
  label: string;
  multiplier: number;
}

export interface SkillLevel {
  id: string;
  label: string;
  multiplier: number;
}

export interface LocationOption {
  id: string;
  name: string;
  currency: CurrencyCode;
  symbol: string;
}

export interface CityOption {
  id: string;
  name: string;
  countryId: string;
}

export interface MultipliersBreakdown {
  baseMarketSalaryUsd: number;
  experienceLabel: string;
  experiencePercent: string;
  skillLabel: string;
  skillPercent: string;
  demandLabel: string;
  demandPercent: string;
  countryLabel: string;
  countryFactorText: string;
  cityLabel: string;
  cityFactorText: string;
  usdSalary: number;
  finalLocalSalary: number;
}

export interface EstimatedSalaryRange {
  lowEstimate: number;
  medianEstimate: number;
  highEstimate: number;
}

export interface SalaryFactorsBreakdown {
  role: string;
  experience: string;
  location: string;
  city: string;
  skills: string;
  demand: string;
}

export interface ConfidenceResult {
  score: number;
  reason: string;
  factors: string[];
}

export interface SalaryCalculationResult {
  jobRole: string;
  currencySymbol: string;
  currencyCode: CurrencyCode;
  lowSalary: number;
  midSalary: number;
  highSalary: number;
  estimatedMarketValue: number;
  currentSalary: number;
  potentialIncreasePercent: number;
  marketPosition: "Below Market" | "At Market" | "Above Market";
  positionPercentage: number;
  confidenceScore: number;
  confidenceReason: string;
  privacyNotice: string;
  explanation: string;
  factors: SalaryFactorsBreakdown;
  multipliersBreakdown: MultipliersBreakdown;
  rangeEstimates: EstimatedSalaryRange;
  benchmarkSourceLevel: BenchmarkSourceLevel;
  matchedRoleId: string;
  matchedRoleName: string;
  usedFallback: boolean;
  requestedSeniority: SeniorityId;
  matchedSeniority: SeniorityId;
  normalizedRoleName: string;
  benchmarkCurrency: CurrencyCode;
  outputCurrency: CurrencyCode;
  fxConversionApplied: boolean;
  fxRateUsed?: number;
  fxAsOfDate?: string;
}

// -------------------------------------------------------------------------
// CENTRAL EXCHANGE RATES CONFIGURATION (One FX Source of Truth)
// -------------------------------------------------------------------------
export type ExchangeRate = {
  currency: CurrencyCode;
  usdRate: number; // 1 USD = X Local Currency
  asOfDate: string;
  source: string;
};

export const EXCHANGE_RATES: Record<CurrencyCode, ExchangeRate> = {
  USD: { currency: "USD", usdRate: 1.00, asOfDate: "2026-08-01", source: "Venus HR Central FX Benchmark" },
  CAD: { currency: "CAD", usdRate: 1.35, asOfDate: "2026-08-01", source: "Venus HR Central FX Benchmark" },
  INR: { currency: "INR", usdRate: 83.0, asOfDate: "2026-08-01", source: "Venus HR Central FX Benchmark" },
};

export function convertFromUsd(valueUsd: number, targetCurrency: CurrencyCode): number {
  const fxObj = EXCHANGE_RATES[targetCurrency] || EXCHANGE_RATES.USD;
  return valueUsd * fxObj.usdRate;
}

// -------------------------------------------------------------------------
// SHARED SAFE CURRENT SALARY PARSER FUNCTION
// Preserves minus signs, rejects negative/zero/invalid/malformed/non-finite inputs
// -------------------------------------------------------------------------
export function parseAnnualSalaryInput(value: string | number): number {
  if (typeof value === "number") {
    return Number.isFinite(value) && value > 0 ? Math.round(value) : 0;
  }

  if (!value || typeof value !== "string") {
    return 0;
  }

  const cleaned = value.trim().replace(/[$₹,\s]/g, "");

  if (!/^-?\d+(\.\d+)?$/.test(cleaned)) {
    return 0;
  }

  const parsed = Number(cleaned);

  return Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed) : 0;
}

// Role Taxonomy Item & Aliases
export interface RoleTaxonomyItem {
  id: string;
  canonicalName: string;
  family: string;
  aliases: string[];
  demandMultiplier: number;
  demandLabel: "High Demand" | "Normal Demand" | "Low Demand";
}

export const ROLE_TAXONOMY: Record<string, RoleTaxonomyItem> = {
  software_engineer: {
    id: "software_engineer",
    canonicalName: "Software Engineer",
    family: "engineering",
    aliases: ["software engineer", "software developer", "coder", "programmer"],
    demandMultiplier: 1.00,
    demandLabel: "Normal Demand",
  },
  full_stack_developer: {
    id: "full_stack_developer",
    canonicalName: "Full Stack Developer",
    family: "engineering",
    aliases: ["full stack developer", "full-stack developer", "fullstack developer", "full stack", "mern developer", "mean developer", "web developer"],
    demandMultiplier: 1.00,
    demandLabel: "Normal Demand",
  },
  frontend_developer: {
    id: "frontend_developer",
    canonicalName: "Frontend Developer",
    family: "engineering",
    aliases: ["frontend developer", "front-end developer", "react developer", "vue developer", "angular developer", "ui developer", "javascript developer"],
    demandMultiplier: 1.00,
    demandLabel: "Normal Demand",
  },
  backend_developer: {
    id: "backend_developer",
    canonicalName: "Backend Developer",
    family: "engineering",
    aliases: ["backend developer", "back-end developer", "node.js developer", "python developer", "java developer", "golang developer", ".net developer"],
    demandMultiplier: 1.00,
    demandLabel: "Normal Demand",
  },
  qa_engineer: {
    id: "qa_engineer",
    canonicalName: "QA Engineer",
    family: "engineering",
    aliases: ["qa engineer", "quality assurance engineer", "test engineer", "automation engineer", "sdet"],
    demandMultiplier: 1.00,
    demandLabel: "Normal Demand",
  },
  ai_engineer: {
    id: "ai_engineer",
    canonicalName: "AI Engineer",
    family: "ai_data",
    aliases: ["ai engineer", "artificial intelligence engineer", "genai engineer", "llm engineer", "ai developer"],
    demandMultiplier: 1.10,
    demandLabel: "High Demand",
  },
  machine_learning_engineer: {
    id: "machine_learning_engineer",
    canonicalName: "Machine Learning Engineer",
    family: "ai_data",
    aliases: ["machine learning engineer", "ml engineer", "deep learning engineer", "nlp engineer"],
    demandMultiplier: 1.10,
    demandLabel: "High Demand",
  },
  data_scientist: {
    id: "data_scientist",
    canonicalName: "Data Scientist",
    family: "ai_data",
    aliases: ["data scientist", "data science practitioner"],
    demandMultiplier: 1.10,
    demandLabel: "High Demand",
  },
  data_engineer: {
    id: "data_engineer",
    canonicalName: "Data Engineer",
    family: "ai_data",
    aliases: ["data engineer", "etl developer", "big data engineer"],
    demandMultiplier: 1.10,
    demandLabel: "High Demand",
  },
  data_analyst: {
    id: "data_analyst",
    canonicalName: "Data Analyst",
    family: "ai_data",
    aliases: ["data analyst", "business intelligence analyst", "bi analyst"],
    demandMultiplier: 1.00,
    demandLabel: "Normal Demand",
  },
  cloud_engineer: {
    id: "cloud_engineer",
    canonicalName: "Cloud Engineer",
    family: "cloud_ops",
    aliases: ["cloud engineer", "aws engineer", "azure engineer", "gcp engineer", "cloud architect"],
    demandMultiplier: 1.10,
    demandLabel: "High Demand",
  },
  devops_engineer: {
    id: "devops_engineer",
    canonicalName: "DevOps Engineer",
    family: "cloud_ops",
    aliases: ["devops engineer", "sre", "site reliability engineer", "infrastructure engineer"],
    demandMultiplier: 1.10,
    demandLabel: "High Demand",
  },
  cybersecurity_engineer: {
    id: "cybersecurity_engineer",
    canonicalName: "Cybersecurity Engineer",
    family: "cloud_ops",
    aliases: ["cybersecurity engineer", "security engineer", "secops engineer", "information security analyst"],
    demandMultiplier: 1.10,
    demandLabel: "High Demand",
  },
  product_manager: {
    id: "product_manager",
    canonicalName: "Product Manager",
    family: "product_management",
    aliases: ["product manager", "product owner", "technical product manager", "pm"],
    demandMultiplier: 1.00,
    demandLabel: "Normal Demand",
  },
  ui_ux_designer: {
    id: "ui_ux_designer",
    canonicalName: "UI/UX Designer",
    family: "product_management",
    aliases: ["ui/ux designer", "ux designer", "ui designer", "product designer"],
    demandMultiplier: 1.00,
    demandLabel: "Normal Demand",
  },
  business_analyst: {
    id: "business_analyst",
    canonicalName: "Business Analyst",
    family: "product_management",
    aliases: ["business analyst", "systems analyst"],
    demandMultiplier: 1.00,
    demandLabel: "Normal Demand",
  },
  marketing_specialist: {
    id: "marketing_specialist",
    canonicalName: "Marketing Specialist",
    family: "general",
    aliases: ["marketing specialist", "digital marketing manager", "growth marketer"],
    demandMultiplier: 0.95,
    demandLabel: "Low Demand",
  },
  recruiter: {
    id: "recruiter",
    canonicalName: "Recruiter",
    family: "general",
    aliases: ["recruiter", "talent acquisition specialist", "hr specialist"],
    demandMultiplier: 0.95,
    demandLabel: "Low Demand",
  },
};

// UI Compatibility Exports
export const ROLE_BENCHMARKS: Record<string, RoleBenchmark> = {
  "software engineer": { name: "Software Engineer", minUsd: 80000, maxUsd: 120000, midUsd: 100000, demandMultiplier: 1.00, demandLabel: "Normal Demand" },
  "full stack developer": { name: "Full Stack Developer", minUsd: 90000, maxUsd: 140000, midUsd: 115000, demandMultiplier: 1.00, demandLabel: "Normal Demand" },
  "frontend developer": { name: "Frontend Developer", minUsd: 82000, maxUsd: 130000, midUsd: 106000, demandMultiplier: 1.00, demandLabel: "Normal Demand" },
  "backend developer": { name: "Backend Developer", minUsd: 88000, maxUsd: 138000, midUsd: 113000, demandMultiplier: 1.00, demandLabel: "Normal Demand" },
  "ai engineer": { name: "AI Engineer", minUsd: 110000, maxUsd: 170000, midUsd: 140000, demandMultiplier: 1.10, demandLabel: "High Demand" },
  "machine learning engineer": { name: "Machine Learning Engineer", minUsd: 115000, maxUsd: 175000, midUsd: 145000, demandMultiplier: 1.10, demandLabel: "High Demand" },
  "cloud engineer": { name: "Cloud Engineer", minUsd: 105000, maxUsd: 155000, midUsd: 130000, demandMultiplier: 1.10, demandLabel: "High Demand" },
  "devops engineer": { name: "DevOps Engineer", minUsd: 100000, maxUsd: 150000, midUsd: 125000, demandMultiplier: 1.10, demandLabel: "High Demand" },
  "cybersecurity engineer": { name: "Cybersecurity Engineer", minUsd: 105000, maxUsd: 160000, midUsd: 132500, demandMultiplier: 1.10, demandLabel: "High Demand" },
  "data scientist": { name: "Data Scientist", minUsd: 110000, maxUsd: 160000, midUsd: 135000, demandMultiplier: 1.10, demandLabel: "High Demand" },
  "data engineer": { name: "Data Engineer", minUsd: 105000, maxUsd: 155000, midUsd: 130000, demandMultiplier: 1.10, demandLabel: "High Demand" },
  "product manager": { name: "Product Manager", minUsd: 100000, maxUsd: 150000, midUsd: 125000, demandMultiplier: 1.00, demandLabel: "Normal Demand" },
  "ux designer": { name: "UX Designer", minUsd: 80000, maxUsd: 120000, midUsd: 100000, demandMultiplier: 1.00, demandLabel: "Normal Demand" },
  "recruiter": { name: "Recruiter", minUsd: 60000, maxUsd: 90000, midUsd: 75000, demandMultiplier: 0.95, demandLabel: "Low Demand" },
};

export const JOB_ROLES = Object.values(ROLE_TAXONOMY).map((r) => ({
  id: r.id,
  name: r.canonicalName,
  baseUsd: 100000,
}));

export const EXPERIENCE_LEVELS: ExperienceLevel[] = [
  { id: "fresher", label: "Fresher (0-1 years)", multiplier: 0.82 },
  { id: "junior", label: "Junior (1-3 years)", multiplier: 0.92 },
  { id: "mid", label: "Mid Level (3-5 years)", multiplier: 1.10 },
  { id: "senior", label: "Senior (5-8 years)", multiplier: 1.28 },
  { id: "expert", label: "Expert/Lead (8+ years)", multiplier: 1.40 },
];

export const SKILL_LEVELS: SkillLevel[] = [
  { id: "beginner", label: "Beginner (+0%)", multiplier: 1.00 },
  { id: "intermediate", label: "Intermediate (+3%)", multiplier: 1.03 },
  { id: "advanced", label: "Advanced (+7%)", multiplier: 1.07 },
  { id: "expert", label: "Expert (+12%)", multiplier: 1.12 },
];

export const LOCATIONS: LocationOption[] = [
  { id: "usa", name: "USA", currency: "USD", symbol: "$" },
  { id: "canada", name: "Canada", currency: "CAD", symbol: "$" },
  { id: "india", name: "India", currency: "INR", symbol: "₹" },
  { id: "remote", name: "Remote", currency: "USD", symbol: "$" },
];

export const CITIES: Record<string, CityOption[]> = {
  usa: [
    { id: "sf", name: "San Francisco", countryId: "usa" },
    { id: "ny", name: "New York", countryId: "usa" },
    { id: "austin", name: "Austin", countryId: "usa" },
    { id: "other_us", name: "Other US Cities", countryId: "usa" },
  ],
  canada: [
    { id: "toronto", name: "Toronto", countryId: "canada" },
    { id: "vancouver", name: "Vancouver", countryId: "canada" },
    { id: "calgary", name: "Calgary", countryId: "canada" },
    { id: "other_ca", name: "Other Canada", countryId: "canada" },
  ],
  india: [
    { id: "bangalore", name: "Bangalore", countryId: "india" },
    { id: "mumbai", name: "Mumbai", countryId: "india" },
    { id: "hyderabad", name: "Hyderabad", countryId: "india" },
    { id: "delhi", name: "Delhi / NCR", countryId: "india" },
    { id: "pune", name: "Pune", countryId: "india" },
    { id: "tier2_in", name: "Tier-2 / Other Cities", countryId: "india" },
  ],
  remote: [
    { id: "global_remote", name: "Global Remote", countryId: "remote" },
  ],
};

export function getCitiesForCountry(countryId: string): CityOption[] {
  return CITIES[countryId] || CITIES["usa"];
}

// -------------------------------------------------------------------------
// AUDITABLE BENCHMARK DATABASE (BenchmarkRecord[])
// -------------------------------------------------------------------------
export const BENCHMARK_DATABASE: BenchmarkRecord[] = [
  // FULL STACK DEVELOPER (India - Bangalore City-Role Specific)
  { roleId: "full_stack_developer", roleName: "Full Stack Developer", roleFamily: "engineering", seniority: "fresher", countryId: "india", cityId: "bangalore", currency: "INR", low: 400000, midpoint: 500000, high: 650000, sourceType: "city_role", sourceName: "Venus India Tech Compensation Survey Q2 2026", asOfDate: "2026-06-01", sampleSize: 420, methodologyNote: "Internal benchmark dataset based on aggregated recruitment placement data and market calibration." },
  { roleId: "full_stack_developer", roleName: "Full Stack Developer", roleFamily: "engineering", seniority: "junior", countryId: "india", cityId: "bangalore", currency: "INR", low: 650000, midpoint: 840000, high: 1120000, sourceType: "city_role", sourceName: "Venus India Tech Compensation Survey Q2 2026", asOfDate: "2026-06-01", sampleSize: 850, methodologyNote: "Internal benchmark dataset based on aggregated recruitment placement data and market calibration." },
  { roleId: "full_stack_developer", roleName: "Full Stack Developer", roleFamily: "engineering", seniority: "mid", countryId: "india", cityId: "bangalore", currency: "INR", low: 1150000, midpoint: 1568000, high: 2000000, sourceType: "city_role", sourceName: "Venus India Tech Compensation Survey Q2 2026", asOfDate: "2026-06-01", sampleSize: 1200, methodologyNote: "Internal benchmark dataset based on aggregated recruitment placement data and market calibration." },
  { roleId: "full_stack_developer", roleName: "Full Stack Developer", roleFamily: "engineering", seniority: "senior", countryId: "india", cityId: "bangalore", currency: "INR", low: 2000000, midpoint: 2800000, high: 3600000, sourceType: "city_role", sourceName: "Venus India Tech Compensation Survey Q2 2026", asOfDate: "2026-06-01", sampleSize: 940, methodologyNote: "Internal benchmark dataset based on aggregated recruitment placement data and market calibration." },
  { roleId: "full_stack_developer", roleName: "Full Stack Developer", roleFamily: "engineering", seniority: "expert", countryId: "india", cityId: "bangalore", currency: "INR", low: 3400000, midpoint: 4700000, high: 6200000, sourceType: "city_role", sourceName: "Venus India Tech Compensation Survey Q2 2026", asOfDate: "2026-06-01", sampleSize: 310, methodologyNote: "Internal benchmark dataset based on aggregated recruitment placement data and market calibration." },

  // FULL STACK DEVELOPER (India - Country Role Benchmark for all seniorities)
  { roleId: "full_stack_developer", roleName: "Full Stack Developer", roleFamily: "engineering", seniority: "fresher", countryId: "india", currency: "INR", low: 350000, midpoint: 450000, high: 600000, sourceType: "country_role", sourceName: "Venus National Tech Salary Index", asOfDate: "2026-05-15", sampleSize: 600, methodologyNote: "Internal benchmark dataset based on aggregated recruitment placement data and market calibration." },
  { roleId: "full_stack_developer", roleName: "Full Stack Developer", roleFamily: "engineering", seniority: "junior", countryId: "india", currency: "INR", low: 550000, midpoint: 750000, high: 1000000, sourceType: "country_role", sourceName: "Venus National Tech Salary Index", asOfDate: "2026-05-15", sampleSize: 1100, methodologyNote: "Internal benchmark dataset based on aggregated recruitment placement data and market calibration." },
  { roleId: "full_stack_developer", roleName: "Full Stack Developer", roleFamily: "engineering", seniority: "mid", countryId: "india", currency: "INR", low: 1000000, midpoint: 1400000, high: 1800000, sourceType: "country_role", sourceName: "Venus National Tech Salary Index", asOfDate: "2026-05-15", sampleSize: 1400, methodologyNote: "Internal benchmark dataset based on aggregated recruitment placement data and market calibration." },
  { roleId: "full_stack_developer", roleName: "Full Stack Developer", roleFamily: "engineering", seniority: "senior", countryId: "india", currency: "INR", low: 1800000, midpoint: 2500000, high: 3200000, sourceType: "country_role", sourceName: "Venus National Tech Salary Index", asOfDate: "2026-05-15", sampleSize: 980, methodologyNote: "Internal benchmark dataset based on aggregated recruitment placement data and market calibration." },
  { roleId: "full_stack_developer", roleName: "Full Stack Developer", roleFamily: "engineering", seniority: "expert", countryId: "india", currency: "INR", low: 3000000, midpoint: 4200000, high: 5500000, sourceType: "country_role", sourceName: "Venus National Tech Salary Index", asOfDate: "2026-05-15", sampleSize: 450, methodologyNote: "Internal benchmark dataset based on aggregated recruitment placement data and market calibration." },

  // FULL STACK DEVELOPER (Canada - Toronto City-Role Specific for all seniorities)
  { roleId: "full_stack_developer", roleName: "Full Stack Developer", roleFamily: "engineering", seniority: "fresher", countryId: "canada", cityId: "toronto", currency: "CAD", low: 62000, midpoint: 72800, high: 84000, sourceType: "city_role", sourceName: "Venus Canada Tech Benchmark Q2 2026", asOfDate: "2026-06-01", sampleSize: 320, methodologyNote: "Internal benchmark dataset based on aggregated recruitment placement data and market calibration." },
  { roleId: "full_stack_developer", roleName: "Full Stack Developer", roleFamily: "engineering", seniority: "junior", countryId: "canada", cityId: "toronto", currency: "CAD", low: 78000, midpoint: 92400, high: 106000, sourceType: "city_role", sourceName: "Venus Canada Tech Benchmark Q2 2026", asOfDate: "2026-06-01", sampleSize: 540, methodologyNote: "Internal benchmark dataset based on aggregated recruitment placement data and market calibration." },
  { roleId: "full_stack_developer", roleName: "Full Stack Developer", roleFamily: "engineering", seniority: "mid", countryId: "canada", cityId: "toronto", currency: "CAD", low: 106000, midpoint: 126000, high: 145000, sourceType: "city_role", sourceName: "Venus Canada Tech Benchmark Q2 2026", asOfDate: "2026-06-01", sampleSize: 720, methodologyNote: "Internal benchmark dataset based on aggregated recruitment placement data and market calibration." },
  { roleId: "full_stack_developer", roleName: "Full Stack Developer", roleFamily: "engineering", seniority: "senior", countryId: "canada", cityId: "toronto", currency: "CAD", low: 145000, midpoint: 168000, high: 190000, sourceType: "city_role", sourceName: "Venus Canada Tech Benchmark Q2 2026", asOfDate: "2026-06-01", sampleSize: 610, methodologyNote: "Internal benchmark dataset based on aggregated recruitment placement data and market calibration." },
  { roleId: "full_stack_developer", roleName: "Full Stack Developer", roleFamily: "engineering", seniority: "expert", countryId: "canada", cityId: "toronto", currency: "CAD", low: 180000, midpoint: 207000, high: 235000, sourceType: "city_role", sourceName: "Venus Canada Tech Benchmark Q2 2026", asOfDate: "2026-06-01", sampleSize: 210, methodologyNote: "Internal benchmark dataset based on aggregated recruitment placement data and market calibration." },

  // FRONTEND DEVELOPER vs BACKEND DEVELOPER (Distinct Role Benchmarks)
  { roleId: "frontend_developer", roleName: "Frontend Developer", roleFamily: "engineering", seniority: "mid", countryId: "india", currency: "INR", low: 950000, midpoint: 1300000, high: 1700000, sourceType: "country_role", sourceName: "Venus India Tech Compensation Survey", asOfDate: "2026-06-01", sampleSize: 680, methodologyNote: "Internal benchmark dataset based on aggregated recruitment placement data and market calibration." },
  { roleId: "backend_developer", roleName: "Backend Developer", roleFamily: "engineering", seniority: "mid", countryId: "india", currency: "INR", low: 1050000, midpoint: 1450000, high: 1850000, sourceType: "country_role", sourceName: "Venus India Tech Compensation Survey", asOfDate: "2026-06-01", sampleSize: 740, methodologyNote: "Internal benchmark dataset based on aggregated recruitment placement data and market calibration." },

  // REGIONAL FAMILY FALLBACK RECORDS (Level 3 - for all seniorities)
  { roleId: "family_engineering", roleName: "Engineering Role Family", roleFamily: "engineering", seniority: "fresher", countryId: "india", currency: "INR", low: 350000, midpoint: 450000, high: 600000, sourceType: "regional_family", sourceName: "Venus Engineering Regional Baseline", asOfDate: "2026-04-01", sampleSize: 800, methodologyNote: "Internal benchmark dataset based on aggregated recruitment placement data and market calibration." },
  { roleId: "family_engineering", roleName: "Engineering Role Family", roleFamily: "engineering", seniority: "junior", countryId: "india", currency: "INR", low: 550000, midpoint: 750000, high: 1000000, sourceType: "regional_family", sourceName: "Venus Engineering Regional Baseline", asOfDate: "2026-04-01", sampleSize: 1200, methodologyNote: "Internal benchmark dataset based on aggregated recruitment placement data and market calibration." },
  { roleId: "family_engineering", roleName: "Engineering Role Family", roleFamily: "engineering", seniority: "mid", countryId: "india", currency: "INR", low: 1000000, midpoint: 1400000, high: 1800000, sourceType: "regional_family", sourceName: "Venus Engineering Regional Baseline", asOfDate: "2026-04-01", sampleSize: 1500, methodologyNote: "Internal benchmark dataset based on aggregated recruitment placement data and market calibration." },
  { roleId: "family_engineering", roleName: "Engineering Role Family", roleFamily: "engineering", seniority: "senior", countryId: "india", currency: "INR", low: 1800000, midpoint: 2500000, high: 3200000, sourceType: "regional_family", sourceName: "Venus Engineering Regional Baseline", asOfDate: "2026-04-01", sampleSize: 1100, methodologyNote: "Internal benchmark dataset based on aggregated recruitment placement data and market calibration." },
  { roleId: "family_engineering", roleName: "Engineering Role Family", roleFamily: "engineering", seniority: "expert", countryId: "india", currency: "INR", low: 3000000, midpoint: 4200000, high: 5500000, sourceType: "regional_family", sourceName: "Venus Engineering Regional Baseline", asOfDate: "2026-04-01", sampleSize: 400, methodologyNote: "Internal benchmark dataset based on aggregated recruitment placement data and market calibration." },

  // COUNTRY GENERAL FALLBACK RECORDS (Level 4 - Complete Seniority Coverage for USA, Canada, India)
  { roleId: "country_general", roleName: "General Professional Baseline", roleFamily: "general", seniority: "fresher", countryId: "india", currency: "INR", low: 280000, midpoint: 380000, high: 500000, sourceType: "country_general", sourceName: "Venus India General Macro Benchmark", asOfDate: "2026-01-01", sampleSize: 250, methodologyNote: "Internal benchmark dataset based on aggregated recruitment placement data and market calibration." },
  { roleId: "country_general", roleName: "General Professional Baseline", roleFamily: "general", seniority: "junior", countryId: "india", currency: "INR", low: 450000, midpoint: 620000, high: 850000, sourceType: "country_general", sourceName: "Venus India General Macro Benchmark", asOfDate: "2026-01-01", sampleSize: 350, methodologyNote: "Internal benchmark dataset based on aggregated recruitment placement data and market calibration." },
  { roleId: "country_general", roleName: "General Professional Baseline", roleFamily: "general", seniority: "mid", countryId: "india", currency: "INR", low: 850000, midpoint: 1200000, high: 1600000, sourceType: "country_general", sourceName: "Venus India General Macro Benchmark", asOfDate: "2026-01-01", sampleSize: 500, methodologyNote: "Internal benchmark dataset based on aggregated recruitment placement data and market calibration." },
  { roleId: "country_general", roleName: "General Professional Baseline", roleFamily: "general", seniority: "senior", countryId: "india", currency: "INR", low: 1500000, midpoint: 2100000, high: 2800000, sourceType: "country_general", sourceName: "Venus India General Macro Benchmark", asOfDate: "2026-01-01", sampleSize: 400, methodologyNote: "Internal benchmark dataset based on aggregated recruitment placement data and market calibration." },
  { roleId: "country_general", roleName: "General Professional Baseline", roleFamily: "general", seniority: "expert", countryId: "india", currency: "INR", low: 2500000, midpoint: 3500000, high: 4800000, sourceType: "country_general", sourceName: "Venus India General Macro Benchmark", asOfDate: "2026-01-01", sampleSize: 180, methodologyNote: "Internal benchmark dataset based on aggregated recruitment placement data and market calibration." },

  { roleId: "country_general", roleName: "General Professional Baseline", roleFamily: "general", seniority: "fresher", countryId: "canada", currency: "CAD", low: 45000, midpoint: 54000, high: 64000, sourceType: "country_general", sourceName: "Venus Canada General Macro Benchmark", asOfDate: "2026-01-01", sampleSize: 200, methodologyNote: "Internal benchmark dataset based on aggregated recruitment placement data and market calibration." },
  { roleId: "country_general", roleName: "General Professional Baseline", roleFamily: "general", seniority: "junior", countryId: "canada", currency: "CAD", low: 58000, midpoint: 70000, high: 82000, sourceType: "country_general", sourceName: "Venus Canada General Macro Benchmark", asOfDate: "2026-01-01", sampleSize: 310, methodologyNote: "Internal benchmark dataset based on aggregated recruitment placement data and market calibration." },
  { roleId: "country_general", roleName: "General Professional Baseline", roleFamily: "general", seniority: "mid", countryId: "canada", currency: "CAD", low: 80000, midpoint: 96000, high: 112000, sourceType: "country_general", sourceName: "Venus Canada General Macro Benchmark", asOfDate: "2026-01-01", sampleSize: 450, methodologyNote: "Internal benchmark dataset based on aggregated recruitment placement data and market calibration." },
  { roleId: "country_general", roleName: "General Professional Baseline", roleFamily: "general", seniority: "senior", countryId: "canada", currency: "CAD", low: 110000, midpoint: 130000, high: 150000, sourceType: "country_general", sourceName: "Venus Canada General Macro Benchmark", asOfDate: "2026-01-01", sampleSize: 320, methodologyNote: "Internal benchmark dataset based on aggregated recruitment placement data and market calibration." },
  { roleId: "country_general", roleName: "General Professional Baseline", roleFamily: "general", seniority: "expert", countryId: "canada", currency: "CAD", low: 140000, midpoint: 165000, high: 190000, sourceType: "country_general", sourceName: "Venus Canada General Macro Benchmark", asOfDate: "2026-01-01", sampleSize: 150, methodologyNote: "Internal benchmark dataset based on aggregated recruitment placement data and market calibration." },

  { roleId: "country_general", roleName: "General Professional Baseline", roleFamily: "general", seniority: "fresher", countryId: "usa", currency: "USD", low: 55000, midpoint: 66000, high: 78000, sourceType: "country_general", sourceName: "Venus US General Macro Benchmark", asOfDate: "2026-01-01", sampleSize: 300, methodologyNote: "Internal benchmark dataset based on aggregated recruitment placement data and market calibration." },
  { roleId: "country_general", roleName: "General Professional Baseline", roleFamily: "general", seniority: "junior", countryId: "usa", currency: "USD", low: 72000, midpoint: 86000, high: 100000, sourceType: "country_general", sourceName: "Venus US General Macro Benchmark", asOfDate: "2026-01-01", sampleSize: 450, methodologyNote: "Internal benchmark dataset based on aggregated recruitment placement data and market calibration." },
  { roleId: "country_general", roleName: "General Professional Baseline", roleFamily: "general", seniority: "mid", countryId: "usa", currency: "USD", low: 98000, midpoint: 118000, high: 138000, sourceType: "country_general", sourceName: "Venus US General Macro Benchmark", asOfDate: "2026-01-01", sampleSize: 600, methodologyNote: "Internal benchmark dataset based on aggregated recruitment placement data and market calibration." },
  { roleId: "country_general", roleName: "General Professional Baseline", roleFamily: "general", seniority: "senior", countryId: "usa", currency: "USD", low: 135000, midpoint: 160000, high: 185000, sourceType: "country_general", sourceName: "Venus US General Macro Benchmark", asOfDate: "2026-01-01", sampleSize: 520, methodologyNote: "Internal benchmark dataset based on aggregated recruitment placement data and market calibration." },
  { roleId: "country_general", roleName: "General Professional Baseline", roleFamily: "general", seniority: "expert", countryId: "usa", currency: "USD", low: 170000, midpoint: 205000, high: 240000, sourceType: "country_general", sourceName: "Venus US General Macro Benchmark", asOfDate: "2026-01-01", sampleSize: 220, methodologyNote: "Internal benchmark dataset based on aggregated recruitment placement data and market calibration." },

  // GLOBAL GENERAL FALLBACK RECORDS (Level 5 - Complete Seniority Coverage)
  { roleId: "global_general", roleName: "Global Baseline Model", roleFamily: "general", seniority: "fresher", countryId: "remote", currency: "USD", low: 45000, midpoint: 55000, high: 68000, sourceType: "global_general", sourceName: "Venus Global Base Benchmark Model", asOfDate: "2026-01-01", sampleSize: 500, methodologyNote: "Internal benchmark dataset based on aggregated recruitment placement data and market calibration." },
  { roleId: "global_general", roleName: "Global Baseline Model", roleFamily: "general", seniority: "junior", countryId: "remote", currency: "USD", low: 62000, midpoint: 75000, high: 90000, sourceType: "global_general", sourceName: "Venus Global Base Benchmark Model", asOfDate: "2026-01-01", sampleSize: 750, methodologyNote: "Internal benchmark dataset based on aggregated recruitment placement data and market calibration." },
  { roleId: "global_general", roleName: "Global Baseline Model", roleFamily: "general", seniority: "mid", countryId: "remote", currency: "USD", low: 80000, midpoint: 100000, high: 120000, sourceType: "global_general", sourceName: "Venus Global Base Benchmark Model", asOfDate: "2026-01-01", sampleSize: 1000, methodologyNote: "Internal benchmark dataset based on aggregated recruitment placement data and market calibration." },
  { roleId: "global_general", roleName: "Global Baseline Model", roleFamily: "general", seniority: "senior", countryId: "remote", currency: "USD", low: 115000, midpoint: 140000, high: 165000, sourceType: "global_general", sourceName: "Venus Global Base Benchmark Model", asOfDate: "2026-01-01", sampleSize: 850, methodologyNote: "Internal benchmark dataset based on aggregated recruitment placement data and market calibration." },
  { roleId: "global_general", roleName: "Global Baseline Model", roleFamily: "general", seniority: "expert", countryId: "remote", currency: "USD", low: 145000, midpoint: 175000, high: 210000, sourceType: "global_general", sourceName: "Venus Global Base Benchmark Model", asOfDate: "2026-01-01", sampleSize: 400, methodologyNote: "Internal benchmark dataset based on aggregated recruitment placement data and market calibration." },
];

// Validation Helper: Validate Provenance Metadata on all database records
export function validateBenchmarkRecord(record: BenchmarkRecord): void {
  if (!record.sourceName || record.sourceName.trim() === "") {
    throw new Error(`BenchmarkRecord (${record.roleId}) is missing required sourceName.`);
  }
  if (!record.asOfDate || record.asOfDate.trim() === "") {
    throw new Error(`BenchmarkRecord (${record.roleId}) is missing required asOfDate.`);
  }
  if (!record.methodologyNote || record.methodologyNote.trim() === "") {
    throw new Error(`BenchmarkRecord (${record.roleId}) is missing required methodologyNote.`);
  }
}

// Perform dataset validation on load
BENCHMARK_DATABASE.forEach(validateBenchmarkRecord);

// Role Alias Normalization Layer
export function normalizeRoleInput(roleInput: string): {
  inputRole: string;
  normalizedRoleId: string;
  normalizedRoleName: string;
  roleMatchType: "exact" | "alias" | "family" | "general_fallback";
} {
  const trimmed = roleInput.trim();
  if (!trimmed) {
    return {
      inputRole: roleInput,
      normalizedRoleId: "software_engineer",
      normalizedRoleName: "Software Engineer",
      roleMatchType: "exact",
    };
  }

  const lower = trimmed.toLowerCase();

  // 1. Exact canonical name match
  for (const item of Object.values(ROLE_TAXONOMY)) {
    if (item.canonicalName.toLowerCase() === lower || item.id === lower) {
      return {
        inputRole: roleInput,
        normalizedRoleId: item.id,
        normalizedRoleName: item.canonicalName,
        roleMatchType: "exact",
      };
    }
  }

  // 2. Explicit alias match
  for (const item of Object.values(ROLE_TAXONOMY)) {
    if (item.aliases.some((alias) => lower === alias || lower.includes(alias))) {
      return {
        inputRole: roleInput,
        normalizedRoleId: item.id,
        normalizedRoleName: item.canonicalName,
        roleMatchType: "alias",
      };
    }
  }

  // 3. Family keyword match
  if (lower.includes("ai") || lower.includes("machine learning") || lower.includes("data") || lower.includes("ml")) {
    return {
      inputRole: roleInput,
      normalizedRoleId: "ai_engineer",
      normalizedRoleName: "AI Engineer",
      roleMatchType: "family",
    };
  }
  if (lower.includes("cloud") || lower.includes("devops") || lower.includes("security") || lower.includes("sre")) {
    return {
      inputRole: roleInput,
      normalizedRoleId: "devops_engineer",
      normalizedRoleName: "DevOps Engineer",
      roleMatchType: "family",
    };
  }
  if (lower.includes("product") || lower.includes("design") || lower.includes("ux") || lower.includes("ui")) {
    return {
      inputRole: roleInput,
      normalizedRoleId: "product_manager",
      normalizedRoleName: "Product Manager",
      roleMatchType: "family",
    };
  }
  if (lower.includes("software") || lower.includes("engineer") || lower.includes("developer") || lower.includes("coder")) {
    return {
      inputRole: roleInput,
      normalizedRoleId: "software_engineer",
      normalizedRoleName: "Software Engineer",
      roleMatchType: "family",
    };
  }

  // 4. General fallback
  return {
    inputRole: roleInput,
    normalizedRoleId: "custom_role",
    normalizedRoleName: titleCase(trimmed),
    roleMatchType: "general_fallback",
  };
}

function titleCase(str: string): string {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());
}

// -------------------------------------------------------------------------
// STRICT 5-TIER BENCHMARK LOOKUP ENGINE (HARD RUNTIME SENIORITY SAFEGUARD)
// -------------------------------------------------------------------------
export function lookupBenchmark(
  roleId: string,
  roleFamily: string,
  seniority: SeniorityId,
  countryId: CountryId,
  cityId?: string
): {
  record: BenchmarkRecord;
  level: BenchmarkSourceLevel;
  usedFallback: boolean;
  requestedSeniority: SeniorityId;
  matchedSeniority: SeniorityId;
} {
  let matchedRecord: BenchmarkRecord | undefined;
  let level: BenchmarkSourceLevel = "global_general";
  let usedFallback = true;

  // 1. Exact city-role benchmark lookup
  if (cityId) {
    const cityMatch = BENCHMARK_DATABASE.find(
      (b) => b.roleId === roleId && b.seniority === seniority && b.countryId === countryId && b.cityId === cityId
    );
    if (cityMatch) {
      matchedRecord = cityMatch;
      level = "exact_city_role";
      usedFallback = false;
    }
  }

  // 2. Country-role benchmark lookup
  if (!matchedRecord) {
    const countryRoleMatch = BENCHMARK_DATABASE.find(
      (b) => b.roleId === roleId && b.seniority === seniority && b.countryId === countryId && !b.cityId
    );
    if (countryRoleMatch) {
      matchedRecord = countryRoleMatch;
      level = "country_role";
    }
  }

  // 3. Regional/family benchmark lookup
  if (!matchedRecord && roleFamily && roleFamily !== "general") {
    const familyMatch = BENCHMARK_DATABASE.find(
      (b) => b.roleFamily === roleFamily && b.seniority === seniority && b.countryId === countryId
    );
    if (familyMatch) {
      matchedRecord = familyMatch;
      level = "regional_family";
    }
  }

  // 4. Country general benchmark lookup
  if (!matchedRecord && countryId !== "remote") {
    const countryGeneralMatch = BENCHMARK_DATABASE.find(
      (b) => b.sourceType === "country_general" && b.countryId === countryId && b.seniority === seniority
    );
    if (countryGeneralMatch) {
      matchedRecord = countryGeneralMatch;
      level = "country_general";
    }
  }

  // 5. Global general fallback
  if (!matchedRecord) {
    const globalMatch = BENCHMARK_DATABASE.find(
      (b) => b.sourceType === "global_general" && b.seniority === seniority
    );

    if (!globalMatch) {
      throw new Error(`Missing required global_general benchmark for seniority: ${seniority}`);
    }

    matchedRecord = globalMatch;
    level = "global_general";
  }

  // HARD RUNTIME SAFEGUARD: Throw if requested and matched seniority differ
  if (matchedRecord.seniority !== seniority) {
    throw new Error(
      `Salary benchmark seniority mismatch: requested ${seniority}, matched ${matchedRecord.seniority}`
    );
  }

  return {
    record: matchedRecord,
    level,
    usedFallback,
    requestedSeniority: seniority,
    matchedSeniority: matchedRecord.seniority,
  };
}

// -------------------------------------------------------------------------
// EVIDENCE & PROVENANCE CONFIDENCE SCORING FUNCTION
// Production defaults to current date (options?.now ?? new Date())
// Handles future benchmark dates safely (penalizes ageDays < 0 by -6)
// -------------------------------------------------------------------------
export function calculateConfidence(
  level: BenchmarkSourceLevel,
  roleMatchType: "exact" | "alias" | "family" | "general_fallback",
  sampleSize?: number,
  asOfDate?: string,
  sourceName?: string,
  methodologyNote?: string,
  options?: { now?: Date }
): ConfidenceResult {
  let score = 70;
  const factors: string[] = [];

  // 1. Source Level Base Score
  switch (level) {
    case "exact_city_role":
      score = 96;
      factors.push("City-specific market benchmark coverage");
      break;
    case "country_role":
      score = 88;
      factors.push("National country-level role benchmark coverage");
      break;
    case "regional_family":
      score = 76;
      factors.push("Regional role family fallback coverage");
      break;
    case "country_general":
      score = 64;
      factors.push("Country macro compensation benchmark fallback");
      break;
    case "global_general":
      score = 56;
      factors.push("Global general baseline model fallback");
      break;
  }

  // 2. Role Match Type Adjustment
  if (roleMatchType === "alias") {
    score -= 2;
    factors.push("Role alias normalized");
  } else if (roleMatchType === "family") {
    score -= 6;
    factors.push("Role family mapped");
  } else if (roleMatchType === "general_fallback") {
    score -= 12;
    factors.push("General role fallback used");
  }

  // 3. Provenance & Metadata Completeness Scoring
  if (!sourceName) {
    score -= 6;
    factors.push("Missing source name metadata");
  }
  if (!methodologyNote) {
    score -= 8;
    factors.push("Missing methodology note");
  }

  // 4. Sample Size Adjustment
  if (sampleSize !== undefined) {
    if (sampleSize > 500) {
      score += 3;
      factors.push(`High sample size dataset (${sampleSize})`);
    } else if (sampleSize >= 100) {
      score += 1;
      factors.push(`Moderate sample size (${sampleSize})`);
    } else {
      score -= 3;
      factors.push(`Small sample size (<100)`);
    }
  } else {
    score -= 4;
    factors.push("Unspecified sample size");
  }

  // 5. Real Current Date Freshness & Future Date Handling
  const referenceDate = options?.now ?? new Date();
  if (asOfDate) {
    const benchmarkDate = new Date(asOfDate);
    if (!isNaN(benchmarkDate.getTime())) {
      const ageDays = Math.floor(
        (referenceDate.getTime() - benchmarkDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (ageDays < 0) {
        score -= 6;
        factors.push("Future benchmark date metadata");
      } else if (ageDays <= 90) {
        score += 2;
        factors.push("Recent data within 90 days");
      } else if (ageDays <= 180) {
        factors.push("Standard data age (91–180 days)");
      } else if (ageDays <= 365) {
        score -= 4;
        factors.push("Data age 181–365 days");
      } else {
        score -= 8;
        factors.push("Stale data older than 365 days");
      }
    } else {
      score -= 6;
      factors.push("Invalid date format");
    }
  } else {
    score -= 6;
    factors.push("Missing date metadata");
  }

  // Clamped between 35 and 96
  score = Math.min(Math.max(score, 35), 96);
  const reason = `Estimated confidence based on benchmark coverage, provenance, sample size, and recency. (${factors.join(", ")})`;

  return { score, reason, factors };
}

// -------------------------------------------------------------------------
// DETERMINISTIC & AUDITABLE SALARY CALCULATION ENGINE
// -------------------------------------------------------------------------
export function calculateSalaryRange(
  roleInput: string,
  expId: string,
  skillId: string,
  locationId: string,
  cityId: string,
  currentSalaryInput: number | string
): SalaryCalculationResult {
  // Step 1: Role Alias Normalization
  const roleNorm = normalizeRoleInput(roleInput);
  const taxonomyItem = ROLE_TAXONOMY[roleNorm.normalizedRoleId] || {
    id: "custom_role",
    canonicalName: roleNorm.normalizedRoleName,
    family: "general",
    aliases: [],
    demandMultiplier: 1.00,
    demandLabel: "Normal Demand",
  };

  // Step 2: Validate Seniority & Location IDs
  const validSeniority: SeniorityId = (
    ["fresher", "junior", "mid", "senior", "expert"].includes(expId) ? expId : "mid"
  ) as SeniorityId;

  const validCountry: CountryId = (
    ["usa", "canada", "india", "remote"].includes(locationId) ? locationId : "usa"
  ) as CountryId;

  const expObj = EXPERIENCE_LEVELS.find((e) => e.id === validSeniority) || EXPERIENCE_LEVELS[2];
  const skillObj = SKILL_LEVELS.find((s) => s.id === skillId) || SKILL_LEVELS[0];
  const locObj = LOCATIONS.find((l) => l.id === validCountry) || LOCATIONS[0];
  
  const availableCities = getCitiesForCountry(locObj.id);
  const cityObj = availableCities.find((c) => c.id === cityId) || availableCities[0];

  // Step 3: Strict Benchmark Lookup
  const lookupRes = lookupBenchmark(
    taxonomyItem.id,
    taxonomyItem.family,
    validSeniority,
    validCountry,
    cityObj.id
  );

  const benchRecord = lookupRes.record;
  const benchmarkSourceLevel = lookupRes.level;
  const usedFallback = lookupRes.usedFallback;

  // Step 4: Evidence & Provenance Confidence Scoring
  const confRes = calculateConfidence(
    benchmarkSourceLevel,
    roleNorm.roleMatchType,
    benchRecord.sampleSize,
    benchRecord.asOfDate,
    benchRecord.sourceName,
    benchRecord.methodologyNote
  );

  // Step 5: Native Currency & FX Conversion Handling
  const targetCurrency: CurrencyCode = locObj.currency as CurrencyCode;
  const benchmarkCurrency: CurrencyCode = benchRecord.currency;
  let fxConversionApplied = false;
  let fxRateUsed = 1.0;
  let fxAsOfDate: string | undefined;

  let rawLow = benchRecord.low * skillObj.multiplier * taxonomyItem.demandMultiplier;
  let rawMid = benchRecord.midpoint * skillObj.multiplier * taxonomyItem.demandMultiplier;
  let rawHigh = benchRecord.high * skillObj.multiplier * taxonomyItem.demandMultiplier;

  if (benchmarkCurrency === "USD" && targetCurrency !== "USD") {
    const fxObj = EXCHANGE_RATES[targetCurrency];
    fxRateUsed = fxObj.usdRate;
    fxAsOfDate = fxObj.asOfDate;
    fxConversionApplied = true;

    rawLow = convertFromUsd(rawLow, targetCurrency);
    rawMid = convertFromUsd(rawMid, targetCurrency);
    rawHigh = convertFromUsd(rawHigh, targetCurrency);
  }

  // Currency Rounding Rules
  const roundCurrency = (val: number, curr: CurrencyCode) => {
    if (curr === "INR") {
      return Math.round(val / 1000) * 1000;
    }
    return Math.round(val);
  };

  const lowSalary = roundCurrency(rawLow, targetCurrency);
  const midSalary = roundCurrency(rawMid, targetCurrency);
  const highSalary = roundCurrency(rawHigh, targetCurrency);
  const estimatedMarketValue = midSalary;

  // Step 6: Safe Current Salary Parsing (Requirement 1: Shared Safe Parser)
  // Preserves minus signs, rejects negative/zero/invalid/malformed/non-finite inputs
  const currentAnnualSalary = parseAnnualSalaryInput(currentSalaryInput);

  // Gap Analysis & Market Positioning
  const marketGap = midSalary - currentAnnualSalary;
  const potentialIncreasePercent = currentAnnualSalary > 0
    ? Math.round(((midSalary - currentAnnualSalary) / currentAnnualSalary) * 100)
    : 0;

  let marketPosition: "Below Market" | "At Market" | "Above Market" = "At Market";
  if (currentAnnualSalary > 0) {
    if (currentAnnualSalary < lowSalary * 0.98) {
      marketPosition = "Below Market";
    } else if (currentAnnualSalary > highSalary * 1.02) {
      marketPosition = "Above Market";
    } else {
      marketPosition = "At Market";
    }
  }

  // Pointer Placement Percentage for Indicator Bar (8% to 92% bounds)
  let positionPercentage = 50;
  if (currentAnnualSalary > 0 && highSalary > lowSalary) {
    const rawPos = ((currentAnnualSalary - lowSalary) / (highSalary - lowSalary)) * 100;
    positionPercentage = Math.min(Math.max(Math.round(rawPos), 8), 92);
  }

  // Step 7: USD Reference Conversion Display
  const usdFxRate = EXCHANGE_RATES[targetCurrency]?.usdRate || 1.0;
  const usdSalaryRounded = targetCurrency === "USD" ? midSalary : Math.round(midSalary / usdFxRate);
  const baseBenchmarkUsdMid = targetCurrency === "USD" ? Math.round(benchRecord.midpoint) : Math.round(benchRecord.midpoint / usdFxRate);

  // Step 8: Multipliers Breakdown
  const formatPercentText = (val: number) => {
    const pct = Math.round((val - 1) * 100);
    return pct >= 0 ? `+${pct}%` : `${pct}%`;
  };

  const multipliersBreakdown: MultipliersBreakdown = {
    baseMarketSalaryUsd: baseBenchmarkUsdMid,
    experienceLabel: expObj.label,
    experiencePercent: "Benchmark Included",
    skillLabel: `${skillObj.label}`,
    skillPercent: formatPercentText(skillObj.multiplier),
    demandLabel: `${taxonomyItem.demandLabel}`,
    demandPercent: formatPercentText(taxonomyItem.demandMultiplier),
    countryLabel: `${locObj.name} (${targetCurrency})`,
    countryFactorText: "Native Market",
    cityLabel: `${cityObj.name} (${benchRecord.cityId ? "City Benchmark" : "Country Benchmark"})`,
    cityFactorText: benchRecord.cityId ? "City Direct" : "Country Fallback",
    usdSalary: usdSalaryRounded,
    finalLocalSalary: midSalary,
  };

  const rangeEstimates: EstimatedSalaryRange = {
    lowEstimate: lowSalary,
    medianEstimate: midSalary,
    highEstimate: highSalary,
  };

  const factors: SalaryFactorsBreakdown = {
    role: taxonomyItem.canonicalName,
    experience: expObj.label,
    location: locObj.name,
    city: cityObj.name,
    skills: skillObj.label,
    demand: taxonomyItem.demandLabel,
  };

  const formattedGap = `${locObj.symbol}${Math.abs(marketGap).toLocaleString()} ${targetCurrency}`;
  const gapExplanation = currentAnnualSalary > 0
    ? marketGap > 0
      ? `Your entered annual compensation is ${formattedGap} below the median local market target (${potentialIncreasePercent > 0 ? `+${potentialIncreasePercent}% gap` : ""}).`
      : `Your entered annual compensation is aligned with or exceeds the regional market midpoint for seniorities in ${cityObj.name}.`
    : `Market estimate computed for ${taxonomyItem.canonicalName} (${expObj.label}) in ${cityObj.name}, ${locObj.name}.`;

  const explanation = `Based on local compensation benchmark data for ${taxonomyItem.canonicalName} (${expObj.label}) in ${cityObj.name}, ${locObj.name}, the target market median is ${locObj.symbol}${midSalary.toLocaleString()} ${targetCurrency}/year. ${gapExplanation}`;

  return {
    jobRole: taxonomyItem.canonicalName,
    currencySymbol: locObj.symbol,
    currencyCode: targetCurrency,
    lowSalary,
    midSalary,
    highSalary,
    estimatedMarketValue: midSalary,
    currentSalary: currentAnnualSalary,
    potentialIncreasePercent,
    marketPosition,
    positionPercentage,
    confidenceScore: confRes.score,
    confidenceReason: confRes.reason,
    privacyNotice:
      "Salary estimates are calculated using our internal benchmark estimation model. No personal information is sent to third-party salary APIs.",
    explanation,
    factors,
    multipliersBreakdown,
    rangeEstimates,
    benchmarkSourceLevel,
    matchedRoleId: benchRecord.roleId,
    matchedRoleName: benchRecord.roleName,
    usedFallback,
    requestedSeniority: validSeniority,
    matchedSeniority: benchRecord.seniority,
    normalizedRoleName: taxonomyItem.canonicalName,
    benchmarkCurrency,
    outputCurrency: targetCurrency,
    fxConversionApplied,
    fxRateUsed,
    fxAsOfDate,
  };
}
