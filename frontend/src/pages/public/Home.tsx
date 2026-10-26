import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Quote } from 'lucide-react';
import { useApiData } from '../../hooks/useApiData';
import { projectSummary } from '../../utils/content';
import { SERVICES } from '../../data/services';
import { SEO } from '../../components/ui/SEO';
import { Skeleton } from '../../components/ui/Skeleton';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { SectionTitle } from '../../components/ui/SectionTitle';
import { ServiceCard } from '../../components/ui/ServiceCard';
import { Hero } from '../../components/home/Hero';
import { WhySection } from '../../components/home/WhySection';
import { Process } from '../../components/home/Process';
import { TechStack } from '../../components/home/TechStack';
import { Faq } from '../../components/home/Faq';
import { CtaBanner } from '../../components/home/CtaBanner';

const FALLBACK_COVER = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80';

export const Home: React.FC = () => {
  // Each section reads from the cache independently, so nothing waits on the others.
  const { data: projects = [], loading: projectsLoading } = useApiData<any[]>('/projects');
  const { data: testimonials = [], loading: testimonialsLoading } = useApiData<any[]>('/testimonials');
  const { data: careers = [] } = useApiData<any[]>('/careers');

  const activeJobs = useMemo(() => {
    const now = Date.now();
    return careers.filter((j: any) => {
      if (j.status !== 'open') return false;
      if (!j.expire_date) return true;
      const expires = new Date(j.expire_date);
      expires.setHours(23, 59, 59, 999); // include the whole expiry day
      return expires.getTime() >= now;
    });
  }, [careers]);

  return (
    <>
      <SEO
        title="NilePixel Technologies | Software Development & AI Solutions"
        description="NilePixel Technologies is a leading software development agency in Ethiopia specializing in enterprise web applications, AI solutions, Telegram bots, and mobile engineering."
        url="https://nilepixel.et"
      />

      {activeJobs.length > 0 && (
        <div className="bg-ink text-white">
          <p className="container-page flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2.5 text-center text-[13px]">
            <span>
              We're hiring — {activeJobs.length} open position{activeJobs.length > 1 ? 's' : ''}.
            </span>
            <Link to="/careers" className="inline-flex items-center gap-1 font-semibold text-accent hover:underline">
              View roles <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </p>
        </div>
      )}

      <Hero />

      {/* SERVICES */}
      <section className="section">
        <div className="container-page space-y-12 sm:space-y-14">
          <SectionTitle
            eyebrow="What we do"
            title="Customized services for your success"
            description="End-to-end software engineering, from the first prototype to production and beyond."
          />
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      <WhySection />
      <Process />
      <TechStack />

      {/* LATEST WORK */}
      <section className="section bg-surface">
        <ScrollReveal className="container-page space-y-12 sm:space-y-14">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow mb-3">Selected work</p>
              <h2 className="heading-lg">Our latest projects</h2>
            </div>
            <Link
              to="/projects"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-hover"
            >
              View all projects <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projectsLoading
              ? [1, 2, 3].map((i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-[4/3]" />
                    <Skeleton variant="text" width="60%" height="20px" />
                    <Skeleton variant="text" width="100%" height="14px" />
                  </div>
                ))
              : projects.slice(0, 3).map((p) => (
                  <Link to={`/projects/${p.slug}`} key={p.id || p.slug} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-white">
                      <img
                        src={p.cover_image || FALLBACK_COVER}
                        alt={p.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-night/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink shadow-card transition duration-300 sm:translate-y-1 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                    <h3 className="mt-5 text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-accent">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-body">{projectSummary(p)}</p>
                  </Link>
                ))}
          </div>
        </ScrollReveal>
      </section>

      {/* TESTIMONIALS */}
      {(testimonialsLoading || testimonials.length > 0) && (
        <section className="section">
          <ScrollReveal className="container-page space-y-12 sm:space-y-14">
            <SectionTitle eyebrow="Testimonials" title="Trusted by teams we've built with" />
            <div className="grid gap-5 md:grid-cols-2 md:gap-6">
              {testimonialsLoading
                ? [1, 2].map((i) => (
                    <div key={i} className="card space-y-6 p-8">
                      <Skeleton variant="text" height="72px" />
                      <div className="flex items-center gap-4">
                        <Skeleton variant="circular" width="48px" height="48px" />
                        <div className="flex-1 space-y-2">
                          <Skeleton variant="text" width="120px" height="14px" />
                          <Skeleton variant="text" width="80px" height="12px" />
                        </div>
                      </div>
                    </div>
                  ))
                : testimonials.slice(0, 4).map((t: any, idx: number) => (
                    <figure key={t.id ?? idx} className="card card-hover flex flex-col justify-between gap-8 p-6 sm:p-8">
                      <div>
                        <Quote className="h-8 w-8 text-accent/50" aria-hidden />
                        <blockquote className="mt-4 text-[15px] leading-relaxed text-ink">
                          {t.message || t.text || t.content}
                        </blockquote>
                      </div>
                      <figcaption className="flex items-center gap-4">
                        {t.photo && (
                          <img
                            src={t.photo}
                            alt={t.client_name || t.name}
                            className="h-12 w-12 rounded-full border border-line object-cover"
                          />
                        )}
                        <div>
                          <p className="text-sm font-semibold text-ink">{t.client_name || t.name}</p>
                          <p className="text-xs text-muted">{t.position}</p>
                        </div>
                      </figcaption>
                    </figure>
                  ))}
            </div>
          </ScrollReveal>
        </section>
      )}

      <Faq className={testimonials.length > 0 ? 'bg-surface' : 'bg-white'} />
      <CtaBanner />
      <div className="h-16 sm:h-24" />
    </>
  );
};

export default Home;
