import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../services/api';
import { ArrowLeft, ExternalLink, Briefcase, Building, Target, Lightbulb, TrendingUp, Github } from 'lucide-react';

export const ProjectDetails: React.FC = () => {
 const { slug } = useParams();
 const [project, setProject] = useState<any>(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
 if (slug) {
 api.get(`/projects/${slug}`).then((res) => {
 if (res.success) setProject(res.data);
 setLoading(false);
 });
 }
 }, [slug]);

 if (loading) {
 return <div className="py-20 text-center text-xs text-gray-400">Loading case study details...</div>;
 }

 const p = project || {
 title: slug?.replace(/-/g, ' '),
 category_name: 'Enterprise System',
 description: 'A custom engineered solution deployed with high performance and reliability.',
 cover_image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
 tags: 'React, Node.js, SQLite, Cloud Run',
 live_url: '#'
 };

 return (
 <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12 text-white relative">
 {/* Subtle grid background */}
 <div className="absolute inset-0 bg-[linear-gradient(to_right,#00E59915_1px,transparent_1px),linear-gradient(to_bottom,#00E59915_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_50%_60%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none" />
 
 <Link to="/projects" className="relative z-10 inline-flex items-center gap-2 text-sm font-semibold text-[#00E599] hover:underline transition-all">
 <ArrowLeft className="w-4 h-4" /> Back to Projects
 </Link>

 <div className="space-y-4 text-center max-w-3xl mx-auto">
 <span className="text-xs sm:text-sm font-mono text-[#00E599] bg-[#00E599]/10 px-3 py-1 rounded-full uppercase tracking-wider">
 {p.category_name || p.industry || 'Case Study'}
 </span>
 <h1 className="text-4xl sm:text-5xl font-extrabold capitalize leading-tight">{p.title}</h1>
 {p.short_description && (
 <p className="text-[#A9B4C5] text-base sm:text-lg">{p.short_description}</p>
 )}
 </div>

 {p.cover_image && (
 <div className="w-full aspect-[21/9] rounded-3xl overflow-hidden border border-[#1B2B44]/50 shadow-2xl relative">
 <img src={p.cover_image} alt={p.title} className="w-full h-full object-cover" />
 <div className="absolute inset-0 bg-gradient-to-t from-[#04080F] via-transparent to-transparent opacity-80" />
 </div>
 )}

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
 
 {/* Main Content Area */}
 <div className="lg:col-span-2 space-y-8">
 
 {(p.full_description || p.description) && (
 <div className="space-y-4">
 <h2 className="text-2xl font-bold flex items-center gap-2"><Target className="w-6 h-6 text-[#00E599]" /> Overview</h2>
 <p className="text-[#A9B4C5] leading-relaxed whitespace-pre-line text-[15px]">
 {p.full_description || p.description}
 </p>
 </div>
 )}

 {p.challenge && (
 <div className="space-y-4">
 <h2 className="text-2xl font-bold flex items-center gap-2"><Briefcase className="w-6 h-6 text-red-400" /> The Challenge</h2>
 <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
 <p className="text-[#A9B4C5] leading-relaxed whitespace-pre-line text-[15px]">
 {p.challenge}
 </p>
 </div>
 </div>
 )}

 {p.solution && (
 <div className="space-y-4">
 <h2 className="text-2xl font-bold flex items-center gap-2"><Lightbulb className="w-6 h-6 text-yellow-400" /> The Solution</h2>
 <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-6">
 <p className="text-[#A9B4C5] leading-relaxed whitespace-pre-line text-[15px]">
 {p.solution}
 </p>
 </div>
 </div>
 )}

 {p.result && (
 <div className="space-y-4">
 <h2 className="text-2xl font-bold flex items-center gap-2"><TrendingUp className="w-6 h-6 text-[#00E599]" /> The Results</h2>
 <div className="bg-[#00E599]/5 border border-[#00E599]/20 rounded-2xl p-6">
 <p className="text-[#A9B4C5] leading-relaxed whitespace-pre-line text-[15px]">
 {p.result}
 </p>
 </div>
 </div>
 )}
 </div>

 {/* Sidebar Info */}
 <div className="space-y-6">
 <div className="bg-[#0A1220] border border-[#1B2B44]/50 rounded-2xl p-6 space-y-6 sticky top-24">
 <h3 className="text-lg font-bold border-b border-[#1B2B44]/50 pb-4">Project Details</h3>
 
 <div className="space-y-4">
 {p.client_name && (
 <div>
 <div className="text-xs text-[#94A3B8] font-bold uppercase tracking-wider mb-1">Client</div>
 <div className="text-sm font-medium flex items-center gap-2"><Building className="w-4 h-4 text-[#A9B4C5]" /> {p.client_name}</div>
 </div>
 )}
 {p.industry && (
 <div>
 <div className="text-xs text-[#94A3B8] font-bold uppercase tracking-wider mb-1">Industry</div>
 <div className="text-sm font-medium">{p.industry}</div>
 </div>
 )}
 </div>

 {p.tags && (
 <div className="pt-4 border-t border-[#1B2B44]/50">
 <div className="text-xs text-[#94A3B8] font-bold uppercase tracking-wider mb-3">Technologies</div>
 <div className="flex flex-wrap gap-2">
 {p.tags.split(',').map((t: string, i: number) => (
 <span key={i} className="px-3 py-1 rounded-full bg-[#1B2B44]/40 text-[#00E599] text-[11px] font-semibold border border-[#00E599]/20">
 {t.trim()}
 </span>
 ))}
 </div>
 </div>
 )}

 {(p.live_url || p.github_url) && (
 <div className="pt-6 flex flex-col gap-3 border-t border-[#1B2B44]/50">
 {p.live_url && (
 <a 
 href={p.live_url.startsWith('http') ? p.live_url : `https://${p.live_url}`}
 target="_blank" 
 rel="noreferrer" 
 className="w-full flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-[#00E599] text-[#04080F] hover:bg-[#00E599]/90 font-bold rounded-xl transition-transform hover:scale-[1.02]"
 >
 Live Preview <ExternalLink className="w-4 h-4" />
 </a>
 )}
 {p.github_url && (
 <a 
 href={p.github_url.startsWith('http') ? p.github_url : `https://${p.github_url}`}
 target="_blank" 
 rel="noreferrer" 
 className="w-full flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-[#1B2B44] text-white hover:bg-[#23344F] font-bold rounded-xl transition-transform hover:scale-[1.02] border border-[#23344F]"
 >
 Source Code <Github className="w-4 h-4" />
 </a>
 )}
 </div>
 )}
 </div>
 </div>

 </div>
 </div>
 );
};
