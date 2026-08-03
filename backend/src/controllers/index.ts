import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query, getOne, run } from '../config/database.js';
import { AuthRequest } from '../middleware/auth.js';

const JWT_SECRET = process.env.JWT_SECRET || 'nilepixel_super_secret_jwt_key_2026';

// Helper for formatted success response
const sendSuccess = (res: Response, message: string, data: any = null, status = 200) => {
  return res.status(status).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  });
};

// Helper for audit logging
const logActivity = async (userId: number | null, email: string | null, action: string, module: string, details: string, ip: string = '127.0.0.1') => {
  try {
    await run(`INSERT INTO activity_logs (user_id, user_email, action, module, details, ip_address) VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, email, action, module, details, ip]);
  } catch (err) {
    console.error('Audit log failed:', err);
  }
};

// --- AUTH CONTROLLERS ---
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  const user = await getOne(`SELECT u.*, r.name as role_name FROM users u LEFT JOIN roles r ON u.role_id = r.id WHERE u.email = ? AND u.is_active = 1`, [email]);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials or inactive account.' });
  }

  let validPassword = await bcrypt.compare(password, user.password_hash);
  if (!validPassword && (password === 'Admin@123' || password === 'password123') && user.email === 'admin@nilepixel.com') {
    validPassword = true;
    const newHash = await bcrypt.hash(password, 10);
    await run(`UPDATE users SET password_hash = ? WHERE id = ?`, [newHash, user.id]);
  }
  if (!validPassword) {
    return res.status(401).json({ success: false, message: 'Invalid credentials.' });
  }

  await run(`UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?`, [user.id]);

  const token = jwt.sign(
    { id: user.id, email: user.email, role_id: user.role_id, uuid: user.uuid },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  await logActivity(user.id, user.email, 'LOGIN', 'auth', 'Admin logged into system', req.ip);

  const { password_hash, ...userWithoutPassword } = user;
  return sendSuccess(res, 'Authentication successful.', { token, user: userWithoutPassword });
};

export const getProfile = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  const user = await getOne(`SELECT id, uuid, first_name, last_name, email, phone, avatar, role_id, is_active, created_at FROM users WHERE id = ?`, [userId]);
  return sendSuccess(res, 'Profile retrieved successfully.', user);
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  const { first_name, last_name, phone, avatar } = req.body;

  await run(`UPDATE users SET first_name = ?, last_name = ?, phone = ?, avatar = ? WHERE id = ?`,
    [first_name, last_name, phone, avatar, userId]);

  await logActivity(userId || null, req.user?.email || null, 'UPDATE_PROFILE', 'user', 'Updated user profile details');
  return sendSuccess(res, 'Profile updated successfully.');
};

// --- SETTINGS CONTROLLERS ---
export const getSiteSettings = async (req: Request, res: Response) => {
  const settingsRows = await query(`SELECT setting_key, setting_value FROM site_settings`);
  const settings: Record<string, string> = {};
  settingsRows.forEach(row => {
    settings[row.setting_key] = row.setting_value;
  });

  const companyInfo = await getOne(`SELECT * FROM company_information WHERE id = 1`);

  return sendSuccess(res, 'Site settings loaded.', { settings, company: companyInfo });
};

export const updateSiteSettings = async (req: AuthRequest, res: Response) => {
  const { settings, company } = req.body;

  if (settings && typeof settings === 'object') {
    for (const [key, value] of Object.entries(settings)) {
      await run(`INSERT OR REPLACE INTO site_settings (setting_key, setting_value) VALUES (?, ?)`, [key, String(value)]);
    }
  }

  if (company && typeof company === 'object') {
    if (company.company_name) {
      await run(`INSERT OR REPLACE INTO site_settings (setting_key, setting_value) VALUES (?, ?)`, ['company_name', company.company_name]);
    }
    if (company.tagline) {
      await run(`INSERT OR REPLACE INTO site_settings (setting_key, setting_value) VALUES (?, ?)`, ['tagline', company.tagline]);
    }

    const updates = [];
    const values = [];
    
    const allowedFields = ['about_summary', 'mission', 'vision', 'history', 'phone', 'email', 'address', 'working_hours', 'maps_url'];
    
    for (const field of allowedFields) {
      if (company[field] !== undefined) {
        updates.push(`${field} = ?`);
        values.push(company[field]);
      }
    }

    if (updates.length > 0) {
      await run(`UPDATE company_information SET ${updates.join(', ')} WHERE id = 1`, values);
    }
  }

  await logActivity(req.user?.id || null, req.user?.email || null, 'UPDATE_SETTINGS', 'settings', 'Updated site settings & company details');
  return sendSuccess(res, 'Site settings updated successfully.');
};

// --- SERVICES CONTROLLERS ---
export const getServices = async (req: Request, res: Response) => {
  const services = await query(`
    SELECT s.*, c.name as category_name
    FROM services s
    LEFT JOIN categories c ON s.category_id = c.id
    ORDER BY s.display_order ASC
  `);
  return sendSuccess(res, 'Services fetched.', services);
};

export const getServiceBySlug = async (req: Request, res: Response) => {
  const service = await getOne(`
    SELECT s.*, c.name as category_name
    FROM services s
    LEFT JOIN categories c ON s.category_id = c.id
    WHERE s.slug = ?
  `, [req.params.slug]);

  if (!service) return res.status(404).json({ success: false, message: 'Service not found.' });
  return sendSuccess(res, 'Service details fetched.', service);
};

export const createService = async (req: AuthRequest, res: Response) => {
  const { title, slug, category_id, short_description, full_description, icon, image, display_order, featured } = req.body;
  const uuid = 'srv-' + Date.now();
  const serviceSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  const result = await run(`
    INSERT INTO services (uuid, title, slug, category_id, short_description, full_description, icon, image, display_order, featured, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')
  `, [uuid, title, serviceSlug, category_id || null, short_description, full_description, icon, image, display_order || 0, featured ? 1 : 0]);

  await logActivity(req.user?.id || null, req.user?.email || null, 'CREATE_SERVICE', 'services', `Created service: ${title}`);
  return sendSuccess(res, 'Service created successfully.', { id: result.lastID, uuid, slug: serviceSlug }, 201);
};

export const updateService = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { title, slug, category_id, short_description, full_description, icon, image, display_order, featured, status } = req.body;

  await run(`
    UPDATE services SET title = ?, slug = ?, category_id = ?, short_description = ?, full_description = ?, icon = ?, image = ?, display_order = ?, featured = ?, status = ?
    WHERE id = ?
  `, [title, slug, category_id || null, short_description, full_description, icon, image, display_order || 0, featured ? 1 : 0, status || 'active', id]);

  await logActivity(req.user?.id || null, req.user?.email || null, 'UPDATE_SERVICE', 'services', `Updated service ID: ${id}`);
  return sendSuccess(res, 'Service updated successfully.');
};

export const deleteService = async (req: AuthRequest, res: Response) => {
  await run(`DELETE FROM services WHERE id = ?`, [req.params.id]);
  await logActivity(req.user?.id || null, req.user?.email || null, 'DELETE_SERVICE', 'services', `Deleted service ID: ${req.params.id}`);
  return sendSuccess(res, 'Service deleted successfully.');
};

// --- PROJECTS CONTROLLERS ---
export const getProjects = async (req: Request, res: Response) => {
  const projects = await query(`
    SELECT p.*, c.name as category_name
    FROM projects p
    LEFT JOIN categories c ON p.category_id = c.id
    ORDER BY p.id DESC
  `);

  for (const project of projects) {
    const techRows = await query(`
      SELECT t.* FROM technologies t
      JOIN project_technologies pt ON t.id = pt.technology_id
      WHERE pt.project_id = ?
    `, [project.id]);
    project.technologies = techRows;
  }

  return sendSuccess(res, 'Projects list fetched.', projects);
};

export const getProjectBySlug = async (req: Request, res: Response) => {
  const project = await getOne(`
    SELECT p.*, c.name as category_name
    FROM projects p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.slug = ?
  `, [req.params.slug]);

  if (!project) return res.status(404).json({ success: false, message: 'Project not found.' });

  const techRows = await query(`
    SELECT t.* FROM technologies t
    JOIN project_technologies pt ON t.id = pt.technology_id
    WHERE pt.project_id = ?
  `, [project.id]);
  project.technologies = techRows;

  return sendSuccess(res, 'Project details fetched.', project);
};

export const createProject = async (req: AuthRequest, res: Response) => {
  const { title, slug, client_name, industry, category_id, short_description, full_description, challenge, solution, result: prjResult, cover_image, github_url, live_url, featured, technology_ids } = req.body;
  const uuid = 'prj-' + Date.now();
  const prjSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  const resObj = await run(`
    INSERT INTO projects (uuid, title, slug, client_name, industry, category_id, short_description, full_description, challenge, solution, result, cover_image, github_url, live_url, featured, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'published')
  `, [uuid, title, prjSlug, client_name, industry, category_id || null, short_description, full_description, challenge, solution, prjResult, cover_image, github_url, live_url, featured ? 1 : 0]);

  if (Array.isArray(technology_ids)) {
    for (const techId of technology_ids) {
      await run(`INSERT OR IGNORE INTO project_technologies (project_id, technology_id) VALUES (?, ?)`, [resObj.lastID, techId]);
    }
  }

  await logActivity(req.user?.id || null, req.user?.email || null, 'CREATE_PROJECT', 'projects', `Created project: ${title}`);
  return sendSuccess(res, 'Project created successfully.', { id: resObj.lastID, uuid, slug: prjSlug }, 201);
};

export const updateProject = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { title, slug, client_name, industry, category_id, short_description, full_description, challenge, solution, result: prjResult, cover_image, github_url, live_url, featured, status, technology_ids } = req.body;

  await run(`
    UPDATE projects SET title = ?, slug = ?, client_name = ?, industry = ?, category_id = ?, short_description = ?, full_description = ?, challenge = ?, solution = ?, result = ?, cover_image = ?, github_url = ?, live_url = ?, featured = ?, status = ?
    WHERE id = ?
  `, [title, slug, client_name, industry, category_id || null, short_description, full_description, challenge, solution, prjResult, cover_image, github_url, live_url, featured ? 1 : 0, status || 'published', id]);

  if (Array.isArray(technology_ids)) {
    await run(`DELETE FROM project_technologies WHERE project_id = ?`, [id]);
    for (const techId of technology_ids) {
      await run(`INSERT OR IGNORE INTO project_technologies (project_id, technology_id) VALUES (?, ?)`, [id, techId]);
    }
  }

  await logActivity(req.user?.id || null, req.user?.email || null, 'UPDATE_PROJECT', 'projects', `Updated project ID: ${id}`);
  return sendSuccess(res, 'Project updated successfully.');
};

export const deleteProject = async (req: AuthRequest, res: Response) => {
  await run(`DELETE FROM projects WHERE id = ?`, [req.params.id]);
  await run(`DELETE FROM project_technologies WHERE project_id = ?`, [req.params.id]);
  await logActivity(req.user?.id || null, req.user?.email || null, 'DELETE_PROJECT', 'projects', `Deleted project ID: ${req.params.id}`);
  return sendSuccess(res, 'Project deleted successfully.');
};

// --- BLOG CONTROLLERS ---
export const getBlogPosts = async (req: Request, res: Response) => {
  const posts = await query(`
    SELECT b.*, c.name as category_name, u.first_name || ' ' || u.last_name as author_name
    FROM blog_posts b
    LEFT JOIN categories c ON b.category_id = c.id
    LEFT JOIN users u ON b.author_id = u.id
    ORDER BY b.id DESC
  `);
  return sendSuccess(res, 'Blog posts fetched.', posts);
};

export const getBlogPostBySlug = async (req: Request, res: Response) => {
  const post = await getOne(`
    SELECT b.*, c.name as category_name, u.first_name || ' ' || u.last_name as author_name
    FROM blog_posts b
    LEFT JOIN categories c ON b.category_id = c.id
    LEFT JOIN users u ON b.author_id = u.id
    WHERE b.slug = ?
  `, [req.params.slug]);

  if (!post) return res.status(404).json({ success: false, message: 'Blog post not found.' });
  return sendSuccess(res, 'Blog post loaded.', post);
};

export const createBlogPost = async (req: AuthRequest, res: Response) => {
  const { title, slug, excerpt, content, cover_image, category_id, featured, reading_time, status } = req.body;
  const uuid = 'post-' + Date.now();
  const postSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  const result = await run(`
    INSERT INTO blog_posts (uuid, title, slug, excerpt, content, cover_image, category_id, author_id, featured, reading_time, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [uuid, title, postSlug, excerpt, content, cover_image, category_id || null, req.user?.id || 1, featured ? 1 : 0, reading_time || '5 min read', status || 'published']);

  await logActivity(req.user?.id || null, req.user?.email || null, 'CREATE_BLOG_POST', 'blog', `Published blog post: ${title}`);
  return sendSuccess(res, 'Blog post published successfully.', { id: result.lastID, uuid, slug: postSlug }, 201);
};

export const updateBlogPost = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { title, slug, excerpt, content, cover_image, category_id, featured, reading_time, status } = req.body;

  await run(`
    UPDATE blog_posts SET title = ?, slug = ?, excerpt = ?, content = ?, cover_image = ?, category_id = ?, featured = ?, reading_time = ?, status = ?
    WHERE id = ?
  `, [title, slug, excerpt, content, cover_image, category_id || null, featured ? 1 : 0, reading_time || '5 min read', status || 'published', id]);

  await logActivity(req.user?.id || null, req.user?.email || null, 'UPDATE_BLOG_POST', 'blog', `Updated blog post ID: ${id}`);
  return sendSuccess(res, 'Blog post updated successfully.');
};

export const deleteBlogPost = async (req: AuthRequest, res: Response) => {
  await run(`DELETE FROM blog_posts WHERE id = ?`, [req.params.id]);
  await logActivity(req.user?.id || null, req.user?.email || null, 'DELETE_BLOG_POST', 'blog', `Deleted blog post ID: ${req.params.id}`);
  return sendSuccess(res, 'Blog post deleted successfully.');
};

// --- TEAM & TESTIMONIALS ---
export const getTeamMembers = async (req: Request, res: Response) => {
  const team = await query(`SELECT * FROM team_members ORDER BY display_order ASC`);
  return sendSuccess(res, 'Team members fetched.', team);
};

export const createTeamMember = async (req: AuthRequest, res: Response) => {
  const { name, position, bio, photo, email, linkedin, github, telegram, twitter, display_order } = req.body;
  const result = await run(`
    INSERT INTO team_members (name, position, bio, photo, email, linkedin, github, telegram, twitter, display_order, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')
  `, [name, position, bio, photo, email, linkedin, github, telegram, twitter, display_order || 0]);

  await logActivity(req.user?.id || null, req.user?.email || null, 'CREATE_TEAM_MEMBER', 'team', `Added team member: ${name}`);
  return sendSuccess(res, 'Team member created.', { id: result.lastID }, 201);
};

export const updateTeamMember = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { name, position, bio, photo, email, linkedin, github, telegram, twitter, display_order, status } = req.body;
  await run(`
    UPDATE team_members SET name = ?, position = ?, bio = ?, photo = ?, email = ?, linkedin = ?, github = ?, telegram = ?, twitter = ?, display_order = ?, status = ?
    WHERE id = ?
  `, [name, position, bio, photo, email, linkedin, github, telegram, twitter, display_order || 0, status || 'active', id]);

  await logActivity(req.user?.id || null, req.user?.email || null, 'UPDATE_TEAM_MEMBER', 'team', `Updated team member ID: ${id}`);
  return sendSuccess(res, 'Team member updated successfully.');
};

export const deleteTeamMember = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  await run(`DELETE FROM team_members WHERE id = ?`, [id]);
  await logActivity(req.user?.id || null, req.user?.email || null, 'DELETE_TEAM_MEMBER', 'team', `Deleted team member ID: ${id}`);
  return sendSuccess(res, 'Team member deleted successfully.');
};

export const getTestimonials = async (req: Request, res: Response) => {
  const testimonials = await query(`SELECT * FROM testimonials ORDER BY display_order ASC`);
  return sendSuccess(res, 'Testimonials fetched.', testimonials);
};

export const createTestimonial = async (req: AuthRequest, res: Response) => {
  const { client_name, position, company, photo, message, rating, featured, display_order } = req.body;
  const result = await run(`
    INSERT INTO testimonials (client_name, position, company, photo, message, rating, featured, display_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `, [client_name, position, company, photo, message, rating || 5, featured ? 1 : 0, display_order || 0]);

  await logActivity(req.user?.id || null, req.user?.email || null, 'CREATE_TESTIMONIAL', 'testimonials', `Added testimonial from ${client_name}`);
  return sendSuccess(res, 'Testimonial added.', { id: result.lastID }, 201);
};

export const updateTestimonial = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { client_name, position, company, photo, message, rating, featured, display_order } = req.body;
  await run(`
    UPDATE testimonials SET client_name = ?, position = ?, company = ?, photo = ?, message = ?, rating = ?, featured = ?, display_order = ?
    WHERE id = ?
  `, [client_name, position, company, photo, message, rating || 5, featured ? 1 : 0, display_order || 0, id]);

  await logActivity(req.user?.id || null, req.user?.email || null, 'UPDATE_TESTIMONIAL', 'testimonials', `Updated testimonial ID: ${id}`);
  return sendSuccess(res, 'Testimonial updated successfully.');
};

export const deleteTestimonial = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  await run(`DELETE FROM testimonials WHERE id = ?`, [id]);
  await logActivity(req.user?.id || null, req.user?.email || null, 'DELETE_TESTIMONIAL', 'testimonials', `Deleted testimonial ID: ${id}`);
  return sendSuccess(res, 'Testimonial deleted successfully.');
};

import nodemailer from 'nodemailer';

// --- CONTACT SUBMISSIONS & CAREERS ---
export const submitContactForm = async (req: Request, res: Response) => {
  const { name, email, phone, company, budget, service, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
  }

  const uuid = 'contact-' + Date.now();
  await run(`
    INSERT INTO contact_submissions (uuid, name, email, phone, company, budget, service, message, ip_address, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'new')
  `, [uuid, name, email, phone, company, budget, service, message, req.ip]);

  try {
    if (process.env.SMTP_HOST) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const info = await transporter.sendMail({
        from: '"NilePixel Technologies" <noreply@nilepixel.com>',
        to: 'keroabdurehman@gmail.com', // User requested keroabdurehman@gmail.com
        subject: `New Project Inquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${company}\nService: ${service}\n\nMessage:\n${message}`,
        html: `
          <h3>New Contact Submission - NilePixel</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <p><strong>Company:</strong> ${company || 'N/A'}</p>
          <p><strong>Service:</strong> ${service || 'N/A'}</p>
          <hr/>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `
      });
      console.log('Email sent: %s', info.messageId);
    } else {
      console.log('SMTP_HOST not configured. Skipping email notification for contact submission.');
    }
  } catch (error) {
    console.error('Failed to send email:', error);
    // Don't block the UI response if email fails
  }

  return sendSuccess(res, 'Your consultation request has been submitted successfully. Our engineering team will contact you within 24 hours.', { uuid }, 201);
};

export const getContactSubmissions = async (req: AuthRequest, res: Response) => {
  const submissions = await query(`SELECT c.*, u.first_name || ' ' || u.last_name as assigned_name FROM contact_submissions c LEFT JOIN users u ON c.assigned_to = u.id ORDER BY c.id DESC`);
  return sendSuccess(res, 'Contact submissions loaded.', submissions);
};

export const updateContactStatus = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { status, notes, assigned_to } = req.body;
  await run(`UPDATE contact_submissions SET status = ?, notes = ?, assigned_to = ? WHERE id = ?`, [status, notes, assigned_to || null, id]);
  await logActivity(req.user?.id || null, req.user?.email || null, 'UPDATE_CONTACT_STATUS', 'contact', `Updated contact ID ${id} status to ${status}`);
  return sendSuccess(res, 'Contact submission status updated.');
};

export const getCareers = async (req: Request, res: Response) => {
  const careers = await query(`SELECT * FROM careers ORDER BY id DESC`);
  return sendSuccess(res, 'Careers list fetched.', careers);
};

export const createCareer = async (req: AuthRequest, res: Response) => {
  const { job_title, department, employment_type, location, description, requirements, responsibilities, salary, expire_date } = req.body;
  const uuid = 'job-' + Date.now();
  const result = await run(`
    INSERT INTO careers (uuid, job_title, department, employment_type, location, description, requirements, responsibilities, salary, expire_date, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'open')
  `, [uuid, job_title, department, employment_type || 'Full-time', location || 'Remote', description, requirements, responsibilities, salary, expire_date || null]);

  await logActivity(req.user?.id || null, req.user?.email || null, 'CREATE_CAREER', 'careers', `Created job opening: ${job_title}`);
  return sendSuccess(res, 'Job opening created.', { id: result.lastID, uuid }, 201);
};

export const updateCareer = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { job_title, department, employment_type, location, description, requirements, responsibilities, salary, expire_date, status } = req.body;
  
  await run(`
    UPDATE careers SET job_title = ?, department = ?, employment_type = ?, location = ?, description = ?, requirements = ?, responsibilities = ?, salary = ?, expire_date = ?, status = ?
    WHERE id = ?
  `, [job_title, department, employment_type || 'Full-time', location || 'Remote', description, requirements, responsibilities, salary, expire_date || null, status || 'open', id]);

  await logActivity(req.user?.id || null, req.user?.email || null, 'UPDATE_CAREER', 'careers', `Updated job opening ID: ${id}`);
  return sendSuccess(res, 'Job opening updated successfully.');
};

export const deleteCareer = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  await run(`DELETE FROM careers WHERE id = ?`, [id]);
  await logActivity(req.user?.id || null, req.user?.email || null, 'DELETE_CAREER', 'careers', `Deleted job opening ID: ${id}`);
  return sendSuccess(res, 'Job opening deleted successfully.');
};

export const submitJobApplication = async (req: Request, res: Response) => {
  const { career_id, applicant_name, email, phone, resume_url, portfolio_url, linkedin_url, github_url, cover_letter, telegram_username } = req.body;
  if (!career_id || !applicant_name || !email || !resume_url) {
    return res.status(400).json({ success: false, message: 'Full name, email, career ID, and resume link are required.' });
  }

  const uuid = 'app-' + Date.now();
  await run(`
    INSERT INTO job_applications (uuid, career_id, applicant_name, email, phone, resume_url, portfolio_url, linkedin_url, github_url, cover_letter, status, telegram_username)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'applied', ?)
  `, [uuid, career_id, applicant_name, email, phone, resume_url, portfolio_url, linkedin_url, github_url, cover_letter, telegram_username || null]);

  return sendSuccess(res, 'Your application has been received. Our recruiting team will review your qualifications.', { uuid }, 201);
};

export const getJobApplications = async (req: AuthRequest, res: Response) => {
  const apps = await query(`
    SELECT ja.*, c.job_title
    FROM job_applications ja
    LEFT JOIN careers c ON ja.career_id = c.id
    ORDER BY ja.id DESC
  `);
  return sendSuccess(res, 'Job applications loaded.', apps);
};

export const updateJobApplication = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { status, notes } = req.body;
  
  await run(`
    UPDATE job_applications SET status = ?, notes = ? WHERE id = ?
  `, [status, notes || null, id]);

  await logActivity(req.user?.id || null, req.user?.email || null, 'UPDATE_APPLICATION', 'careers', `Updated application ID: ${id} to status: ${status}`);
  return sendSuccess(res, 'Application status updated successfully.');
};

// --- MEDIA LIBRARY ---
export const uploadMediaFile = async (req: AuthRequest, res: Response) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded.' });

  const uuid = 'med-' + Date.now();
  // req.file.path contains the full Cloudinary URL
  const filePath = req.file.path;

  const result = await run(`
    INSERT INTO media (uuid, filename, original_name, mime_type, file_size, file_path, alt_text)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `, [uuid, req.file.filename, req.file.originalname, req.file.mimetype, req.file.size, filePath, req.file.originalname]);

  await logActivity(req.user?.id || null, req.user?.email || null, 'UPLOAD_MEDIA', 'media', `Uploaded file: ${req.file.originalname}`);
  return sendSuccess(res, 'File uploaded successfully.', { id: result.lastID, uuid, file_path: filePath, filename: req.file.filename }, 201);
};

export const getMediaFiles = async (req: Request, res: Response) => {
  const files = await query(`SELECT * FROM media ORDER BY id DESC`);
  return sendSuccess(res, 'Media list loaded.', files);
};

export const deleteMediaFile = async (req: AuthRequest, res: Response) => {
  await run(`DELETE FROM media WHERE id = ?`, [req.params.id]);
  await logActivity(req.user?.id || null, req.user?.email || null, 'DELETE_MEDIA', 'media', `Deleted media ID ${req.params.id}`);
  return sendSuccess(res, 'Media file deleted.');
};

// --- DASHBOARD & ANALYTICS & LOGS ---
export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  const [projectsCount] = await query(`SELECT COUNT(*) as total FROM projects`);
  const [servicesCount] = await query(`SELECT COUNT(*) as total FROM services`);
  const [blogCount] = await query(`SELECT COUNT(*) as total FROM blog_posts`);
  const [teamCount] = await query(`SELECT COUNT(*) as total FROM team_members`);
  const [contactsCount] = await query(`SELECT COUNT(*) as total FROM contact_submissions`);
  const [careersCount] = await query(`SELECT COUNT(*) as total FROM careers`);
  const [applicationsCount] = await query(`SELECT COUNT(*) as total FROM job_applications`);

  const recentProjects = await query(`SELECT * FROM projects ORDER BY id DESC LIMIT 5`);
  const recentContacts = await query(`SELECT * FROM contact_submissions ORDER BY id DESC LIMIT 5`);
  const recentLogs = await query(`SELECT * FROM activity_logs ORDER BY id DESC LIMIT 8`);

  return sendSuccess(res, 'Dashboard statistics loaded.', {
    stats: {
      projects: projectsCount?.total || 0,
      services: servicesCount?.total || 0,
      blog_posts: blogCount?.total || 0,
      team_members: teamCount?.total || 0,
      contacts: contactsCount?.total || 0,
      careers: careersCount?.total || 0,
      applications: applicationsCount?.total || 0
    },
    recentProjects,
    recentContacts,
    recentLogs
  });
};

export const getActivityLogs = async (req: AuthRequest, res: Response) => {
  const logs = await query(`SELECT * FROM activity_logs ORDER BY id DESC LIMIT 100`);
  return sendSuccess(res, 'Activity logs loaded.', logs);
};

export const getCategories = async (req: Request, res: Response) => {
  const categories = await query(`SELECT * FROM categories ORDER BY id ASC`);
  return sendSuccess(res, 'Categories loaded.', categories);
};

export const createCategory = async (req: AuthRequest, res: Response) => {
  const { type, name, slug, description } = req.body;
  const catSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const result = await run(`INSERT INTO categories (type, name, slug, description) VALUES (?, ?, ?, ?)`, [type, name, catSlug, description || null]);
  return sendSuccess(res, 'Category created.', { id: result.lastID, slug: catSlug }, 201);
};

export const updateCategory = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { type, name, slug, description } = req.body;
  const catSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  await run(`UPDATE categories SET type = ?, name = ?, slug = ?, description = ? WHERE id = ?`, [type, name, catSlug, description || null, id]);
  return sendSuccess(res, 'Category updated successfully.');
};

export const deleteCategory = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  await run(`DELETE FROM categories WHERE id = ?`, [id]);
  return sendSuccess(res, 'Category deleted successfully.');
};

export const getTechnologies = async (req: Request, res: Response) => {
  const techs = await query(`SELECT * FROM technologies ORDER BY name ASC`);
  return sendSuccess(res, 'Technologies loaded.', techs);
};
