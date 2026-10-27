import React from 'react';
import { CountUp } from '../ui/CountUp';
import { ScrollReveal } from '../ui/ScrollReveal';
import { WaveEdge } from '../ui/WaveEdge';
import { WHY, type WhyVisual } from '../../data/content';

const STATS = [
  { end: 20, suffix: '+', label: 'Projects delivered' },
  { end: 15, suffix: '+', label: 'Happy clients' },
  { end: 3, suffix: '+', label: 'Years of experience' },
];

/** Small CSS-only illustrations shown inside the cards, in place of screenshots. */
const Visual: React.FC<{ type: WhyVisual }> = ({ type }) => {
  const frame = 'mx-auto mt-6 h-44 w-full max-w-[17rem] overflow-hidden rounded-2xl border border-line bg-white p-4 shadow-card';

  if (type === 'dashboard') {
    const bars = [38, 56, 44, 72, 60, 88];
    return (
      <div className={frame} aria-hidden>
        <div className="flex gap-2">
          <div className="flex-1 rounded-lg bg-accent-soft p-2">
            <div className="h-1.5 w-8 rounded bg-accent/50" />
            <div className="mt-2 h-3 w-12 rounded bg-accent" />
          </div>
          <div className="flex-1 rounded-lg bg-surface p-2">
            <div className="h-1.5 w-8 rounded bg-line" />
            <div className="mt-2 h-3 w-10 rounded bg-ink/70" />
          </div>
        </div>
        <div className="mt-3 flex h-[4.5rem] items-end gap-1.5">
          {bars.map((h, i) => (
            <div
              key={i}
              className={`flex-1 rounded-t ${i === bars.length - 1 ? 'bg-accent' : 'bg-line'} transition-all duration-500 group-hover:bg-accent/60 group-hover:last:bg-accent`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (type === 'pipeline') {
    const rows = ['Build', 'Test', 'Security scan', 'Deploy'];
    return (
      <div className={`${frame} space-y-2.5`} aria-hidden>
        {rows.map((r, i) => (
          <div key={r} className="flex items-center gap-3">
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white ${
                i < 3 ? 'bg-accent' : 'bg-line'
              }`}
            >
              {i < 3 ? '✓' : ''}
            </span>
            <span className="text-xs font-medium text-ink">{r}</span>
            <span className={`ml-auto h-1.5 rounded ${i < 3 ? 'w-10 bg-accent/30' : 'w-6 animate-pulse bg-line'}`} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`${frame} flex flex-col justify-end gap-2.5`} aria-hidden>
      <div className="max-w-[78%] rounded-2xl rounded-bl-sm bg-surface px-3 py-2 text-[11px] leading-snug text-ink">
        Staging is updated. Want to review the new checkout?
      </div>
      <div className="ml-auto max-w-[70%] rounded-2xl rounded-br-sm bg-accent px-3 py-2 text-[11px] leading-snug text-white">
        Looks great, ship it!
      </div>
      <div className="flex items-center gap-2 rounded-full border border-line px-3 py-1.5">
        <span className="h-1.5 flex-1 rounded bg-line" />
        <span className="h-4 w-4 rounded-full bg-accent" />
      </div>
    </div>
  );
};

export const WhySection: React.FC = () => (
  <>
    <section className="hero-texture relative overflow-hidden">
      <div className="container-page relative z-10 pb-28 pt-16 text-center sm:pb-40 sm:pt-24">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-[22%] overflow-hidden shadow-lift sm:h-20 sm:w-20">
          <img src="/logo.png" alt="" className="h-full w-full object-contain" />
        </span>
        <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          NilePixel <span className="text-accent">Engineering</span>
        </h2>
        <p className="mt-3 text-base font-medium text-white sm:text-lg">What if your software team felt like part of yours?</p>
        <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-white/75 sm:text-base">
          Too many agencies disappear after the kickoff call. We work the opposite way: close to you, transparent about
          progress, and accountable for results, so you always know where your product stands and where it is going.
        </p>

        <dl className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-3 sm:gap-5">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 px-2 py-5 backdrop-blur sm:py-6">
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-3xl font-semibold text-white sm:text-4xl">
                <CountUp end={s.end} suffix={s.suffix} />
              </dd>
              <p className="mt-1 text-[11px] text-white/60 sm:text-sm">{s.label}</p>
            </div>
          ))}
        </dl>
      </div>
      <WaveEdge className="h-14 sm:h-24" />
    </section>

    <section className="pb-16 pt-6 sm:pb-24">
      <ScrollReveal className="container-page grid gap-5 md:grid-cols-3">
        {WHY.map(({ icon: Icon, title, body, visual }) => (
          <div key={title} className="card card-hover group p-6 sm:p-7">
            <span className="icon-badge group-hover:scale-110 group-hover:bg-accent-hover">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-5 text-xl font-bold leading-snug text-ink">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-body">{body}</p>
            <Visual type={visual} />
          </div>
        ))}
      </ScrollReveal>
    </section>
  </>
);
