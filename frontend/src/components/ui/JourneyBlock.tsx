import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface JourneyBlockProps {
  /** Rust heading, rendered with a trailing colon */
  title: string;
  subtitle: string;
  intro: string;
  items: { icon: LucideIcon; title: string; body: string }[];
  /** Icons for the illustration panel: [centre, orbit-a, orbit-b] */
  art: [LucideIcon, LucideIcon, LucideIcon];
  reverse?: boolean;
}

/** Content block with an illustration panel, modelled on the reference's story sections. */
export const JourneyBlock: React.FC<JourneyBlockProps> = ({ title, subtitle, intro, items, art, reverse }) => {
  const [Main, OrbitA, OrbitB] = art;

  return (
    <ScrollReveal className="container-page grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-2 lg:gap-16">
      {/* Illustration */}
      <div className={reverse ? 'lg:order-2' : ''} aria-hidden>
        <div className="relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center rounded-[2rem] bg-gradient-to-br from-accent-soft via-white to-surface sm:max-w-md">
          <span className="absolute inset-6 rounded-full border border-dashed border-accent/30" />
          <span className="absolute inset-16 rounded-full border border-line" />
          <span className="relative flex h-28 w-28 items-center justify-center rounded-3xl bg-accent text-white shadow-lift sm:h-32 sm:w-32">
            <Main className="h-12 w-12 sm:h-14 sm:w-14" strokeWidth={1.5} />
          </span>
          <span className="absolute left-[10%] top-[18%] flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-ink shadow-card">
            <OrbitA className="h-6 w-6" strokeWidth={1.5} />
          </span>
          <span className="absolute bottom-[16%] right-[10%] flex h-16 w-16 items-center justify-center rounded-2xl bg-night text-accent shadow-lift">
            <OrbitB className="h-7 w-7" strokeWidth={1.5} />
          </span>
        </div>
      </div>

      {/* Copy */}
      <div>
        <h2 className="text-4xl font-semibold leading-tight tracking-tight text-rust sm:text-5xl">{title}:</h2>
        <p className="mt-4 text-[15px] font-semibold text-ink">{subtitle}</p>
        <p className="mt-2 text-[15px] leading-7 text-body">{intro}</p>

        <ul className="mt-6 space-y-3">
          {items.map(({ icon: Icon, title: t, body }) => (
            <li
              key={t}
              className="group flex gap-4 rounded-xl border border-line bg-white p-4 transition duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-card sm:p-5"
            >
              <Icon className="mt-0.5 h-7 w-7 shrink-0 text-accent transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
              <div>
                <h3 className="text-[15px] font-semibold text-ink">{t}</h3>
                <p className="mt-1 text-sm leading-relaxed text-body">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </ScrollReveal>
  );
};
