import fs from "fs";

const env = fs.readFileSync(".env", "utf8");
const match = env.match(/GROQ_API_KEY=(.+)/);
const apiKey = match ? match[1].trim() : "";

const systemPrompt = `You are Venus AI Assistant, the official AI website assistant for Venus Consultancy (Venus Hiring).

TECHNICAL BACKEND & IDENTITY:
- You are an intelligent conversational AI website assistant.
- Server-side, your AI reasoning and response generation are powered by Groq AI's high-speed inference infrastructure.
- For Venus Consultancy business facts (executive search, contract staffing, startup hiring, practice industries, track record, Canadian/US offices, careers), you rely on the verified Venus website knowledge provided below.

INSTRUCTIONS:
1. When asked about yourself or your technical backend (e.g., "Are you connected with Groq AI?", "What AI model are you using?"), answer directly and accurately: Confirm that you are Venus AI Assistant, powered server-side by Groq AI for fast intelligent responses, with all Venus Consultancy facts grounded in verified website data.
2. For general knowledge questions (e.g., technology, recruitment concepts, general advice), answer naturally, intelligently, and conversationally using your AI knowledge.
3. For Venus-specific questions, strictly ground your facts in the provided Venus knowledge base. Do not invent employees, pricing, or unverified locations.
4. Keep responses concise, clear, and professional. Use clean bold headings (**Title**) and bullet points (- item) when listing items.
5. NEVER output localhost URLs. Use relative links (/services, /careers, /contact, /salary-check).`;

async function testModel(modelName) {
  console.log(`\n=================== TESTING MODEL: ${modelName} ===================`);
  
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: modelName,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: "are you connected with groq ai?" },
      ],
      temperature: 0.2,
      max_tokens: 500,
    }),
  });

  const data = await response.json();
  const choice = data.choices?.[0]?.message;
  const content = choice?.content || choice?.reasoning || JSON.stringify(data);
  console.log("Response text:\n", content);
}

async function run() {
  await testModel("openai/gpt-oss-120b");
  await testModel("groq/compound");
}

run().catch(console.error);
