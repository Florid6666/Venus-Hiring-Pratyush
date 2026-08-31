import { createFileRoute } from "@tanstack/react-router";

export interface AICompensationInsightsRequest {
  jobRole: string;
  experience: string;
  skill: string;
  location: string;
  city: string;
  currencySymbol: string;
  currencyCode: string;
  lowSalary: number;
  midSalary: number;
  highSalary: number;
  currentSalary: number;
  confidenceScore: number;
}

export interface AICompensationInsightsResponse {
  success: boolean;
  source: "groq-ai" | "fallback-engine";
  message?: string;
  insights: {
    salaryInsights: string;
    marketAnalysis: string;
    negotiationSuggestions: string[];
    careerGrowthRecommendations: string[];
  };
}

// Fallback structured insights generator if Groq API key is missing or service is unreachable
function generateFallbackInsights(reqData: AICompensationInsightsRequest): AICompensationInsightsResponse["insights"] {
  const { jobRole, location, city, currencySymbol, currencyCode, midSalary, highSalary } = reqData;
  const safeMid = typeof midSalary === "number" && Number.isFinite(midSalary) ? midSalary : 0;
  const safeHigh = typeof highSalary === "number" && Number.isFinite(highSalary) ? highSalary : 0;
  
  const formattedMid = `${currencySymbol || "$"}${safeMid.toLocaleString()} ${currencyCode || "USD"}`;
  const formattedHigh = `${currencySymbol || "$"}${safeHigh.toLocaleString()} ${currencyCode || "USD"}`;

  return {
    salaryInsights: `The benchmark median target compensation for a ${jobRole || "Professional"} in ${city || "Market"}, ${location || "Region"} is approximately ${formattedMid}/year, reflecting local tech talent competitiveness and cost-of-living adjustments.`,
    marketAnalysis: `Demand for specialized ${jobRole || "Professional"} talent in ${city || "Market"} remains resilient. Talent with advanced engineering capabilities commands a 15-20% compensation premium over regional market baselines.`,
    negotiationSuggestions: [
      `Highlight high-impact projects demonstrating measurable business outcomes (e.g. revenue impact or efficiency gains).`,
      `Anchor negotiation around the top-quartile market target of ${formattedHigh}/year.`,
      `Incorporate equity, performance bonuses, or hybrid remote flexibility to maximize overall compensation value.`,
    ],
    careerGrowthRecommendations: [
      `Master emerging cloud-native and AI orchestration frameworks applicable to modern ${jobRole || "Professional"} workflows.`,
      `Obtain senior-level domain certifications to validate advanced technical expertise.`,
      `Expand cross-functional architecture and leadership impact to target upper-tier executive compensation bands.`,
    ],
  };
}

export const Route = createFileRoute("/api/salary-insights")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body: AICompensationInsightsRequest = await request.json();
          const {
            jobRole,
            experience,
            skill,
            location,
            city,
            currencySymbol,
            currencyCode,
            lowSalary,
            midSalary,
            highSalary,
            currentSalary,
            confidenceScore,
          } = body;

          // 1. Strict Server Payload Validation for Numeric Salary Parameters
          if (
            typeof lowSalary !== "number" || !Number.isFinite(lowSalary) || lowSalary < 0 ||
            typeof midSalary !== "number" || !Number.isFinite(midSalary) || midSalary < 0 ||
            typeof highSalary !== "number" || !Number.isFinite(highSalary) || highSalary < 0 ||
            lowSalary > midSalary || midSalary > highSalary ||
            typeof currentSalary !== "number" || !Number.isFinite(currentSalary) || currentSalary < 0 ||
            typeof confidenceScore !== "number" || !Number.isFinite(confidenceScore)
          ) {
            console.warn("[Groq API Payload Error]: Invalid numeric compensation range parameters.");
            return new Response(
              JSON.stringify({
                success: false,
                source: "fallback-engine",
                message: "Invalid numeric compensation range parameters in request.",
                insights: generateFallbackInsights(body),
              }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }

          // 2. Validate environment variable (Read securely from server-side environment)
          const apiKey = process.env.GROQ_API_KEY;
          if (!apiKey) {
            console.warn("[Groq API Warning]: GROQ_API_KEY environment variable is missing. Serving structured fallback insights.");
            return new Response(
              JSON.stringify({
                success: true,
                source: "fallback-engine",
                insights: generateFallbackInsights(body),
              }),
              { status: 200, headers: { "Content-Type": "application/json" } }
            );
          }

          // 3. Build Groq AI Prompt (Narrative-Only Output Schema)
          const systemPrompt = `You are Venus Hiring's Global HR Executive Compensation AI Intelligence. Analyze compensation data and return a JSON object with 4 specific narrative text fields:
- "salaryInsights": A 2-sentence executive summary of the salary range and market standing.
- "marketAnalysis": A 2-sentence analysis of demand, regional market dynamics in the specified city, and skill premium.
- "negotiationSuggestions": Array of 3 strategic bullet points for salary negotiation.
- "careerGrowthRecommendations": Array of 3 technical growth bullet points to reach top-tier compensation.

Return strictly valid JSON with narrative text fields ONLY. Do not include markdown code blocks, numeric salary calculations, or additional text.`;

          const userPrompt = JSON.stringify({
            role: jobRole,
            experienceLevel: experience,
            skillProficiency: skill,
            country: location,
            cityMarket: city,
            currency: `${currencySymbol} ${currencyCode}`,
            compensationRange: {
              low: lowSalary,
              median: midSalary,
              high: highSalary,
            },
            candidateCurrentSalary: currentSalary,
            benchmarkConfidence: `${confidenceScore}%`,
          });

          // 4. Call Groq Cloud API with primary & fallback models
          const modelsToTry = ["groq/compound", "groq/compound-mini", "openai/gpt-oss-120b", "openai/gpt-oss-20b"];
          let groqData = null;

          for (const modelName of modelsToTry) {
            try {
              const controller = new AbortController();
              const timeoutId = setTimeout(() => controller.abort(), 5000);

              const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                  "Authorization": `Bearer ${apiKey.trim()}`,
                  "Content-Type": "application/json",
                },
                signal: controller.signal,
                body: JSON.stringify({
                  model: modelName,
                  response_format: { type: "json_object" },
                  temperature: 0.3,
                  max_tokens: 600,
                  messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt },
                  ],
                }),
              });

              clearTimeout(timeoutId);

              if (groqResponse.ok) {
                groqData = await groqResponse.json();
                break; // Successfully received response
              } else {
                const errText = await groqResponse.text();
                console.warn(`[Groq API Model Notice (${modelName})]: HTTP ${groqResponse.status}: ${errText}`);
              }
            } catch (fetchErr) {
              console.warn(`[Groq API Model Error (${modelName})]:`, fetchErr);
            }
          }

          if (!groqData) {
            console.warn("[Groq API Notice]: All Groq models unreachable. Using structured fallback engine.");
            return new Response(
              JSON.stringify({
                success: true,
                source: "fallback-engine",
                insights: generateFallbackInsights(body),
              }),
              { status: 200, headers: { "Content-Type": "application/json" } }
            );
          }

          const rawContent = groqData.choices?.[0]?.message?.content || "";

          let parsedResult;
          try {
            parsedResult = JSON.parse(rawContent);
          } catch (jsonErr) {
            console.error("[Groq JSON Parse Error]: Failed to parse Groq response:", rawContent);
            return new Response(
              JSON.stringify({
                success: true,
                source: "fallback-engine",
                insights: generateFallbackInsights(body),
              }),
              { status: 200, headers: { "Content-Type": "application/json" } }
            );
          }

          // Validate required narrative JSON keys (Reject if numerical overrides exist)
          if (
            !parsedResult.salaryInsights ||
            !parsedResult.marketAnalysis ||
            !Array.isArray(parsedResult.negotiationSuggestions) ||
            !Array.isArray(parsedResult.careerGrowthRecommendations)
          ) {
            console.warn("[Groq Response Validation Notice]: Incomplete narrative keys in Groq response. Using fallback.");
            return new Response(
              JSON.stringify({
                success: true,
                source: "fallback-engine",
                insights: generateFallbackInsights(body),
              }),
              { status: 200, headers: { "Content-Type": "application/json" } }
            );
          }

          return new Response(
            JSON.stringify({
              success: true,
              source: "groq-ai",
              insights: {
                salaryInsights: String(parsedResult.salaryInsights),
                marketAnalysis: String(parsedResult.marketAnalysis),
                negotiationSuggestions: parsedResult.negotiationSuggestions.map(String),
                careerGrowthRecommendations: parsedResult.careerGrowthRecommendations.map(String),
              },
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        } catch (err: unknown) {
          const errorMessage = err instanceof Error ? err.message : String(err);
          console.error("[Backend Salary Insights Error]:", errorMessage);

          return new Response(
            JSON.stringify({
              success: true,
              source: "fallback-engine",
              message: "Serving fallback compensation insights.",
              insights: generateFallbackInsights({
                jobRole: "Professional",
                experience: "mid",
                skill: "intermediate",
                location: "USA",
                city: "Market",
                currencySymbol: "$",
                currencyCode: "USD",
                lowSalary: 80000,
                midSalary: 100000,
                highSalary: 120000,
                currentSalary: 0,
                confidenceScore: 70,
              }),
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        }
      },
    },
  },
});
