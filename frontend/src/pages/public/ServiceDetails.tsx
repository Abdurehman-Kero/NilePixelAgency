import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export const ServiceDetails: React.FC = () => {
 const { slug } = useParams();

 return (
 <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 text-white relative">
 {/* Subtle grid background */}
 <div className="absolute inset-0 bg-[linear-gradient(to_right,#00E59915_1px,transparent_1px),linear-gradient(to_bottom,#00E59915_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_50%_60%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none" />
 <Link to="/services" className="relative z-10 inline-flex items-center gap-2 text-xs text-[#00A3FF] hover:underline">
 <ArrowLeft className="w-4 h-4" /> Back to Services
 </Link>
 <h1 className="text-3xl font-extrabold capitalize">{slug?.replace(/-/g, ' ')} Solutions</h1>
 <p className="text-sm text-[#A9B4C5] leading-relaxed">
 NilePixel Technologies crafts battle-tested, highly scalable digital infrastructure tailored for enterprise workloads and high-concurrency applications.
 </p>

 <div className="bg-[#101C2F] border border-[#23344F] rounded-2xl p-6 space-y-4">
 <h3 className="text-base font-bold">Key Architectural Deliverables</h3>
 <ul className="space-y-3 text-xs text-[#A9B4C5]">
 <li className="flex items-center gap-2">
 <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
 Distributed systems architecture with high redundancy and resilience.
 </li>
 <li className="flex items-center gap-2">
 <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
 Security-first compliance audit, encryption at rest and in transit.
 </li>
 <li className="flex items-center gap-2">
 <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
 Automated CI/CD pipelines and infrastructure as code (IaC).
 </li>
 </ul>
 </div>

 <div className="pt-4">
 <Link to="/contact" className="px-4 py-2 sm:px-6 sm:py-3 rounded-xl bg-[#0F6FFF] font-bold text-xs text-white">
 Schedule Technical Consultation
 </Link>
 </div>
 </div>
 );
};
