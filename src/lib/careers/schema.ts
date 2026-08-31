import { pool } from "@/lib/db";
import { MOCK_JOBS } from "@/components/careers/mockJobs";

let isCareerDbInitialized = false;

export async function initCareerDatabase(): Promise<void> {
  if (isCareerDbInitialized) return;

  let client;
  try {
    client = await pool.connect();

    // 1. Create career_jobs table
    await client.query(`
      CREATE TABLE IF NOT EXISTS career_jobs (
        id VARCHAR(100) PRIMARY KEY,
        title TEXT NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        department VARCHAR(100) NOT NULL,
        location VARCHAR(150) NOT NULL,
        employment_type VARCHAR(100) NOT NULL,
        experience_level VARCHAR(100) NOT NULL,
        salary_range VARCHAR(100),
        description TEXT NOT NULL,
        about_role TEXT,
        responsibilities TEXT,
        qualifications TEXT,
        nice_to_have TEXT,
        benefits TEXT,
        status VARCHAR(50) DEFAULT 'Published',
        posted_date VARCHAR(50) DEFAULT 'Just now',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    // 2. Create career_applications table
    await client.query(`
      CREATE TABLE IF NOT EXISTS career_applications (
        id VARCHAR(100) PRIMARY KEY,
        job_id VARCHAR(100) NOT NULL,
        job_title TEXT NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        location VARCHAR(150),
        current_title VARCHAR(150),
        current_company VARCHAR(150),
        experience_years VARCHAR(50) NOT NULL,
        linkedin_url TEXT,
        portfolio_url TEXT,
        resume_file_name TEXT,
        resume_file_size VARCHAR(50),
        resume_file_type VARCHAR(50),
        resume_data_url TEXT,
        is_resume_built_live BOOLEAN DEFAULT false,
        cover_letter TEXT,
        internal_notes TEXT,
        consent_given BOOLEAN DEFAULT true,
        status VARCHAR(50) DEFAULT 'New',
        submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      ALTER TABLE career_applications ADD COLUMN IF NOT EXISTS resume_data_url TEXT;
      ALTER TABLE career_applications ADD COLUMN IF NOT EXISTS internal_notes TEXT;
    `);

    // 3. Seed initial jobs if table is empty
    const checkJobs = await client.query("SELECT COUNT(*) FROM career_jobs;");
    if (parseInt(checkJobs.rows[0].count, 10) === 0) {
      for (const j of MOCK_JOBS) {
        await client.query(
          `INSERT INTO career_jobs (
            id, title, slug, department, location, employment_type, experience_level,
            salary_range, description, about_role, responsibilities, qualifications,
            nice_to_have, benefits, status, posted_date
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
          ON CONFLICT (id) DO NOTHING;`,
          [
            j.id,
            j.title,
            j.slug,
            j.department,
            j.location,
            j.employmentType,
            j.experienceLevel,
            j.salaryRange || null,
            j.description,
            j.aboutRole || null,
            j.responsibilities ? JSON.stringify(j.responsibilities) : null,
            j.qualifications ? JSON.stringify(j.qualifications) : null,
            j.niceToHave ? JSON.stringify(j.niceToHave) : null,
            j.benefits ? JSON.stringify(j.benefits) : null,
            "Published",
            j.postedDate,
          ]
        );
      }
    }

    isCareerDbInitialized = true;
    console.log("[PostgreSQL] Career Panel database tables initialized successfully.");
  } catch (err) {
    console.error("[PostgreSQL Career Init Warning]:", err);
  } finally {
    if (client) client.release();
  }
}
