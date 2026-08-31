import { createFileRoute } from "@tanstack/react-router";
import { pool } from "@/lib/db";
import { initCareerDatabase } from "@/lib/careers/schema";
import { sendApplicationNotificationEmail } from "@/lib/careers/email-service";

export const Route = createFileRoute("/api/careers/applications")({
  server: {
    handlers: {
      GET: async () => {
        try {
          await initCareerDatabase();
          const res = await pool.query(
            `SELECT 
              id, job_id AS "jobId", job_title AS "jobTitle",
              first_name AS "firstName", last_name AS "lastName",
              email, phone, location,
              current_title AS "currentTitle", current_company AS "currentCompany",
              experience_years AS "experienceYears",
              linkedin_url AS "linkedinUrl", portfolio_url AS "portfolioUrl",
              resume_file_name AS "resumeFileName", resume_file_size AS "resumeFileSize",
              resume_file_type AS "resumeFileType", resume_data_url AS "resumeDataUrl",
              is_resume_built_live AS "isResumeBuiltLive",
              cover_letter AS "coverLetter", internal_notes AS "internalNotes",
              consent_given AS "consentGiven", status, submitted_at AS "submittedAt"
            FROM career_applications ORDER BY submitted_at DESC;`
          );

          return new Response(JSON.stringify(res.rows), {
            headers: { "Content-Type": "application/json" },
          });
        } catch (err) {
          console.error("GET /api/careers/applications error:", err);
          return new Response(JSON.stringify({ error: "Failed to fetch applications" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },

      POST: async ({ request }) => {
        try {
          await initCareerDatabase();
          const body = await request.json();

          const id = `app_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
          const submittedAt = new Date().toISOString();

          await pool.query(
            `INSERT INTO career_applications (
              id, job_id, job_title, first_name, last_name, email, phone, location,
              current_title, current_company, experience_years, linkedin_url, portfolio_url,
              resume_file_name, resume_file_size, resume_file_type, resume_data_url,
              is_resume_built_live, cover_letter, consent_given, status, submitted_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22);`,
            [
              id,
              body.jobId,
              body.jobTitle,
              body.firstName,
              body.lastName,
              body.email,
              body.phone,
              body.location || null,
              body.currentTitle || null,
              body.currentCompany || null,
              body.experienceYears,
              body.linkedinUrl || null,
              body.portfolioUrl || null,
              body.resumeFileName || null,
              body.resumeFileSize || null,
              body.resumeFileType || null,
              body.resumeDataUrl || null,
              body.isResumeBuiltLive || false,
              body.coverLetter || null,
              body.consentGiven,
              "New",
              submittedAt,
            ]
          );

          // Await automated email notification with guaranteed server execution (no background promises)
          let emailDetails: { success: boolean; messageId?: string; response?: string; error?: string } = { success: false };
          try {
            console.log(`[CAREER EMAIL]\nApplication ID: ${id}\nCandidate: ${body.firstName} ${body.lastName} <${body.email}>\nTimestamp: ${submittedAt}\nStarting email dispatch...`);
            
            emailDetails = await sendApplicationNotificationEmail({
              id,
              jobId: body.jobId,
              jobTitle: body.jobTitle,
              firstName: body.firstName,
              lastName: body.lastName,
              email: body.email,
              phone: body.phone,
              location: body.location,
              currentTitle: body.currentTitle,
              currentCompany: body.currentCompany,
              experienceYears: body.experienceYears,
              linkedinUrl: body.linkedinUrl,
              portfolioUrl: body.portfolioUrl,
              resumeFileName: body.resumeFileName,
              resumeFileSize: body.resumeFileSize,
              resumeFileType: body.resumeFileType,
              resumeDataUrl: body.resumeDataUrl,
              coverLetter: body.coverLetter,
              submittedAt,
            });

            if (emailDetails.success) {
              console.log(`[CAREER EMAIL SUCCESS]\nApplication ID: ${id}\nMessage ID: ${emailDetails.messageId}\nSMTP Response: ${emailDetails.response}`);
            } else {
              console.error(`[CAREER EMAIL ERROR]\nApplication ID: ${id}\nError: ${emailDetails.error}`);
            }
          } catch (emailErr: any) {
            const errStr = emailErr?.message || String(emailErr);
            console.error(`[CAREER EMAIL EXCEPTION]\nApplication ID: ${id}\nError: ${errStr}`);
            emailDetails = { success: false, error: errStr };
          }

          return new Response(
            JSON.stringify({
              success: true,
              applicationSaved: true,
              emailSent: emailDetails.success,
              messageId: emailDetails.messageId || null,
              smtpResponse: emailDetails.response || null,
              id,
              submittedAt,
              recipients: ["jivan@venushiring.com", "subham@venushiring.ca"],
              error: emailDetails.error || null,
            }),
            {
              status: 201,
              headers: { "Content-Type": "application/json" },
            }
          );
        } catch (err) {
          console.error("POST /api/careers/applications error:", err);
          return new Response(JSON.stringify({ error: "Failed to submit application" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
