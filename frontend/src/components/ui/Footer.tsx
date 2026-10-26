import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Send, ArrowUpRight } from 'lucide-react';
import { useCompany } from '../../hooks/useApiData';
import { Logo } from './Logo';

const COMPANY_LINKS = [
  { name: 'About us', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Projects', path: '/projects' },
  { name: 'Blog', path: '/blog' },
  { name: 'Careers', path: '/careers' },
  { name: 'Contact', path: '/contact' },
];

const SERVICE_LINKS = [
  { name: 'Web Applications', path: '/services/enterprise-web-development' },
  { name: 'Mobile Apps', path: '/services/mobile-app-development' },
  { name: 'AI & GenAI', path: '/services/ai-genai-solutions' },
  { name: 'Cloud & DevOps', path: '/services/cloud-devops-infrastructure' },
  { name: 'Telegram Bots', path: '/services/telegram-bots-mini-apps' },
];

const columnTitle = 'mb-4 text-sm font-semibold text-white';
const linkStyle = 'text-sm text-white/65 transition-colors hover:text-accent';
const socialStyle =
  'flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-white/70 transition hover:border-accent hover:text-accent';

export const Footer: React.FC = () => {
  const { email, phone } = useCompany();

  return (
    <footer className="relative bg-slate-dark text-white/65">
      {/* Layered wave replacing the straight top edge */}
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-full h-12 w-full sm:h-20"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d="M0 58C240 8 480 98 720 52S1200 2 1440 48V100H0Z" fill="#f5821f" fillOpacity="0.22" />
        <path d="M0 76C200 30 420 96 720 70S1180 30 1440 72V100H0Z" fill="#23272e" />
        <path d="M0 76C200 30 420 96 720 70S1180 30 1440 72" fill="none" stroke="#f5821f" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="container-page pb-8 pt-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-4">
            <Logo inverted />
            <p className="max-w-sm text-sm leading-relaxed">
              An engineering studio building scalable web platforms, mobile apps and AI systems for businesses across
              East Africa and beyond.
            </p>
            <div className="flex items-center gap-2.5">
              <a
                href="https://www.linkedin.com/company/nilepixel-technologies"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className={socialStyle}
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="https://t.me/NilePixelTech" target="_blank" rel="noreferrer" aria-label="Telegram" className={socialStyle}>
                <Send className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className={columnTitle}>Company</h4>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className={linkStyle}>{l.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className={columnTitle}>Services</h4>
            <ul className="space-y-3">
              {SERVICE_LINKS.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className={linkStyle}>{l.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className={columnTitle}>Get in touch</h4>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>Bole Sub-City, Addis Ababa, Ethiopia</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                <a href={`mailto:${email}`} className="transition-colors hover:text-white">{email}</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                <a href={`tel:${phone}`} className="transition-colors hover:text-white">{phone}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} NilePixel Technologies. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="transition-colors hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="transition-colors hover:text-white">Terms of Service</Link>
            <Link
              to="/admin/login"
              title="Admin portal"
              aria-label="Admin portal"
              className="opacity-20 transition-opacity hover:opacity-100"
            >
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
