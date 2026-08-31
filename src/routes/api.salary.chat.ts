import { createFileRoute } from "@tanstack/react-router";
import {
  normalizeSalaryInput,
  normalizeExperienceYears,
  type CandidateProfile,
} from "@/lib/salaryCheckState";

export interface SalaryChatRequest {
  conversation: Array<{ role: "user" | "assistant"; content: string }>;
  profile?: Partial<CandidateProfile>;
}

export interface SalaryChatResponse {
  success: boolean;
  message: string;
  updatedProfile: CandidateProfile;
  suggestedChips: string[];
  isComplete: boolean;
}

const DEFAULT_PROFILE: CandidateProfile = {
  role: "",
  experienceYears: null,
  experienceLabel: "",
  location: { city: "", state: "", country: "" },
  currentCompensation: { raw: "", amount: null, currency: "INR", period: "annual", normalizedAnnual: null },
  skills: [],
  companyType: "",
  responsibilities: "",
  education: "",
  seniority: "",
  workMode: "",
  additionalContext: "",
};

const SYSTEM_PROMPT = `You are Venus Hiring's Senior AI Compensation Consultant.

Your role is to conduct a professional, recruiter-style salary interview with the candidate to assess their true market compensation value.

RULES:
1. Be concise, professional, supportive, and conversational.
2. Ask ONE logical question at a time. Do not overwhelm the candidate with long forms or multiple questions.
3. Extract candidate profile information from their natural language responses:
   - role (e.g. "WordPress Developer", "React Developer", "Software Engineer")
   - experienceYears & experienceLabel (e.g. 2, "2 years")
   - location (city, state, country - e.g. "Bhubaneswar", "Odisha", "India")
   - currentCompensation (e.g. "4.2 LPA", "75000 USD", "42000/month")
   - skills (array of tech/skills e.g. ["WordPress", "PHP", "WooCommerce", "Elementor"])
   - companyType (e.g. "Startup", "Small Business", "Enterprise", "Agency", "Freelance")
   - responsibilities (day-to-day work tasks, scope of ownership)
4. Update the candidate profile JSON object with any new information found in the latest message.
5. If vital information is missing, ask for it next:
   - First: Job Role (if missing)
   - Second: Years of Experience (if missing)
   - Third: Location (City, Country) (if missing)
   - Fourth: Current Annual Compensation / CTC (if missing)
   - Fifth: Key Skills & Core Technologies (if missing)
   - Sixth: Day-to-Day Work Responsibilities (if missing)
   - Optional Seventh: Specific technology split or follow-up clarification if material to salary (e.g. custom theme/plugin development for WP, or frontend/backend split for Fullstack).
6. When all core fields (role, experience, location, compensation, skills, responsibilities) are captured, set "isComplete": true and invite the user to verify their profile summary.

OUTPUT SCHEMA:
Return strictly valid JSON only:
{
  "message": "Your next conversational question or confirmation text",
  "updatedProfile": {
    "role": "extracted or updated string",
    "experienceYears": 2,
    "experienceLabel": "2 years",
    "location": { "city": "Bhubaneswar", "state": "Odisha", "country": "India" },
    "currentCompensationRaw": "4.2 LPA",
    "skills": ["WordPress", "PHP", "WooCommerce"],
    "companyType": "Agency",
    "responsibilities": "Custom theme development and client website builds"
  },
  "suggestedChips": ["Chip 1", "Chip 2", "Chip 3"],
  "isComplete": false
}`;

export const Route = createFileRoute("/api/salary/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body: SalaryChatRequest = await request.json();
          const conversation = Array.isArray(body?.conversation) ? body.conversation : [];
          const existingProfile: CandidateProfile = {
            ...DEFAULT_PROFILE,
            ...(body?.profile || {}),
          };

          // 1. Heuristic Profile Extraction from User Input
          const updatedProfile = { ...existingProfile };
          const lastUserMsg = conversation.filter((m) => m.role === "user").slice(-1)[0]?.content || "";

          if (lastUserMsg) {
            // Experience extraction
            if (updatedProfile.experienceYears === null) {
              const expObj = normalizeExperienceYears(lastUserMsg);
              if (expObj.years > 0 || lastUserMsg.toLowerCase().includes("fresher") || lastUserMsg.toLowerCase().includes("0-1")) {
                updatedProfile.experienceYears = expObj.years;
                updatedProfile.experienceLabel = expObj.label;
              }
            }

            // Compensation extraction
            if (!updatedProfile.currentCompensation.normalizedAnnual) {
              const normComp = normalizeSalaryInput(lastUserMsg);
              if (normComp.normalizedAnnual && normComp.normalizedAnnual > 0) {
                updatedProfile.currentCompensation = normComp;
              }
            }
          }

          // 2. Try Groq API for Smart Profile Extraction & Next Question
          const apiKey = process.env.GROQ_API_KEY;
          if (apiKey) {
            try {
              const modelsToTry = ["groq/compound", "groq/compound-mini", "openai/gpt-oss-120b", "openai/gpt-oss-20b"];
              let groqJson = null;

              for (const modelName of modelsToTry) {
                try {
                  const controller = new AbortController();
                  const timeoutId = setTimeout(() => controller.abort(), 6000);

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
                      max_tokens: 600,
                      messages: [
                        { role: "system", content: SYSTEM_PROMPT },
                        { role: "user", content: `CURRENT PROFILE STATE: ${JSON.stringify(updatedProfile)}` },
                        ...conversation.slice(-8).map((m) => ({ role: m.role, content: m.content })),
                      ],
                    }),
                  });

                  clearTimeout(timeoutId);

                  if (res.ok) {
                    groqJson = await res.json();
                    break;
                  }
                } catch {
                  // try next model
                }
              }

              if (groqJson) {
                const rawContent = groqJson.choices?.[0]?.message?.content || "";
                const parsed = JSON.parse(rawContent);

                // Merge extracted profile fields from Groq response safely
                if (parsed.updatedProfile && typeof parsed.updatedProfile === "object") {
                  const p = parsed.updatedProfile;
                  if (p.role && typeof p.role === "string" && p.role.trim()) updatedProfile.role = p.role.trim();
                  if (typeof p.experienceYears === "number") {
                    updatedProfile.experienceYears = p.experienceYears;
                    updatedProfile.experienceLabel = p.experienceLabel || `${p.experienceYears} years`;
                  }
                  if (p.location && typeof p.location === "object") {
                    if (p.location.city) updatedProfile.location.city = String(p.location.city);
                    if (p.location.state) updatedProfile.location.state = String(p.location.state);
                    if (p.location.country) updatedProfile.location.country = String(p.location.country);
                  }
                  if (p.currentCompensationRaw && typeof p.currentCompensationRaw === "string") {
                    updatedProfile.currentCompensation = normalizeSalaryInput(p.currentCompensationRaw);
                  }
                  if (Array.isArray(p.skills) && p.skills.length > 0) {
                    updatedProfile.skills = Array.from(new Set([...updatedProfile.skills, ...p.skills.map(String)]));
                  }
                  if (p.companyType) updatedProfile.companyType = String(p.companyType);
                  if (p.responsibilities) updatedProfile.responsibilities = String(p.responsibilities);
                }

                // Check completeness
                const isComplete = Boolean(
                  updatedProfile.role &&
                  updatedProfile.experienceYears !== null &&
                  (updatedProfile.location.city || updatedProfile.location.country) &&
                  (updatedProfile.currentCompensation.normalizedAnnual || updatedProfile.currentCompensation.raw) &&
                  updatedProfile.skills.length > 0
                );

                return new Response(
                  JSON.stringify({
                    success: true,
                    message: parsed.message || "Thank you. Let's look at your compensation profile.",
                    updatedProfile,
                    suggestedChips: Array.isArray(parsed.suggestedChips) ? parsed.suggestedChips.slice(0, 4) : [],
                    isComplete: Boolean(parsed.isComplete || isComplete),
                  }),
                  { status: 200, headers: { "Content-Type": "application/json" } }
                );
              }
            } catch (groqErr) {
              console.warn("[Groq Chat Assistant Fallback]:", groqErr);
            }
          }

          // 3. Deterministic Fallback Conversation Engine
          let nextMessage = "";
          let suggestedChips: string[] = [];
          let isComplete = false;

          if (!updatedProfile.role) {
            nextMessage = "What role or job title are you currently working in?";
            suggestedChips = ["WordPress Developer", "Software Developer", "UI/UX Designer", "Digital Marketing", "Sales Executive"];
          } else if (updatedProfile.experienceYears === null) {
            nextMessage = `Great. How many years of professional experience do you have as a ${updatedProfile.role}?`;
            suggestedChips = ["0–1 years", "1–2 years", "2–4 years", "4–7 years", "7–10 years", "10+ years"];
          } else if (!updatedProfile.location.city && !updatedProfile.location.country) {
            nextMessage = "Where are you currently based? (City, State, and Country)";
            suggestedChips = ["Bhubaneswar, India", "Bangalore, India", "Toronto, Canada", "San Francisco, USA"];
          } else if (!updatedProfile.currentCompensation.normalizedAnnual && !updatedProfile.currentCompensation.raw) {
            nextMessage = "What is your current annual compensation or CTC?";
            suggestedChips = ["₹4.2 LPA", "₹8.5 LPA", "CAD $65,000", "$95,000 USD"];
          } else if (updatedProfile.skills.length === 0) {
            nextMessage = "What core technologies, frameworks, or skills do you use daily?";
            suggestedChips = ["WordPress, PHP, WooCommerce", "React, TypeScript, Node.js", "Python, AWS, SQL"];
          } else if (!updatedProfile.responsibilities) {
            nextMessage = "Briefly describe your main day-to-day responsibilities and project scope.";
            suggestedChips = ["Custom theme & plugin dev", "Fullstack web app development", "Client project lead"];
          } else {
            nextMessage = "Thank you! I have gathered your full profile details. Please review your profile summary below before we begin live market research.";
            suggestedChips = ["Looks Good →", "Edit Profile"];
            isComplete = true;
          }

          return new Response(
            JSON.stringify({
              success: true,
              message: nextMessage,
              updatedProfile,
              suggestedChips,
              isComplete,
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        } catch (err: unknown) {
          const errMsg = err instanceof Error ? err.message : String(err);
          console.error("[Salary Chat API Error]:", errMsg);
          return new Response(
            JSON.stringify({
              success: false,
              message: "I encountered a minor issue. Please tell me your current job role.",
              updatedProfile: DEFAULT_PROFILE,
              suggestedChips: ["Software Engineer", "WordPress Developer"],
              isComplete: false,
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
      },
    },
  },
});
