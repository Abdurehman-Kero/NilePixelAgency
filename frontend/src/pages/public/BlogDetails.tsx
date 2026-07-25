import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../services/api';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';

export const BlogDetails: React.FC = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      api.get(`/blog/${slug}`).then((res) => {
        if (res.success) setPost(res.data);
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) {
    return <div className="py-20 text-center text-xs text-gray-400">Loading article...</div>;
  }

  const p = post || {
    title: slug?.replace(/-/g, ' '),
    excerpt: 'Deep technical breakdown of modern software architecture.',
    content: 'Full technical article content discussing enterprise cloud patterns and high scalability.',
    cover_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    author_name: 'Yonas Tadesse',
    reading_time: '5 min read'
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto space-y-8 text-white">
      <Link to="/blog" className="inline-flex items-center gap-2 text-xs text-[#00A3FF] hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Blog
      </Link>

      <div className="space-y-4">
        <h1 className="text-3xl font-extrabold capitalize leading-tight">{p.title}</h1>
        <div className="flex items-center gap-4 text-xs text-[#A9B4C5]">
          <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-[#00A3FF]" /> {p.author_name}</span>
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#00A3FF]" /> {p.reading_time || '5 min read'}</span>
        </div>
      </div>

      {p.cover_image && (
        <div className="w-full aspect-video rounded-2xl overflow-hidden border border-[#23344F] bg-[#101C2F]">
          <img src={p.cover_image} alt={p.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="prose prose-invert max-w-none text-xs text-[#A9B4C5] leading-relaxed space-y-4 whitespace-pre-line">
        {p.content || p.excerpt}
      </div>
    </div>
  );
};
