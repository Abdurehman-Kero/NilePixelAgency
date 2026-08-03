import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#08111F]/90 backdrop-blur-md border-b border-[#1B2B44]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Logo />

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-xl text-xs font-medium transition ${
                    active
                      ? 'text-white bg-[#0F6FFF]/10 border border-[#0F6FFF]/30'
                      : 'text-[#A9B4C5] hover:text-white hover:bg-[#101C2F]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">

            <Link
              to="/contact"
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#0F6FFF] to-[#00A3FF] hover:opacity-90 transition shadow-lg shadow-[#0F6FFF]/25 flex items-center gap-1.5"
            >
              Start Project <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#A9B4C5] hover:text-white hover:bg-[#101C2F]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 border-b border-[#1B2B44]/60 bg-[#08111F]/95 backdrop-blur-xl px-4 pt-4 pb-8 shadow-2xl animate-fade-up-smooth origin-top">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-medium text-[#A9B4C5] hover:text-white hover:bg-[#101C2F] transition-all"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-6 mt-4 border-t border-[#1B2B44]/50">
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#0F6FFF] to-[#00A3FF] shadow-lg shadow-[#0F6FFF]/25 transition hover:opacity-90"
            >
              Start Project
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
