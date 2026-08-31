import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/ai-assistant")({
  component: AiAssistantRedirect,
});

function AiAssistantRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    // Cleanly redirect to homepage where the floating Venus AI Assistant popup lives
    navigate({ to: "/", replace: true });
  }, [navigate]);

  return null;
}
