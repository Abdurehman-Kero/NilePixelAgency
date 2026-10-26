import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, Search, Send } from 'lucide-react';
import { useApiData } from '../../hooks/useApiData';
import { POSTS, coverFor, type Post } from '../../data/posts';
import { Skeleton } from '../../components/ui/Skeleton';
import { SEO } from '../../components/ui/SEO';
import { PageHeader } from '../../components/ui/PageHeader';
import { CtaBanner } from '../../components/home/CtaBanner';
import { CONTACT_FORM } from '../../utils/routes';

const formatDate = (d?: string) =>
  d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '';

/** Posts from the CMS take precedence; our editorial posts fill in around them. */
const normalise = (p: any): Post => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt || '',
  category: p.category_name || p.category || 'Insights',
  cover_image: coverFor(p.category_name || p.category, p.cover_image),
  author_name: p.author_name || 'NilePixel Team',
  created_at: p.published_at || p.created_at || '',
  reading_time: p.reading_time || '5 min read',
  body: [],
});

const PostRow: React.FC<{ post: Post }> = ({ post }) => (
  <article className="group border-b border-line py-8 first:pt-0 last:border-b-0 sm:py-10">
    <Link to={`/blog/${post.slug}`} className="grid gap-5 sm:grid-cols-5 sm:gap-8">
      <div className="aspect-[16/10] overflow-hidden rounded-xl border border-line bg-surface sm:col-span-2 sm:aspect-[4/3]">
        <img
          src={post.cover_image}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col sm:col-span-3">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted">
          <span className="rounded-full bg-accent-soft px-2.5 py-1 font-semibold text-accent">{post.category}</span>
          {post.created_at && (
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" /> {formatDate(post.created_at)}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" /> {post.reading_time}
          </span>
        </div>

        <h2 className="mt-3 text-xl font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-accent sm:text-2xl">
          {post.title}
        </h2>
        <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-body">{post.excerpt}</p>

        <div className="mt-5 flex items-center justify-between gap-4 sm:mt-auto sm:pt-5">
          <span className="text-[13px] text-muted">
            By <span className="font-medium text-ink">{post.author_name}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
            Read article
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  </article>
);

const RowSkeleton: React.FC = () => (
  <div className="grid gap-5 border-b border-line py-8 sm:grid-cols-5 sm:gap-8">
    <Skeleton className="aspect-[4/3] sm:col-span-2" />
    <div className="space-y-3 sm:col-span-3">
      <Skeleton variant="text" width="40%" height="14px" />
      <Skeleton variant="text" width="85%" height="24px" />
      <Skeleton variant="text" height="14px" />
      <Skeleton variant="text" width="70%" height="14px" />
    </div>
  </div>
);

export const BlogPage: React.FC = () => {
  const { data: cms = [], loading } = useApiData<any[]>('/blog');
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');

  const remote = useMemo(() => cms.map(normalise), [cms]);

  const all = useMemo(() => {
    const slugs = new Set(remote.map((p) => p.slug));
    return [...remote, ...POSTS.filter((p) => !slugs.has(p.slug))].sort((a, b) =>
      (b.created_at || '').localeCompare(a.created_at || '')
    );
  }, [remote]);

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    all.forEach((p) => map.set(p.category, (map.get(p.category) || 0) + 1));
    return map;
  }, [all]);
  const categories = ['All', ...Array.from(counts.keys())];

  const q = query.trim().toLowerCase();
  const visible = all.filter(
    (p) => (category === 'All' || p.category === category) && (!q || `${p.title} ${p.excerpt}`.toLowerCase().includes(q))
  );

  return (
    <>
      <SEO
        title="Tech Insights & Blog | NilePixel Technologies"
        description="Read the latest tech insights, software development trends, and engineering stories from the NilePixel Technologies team."
        url="https://nilepixel.et/blog"
      />

      <PageHeader
        eyebrow="Blog"
        title="Notes from the studio"
        description="What we're learning while building software in Addis Ababa: process, engineering, and the occasional mistake."
      />

      <section className="section pt-2 sm:pt-6">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Article list */}
          <div className="min-w-0 lg:col-span-8">
            {/* Mobile / tablet filters (the sidebar takes over on large screens) */}
            <div className="mb-8 space-y-4 lg:hidden">
              <label className="relative block">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search articles"
                  className="field !pl-11"
                />
              </label>
              <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors sm:px-4 sm:py-2 sm:text-sm ${
                      category === c ? 'border-ink bg-ink text-white' : 'border-line bg-white text-body hover:border-accent hover:text-accent'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {loading && all.length === 0 ? (
              [1, 2, 3].map((i) => <RowSkeleton key={i} />)
            ) : visible.length > 0 ? (
              visible.map((post) => <PostRow key={post.slug} post={post} />)
            ) : (
              <div className="card p-10 text-center">
                <p className="text-lg font-semibold text-ink">No articles found</p>
                <p className="mt-2 text-sm text-body">Try a different search or category.</p>
                <button
                  onClick={() => {
                    setQuery('');
                    setCategory('All');
                  }}
                  className="btn-secondary mt-5 !rounded-full"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-28 space-y-8">
              <label className="relative block">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search articles"
                  className="field !pl-11"
                />
              </label>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink">Categories</h3>
                <ul className="mt-4 divide-y divide-line border-y border-line">
                  {categories.map((c) => (
                    <li key={c}>
                      <button
                        onClick={() => setCategory(c)}
                        className={`flex w-full items-center justify-between py-3 text-left text-[15px] transition-colors hover:text-accent ${
                          category === c ? 'font-semibold text-accent' : 'text-body'
                        }`}
                      >
                        {c}
                        <span className="rounded-full bg-surface px-2.5 py-0.5 text-xs text-muted">
                          {c === 'All' ? all.length : counts.get(c)}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-night p-6 text-white">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
                  <Send className="h-4 w-4" />
                </span>
                <p className="mt-4 text-lg font-semibold leading-snug">New articles on Telegram</p>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Join our channel to get every new post and engineering note as soon as it is published.
                </p>
                <a
                  href="https://t.me/NilePixelTech"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary mt-5 w-full !rounded-full"
                >
                  Join the channel
                </a>
              </div>

              <div className="rounded-2xl border border-line p-6">
                <p className="text-lg font-semibold text-ink">Have a project in mind?</p>
                <p className="mt-2 text-sm leading-relaxed text-body">Tell us what you're building and we'll reply within a day.</p>
                <Link to={CONTACT_FORM} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">
                  Start a project <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <CtaBanner />
      <div className="h-16 sm:h-24" />
    </>
  );
};
