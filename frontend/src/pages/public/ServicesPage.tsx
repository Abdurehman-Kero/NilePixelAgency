import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { ArrowRight, Wrench, Shield, Cpu, Code2, Cloud, Sparkles } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    api.get('/services').then((res) => {
      if (res.success && res.data?.length > 0) {
        setServices(res.data);
      }
    });
  }, []);

  const defaultServices = [
    {
      id: 1,
      title: 'Custom Enterprise Software',
      slug: 'custom-software',
      short_description: 'Architecting high-concurrency microservices, core platforms, and enterprise data backbones.',
      icon: 'Code2',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'Artificial Intelligence & Automation',
      slug: 'ai-solutions',
      short_description: 'Custom LLM integration, predictive machine learning pipelines, and intelligent agent workflows.',
      icon: 'Sparkles',
      image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: 'Cloud Engineering & DevOps',
      slug: 'cloud-engineering',
      short_description: 'Multi-cloud infrastructure, Kubernetes orchestration, zero-downtime CI/CD pipelines, and FinOps.',
      icon: 'Cloud',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      title: 'Telegram Bots & Mini Apps',
      slug: 'telegram-bots',
      short_description: 'Helping Businesses Build Telegram Bots, Mini Apps & Automation Systems.',
      icon: 'MessageCircle',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const list = services.length > 0 ? services : defaultServices;

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 text-white">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Enterprise Engineering Capabilities</h1>
        <p className="text-sm text-[#A9B4C5] leading-relaxed">
          Full-stack software engineering, AI systems integration, and cloud infrastructure tailored for ambitious organizations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {list.map((s) => (
          <div key={s.id || s.slug} className="bg-[#101C2F] border border-[#23344F] rounded-2xl overflow-hidden hover:border-[#0F6FFF] transition group flex flex-col justify-between">
            {s.image && (
              <div className="h-48 overflow-hidden bg-[#08111F]">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
            )}
            <div className="p-6 space-y-3 flex-1">
              <h3 className="text-lg font-bold text-white">{s.title}</h3>
              <p className="text-xs text-[#A9B4C5] leading-relaxed">{s.short_description || s.description}</p>
            </div>
            <div className="p-6 pt-0">
              <Link to={`/services/${s.slug}`} className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00A3FF] hover:underline">
                Explore Solutions <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
