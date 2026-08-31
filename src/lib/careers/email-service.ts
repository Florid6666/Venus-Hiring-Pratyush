import nodemailer from "nodemailer";
import type { CareerApplication } from "./applications";

const DEFAULT_RECIPIENTS = ["jivan@venushiring.com", "subham@venushiring.ca"];

const TARGET_RECIPIENTS = process.env.CAREER_NOTIFICATION_EMAIL
  ? process.env.CAREER_NOTIFICATION_EMAIL.split(",").map((s) => s.trim())
  : DEFAULT_RECIPIENTS;

export interface EmailSendResult {
  success: boolean;
  messageId?: string;
  response?: string;
  error?: string;
}

export async function sendApplicationNotificationEmail(app: Partial<CareerApplication>): Promise<EmailSendResult> {
  const host = process.env.SMTP_HOST || process.env.EMAIL_SERVER_HOST;
  const port = parseInt(process.env.SMTP_PORT || process.env.EMAIL_SERVER_PORT || "465", 10);
  const user = process.env.SMTP_USER || process.env.EMAIL_SERVER_USER || process.env.SMTP_FROM;
  const pass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD || process.env.EMAIL_SERVER_PASSWORD;

  const subject = `New Career Application Received - ${app.jobTitle || "Job Position"}`;

  const textBody = `
==================================================
NEW CAREER APPLICATION RECEIVED - VENUS HIRING
==================================================

CANDIDATE PERSONAL INFORMATION
--------------------------------------------------
Candidate Name: ${app.firstName || ""} ${app.lastName || ""}
Email: ${app.email || "N/A"}
Phone: ${app.phone || "N/A"}
Location: ${app.location || "Not specified"}

POSITION DETAILS
--------------------------------------------------
Applied Position: ${app.jobTitle || "N/A"}

PROFESSIONAL EXPERIENCE
--------------------------------------------------
Current Role: ${app.currentTitle || "Not specified"}
Current Company: ${app.currentCompany || "Not specified"}
Years of Experience: ${app.experienceYears || "Not specified"}

ONLINE PROFILES
--------------------------------------------------
LinkedIn: ${app.linkedinUrl || "Not provided"}
Portfolio/Website: ${app.portfolioUrl || "Not provided"}

COVER LETTER
--------------------------------------------------
${app.coverLetter || "No cover letter provided."}

RESUME DETAILS
--------------------------------------------------
Filename: ${app.resumeFileName || "Uploaded Resume"}
File Size: ${app.resumeFileSize || "N/A"}
Format: ${app.resumeFileType || "N/A"}

APPLICATION TIMESTAMP
--------------------------------------------------
Application Date: ${app.submittedAt ? new Date(app.submittedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : new Date().toLocaleDateString()}
Submission Time: ${app.submittedAt ? new Date(app.submittedAt).toLocaleTimeString("en-US") : new Date().toLocaleTimeString()}

==================================================
This is an automated notification from Venus Hiring CMS.
Recipients: ${TARGET_RECIPIENTS.join(", ")}
`;

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a;">
  <div style="max-width: 640px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);">
    
    <!-- Header -->
    <div style="background-color: #dc2626; padding: 24px 32px; text-align: left;">
      <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.5px;">
        Venus Hiring • Career Application
      </h1>
      <p style="color: rgba(255,255,255,0.85); margin: 4px 0 0 0; font-size: 13px;">
        New submission for ${app.jobTitle}
      </p>
    </div>

    <!-- Main Content -->
    <div style="padding: 32px;">
      
      <!-- Candidate Overview Banner -->
      <div style="background-color: #f1f5f9; border-radius: 12px; padding: 16px 20px; margin-bottom: 24px;">
        <h2 style="margin: 0; font-size: 18px; color: #0f172a; font-weight: 700;">
          ${app.firstName} ${app.lastName}
        </h2>
        <p style="margin: 4px 0 0 0; font-size: 14px; color: #475569;">
          ${app.email} &nbsp;•&nbsp; ${app.phone}
        </p>
      </div>

      <!-- Detail Grid -->
      <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 24px;">
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600; width: 140px;">Applied Position:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 700;">${app.jobTitle}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Location:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${app.location || "Not specified"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Current Role:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${app.currentTitle || "Not specified"} ${app.currentCompany ? `at ${app.currentCompany}` : ""}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Experience:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${app.experienceYears}</td>
        </tr>
        ${app.linkedinUrl ? `
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">LinkedIn:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;"><a href="${app.linkedinUrl}" style="color: #dc2626; text-decoration: none; font-weight: 600;">${app.linkedinUrl}</a></td>
        </tr>` : ""}
        ${app.portfolioUrl ? `
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Portfolio:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;"><a href="${app.portfolioUrl}" style="color: #dc2626; text-decoration: none; font-weight: 600;">${app.portfolioUrl}</a></td>
        </tr>` : ""}
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Resume File:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${app.resumeFileName || "Uploaded Resume"} (${app.resumeFileSize || "N/A"})</td>
        </tr>
      </table>

      ${app.coverLetter ? `
      <!-- Cover Letter Block -->
      <div style="margin-bottom: 24px;">
        <h3 style="font-size: 13px; text-transform: uppercase; tracking: 1px; color: #64748b; margin: 0 0 8px 0;">Cover Letter</h3>
        <div style="background-color: #fafafa; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; font-size: 13px; color: #334155; line-height: 1.6;">
          ${app.coverLetter.replace(/\n/g, '<br/>')}
        </div>
      </div>` : ""}

      <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; margin-top: 24px; font-size: 11px; color: #94a3b8; text-align: center;">
        Submitted on ${app.submittedAt ? new Date(app.submittedAt).toLocaleString() : new Date().toLocaleString()} • Recipients: ${TARGET_RECIPIENTS.join(", ")}
      </div>

    </div>
  </div>
</body>
</html>
`;

  try {
    if (host && user && pass) {
      console.log(`[CAREER EMAIL]\nApplication ID: ${app.id || "N/A"}\nCandidate: ${app.firstName || ""} ${app.lastName || ""} <${app.email || "N/A"}>\nTimestamp: ${app.submittedAt || new Date().toISOString()}\nStarting email dispatch...`);

      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
        tls: {
          rejectUnauthorized: false,
        },
      });

      const attachments: any[] = [];
      if (app.resumeDataUrl && app.resumeFileName) {
        const matches = app.resumeDataUrl.match(/^data:(.+);base64,(.+)$/);
        if (matches && matches[2]) {
          const buffer = Buffer.from(matches[2], "base64");
          if (buffer.length < 2.5 * 1024 * 1024) {
            attachments.push({
              filename: app.resumeFileName,
              content: buffer,
            });
          }
        }
      }

      const info = await transporter.sendMail({
        from: `"Venus Hiring Careers" <${user}>`,
        to: TARGET_RECIPIENTS.join(", "),
        subject,
        text: textBody,
        html: htmlBody,
        attachments,
      });

      console.log(`[Email Service SUCCESS] Message ID: ${info.messageId} | Response: ${info.response} | Recipients: ${TARGET_RECIPIENTS.join(", ")}`);
      return {
        success: true,
        messageId: info.messageId,
        response: info.response,
      };
    } else {
      const warnMsg = `Missing SMTP credentials: host=${Boolean(host)}, user=${Boolean(user)}, pass=${Boolean(pass)}`;
      console.warn(`[Email Service Warning] ${warnMsg}. Recipients: ${TARGET_RECIPIENTS.join(", ")}`);
      return {
        success: false,
        error: warnMsg,
      };
    }
  } catch (err: any) {
    const errorStr = err?.message || String(err);
    console.error(`[Email Service Error] Failed to deliver email to ${TARGET_RECIPIENTS.join(", ")}:`, errorStr);
    return {
      success: false,
      error: errorStr,
    };
  }
}
