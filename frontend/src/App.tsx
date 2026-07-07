import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/ui/Navbar';
import { Footer } from './components/ui/Footer';

// Helper component to scroll instantly to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
};

// Smooth Page Transition Wrapper
const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="w-full flex-1 flex flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Public Pages
import { Home } from './pages/public/Home';
import { About } from './pages/public/About';
import { ServicesPage } from './pages/public/ServicesPage';
import { ServiceDetails } from './pages/public/ServiceDetails';
import { ProjectsPage } from './pages/public/ProjectsPage';
import { ProjectDetails } from './pages/public/ProjectDetails';
import { BlogPage } from './pages/public/BlogPage';
import { BlogDetails } from './pages/public/BlogDetails';
import { CareersPage } from './pages/public/CareersPage';
import { ContactPage } from './pages/public/ContactPage';
import { PrivacyPolicy, TermsOfService } from './pages/public/LegalPages';

// Admin CMS Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ProjectsCMS } from './pages/admin/ProjectsCMS';
import { ServicesCMS } from './pages/admin/ServicesCMS';
import { BlogCMS } from './pages/admin/BlogCMS';
import { CategoriesCMS } from './pages/admin/CategoriesCMS';
import { TeamCMS } from './pages/admin/TeamCMS';
import { TestimonialsCMS } from './pages/admin/TestimonialsCMS';
import { ContactsCMS } from './pages/admin/ContactsCMS';
import { CareersCMS } from './pages/admin/CareersCMS';
import { MediaCMS } from './pages/admin/MediaCMS';
import { SettingsCMS } from './pages/admin/SettingsCMS';
import { ActivityLogsCMS } from './pages/admin/ActivityLogsCMS';

// Protected Route Guard
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, token, loading } = useAuth();
  if (loading) {
    return <div className="bg-[#08111F] text-white min-h-screen flex items-center justify-center text-xs">Authenticating user...</div>;
  }
  if (!token || !user) {
    return <Navigate to="/admin/login" replace />;
  }
  return <PageTransition>{children}</PageTransition>;
};

// Layout for Public Site
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-[#08111F]">
    <Navbar />
    <main className="flex-1 flex flex-col">
      <PageTransition>{children}</PageTransition>
    </main>
    <Footer />
  </div>
);

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
            <Route path="/services" element={<PublicLayout><ServicesPage /></PublicLayout>} />
            <Route path="/services/:slug" element={<PublicLayout><ServiceDetails /></PublicLayout>} />
            <Route path="/projects" element={<PublicLayout><ProjectsPage /></PublicLayout>} />
            <Route path="/projects/:slug" element={<PublicLayout><ProjectDetails /></PublicLayout>} />
            <Route path="/blog" element={<PublicLayout><BlogPage /></PublicLayout>} />
            <Route path="/blog/:slug" element={<PublicLayout><BlogDetails /></PublicLayout>} />
            <Route path="/careers" element={<PublicLayout><CareersPage /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
            <Route path="/privacy-policy" element={<PublicLayout><PrivacyPolicy /></PublicLayout>} />
            <Route path="/terms" element={<PublicLayout><TermsOfService /></PublicLayout>} />

            {/* Admin CMS Authentication */}
            <Route path="/admin/login" element={<PageTransition><AdminLogin /></PageTransition>} />

            {/* Protected Admin CMS Portal Routes */}
            <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/projects" element={<ProtectedRoute><ProjectsCMS /></ProtectedRoute>} />
            <Route path="/admin/services" element={<ProtectedRoute><ServicesCMS /></ProtectedRoute>} />
            <Route path="/admin/blog" element={<ProtectedRoute><BlogCMS /></ProtectedRoute>} />
            <Route path="/admin/categories" element={<ProtectedRoute><CategoriesCMS /></ProtectedRoute>} />
            <Route path="/admin/team" element={<ProtectedRoute><TeamCMS /></ProtectedRoute>} />
            <Route path="/admin/testimonials" element={<ProtectedRoute><TestimonialsCMS /></ProtectedRoute>} />
            <Route path="/admin/contacts" element={<ProtectedRoute><ContactsCMS /></ProtectedRoute>} />
            <Route path="/admin/careers" element={<ProtectedRoute><CareersCMS /></ProtectedRoute>} />
            <Route path="/admin/media" element={<ProtectedRoute><MediaCMS /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute><SettingsCMS /></ProtectedRoute>} />
            <Route path="/admin/activity" element={<ProtectedRoute><ActivityLogsCMS /></ProtectedRoute>} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
