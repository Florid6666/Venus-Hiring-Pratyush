import { createFileRoute } from "@tanstack/react-router";
import nodemailer from "nodemailer";
import { initDatabase, pool } from "@/lib/db";

function sanitize(input: string): string {
  if (!input) return "";
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 150;
}

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          // Parse request body
          const body = await request.json();

          // 1. Honeypot check (Spam Protection)
          if (body.website || body.honeypot || body.hp_field) {
            // Silently pretend success to trap automated spam bots
            return new Response(JSON.stringify({ success: true, message: "Submitted" }), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            });
          }

          // 2. Extract & Validate Fields
          const name = (body.name || "").trim();
          const email = (body.email || "").trim();
          const source = (body.source || body.submissionType || "Hire Talent Popup").trim();
          const hearAboutUs = (body.hearAboutUs || body.howDidYouHear || "Not Specified").trim();
          const serviceType = (body.serviceType || "Permanent Placement").trim();
          const phone = (body.phone || "Not Provided").trim();
          const company = (body.company || "Not Provided").trim();
          const role = (body.role || "Not Provided").trim();
          const budget = (body.budget || "Not Specified").trim();
          const location = (body.location || "Not Specified").trim();
          const messageContent = (body.message || body.brief || "").trim();

          if (!name || name.length > 100) {
            return new Response(
              JSON.stringify({ success: false, message: "Please enter your full name." }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }

          if (!email || !isValidEmail(email)) {
            return new Response(
              JSON.stringify({ success: false, message: "Please enter a valid work email address." }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }

          // If brief/message is missing, default to clean text
          const briefText = messageContent || "No detailed message provided.";

          // 3. Sanitize inputs for HTML email
          const safeName = sanitize(name);
          const safeEmail = sanitize(email);
          const safeSource = sanitize(source);
          const safeHearAboutUs = sanitize(hearAboutUs);
          const safeService = sanitize(serviceType);
          const safePhone = sanitize(phone);
          const safeCompany = sanitize(company);
          const safeRole = sanitize(role);
          const safeBudget = sanitize(budget);
          const safeLocation = sanitize(location);
          const safeBrief = sanitize(briefText).replace(/\n/g, "<br/>");
          const submissionDate = new Date().toUTCString();

          // 4. Environment Variables (Strict process.env reads)
          const host = process.env.SMTP_HOST;
          const port = parseInt(process.env.SMTP_PORT || "465", 10);
          const secure = process.env.SMTP_SECURE !== "false";
          const user = process.env.SMTP_USER;
          const pass = process.env.SMTP_PASSWORD;
          const from = process.env.SMTP_FROM || user || "noreply@venushiring.ca";

          // Mandatory Recipient subham@venushiring.ca + optional env receiver
          const primaryReceiver = "subham@venushiring.ca";
          const envReceiver = process.env.CONTACT_RECEIVER_EMAIL;
          const receiversList = envReceiver
            ? Array.from(new Set([primaryReceiver, envReceiver.trim()])).join(", ")
            : primaryReceiver;

          // Log server-side record of submission
          console.log("[NEW HIRE TALENT SUBMISSION]", {
            source,
            name,
            email,
            hearAboutUs,
            message: messageContent,
            receivers: receiversList,
            date: submissionDate,
          });

          // 5. Save into Railway PostgreSQL Database contact_briefs table (if available)
          try {
            await initDatabase();
            await pool.query(
              `INSERT INTO contact_briefs (
                name, email, service_type, phone, company, role, budget, location, brief
              ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`,
              [name, email, serviceType, phone, company, role, budget, location, `[Source: ${source} | Heard: ${hearAboutUs}] ${briefText}`]
            );
            console.log("[PostgreSQL] Hire Talent Inquiry Saved to Database.");
          } catch (dbErr) {
            console.error("[PostgreSQL Contact Insert Notice]:", dbErr);
          }

          // 6. Create Nodemailer Transporter
          const transporter = nodemailer.createTransport({
            host,
            port,
            secure,
            auth: {
              user,
              pass,
            },
            connectionTimeout: 10000,
            greetingTimeout: 5000,
            socketTimeout: 10000,
            tls: {
              rejectUnauthorized: false,
            },
          });

          // 7. Email #1: Send Internal Notification to subham@venushiring.ca
          const venusMailOptions = {
            from: `"Venus Hiring - ${safeSource}" <${from}>`,
            to: receiversList,
            replyTo: safeEmail,
            subject: `[Hire Talent Inquiry] New Enquiry from ${safeName} (${safeEmail})`,
            html: `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <style>
                    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 24px 12px; }
                    .wrapper { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-top: 4px solid #e01e37; border-radius: 8px; overflow: hidden; }
                    .header { padding: 24px 28px 20px 28px; border-bottom: 1px solid #f1f5f9; }
                    .brand { font-size: 20px; font-weight: 700; color: #0f172a; letter-spacing: -0.02em; text-decoration: none; }
                    .brand span { color: #e01e37; }
                    .tagline { font-size: 12px; font-weight: 600; text-transform: uppercase; tracking: 0.1em; color: #64748b; margin-top: 4px; }
                    .content { padding: 28px; font-size: 14px; line-height: 1.6; color: #334155; }
                    .section-head { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #e01e37; margin: 20px 0 10px 0; border-bottom: 1px solid #f1f5f9; padding-bottom: 4px; }
                    .info-table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
                    .info-table td { padding: 8px 0; border-bottom: 1px dashed #f1f5f9; font-size: 13.5px; }
                    .label { color: #64748b; font-weight: 600; width: 38%; }
                    .value { color: #0f172a; font-weight: 600; }
                    .brief-container { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; font-size: 13.5px; line-height: 1.65; color: #1e293b; margin-top: 8px; }
                    .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 28px; font-size: 12px; color: #64748b; text-align: left; }
                  </style>
                </head>
                <body>
                  <div class="wrapper">
                    <div class="header">
                      <div class="brand">Venus <span>Consultancy</span></div>
                      <div class="tagline">New ${safeSource} Inquiry</div>
                    </div>
                    <div class="content">
                      <div class="section-head">Client / Employer Details</div>
                      <table class="info-table">
                        <tr><td class="label">Submission Source:</td><td class="value" style="color: #e01e37;">${safeSource}</td></tr>
                        <tr><td class="label">Full Name:</td><td class="value">${safeName}</td></tr>
                        <tr><td class="label">Work Email:</td><td class="value"><a href="mailto:${safeEmail}" style="color: #e01e37; text-decoration: none;">${safeEmail}</a></td></tr>
                        <tr><td class="label">How Heard:</td><td class="value">${safeHearAboutUs}</td></tr>
                        ${safePhone !== "Not Provided" ? `<tr><td class="label">Contact Number:</td><td class="value">${safePhone}</td></tr>` : ""}
                        ${safeCompany !== "Not Provided" ? `<tr><td class="label">Company:</td><td class="value">${safeCompany}</td></tr>` : ""}
                        ${safeRole !== "Not Provided" ? `<tr><td class="label">Role:</td><td class="value">${safeRole}</td></tr>` : ""}
                      </table>

                      <div class="section-head">Message / Requirement Details</div>
                      <div class="brief-container">
                        ${safeBrief}
                      </div>
                    </div>
                    <div class="footer">
                      Submitted on ${submissionDate} &bull; Sent to ${receiversList}
                    </div>
                  </div>
                </body>
              </html>
            `,
          };

          // 8. Email #2: Send Auto-Confirmation to Employer / Candidate
          const confirmationMailOptions = {
            from: `"Venus Consultancy" <${from}>`,
            to: safeEmail,
            subject: `We've Received Your Hiring Inquiry — Venus Consultancy`,
            html: `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <style>
                    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 24px 12px; }
                    .wrapper { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-top: 4px solid #e01e37; border-radius: 8px; overflow: hidden; }
                    .header { padding: 24px 28px 20px 28px; border-bottom: 1px solid #f1f5f9; }
                    .brand { font-size: 20px; font-weight: 700; color: #0f172a; letter-spacing: -0.02em; }
                    .brand span { color: #e01e37; }
                    .content { padding: 28px; font-size: 14.5px; line-height: 1.65; color: #334155; }
                    .notice-box { margin: 24px 0; padding: 18px 20px; background-color: #f8fafc; border-left: 3px solid #e01e37; border-top: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9; border-bottom: 1px solid #f1f5f9; border-radius: 6px; }
                    .notice-text { margin: 0; font-size: 14px; font-weight: 600; line-height: 1.6; color: #0f172a; }
                    .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 28px; font-size: 12.5px; color: #64748b; }
                    .footer p { margin: 3px 0; }
                  </style>
                </head>
                <body>
                  <div class="wrapper">
                    <div class="header">
                      <div class="brand">Venus <span>Consultancy</span></div>
                    </div>
                    <div class="content">
                      <p style="margin-top: 0;">Hello <strong>${safeName}</strong>,</p>
                      <p>Thank you for reaching out to <strong>Venus Consultancy</strong> regarding your hiring needs.</p>
                      
                      <div class="notice-box">
                        <p class="notice-text">
                          Our recruitment partners have received your inquiry and will contact you within 24 hours to assist with your hiring strategy.
                        </p>
                      </div>

                      <p>Whether you require executive search, technical recruitment, contract staffing, or talent advisory across North America & India, our team is ready to assist.</p>

                      <p style="margin-top: 32px; font-size: 14px; line-height: 1.5; color: #0f172a;">
                        Best regards,<br/>
                        <strong style="color: #e01e37;">Venus Consultancy Team</strong>
                      </p>
                    </div>
                    <div class="footer">
                      <p><strong>Venus Consultancy</strong> &bull; Executive Search & Technical Staffing</p>
                      <p>Canada &bull; USA &bull; India</p>
                      <p><a href="https://www.venushiring.ca" style="color: #e01e37; text-decoration: none; font-weight: 600;">www.venushiring.ca</a></p>
                    </div>
                  </div>
                </body>
              </html>
            `,
          };

          // 9. Send emails over SMTP
          if (host && user && pass) {
            try {
              const venusInfo = await transporter.sendMail(venusMailOptions);
              await transporter.sendMail(confirmationMailOptions);
              console.log("[Venus SMTP Delivery Success]: Sent to subham@venushiring.ca. Accepted:", venusInfo.accepted);
            } catch (smtpErr: unknown) {
              const errDetail = smtpErr instanceof Error ? smtpErr.message : String(smtpErr);
              console.error("[Venus SMTP Transmission Notice]:", errDetail);
            }
          } else {
            console.log("[Notice]: SMTP environment variables (SMTP_HOST / SMTP_USER / SMTP_PASSWORD) not configured on current environment. Submission logged to console & DB.");
          }

          return new Response(
            JSON.stringify({
              success: true,
              message: "Thank you! Your hiring inquiry has been received.",
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        } catch (err: unknown) {
          const errorMessage = err instanceof Error ? err.message : String(err);
          console.error("[Venus Contact API Error]:", errorMessage);

          return new Response(
            JSON.stringify({
              success: false,
              message: "Unable to process your request at this time. Please try again.",
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
      },
    },
  },
});
