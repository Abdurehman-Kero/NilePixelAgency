import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { Calendar, User, ArrowRight, FileText } from 'lucide-react';
import { Skeleton } from '../../components/ui/Skeleton';

export const BlogPage: React.FC = () => {
 const [posts, setPosts] = useState<any[]>([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
 setLoading(true);
 api.get('/blog').then((res) => {
 if (res.success && res.data?.length > 0) setPosts(res.data);
 }).finally(() => setLoading(false));
 }, []);

 const defaultPosts = [
 {
 id: 1,
 title: 'Building High-Concurrency Cloud Systems in 2026',
 slug: 'building-high-concurrency-cloud-systems',
 excerpt: 'Strategies for zero-downtime scaling, event-driven microservices, and cost optimization.',
 cover_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
 author_name: 'Yonas Tadesse',
 created_at: '2026-07-28'
 }
 ];

 const list = posts.length > 0 ? posts : defaultPosts;

 return (
 <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 text-white relative">
 {/* Subtle grid background */}
 <div className="absolute inset-0 bg-[linear-gradient(to_right,#00E59915_1px,transparent_1px),linear-gradient(to_bottom,#00E59915_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_50%_60%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none" />
 <div className="relative z-10 text-center max-w-3xl mx-auto space-y-4">
 <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Engineering & AI Insights</h1>
 <p className="text-sm text-[#A9B4C5] leading-relaxed">
 Technical articles, architectural deep-dives, and industry perspectives from our engineering team.
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 {loading ? (
          [1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-[#101C2F] border border-[#23344F] rounded-2xl overflow-hidden flex flex-col justify-between h-[380px]">
              <Skeleton className="h-48 w-full rounded-none" />
              <div className="p-6 space-y-3 flex-1">
                <Skeleton variant="text" width="90%" height="20px" />
                <Skeleton variant="text" width="100%" height="16px" />
                <Skeleton variant="text" width="70%" height="16px" />
              </div>
              <div className="p-6 pt-0 border-t border-[#23344F]/50 mt-auto pt-4 flex justify-between items-center">
                <Skeleton variant="text" width="80px" height="12px" />
                <Skeleton variant="text" width="60px" height="12px" />
              </div>
            </div>
          ))
        ) : posts.length > 0 ? posts.map((post) => (
 <article key={post.id || post.slug} className="bg-[#101C2F] border border-[#23344F] rounded-2xl overflow-hidden hover:border-[#0F6FFF] transition group flex flex-col justify-between">
 {post.cover_image && (
 <div className="h-48 overflow-hidden bg-[#08111F]">
 <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
 </div>
 )}
 <div className="p-6 space-y-3 flex-1">
 <h3 className="text-base font-bold text-white group-hover:text-[#00A3FF] transition">{post.title}</h3>
 <p className="text-xs text-[#A9B4C5] line-clamp-3 leading-relaxed">{post.excerpt}</p>
 </div>
 <div className="p-6 pt-0 flex items-center justify-between text-[11px] text-[#A9B4C5] border-t border-[#23344F]/50 pt-4 mt-auto">
 <span>{post.author_name || 'NilePixel Team'}</span>
 <Link to={`/blog/${post.slug}`} className="text-[#00A3FF] font-semibold flex items-center gap-1 hover:underline">
 Read Article <ArrowRight className="w-3.5 h-3.5" />
 </Link>
 </div>
 </article>
 )) : defaultPosts.map((post) => (
            <article key={post.id || post.slug} className="bg-[#101C2F] border border-[#23344F] rounded-2xl overflow-hidden hover:border-[#0F6FFF] transition group flex flex-col justify-between">
              {post.cover_image && (
                <div className="h-48 overflow-hidden bg-[#08111F]">
                  <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
              )}
              <div className="p-6 space-y-3 flex-1">
                <h3 className="text-base font-bold text-white group-hover:text-[#00A3FF] transition">{post.title}</h3>
                <p className="text-xs text-[#A9B4C5] line-clamp-3 leading-relaxed">{post.excerpt}</p>
              </div>
              <div className="p-6 pt-0 flex items-center justify-between text-[11px] text-[#A9B4C5] border-t border-[#23344F]/50 pt-4 mt-auto">
                <span>{post.author_name || 'NilePixel Team'}</span>
                <Link to={`/blog/${post.slug}`} className="text-[#00A3FF] font-semibold flex items-center gap-1 hover:underline">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
 </div>
 </div>
 );
};
