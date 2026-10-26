import React from 'react';
import { PROCESS } from '../../data/content';
import { SectionTitle } from '../ui/SectionTitle';
import { ScrollReveal } from '../ui/ScrollReveal';

export const Process: React.FC<{ className?: string }> = ({ className = 'bg-surface' }) => (
  <section className={`section ${className}`}>
    <ScrollReveal className="container-page space-y-12 sm:space-y-16">
      <SectionTitle
        eyebrow="How we deliver"
        title="A clear process from idea to launch"
        description="Four stages, with a checkpoint at the end of each, so you are never guessing what happens next."
      />

      {/* Mobile: vertical timeline. Desktop: four columns joined by a line. */}
      <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
        <span aria-hidden className="absolute bottom-6 left-[21px] top-6 w-px bg-line md:hidden" />
        <span aria-hidden className="absolute left-[12.5%] right-[12.5%] top-[21px] hidden h-px bg-line md:block" />

        {PROCESS.map(({ icon: Icon, title, body }, i) => (
          <li key={title} className="group relative flex gap-5 md:flex-col md:items-center md:gap-0 md:text-center">
            <span className="icon-badge relative z-10 ring-8 ring-surface group-hover:scale-110 group-hover:bg-ink">
              <Icon className="h-5 w-5" />
            </span>
            <div className="md:mt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Step {i + 1}</p>
              <h3 className="mt-1 text-lg font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{body}</p>
            </div>
          </li>
        ))}
      </ol>
    </ScrollReveal>
  </section>
);
