import {
  EXPERIENCE_LEVELS,
  SKILL_LEVELS,
  LOCATIONS,
  getCitiesForCountry,
  calculateSalaryRange,
  type SalaryCalculationResult,
} from "@/data/salaryData";

export type SalaryAssistantContext = {
  contextId: string;
  createdAt: number;
  jobRole: string;
  experience: string;
  skillLevel: string;
  country: string;
  city: string;
  currentSalary: number;
  currencyCode: "USD" | "CAD" | "INR";
  currencySymbol: string;
  estimatedLow: number;
  estimatedMid: number;
  estimatedHigh: number;
  confidenceScore: number;
  benchmarkSourceLevel: string;
  exactRoleInput: string;
  experienceId?: string;
  skillLevelId?: string;
  countryId?: string;
  cityId?: string;
};

export type SalaryAssistantResult = {
  contextId: string;
  createdAt: number;
  source: "groq-ai" | "fallback-engine";
  exactRoleInput: string;
  message: string;
  suggestedQuestions: string[];
};

const SALARY_ASSISTANT_CONTEXT_PREFIX = "venus_salary_assistant_context_";
const SALARY_ASSISTANT_RESULT_PREFIX = "venus_salary_assistant_result_";
const CONTEXT_EXPIRATION_MS = 30 * 60 * 1000; // 30 minutes expiration

export function isValidSalaryAssistantContext(value: any): value is SalaryAssistantContext {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;

  const now = Date.now();
  const {
    contextId,
    createdAt,
    jobRole,
    experience,
    skillLevel,
    country,
    city,
    currentSalary,
    currencyCode,
    currencySymbol,
    estimatedLow,
    estimatedMid,
    estimatedHigh,
    confidenceScore,
    benchmarkSourceLevel,
    exactRoleInput,
  } = value;

  if (typeof contextId !== "string" || !contextId.trim()) return false;
  if (typeof createdAt !== "number" || !Number.isFinite(createdAt) || createdAt <= 0) return false;
  if (now - createdAt > CONTEXT_EXPIRATION_MS || createdAt > now + 60000) return false;

  if (typeof jobRole !== "string" || !jobRole.trim()) return false;
  if (typeof experience !== "string" || !experience.trim()) return false;
  if (typeof skillLevel !== "string" || !skillLevel.trim()) return false;
  if (typeof country !== "string" || !country.trim()) return false;
  if (typeof city !== "string" || !city.trim()) return false;

  if (typeof currentSalary !== "number" || !Number.isFinite(currentSalary) || currentSalary < 0) return false;
  if (typeof currencyCode !== "string" || !["USD", "CAD", "INR"].includes(currencyCode)) return false;
  if (typeof currencySymbol !== "string" || !currencySymbol.trim()) return false;

  if (typeof estimatedLow !== "number" || !Number.isFinite(estimatedLow) || estimatedLow < 0) return false;
  if (typeof estimatedMid !== "number" || !Number.isFinite(estimatedMid) || estimatedMid < estimatedLow) return false;
  if (typeof estimatedHigh !== "number" || !Number.isFinite(estimatedHigh) || estimatedHigh < estimatedMid) return false;

  if (typeof confidenceScore !== "number" || !Number.isFinite(confidenceScore)) return false;
  if (typeof benchmarkSourceLevel !== "string" || !benchmarkSourceLevel.trim()) return false;
  if (typeof exactRoleInput !== "string" || !exactRoleInput.trim()) return false;

  return true;
}

export function isValidSalaryAssistantResult(value: any): value is SalaryAssistantResult {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;

  const now = Date.now();
  const { contextId, createdAt, source, exactRoleInput, message, suggestedQuestions } = value;

  if (typeof contextId !== "string" || !contextId.trim()) return false;
  if (typeof createdAt !== "number" || !Number.isFinite(createdAt) || createdAt <= 0) return false;
  if (now - createdAt > CONTEXT_EXPIRATION_MS || createdAt > now + 60000) return false;

  if (source !== "groq-ai" && source !== "fallback-engine") return false;
  if (typeof exactRoleInput !== "string" || !exactRoleInput.trim()) return false;
  if (typeof message !== "string" || !message.trim()) return false;
  if (!Array.isArray(suggestedQuestions)) return false;
  if (!suggestedQuestions.every((q) => typeof q === "string")) return false;

  return true;
}

export function isMatchingAssistantContextAndResult(
  context: SalaryAssistantContext,
  result: SalaryAssistantResult,
  contextId: string
): boolean {
  if (!isValidSalaryAssistantContext(context)) return false;
  if (!isValidSalaryAssistantResult(result)) return false;
  if (context.contextId !== contextId) return false;
  if (result.contextId !== contextId) return false;
  if (context.exactRoleInput !== result.exactRoleInput) return false;
  return true;
}

export function saveSalaryAssistantContext(context: SalaryAssistantContext): void {
  if (typeof window === "undefined" || !context || !context.contextId) return;
  try {
    const key = `${SALARY_ASSISTANT_CONTEXT_PREFIX}${context.contextId}`;
    const payload = JSON.stringify(context);
    sessionStorage.setItem(key, payload);
    clearExpiredSalaryAssistantData();
  } catch (e) {
    console.warn("[Salary Context Storage Warning]: Failed to save context.", e);
  }
}

export function getSalaryAssistantContext(contextId: string): SalaryAssistantContext | null {
  if (typeof window === "undefined" || !contextId) return null;
  try {
    const key = `${SALARY_ASSISTANT_CONTEXT_PREFIX}${contextId}`;
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!isValidSalaryAssistantContext(parsed)) {
      sessionStorage.removeItem(key);
      return null;
    }

    return parsed;
  } catch (e) {
    console.warn("[Salary Context Storage Warning]: Failed to read context.", e);
    return null;
  }
}

export function saveSalaryAssistantResult(contextId: string, result: SalaryAssistantResult): void {
  if (typeof window === "undefined" || !contextId || !result) return;
  try {
    const key = `${SALARY_ASSISTANT_RESULT_PREFIX}${contextId}`;
    const payload = JSON.stringify(result);
    sessionStorage.setItem(key, payload);
  } catch (e) {
    console.warn("[Salary Result Storage Warning]: Failed to save result.", e);
  }
}

export function getSalaryAssistantResult(contextId: string): SalaryAssistantResult | null {
  if (typeof window === "undefined" || !contextId) return null;
  try {
    const key = `${SALARY_ASSISTANT_RESULT_PREFIX}${contextId}`;
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!isValidSalaryAssistantResult(parsed)) {
      sessionStorage.removeItem(key);
      return null;
    }

    return parsed;
  } catch (e) {
    console.warn("[Salary Result Storage Warning]: Failed to read result.", e);
    return null;
  }
}

export function saveAssistantResultForContext(
  contextId: string | null,
  exactRoleInput: string | undefined,
  result: {
    source: "groq-ai" | "fallback-engine";
    message: string;
    suggestedQuestions: string[];
  }
): void {
  if (typeof window === "undefined" || !contextId) return;
  const payload: SalaryAssistantResult = {
    contextId,
    createdAt: Date.now(),
    source: result.source,
    exactRoleInput: exactRoleInput || "User Role",
    message: result.message,
    suggestedQuestions: Array.isArray(result.suggestedQuestions) ? result.suggestedQuestions : [],
  };
  saveSalaryAssistantResult(contextId, payload);
}

export function mapExperienceToId(expStr: string): string {
  const found = EXPERIENCE_LEVELS.find(
    (e) => e.id === expStr || e.label.toLowerCase() === expStr.toLowerCase()
  );
  if (found) return found.id;
  const lower = expStr.toLowerCase();
  if (lower.includes("fresher")) return "fresher";
  if (lower.includes("junior")) return "junior";
  if (lower.includes("senior")) return "senior";
  if (lower.includes("expert") || lower.includes("lead")) return "expert";
  return "mid";
}

export function mapSkillToId(skillStr: string): string {
  const found = SKILL_LEVELS.find(
    (s) => s.id === skillStr || s.label.toLowerCase() === skillStr.toLowerCase()
  );
  if (found) return found.id;
  const lower = skillStr.toLowerCase();
  if (lower.includes("beginner")) return "beginner";
  if (lower.includes("advanced")) return "advanced";
  if (lower.includes("expert")) return "expert";
  return "intermediate";
}

export function mapCountryToId(countryStr: string): string {
  const found = LOCATIONS.find(
    (l) => l.id === countryStr.toLowerCase() || l.name.toLowerCase() === countryStr.toLowerCase()
  );
  if (found) return found.id;
  const lower = countryStr.toLowerCase();
  if (lower.includes("usa") || lower.includes("united states")) return "usa";
  if (lower.includes("canada")) return "canada";
  if (lower.includes("india")) return "india";
  if (lower.includes("remote")) return "remote";
  return "canada";
}

export function mapCityToId(countryId: string, cityStr: string): string {
  const cities = getCitiesForCountry(countryId);
  const found = cities.find(
    (c) => c.id === cityStr.toLowerCase() || c.name.toLowerCase() === cityStr.toLowerCase()
  );
  if (found) return found.id;
  const lower = cityStr.toLowerCase();
  const partial = cities.find((c) => c.name.toLowerCase().includes(lower) || lower.includes(c.name.toLowerCase()));
  if (partial) return partial.id;
  return cities[0]?.id || "toronto";
}

export function restoreCalculatorFromAssistantContext(
  context: SalaryAssistantContext
): {
  formState: {
    selectedRole: string;
    selectedExp: string;
    selectedSkill: string;
    selectedLocation: string;
    selectedCity: string;
    currentSalaryInput: string;
  };
  calcResult: SalaryCalculationResult;
} {
  const expId = context.experienceId || mapExperienceToId(context.experience);
  const skillId = context.skillLevelId || mapSkillToId(context.skillLevel);
  const countryId = context.countryId || mapCountryToId(context.country);
  const cityId = context.cityId || mapCityToId(countryId, context.city);

  const calcResult = calculateSalaryRange(
    context.exactRoleInput,
    expId,
    skillId,
    countryId,
    cityId,
    context.currentSalary
  );

  return {
    formState: {
      selectedRole: context.exactRoleInput,
      selectedExp: expId,
      selectedSkill: skillId,
      selectedLocation: countryId,
      selectedCity: cityId,
      currentSalaryInput: context.currentSalary.toString(),
    },
    calcResult,
  };
}

export function isValidCalculatorResult(result: any): boolean {
  if (!result || typeof result !== "object") return false;
  const { lowSalary, midSalary, highSalary, currencyCode, jobRole, benchmarkSourceLevel } = result;
  return (
    typeof lowSalary === "number" && Number.isFinite(lowSalary) && lowSalary >= 0 &&
    typeof midSalary === "number" && Number.isFinite(midSalary) && midSalary >= lowSalary &&
    typeof highSalary === "number" && Number.isFinite(highSalary) && highSalary >= midSalary &&
    typeof currencyCode === "string" && ["USD", "CAD", "INR"].includes(currencyCode) &&
    typeof jobRole === "string" && jobRole.trim().length > 0 &&
    typeof benchmarkSourceLevel === "string" && benchmarkSourceLevel.trim().length > 0
  );
}

export function clearExpiredSalaryAssistantData(): void {
  if (typeof window === "undefined") return;
  try {
    const now = Date.now();
    const keysToRemove: string[] = [];

    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (
        key &&
        (key.startsWith(SALARY_ASSISTANT_CONTEXT_PREFIX) || key.startsWith(SALARY_ASSISTANT_RESULT_PREFIX))
      ) {
        const raw = sessionStorage.getItem(key);
        if (raw) {
          try {
            const item = JSON.parse(raw);
            if (key.startsWith(SALARY_ASSISTANT_CONTEXT_PREFIX)) {
              if (!isValidSalaryAssistantContext(item)) {
                keysToRemove.push(key);
              }
            } else if (key.startsWith(SALARY_ASSISTANT_RESULT_PREFIX)) {
              if (!isValidSalaryAssistantResult(item)) {
                keysToRemove.push(key);
              }
            }
          } catch {
            keysToRemove.push(key);
          }
        }
      }
    }

    keysToRemove.forEach((k) => sessionStorage.removeItem(k));
  } catch (e) {
    console.warn("[Salary Data Storage Cleanup Notice]:", e);
  }
}

export function generateContextId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `ctx_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

export function buildContextPrompt(ctx: SalaryAssistantContext): string {
  return `Please review this salary-calculator result.

Exact job role entered by the user: ${ctx.exactRoleInput}
Normalized calculator role: ${ctx.jobRole}
Experience: ${ctx.experience}
Skill level: ${ctx.skillLevel}
Location: ${ctx.city}, ${ctx.country}
Current annual salary: ${ctx.currencySymbol}${ctx.currentSalary.toLocaleString()} ${ctx.currencyCode}
Calculator range: ${ctx.currencySymbol}${ctx.estimatedLow.toLocaleString()}–${ctx.currencySymbol}${ctx.estimatedHigh.toLocaleString()} ${ctx.currencyCode}
Calculator midpoint: ${ctx.currencySymbol}${ctx.estimatedMid.toLocaleString()} ${ctx.currencyCode}
Calculator confidence: ${ctx.confidenceScore}%
Benchmark source level: ${ctx.benchmarkSourceLevel}

Do not replace the user’s exact role with another role. Explain whether this benchmark is appropriate for the exact role, what assumptions or limitations apply, and give practical negotiation guidance. Do not alter the calculator’s numerical values.`;
}

