import { Router } from 'express';
import {
  login, getProfile, updateProfile,
  getSiteSettings, updateSiteSettings,
  getServices, getServiceBySlug, createService, updateService, deleteService,
  getProjects, getProjectBySlug, createProject, updateProject, deleteProject,
  getBlogPosts, getBlogPostBySlug, createBlogPost, updateBlogPost, deleteBlogPost,
  getTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember,
  getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial,
  submitContactForm, getContactSubmissions, updateContactStatus,
  getCareers, createCareer, updateCareer, deleteCareer, submitJobApplication, getJobApplications, updateJobApplication,
  uploadMediaFile, getMediaFiles, deleteMediaFile,
  getDashboardStats, getActivityLogs, getCategories, createCategory, updateCategory, deleteCategory, getTechnologies
} from '../controllers/index.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
import { cacheMiddleware, clearCache } from '../middleware/cache.js';

const router = Router();

// Global Cache Invalidation for mutations
router.use((req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'OPTIONS') {
    res.on('finish', () => {
      if (res.statusCode >= 200 && res.statusCode < 400) {
        clearCache();
      }
    });
  }
  next();
});

// --- Auth Routes ---
router.post('/auth/login', login);
router.get('/auth/profile', authenticateToken, getProfile);
router.put('/auth/profile', authenticateToken, updateProfile);

// --- Settings & Site Info ---
router.get('/settings', cacheMiddleware, getSiteSettings);
router.put('/settings', authenticateToken, requireAdmin, updateSiteSettings);

// --- Categories & Technologies ---
router.get('/categories', cacheMiddleware, getCategories);
router.post('/categories', authenticateToken, requireAdmin, createCategory);
router.put('/categories/:id', authenticateToken, requireAdmin, updateCategory);
router.delete('/categories/:id', authenticateToken, requireAdmin, deleteCategory);
router.get('/technologies', cacheMiddleware, getTechnologies);

// --- Services Routes ---
router.get('/services', cacheMiddleware, getServices);
router.get('/services/:slug', cacheMiddleware, getServiceBySlug);
router.post('/services', authenticateToken, requireAdmin, createService);
router.put('/services/:id', authenticateToken, requireAdmin, updateService);
router.delete('/services/:id', authenticateToken, requireAdmin, deleteService);

// --- Projects Routes ---
router.get('/projects', cacheMiddleware, getProjects);
router.get('/projects/:slug', cacheMiddleware, getProjectBySlug);
router.post('/projects', authenticateToken, requireAdmin, createProject);
router.put('/projects/:id', authenticateToken, requireAdmin, updateProject);
router.delete('/projects/:id', authenticateToken, requireAdmin, deleteProject);

// --- Blog Routes ---
router.get('/blog', cacheMiddleware, getBlogPosts);
router.get('/blog/:slug', cacheMiddleware, getBlogPostBySlug);
router.post('/blog', authenticateToken, requireAdmin, createBlogPost);
router.put('/blog/:id', authenticateToken, requireAdmin, updateBlogPost);
router.delete('/blog/:id', authenticateToken, requireAdmin, deleteBlogPost);

// --- Team & Testimonials ---
router.get('/team', cacheMiddleware, getTeamMembers);
router.post('/team', authenticateToken, requireAdmin, createTeamMember);
router.put('/team/:id', authenticateToken, requireAdmin, updateTeamMember);
router.delete('/team/:id', authenticateToken, requireAdmin, deleteTeamMember);
router.get('/testimonials', cacheMiddleware, getTestimonials);
router.post('/testimonials', authenticateToken, requireAdmin, createTestimonial);
router.put('/testimonials/:id', authenticateToken, requireAdmin, updateTestimonial);
router.delete('/testimonials/:id', authenticateToken, requireAdmin, deleteTestimonial);

// --- Contacts ---
router.post('/contact', submitContactForm);
router.get('/contact', authenticateToken, requireAdmin, getContactSubmissions);
router.patch('/contact/:id', authenticateToken, requireAdmin, updateContactStatus);

// --- Careers & Job Applications ---
router.get('/careers', cacheMiddleware, getCareers);
router.post('/careers', authenticateToken, requireAdmin, createCareer);
router.put('/careers/:id', authenticateToken, requireAdmin, updateCareer);
router.delete('/careers/:id', authenticateToken, requireAdmin, deleteCareer);
router.post('/applications', submitJobApplication);
router.get('/applications', authenticateToken, requireAdmin, getJobApplications);
router.put('/applications/:id', authenticateToken, requireAdmin, updateJobApplication);

// --- Media Library ---
router.post('/media/upload', authenticateToken, requireAdmin, upload.single('file'), uploadMediaFile);
router.get('/media', getMediaFiles);
router.delete('/media/:id', authenticateToken, requireAdmin, deleteMediaFile);

// --- Dashboard & System Logs ---
router.get('/dashboard/statistics', authenticateToken, requireAdmin, getDashboardStats);
router.get('/dashboard/activity', authenticateToken, requireAdmin, getActivityLogs);

export default router;
