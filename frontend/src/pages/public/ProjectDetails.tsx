import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Briefcase, Building, Target, Lightbulb, TrendingUp, Github } from 'lucide-react';
import { api } from '../../services/api';
import { useApiData } from '../../hooks/useApiData';
import { techNames } from '../../utils/content';

const withProtocol = (url: string) => (url.startsWith('http') ? url : `https://${url}`);

const Block: React.FC<{ icon: React.ElementType; title: string; children: React.ReactNode; highlight?: boolean }> = ({
  icon: Icon,
  title,
  children,
  highlight,
}) => (
  <div className="space-y-4">
    <h2 className="flex items-center gap-3 text-2xl font-semibold text-ink">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
        <Icon className="h-5 w-5" />
      </span>
      {title}
    </h2>
    <div className={highlight ? 'rounded-2xl border border-accent/25 bg-accent-soft/60 p-6' : ''}>
      <p className="prose-copy">{children}</p>
    </div>
  </div>
);

export const ProjectDetails: React.FC = () => {
  const { slug } = useParams();
  const { data: projects, loading: listLoading } = useApiData<any[]>('/projects');
  const [fetched, setFetched] = useState<any>(null);
  const [fetching, setFetching] = useState(false);

  // The list already carries full case-study fields, so use it when possible.
  const fromList = projects?.find((x) => x.slug === slug) ?? null;

  useEffect(() => {
    if (!slug || fromList || listLoading) return;
    setFetching(true);
    api
      .get(`/projects/${slug}`)
      .then((res) => res.success && setFetched(res.data))
      .finally(() => setFetching(false));
  }, [slug, fromList, listLoading]);

  const project = fromList ?? fetched;

  if (!project && (listLoading || fetching)) {
    return <div className="py-24 text-center text-sm text-muted">Loading case study…</div>;
  }

  const p = project || {
    title: slug?.replace(/-/g, ' '),
    category_name: 'Enterprise System',
    description: 'A custom engineered solution deployed with high performance and reliability.',
    cover_image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    tags: 'React, Node.js, SQLite, Cloud Run',
    live_url: '#',
  };

  return (
    <section className="section">
      <div className="container-page max-w-6xl space-y-12">
        <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-medium text-body hover:text-accent">
          <ArrowLeft className="h-4 w-4" /> All projects
        </Link>

        <div className="mx-auto max-w-3xl space-y-5 text-center">
          <span className="tag !border-accent/30 !bg-accent-soft uppercase tracking-wider !text-accent">
            {p.category_name || p.industry || 'Case study'}
          </span>
          <h1 className="heading-xl capitalize !text-[1.75rem] !leading-[1.2] sm:!text-5xl">{p.title}</h1>
          {p.short_description && <p className="lead">{p.short_description}</p>}
        </div>

        {p.cover_image && (
          <div className="aspect-video overflow-hidden rounded-3xl border border-line bg-surface shadow-card">
            <img src={p.cover_image} alt={p.title} className="h-full w-full object-cover" />
          </div>
        )}

        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            {(p.full_description || p.description || p.short_description) && (
              <Block icon={Target} title="Overview">{p.full_description || p.description || p.short_description}</Block>
            )}
            {p.challenge && <Block icon={Briefcase} title="The challenge">{p.challenge}</Block>}
            {p.solution && <Block icon={Lightbulb} title="The solution">{p.solution}</Block>}
            {p.result && <Block icon={TrendingUp} title="The results" highlight>{p.result}</Block>}
          </div>

          <aside>
            <div className="card sticky top-24 space-y-6 p-6">
              <h3 className="border-b border-line pb-4 text-base font-semibold text-ink">Project details</h3>

              {p.client_name && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted">Client</p>
                  <p className="mt-1 flex items-center gap-2 text-sm font-medium text-ink">
                    <Building className="h-4 w-4 text-muted" /> {p.client_name}
                  </p>
                </div>
              )}
              {p.industry && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted">Industry</p>
                  <p className="mt-1 text-sm font-medium text-ink">{p.industry}</p>
                </div>
              )}

              {techNames(p).length > 0 && (
                <div className="border-t border-line pt-5">
                  <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">Technologies</p>
                  <div className="flex flex-wrap gap-2">
                    {techNames(p).map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {(p.live_url || p.github_url) && (
                <div className="flex flex-col gap-3 border-t border-line pt-5">
                  {p.live_url && (
                    <a href={withProtocol(p.live_url)} target="_blank" rel="noreferrer" className="btn-primary">
                      Live preview <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  {p.github_url && (
                    <a href={withProtocol(p.github_url)} target="_blank" rel="noreferrer" className="btn-secondary">
                      Source code <Github className="h-4 w-4" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
