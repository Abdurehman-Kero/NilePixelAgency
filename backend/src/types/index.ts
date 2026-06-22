export interface User {
  id: number;
  uuid: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  password_hash?: string;
  avatar?: string;
  role_id: number;
  role_name?: string;
  is_active: boolean;
  email_verified: boolean;
  created_at?: string;
}

export interface SiteSettings {
  company_name: string;
  tagline: string;
  about_summary: string;
  mission: string;
  vision: string;
  history: string;
  phone: string;
  email: string;
  address: string;
  working_hours: string;
  maps_url: string;
  hero_title: string;
  hero_subtitle: string;
  hero_badge: string;
  hero_primary_btn: string;
  hero_secondary_btn: string;
  primary_color: string;
  secondary_color: string;
  theme_mode: string;
}

export interface Category {
  id: number;
  type: 'project' | 'service' | 'blog';
  name: string;
  slug: string;
  description?: string;
}

export interface Service {
  id: number;
  uuid: string;
  title: string;
  slug: string;
  category_id?: number;
  category_name?: string;
  short_description: string;
  full_description?: string;
  icon?: string;
  image?: string;
  display_order: number;
  featured: boolean;
  status: 'active' | 'inactive';
  meta_title?: string;
  meta_description?: string;
  created_at?: string;
}

export interface Technology {
  id: number;
  name: string;
  slug: string;
  category?: string;
  icon_url?: string;
  description?: string;
}

export interface Project {
  id: number;
  uuid: string;
  title: string;
  slug: string;
  client_name?: string;
  industry?: string;
  category_id?: number;
  category_name?: string;
  short_description: string;
  full_description?: string;
  challenge?: string;
  solution?: string;
  result?: string;
  cover_image?: string;
  github_url?: string;
  live_url?: string;
  featured: boolean;
  status: 'published' | 'draft' | 'archived';
  published_at?: string;
  technologies?: Technology[];
  images?: string[];
  created_at?: string;
}

export interface BlogPost {
  id: number;
  uuid: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image?: string;
  category_id?: number;
  category_name?: string;
  author_id?: number;
  author_name?: string;
  featured: boolean;
  reading_time?: string;
  status: 'published' | 'draft' | 'archived';
  published_at?: string;
  created_at?: string;
}

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio?: string;
  photo?: string;
  email?: string;
  linkedin?: string;
  github?: string;
  telegram?: string;
  twitter?: string;
  display_order: number;
  status: 'active' | 'inactive';
}

export interface Testimonial {
  id: number;
  client_name: string;
  position?: string;
  company?: string;
  photo?: string;
  message: string;
  rating: number;
  featured: boolean;
  display_order: number;
  status: 'active' | 'inactive';
}

export interface ContactSubmission {
  id: number;
  uuid: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  budget?: string;
  service?: string;
  message: string;
  ip_address?: string;
  status: 'new' | 'in_progress' | 'replied' | 'archived';
  assigned_to?: number;
  assigned_name?: string;
  notes?: string;
  created_at?: string;
}

export interface Career {
  id: number;
  uuid: string;
  job_title: string;
  department: string;
  employment_type: string;
  location: string;
  description: string;
  requirements?: string;
  responsibilities?: string;
  salary?: string;
  status: 'open' | 'closed';
  created_at?: string;
}

export interface JobApplication {
  id: number;
  uuid: string;
  career_id: number;
  job_title?: string;
  applicant_name: string;
  email: string;
  phone?: string;
  resume_url: string;
  portfolio_url?: string;
  linkedin_url?: string;
  github_url?: string;
  cover_letter?: string;
  status: 'applied' | 'reviewing' | 'interviewing' | 'accepted' | 'rejected';
  notes?: string;
  created_at?: string;
}

export interface MediaFile {
  id: number;
  uuid: string;
  filename: string;
  original_name: string;
  mime_type: string;
  file_size: number;
  file_path: string;
  alt_text?: string;
  created_at?: string;
}

export interface ActivityLog {
  id: number;
  user_id?: number;
  user_email?: string;
  action: string;
  module: string;
  details?: string;
  ip_address?: string;
  created_at?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any[];
  timestamp?: string;
}
