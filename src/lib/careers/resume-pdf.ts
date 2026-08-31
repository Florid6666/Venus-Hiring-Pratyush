import type { ResumeData } from "@/components/careers/resume-types";

export async function generateResumePDF(data: ResumeData): Promise<void> {
  // Simulate preparation delay for smooth button animation
  await new Promise((resolve) => setTimeout(resolve, 800));

  const isExecutive = data.template === "executive";

  // Sanitize File Name
  const fileName = data.fullName.trim()
    ? `${data.fullName.trim().replace(/[^a-zA-Z0-9]/g, "_")}_Resume.pdf`
    : "Venus_Resume.pdf";

  // Construct Standalone HTML with Print Stylesheet for A4 PDF Output
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${data.fullName || "Resume"} - Venus Hiring</title>
  <style>
    @page {
      size: A4;
      margin: 15mm;
    }
    *, *:before, *:after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: ${
        isExecutive
          ? '"Georgia", "Times New Roman", serif'
          : '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      };
      color: #0f172a;
      background: #ffffff;
      line-height: 1.45;
      font-size: 11pt;
      padding: 10px;
    }
    .header {
      padding-bottom: 14px;
      margin-bottom: 18px;
      border-bottom: ${isExecutive ? "2px solid #1e293b" : "none"};
      ${
        !isExecutive
          ? "border-left: 5px solid #dc2626; padding-left: 14px;"
          : "text-center;"
      }
    }
    .name {
      font-size: 22pt;
      font-weight: 700;
      color: #020617;
      letter-spacing: -0.02em;
    }
    .contact-line {
      margin-top: 8px;
      font-size: 9pt;
      color: #475569;
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      ${isExecutive ? "justify-content: center;" : "justify-content: flex-start;"}
    }
    .section {
      margin-bottom: 16px;
    }
    .section-title {
      font-size: 9pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      margin-bottom: 8px;
      padding-bottom: 3px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      ${
        isExecutive
          ? "color: #020617; border-bottom: 1px solid #cbd5e1;"
          : "color: #dc2626; border-bottom: 1px solid #fee2e2;"
      }
    }
    .summary-text {
      font-size: 9.5pt;
      color: #334155;
      line-height: 1.5;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    .entry {
      margin-bottom: 10px;
    }
    .entry-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .entry-title {
      font-size: 10pt;
      font-weight: 700;
      color: #0f172a;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    .entry-company {
      font-weight: 400;
      color: #475569;
    }
    .entry-date {
      font-size: 8.5pt;
      font-weight: 600;
      color: #64748b;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    .entry-desc {
      font-size: 9pt;
      color: #334155;
      margin-top: 3px;
      line-height: 1.45;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    .skills-container {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 4px;
    }
    .skill-pill {
      font-size: 8.5pt;
      font-weight: 600;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      ${
        isExecutive
          ? "background: #f1f5f9; color: #1e293b; padding: 2px 8px; border-radius: 4px;"
          : "background: #fef2f2; color: #dc2626; padding: 3px 10px; border-radius: 12px;"
      }
    }
  </style>
</head>
<body>
  <!-- HEADER -->
  <div class="header">
    <div class="name">${data.fullName || "Your Full Name"}</div>
    <div class="contact-line">
      ${data.email ? `<span>✉ ${data.email}</span>` : ""}
      ${data.phone ? `<span>☎ ${data.phone}</span>` : ""}
      ${data.location ? `<span>📍 ${data.location}</span>` : ""}
      ${data.linkedin ? `<span>🔗 ${data.linkedin}</span>` : ""}
      ${data.portfolio ? `<span>🌐 ${data.portfolio}</span>` : ""}
    </div>
  </div>

  <!-- SUMMARY -->
  ${
    data.summary
      ? `<div class="section">
          <div class="section-title">Professional Summary</div>
          <div class="summary-text">${data.summary}</div>
        </div>`
      : ""
  }

  <!-- WORK EXPERIENCE -->
  ${
    data.experience && data.experience.length > 0
      ? `<div class="section">
          <div class="section-title">Work Experience</div>
          ${data.experience
            .map(
              (exp) => `
            <div class="entry">
              <div class="entry-header">
                <span class="entry-title">${exp.jobTitle} <span class="entry-company">at ${exp.company}</span></span>
                <span class="entry-date">${exp.duration}</span>
              </div>
              ${exp.description ? `<div class="entry-desc">${exp.description}</div>` : ""}
            </div>
          `
            )
            .join("")}
        </div>`
      : ""
  }

  <!-- EDUCATION -->
  ${
    data.education && data.education.length > 0
      ? `<div class="section">
          <div class="section-title">Education</div>
          ${data.education
            .map(
              (edu) => `
            <div class="entry">
              <div class="entry-header">
                <span class="entry-title">${edu.degree} in ${edu.fieldOfStudy} <span class="entry-company">(${edu.institution})</span></span>
                <span class="entry-date">${edu.startYear} - ${edu.endYear}</span>
              </div>
            </div>
          `
            )
            .join("")}
        </div>`
      : ""
  }

  <!-- SKILLS -->
  ${
    data.skills && data.skills.length > 0
      ? `<div class="section">
          <div class="section-title">Skills & Expertise</div>
          <div class="skills-container">
            ${data.skills.map((s) => `<span class="skill-pill">${s}</span>`).join("")}
          </div>
        </div>`
      : ""
  }

  <!-- PROJECTS -->
  ${
    data.projects && data.projects.length > 0
      ? `<div class="section">
          <div class="section-title">Projects</div>
          ${data.projects
            .map(
              (p) => `
            <div class="entry">
              <div class="entry-header">
                <span class="entry-title">${p.name}</span>
              </div>
              ${p.description ? `<div class="entry-desc">${p.description}</div>` : ""}
              ${p.technologies ? `<div class="entry-desc" style="color: #64748b; font-size: 8pt;">Technologies: ${p.technologies}</div>` : ""}
            </div>
          `
            )
            .join("")}
        </div>`
      : ""
  }

  <!-- CERTIFICATIONS -->
  ${
    data.certifications && data.certifications.length > 0
      ? `<div class="section">
          <div class="section-title">Certifications</div>
          ${data.certifications
            .map(
              (c) => `
            <div class="entry-header" style="margin-bottom: 4px;">
              <span class="entry-title">${c.name} <span class="entry-company">(${c.organization})</span></span>
              <span class="entry-date">${c.year}</span>
            </div>
          `
            )
            .join("")}
        </div>`
      : ""
  }

  <!-- LANGUAGES -->
  ${
    data.languages && data.languages.length > 0
      ? `<div class="section">
          <div class="section-title">Languages</div>
          <div class="summary-text">${data.languages.join(" · ")}</div>
        </div>`
      : ""
  }
</body>
</html>
  `;

  // Create an invisible iframe to execute native browser print-to-PDF / PDF download cleanly
  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) {
    throw new Error("Unable to access PDF iframe document.");
  }

  doc.open();
  doc.write(htmlContent);
  doc.close();

  // Trigger print print dialog / save-as-PDF
  setTimeout(() => {
    iframe.contentWindow?.focus();
    iframe.contentWindow?.print();
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  }, 300);
}
