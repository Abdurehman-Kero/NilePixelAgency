import React from 'react';
import { TECH } from '../../data/content';
import { SectionTitle } from '../ui/SectionTitle';
import { ScrollReveal } from '../ui/ScrollReveal';

export const TechStack: React.FC = () => (
  <section className="section">
    <ScrollReveal className="container-page space-y-12">
      <SectionTitle
        eyebrow="Our toolbox"
        title="Modern, proven technology"
        description="We choose tools for reliability and long-term maintainability, not novelty."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {TECH.map((g) => (
          <div key={g.group} className="card card-hover p-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-ink">{g.group}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {g.items.map((item) => (
                <span
                  key={item}
                  className="tag cursor-default transition-colors duration-200 hover:border-accent hover:bg-accent-soft hover:text-accent"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollReveal>
  </section>
);
