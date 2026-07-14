import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = React.useState('info@nilepixel.com');
  const [phone, setPhone] = React.useState('+251982310974');

  React.useEffect(() => {
    import('../../services/api').then(({ api }) => {
      api.get('/settings').then(res => {
        if (res.success && res.data?.company) {
          if (res.data.company.email) setEmail(res.data.company.email);
          if (res.data.company.phone) setPhone(res.data.company.phone);
        }
      });
    });
  }, []);

  return (
    <footer className="bg-[#050B15] border-t border-[#1B2B44] text-[#A9B4C5] pt-16 pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Logo />
            <p className="max-w-sm text-xs text-[#A9B4C5] leading-relaxed">
              NilePixel Technologies is an enterprise engineering studio delivering scalable cloud software, AI automation, high-performance web systems, and custom digital platforms across East Africa and globally.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://www.linkedin.com/company/nilepixel-technologies" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-[#08111F] border border-[#23344F] flex items-center justify-center text-[#A9B4C5] hover:text-[#00A3FF] hover:border-[#00A3FF] transition">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-[#08111F] border border-[#23344F] flex items-center justify-center text-[#A9B4C5] hover:text-[#00A3FF] hover:border-[#00A3FF] transition">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-[#08111F] border border-[#23344F] flex items-center justify-center text-[#A9B4C5] hover:text-[#00A3FF] hover:border-[#00A3FF] transition">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-white transition">About NilePixel</Link></li>
              <li><Link to="/services" className="hover:text-white transition">Core Services</Link></li>
              <li><Link to="/projects" className="hover:text-white transition">Case Studies</Link></li>
              <li><Link to="/blog" className="hover:text-white transition">Engineering Blog</Link></li>
              <li><Link to="/careers" className="hover:text-white transition">Join Our Team</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/services/custom-software" className="hover:text-white transition">Custom Software</Link></li>
              <li><Link to="/services/ai-solutions" className="hover:text-white transition">AI & Automation</Link></li>
              <li><Link to="/services/cloud-engineering" className="hover:text-white transition">Cloud Engineering</Link></li>
              <li><Link to="/services/web-mobile" className="hover:text-white transition">Web & Mobile Apps</Link></li>
              <li><Link to="/services/cybersecurity" className="hover:text-white transition">Cybersecurity</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide">HQ Contact</h4>
            <div className="space-y-2.5">
              <p className="flex items-start gap-2.5 text-xs text-[#A9B4C5]">
                <MapPin className="w-4 h-4 text-[#00A3FF] shrink-0 mt-0.5" />
                <span>Bole Sub-City, Addis Ababa, Ethiopia</span>
              </p>
              <p className="flex items-center gap-2.5 text-xs text-[#A9B4C5]">
                <Mail className="w-4 h-4 text-[#00A3FF] shrink-0" />
                <span>{email}</span>
              </p>
              <p className="flex items-center gap-2.5 text-xs text-[#A9B4C5]">
                <Phone className="w-4 h-4 text-[#00A3FF] shrink-0" />
                <span>{phone}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#1B2B44] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#A9B4C5]">
          <p>© {new Date().getFullYear()} NilePixel Technologies. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition">Terms of Service</Link>
            <Link to="/admin/login" className="hover:text-white transition flex items-center gap-1">Admin Portal <ArrowUpRight className="w-3 h-3" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
