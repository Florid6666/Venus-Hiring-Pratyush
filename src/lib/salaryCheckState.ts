export interface CandidateLocation {
  city: string;
  state: string;
  country: string;
}

export interface CurrentCompensation {
  raw: string;
  amount: number | null;
  currency: "INR" | "USD" | "CAD" | string;
  period: "annual" | "monthly";
  normalizedAnnual: number | null;
}

export interface CandidateProfile {
  role: string;
  experienceYears: number | null;
  experienceLabel: string;
  location: CandidateLocation;
  currentCompensation: CurrentCompensation;
  skills: string[];
  companyType: string;
  responsibilities: string;
  education?: string;
  seniority?: string;
  workMode?: string;
  additionalContext?: string;
}

export interface SalaryResearchResult {
  profile: CandidateProfile;
  market: {
    low: number;
    median: number;
    high: number;
    currency: string;
    period: "annual";
  };
  assessment: {
    recommendedMin: number;
    recommendedMax: number;
    negotiationTarget: number;
    marketPosition: "Below Market" | "Around Market" | "Above Market" | "Significantly Above Market";
    potentialUpsidePercent: number;
    confidence: number;
    confidenceReason: string;
  };
  factors: Array<{
    name: string;
    detail: string;
    impact: "Positive" | "Moderate" | "Regional" | "Neutral" | "High Impact";
  }>;
  skillImpact: Array<{
    skill: string;
    impactLevel: "+" | "++" | "+++";
  }>;
  recommendations: string[];
  sources: Array<{
    name: string;
    title: string;
    url: string;
    reason: string;
  }>;
}

export interface ChatStepMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  suggestedChips?: string[];
  timestamp?: number;
}

// -------------------------------------------------------------------------
// SALARY & EXPERIENCE NORMALIZATION UTILITIES
// -------------------------------------------------------------------------

export function normalizeSalaryInput(input: string | number): CurrentCompensation {
  if (typeof input === "number") {
    const validNum = Number.isFinite(input) && input > 0 ? Math.round(input) : null;
    return {
      raw: String(input),
      amount: validNum,
      currency: "INR",
      period: "annual",
      normalizedAnnual: validNum,
    };
  }

  if (!input || typeof input !== "string") {
    return {
      raw: "",
      amount: null,
      currency: "INR",
      period: "annual",
      normalizedAnnual: null,
    };
  }

  const rawStr = input.trim();
  const lower = rawStr.toLowerCase();

  // Detect currency
  let currency = "INR";
  if (lower.includes("$") || lower.includes("usd")) {
    currency = "USD";
  } else if (lower.includes("cad") || lower.includes("c$")) {
    currency = "CAD";
  } else if (lower.includes("eur") || lower.includes("€")) {
    currency = "EUR";
  } else if (lower.includes("gbp") || lower.includes("£")) {
    currency = "GBP";
  } else if (lower.includes("₹") || lower.includes("inr") || lower.includes("lpa") || lower.includes("lakh") || lower.includes("cr")) {
    currency = "INR";
  }

  // Detect period (monthly vs annual)
  const isMonthly = lower.includes("/month") || lower.includes("pm") || lower.includes("monthly") || lower.includes("per month");
  const period: "annual" | "monthly" = isMonthly ? "monthly" : "annual";

  // Parse numeric value
  let normalizedAnnual: number | null = null;
  let parsedAmount: number | null = null;

  // Case 1: Indian LPA notation e.g. "4.2 LPA", "4.2lakhs", "12 LPA", "4.5l"
  const lpaMatch = lower.match(/([\d.]+)\s*(?:lpa|lakh|lakhs|l\b)/);
  if (lpaMatch) {
    const lakhs = parseFloat(lpaMatch[1]);
    if (!isNaN(lakhs) && lakhs > 0) {
      parsedAmount = lakhs * 100000;
      normalizedAnnual = Math.round(parsedAmount);
    }
  }

  // Case 2: Indian Crore notation e.g. "1.2 Cr", "1.2crore"
  if (!normalizedAnnual) {
    const crMatch = lower.match(/([\d.]+)\s*(?:cr|crore|crores\b)/);
    if (crMatch) {
      const crores = parseFloat(crMatch[1]);
      if (!isNaN(crores) && crores > 0) {
        parsedAmount = crores * 10000000;
        normalizedAnnual = Math.round(parsedAmount);
      }
    }
  }

  // Case 3: K notation e.g. "75k", "$85k", "75 k"
  if (!normalizedAnnual) {
    const kMatch = lower.match(/([\d.]+)\s*k\b/);
    if (kMatch) {
      const val = parseFloat(kMatch[1]);
      if (!isNaN(val) && val > 0) {
        parsedAmount = val * 1000;
        normalizedAnnual = period === "monthly" ? Math.round(parsedAmount * 12) : Math.round(parsedAmount);
      }
    }
  }

  // Case 4: Plain numbers or formatted currency numbers e.g. "4,20,000", "75000", "42000/month"
  if (!normalizedAnnual) {
    const digitsOnly = lower.replace(/[^0-9.]/g, "");
    if (digitsOnly) {
      const val = parseFloat(digitsOnly);
      if (!isNaN(val) && val > 0) {
        parsedAmount = val;
        // If amount is small (e.g. 4.2), treat as LPA for INR context
        if (val < 100 && currency === "INR" && !isMonthly) {
          parsedAmount = val * 100000;
        }
        normalizedAnnual = period === "monthly" ? Math.round(parsedAmount * 12) : Math.round(parsedAmount);
      }
    }
  }

  return {
    raw: rawStr,
    amount: parsedAmount,
    currency,
    period,
    normalizedAnnual,
  };
}

export function normalizeExperienceYears(input: string | number): { years: number; label: string } {
  if (typeof input === "number") {
    const safeYears = Math.max(0, Math.min(40, input));
    return { years: safeYears, label: `${safeYears} year${safeYears === 1 ? "" : "s"}` };
  }

  if (!input || typeof input !== "string") {
    return { years: 2, label: "2 years" };
  }

  const str = input.trim().toLowerCase();

  if (str.includes("0-1") || str.includes("fresher") || str.includes("< 1") || str.includes("less than 1")) {
    return { years: 0.5, label: "0–1 years" };
  }
  if (str.includes("1-2") || str.includes("1 to 2")) {
    return { years: 1.5, label: "1–2 years" };
  }
  if (str.includes("2-4") || str.includes("2 to 4") || str.includes("2-3")) {
    return { years: 3, label: "2–4 years" };
  }
  if (str.includes("4-7") || str.includes("4 to 7") || str.includes("5-7")) {
    return { years: 5.5, label: "4–7 years" };
  }
  if (str.includes("7-10") || str.includes("7 to 10") || str.includes("8-10")) {
    return { years: 8.5, label: "7–10 years" };
  }
  if (str.includes("10+") || str.includes("10 +") || str.includes("over 10") || str.includes("> 10")) {
    return { years: 12, label: "10+ years" };
  }

  // Parse natural text e.g. "2 years and 6 months"
  const numbers = str.match(/[\d.]+/g);
  if (numbers && numbers.length > 0) {
    let num = parseFloat(numbers[0]);
    if (numbers.length >= 2 && str.includes("year") && str.includes("month")) {
      const months = parseFloat(numbers[1]);
      if (!isNaN(months)) {
        num = num + months / 12;
      }
    } else if (str.includes("month") && !str.includes("year")) {
      num = num / 12;
    }
    const safeYears = Math.max(0, Math.min(40, Math.round(num * 10) / 10));
    return { years: safeYears, label: `${safeYears} year${safeYears === 1 ? "" : "s"}` };
  }

  return { years: 2, label: "2 years" };
}

export function formatSalaryCurrency(amount: number | null | undefined, currencyCode: string = "INR"): string {
  if (typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0) {
    return "N/A";
  }

  const rounded = Math.round(amount);

  if (currencyCode === "INR") {
    if (rounded >= 10000000) {
      const cr = (rounded / 10000000).toFixed(2).replace(/\.00$/, "").replace(/(\.\d)0$/, "$1");
      return `₹${cr} Cr`;
    }
    if (rounded >= 100000) {
      const lpa = (rounded / 100000).toFixed(1).replace(/\.0$/, "");
      return `₹${lpa} LPA`;
    }
    return `₹${rounded.toLocaleString("en-IN")}`;
  }

  const symbol = currencyCode === "USD" ? "$" : currencyCode === "CAD" ? "C$" : currencyCode === "EUR" ? "€" : currencyCode === "GBP" ? "£" : "$";
  
  if (rounded >= 1000) {
    return `${symbol}${rounded.toLocaleString()} ${currencyCode}`;
  }

  return `${symbol}${rounded.toLocaleString()} ${currencyCode}`;
}
