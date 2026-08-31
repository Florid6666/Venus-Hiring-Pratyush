import { createFileRoute } from "@tanstack/react-router";
import { initDatabase, pool } from "@/lib/db";

export const Route = createFileRoute("/api/faqs")({
  server: {
    handlers: {
      GET: async () => {
        try {
          await initDatabase();
          const res = await pool.query(
            "SELECT id, question AS q, answer AS a, category, order_index AS \"orderIndex\" FROM faqs ORDER BY order_index ASC, created_at ASC;"
          );

          return new Response(
            JSON.stringify({ success: true, faqs: res.rows }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        } catch (err: unknown) {
          const errorMsg = err instanceof Error ? err.message : String(err);
          console.error("[PostgreSQL GET /api/faqs Warning]:", errorMsg);
          const fallbackFaqs = [
            {
              id: "faq-1",
              q: "How fast can Venus Consultancy present candidate shortlists?",
              a: "For standard permanent and contract roles, our team presents calibrated 3-candidate shortlists within 5 to 10 business days.",
              category: "General",
              orderIndex: 1,
            },
            {
              id: "faq-2",
              q: "What hiring guarantee do you provide?",
              a: "Every permanent placement is backed by a 90-day retention guarantee and replacement commitment written into our client service agreements.",
              category: "General",
              orderIndex: 2,
            },
          ];
          return new Response(
            JSON.stringify({ success: true, faqs: fallbackFaqs }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        }
      },

      POST: async ({ request }) => {
        try {
          await initDatabase();
          const { id, q, a, category, orderIndex } = await request.json();

          if (!q || !a) {
            return new Response(
              JSON.stringify({ success: false, error: "Question and Answer are required" }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }

          const faqId = id || `faq-${Date.now()}`;
          const query = `
            INSERT INTO faqs (id, question, answer, category, order_index)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (id) DO UPDATE SET
              question = EXCLUDED.question,
              answer = EXCLUDED.answer,
              category = EXCLUDED.category,
              order_index = EXCLUDED.order_index
            RETURNING id, question AS q, answer AS a, category, order_index AS "orderIndex";
          `;

          const result = await pool.query(query, [
            faqId,
            q,
            a,
            category || "General",
            orderIndex || 0,
          ]);

          return new Response(
            JSON.stringify({ success: true, faq: result.rows[0] }),
            { status: 201, headers: { "Content-Type": "application/json" } }
          );
        } catch (err: unknown) {
          const errorMsg = err instanceof Error ? err.message : String(err);
          console.error("[PostgreSQL POST /api/faqs Error]:", errorMsg);
          return new Response(
            JSON.stringify({ success: false, error: errorMsg }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
      },

      PUT: async ({ request }) => {
        try {
          await initDatabase();
          const body = await request.json();

          if (body.reorderList && Array.isArray(body.reorderList)) {
            for (let idx = 0; idx < body.reorderList.length; idx++) {
              const item = body.reorderList[idx];
              await pool.query("UPDATE faqs SET order_index = $1 WHERE id = $2;", [idx, item.id]);
            }
            return new Response(
              JSON.stringify({ success: true }),
              { status: 200, headers: { "Content-Type": "application/json" } }
            );
          }

          const { id, q, a, category, orderIndex } = body;
          if (!id) {
            return new Response(
              JSON.stringify({ success: false, error: "FAQ ID is required" }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }

          const query = `
            UPDATE faqs SET
              question = COALESCE($2, question),
              answer = COALESCE($3, answer),
              category = COALESCE($4, category),
              order_index = COALESCE($5, order_index)
            WHERE id = $1 RETURNING id, question AS q, answer AS a, category, order_index AS "orderIndex";
          `;

          const result = await pool.query(query, [id, q, a, category, orderIndex]);

          return new Response(
            JSON.stringify({ success: true, faq: result.rows[0] }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        } catch (err: unknown) {
          const errorMsg = err instanceof Error ? err.message : String(err);
          console.error("[PostgreSQL PUT /api/faqs Error]:", errorMsg);
          return new Response(
            JSON.stringify({ success: false, error: errorMsg }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
      },

      DELETE: async ({ request }) => {
        try {
          await initDatabase();
          const { id } = await request.json();

          if (!id) {
            return new Response(
              JSON.stringify({ success: false, error: "FAQ ID is required" }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }

          await pool.query("DELETE FROM faqs WHERE id = $1;", [id]);

          return new Response(
            JSON.stringify({ success: true }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        } catch (err: unknown) {
          const errorMsg = err instanceof Error ? err.message : String(err);
          console.error("[PostgreSQL DELETE /api/faqs Error]:", errorMsg);
          return new Response(
            JSON.stringify({ success: false, error: errorMsg }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
      },
    },
  },
});
