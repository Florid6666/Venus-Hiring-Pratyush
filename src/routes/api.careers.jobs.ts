import { createFileRoute } from "@tanstack/react-router";
import { pool } from "@/lib/db";
import { initCareerDatabase } from "@/lib/careers/schema";

export const Route = createFileRoute("/api/careers/jobs")({
  server: {
    handlers: {
      GET: async () => {
        try {
          await initCareerDatabase();
          const res = await pool.query(
            `SELECT 
              id, title, slug, department, location,
              employment_type AS "employmentType",
              experience_level AS "experienceLevel",
              salary_range AS "salaryRange",
              description, about_role AS "aboutRole",
              responsibilities, qualifications, nice_to_have AS "niceToHave",
              benefits, status, posted_date AS "postedDate", created_at AS "createdAt"
            FROM career_jobs ORDER BY created_at DESC;`
          );

          const formatted = res.rows.map((row) => ({
            ...row,
            responsibilities: typeof row.responsibilities === "string" ? JSON.parse(row.responsibilities) : row.responsibilities || [],
            qualifications: typeof row.qualifications === "string" ? JSON.parse(row.qualifications) : row.qualifications || [],
            niceToHave: typeof row.niceToHave === "string" ? JSON.parse(row.niceToHave) : row.niceToHave || [],
            benefits: typeof row.benefits === "string" ? JSON.parse(row.benefits) : row.benefits || [],
          }));

          return new Response(JSON.stringify(formatted), {
            headers: { "Content-Type": "application/json" },
          });
        } catch (err) {
          console.error("GET /api/careers/jobs error:", err);
          return new Response(JSON.stringify({ error: "Failed to fetch jobs" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },

      POST: async ({ request }) => {
        try {
          await initCareerDatabase();
          const body = await request.json();

          const id = `job_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
          const postedDate = "Just now";

          await pool.query(
            `INSERT INTO career_jobs (
              id, title, slug, department, location, employment_type, experience_level,
              salary_range, description, about_role, responsibilities, qualifications,
              nice_to_have, benefits, status, posted_date
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16);`,
            [
              id,
              body.title,
              body.slug,
              body.department,
              body.location,
              body.employmentType,
              body.experienceLevel,
              body.salaryRange || null,
              body.description,
              body.aboutRole || null,
              JSON.stringify(body.responsibilities || []),
              JSON.stringify(body.qualifications || []),
              JSON.stringify(body.niceToHave || []),
              JSON.stringify(body.benefits || []),
              body.status || "Published",
              postedDate,
            ]
          );

          return new Response(JSON.stringify({ success: true, id }), {
            status: 201,
            headers: { "Content-Type": "application/json" },
          });
        } catch (err) {
          console.error("POST /api/careers/jobs error:", err);
          return new Response(JSON.stringify({ error: "Failed to create job" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
