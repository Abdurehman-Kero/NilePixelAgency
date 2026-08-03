import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';

export const ProjectsPage: React.FC = () => {
 const [projects, setProjects] = useState<any[]>([]);

 useEffect(() => {
 api.get('/projects').then((res) => {
 if (res.success && res.data?.length > 0) setProjects(res.data);
 });
 }, []);

 const defaultProjects = [
 {
 id: 1,
 title: 'Nile Ride',
 slug: 'nile-ride',
 summary: 'A complete ride-sharing platform that includes a Driver App, Customer App, Admin Dashboard, and Marketing Website...',
 cover_image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=100'
 },
 {
 id: 2,
 title: 'ICare MC',
 slug: 'icare-mc',
 summary: 'A complete maternal and child healthcare platform designed to support families from pregnancy through early childhood...',
 cover_image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=100'
 },
 {
 id: 3,
 title: 'Agency Management ERP',
 slug: 'agency-management-erp',
 summary: 'The Agency is an all-in-one platform that helps businesses manage their clients, services, and projects in one place. It...',
 cover_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=100'
 },
 {
 id: 4,
 title: 'Lend with Aloha',
 slug: 'lend-with-aloha',
 summary: 'Lend with Aloha is a major real estate lending platform. It offers various loan types like Fix and Flip, DSCR Loans, N...',
 cover_image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=100'
 },
 {
 id: 5,
 title: 'Tina Verify',
 slug: 'tina-verify',
 summary: 'Payment verification and document management platform for branches and employees.',
 cover_image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=100'
 },
 {
 id: 6,
 title: 'Zemen Service',
 slug: 'zemen-service',
 summary: 'Marketplace for booking trusted local services quickly and reliably.',
 cover_image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&w=1200&q=100'
 }
 ];

 const list = projects.length > 0 ? projects : defaultProjects;

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
 {list.map((p) => (
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
