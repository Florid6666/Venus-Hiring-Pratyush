import React, { useEffect, useRef, useState } from "react";
import { ExternalLink, RefreshCw } from "lucide-react";
import { CRM_WEB_URL } from "@/lib/careers/constants";

interface CareersBoardProps {
  fullHeight?: boolean;
  minHeight?: string;
  showToolbar?: boolean;
}

export function CareersBoard({
  fullHeight = false,
  minHeight = "920px",
  showToolbar = false,
}: CareersBoardProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState<string>(fullHeight ? "100vh" : minHeight);
  const [isLoading, setIsLoading] = useState(true);

  // Auto-resize listener: adjusts height dynamically if the CRM posts SET_CAREERS_HEIGHT
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data && e.data.type === "SET_CAREERS_HEIGHT" && typeof e.data.height === "number") {
        setIframeHeight(`${Math.max(e.data.height, 900)}px`);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleReload = () => {
    setIsLoading(true);
    if (iframeRef.current) {
      iframeRef.current.src = `${CRM_WEB_URL}/careers?t=${Date.now()}`;
    }
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: fullHeight ? "100vh" : minHeight,
        backgroundColor: "#faf9f6",
        position: "relative",
        borderRadius: fullHeight ? "0" : "1.5rem",
        overflow: "hidden",
      }}
      className="shadow-xs"
    >
      {showToolbar && (
        <div className="flex items-center justify-between border-b border-border/60 bg-card/80 px-4 py-2.5 text-xs text-muted-foreground backdrop-blur-sm sm:px-6">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-semibold text-foreground">Venus CRM Careers Portal</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleReload}
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
              title="Refresh job listings"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin text-brand" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <a
              href={`${CRM_WEB_URL}/careers`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium text-brand hover:bg-brand/10 transition-colors"
            >
              <span>Open in new tab</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      )}

      {/* Loading Skeleton Indicator */}
      {isLoading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "450px",
            backgroundColor: "#faf9f6",
            zIndex: 10,
          }}
        >
          <div className="flex flex-col items-center gap-3 text-center px-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-brand" />
            <p className="font-display text-sm font-semibold text-foreground">
              Connecting to Venus CRM Portal...
            </p>
            <p className="text-xs text-muted-foreground max-w-xs">
              Loading open positions and candidate application systems directly from our recruitment
              engine.
            </p>
          </div>
        </div>
      )}

      {/* Embedded CRM Careers iFrame */}
      <iframe
        ref={iframeRef}
        src={`${CRM_WEB_URL}/careers`}
        title="Venus Global Tech Careers"
        onLoad={() => setIsLoading(false)}
        style={{
          width: "100%",
          minHeight: "920px",
          height: iframeHeight,
          border: "none",
          display: "block",
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.25s ease-in-out",
        }}
        allow="clipboard-write"
      />
    </div>
  );
}

// User-specified standalone component with exact function name and default export
export default function CareersBoardPage() {
  return (
    <div style={{ width: "100%", minHeight: "100vh", backgroundColor: "#faf9f6" }}>
      <iframe
        src={`${CRM_WEB_URL}/careers`}
        title="Venus Global Tech Careers"
        style={{
          width: "100%",
          minHeight: "920px",
          height: "100vh",
          border: "none",
          display: "block",
        }}
        allow="clipboard-write"
      />
    </div>
  );
}
