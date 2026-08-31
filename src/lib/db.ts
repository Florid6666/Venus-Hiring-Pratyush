import pg from "pg";
import { INITIAL_BLOGS, INITIAL_CATEGORIES } from "./blog-store";
const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

export const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

let initPromise: Promise<void> | null = null;

export async function initDatabase() {
  if (initPromise) return initPromise;
  if (!connectionString) {
    console.warn("[PostgreSQL] DATABASE_URL environment variable is missing.");
    return Promise.resolve();
  }

  initPromise = (async () => {
    let client: pg.PoolClient | null = null;
    try {
      console.log("[PostgreSQL] Connecting to database via process.env.DATABASE_URL...");
      client = await pool.connect();

      // 1. Create categories table
      await client.query(`
        CREATE TABLE IF NOT EXISTS categories (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) UNIQUE NOT NULL
        );
      `);

      // 2. Create blogs table
      await client.query(`
        CREATE TABLE IF NOT EXISTS blogs (
          id VARCHAR(100) PRIMARY KEY,
          title TEXT NOT NULL,
          slug VARCHAR(255) UNIQUE NOT NULL,
          category VARCHAR(100) NOT NULL,
          excerpt TEXT NOT NULL,
          content TEXT NOT NULL,
          content_blocks TEXT,
          faqs TEXT,
          featured_image TEXT NOT NULL,
          author_name VARCHAR(100) NOT NULL,
          author_role VARCHAR(100) NOT NULL,
          author_avatar TEXT NOT NULL,
          read_time VARCHAR(50) NOT NULL,
          publish_date VARCHAR(50) NOT NULL,
          is_featured BOOLEAN DEFAULT true,
          seo_meta_title TEXT,
          seo_meta_description TEXT,
          seo_keywords TEXT,
          seo_canonical_url TEXT,
          seo_og_image TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `);

      // Ensure content_blocks and faqs columns exist if table was created previously
      await client.query(`
        ALTER TABLE blogs ADD COLUMN IF NOT EXISTS content_blocks TEXT;
        ALTER TABLE blogs ADD COLUMN IF NOT EXISTS faqs TEXT;
      `);

      // 3. Create contact_briefs table
      await client.query(`
        CREATE TABLE IF NOT EXISTS contact_briefs (
          id SERIAL PRIMARY KEY,
          name VARCHAR(150) NOT NULL,
          email VARCHAR(150) NOT NULL,
          service_type VARCHAR(150) NOT NULL,
          phone VARCHAR(50),
          company VARCHAR(150),
          role VARCHAR(150),
          budget VARCHAR(100),
          location VARCHAR(150),
          brief TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `);

      // 4. Create faqs table
      await client.query(`
        CREATE TABLE IF NOT EXISTS faqs (
          id VARCHAR(100) PRIMARY KEY,
          question TEXT NOT NULL,
          answer TEXT NOT NULL,
          category VARCHAR(100) DEFAULT 'General',
          order_index INT DEFAULT 0,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `);

      // 5. Seed initial categories if empty
      for (const cat of INITIAL_CATEGORIES) {
        await client.query(
          "INSERT INTO categories (name) VALUES ($1) ON CONFLICT (name) DO NOTHING;",
          [cat]
        );
      }

      // Purge legacy database entries if present
      await client.query(`
        DELETE FROM blogs WHERE content LIKE '%Cross-Border Hiring Made Simple%' OR excerpt LIKE '%A practical guide for US companies hiring Canadian software engineers%';
      `);

      // 6. UPSERT initial recruitment blogs so PostgreSQL database matches current user-provided articles
      for (const b of INITIAL_BLOGS) {
        await client.query(
          `INSERT INTO blogs (
            id, title, slug, category, excerpt, content, content_blocks, faqs, featured_image,
            author_name, author_role, author_avatar, read_time, publish_date,
            is_featured, seo_meta_title, seo_meta_description, seo_keywords,
            seo_canonical_url, seo_og_image
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20
          ) ON CONFLICT (id) DO UPDATE SET
            title = EXCLUDED.title,
            slug = EXCLUDED.slug,
            category = EXCLUDED.category,
            excerpt = EXCLUDED.excerpt,
            content = EXCLUDED.content,
            content_blocks = EXCLUDED.content_blocks,
            faqs = EXCLUDED.faqs,
            featured_image = EXCLUDED.featured_image,
            author_name = EXCLUDED.author_name,
            author_role = EXCLUDED.author_role,
            author_avatar = EXCLUDED.author_avatar,
            read_time = EXCLUDED.read_time,
            publish_date = EXCLUDED.publish_date,
            is_featured = EXCLUDED.is_featured,
            seo_meta_title = EXCLUDED.seo_meta_title,
            seo_meta_description = EXCLUDED.seo_meta_description,
            seo_keywords = EXCLUDED.seo_keywords,
            seo_canonical_url = EXCLUDED.seo_canonical_url,
            seo_og_image = EXCLUDED.seo_og_image;`,
          [
            b.id,
            b.title,
            b.slug,
            b.category,
            b.excerpt,
            b.content,
            b.contentBlocks ? JSON.stringify(b.contentBlocks) : null,
            b.faqs ? JSON.stringify(b.faqs) : null,
            b.featuredImage,
            b.author.name,
            b.author.role,
            b.author.avatar,
            b.readTime,
            b.publishDate,
            b.isFeatured,
            b.seo.metaTitle,
            b.seo.metaDescription,
            b.seo.keywords,
            b.seo.canonicalUrl,
            b.seo.ogImage,
          ]
        );
      }

      console.log("[PostgreSQL] Initialized and upserted database tables & blog articles successfully.");
    } catch (err: unknown) {
      console.error("[PostgreSQL Database Init Warning]:", err);
      // Reset initPromise on failure so future calls retry connection
      initPromise = null;
    } finally {
      if (client) {
        client.release();
      }
    }
  })();

  return initPromise;
}
