import { execSync } from "child_process";
import fs from "fs";
import path from "path";

// Read local .env if present
const envFilePath = path.join(process.cwd(), ".env");
let localEnv: Record<string, string> = {};

if (fs.existsSync(envFilePath)) {
  const content = fs.readFileSync(envFilePath, "utf8");
  content.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const idx = trimmed.indexOf("=");
      if (idx > 0) {
        const k = trimmed.substring(0, idx).trim();
        const v = trimmed.substring(idx + 1).trim();
        localEnv[k] = v;
      }
    }
  });
}

const getEnv = (key: string) => process.env[key] || localEnv[key] || "";

const envVars = [
  { key: "DATABASE_URL", value: getEnv("DATABASE_URL") },
  { key: "SMTP_HOST", value: getEnv("SMTP_HOST") || "smtppro.zoho.in" },
  { key: "SMTP_PORT", value: getEnv("SMTP_PORT") || "465" },
  { key: "SMTP_SECURE", value: getEnv("SMTP_SECURE") || "true" },
  { key: "SMTP_USER", value: getEnv("SMTP_USER") },
  { key: "SMTP_PASSWORD", value: getEnv("SMTP_PASSWORD") },
  { key: "SMTP_FROM", value: getEnv("SMTP_FROM") || getEnv("SMTP_USER") },
  { key: "CONTACT_RECEIVER_EMAIL", value: getEnv("CONTACT_RECEIVER_EMAIL") || getEnv("SMTP_USER") },
  { key: "GROQ_API_KEY", value: getEnv("GROQ_API_KEY") },
].filter((e) => Boolean(e.value));

console.log("==================================================");
console.log(" Syncing Railway PostgreSQL & Zoho SMTP Env Vars to Vercel");
console.log("==================================================\n");

for (const env of envVars) {
  console.log(`Setting ${env.key} on Vercel Production...`);
  try {
    // Remove existing env var if present to avoid duplicate conflict
    try {
      execSync(`npx vercel env rm ${env.key} production -y`, { stdio: "ignore" });
    } catch {
      // Ignore error if env var doesn't exist yet
    }

    // Add env var to Vercel Production
    execSync(`echo "${env.value}" | npx vercel env add ${env.key} production`, {
      stdio: "inherit",
    });
    console.log(`✅ ${env.key} configured successfully.\n`);
  } catch (err) {
    console.error(`❌ Failed to set ${env.key}:`, err.message);
  }
}

console.log("==================================================");
console.log("✅ All Vercel Environment Variables Successfully Synced!");
console.log("==================================================");
