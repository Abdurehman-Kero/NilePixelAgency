
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { useTheme } from '../../context/ThemeContext';
import { MessageCircle } from 'lucide-react';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { Skeleton } from '../../components/ui/Skeleton';
import { SEO } from '../../components/ui/SEO';

const BACKEND_URL = 'https://nilepixel-backend.onrender.com';

// Hard-coded services (live data from DB — avoids a /services network fetch on load)
const HARDCODED_SERVICES = [
  // ROW 1: 2 Cards
  {
    title: 'Cross-Platform Mobile Engineering',
    short_description: 'Native-quality iOS and Android mobile applications crafted using React Native and Flutter with real-time sync.',
    cover_image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80',
    slug: 'mobile-app-development',
    span: 'md:col-span-3 min-h-[200px]',
  },
  {
    title: 'Enterprise Web Application Engineering',
    short_description: 'Custom, high-throughput web systems built with React, TypeScript, Node.js, and resilient databases.',
    cover_image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
    slug: 'enterprise-web-development',
    span: 'md:col-span-3 min-h-[200px]',
  },
  // ROW 2: 3 Cards
  {
    title: 'Content Management Systems',
    short_description: 'Powerful and flexible content management systems designed to give you full control over your website\'s content.',
    cover_image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1000&q=80',
    slug: 'content-management-systems',
    span: 'md:col-span-2 min-h-[200px]',
  },
  {
    title: 'Consultancy Services',
    short_description: 'Expert advice and strategic guidance to help you navigate the complexities of digital transformation.',
    cover_image: 'https://i.imgur.com/SqzLNSQ.png',
    slug: 'consultancy-services',
    span: 'md:col-span-2 min-h-[200px]',
  },
  {
    title: 'Telegram Bots & Mini Apps',
    short_description: 'We gave Telegram Bots & Mini Apps services',
    cover_image: 'https://i.imgur.com/uAHNFV2.png',
    slug: 'telegram-bots-mini-apps',
    span: 'md:col-span-2 min-h-[200px]',
  },
  // ROW 3: 2 Cards
  {
    title: 'E-Commerce Solutions',
    short_description: 'Custom e-commerce platforms designed to deliver a seamless shopping experience, driving business growth.',
    cover_image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1000&q=80',
    slug: 'ecommerce-solutions',
    span: 'md:col-span-3 min-h-[200px]',
  },
  {
    title: 'Maintenance & Support',
    short_description: 'Reliable and proactive maintenance to keep your systems running securely and smoothly.',
    cover_image: 'https://i.imgur.com/9LVjrM7.png',
    slug: 'maintenance-support',
    span: 'md:col-span-3 min-h-[200px]',
  },
  // ROW 4: 2 Cards
  {
    title: 'Artificial Intelligence & GenAI Solutions',
    short_description: 'Custom LLM integrations, automated intelligent workflows, semantic search engines, and predictive analytics.',
    cover_image: 'https://i.imgur.com/3UBIFjj.png',
    slug: 'ai-genai-solutions',
    span: 'md:col-span-3 min-h-[200px]',
  },
  {
    title: 'Cloud Infrastructure & DevOps Automation',
    short_description: 'Automated CI/CD pipelines, Docker container orchestration, Kubernetes clusters, and AWS cloud architectures.',
    cover_image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80',
    slug: 'cloud-devops-infrastructure',
    span: 'md:col-span-3 min-h-[200px]',
  },
];

const CountUpNumber: React.FC<{ end: number; duration?: number; suffix?: string; prefix?: string }> = ({
  end,
  duration = 2000,
  suffix = '',
  prefix = '',
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
  const [projects, setProjects] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [activeJobs, setActiveJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.get('/settings').then(res => res.success && setSiteData(res.data)),
      api.get('/projects').then(res => res.success && setProjects(res.data || [])),
      api.get('/testimonials').then(res => res.success && setTestimonials(res.data || [])),
      api.get('/careers').then(res => {
        if (res.success && res.data) {
          const now = new Date().getTime();
          setActiveJobs(
            res.data.filter((j: any) => {
              if (j.status !== 'open') return false;
              if (!j.expire_date) return true;
              const expireDate = new Date(j.expire_date);
              // Set to end of the day to ensure it includes the whole expiration day
              expireDate.setHours(23, 59, 59, 999);
              return expireDate.getTime() >= now;
            })
          );
        }
      }),
    ]).finally(() => {
      setLoading(false);
    });
  }, []);

  const displayProjects = projects;
  const displayTestimonials = testimonials;

  return (
    <>
      <SEO 
        title="NilePixel Technologies | Software Development & AI Solutions"
        description="NilePixel Technologies is a leading software development agency in Ethiopia specializing in enterprise web applications, AI solutions, Telegram bots, and mobile engineering."
        url="https://nilepixel.et"
      />
    <div className="bg-transparent text-white min-h-screen relative overflow-hidden">
      {/* Grid Background */}
      <div
        className="absolute inset-0 bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_80%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, ${accentHex}20 1px, transparent 1px), linear-gradient(to bottom, ${accentHex}20 1px, transparent 1px)`,
        }}
      />

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
      <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-16 text-center max-w-5xl mx-auto px-4 z-10 space-y-8 sm:space-y-10">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border bg-[#0E1828]/90 text-xs font-semibold shadow-sm"
          style={{ borderColor: `${accentHex}50`, color: accentHex }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentHex }} />
          LEADERSHIP IN SOFTWARE ENGINEERING
        </div>

        <div className="space-y-6">
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-tight flex flex-col items-center justify-center">
            <span className="animate-fade-up-smooth inline-block">
              <span className="animate-float-continuous inline-block">ENGINEERING DIGITAL</span>
            </span>
            <span className="animate-fade-up-smooth animation-delay-200 inline-block">
              <span className="animate-float-continuous inline-block animation-delay-200">
                <span style={{ color: accentHex }}>EXCELLENCE</span>
              </span>
            </span>
          </h1>
          <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto font-medium animate-fade-up-smooth animation-delay-400">
            Empowering your digital journey with scalable, high fidelity solutions. We design, build, and deploy
            resilient web platforms and mobile apps.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/contact"
            className="px-5 py-2 sm:px-8 sm:py-3.5 rounded-full font-bold transition-all transform hover:scale-105 text-white"
            style={{ backgroundColor: accentHex }}
          >
            Start your project
          </Link>
          <Link
            to="/contact"
            className="px-5 py-2 sm:px-8 sm:py-3.5 rounded-full font-bold transition-all transform hover:scale-105 bg-transparent border-2 text-white"
            style={{ borderColor: accentHex }}
          >
            Request Consultation
          </Link>
        </div>

        {/* Video Embed */}
        <div className="pt-10 sm:pt-16 max-w-4xl mx-auto">
          <div className="aspect-video bg-transparent backdrop-blur-sm rounded-2xl overflow-hidden border border-[#1B2B44]/50 shadow-2xl relative">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/wC5aH36w-TI"
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

      {/* SERVICES — hard-coded from live DB data, no fetch needed */}
      <section className="py-16 sm:py-24 relative z-10 border-t border-[#1B2B44]/30 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-8 sm:space-y-12">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold">Customized Services For Your Success</h2>
            <p className="text-[#A9B4C5] font-medium text-sm">
              Empowering Innovation through unparalleled software development expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6 auto-rows-[minmax(0,1fr)]">
            {HARDCODED_SERVICES.map((s, idx) => (
              <div
                key={idx}
                className={`group relative rounded-3xl overflow-hidden bg-[#00E599]/5 border border-[#00E599]/20 flex flex-col text-left shadow-lg hover:shadow-[0_0_30px_rgba(0,229,153,0.15)] hover:border-[#00E599]/50 transition-all duration-300 ${s.span}`}
              >
                {/* Background Image */}
                <div className="relative w-full h-40 sm:h-48 overflow-hidden flex-shrink-0 border-b border-[#00E599]/20">
                  {s.cover_image && (
                    <img
                      src={s.cover_image}
                      alt={s.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  )}
                </div>
                
                {/* Content block aligned below */}
                <div className="p-6 flex flex-col justify-center flex-grow">
                  <h3 className="text-lg sm:text-xl font-bold" style={{ color: accentHex }}>
                    {s.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-10 sm:py-12 border-y border-[#1B2B44]/30 relative z-10 bg-transparent">
        <ScrollReveal className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 sm:gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-extrabold" style={{ color: accentHex }}>
              <CountUpNumber end={99} suffix="%" />
            </div>
            <div className="text-[11px] font-bold text-[#A9B4C5] uppercase tracking-wider">Productivity</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-extrabold" style={{ color: accentHex }}>
              <CountUpNumber end={15} suffix="+" />
            </div>
            <div className="text-[11px] font-bold text-[#A9B4C5] uppercase tracking-wider">Happy Clients</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-extrabold" style={{ color: accentHex }}>
              <CountUpNumber end={20} suffix="+" />
            </div>
            <div className="text-[11px] font-bold text-[#A9B4C5] uppercase tracking-wider">Completed Projects</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-extrabold" style={{ color: accentHex }}>
              <CountUpNumber end={3} suffix="+" />
            </div>
            <div className="text-[11px] font-bold text-[#A9B4C5] uppercase tracking-wider">Years Experience</div>
          </div>
        </ScrollReveal>
      </section>

      {/* CORE VALUES */}
      <section className="py-16 sm:py-24 relative z-10 text-center">
        <ScrollReveal className="max-w-7xl mx-auto px-4 space-y-8 sm:space-y-12">
          <h2 className="text-3xl sm:text-4xl font-bold">Our Core Values and Principles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="bg-transparent backdrop-blur-sm border border-[#1B2B44]/50 p-8 rounded-2xl space-y-4">
              <div
                className="w-10 h-10 rounded-xl bg-opacity-20 flex items-center justify-center"
                style={{ backgroundColor: `${accentHex}20`, color: accentHex }}
              >
                <span className="font-bold">01</span>
              </div>
              <h3 className="text-lg font-bold">Client-Centric Approach</h3>
              <p className="text-sm text-[#A9B4C5] leading-relaxed">
                We prioritize client needs, ensuring our solutions deliver real impact.
              </p>
            </div>
            <div className="bg-transparent backdrop-blur-sm border border-[#1B2B44]/50 p-8 rounded-2xl space-y-4">
              <div
                className="w-10 h-10 rounded-xl bg-opacity-20 flex items-center justify-center"
                style={{ backgroundColor: `${accentHex}20`, color: accentHex }}
              >
                <span className="font-bold">02</span>
              </div>
              <h3 className="text-lg font-bold">Quality Assurance</h3>
              <p className="text-sm text-[#A9B4C5] leading-relaxed">
                Rigorous testing guarantees the reliability and security of our software.
              </p>
            </div>
            <div className="bg-transparent backdrop-blur-sm border border-[#1B2B44]/50 p-8 rounded-2xl space-y-4">
              <div
                className="w-10 h-10 rounded-xl bg-opacity-20 flex items-center justify-center"
                style={{ backgroundColor: `${accentHex}20`, color: accentHex }}
              >
                <span className="font-bold">03</span>
              </div>
              <h3 className="text-lg font-bold">Innovation &amp; Excellence</h3>
              <p className="text-sm text-[#A9B4C5] leading-relaxed">
                Continuous learning pushes us to deliver state-of-the-art tech products.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* COMMUNITY BANNER */}
      <section className="py-10 sm:py-12 relative z-10 max-w-4xl mx-auto px-4">
        <ScrollReveal className="bg-transparent backdrop-blur-sm border border-[#1B2B44]/50 rounded-3xl p-8 sm:p-12 text-center space-y-8 shadow-2xl relative overflow-hidden">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border bg-[#0E1828]/90 text-xs font-semibold"
            style={{ borderColor: `${accentHex}50`, color: accentHex }}
          >
            <MessageCircle className="w-4 h-4" /> Community
          </div>
          <div className="space-y-4 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">Join our channel</h2>
            <p className="text-[#A9B4C5] font-medium text-sm max-w-xl mx-auto">
              Network with software engineers, discuss best practices, and collaborate on amazing projects.
            </p>
          </div>
          <div className="relative z-10 flex justify-center">
            <a
              href="https://t.me/NilePixelTech"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 sm:px-8 sm:py-3.5 rounded-full font-bold text-white transition-transform hover:scale-105"
              style={{ backgroundColor: accentHex }}
            >
              <MessageCircle className="w-5 h-5" /> Join Telegram Channel
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 sm:py-24 relative z-10 max-w-7xl mx-auto px-4">
        <ScrollReveal className="space-y-8 sm:space-y-12">
          <h2 className="text-3xl sm:text-4xl font-bold">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading ? (
              [1, 2, 3, 4].map(i => (
                <div
                  key={i}
                  className="bg-transparent backdrop-blur-sm border border-[#1B2B44]/50 p-8 rounded-2xl flex flex-col justify-between space-y-6 relative"
                >
                  <Skeleton variant="text" width="100%" height="60px" />
                  <div className="flex items-center gap-4">
                    <Skeleton variant="circular" width="48px" height="48px" />
                    <div className="space-y-2">
                      <Skeleton variant="text" width="100px" height="16px" />
                      <Skeleton variant="text" width="80px" height="12px" />
                    </div>
                  </div>
                </div>
              ))
            ) : displayTestimonials.slice(0, 4).map((t: any, idx: number) => (
              <div
                key={idx}
                className="bg-transparent backdrop-blur-sm border border-[#1B2B44]/50 p-8 rounded-2xl flex flex-col justify-between space-y-6 relative"
              >
                <p className="text-[#A9B4C5] text-sm leading-relaxed italic z-10 relative">
                  "{t.message || t.text || t.content}"
                </p>
                <div className="flex items-center gap-4">
                  {t.photo && (
                    <img
                      src={t.photo}
                      alt={t.client_name || t.name}
                      className="w-12 h-12 rounded-full object-cover border-2"
                      style={{ borderColor: accentHex }}
                    />
                  )}
                  <div>
                    <h4 className="font-bold text-white text-sm">{t.client_name || t.name}</h4>
                    <p className="text-[11px] text-[#94A3B8]">{t.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* LATEST WORK */}
      <section className="py-16 sm:py-24 border-t border-[#1B2B44]/30 relative z-10">
        <ScrollReveal className="max-w-7xl mx-auto px-4 space-y-8 sm:space-y-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <h2 className="text-3xl sm:text-4xl font-bold">Our latest work</h2>
            <Link to="/projects" className="text-sm font-semibold hover:underline" style={{ color: accentHex }}>
              View All Projects →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              [1, 2, 3].map(i => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[4/3]" />
                  <div className="px-1 space-y-1.5 mt-2">
                    <Skeleton variant="text" width="60%" height="20px" />
                    <Skeleton variant="text" width="100%" height="16px" />
                    <Skeleton variant="text" width="80%" height="16px" />
                  </div>
                </div>
              ))
            ) : displayProjects.slice(0, 3).map((p: any, idx: number) => (
              <Link to={`/projects/${p.slug}`} key={idx} className="group space-y-4 cursor-pointer block">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-transparent backdrop-blur-sm border border-[#1B2B44]/30 shadow-lg relative">
                  <img
                    src={
                      p.cover_image ||
                      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=100'
                    }
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 backdrop-blur rounded-full text-white font-semibold text-sm">
                      View Details
                    </span>
                  </div>
                </div>
                <div className="px-1 space-y-1.5">
                  <h3 className="text-lg font-bold text-white leading-snug group-hover:text-[#00A3FF] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#A9B4C5] leading-relaxed line-clamp-2">
                    {p.summary || p.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </section>
    </div>
    </>
  );
};

export default Home;
