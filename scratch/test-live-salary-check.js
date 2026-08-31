// Live API & Groq Reachability Test Suite for /salary-check
// Run with: npx tsx scratch/test-live-salary-check.js

import assert from "node:assert";
import fs from "fs";
import path from "path";

// Load .env variables
const envPath = path.join(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const idx = trimmed.indexOf("=");
      if (idx > 0) {
        const k = trimmed.substring(0, idx).trim();
        const v = trimmed.substring(idx + 1).trim();
        process.env[k] = v;
      }
    }
  }
}

const GROQ_API_KEY = process.env.GROQ_API_KEY || "";

let passed = 0;
let failed = 0;

async function runAsync(name, fn) {
  try {
    await fn();
    console.log(`[PASS] ${name}`);
    passed++;
  } catch (e) {
    console.error(`[FAIL] ${name}`, e);
    failed++;
  }
}

console.log("\n=======================================================");
console.log("TESTING LIVE /SALARY-CHECK APIs & GROQ API REACHABILITY");
console.log("=======================================================\n");

// TEST 1: Direct Groq API Connectivity & Key Verification
await runAsync("1. Direct Groq Cloud API Reachability & Key Check", async () => {
  assert.ok(GROQ_API_KEY, "GROQ_API_KEY environment variable is present");
  console.log(`   - Using GROQ_API_KEY: ${GROQ_API_KEY.substring(0, 10)}...`);

  const startTime = Date.now();
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GROQ_API_KEY.trim()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-20b",
      response_format: { type: "json_object" },
      temperature: 0.2,
      messages: [
        { role: "system", content: "You are a test assistant. Return JSON: {\"status\": \"ok\", \"groqReachable\": true}" },
        { role: "user", content: "Ping Groq API" },
      ],
    }),
  });

  const duration = Date.now() - startTime;
  assert.strictEqual(res.status, 200, `Groq API HTTP status should be 200 (Got ${res.status})`);
  
  const data = await res.json();
  assert.ok(data.choices && data.choices.length > 0, "Groq API returned choices array");
  
  const content = JSON.parse(data.choices[0].message.content);
  assert.strictEqual(content.status, "ok", "Groq API returned valid status: ok");
  assert.strictEqual(content.groqReachable, true, "Groq API is reachable and returning responses");
  
  console.log(`   - Groq API Response Time: ${duration}ms`);
  console.log(`   - Model Used: ${data.model}`);
});

// TEST 2: Candidate Profile Normalization & Extraction Test
await runAsync("2. Candidate Profile Normalization & Currency Conversion", async () => {
  const { normalizeSalaryInput, normalizeExperienceYears, formatSalaryCurrency } = await import("../src/lib/salaryCheckState.ts");
  
  const normINR = normalizeSalaryInput("4.2 LPA");
  assert.strictEqual(normINR.normalizedAnnual, 420000);
  assert.strictEqual(formatSalaryCurrency(normINR.normalizedAnnual, "INR"), "₹4.2 LPA");

  const normUSD = normalizeSalaryInput("$95,000 USD");
  assert.strictEqual(normUSD.normalizedAnnual, 95000);
  assert.strictEqual(formatSalaryCurrency(normUSD.normalizedAnnual, "USD"), "$95,000 USD");

  const exp = normalizeExperienceYears("2 years and 6 months");
  assert.strictEqual(exp.years, 2.5);
});

// TEST 3: Test Candidate Profile Research Output Structure
await runAsync("3. Research Engine Output Contract Validation", async () => {
  const candidateProfile = {
    role: "WordPress Developer",
    experienceYears: 2,
    experienceLabel: "2 years",
    location: { city: "Bhubaneswar", state: "Odisha", country: "India" },
    currentCompensation: { raw: "4.2 LPA", amount: 420000, currency: "INR", period: "annual", normalizedAnnual: 420000 },
    skills: ["WordPress", "PHP", "WooCommerce", "Elementor"],
    companyType: "Agency",
    responsibilities: "Custom theme & plugin development",
  };

  // Direct Groq Market Research Prompt Test
  const prompt = `You are a compensation market research specialist. Research compensation for:
ROLE: WordPress Developer
EXPERIENCE: 2 years
LOCATION: Bhubaneswar, India
CURRENT COMPENSATION: 4.2 LPA
SKILLS: WordPress, PHP, WooCommerce, Elementor

Return strictly valid JSON only:
{
  "marketLow": 480000,
  "marketMedian": 550000,
  "marketHigh": 650000,
  "currency": "INR",
  "recommendedMin": 520000,
  "recommendedMax": 600000,
  "negotiationTarget": 630000,
  "marketPosition": "Below Market",
  "potentialUpsidePercent": 31,
  "confidence": 88,
  "confidenceReason": "High confidence based on regional tech benchmark dataset.",
  "factors": [
    { "name": "Experience", "detail": "2 years relevant experience", "impact": "Moderate" }
  ],
  "skillImpact": [
    { "skill": "WooCommerce", "impactLevel": "+++" }
  ],
  "recommendations": [
    "Build custom plugin development portfolio"
  ],
  "sources": [
    { "name": "Venus Recruitment Index", "title": "WordPress Salary India", "url": "https://www.venushiring.ca/salary-calculator", "reason": "Placement baseline" }
  ]
}`;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GROQ_API_KEY.trim()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-20b",
      response_format: { type: "json_object" },
      temperature: 0.3,
      messages: [{ role: "system", content: prompt }],
    }),
  });

  assert.strictEqual(res.status, 200, "Groq Research Request returned status 200");
  const data = await res.json();
  const parsed = JSON.parse(data.choices[0].message.content);

  assert.ok(parsed.marketMedian > 0, "marketMedian is positive number");
  assert.ok(parsed.recommendedMin <= parsed.recommendedMax, "recommendedMin <= recommendedMax");
  assert.ok(parsed.negotiationTarget >= parsed.recommendedMax, "negotiationTarget >= recommendedMax");
  assert.ok(Array.isArray(parsed.factors), "factors is an array");
  assert.ok(Array.isArray(parsed.skillImpact), "skillImpact is an array");
  assert.ok(Array.isArray(parsed.recommendations), "recommendations is an array");
  assert.ok(Array.isArray(parsed.sources), "sources is an array");

  console.log(`   - Market Median Calculated: ₹${(parsed.marketMedian / 100000).toFixed(1)} LPA`);
  console.log(`   - Recommended Range: ₹${(parsed.recommendedMin / 100000).toFixed(1)}L – ₹${(parsed.recommendedMax / 100000).toFixed(1)}L`);
  console.log(`   - Negotiation Target Ask: ₹${(parsed.negotiationTarget / 100000).toFixed(1)}L`);
  console.log(`   - Market Position: ${parsed.marketPosition}`);
  console.log(`   - Confidence Score: ${parsed.confidence}%`);
});

console.log("\n=======================================================");
console.log(`TEST RESULTS: ${passed} passed, ${failed} failed`);
console.log("=======================================================\n");

if (failed > 0) {
  process.exit(1);
}
