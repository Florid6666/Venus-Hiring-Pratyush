import { useState } from "react";
import { ArrowLeft, Sparkles, Eye, Edit3, Download, Loader2, CheckCircle2 } from "lucide-react";
import { ResumeForm } from "./ResumeForm";
import { ResumePreview } from "./ResumePreview";
import { INITIAL_RESUME_DATA, type ResumeData } from "./resume-types";
import { generateResumePDF } from "@/lib/careers/resume-pdf";

export function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>(INITIAL_RESUME_DATA);
  const [mobileTab, setMobileTab] = useState<"edit" | "preview">("edit");
  const [downloadStatus, setDownloadStatus] = useState<"idle" | "generating" | "completed">("idle");

  const handleDownloadPDF = async () => {
    if (downloadStatus === "generating") return;

    setDownloadStatus("generating");
    try {
      await generateResumePDF(resumeData);
      setDownloadStatus("completed");

      setTimeout(() => {
        setDownloadStatus("idle");
      }, 2500);
    } catch (err) {
      console.error("PDF generation error:", err);
      setDownloadStatus("idle");
    }
  };

  return (
    <div className="min-h-screen bg-porcelain/40 py-10 sm:py-14">
      <div className="shell">
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <a
              href="/careers"
              className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-brand transition-colors mb-2 block"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Careers
            </a>
            <h1 className="mt-2 font-display text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl tracking-tight">
              Create Your Professional Resume
            </h1>
          </div>

          {/* Action Header Button: Download PDF */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleDownloadPDF}
              disabled={downloadStatus === "generating"}
              className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-xs sm:text-sm font-bold text-white shadow-brand transition-all duration-300 hover:brightness-110 active:translate-y-0 disabled:opacity-75 disabled:cursor-not-allowed ${
                downloadStatus === "completed"
                  ? "bg-emerald-600 hover:bg-emerald-600"
                  : "bg-primary"
              }`}
            >
              {downloadStatus === "generating" && (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  GENERATING PDF...
                </>
              )}
              {downloadStatus === "completed" && (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  DOWNLOAD COMPLETE
                </>
              )}
              {downloadStatus === "idle" && (
                <>
                  <Download className="h-4 w-4" />
                  DOWNLOAD RESUME PDF
                </>
              )}
            </button>
          </div>

          {/* Mobile View Toggle Buttons */}
          <div className="flex items-center gap-2 sm:hidden w-full pt-2">
            <button
              type="button"
              onClick={() => setMobileTab("edit")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold border ${
                mobileTab === "edit"
                  ? "bg-brand text-white border-brand"
                  : "bg-card text-foreground border-border"
              }`}
            >
              <Edit3 className="h-4 w-4" /> Editor Form
            </button>
            <button
              type="button"
              onClick={() => setMobileTab("preview")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold border ${
                mobileTab === "preview"
                  ? "bg-brand text-white border-brand"
                  : "bg-card text-foreground border-border"
              }`}
            >
              <Eye className="h-4 w-4" /> Live Preview
            </button>
          </div>
        </div>

        {/* Main Editor + Preview Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* LEFT SIDE: FORM EDITOR (Hidden on mobile if preview tab active) */}
          <div
            className={`lg:col-span-6 ${
              mobileTab === "edit" ? "block" : "hidden sm:block"
            }`}
          >
            <ResumeForm data={resumeData} onChange={setResumeData} />
          </div>

          {/* RIGHT SIDE: STICKY LIVE PREVIEW (Hidden on mobile if editor tab active) */}
          <div
            className={`lg:col-span-6 ${
              mobileTab === "preview" ? "block" : "hidden sm:block"
            }`}
          >
            <div className="sticky top-24 space-y-4">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  LIVE PREVIEW ({resumeData.template === "executive" ? "Executive Clean" : "Modern Professional"})
                </span>
              </div>
              <ResumePreview data={resumeData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
