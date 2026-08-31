import { createFileRoute } from "@tanstack/react-router";

export interface SalaryAssistantMessage {
  role: "user" | "assistant";
  content: string;
}

export interface SalaryAssistantRequest {
  messages: SalaryAssistantMessage[];
}

export interface SalaryAssistantResponse {
  success: boolean;
  source: "groq-ai" | "fallback-engine";
  message: string;
  suggestedQuestions: string[];
}

const FALLBACK_RESPONSE: SalaryAssistantResponse = {
  success: true,
  source: "fallback-engine",
  message:
    "I’m unable to generate a personalized AI response right now. Please share your exact role, experience, country/city, current annual compensation, and target salary, and a recruitment specialist can help you assess it.",
  suggestedQuestions: [
    "How should I describe my role for salary benchmarking?",
    "What information helps assess my market salary?",
    "How can I prepare for a salary negotiation?",
  ],
};

const GROQ_SYSTEM_PROMPT = `You are Venus Hiring’s AI Salary Assistant.

Your job is to help users understand compensation context, career positioning, and salary negotiation preparation.

Rules:
1. Preserve the user’s exact job title and specialization. Do not silently replace it with another role.
2. If you must use a broader comparison category, say clearly that it is a broad comparison, not an exact role match.
3. Do not claim access to real-time salary databases, private payroll data, verified market surveys, company compensation bands, or job offers unless that information is provided directly by the user.
4. Do not present generated salary figures as facts or guarantees.
5. If the user asks for a salary estimate, provide a clearly labeled estimated range only when enough context is available. Explain the assumptions used.
6. Ask for missing essentials before estimating: exact role, seniority/years, country/city, employment type, current annual compensation, core technologies, and target role/company type.
7. Clearly distinguish annual, monthly, hourly, and total compensation. Never assume salary frequency.
8. Never calculate or recommend compensation using protected characteristics such as age, gender, race, religion, disability, nationality, caste, marital status, or other sensitive traits.
9. Do not provide legal, tax, immigration, or financial-advice claims. Encourage users to consult a qualified professional for those topics.
10. Keep answers practical, concise, supportive, and specific.
11. Provide negotiation suggestions, skill-development ideas, and clarifying questions when helpful.
12. Format every response with these sections when enough information is available:
    - Role Understood:
    - Market Context:
    - Salary Perspective:
    - Negotiation Strategy:
    - Best Next Step:
13. If information is insufficient, do not invent numbers. Ask one to three focused follow-up questions.

OUTPUT SCHEMA:
Return strictly valid JSON only with two keys:
{
  "message": "Your detailed, formatted Markdown response string",
  "suggestedQuestions": ["Question 1", "Question 2", "Question 3"]
}`;

export const Route = createFileRoute("/api/salary-assistant")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body: SalaryAssistantRequest = await request.json();

          // 1. Validate Payload Contract
          if (!body || !Array.isArray(body.messages)) {
            return new Response(
              JSON.stringify({
                success: false,
                source: "fallback-engine",
                message: "Invalid payload: 'messages' must be an array.",
                suggestedQuestions: FALLBACK_RESPONSE.suggestedQuestions,
              }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }

          if (body.messages.length === 0 || body.messages.length > 20) {
            return new Response(
              JSON.stringify({
                success: false,
                source: "fallback-engine",
                message: "Invalid payload: 'messages' length must be between 1 and 20.",
                suggestedQuestions: FALLBACK_RESPONSE.suggestedQuestions,
              }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }

          for (const msg of body.messages) {
            if (!msg || typeof msg !== "object") {
              return new Response(
                JSON.stringify({
                  success: false,
                  source: "fallback-engine",
                  message: "Invalid payload: message must be an object.",
                  suggestedQuestions: FALLBACK_RESPONSE.suggestedQuestions,
                }),
                { status: 400, headers: { "Content-Type": "application/json" } }
              );
            }
            if (msg.role !== "user" && msg.role !== "assistant") {
              return new Response(
                JSON.stringify({
                  success: false,
                  source: "fallback-engine",
                  message: "Invalid payload: role must be 'user' or 'assistant'.",
                  suggestedQuestions: FALLBACK_RESPONSE.suggestedQuestions,
                }),
                { status: 400, headers: { "Content-Type": "application/json" } }
              );
            }
            if (typeof msg.content !== "string" || msg.content.trim() === "") {
              return new Response(
                JSON.stringify({
                  success: false,
                  source: "fallback-engine",
                  message: "Invalid payload: message content must be a non-empty string.",
                  suggestedQuestions: FALLBACK_RESPONSE.suggestedQuestions,
                }),
                { status: 400, headers: { "Content-Type": "application/json" } }
              );
            }
            if (msg.content.length > 3000) {
              return new Response(
                JSON.stringify({
                  success: false,
                  source: "fallback-engine",
                  message: "Invalid payload: message content exceeds maximum length of 3000 characters.",
                  suggestedQuestions: FALLBACK_RESPONSE.suggestedQuestions,
                }),
                { status: 400, headers: { "Content-Type": "application/json" } }
              );
            }
          }

          // 2. Read Server API Key
          const apiKey = process.env.GROQ_API_KEY;
          if (!apiKey) {
            console.warn("[Groq Assistant Warning]: GROQ_API_KEY environment variable is missing.");
            return new Response(JSON.stringify(FALLBACK_RESPONSE), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            });
          }

          // 3. Format Groq API Messages Array
          const formattedMessages = [
            { role: "system", content: GROQ_SYSTEM_PROMPT },
            ...body.messages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          ];

          // 4. Call Groq Cloud API with Fallback Models
          const modelsToTry = ["groq/compound", "groq/compound-mini", "openai/gpt-oss-120b", "openai/gpt-oss-20b"];
          let groqData = null;

          for (const modelName of modelsToTry) {
            try {
              const controller = new AbortController();
              const timeoutId = setTimeout(() => controller.abort(), 8000);

              const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${apiKey.trim()}`,
                  "Content-Type": "application/json",
                },
                signal: controller.signal,
                body: JSON.stringify({
                  model: modelName,
                  response_format: { type: "json_object" },
                  temperature: 0.4,
                  max_tokens: 1000,
                  messages: formattedMessages,
                }),
              });

              clearTimeout(timeoutId);

              if (groqResponse.ok) {
                groqData = await groqResponse.json();
                break;
              } else {
                const errText = await groqResponse.text();
                console.warn(`[Groq Assistant Model Notice (${modelName})]: HTTP ${groqResponse.status}: ${errText}`);
              }
            } catch (fetchErr) {
              console.warn(`[Groq Assistant Model Error (${modelName})]:`, fetchErr);
            }
          }

          if (!groqData) {
            console.warn("[Groq Assistant Notice]: Groq API call failed. Returning fallback engine response.");
            return new Response(JSON.stringify(FALLBACK_RESPONSE), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            });
          }

          const rawContent = groqData.choices?.[0]?.message?.content || "";
          let parsedResult: { message?: string; suggestedQuestions?: string[] };

          try {
            parsedResult = JSON.parse(rawContent);
          } catch {
            // If model returned plain string instead of JSON object
            parsedResult = {
              message: rawContent,
              suggestedQuestions: FALLBACK_RESPONSE.suggestedQuestions,
            };
          }

          const responseMsg = parsedResult.message || rawContent || FALLBACK_RESPONSE.message;
          const questions = Array.isArray(parsedResult.suggestedQuestions)
            ? parsedResult.suggestedQuestions.map(String).slice(0, 3)
            : FALLBACK_RESPONSE.suggestedQuestions;

          return new Response(
            JSON.stringify({
              success: true,
              source: "groq-ai",
              message: responseMsg,
              suggestedQuestions: questions,
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        } catch (err: unknown) {
          const errorMessage = err instanceof Error ? err.message : String(err);
          console.error("[Salary Assistant Route Error]:", errorMessage);

          return new Response(JSON.stringify(FALLBACK_RESPONSE), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
