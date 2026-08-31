import { createFileRoute } from "@tanstack/react-router";
import {
  calculateSalaryRange,
  type CountryId,
} from "@/data/salaryData";
import {
  formatSalaryCurrency,
  type CandidateProfile,
  type SalaryResearchResult,
} from "@/lib/salaryCheckState";

export interface SalaryResearchRequest {
  profile: CandidateProfile;
}

export interface SalaryResearchResponse {
  success: boolean;
  source: "groq-ai" | "fallback-engine";
  result: SalaryResearchResult;
}

function buildFallbackResearchResult(profile: CandidateProfile): SalaryResearchResult {
  const roleInput = profile.role || "Software Developer";
  const expYears = profile.experienceYears ?? 2;
  const cityInput = profile.location.city || "Bangalore";
  const countryInput = profile.location.country || "India";

  // Map to deterministic engine seniority & country
  let seniorityId: "fresher" | "junior" | "mid" | "senior" | "expert" = "mid";
  if (expYears <= 1) seniorityId = "fresher";
  else if (expYears <= 3) seniorityId = "junior";
  else if (expYears <= 6) seniorityId = "mid";
  else if (expYears <= 9) seniorityId = "senior";
  else seniorityId = "expert";

  let countryId: CountryId = "india";
  const countryLower = countryInput.toLowerCase();
  if (countryLower.includes("usa") || countryLower.includes("united states")) countryId = "usa";
  else if (countryLower.includes("canada")) countryId = "canada";
  else if (countryLower.includes("remote")) countryId = "remote";
  else countryId = "india";

  const currentSalaryNum = profile.currentCompensation.normalizedAnnual || 420000;

  // Run deterministic calculation engine
  const deterministicRes = calculateSalaryRange(
    roleInput,
    seniorityId,
    "intermediate",
    countryId,
    cityInput.toLowerCase(),
    currentSalaryNum
  );

  const low = deterministicRes.lowSalary;
  const mid = deterministicRes.midSalary;
  const high = deterministicRes.highSalary;
  const currency = deterministicRes.currencyCode;

  const currentAnnual = profile.currentCompensation.normalizedAnnual || currentSalaryNum;
  const diffPercent = Math.round(((mid - currentAnnual) / currentAnnual) * 100);

  let marketPos: "Below Market" | "Around Market" | "Above Market" | "Significantly Above Market" = "Around Market";
  if (currentAnnual < low * 0.95) {
    marketPos = "Below Market";
  } else if (currentAnnual > high * 1.1) {
    marketPos = "Significantly Above Market";
  } else if (currentAnnual > high * 0.95) {
    marketPos = "Above Market";
  }

  const recMin = Math.round(low * 1.02);
  const recMax = Math.round(high * 0.98);
  const negTarget = Math.round(high * 1.05);

  const skillsList = profile.skills.length > 0 ? profile.skills : ["Core Technologies", "Problem Solving"];

  return {
    profile,
    market: {
      low,
      median: mid,
      high,
      currency,
      period: "annual",
    },
    assessment: {
      recommendedMin: recMin,
      recommendedMax: recMax,
      negotiationTarget: negTarget,
      marketPosition: marketPos,
      potentialUpsidePercent: Math.max(0, diffPercent),
      confidence: deterministicRes.confidenceScore || 85,
      confidenceReason: `Assessment calibrated against ${deterministicRes.benchmarkSourceLevel.replace(/_/g, " ")} baseline dataset.`,
    },
    factors: [
      {
        name: "Experience",
        detail: `${profile.experienceLabel || expYears + " years"} of relevant professional experience.`,
        impact: expYears >= 5 ? "Positive" : "Moderate",
      },
      {
        name: "Key Skills",
        detail: `Specialization in ${skillsList.join(", ")}.`,
        impact: "Positive",
      },
      {
        name: "Location",
        detail: `${cityInput}, ${countryInput} market baseline applied.`,
        impact: "Regional",
      },
      {
        name: "Responsibilities",
        detail: profile.responsibilities || "Standard role responsibilities.",
        impact: "Neutral",
      },
    ],
    skillImpact: skillsList.slice(0, 5).map((s, idx) => ({
      skill: s,
      impactLevel: idx === 0 ? "+++" : idx === 1 ? "++" : "+",
    })),
    recommendations: [
      `Expand expertise in high-demand ${roleInput} architecture and modern tooling.`,
      `Demonstrate measurable business outcomes (e.g. system performance gains or revenue contribution) in salary negotiations.`,
      `Target upper-quartile compensation bands by pursuing lead-level project ownership.`,
    ],
    sources: [
      {
        name: "Venus HR Benchmark Index",
        title: `${roleInput} Market Benchmark Index (${currency})`,
        url: "https://www.venushiring.ca/salary-calculator",
        reason: "Aggregated recruitment placement and compensation baseline data.",
      },
      {
        name: "Regional Hiring Placement Data",
        title: `${cityInput} Tech Talent Compensation Report`,
        url: "https://www.venushiring.ca/careers",
        reason: "Verified active job placement and salary bands.",
      },
    ],
  };
}

const GROQ_RESEARCH_SYSTEM_PROMPT = `You are a compensation market research specialist.

Your job is to research the current compensation market for the candidate described below.
Do NOT simply estimate salary from general model knowledge alone. Use active market context.

Research multiple relevant factors:
1. Recent market job postings
2. Current salary information
3. Location-specific compensation data
4. Role-specific compensation
5. Experience-level compensation
6. Current hiring demand
7. Skill premiums
8. Comparable job titles

Candidate profile provided:
ROLE: {{role}}
EXPERIENCE: {{experience}}
LOCATION: {{location}}
CURRENT COMPENSATION: {{current_compensation}}
SKILLS: {{skills}}
COMPANY TYPE: {{company_type}}
RESPONSIBILITIES: {{responsibilities}}

Return strictly valid JSON matching this schema:
{
  "marketLow": 500000,
  "marketMedian": 600000,
  "marketHigh": 750000,
  "currency": "INR",
  "recommendedMin": 540000,
  "recommendedMax": 650000,
  "negotiationTarget": 700000,
  "marketPosition": "Below Market" | "Around Market" | "Above Market" | "Significantly Above Market",
  "potentialUpsidePercent": 25,
  "confidence": 86,
  "confidenceReason": "Explanation of confidence score",
  "factors": [
    { "name": "Experience", "detail": "Detail text", "impact": "Positive" | "Moderate" | "Regional" | "Neutral" | "High Impact" }
  ],
  "skillImpact": [
    { "skill": "Skill Name", "impactLevel": "+" | "++" | "+++" }
  ],
  "recommendations": [
    "Personalized recommendation 1",
    "Personalized recommendation 2"
  ],
  "sources": [
    { "name": "Source Name", "title": "Page Title", "url": "https://...", "reason": "Why relevant" }
  ]
}`;

export const Route = createFileRoute("/api/salary/research")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body: SalaryResearchRequest = await request.json();
          if (!body || !body.profile) {
            return new Response(
              JSON.stringify({
                success: false,
                source: "fallback-engine",
                message: "Missing candidate profile.",
              }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }

          const profile = body.profile;
          const fallbackResult = buildFallbackResearchResult(profile);

          const apiKey = process.env.GROQ_API_KEY;
          if (!apiKey) {
            console.warn("[Groq Research Warning]: GROQ_API_KEY is missing. Serving deterministic research baseline.");
            return new Response(
              JSON.stringify({
                success: true,
                source: "fallback-engine",
                result: fallbackResult,
              }),
              { status: 200, headers: { "Content-Type": "application/json" } }
            );
          }

          // Build Groq Prompt with profile details
          const prompt = GROQ_RESEARCH_SYSTEM_PROMPT
            .replace("{{role}}", profile.role || "Software Developer")
            .replace("{{experience}}", profile.experienceLabel || `${profile.experienceYears || 2} years`)
            .replace("{{location}}", `${profile.location.city || "Bangalore"}, ${profile.location.country || "India"}`)
            .replace("{{current_compensation}}", profile.currentCompensation.raw || `${profile.currentCompensation.normalizedAnnual} ${profile.currentCompensation.currency}`)
            .replace("{{skills}}", profile.skills.join(", ") || "General Development")
            .replace("{{company_type}}", profile.companyType || "General Tech")
            .replace("{{responsibilities}}", profile.responsibilities || "Software Development");

          const modelsToTry = ["groq/compound", "groq/compound-mini", "openai/gpt-oss-120b", "openai/gpt-oss-20b"];
          let groqData = null;

          for (const modelName of modelsToTry) {
            try {
              const controller = new AbortController();
              const timeoutId = setTimeout(() => controller.abort(), 8000);

              const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${apiKey.trim()}`,
                  "Content-Type": "application/json",
                },
                signal: controller.signal,
                body: JSON.stringify({
                  model: modelName,
                  response_format: { type: "json_object" },
                  temperature: 0.3,
                  max_tokens: 1200,
                  messages: [
                    { role: "system", content: prompt },
                    { role: "user", content: `Perform market compensation research for candidate: ${JSON.stringify(profile)}` },
                  ],
                }),
              });

              clearTimeout(timeoutId);

              if (res.ok) {
                groqData = await res.json();
                break;
              }
            } catch {
              // Try next model
            }
          }

          if (!groqData) {
            return new Response(
              JSON.stringify({
                success: true,
                source: "fallback-engine",
                result: fallbackResult,
              }),
              { status: 200, headers: { "Content-Type": "application/json" } }
            );
          }

          const rawContent = groqData.choices?.[0]?.message?.content || "";
          let parsed: any = {};
          try {
            parsed = JSON.parse(rawContent);
          } catch {
            return new Response(
              JSON.stringify({
                success: true,
                source: "fallback-engine",
                result: fallbackResult,
              }),
              { status: 200, headers: { "Content-Type": "application/json" } }
            );
          }

          // Combine Groq Research findings with deterministic bounds for sanity & ordering
          const low = typeof parsed.marketLow === "number" && parsed.marketLow > 0 ? parsed.marketLow : fallbackResult.market.low;
          const median = typeof parsed.marketMedian === "number" && parsed.marketMedian >= low ? parsed.marketMedian : fallbackResult.market.median;
          const high = typeof parsed.marketHigh === "number" && parsed.marketHigh >= median ? parsed.marketHigh : fallbackResult.market.high;
          const currency = typeof parsed.currency === "string" && parsed.currency.trim() ? parsed.currency.trim() : fallbackResult.market.currency;

          const recMin = typeof parsed.recommendedMin === "number" && parsed.recommendedMin > 0 ? parsed.recommendedMin : fallbackResult.assessment.recommendedMin;
          const recMax = typeof parsed.recommendedMax === "number" && parsed.recommendedMax >= recMin ? parsed.recommendedMax : fallbackResult.assessment.recommendedMax;
          const negTarget = typeof parsed.negotiationTarget === "number" && parsed.negotiationTarget >= recMax ? parsed.negotiationTarget : fallbackResult.assessment.negotiationTarget;

          const currentAnnual = profile.currentCompensation.normalizedAnnual || 0;
          const upside = currentAnnual > 0 ? Math.max(0, Math.round(((median - currentAnnual) / currentAnnual) * 100)) : fallbackResult.assessment.potentialUpsidePercent;

          const mergedResult: SalaryResearchResult = {
            profile,
            market: {
              low,
              median,
              high,
              currency,
              period: "annual",
            },
            assessment: {
              recommendedMin: recMin,
              recommendedMax: recMax,
              negotiationTarget: negTarget,
              marketPosition: parsed.marketPosition || fallbackResult.assessment.marketPosition,
              potentialUpsidePercent: upside,
              confidence: typeof parsed.confidence === "number" ? Math.min(Math.max(parsed.confidence, 40), 96) : fallbackResult.assessment.confidence,
              confidenceReason: parsed.confidenceReason || fallbackResult.assessment.confidenceReason,
            },
            factors: Array.isArray(parsed.factors) && parsed.factors.length > 0 ? parsed.factors : fallbackResult.factors,
            skillImpact: Array.isArray(parsed.skillImpact) && parsed.skillImpact.length > 0 ? parsed.skillImpact : fallbackResult.skillImpact,
            recommendations: Array.isArray(parsed.recommendations) && parsed.recommendations.length > 0 ? parsed.recommendations : fallbackResult.recommendations,
            sources: Array.isArray(parsed.sources) && parsed.sources.length > 0 ? parsed.sources : fallbackResult.sources,
          };

          return new Response(
            JSON.stringify({
              success: true,
              source: "groq-ai",
              result: mergedResult,
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        } catch (err: unknown) {
          const errMsg = err instanceof Error ? err.message : String(err);
          console.error("[Salary Research API Error]:", errMsg);

          return new Response(
            JSON.stringify({
              success: true,
              source: "fallback-engine",
              result: buildFallbackResearchResult((await request.json()).profile),
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        }
      },
    },
  },
});
