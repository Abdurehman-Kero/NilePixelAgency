import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PILLARS } from '../../data/content';
import { WaveEdge } from '../ui/WaveEdge';
import { CONTACT_FORM } from '../../utils/routes';

// Placeholder studio photograph, self-hosted for speed.
// To use your own photo, replace public/hero.jpg (1800px wide) and public/hero-sm.jpg (900px wide).

const FACTS = [
  { value: '2023', label: 'Founded in Addis Ababa' },
  { value: '20+', label: 'Projects delivered' },
  { value: '24 h', label: 'Reply to every inquiry' },
];

export const Hero: React.FC = () => {
  const [photoReady, setPhotoReady] = useState(false);

  return (
  <section className="relative">
    <div className="relative isolate overflow-hidden bg-night">
      {/* Photograph with a directional scrim so the copy always stays readable */}
      <img
        src="/hero.jpg"
        srcSet="/hero-sm.jpg 900w, /hero.jpg 1800w"
        sizes="100vw"
        alt=""
        fetchPriority="high"
        decoding="async"
        onLoad={() => setPhotoReady(true)}
        ref={(el) => {
          if (el?.complete) setPhotoReady(true);
        }}
        className={`absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center] transition-opacity duration-700 ${
          photoReady ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div className="absolute inset-0 -z-10 bg-night/80 sm:bg-transparent sm:bg-gradient-to-r sm:from-night sm:from-30% sm:via-night/70 sm:to-night/5" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-night/70 to-transparent" />

      <div className="container-page pb-40 pt-16 sm:pb-52 sm:pt-28 lg:pb-60 lg:pt-36">
        <div className="max-w-2xl">
          <p className="rise text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Software studio · Addis Ababa
          </p>

          <h1
            className="rise mt-5 text-[2.3rem] font-semibold leading-[1.12] tracking-[-0.02em] text-white sm:text-[3.4rem] lg:text-[3.9rem]"
            style={{ ['--d' as string]: '80ms' }}
          >
            Custom software for businesses that mean to grow.
          </h1>

          <p
            className="rise mt-6 max-w-xl text-base leading-[1.75] text-white/80 sm:text-lg"
            style={{ ['--d' as string]: '160ms' }}
          >
            We are a small team of engineers and designers. We build web platforms, mobile apps and Telegram tools, and
            we stay on to keep them running after launch.
          </p>

          <div
            className="rise mt-7 flex flex-wrap items-center gap-3 sm:mt-9"
            style={{ ['--d' as string]: '240ms' }}
          >
            <Link to={CONTACT_FORM} className="btn-primary !rounded-full sm:!px-8 sm:!py-3.5">
              Start a project <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/projects"
              className="btn !rounded-full border border-white/40 text-white hover:border-white hover:bg-white hover:text-ink sm:!px-8 sm:!py-3.5"
            >
              View our work
            </Link>
          </div>
        </div>

        <dl
          className="rise mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-white/20 pt-6 sm:mt-20"
          style={{ ['--d' as string]: '320ms' }}
        >
          {FACTS.map((f) => (
            <div key={f.label}>
              <dt className="text-2xl font-semibold text-white sm:text-3xl">{f.value}</dt>
              <dd className="mt-1 text-[11px] leading-snug text-white/65 sm:text-xs">{f.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <WaveEdge className="h-14 sm:h-24" />
    </div>

    {/* Discover / Build / Scale: overlapping three-column card */}
    <div className="container-page relative z-20 -mt-14 sm:-mt-20">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl bg-white shadow-lift ring-1 ring-line">
        <div className="grid divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
          {PILLARS.map((p) => (
            <div key={p.title} className="group px-6 py-8 text-center transition-colors hover:bg-surface sm:px-8 sm:py-10">
              <p className="text-5xl font-extrabold leading-none text-rust-gradient transition-transform duration-300 group-hover:scale-110 sm:text-6xl">
                {p.n}
              </p>
              <h3 className="mt-4 text-2xl font-extrabold uppercase tracking-tight text-ink sm:mt-5 sm:text-3xl">{p.title}</h3>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-body sm:text-[15px]">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
  );
};
