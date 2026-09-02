import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/jobs")({
  component: () => <Navigate to="/careers" replace />,
});
