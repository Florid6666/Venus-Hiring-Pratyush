// Integration & Unit Test Suite for AI Salary Intelligence Chatbot (/salary-check)
// Run with: npx tsx scratch/test-salary-check.js

import assert from "node:assert";

import {
  normalizeSalaryInput,
  normalizeExperienceYears,
  formatSalaryCurrency,
} from "../src/lib/salaryCheckState.js";

let passed = 0;
let failed = 0;

function run(name, fn) {
  try {
    fn();
    console.log(`[PASS] ${name}`);
    passed++;
  } catch (e) {
    console.error(`[FAIL] ${name}`, e);
    failed++;
  }
}

console.log("\n=======================================================");
console.log("RUNNING AI SALARY CHECK UNIT & INTEGRATION TEST SUITE");
console.log("=======================================================\n");

// Test 1: Indian LPA Parsing
run("1. Normalize 4.2 LPA to 420,000 INR", () => {
  const norm = normalizeSalaryInput("4.2 LPA");
  assert.strictEqual(norm.currency, "INR");
  assert.strictEqual(norm.normalizedAnnual, 420000);
});

// Test 2: Monthly Compensation Conversion
run("2. Normalize ₹35,000/month to 420,000 INR annual", () => {
  const norm = normalizeSalaryInput("35000/month");
  assert.strictEqual(norm.currency, "INR");
  assert.strictEqual(norm.period, "monthly");
  assert.strictEqual(norm.normalizedAnnual, 420000);
});

// Test 3: USD Compensation Parsing
run("3. Normalize $75,000 to USD annual", () => {
  const norm = normalizeSalaryInput("$75,000");
  assert.strictEqual(norm.currency, "USD");
  assert.strictEqual(norm.normalizedAnnual, 75000);
});

// Test 4: CAD Compensation Parsing
run("4. Normalize CAD 65,000 to CAD annual", () => {
  const norm = normalizeSalaryInput("CAD 65,000");
  assert.strictEqual(norm.currency, "CAD");
  assert.strictEqual(norm.normalizedAnnual, 65000);
});

// Test 5: Experience Years Range Normalization
run("5. Normalize experience ranges and natural language", () => {
  assert.strictEqual(normalizeExperienceYears("0-1").years, 0.5);
  assert.strictEqual(normalizeExperienceYears("2-4").years, 3);
  assert.strictEqual(normalizeExperienceYears("10+").years, 12);
  assert.strictEqual(normalizeExperienceYears("2 years and 6 months").years, 2.5);
});

// Test 6: Currency Formatting
run("6. Format LPA and Currency strings correctly", () => {
  assert.strictEqual(formatSalaryCurrency(420000, "INR"), "₹4.2 LPA");
  assert.strictEqual(formatSalaryCurrency(12000000, "INR"), "₹1.2 Cr");
  assert.strictEqual(formatSalaryCurrency(75000, "USD"), "$75,000 USD");
  assert.strictEqual(formatSalaryCurrency(65000, "CAD"), "C$65,000 CAD");
});

console.log("\n=======================================================");
console.log(`TEST RESULTS: ${passed} passed, ${failed} failed`);
console.log("=======================================================\n");

if (failed > 0) {
  process.exit(1);
}
