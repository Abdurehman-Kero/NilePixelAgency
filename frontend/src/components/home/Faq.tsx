import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Plus } from 'lucide-react';
import { FAQS } from '../../data/content';
import { SectionTitle } from '../ui/SectionTitle';
import { ScrollReveal } from '../ui/ScrollReveal';

export const Faq: React.FC<{ className?: string }> = ({ className = 'bg-surface' }) => (
  <section className={`section ${className}`}>
    <ScrollReveal className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-4">
        <SectionTitle
          align="left"
          eyebrow="FAQ"
          title="Questions we often hear"
          description="Can't find your answer here? Our team replies within one business day."
        />
        <Link
          to="/contact"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
        >
          Ask us directly <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="space-y-3 lg:col-span-8">
        {FAQS.map((f) => (
          <details
            key={f.q}
            className="group rounded-2xl border border-line bg-white transition-shadow open:border-accent/40 open:shadow-card"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 text-[15px] font-semibold text-ink transition-colors hover:text-accent sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
              {f.q}
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface text-ink transition duration-300 group-open:rotate-45 group-open:bg-accent group-open:text-white">
                <Plus className="h-4 w-4" />
              </span>
            </summary>
            <p className="px-5 pb-5 text-sm leading-relaxed text-body sm:px-6 sm:pb-6">{f.a}</p>
          </details>
        ))}
      </div>
    </ScrollReveal>
  </section>
);
