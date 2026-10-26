import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Building2 } from 'lucide-react';
import { useApiData } from '../../hooks/useApiData';
import { projectSummary, techNames } from '../../utils/content';
import { Skeleton } from '../../components/ui/Skeleton';
import { SEO } from '../../components/ui/SEO';
import { PageHeader } from '../../components/ui/PageHeader';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { CtaBanner } from '../../components/home/CtaBanner';

const FALLBACK_COVER = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80';

const withProtocol = (url: string) => (url.startsWith('http') ? url : `https://${url}`);

/** Strip the "Client – " prefix style from long titles for a cleaner heading. */
const shortTitle = (title: string) => title.split(/\s[–—-]\s/)[0] || title;
const subTitle = (title: string) => title.split(/\s[–—-]\s/).slice(1).join(' – ');

const CaseStudy: React.FC<{ project: any; index: number }> = ({ project: p, index }) => {
  const flipped = index % 2 === 1;
  const techs = techNames(p).slice(0, 5);
  const headline = shortTitle(p.title);
  const tagline = subTitle(p.title);

  return (
    <ScrollReveal>
      <article className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
        {/* Thumbnail */}
        <Link
          to={`/projects/${p.slug}`}
          className={`relative block lg:col-span-6 ${flipped ? 'lg:order-2' : ''}`}
          aria-label={`View the ${headline} case study`}
        >
          <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition duration-500 group-hover:shadow-lift">
            <img
              src={p.cover_image || FALLBACK_COVER}
              alt={p.title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </div>
          <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink shadow-card transition duration-300 sm:translate-y-1 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </Link>

        {/* Description */}
        <div className={`lg:col-span-6 ${flipped ? 'lg:order-1' : ''}`}>
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="text-2xl font-extrabold leading-none text-rust-gradient">{String(index + 1).padStart(2, '0')}</span>
            {p.category_name && (
              <span className="rounded-full bg-accent-soft px-3 py-1 font-semibold uppercase tracking-wider text-accent">
                {p.category_name}
              </span>
            )}
            {p.industry && <span className="text-muted">{p.industry}</span>}
          </div>

          <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-3xl">
            <Link to={`/projects/${p.slug}`} className="transition-colors hover:text-accent">
              {headline}
            </Link>
          </h2>
          {tagline && <p className="mt-1.5 text-[15px] font-medium text-muted">{tagline}</p>}

          <p className="mt-4 text-[15px] leading-relaxed text-body sm:text-base sm:leading-7">{projectSummary(p)}</p>

          {p.client_name && (
            <p className="mt-5 flex items-center gap-2 text-sm text-body">
              <Building2 className="h-4 w-4 text-accent" />
              Client: <span className="font-medium text-ink">{p.client_name}</span>
            </p>
          )}

          {techs.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {techs.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link to={`/projects/${p.slug}`} className="btn-primary !rounded-full sm:!px-6">
              View case study <ArrowRight className="h-4 w-4" />
            </Link>
            {p.live_url && (
              <a
                href={withProtocol(p.live_url)}
                target="_blank"
                rel="noreferrer"
                className="link-underline inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-accent"
              >
                Visit live site <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
};

export const ProjectsPage: React.FC = () => {
  const { data: projects = [], loading } = useApiData<any[]>('/projects');
  const [filter, setFilter] = useState('All');

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(projects.map((p) => p.category_name).filter(Boolean)))],
    [projects]
  );
  const visible = filter === 'All' ? projects : projects.filter((p) => p.category_name === filter);

  return (
    <>
      <SEO
        title="Our Projects | NilePixel Technologies"
        description="Discover NilePixel Technologies' portfolio of successful enterprise web applications, mobile apps, and AI solutions."
        url="https://nilepixel.et/projects"
      />

      <PageHeader
        eyebrow="Portfolio"
        title="Projects we're proud of"
        description="A selection of platforms, apps and systems we've designed, built and shipped."
      />

      <section className="section pt-2 sm:pt-6">
        {categories.length > 2 && (
          <div className="container-page mb-10 sm:mb-12">
            <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-200 sm:px-4 sm:py-2 sm:text-sm ${
                    filter === c ? 'border-ink bg-ink text-white' : 'border-line bg-white text-body hover:border-accent hover:text-accent'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="container-page space-y-16 sm:space-y-24">
          {loading ? (
            [1, 2].map((i) => (
              <div key={i} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
                <Skeleton className="aspect-[4/3] lg:col-span-6" />
                <div className="space-y-4 lg:col-span-6">
                  <Skeleton variant="text" width="30%" height="16px" />
                  <Skeleton variant="text" width="70%" height="32px" />
                  <Skeleton variant="text" height="14px" />
                  <Skeleton variant="text" width="85%" height="14px" />
                </div>
              </div>
            ))
          ) : visible.length > 0 ? (
            visible.map((p, i) => <CaseStudy key={p.id || p.slug} project={p} index={i} />)
          ) : (
            <p className="text-center text-sm text-muted">No projects in this category yet.</p>
          )}
        </div>
      </section>

      <CtaBanner />
      <div className="h-16 sm:h-24" />
    </>
  );
};
