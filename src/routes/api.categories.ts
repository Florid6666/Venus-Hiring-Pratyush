import { createFileRoute } from "@tanstack/react-router";
import { initDatabase, pool } from "@/lib/db";

export const Route = createFileRoute("/api/categories")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          await initDatabase();
          const { name } = await request.json();

          if (!name || !name.trim()) {
            return new Response(
              JSON.stringify({ success: false, error: "Category name required" }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }

          await pool.query(
            "INSERT INTO categories (name) VALUES ($1) ON CONFLICT (name) DO NOTHING;",
            [name.trim()]
          );

          return new Response(
            JSON.stringify({ success: true }),
            { status: 201, headers: { "Content-Type": "application/json" } }
          );
        } catch (err: unknown) {
          const errorMsg = err instanceof Error ? err.message : String(err);
          console.error("[PostgreSQL POST /api/categories Error]:", errorMsg);
          return new Response(
            JSON.stringify({ success: false, error: errorMsg }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
      },

      DELETE: async ({ request }) => {
        try {
          await initDatabase();
          const { name } = await request.json();

          if (!name) {
            return new Response(
              JSON.stringify({ success: false, error: "Category name required" }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }

          await pool.query("DELETE FROM categories WHERE name = $1;", [name]);

          return new Response(
            JSON.stringify({ success: true }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        } catch (err: unknown) {
          const errorMsg = err instanceof Error ? err.message : String(err);
          console.error("[PostgreSQL DELETE /api/categories Error]:", errorMsg);
          return new Response(
            JSON.stringify({ success: false, error: errorMsg }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
      },
    },
  },
});
