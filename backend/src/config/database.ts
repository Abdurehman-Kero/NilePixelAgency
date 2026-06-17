import initSqlJs, { Database } from 'sql.js';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';

const dbPath = path.resolve(process.cwd(), 'nilepixel.db');
let dbInstance: Database | null = null;

function saveDatabase() {
  if (dbInstance) {
    try {
      const data = dbInstance.export();
      fs.writeFileSync(dbPath, Buffer.from(data));
    } catch (e) {
      console.error('Failed to save database file:', e);
    }
  }
}

export const initDbConnection = async (): Promise<Database> => {
  if (dbInstance) return dbInstance;
  const SQL = await initSqlJs();
  if (fs.existsSync(dbPath)) {
    const filebuffer = fs.readFileSync(dbPath);
    dbInstance = new SQL.Database(filebuffer);
  } else {
    dbInstance = new SQL.Database();
  }
  return dbInstance;
};

// Helper promisified DB methods
export const query = async (sql: string, params: any[] = []): Promise<any[]> => {
  const db = await initDbConnection();
  try {
    const stmt = db.prepare(sql);
    if (params && params.length > 0) {
      stmt.bind(params);
    }
    const rows: any[] = [];
    while (stmt.step()) {
      rows.push(stmt.getAsObject());
    }
    stmt.free();
    return rows;
  } catch (err) {
    console.error('Database query error:', err, 'SQL:', sql);
    return [];
  }
};

export const getOne = async (sql: string, params: any[] = []): Promise<any> => {
  const rows = await query(sql, params);
  return rows[0] || null;
};

export const run = async (sql: string, params: any[] = []): Promise<{ lastID: number; changes: number }> => {
  const db = await initDbConnection();
  try {
    if (params && params.length > 0) {
      const stmt = db.prepare(sql);
      stmt.bind(params);
      stmt.step();
      stmt.free();
    } else {
      db.run(sql);
    }

    let lastID = 0;
    try {
      const res = db.exec("SELECT last_insert_rowid() as id");
      if (res && res[0] && res[0].values && res[0].values[0]) {
        lastID = Number(res[0].values[0][0]);
      }
    } catch {}

    const changes = db.getRowsModified();
    saveDatabase();
    return { lastID, changes };
  } catch (err) {
    console.error('Database run error:', err, 'SQL:', sql);
    return { lastID: 0, changes: 0 };
  }
};

// Auto Initialize Tables & Initial Seed Data
export const initDatabase = async () => {
  try {
    await run(`
      CREATE TABLE IF NOT EXISTS roles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        uuid TEXT UNIQUE,
        name TEXT UNIQUE,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        uuid TEXT UNIQUE,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        phone TEXT,
        password_hash TEXT NOT NULL,
        avatar TEXT,
        role_id INTEGER,
        is_active INTEGER DEFAULT 1,
        email_verified INTEGER DEFAULT 1,
        last_login DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await run(`
      CREATE TABLE IF NOT EXISTS site_settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        setting_key TEXT UNIQUE NOT NULL,
        setting_value TEXT NOT NULL,
        setting_group TEXT DEFAULT 'general'
      )
    `);

    await run(`
      CREATE TABLE IF NOT EXISTS company_information (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        about_summary TEXT,
        mission TEXT,
        vision TEXT,
        history TEXT,
        phone TEXT,
        email TEXT,
        address TEXT,
        working_hours TEXT,
        maps_url TEXT
      )
    `);

    await run(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL,
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        description TEXT
      )
    `);

    await run(`
      CREATE TABLE IF NOT EXISTS technologies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        category TEXT,
        icon_url TEXT,
        description TEXT
      )
    `);

    await run(`
      CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        uuid TEXT UNIQUE,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        category_id INTEGER,
        short_description TEXT NOT NULL,
        full_description TEXT,
        icon TEXT,
        image TEXT,
        display_order INTEGER DEFAULT 0,
        featured INTEGER DEFAULT 0,
        status TEXT DEFAULT 'active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await run(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        uuid TEXT UNIQUE,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        client_name TEXT,
        industry TEXT,
        category_id INTEGER,
        short_description TEXT NOT NULL,
        full_description TEXT,
        challenge TEXT,
        solution TEXT,
        result TEXT,
        cover_image TEXT,
        github_url TEXT,
        live_url TEXT,
        featured INTEGER DEFAULT 0,
        status TEXT DEFAULT 'published',
        published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await run(`
      CREATE TABLE IF NOT EXISTS project_technologies (
        project_id INTEGER,
        technology_id INTEGER,
        PRIMARY KEY (project_id, technology_id)
      )
    `);

    await run(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        uuid TEXT UNIQUE,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        excerpt TEXT NOT NULL,
        content TEXT NOT NULL,
        cover_image TEXT,
        category_id INTEGER,
        author_id INTEGER,
        featured INTEGER DEFAULT 0,
        reading_time TEXT DEFAULT '5 min read',
        status TEXT DEFAULT 'published',
        published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await run(`
      CREATE TABLE IF NOT EXISTS team_members (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        position TEXT NOT NULL,
        bio TEXT,
        photo TEXT,
        email TEXT,
        linkedin TEXT,
        github TEXT,
        telegram TEXT,
        twitter TEXT,
        display_order INTEGER DEFAULT 0,
        status TEXT DEFAULT 'active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await run(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_name TEXT NOT NULL,
        position TEXT,
        company TEXT,
        photo TEXT,
        message TEXT NOT NULL,
        rating INTEGER DEFAULT 5,
        featured INTEGER DEFAULT 1,
        display_order INTEGER DEFAULT 0,
        status TEXT DEFAULT 'active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await run(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        uuid TEXT UNIQUE,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        company TEXT,
        budget TEXT,
        service TEXT,
        message TEXT NOT NULL,
        ip_address TEXT,
        status TEXT DEFAULT 'new',
        assigned_to INTEGER,
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await run(`
      CREATE TABLE IF NOT EXISTS careers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        uuid TEXT UNIQUE,
        job_title TEXT NOT NULL,
        department TEXT NOT NULL,
        employment_type TEXT DEFAULT 'Full-time',
        location TEXT DEFAULT 'Remote',
        description TEXT NOT NULL,
        requirements TEXT,
        responsibilities TEXT,
        salary TEXT,
        expire_date DATETIME,
        status TEXT DEFAULT 'open',
        telegram_username TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Ensure columns exist if table was created in older version
    try { await run("ALTER TABLE careers ADD COLUMN expire_date DATETIME"); } catch (e) {}
    try { await run("ALTER TABLE careers ADD COLUMN status TEXT DEFAULT 'open'"); } catch (e) {}
    try { await run("ALTER TABLE careers ADD COLUMN telegram_username TEXT"); } catch (e) {}

    await run(`
      CREATE TABLE IF NOT EXISTS job_applications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        uuid TEXT UNIQUE,
        career_id INTEGER NOT NULL,
        applicant_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        resume_url TEXT NOT NULL,
        portfolio_url TEXT,
        linkedin_url TEXT,
        github_url TEXT,
        cover_letter TEXT,
        status TEXT DEFAULT 'applied',
        notes TEXT,
        telegram_username TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    try { await run("ALTER TABLE job_applications ADD COLUMN telegram_username TEXT"); } catch (e) {}

    await run(`
      CREATE TABLE IF NOT EXISTS media (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        uuid TEXT UNIQUE,
        filename TEXT NOT NULL,
        original_name TEXT NOT NULL,
        mime_type TEXT NOT NULL,
        file_size INTEGER NOT NULL,
        file_path TEXT NOT NULL,
        alt_text TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await run(`
      CREATE TABLE IF NOT EXISTS activity_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        user_email TEXT,
        action TEXT NOT NULL,
        module TEXT NOT NULL,
        details TEXT,
        ip_address TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Seed default admin user if absent
    const admin = await getOne(`SELECT * FROM users WHERE email = ?`, ['admin@nilepixel.com']);
    if (!admin) {
      const passwordHash = await bcrypt.hash('Admin@123', 10);
      
      await run(`INSERT INTO roles (id, uuid, name, description) VALUES (1, 'role-admin', 'Administrator', 'Full access')`);
      await run(`INSERT INTO roles (id, uuid, name, description) VALUES (2, 'role-editor', 'Editor', 'Content management')`);
      await run(`INSERT INTO roles (id, uuid, name, description) VALUES (3, 'role-viewer', 'Viewer', 'Read only')`);

      await run(`
        INSERT INTO users (uuid, first_name, last_name, email, password_hash, role_id, is_active, email_verified)
        VALUES ('usr-admin-001', 'Admin', 'NilePixel', 'admin@nilepixel.com', ?, 1, 1, 1)
      `, [passwordHash]);

      // Seed default Site Settings
      const defaultSettings = [
        ['company_name', 'NilePixel Technologies', 'general'],
        ['tagline', 'Building Digital Products That Solve Real Problems.', 'general'],
        ['about_summary', 'NilePixel Technologies is a full-service software development agency operating at the intersection of enterprise engineering, AI, and cloud technology.', 'general'],
        ['mission', 'To empower global businesses by engineering intuitive, high-performance software systems that solve complex real-world challenges.', 'general'],
        ['vision', 'To be a globally recognized technology partner known for engineering excellence and digital transformation impact.', 'general'],
        ['history', 'Founded to bridge modern architecture with deep business domain expertise, NilePixel has grown into an international engineering agency.', 'general'],
        ['phone', '+251 911 234 567', 'contact'],
        ['email', 'contact@nilepixel.com', 'contact'],
        ['address', 'Bole Sub-City, Addis Ababa, Ethiopia', 'contact'],
        ['working_hours', 'Mon - Fri: 8:30 AM - 6:00 PM (EAT)', 'contact'],
        ['maps_url', 'https://maps.google.com/?q=Addis+Ababa', 'contact'],
        ['hero_title', 'Engineering Digital Systems That Drive Enterprise Scale', 'hero'],
        ['hero_subtitle', 'We design, build, and deploy resilient web platforms, mobile apps, and cloud AI infrastructure for ambitious organizations.', 'hero'],
        ['hero_badge', 'LEADERSHIP IN SOFTWARE ENGINEERING', 'hero'],
        ['hero_primary_btn', 'Explore Case Studies', 'hero'],
        ['hero_secondary_btn', 'Schedule Engineering Consultation', 'hero'],
        ['primary_color', '#0F6FFF', 'theme'],
        ['secondary_color', '#22C7FF', 'theme'],
        ['theme_mode', 'dark', 'theme']
      ];

      for (const [key, val, group] of defaultSettings) {
        await run(`INSERT OR REPLACE INTO site_settings (setting_key, setting_value, setting_group) VALUES (?, ?, ?)`, [key, val, group]);
      }

      await run(`
        INSERT OR REPLACE INTO company_information (id, about_summary, mission, vision, history, phone, email, address, working_hours, maps_url)
        VALUES (1, 'NilePixel Technologies is a full-service software development agency operating at the intersection of enterprise engineering, AI, and cloud technology.',
        'To empower global businesses by engineering intuitive, high-performance software systems that solve complex real-world challenges.',
        'To be a globally recognized technology partner known for engineering excellence and digital transformation impact.',
        'Founded to bridge modern architecture with deep business domain expertise, NilePixel has grown into an international engineering agency.',
        '+251 911 234 567', 'contact@nilepixel.com', 'Bole Sub-City, Addis Ababa, Ethiopia', 'Mon - Fri: 8:30 AM - 6:00 PM (EAT)', 'https://maps.google.com/?q=Addis+Ababa')
      `);

      // Seed Categories
      await run(`INSERT INTO categories (id, type, name, slug, description) VALUES (1, 'service', 'Web Engineering', 'web-engineering', 'Full stack SaaS & enterprise web apps')`);
      await run(`INSERT INTO categories (id, type, name, slug, description) VALUES (2, 'service', 'Mobile Engineering', 'mobile-engineering', 'Cross-platform iOS and Android apps')`);
      await run(`INSERT INTO categories (id, type, name, slug, description) VALUES (3, 'service', 'Cloud & DevOps', 'cloud-devops', 'Kubernetes, AWS, microservices, and CI/CD')`);
      await run(`INSERT INTO categories (id, type, name, slug, description) VALUES (4, 'service', 'AI Solutions', 'ai-solutions', 'LLMs, machine learning, and automation')`);
      await run(`INSERT INTO categories (id, type, name, slug, description) VALUES (5, 'project', 'FinTech', 'fintech', 'Financial software and payment gateways')`);
      await run(`INSERT INTO categories (id, type, name, slug, description) VALUES (6, 'project', 'Enterprise Systems', 'enterprise-systems', 'ERP, CRM, and operational automation')`);
      await run(`INSERT INTO categories (id, type, name, slug, description) VALUES (7, 'project', 'HealthTech', 'healthtech', 'Healthcare management & telehealth platform')`);
      await run(`INSERT INTO categories (id, type, name, slug, description) VALUES (8, 'blog', 'Engineering', 'engineering', 'Software architecture & clean code')`);
      await run(`INSERT INTO categories (id, type, name, slug, description) VALUES (9, 'blog', 'AI & Data', 'ai-data', 'Generative AI and data pipelines')`);

      // Seed Technologies
      const techList = [
        ['React', 'react', 'Frontend', 'High performance UI library'],
        ['TypeScript', 'typescript', 'Languages', 'Strongly typed JS'],
        ['Node.js', 'nodejs', 'Backend', 'Asynchronous JS runtime'],
        ['Express.js', 'express', 'Backend', 'Web framework for Node'],
        ['MySQL', 'mysql', 'Database', 'Relational database management'],
        ['Docker', 'docker', 'DevOps', 'Containerization platform'],
        ['AWS', 'aws', 'Cloud', 'Cloud infrastructure services'],
        ['Python', 'python', 'AI & Data', 'AI and data engineering']
      ];
      for (const [tName, tSlug, tCat, tDesc] of techList) {
        await run(`INSERT INTO technologies (name, slug, category, description) VALUES (?, ?, ?, ?)`, [tName, tSlug, tCat, tDesc]);
      }

      // Seed Services
      await run(`
        INSERT INTO services (uuid, title, slug, category_id, short_description, full_description, icon, image, display_order, featured, status)
        VALUES 
        ('srv-001', 'Enterprise Web Application Engineering', 'enterprise-web-development', 1, 
         'Custom, high-throughput web systems built with React, TypeScript, Node.js, and resilient databases.',
         'Our web engineering team designs modular, accessible, and high-performance applications capable of handling enterprise transaction volumes.', 'Code', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80', 1, 1, 'active'),
        ('srv-002', 'Cross-Platform Mobile Engineering', 'mobile-app-development', 2,
         'Native-quality iOS and Android mobile applications crafted using React Native and Flutter with real-time sync.',
         'Deliver fluid mobile experiences on both major platforms. We construct offline-first data engines, push notifications, biometric security, and high-FPS UI controls.', 'Smartphone', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80', 2, 1, 'active'),
        ('srv-003', 'Cloud Infrastructure & DevOps Automation', 'cloud-devops-infrastructure', 3,
         'Automated CI/CD pipelines, Docker container orchestration, Kubernetes clusters, and AWS cloud architectures.',
         'Modernize infrastructure with infrastructure-as-code, zero-downtime deployment pipelines, observability logs, and automated cloud scaling.', 'Cloud', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80', 3, 1, 'active'),
        ('srv-004', 'Artificial Intelligence & GenAI Solutions', 'ai-genai-solutions', 4,
         'Custom LLM integrations, automated intelligent workflows, semantic search engines, and predictive analytics.',
         'Empower your business with AI agents, document processing pipelines, and custom neural model capabilities embedded into your software.', 'Cpu', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80', 4, 1, 'active')
      `);

      // Seed Projects
      await run(`
        INSERT INTO projects (uuid, title, slug, client_name, industry, category_id, short_description, full_description, challenge, solution, result, cover_image, github_url, live_url, featured, status)
        VALUES
        ('prj-001', 'ShegerEvent – Event Management Platform', 'shegerevent-platform', 'Sheger Event Ecosystem', 'EventTech & Full-Stack', 5,
         'Full-stack event ecosystem supporting organizers, attendees, admins, and security staff with QR ticket validation and Chapa payments.',
         'Integrated QR-based ticket validation, analytics dashboards, and payment workflows. Built using React, Node.js, Express, PostgreSQL, and Chapa payment integration.',
         'Managing high-throughput ticket sales and instant QR gate verification during major live events.',
         'Engineered a full-stack event infrastructure with real-time QR scanner endpoints, admin telemetry dashboards, and automated payment callbacks.',
         'Successfully validated tens of thousands of event tickets with sub-second gate scanning latency and 100% payment reconciliation.',
         'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80', 'https://github.com/nilepixel/shegerevent', 'https://shegerevent.demo.com', 1, 'published'),

        ('prj-002', 'Chala Mobile – E-Commerce Repair Management System', 'chala-mobile-system', 'Chala Mobile Retail', 'Retail & Repair Systems', 6,
         'Business management platform for a real mobile retail client with inventory management, repair tracking, dashboards, and PDF receipt generation.',
         'Developed a business management platform for a real mobile retail client. Implemented inventory management, repair tracking, dashboards, and PDF receipt generation. Integrated authentication, payment systems, and customer management workflows.',
         'Manual repair tracking led to customer status miscommunication and inventory discrepancies.',
         'Built an integrated POS and repair lifecycle management portal featuring automated SMS updates and live PDF receipt rendering.',
         'Streamlined mobile repair turnover by 45% and established real-time inventory tracking for multiple retail branches.',
         'https://images.unsplash.com/photo-1556742049-0a67daf4005a?auto=format&fit=crop&w=1200&q=80', 'https://github.com/nilepixel/chala-mobile', 'https://chalamobile.demo.com', 1, 'published'),

        ('prj-003', 'Evangadi Forum', 'evangadi-forum', 'Developer Community', 'Web Engineering', 1,
         'Collaborative MERN-stack discussion platform for developers enabling real-time Q&A and technical knowledge sharing.',
         'Built a collaborative MERN-stack discussion platform for developers featuring user authentication, category tagging, and interactive thread discussions.',
         'Creating a fast, structured Q&A environment for thousands of developer students and mentors.',
         'Implemented a modular MERN architecture with optimized database queries and clean thread hierarchy.',
         'Empowered thousands of developer discussions with real-time response notifications and clean code syntax highlighting.',
         'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80', 'https://github.com/nilepixel/evangadi-forum', 'https://evangadiforum.demo.com', 1, 'published'),

        ('prj-004', 'StudentBridge Donation Platform', 'studentbridge-donation-platform', 'Education Foundation', 'Social Impact & EdTech', 6,
         'Donation and campaign management platform with modern UI/UX workflows for supporting student financial needs.',
         'Developed a donation and campaign management platform with modern UI/UX workflows, donor management, and campaign analytics.',
         'Empowering direct transparency and simple digital donation channels for student financial aid.',
         'Designed an accessible visual donation platform with secure payment integrations and live campaign progress metrics.',
         'Connected hundreds of students with essential educational funding through streamlined visual donation workflows.',
         'https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?auto=format&fit=crop&w=1200&q=80', 'https://github.com/nilepixel/studentbridge', 'https://studentbridge.demo.com', 1, 'published')
      `);

      // Seed Project Technologies Junction
      await run(`INSERT INTO project_technologies (project_id, technology_id) VALUES (1, 1), (1, 2), (1, 3), (1, 5)`);
      await run(`INSERT INTO project_technologies (project_id, technology_id) VALUES (2, 1), (2, 2), (2, 4), (2, 8)`);
      await run(`INSERT INTO project_technologies (project_id, technology_id) VALUES (3, 1), (3, 3), (3, 6), (3, 7)`);

      // Seed Blog Posts
      await run(`
        INSERT INTO blog_posts (uuid, title, slug, excerpt, content, category_id, author_id, featured, reading_time, status)
        VALUES
        ('post-001', 'Architecting Resilient Multi-Tenant Relational Databases', 'architecting-resilient-multi-tenant-databases',
         'A deep dive into indexing strategies, connection pooling, and row-level security isolation in enterprise relational systems.',
         '## Introduction\nWhen engineering enterprise software platforms, database architecture dictates application reliability. Multi-tenancy introduces unique isolation, scaling, and query optimization challenges.\n\n### Indexing Strategies\nIndexes are critical for query optimization. By creating composite index keys on tenant identifiers and timestamp filters, relational engines drastically reduce full table scans.', 8, 1, 1, '6 min read', 'published'),
        ('post-002', 'Integrating Domain-Specific LLM Agents into Enterprise Workflows', 'integrating-llm-agents-enterprise-workflows',
         'How software engineering teams can leverage GenAI and structured function calling without sacrificing system predictability.',
         '## Predictable Generative AI\nGenerative AI has evolved beyond simple text prompts. By enforcing JSON schemas and function signatures, backends can orchestrate real-world operations with complete auditability.', 9, 1, 1, '8 min read', 'published')
      `);

      // Seed Team Members
      await run(`
        INSERT INTO team_members (name, position, bio, photo, email, linkedin, github, display_order, status)
        VALUES
        ('Harun', 'Co-Founder & CEO', 'Visionary technology leader steering strategy, partner relations, and enterprise expansion across global markets.', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80', 'harun@nilepixel.com', 'https://linkedin.com', 'https://github.com', 1, 'active'),
        ('Mifta', 'Co-Founder & CTO', 'Architect of high-throughput distributed systems, cloud infrastructure, and core engineering paradigms.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80', 'mifta@nilepixel.com', 'https://linkedin.com', 'https://github.com', 2, 'active'),
        ('Abdurehman', 'Chief Software Architect', 'Expert in full-stack web engineering, microservices, and high-concurrency database optimization.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80', 'abdurehman@nilepixel.com', 'https://linkedin.com', 'https://github.com', 3, 'active'),
        ('Fuad', 'Head of Mobile & DevOps', 'Specialist in cross-platform React Native/Flutter apps, Docker containerization, and AWS cloud pipelines.', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80', 'fuad@nilepixel.com', 'https://linkedin.com', 'https://github.com', 4, 'active'),
        ('Abdushakur', 'AI & Data Engineering Lead', 'Passionate AI developer engineering domain-specific LLM workflows, data ingestion, and automation.', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80', 'abdushakur@nilepixel.com', 'https://linkedin.com', 'https://github.com', 5, 'active'),
        ('Anwar', 'Lead UI/UX Architect', 'Design systems lead focused on clean ergonomics, high-contrast visual hierarchy, and intuitive user flows.', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80', 'anwar@nilepixel.com', 'https://linkedin.com', 'https://github.com', 6, 'active')
      `);

      // Seed Testimonials
      await run(`
        INSERT INTO testimonials (client_name, position, company, photo, message, rating, featured, display_order)
        VALUES
        ('Marcus Vance', 'VP of Engineering', 'Zenith Global Financial', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80', 'NilePixel delivered our core settlement platform ahead of schedule with zero production defects. Their engineering discipline and code clarity are unmatched.', 5, 1, 1),
        ('Dr. Sarah Lin', 'Chief Medical Officer', 'AuraHealth Networks', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80', 'Working with NilePixel felt like expanding our internal engineering team with top-tier talent. The telehealth solution handles peak traffic effortlessly.', 5, 1, 2)
      `);

      // Seed Careers
      await run(`
        INSERT INTO careers (uuid, job_title, department, employment_type, location, description, requirements, responsibilities, salary, status)
        VALUES
        ('job-001', 'Senior Full-Stack Engineer (React / Node)', 'Engineering', 'Full-time', 'Remote / Addis Ababa',
         'We are looking for a Senior Full-Stack Engineer to lead customer software engagements using modern TypeScript, React, and Node.js.',
         '5+ years experience in React, Node.js, Express, and SQL databases. Strong grasp of software architecture.',
         'Design REST APIs, write clean TypeScript, lead technical reviews, and interface with client technology teams.',
         'Competitive + Equity', 'open'),
        ('job-002', 'Senior Cloud & DevOps Architect', 'DevOps', 'Full-time', 'Remote',
         'Lead our cloud infrastructure across AWS, Docker, Kubernetes, and automated CI/CD pipelines.',
         'Experience with Docker, Kubernetes, Terraform, and AWS cloud deployment automation.',
         'Automate infrastructure provisioning, maintain high uptime SLA, and enforce cloud security.',
         'Competitive Salary', 'open')
      `);

      // Seed Initial Activity Log
      await run(`
        INSERT INTO activity_logs (user_id, user_email, action, module, details, ip_address)
        VALUES (1, 'admin@nilepixel.com', 'SYSTEM_INITIALIZED', 'database', 'NilePixel database initial seed complete', '127.0.0.1')
      `);

      console.log('NilePixel database schema & initial seed data initialized successfully!');
    }

    // Always ensure requested projects are up to date
    const currentProjects = await query(`SELECT * FROM projects`);
    if (!currentProjects || currentProjects.length === 0 || currentProjects[0].title.includes('ZenithPay')) {
      await run(`DELETE FROM projects`);
      await run(`
        INSERT INTO projects (uuid, title, slug, client_name, industry, category_id, short_description, full_description, challenge, solution, result, cover_image, github_url, live_url, featured, status)
        VALUES
        ('prj-001', 'ShegerEvent – Event Management Platform', 'shegerevent-platform', 'Sheger Event Ecosystem', 'Event Management Platform', 5,
         'Full-stack event ecosystem supporting organizers, attendees, admins, and security staff with QR ticket validation and Chapa payment integration.',
         'Full-stack event ecosystem supporting organizers, attendees, admins, and security staff. Integrated QR-based ticket validation, analytics dashboards, and payment workflows. Built using React, Node.js, Express, PostgreSQL, and Chapa payment integration.',
         'Managing high-throughput ticket sales and instant QR gate verification during major live events.',
         'Engineered a full-stack event infrastructure with real-time QR scanner endpoints, admin telemetry dashboards, and automated payment callbacks.',
         'Successfully validated tens of thousands of event tickets with sub-second gate scanning latency and 100% payment reconciliation.',
         'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80', 'https://github.com/nilepixel/shegerevent', 'https://shegerevent.demo.com', 1, 'published'),

        ('prj-002', 'Chala Mobile – E-Commerce Repair Management System', 'chala-mobile-system', 'Chala Mobile Retail', 'Retail & Repair Management', 6,
         'Developed a business management platform for a real mobile retail client with inventory management, repair tracking, dashboards, and PDF receipt generation.',
         'Developed a business management platform for a real mobile retail client. Implemented inventory management, repair tracking, dashboards, and PDF receipt generation. Integrated authentication, payment systems, and customer management workflows.',
         'Manual repair tracking led to customer status miscommunication and inventory discrepancies.',
         'Built an integrated POS and repair lifecycle management portal featuring automated SMS updates and live PDF receipt rendering.',
         'Streamlined mobile repair turnover by 45% and established real-time inventory tracking for multiple retail branches.',
         'https://images.unsplash.com/photo-1556742049-0a67daf4005a?auto=format&fit=crop&w=1200&q=80', 'https://github.com/nilepixel/chala-mobile', 'https://chalamobile.demo.com', 1, 'published'),

        ('prj-003', 'Evangadi Forum', 'evangadi-forum', 'Developer Community', 'Developer Community Platform', 1,
         'Built a collaborative MERN-stack discussion platform for developers enabling real-time Q&A and technical knowledge sharing.',
         'Built a collaborative MERN-stack discussion platform for developers featuring user authentication, category tagging, and interactive thread discussions.',
         'Creating a fast, structured Q&A environment for thousands of developer students and mentors.',
         'Implemented a modular MERN architecture with optimized database queries and clean thread hierarchy.',
         'Empowered thousands of developer discussions with real-time response notifications and clean code syntax highlighting.',
         'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80', 'https://github.com/nilepixel/evangadi-forum', 'https://evangadiforum.demo.com', 1, 'published'),

        ('prj-004', 'StudentBridge Donation Platform', 'studentbridge-donation-platform', 'Education Foundation', 'Crowdfunding & EdTech', 6,
         'Developed a donation and campaign management platform with modern UI/UX workflows for supporting student financial aid.',
         'Developed a donation and campaign management platform with modern UI/UX workflows, donor management, and campaign analytics.',
         'Empowering direct transparency and simple digital donation channels for student financial aid.',
         'Designed an accessible visual donation platform with secure payment integrations and live campaign progress metrics.',
         'Connected hundreds of students with essential educational funding through streamlined visual donation workflows.',
         'https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?auto=format&fit=crop&w=1200&q=80', 'https://github.com/nilepixel/studentbridge', 'https://studentbridge.demo.com', 1, 'published')
      `);
    }
  } catch (err) {
    console.error('Database initialization error:', err);
  }
};
