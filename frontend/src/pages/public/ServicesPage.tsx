import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { ArrowRight, Wrench, Shield, Cpu, Code2, Cloud, Sparkles } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const BACKEND_URL = 'https://nilepixel-backend.onrender.com';
  
  const list = [
    // ROW 1: 2 Cards
    {
      id: 2,
      title: 'Cross-Platform Mobile Engineering',
      slug: 'mobile-app-development',
      short_description: 'Native-quality iOS and Android mobile applications crafted using React Native and Flutter with real-time sync.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80',
      span: 'md:col-span-3 min-h-[200px]',
    },
    {
      id: 1,
      title: 'Enterprise Web Application Engineering',
      slug: 'enterprise-web-development',
      short_description: 'Custom, high-throughput web systems built with React, TypeScript, Node.js, and resilient databases.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
      span: 'md:col-span-3 min-h-[200px]',
    },
    // ROW 2: 3 Cards
    {
      id: 6,
      title: 'Content Management Systems',
      slug: 'content-management-systems',
      short_description: 'Powerful and flexible content management systems designed to give you full control over your website\'s content.',
      image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1000&q=80',
      span: 'md:col-span-2 min-h-[200px]',
    },
    {
      id: 7,
      title: 'Consultancy Services',
      slug: 'consultancy-services',
      short_description: 'Expert advice and strategic guidance to help you navigate the complexities of digital transformation.',
      image: 'https://i.imgur.com/SqzLNSQ.png',
      span: 'md:col-span-2 min-h-[200px]',
    },
    {
      id: 5,
      title: 'Telegram Bots & Mini Apps',
      slug: 'telegram-bots-mini-apps',
      short_description: 'We gave Telegram Bots & Mini Apps services',
      image: 'https://i.imgur.com/uAHNFV2.png',
      span: 'md:col-span-2 min-h-[200px]',
    },
    // ROW 3: 2 Cards
    {
      id: 8,
      title: 'E-Commerce Solutions',
      slug: 'ecommerce-solutions',
      short_description: 'Custom e-commerce platforms designed to deliver a seamless shopping experience, driving business growth.',
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1000&q=80',
      span: 'md:col-span-3 min-h-[200px]',
    },
    {
      id: 9,
      title: 'Maintenance & Support',
      slug: 'maintenance-support',
      short_description: 'Reliable and proactive maintenance to keep your systems running securely and smoothly.',
      image: 'https://i.imgur.com/9LVjrM7.png',
      span: 'md:col-span-3 min-h-[200px]',
    },
    // ROW 4: 2 Cards
    {
      id: 4,
      title: 'Artificial Intelligence & GenAI Solutions',
      slug: 'ai-genai-solutions',
      short_description: 'Custom LLM integrations, automated intelligent workflows, semantic search engines, and predictive analytics.',
      image: 'https://i.imgur.com/3UBIFjj.png',
      span: 'md:col-span-3 min-h-[200px]',
    },
    {
      id: 3,
      title: 'Cloud Infrastructure & DevOps Automation',
      slug: 'cloud-devops-infrastructure',
      short_description: 'Automated CI/CD pipelines, Docker container orchestration, Kubernetes clusters, and AWS cloud architectures.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80',
      span: 'md:col-span-3 min-h-[200px]',
    }
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 text-white relative">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00E59915_1px,transparent_1px),linear-gradient(to_bottom,#00E59915_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_50%_60%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none" />
      <div className="relative z-10 text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Enterprise Engineering Capabilities</h1>
        <p className="text-sm text-[#A9B4C5] leading-relaxed">
          Full-stack software engineering, AI systems integration, and cloud infrastructure tailored for ambitious organizations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6 auto-rows-[minmax(0,1fr)] relative z-10">
        {list.map((s) => (
          <div key={s.id || s.slug} className={`group relative rounded-3xl overflow-hidden bg-[#00E599]/5 border border-[#00E599]/20 flex flex-col text-left shadow-lg hover:shadow-[0_0_30px_rgba(0,229,153,0.15)] hover:border-[#00E599]/50 transition-all duration-300 ${s.span}`}>
            {/* Background Image */}
            <div className="relative w-full h-40 sm:h-48 overflow-hidden flex-shrink-0 border-b border-[#00E599]/20">
              {s.image && (
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              )}
            </div>
            
            {/* Content block aligned below */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4">{s.title}</h3>
              
              <Link to={`/services/${s.slug}`} className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00E599] hover:underline mt-auto">
                Explore Solutions <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
