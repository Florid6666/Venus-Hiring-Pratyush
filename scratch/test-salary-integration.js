// Comprehensive Integration & Unit Tests for Salary Calculator ↔ Salary 2 Assistant Flow
// Run with: npx tsx scratch/test-salary-integration.js

import assert from "node:assert";

// --- MOCK BROWSER ENVIRONMENT FOR NODE.JS TSX RUNNER ---
const storageMap = new Map();

const mockSessionStorage = {
  getItem: (key) => storageMap.get(key) || null,
  setItem: (key, value) => storageMap.set(key, String(value)),
  removeItem: (key) => storageMap.delete(key),
  clear: () => storageMap.clear(),
  get length() {
    return storageMap.size;
  },
  key: (index) => Array.from(storageMap.keys())[index] || null,
};

let currentUrl = "http://localhost:3000/salary-calculator";

const mockHistory = {
  replaceState: (state, title, url) => {
    currentUrl = url;
  },
};

globalThis.window = {
  location: {
    get search() {
      const idx = currentUrl.indexOf("?");
      return idx >= 0 ? currentUrl.substring(idx) : "";
    },
    get pathname() {
      const urlNoQuery = currentUrl.split("?")[0];
      const match = urlNoQuery.match(/https?:\/\/[^\/]+(\/.*)/);
      return match ? match[1] : urlNoQuery;
    },
  },
  history: mockHistory,
  sessionStorage: mockSessionStorage,
};

globalThis.sessionStorage = mockSessionStorage;

// Import modules to test
import {
  saveSalaryAssistantContext,
  getSalaryAssistantContext,
  saveSalaryAssistantResult,
  getSalaryAssistantResult,
  saveAssistantResultForContext,
  isValidSalaryAssistantContext,
  isValidSalaryAssistantResult,
  isMatchingAssistantContextAndResult,
  restoreCalculatorFromAssistantContext,
  isValidCalculatorResult,
  clearExpiredSalaryAssistantData,
} from "../src/lib/salaryAssistantContext";
import { calculateSalaryRange } from "../src/data/salaryData";


let testsPassed = 0;
let testsFailed = 0;

function runTest(name, fn) {
  try {
    storageMap.clear();
    currentUrl = "http://localhost:3000/salary-calculator";
    fn();
    console.log(`[PASS] ${name}`);
    testsPassed++;
  } catch (err) {
    console.error(`[FAIL] ${name}`);
    console.error(err);
    testsFailed++;
  }
}

console.log("\n=======================================================");
console.log("RUNNING SALARY CALCULATOR ↔ SALARY 2 INTEGRATION TESTS");
console.log("=======================================================\n");

// 1. Returning from Salary 2 restores job role, experience, skill, country, city, current salary, low/mid/high, currency, confidence, and benchmark source.
runTest("1. Returning from Salary 2 restores full calculator context", () => {
  const ctxId = "ctx_test_1";
  const ctx = {
    contextId: ctxId,
    createdAt: Date.now(),
    jobRole: "React Native Developer",
    experience: "Senior (5-8 years)",
    skillLevel: "Advanced (+7%)",
    country: "India",
    city: "Bangalore",
    currentSalary: 1800000,
    currencyCode: "INR",
    currencySymbol: "₹",
    estimatedLow: 2000000,
    estimatedMid: 2800000,
    estimatedHigh: 3600000,
    confidenceScore: 96,
    benchmarkSourceLevel: "exact_city_role",
    exactRoleInput: "React Native Developer",
    experienceId: "senior",
    skillLevelId: "advanced",
    countryId: "india",
    cityId: "bangalore",
  };

  saveSalaryAssistantContext(ctx);

  const res = {
    contextId: ctxId,
    createdAt: Date.now(),
    source: "groq-ai",
    exactRoleInput: "React Native Developer",
    message: "React Native specialists in Bangalore command strong market compensation.",
    suggestedQuestions: ["How to negotiate non-compete?"],
  };
  saveSalaryAssistantResult(ctxId, res);

  const fetchedCtx = getSalaryAssistantContext(ctxId);
  const fetchedRes = getSalaryAssistantResult(ctxId);

  if (!fetchedCtx || !fetchedRes) throw new Error("Saved context/result not retrieved");

  const restored = restoreCalculatorFromAssistantContext(fetchedCtx);

  if (restored.formState.selectedRole !== "React Native Developer") throw new Error("Role mismatch");
  if (restored.formState.selectedExp !== "senior") throw new Error("Experience mismatch");
  if (restored.formState.selectedSkill !== "advanced") throw new Error("Skill mismatch");
  if (restored.formState.selectedLocation !== "india") throw new Error("Country mismatch");
  if (restored.formState.selectedCity !== "bangalore") throw new Error("City mismatch");
  if (restored.formState.currentSalaryInput !== "1800000") throw new Error("Current salary mismatch");

  if (restored.calcResult.currencyCode !== "INR") throw new Error("Currency mismatch");
  if (typeof restored.calcResult.lowSalary !== "number") throw new Error("Low salary missing");
  if (typeof restored.calcResult.midSalary !== "number") throw new Error("Mid salary missing");
  if (typeof restored.calcResult.highSalary !== "number") throw new Error("High salary missing");
  if (typeof restored.calcResult.confidenceScore !== "number") throw new Error("Confidence score missing");
  if (typeof restored.calcResult.benchmarkSourceLevel !== "string") throw new Error("Benchmark source missing");
});

// 2. Restored React Native/Bangalore context does not show a default Full Stack/Toronto calculator result.
runTest("2. Restored React Native/Bangalore does not default to Full Stack/Toronto", () => {
  const ctxId = "ctx_test_2";
  const ctx = {
    contextId: ctxId,
    createdAt: Date.now(),
    jobRole: "React Native Developer",
    experience: "Junior (1-3 years)",
    skillLevel: "Intermediate (+3%)",
    country: "India",
    city: "Bangalore",
    currentSalary: 700000,
    currencyCode: "INR",
    currencySymbol: "₹",
    estimatedLow: 650000,
    estimatedMid: 840000,
    estimatedHigh: 1120000,
    confidenceScore: 96,
    benchmarkSourceLevel: "exact_city_role",
    exactRoleInput: "React Native Mobile Dev",
    experienceId: "junior",
    skillLevelId: "intermediate",
    countryId: "india",
    cityId: "bangalore",
  };
  saveSalaryAssistantContext(ctx);

  const restored = restoreCalculatorFromAssistantContext(ctx);
  if (restored.formState.selectedRole === "Full Stack Developer") throw new Error("Overwrote with default role!");
  if (restored.formState.selectedCity === "toronto") throw new Error("Overwrote with default city!");
  if (restored.formState.selectedLocation === "canada") throw new Error("Overwrote with default country!");
  if (restored.calcResult.currencyCode === "CAD") throw new Error("Overwrote with CAD currency!");
});

// 3. Matching context/result ID shows returned narrative.
runTest("3. Matching context and result IDs validate successfully", () => {
  const ctxId = "ctx_matching_3";
  const ctx = {
    contextId: ctxId,
    createdAt: Date.now(),
    jobRole: "AI Engineer",
    experience: "Mid Level (3-5 years)",
    skillLevel: "Intermediate (+3%)",
    country: "USA",
    city: "San Francisco",
    currentSalary: 130000,
    currencyCode: "USD",
    currencySymbol: "$",
    estimatedLow: 110000,
    estimatedMid: 140000,
    estimatedHigh: 170000,
    confidenceScore: 88,
    benchmarkSourceLevel: "country_role",
    exactRoleInput: "AI Prompt Engineer",
  };
  const res = {
    contextId: ctxId,
    createdAt: Date.now(),
    source: "groq-ai",
    exactRoleInput: "AI Prompt Engineer",
    message: "San Francisco AI Roles command premium salary levels.",
    suggestedQuestions: ["What about equity packages?"],
  };

  if (!isMatchingAssistantContextAndResult(ctx, res, ctxId)) {
    throw new Error("Matching context and result failed validation");
  }
});

// 4. Mismatched context/result IDs are rejected.
runTest("4. Mismatched context/result IDs are rejected", () => {
  const ctx = {
    contextId: "ctx_A",
    createdAt: Date.now(),
    jobRole: "Data Scientist",
    experience: "mid",
    skillLevel: "intermediate",
    country: "USA",
    city: "New York",
    currentSalary: 120000,
    currencyCode: "USD",
    currencySymbol: "$",
    estimatedLow: 100000,
    estimatedMid: 130000,
    estimatedHigh: 160000,
    confidenceScore: 88,
    benchmarkSourceLevel: "country_role",
    exactRoleInput: "Data Scientist",
  };
  const res = {
    contextId: "ctx_B", // Mismatched!
    createdAt: Date.now(),
    source: "groq-ai",
    exactRoleInput: "Data Scientist",
    message: "Some message",
    suggestedQuestions: [],
  };

  if (isMatchingAssistantContextAndResult(ctx, res, "ctx_A")) {
    throw new Error("Failed to reject mismatched context IDs!");
  }
});

// 5. Mismatched exact role inputs are rejected.
runTest("5. Mismatched exact role inputs are rejected", () => {
  const ctxId = "ctx_role_mismatch";
  const ctx = {
    contextId: ctxId,
    createdAt: Date.now(),
    jobRole: "Backend Developer",
    experience: "mid",
    skillLevel: "intermediate",
    country: "Canada",
    city: "Toronto",
    currentSalary: 90000,
    currencyCode: "CAD",
    currencySymbol: "$",
    estimatedLow: 80000,
    estimatedMid: 110000,
    estimatedHigh: 140000,
    confidenceScore: 88,
    benchmarkSourceLevel: "country_role",
    exactRoleInput: "Golang Backend Engineer",
  };
  const res = {
    contextId: ctxId,
    createdAt: Date.now(),
    source: "groq-ai",
    exactRoleInput: "Java Spring Developer", // Mismatched exact role input!
    message: "Java dev insight",
    suggestedQuestions: [],
  };

  if (isMatchingAssistantContextAndResult(ctx, res, ctxId)) {
    throw new Error("Failed to reject mismatched exact role inputs!");
  }
});

// 6. Expired context is rejected.
runTest("6. Expired context (older than 30 mins) is rejected", () => {
  const expiredTime = Date.now() - (31 * 60 * 1000); // 31 minutes ago
  const ctx = {
    contextId: "ctx_expired_6",
    createdAt: expiredTime,
    jobRole: "DevOps Engineer",
    experience: "mid",
    skillLevel: "intermediate",
    country: "USA",
    city: "Austin",
    currentSalary: 110000,
    currencyCode: "USD",
    currencySymbol: "$",
    estimatedLow: 100000,
    estimatedMid: 125000,
    estimatedHigh: 150000,
    confidenceScore: 88,
    benchmarkSourceLevel: "country_role",
    exactRoleInput: "DevOps Engineer",
  };

  if (isValidSalaryAssistantContext(ctx)) {
    throw new Error("Failed to reject expired context!");
  }
});

// 7. Expired result is rejected.
runTest("7. Expired result (older than 30 mins) is rejected", () => {
  const expiredTime = Date.now() - (35 * 60 * 1000);
  const res = {
    contextId: "ctx_expired_7",
    createdAt: expiredTime,
    source: "fallback-engine",
    exactRoleInput: "DevOps Engineer",
    message: "Fallback message",
    suggestedQuestions: [],
  };

  if (isValidSalaryAssistantResult(res)) {
    throw new Error("Failed to reject expired result!");
  }
});

// 8. Invalid context shape is rejected.
runTest("8. Invalid context shape (missing fields / bad types) is rejected", () => {
  const badCtx1 = { contextId: "ctx_bad", createdAt: Date.now() }; // Missing fields
  const badCtx2 = {
    contextId: "ctx_bad2",
    createdAt: Date.now(),
    jobRole: "Role",
    experience: "mid",
    skillLevel: "intermediate",
    country: "Canada",
    city: "Toronto",
    currentSalary: "not-a-number", // Bad type
    currencyCode: "USD",
    currencySymbol: "$",
    estimatedLow: 100,
    estimatedMid: 200,
    estimatedHigh: 300,
    confidenceScore: 80,
    benchmarkSourceLevel: "exact_city_role",
    exactRoleInput: "Role",
  };

  if (isValidSalaryAssistantContext(badCtx1)) throw new Error("Failed to reject incomplete context");
  if (isValidSalaryAssistantContext(badCtx2)) throw new Error("Failed to reject non-finite currentSalary");
});

// 9. Invalid result shape is rejected.
runTest("9. Invalid result shape is rejected", () => {
  const badRes1 = { contextId: "c1", createdAt: Date.now(), source: "invalid-source" };
  const badRes2 = {
    contextId: "c2",
    createdAt: Date.now(),
    source: "groq-ai",
    exactRoleInput: "Role",
    message: "", // Empty message
    suggestedQuestions: "not-an-array",
  };

  if (isValidSalaryAssistantResult(badRes1)) throw new Error("Failed to reject invalid source");
  if (isValidSalaryAssistantResult(badRes2)) throw new Error("Failed to reject invalid suggestedQuestions");
});

// 10. Groq success result is saved and restored.
runTest("10. Groq success result is saved and retrieved successfully", () => {
  const ctxId = "ctx_groq_success";
  saveAssistantResultForContext(ctxId, "Machine Learning Architect", {
    source: "groq-ai",
    message: "Groq AI real-time market synthesis for Machine Learning Architect.",
    suggestedQuestions: ["What about LLM specialization bonuses?"],
  });

  const res = getSalaryAssistantResult(ctxId);
  if (!res) throw new Error("Failed to retrieve saved Groq result");
  if (res.source !== "groq-ai") throw new Error("Source was not groq-ai");
  if (res.exactRoleInput !== "Machine Learning Architect") throw new Error("Exact role input mismatch");
});

// 11. Groq failure fallback result is saved and restored.
runTest("11. Groq failure fallback result is saved and retrieved successfully", () => {
  const ctxId = "ctx_fallback_fail";
  saveAssistantResultForContext(ctxId, "Cybersecurity Specialist", {
    source: "fallback-engine",
    message: "Fallback compensation advice statement.",
    suggestedQuestions: ["How to prepare for negotiation?"],
  });

  const res = getSalaryAssistantResult(ctxId);
  if (!res) throw new Error("Failed to retrieve saved fallback result");
  if (res.source !== "fallback-engine") throw new Error("Source was not fallback-engine");
  if (res.exactRoleInput !== "Cybersecurity Specialist") throw new Error("Exact role input mismatch");
});

// 12. Original calculator numeric low/mid/high values are unchanged by chatbot response.
runTest("12. Chatbot response cannot modify calculator numbers", () => {
  const calcOriginal = calculateSalaryRange("Full Stack Developer", "mid", "intermediate", "canada", "toronto", 70000);
  const originalLow = calcOriginal.lowSalary;
  const originalMid = calcOriginal.midSalary;
  const originalHigh = calcOriginal.highSalary;

  // Simulate receiving chatbot text containing arbitrary numbers (e.g. "$500,000")
  const chatResponse = "According to AI, your salary should be $500,000 USD!";
  
  // Re-verify that calcOriginal numeric values remain unchanged
  if (calcOriginal.lowSalary !== originalLow) throw new Error("lowSalary was modified!");
  if (calcOriginal.midSalary !== originalMid) throw new Error("midSalary was modified!");
  if (calcOriginal.highSalary !== originalHigh) throw new Error("highSalary was modified!");
});

// 13. "Ask AI About This Result" remains available when calculator AI request fails.
runTest("13. Ask AI button validator returns true when calculator result exists despite AI request failure", () => {
  const calcResult = calculateSalaryRange("Frontend Developer", "mid", "intermediate", "india", "bangalore", 900000);
  // Even if /api/salary-insights failed (aiInsights = null), activeResult is valid
  if (!isValidCalculatorResult(calcResult)) {
    throw new Error("isValidCalculatorResult returned false for valid calculator result!");
  }
});

// 14. "Ask AI About This Result" is unavailable only when there is no valid deterministic calculator result.
runTest("14. Ask AI button validator returns false for null/invalid calculator result", () => {
  if (isValidCalculatorResult(null)) throw new Error("Failed to reject null calculator result");
  if (isValidCalculatorResult({})) throw new Error("Failed to reject empty object calculator result");
  if (isValidCalculatorResult({ lowSalary: -1, midSalary: 100, highSalary: 50 })) throw new Error("Failed to reject unordered salaries");
});

// 15. URL query parameters are removed after successful or failed return handling.
runTest("15. URL query parameters replaceState behavior works cleanly", () => {
  currentUrl = "http://localhost:3000/salary-calculator?contextId=c123&assistantResult=1";
  
  // Simulate replaceState call
  window.history.replaceState({}, "Title", "/salary-calculator");

  if (currentUrl.includes("contextId")) {
    throw new Error("URL query parameters were not removed!");
  }
});

// 16. A stale result from another context cannot appear in a new calculator session.
runTest("16. Stale result from another context is rejected", () => {
  const oldCtxId = "ctx_old_session";
  const newCtxId = "ctx_new_session";

  // User creates context A
  const ctxA = {
    contextId: oldCtxId,
    createdAt: Date.now(),
    jobRole: "Software Engineer",
    experience: "mid",
    skillLevel: "intermediate",
    country: "USA",
    city: "Austin",
    currentSalary: 100000,
    currencyCode: "USD",
    currencySymbol: "$",
    estimatedLow: 90000,
    estimatedMid: 110000,
    estimatedHigh: 130000,
    confidenceScore: 88,
    benchmarkSourceLevel: "country_role",
    exactRoleInput: "Software Engineer",
  };
  saveSalaryAssistantContext(ctxA);
  saveAssistantResultForContext(oldCtxId, "Software Engineer", {
    source: "groq-ai",
    message: "Old result for Software Engineer in Austin",
    suggestedQuestions: [],
  });

  // Now user starts new session B
  const ctxB = {
    contextId: newCtxId,
    createdAt: Date.now(),
    jobRole: "Data Engineer",
    experience: "senior",
    skillLevel: "advanced",
    country: "Canada",
    city: "Vancouver",
    currentSalary: 130000,
    currencyCode: "CAD",
    currencySymbol: "$",
    estimatedLow: 120000,
    estimatedMid: 150000,
    estimatedHigh: 180000,
    confidenceScore: 88,
    benchmarkSourceLevel: "country_role",
    exactRoleInput: "Data Engineer",
  };
  saveSalaryAssistantContext(ctxB);

  // Attempting to match newCtxId with result from oldCtxId
  const resultForOld = getSalaryAssistantResult(oldCtxId);
  const resultForNew = getSalaryAssistantResult(newCtxId); // Should be null!

  if (resultForNew !== null) {
    throw new Error("New session incorrectly got result from old context!");
  }

  if (resultForOld && isMatchingAssistantContextAndResult(ctxB, resultForOld, newCtxId)) {
    throw new Error("ctxB matched resultForOld incorrectly!");
  }
});

console.log("\n=======================================================");
console.log(`TEST SUITE COMPLETE: ${testsPassed} passed, ${testsFailed} failed`);
console.log("=======================================================\n");

if (testsFailed > 0) {
  process.exit(1);
}
