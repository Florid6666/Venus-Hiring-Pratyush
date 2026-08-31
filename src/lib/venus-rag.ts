import knowledgeData from "@/data/venus-ai-knowledge.json";
import { MOCK_JOBS } from "@/components/careers/mockJobs";

export interface KnowledgeChunk {
  id: string;
  category: "company" | "service" | "industry" | "career" | "job" | "tool" | "contact" | "faq";
  title: string;
  content: string;
  route?: string;
  keywords: string[];
}

export type UserIntent =
  | "HUMAN_HANDOFF"
  | "CAREERS_JOBS"
  | "SALARY_TOOLS"
  | "SERVICES_EXECUTIVE"
  | "SERVICES_CONTRACT"
  | "SERVICES_STARTUP"
  | "SERVICES_GENERAL"
  | "INDUSTRIES"
  | "NAVIGATION"
  | "OUT_OF_SCOPE"
  | "GENERAL_VENUS";

// Construct searchable knowledge chunks
const KNOWLEDGE_CHUNKS: KnowledgeChunk[] = [
  // Company overview chunk
  {
    id: "company-overview",
    category: "company",
    title: "About Venus Consultancy (Venus Hiring)",
    content: `${knowledgeData.company.name} (${knowledgeData.company.alternateName}) - ${knowledgeData.company.tagline}. ${knowledgeData.company.description} Dual headquarters: Toronto, ON, Canada (${knowledgeData.company.headquarters.toronto}) and Bangalore, India (${knowledgeData.company.headquarters.bangalore}). Key track record: ${knowledgeData.company.metrics.retentionRate}, ${knowledgeData.company.metrics.shortlistTurnaround}, ${knowledgeData.company.metrics.contractTurnaround}, ${knowledgeData.company.metrics.guarantee}, ${knowledgeData.company.metrics.screening}.`,
    route: "/",
    keywords: ["venus consultancy", "about venus", "venus hiring", "who is venus", "recruitment agency", "toronto recruiting", "headquarters", "retention rate", "guarantee", "canada recruiting"]
  },

  // Services chunks
  ...knowledgeData.services.map((s) => ({
    id: `service-${s.id}`,
    category: "service" as const,
    title: s.title,
    content: `${s.title}: ${s.summary} Target Roles: ${s.targetRoles.join(", ")}. Highlights: ${s.keyHighlights.join(". ")}. Best for: ${s.bestFor}. Route: ${s.route}`,
    route: s.route,
    keywords: [s.id, s.title.toLowerCase(), ...s.targetRoles.map((r) => r.toLowerCase()), "service", "hiring solution"]
  })),

  // Industry chunks
  ...knowledgeData.industries.map((ind) => ({
    id: `industry-${ind.id}`,
    category: "industry" as const,
    title: ind.title,
    content: `${ind.title}: ${ind.summary} Key Roles: ${ind.roles.join(", ")}. Route: ${ind.route}`,
    route: ind.route,
    keywords: [ind.id, ind.title.toLowerCase(), ...ind.roles.map((r) => r.toLowerCase()), "industry", "sector", "practice"]
  })),

  // Careers chunk
  {
    id: "careers-overview",
    category: "career",
    title: "Careers & Candidate Placement",
    content: `${knowledgeData.careers.summary} Candidate Cost: ${knowledgeData.careers.candidateCost} Screening Process: ${knowledgeData.careers.screeningProcess}. Free Resume Builder at ${knowledgeData.careers.resumeBuilder.route}.`,
    route: knowledgeData.careers.route,
    keywords: ["careers", "job seeker", "candidate fee", "free for candidates", "apply", "screening process", "discovery call"]
  },

  // Tools chunks
  ...knowledgeData.tools.map((t) => ({
    id: `tool-${t.id}`,
    category: "tool" as const,
    title: t.title,
    content: `${t.title}: ${t.summary} Route: ${t.route}`,
    route: t.route,
    keywords: [t.id, t.title.toLowerCase(), "calculator", "salary check", "take home pay", "tax calculator", "resume builder"]
  })),

  // Contact chunk
  {
    id: "contact-info",
    category: "contact",
    title: "Contact Venus Consultancy & Book Call",
    content: `${knowledgeData.contact.summary} Email: ${knowledgeData.contact.email}. Phone Toronto: ${knowledgeData.contact.phoneToronto}. Phone US: ${knowledgeData.contact.phoneUS}. Toronto Office: ${knowledgeData.contact.addressToronto}. Bangalore Hub: ${knowledgeData.contact.addressBangalore}. Route: ${knowledgeData.contact.route}`,
    route: knowledgeData.contact.route,
    keywords: ["contact", "speak to human", "talk to recruiter", "phone number", "email", "toronto office", "bangalore hub", "book a call"]
  },

  // FAQ chunks
  ...knowledgeData.faq.map((f, idx) => ({
    id: `faq-${idx}`,
    category: "faq" as const,
    title: f.question,
    content: `Q: ${f.question} A: ${f.answer}`,
    route: "/faq",
    keywords: ["faq", f.question.toLowerCase(), "turnaround", "guarantee", "lmia", "screening", "work permit"]
  }))
];

// Add active jobs as searchable chunks
MOCK_JOBS.forEach((j) => {
  KNOWLEDGE_CHUNKS.push({
    id: `job-${j.id}`,
    category: "job",
    title: `Job Opening: ${j.title}`,
    content: `Role Title: ${j.title} (${j.department}, ${j.location}, ${j.type}). Salary: ${j.salaryRange || "Competitive"}. Experience: ${j.experience || "Senior"}. Description: ${j.description || j.title}. Route: /careers/${j.slug}`,
    route: `/careers/${j.slug}`,
    keywords: [j.title.toLowerCase(), j.department.toLowerCase(), j.location.toLowerCase(), "job opening", "developer job", "engineer job", "hiring role"]
  });
});

/**
 * Classifies user query into broad intent groups.
 */
export function classifyIntent(query: string): UserIntent {
  const q = query.toLowerCase().trim();

  // Human Handoff / Contact
  if (
    /connect me|speak to|talk to|human|recruiter|someone|contact|book a call|phone|email|reach your team|get in touch|consultant/i.test(q)
  ) {
    return "HUMAN_HANDOFF";
  }

  // Jobs / Careers
  if (/job|career|opening|vacancy|position|apply|hiring role|developer job|engineer job|work at venus/i.test(q)) {
    return "CAREERS_JOBS";
  }

  // Salary Tools
  if (/salary|compensation|market pay|take home|tax calculator|paycheck|benchmark/i.test(q)) {
    return "SALARY_TOOLS";
  }

  // Specific Services
  if (/executive search|headhunting|c-suite|ceo|cto|cfo|vp engineering/i.test(q)) {
    return "SERVICES_EXECUTIVE";
  }
  if (/contract staffing|staff augmentation|temp hiring|interim|contractor/i.test(q)) {
    return "SERVICES_CONTRACT";
  }
  if (/startup|seed|series a|scaleup|founding engineer/i.test(q)) {
    return "SERVICES_STARTUP";
  }
  if (/services|offerings|what do you offer|what can venus do|hiring support/i.test(q)) {
    return "SERVICES_GENERAL";
  }

  // Industries
  if (/industry|industries|technology|software|finance|manufacturing|automotive|ev|aerospace|trades|millwright|electrician/i.test(q)) {
    return "INDUSTRIES";
  }

  // Out of Scope (General Trivia)
  if (
    /capital of france|weather today|recipe for|who won|tell me a joke|solve x\^2|president of/i.test(q)
  ) {
    return "OUT_OF_SCOPE";
  }

  return "GENERAL_VENUS";
}

/**
 * RAG Knowledge Retrieval Engine.
 * Scores and retrieves top K grounded knowledge chunks relevant to user query and history context.
 */
export function retrieveRelevantKnowledge(query: string, history: Array<{ role: string; content: string }> = []): {
  chunks: KnowledgeChunk[];
  intent: UserIntent;
  suggestedLinks: Array<{ label: string; url: string }>;
} {
  const intent = classifyIntent(query);

  // Combine user query with recent history for contextual search
  const historyText = history.slice(-2).map((h) => h.content).join(" ");
  const fullText = `${query} ${historyText}`.toLowerCase().trim();

  // Score knowledge chunks
  const scored = KNOWLEDGE_CHUNKS.map((chunk) => {
    let score = 0;
    const chunkText = `${chunk.title} ${chunk.content}`.toLowerCase();

    // 1. Keyword match score
    for (const kw of chunk.keywords) {
      if (fullText.includes(kw)) score += 4;
    }

    // 2. Exact word match in query
    const words = query.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
    for (const word of words) {
      if (chunkText.includes(word)) score += 2;
    }

    // 3. Category boost based on intent
    if (intent === "CAREERS_JOBS" && (chunk.category === "job" || chunk.category === "career")) score += 6;
    if (intent === "HUMAN_HANDOFF" && chunk.category === "contact") score += 10;
    if (intent === "SALARY_TOOLS" && chunk.category === "tool") score += 8;
    if (intent === "SERVICES_EXECUTIVE" && chunk.id === "service-executive-search") score += 8;
    if (intent === "SERVICES_CONTRACT" && chunk.id === "service-contract-staffing") score += 8;
    if (intent === "SERVICES_STARTUP" && chunk.id === "service-startup-hiring") score += 8;

    return { chunk, score };
  });

  scored.sort((a, b) => b.score - a.score);

  // Take top 4 relevant chunks
  const topChunks = scored.filter((s) => s.score > 0).slice(0, 4).map((s) => s.chunk);
  const chunks = topChunks.length > 0 ? topChunks : KNOWLEDGE_CHUNKS.slice(0, 3);

  // Build suggested links (excluding "About Venus Consultancy")
  const linkMap = new Map<string, string>();
  for (const c of chunks) {
    if (c.route && c.title !== "About Venus Consultancy (Venus Hiring)" && c.route !== "/") {
      linkMap.set(c.title, c.route);
    }
  }

  if (intent === "HUMAN_HANDOFF") {
    linkMap.clear();
    linkMap.set("Contact Venus Team", "/contact");
    linkMap.set("Book a Call", "/contact");
  } else if (intent === "CAREERS_JOBS") {
    linkMap.set("View Career Openings", "/careers");
    linkMap.set("Free Resume Builder", "/careers/resume-builder");
  } else if (intent === "SALARY_TOOLS") {
    linkMap.set("Salary Check AI", "/salary-check");
    linkMap.set("Salary Calculator", "/salary-calculator");
  }

  const suggestedLinks = Array.from(linkMap.entries())
    .filter(([label, url]) => label !== "About Venus Consultancy (Venus Hiring)" && url !== "/")
    .slice(0, 3)
    .map(([label, url]) => ({ label, url }));

  return { chunks, intent, suggestedLinks };
}
