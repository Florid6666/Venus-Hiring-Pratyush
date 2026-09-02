import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/find-jobs")({
  component: () => <Navigate to="/careers" replace />,
});
