import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, LifeBuoy, Rocket, Users } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { ScrollReveal } from '../ui/ScrollReveal';
import { CONTACT_FORM } from '../../utils/routes';

const MODELS = [
  {
    icon: Rocket,
    name: 'Fixed-scope project',
    best: 'Best for a clearly defined product or website',
    points: ['Scope and price agreed after discovery', 'Milestone-based delivery and payments', 'Handover with documentation and training'],
  },
  {
    icon: Users,
    name: 'Dedicated team',
    best: 'Best for ongoing, evolving products',
    points: ['Engineers and a designer embedded in your roadmap', 'Flexible priorities, planned sprint by sprint', 'Scale the team up or down as needs change'],
    featured: true,
  },
  {
    icon: LifeBuoy,
    name: 'Support retainer',
    best: 'Best for live products that need care',
    points: ['Monitoring, patches and updates handled monthly', 'Bug fixes and small improvements included', 'Clear response times and a monthly report'],
  },
];

const INDUSTRIES = ['Retail & e-commerce', 'Education', 'Finance & payments', 'Logistics', 'Healthcare', 'Hospitality', 'Public sector', 'Startups'];

export const Engagement: React.FC<{ className?: string }> = ({ className = '' }) => (
  <section className={`section ${className}`}>
    <ScrollReveal className="container-page space-y-12 sm:space-y-14">
      <SectionTitle
        eyebrow="Working together"
        title="Ways to work with us"
        description="Pick the setup that fits your stage. We're happy to start small and adjust as the work evolves."
      />

      <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
        {MODELS.map(({ icon: Icon, name, best, points, featured }) => (
          <div
            key={name}
            className={`group relative flex flex-col rounded-2xl border p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-8 ${
              featured ? 'border-ink bg-night text-white' : 'border-line bg-white'
            }`}
          >
            {featured && (
              <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold text-white">Most popular</span>
            )}
            <span className={`icon-badge ${featured ? '' : 'group-hover:scale-110'}`}>
              <Icon className="h-5 w-5" />
            </span>
            <h3 className={`mt-5 text-xl font-semibold ${featured ? 'text-white' : 'text-ink'}`}>{name}</h3>
            <p className={`mt-1.5 text-sm ${featured ? 'text-white/65' : 'text-muted'}`}>{best}</p>
            <ul className="mt-6 flex-1 space-y-3">
              {points.map((p) => (
                <li key={p} className={`flex gap-3 text-sm leading-relaxed ${featured ? 'text-white/80' : 'text-body'}`}>
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={3} />
                  {p}
                </li>
              ))}
            </ul>
            <Link
              to={CONTACT_FORM}
              className={`mt-8 inline-flex items-center gap-1.5 text-sm font-semibold ${featured ? 'text-accent' : 'text-accent'} hover:underline`}
            >
              Talk about this <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        ))}
      </div>

      <div className="text-center">
        <p className="text-sm font-semibold text-ink">Industries we build for</p>
        <div className="mx-auto mt-4 flex max-w-3xl flex-wrap justify-center gap-2.5">
          {INDUSTRIES.map((i) => (
            <span
              key={i}
              className="tag cursor-default !px-4 !py-1.5 !text-sm transition-colors duration-200 hover:border-accent hover:bg-accent-soft hover:text-accent"
            >
              {i}
            </span>
          ))}
        </div>
      </div>
    </ScrollReveal>
  </section>
);
