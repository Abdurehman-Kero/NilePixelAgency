import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, Calendar } from 'lucide-react';
import { api } from '../../services/api';
import { POSTS, coverFor, type Post } from '../../data/posts';
import { useApiData } from '../../hooks/useApiData';
import { markdownToBlocks } from '../../utils/content';
import { SEO } from '../../components/ui/SEO';
import { CONTACT_FORM } from '../../utils/routes';

const formatDate = (d?: string) =>
  d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

const Body: React.FC<{ post: Post }> = ({ post }) => {
  if (post.body.length === 0) return <div className="prose-copy">{post.excerpt}</div>;

  return (
    <div className="space-y-6">
      {post.body.map((b, i) => {
        switch (b.type) {
          case 'h2':
            return (
              <h2 key={i} className="pt-4 text-2xl font-semibold tracking-tight text-ink sm:text-[1.7rem]">
                {b.text}
              </h2>
            );
          case 'ul':
            return (
              <ul key={i} className="space-y-3 pl-1">
                {b.items.map((it) => (
                  <li key={it} className="flex gap-3 text-[16px] leading-7 text-body">
                    <span className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {it}
                  </li>
                ))}
              </ul>
            );
          case 'quote':
            return (
              <blockquote key={i} className="my-2 border-l-[3px] border-accent bg-surface py-5 pl-6 pr-5 text-xl font-medium leading-snug text-ink">
                {b.text}
              </blockquote>
            );
          default:
            return (
              <p key={i} className="text-[16px] leading-8 text-body">
                {b.text}
              </p>
            );
        }
      })}
    </div>
  );
};

export const BlogDetails: React.FC = () => {
  const { slug } = useParams();
  const { data: cms, loading: listLoading } = useApiData<any[]>('/blog');
  const [fetched, setFetched] = useState<Post | null>(null);

  const local = POSTS.find((p) => p.slug === slug) || null;
  const remote = cms?.find((p) => p.slug === slug);

  // CMS list responses already include the article body, so no extra request is normally needed.
  const post: Post | null = useMemo(() => {
    if (remote) {
      return {
        slug: remote.slug,
        title: remote.title,
        excerpt: remote.excerpt || '',
        category: remote.category_name || remote.category || 'Insights',
        cover_image: coverFor(remote.category_name || remote.category, remote.cover_image),
        author_name: remote.author_name || 'NilePixel Team',
        created_at: remote.published_at || remote.created_at || '',
        reading_time: remote.reading_time || '5 min read',
        body: markdownToBlocks(remote.content || ''),
      };
    }
    return local ?? fetched;
  }, [remote, local, fetched]);

  useEffect(() => {
    if (!slug || remote || local || listLoading) return;
    api.get(`/blog/${slug}`).then((res) => {
      if (res.success && res.data) {
        const d = res.data;
        setFetched({
          slug: d.slug,
          title: d.title,
          excerpt: d.excerpt || '',
          category: d.category_name || 'Insights',
          cover_image: coverFor(d.category_name, d.cover_image),
          author_name: d.author_name || 'NilePixel Team',
          created_at: d.published_at || d.created_at || '',
          reading_time: d.reading_time || '5 min read',
          body: markdownToBlocks(d.content || ''),
        });
      }
    });
  }, [slug, remote, local, listLoading]);

  const loading = !post && listLoading;

  if (loading) return <div className="py-24 text-center text-sm text-muted">Loading article…</div>;

  if (!post) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="heading-lg">Article not found</h1>
        <Link to="/blog" className="btn-primary mt-8 !rounded-full">Back to the blog</Link>
      </div>
    );
  }

  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <SEO title={`${post.title} | NilePixel Technologies`} description={post.excerpt} url={`https://nilepixel.et/blog/${post.slug}`} />

      <article className="section pt-10 sm:pt-16">
        <div className="container-page max-w-3xl">
          <Link to="/blog" className="group inline-flex items-center gap-2 text-sm font-medium text-body transition-colors hover:text-accent">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> All articles
          </Link>

          <header className="mt-8 space-y-5">
            <span className="inline-block rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">{post.category}</span>
            <h1 className="text-[2rem] font-semibold leading-[1.15] tracking-tight text-ink sm:text-5xl">{post.title}</h1>
            {post.excerpt && <p className="text-lg leading-relaxed text-body">{post.excerpt}</p>}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-line py-4 text-sm text-muted">
              <span className="font-medium text-ink">{post.author_name}</span>
              {post.created_at && (
                <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {formatDate(post.created_at)}</span>
              )}
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {post.reading_time}</span>
            </div>
          </header>

          {post.cover_image && (
            <div className="mt-8 aspect-video overflow-hidden rounded-2xl border border-line bg-surface">
              <img src={post.cover_image} alt="" className="h-full w-full object-cover" />
            </div>
          )}

          <div className="mt-10">
            <Body post={post} />
          </div>

          <div className="mt-14 rounded-2xl bg-night p-7 text-white sm:p-9">
            <p className="text-xl font-semibold leading-snug">Thinking about something similar?</p>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              Tell us what you are working on. We reply to every message within a day, with honest advice, not a sales script.
            </p>
            <Link to={CONTACT_FORM} className="btn-primary mt-6 !rounded-full">
              Talk to us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {related.length > 0 && (
          <div className="container-page mt-20 max-w-5xl">
            <h2 className="text-xl font-semibold text-ink">Keep reading</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {related.map((r) => (
                <Link key={r.slug} to={`/blog/${r.slug}`} className="card card-hover group p-6">
                  <span className="text-xs font-semibold text-accent">{r.category}</span>
                  <h3 className="mt-2 text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-accent">{r.title}</h3>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                    Read <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  );
};
