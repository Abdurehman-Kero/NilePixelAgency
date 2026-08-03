import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { Skeleton } from '../../components/ui/Skeleton';

export const ProjectsPage: React.FC = () => {
 const [projects, setProjects] = useState<any[]>([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
 setLoading(true);
 api.get('/projects').then((res) => {
 if (res.success && res.data?.length > 0) setProjects(res.data);
 }).finally(() => setLoading(false));
 }, []);



 return (
 <div className="py-24 px-4 sm:px-6 lg:px-8 min-h-screen bg-[#04080F] relative text-white">
 {/* Subtle grid background */}
 <div className="absolute inset-0 bg-[linear-gradient(to_right,#00E59915_1px,transparent_1px),linear-gradient(to_bottom,#00E59915_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_50%_60%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none" />
 
 <div className="max-w-7xl mx-auto space-y-16 relative z-10">
 <div className="text-center max-w-3xl mx-auto space-y-4">
 <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Popular Projects</h1>
 <p className="text-sm sm:text-[15px] text-[#A9B4C5] font-medium">
 Empowering Innovation through unparalleled software development expertise
 </p>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
 {loading ? (
          [1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-[4/3]" />
              <div className="px-1 space-y-1.5 mt-2">
                <Skeleton variant="text" width="60%" height="20px" />
                <Skeleton variant="text" width="100%" height="16px" />
                <Skeleton variant="text" width="80%" height="16px" />
              </div>
            </div>
          ))
        ) : projects.map((p) => (
 <Link to={`/projects/${p.slug}`} key={p.id || p.slug} className="group space-y-4 cursor-pointer block">
 <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#0A1220] border border-[#1B2B44]/30 shadow-lg relative">
 <img 
 src={p.cover_image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=100'} 
 alt={p.title} 
 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
 />
 <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
 <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 backdrop-blur rounded-full text-white font-semibold text-sm">View Details</span>
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
 </div>
 );
};
