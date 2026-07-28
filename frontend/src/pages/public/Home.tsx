
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { useTheme } from '../../context/ThemeContext';
import { ArrowRight, MessageCircle } from 'lucide-react';

const CountUpNumber: React.FC<{ end: number; duration?: number; suffix?: string; prefix?: string }> = ({
  end,
  duration = 2000,
  suffix = '',
  prefix = ''
}) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = React.useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasAnimated) return;
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };
    animationFrameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [hasAnimated, end, duration]);

  return <span ref={elementRef}>{prefix}{count}{suffix}</span>;
};

export const Home: React.FC = () => {
  const { accentColor: accentHex } = useTheme();
  
  const [siteData, setSiteData] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [activeJobs, setActiveJobs] = useState<any[]>([]);

  useEffect(() => {
    api.get('/settings').then(res => res.success && setSiteData(res.data));
    api.get('/services').then(res => res.success && setServices(res.data || []));
    api.get('/projects').then(res => {
      if (res.success && res.data) setProjects(res.data);
    });
    api.get('/testimonials').then(res => res.success && setTestimonials(res.data || []));
    api.get('/careers').then(res => {
      if (res.success && res.data) {
        // Only show jobs that are 'open' and haven't expired
        const now = new Date().getTime();
        const validJobs = res.data.filter((j: any) => {
          if (j.status !== 'open') return false;
          if (j.expire_date && new Date(j.expire_date).getTime() < now) return false;
          return true;
        });
        setActiveJobs(validJobs);
      }
    });
  }, []);

  // Hardcoded placeholders if DB is empty
  const defaultServices = [
    { title: 'Custom Web and Mobile Development', short_description: 'We build scalable web and mobile applications tailored to your business needs.', icon: 'Code', cover_image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80' },
    { title: 'Content Management Systems', short_description: 'User-friendly CMS solutions designed to give you complete control over your content.', icon: 'Layers', cover_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80' },
    { title: 'Telegram Bots & Mini Apps', short_description: 'Helping Businesses Build Telegram Bots, Mini Apps & Automation Systems', icon: 'MessageCircle', cover_image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80' },
    { title: 'API Integrations', short_description: 'Seamless integration of third-party APIs to extend the functionality of your platform.', icon: 'Zap', cover_image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80' }
  ];

  const defaultTestimonials = [
    { name: 'Emilia Clarke', position: 'CTO, TechCorp', text: 'NilePixel completely transformed our digital presence. Their attention to detail and robust engineering is unmatched.', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80' },
    { name: 'James Doe', position: 'Founder, Startup X', text: 'Working with them was the best decision we made. Fast, scalable, and incredibly beautiful interfaces.', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' }
  ];

  const defaultProjectsList = [
    { title: 'Nile Ride', slug: 'nile-ride', summary: 'A complete ride-sharing platform that includes a Driver App, Customer App, Admin Dashboard, and Marketing Website...', cover_image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=100' },
    { title: 'ICare MC', slug: 'icare-mc', summary: 'A complete maternal and child healthcare platform designed to support families from pregnancy through early childhood...', cover_image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=100' },
    { title: 'Agency Management ERP', slug: 'agency-management-erp', summary: 'The Agency is an all-in-one platform that helps businesses manage their clients, services, and projects in one place.', cover_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=100' }
  ];

  const displayServices = services.length > 0 ? services : defaultServices;
  const displayProjects = projects.length > 0 ? projects : defaultProjectsList;
  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <div className="bg-[#04080F] text-white min-h-screen relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1B2B44_1px,transparent_1px),linear-gradient(to_bottom,#1B2B44_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_80%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.15] pointer-events-none" />

      {/* JOB ALERT BANNER */}
      {activeJobs.length > 0 && (
        <div className="relative z-20 bg-[#00E599]/10 border-b border-[#00E599]/20 text-center py-2 px-4 backdrop-blur-sm">
          <p className="text-xs sm:text-sm font-semibold text-white">
            🚀 We are hiring! We have {activeJobs.length} open position{activeJobs.length > 1 ? 's' : ''}.{' '}
            <Link to="/careers" className="text-[#00E599] hover:underline ml-2">
              View Opportunities &rarr;
            </Link>
          </p>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-16 text-center max-w-5xl mx-auto px-4 z-10 space-y-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border bg-[#0E1828]/90 text-xs font-semibold shadow-sm" style={{ borderColor: `${accentHex}50`, color: accentHex }}>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentHex }} />
          LEADERSHIP IN SOFTWARE ENGINEERING
        </div>
        
        <div className="space-y-6">
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-tight">
            TURNING VISION <br/> INTO <span style={{ color: accentHex }}>REALITY</span>
          </h1>
          <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto font-medium">
            Empowering your digital journey with scalable, high fidelity solutions. We design, build, and deploy resilient web platforms and mobile apps.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link to="/contact" className="px-8 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 text-white" style={{ backgroundColor: accentHex }}>
            Start your project
          </Link>
          <Link to="/contact" className="px-8 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 bg-transparent border-2 text-white" style={{ borderColor: accentHex }}>
            Request Consultation
          </Link>
        </div>

        {/* Video Embed */}
        <div className="pt-16 max-w-4xl mx-auto">
          <div className="aspect-video bg-[#0A1220] rounded-2xl overflow-hidden border border-[#1B2B44]/50 shadow-2xl relative">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/QyhwSYhX09s?si=bMpOEvRxHugl_6TJ" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 relative z-10 border-t border-[#1B2B44]/30 bg-gradient-to-b from-[#0A1220]/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-12">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold">Customized Services For Your Success</h2>
            <p className="text-[#A9B4C5] font-medium text-sm">Empowering Innovation through unparalleled software development expertise</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayServices.slice(0, 4).map((s, idx) => (
              <div key={idx} className="group relative rounded-2xl overflow-hidden bg-[#0A1220] border border-[#1B2B44]/50 flex flex-col sm:flex-row text-left">
                {s.cover_image && (
                   <div className="w-full sm:w-2/5 aspect-video sm:aspect-auto overflow-hidden bg-[#08111F]">
                     <img src={s.cover_image} alt={s.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                   </div>
                )}
                <div className="p-6 sm:w-3/5 flex flex-col justify-center">
                  <h3 className="text-lg font-bold text-white mb-2" style={{ color: accentHex }}>{s.title}</h3>
                  <p className="text-[#A9B4C5] text-sm leading-relaxed line-clamp-3">{s.short_description || s.description || s.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 border-y border-[#1B2B44]/30 relative z-10 bg-[#060C16]">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-[#1B2B44]/50 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-extrabold" style={{ color: accentHex }}><CountUpNumber end={99} suffix="%" /></div>
            <div className="text-[11px] font-bold text-[#A9B4C5] uppercase tracking-wider">Productivity</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-extrabold" style={{ color: accentHex }}><CountUpNumber end={24} suffix="+" /></div>
            <div className="text-[11px] font-bold text-[#A9B4C5] uppercase tracking-wider">Happy Clients</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-extrabold" style={{ color: accentHex }}><CountUpNumber end={48} suffix="+" /></div>
            <div className="text-[11px] font-bold text-[#A9B4C5] uppercase tracking-wider">Completed Projects</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-extrabold" style={{ color: accentHex }}><CountUpNumber end={6} suffix="+" /></div>
            <div className="text-[11px] font-bold text-[#A9B4C5] uppercase tracking-wider">Years Experience</div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-24 relative z-10 max-w-7xl mx-auto px-4 space-y-12 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold">Our Core Values and Principles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="bg-[#0A1220] border border-[#1B2B44]/50 p-8 rounded-2xl space-y-4">
            <div className="w-10 h-10 rounded-xl bg-opacity-20 flex items-center justify-center" style={{ backgroundColor: `${accentHex}20`, color: accentHex }}>
               <span className="font-bold">01</span>
            </div>
            <h3 className="text-lg font-bold">Client-Centric Approach</h3>
            <p className="text-sm text-[#A9B4C5] leading-relaxed">We prioritize client needs, ensuring our solutions deliver real impact.</p>
          </div>
          <div className="bg-[#0A1220] border border-[#1B2B44]/50 p-8 rounded-2xl space-y-4">
            <div className="w-10 h-10 rounded-xl bg-opacity-20 flex items-center justify-center" style={{ backgroundColor: `${accentHex}20`, color: accentHex }}>
               <span className="font-bold">02</span>
            </div>
            <h3 className="text-lg font-bold">Quality Assurance</h3>
            <p className="text-sm text-[#A9B4C5] leading-relaxed">Rigorous testing guarantees the reliability and security of our software.</p>
          </div>
          <div className="bg-[#0A1220] border border-[#1B2B44]/50 p-8 rounded-2xl space-y-4">
            <div className="w-10 h-10 rounded-xl bg-opacity-20 flex items-center justify-center" style={{ backgroundColor: `${accentHex}20`, color: accentHex }}>
               <span className="font-bold">03</span>
            </div>
            <h3 className="text-lg font-bold">Innovation & Excellence</h3>
            <p className="text-sm text-[#A9B4C5] leading-relaxed">Continuous learning pushes us to deliver state-of-the-art tech products.</p>
          </div>
        </div>
      </section>

      {/* COMMUNITY BANNER */}
      <section className="py-12 relative z-10 max-w-4xl mx-auto px-4">
        <div className="bg-[#0A1220] border border-[#1B2B44]/50 rounded-3xl p-8 sm:p-12 text-center space-y-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-opacity-20 blur-3xl pointer-events-none rounded-full" style={{ backgroundColor: accentHex, transform: 'translate(30%, -30%)' }} />
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border bg-[#0E1828]/90 text-xs font-semibold" style={{ borderColor: `${accentHex}50`, color: accentHex }}>
            <MessageCircle className="w-4 h-4" /> Community
          </div>
          <div className="space-y-4 relative z-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">Join our channel</h2>
            <p className="text-[#A9B4C5] font-medium text-sm max-w-xl mx-auto">
              Network with software engineers, discuss best practices, and collaborate on amazing projects.
            </p>
          </div>
          <div className="relative z-10 flex justify-center">
            <a href="https://t.me/jalos_trip" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-white transition-transform hover:scale-105" style={{ backgroundColor: accentHex }}>
              <MessageCircle className="w-5 h-5" /> Join Telegram Channel
            </a>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 relative z-10 max-w-7xl mx-auto px-4 space-y-12">
        <h2 className="text-3xl sm:text-4xl font-bold">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayTestimonials.slice(0, 4).map((t, idx) => (
            <div key={idx} className="bg-[#0A1220] border border-[#1B2B44]/50 p-8 rounded-2xl flex flex-col justify-between space-y-6 relative">
              <p className="text-[#A9B4C5] text-sm leading-relaxed italic z-10 relative">"{t.message || t.text || t.content}"</p>
              <div className="flex items-center gap-4">
                {t.photo && (
                  <img src={t.photo} alt={t.client_name || t.name} className="w-12 h-12 rounded-full object-cover border-2" style={{ borderColor: accentHex }} />
                )}
                <div>
                  <h4 className="font-bold text-white text-sm">{t.client_name || t.name}</h4>
                  <p className="text-[11px] text-[#94A3B8]">{t.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LATEST WORK */}
      <section className="py-24 border-t border-[#1B2B44]/30 relative z-10">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <h2 className="text-3xl sm:text-4xl font-bold">Our latest work</h2>
            <Link to="/projects" className="text-sm font-semibold hover:underline" style={{ color: accentHex }}>View All Projects →</Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProjects.slice(0, 3).map((p, idx) => (
              <Link to={`/projects/${p.slug}`} key={idx} className="group space-y-4 cursor-pointer block">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#0A1220] border border-[#1B2B44]/30 shadow-lg relative">
                  <img 
                    src={p.cover_image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=100'} 
                    alt={p.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 bg-white/10 backdrop-blur rounded-full text-white font-semibold text-sm">View Details</span>
                  </div>
                </div>
                <div className="px-1 space-y-1.5">
                  <h3 className="text-lg font-bold text-white leading-snug group-hover:text-[#00A3FF] transition-colors">{p.title}</h3>
                  <p className="text-xs sm:text-[13px] text-[#A9B4C5] leading-relaxed line-clamp-2">
                    {p.summary || p.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
