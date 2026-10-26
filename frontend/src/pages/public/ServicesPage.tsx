import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { SERVICES, type ServiceItem } from '../../data/services';
import { SEO } from '../../components/ui/SEO';
import { PageHeader } from '../../components/ui/PageHeader';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { Process } from '../../components/home/Process';
import { Engagement } from '../../components/home/Engagement';
import { Faq } from '../../components/home/Faq';
import { CtaBanner } from '../../components/home/CtaBanner';

const ServiceRow: React.FC<{ service: ServiceItem; index: number }> = ({ service: s, index }) => {
  const flipped = index % 2 === 1;

  return (
    <ScrollReveal>
      <article className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
        {/* Thumbnail */}
        <Link
          to={`/services/${s.slug}`}
          className={`relative block lg:col-span-6 ${flipped ? 'lg:order-2' : ''}`}
          aria-label={s.title}
        >
          <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition duration-500 group-hover:shadow-lift">
            <img
              src={s.image}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </div>
          <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink shadow-card transition duration-300 sm:translate-y-1 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </Link>

        {/* Description */}
        <div className={`lg:col-span-6 ${flipped ? 'lg:order-1' : ''}`}>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-extrabold leading-none text-rust-gradient">{String(index + 1).padStart(2, '0')}</span>
            <span className="h-px w-10 bg-accent/60" />
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Service</span>
          </div>

          <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-3xl">
            <Link to={`/services/${s.slug}`} className="transition-colors hover:text-accent">
              {s.title}
            </Link>
          </h2>

          <p className="mt-4 text-[15px] leading-relaxed text-body sm:text-base sm:leading-7">{s.overview}</p>

          <ul className="mt-5 space-y-2.5">
            {s.deliverables.slice(0, 3).map((d) => (
              <li key={d} className="flex items-start gap-3 text-sm leading-relaxed text-ink">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                  <Check className="h-3 w-3" strokeWidth={3.5} />
                </span>
                {d}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-2">
            {s.stack.slice(0, 5).map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>

          <Link to={`/services/${s.slug}`} className="btn-primary mt-6 !rounded-full sm:mt-7 sm:!px-6">
            Explore this service <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </article>
    </ScrollReveal>
  );
};

export const ServicesPage: React.FC = () => (
  <>
    <SEO
      title="Our Services | NilePixel Technologies"
      description="Explore NilePixel Technologies' comprehensive suite of services including enterprise web apps, mobile engineering, AI solutions, and Telegram bots."
      url="https://nilepixel.et/services"
    />

    <PageHeader
      eyebrow="Services"
      title="Engineering capabilities for ambitious teams"
      description="Full-stack software engineering, AI systems integration, and cloud infrastructure tailored to your organization."
    />

    <section className="section pt-2 sm:pt-6">
      <div className="container-page space-y-16 sm:space-y-24">
        {SERVICES.map((s, i) => (
          <ServiceRow key={s.slug} service={s} index={i} />
        ))}
      </div>
    </section>

    <Process />
    <Engagement />
    <Faq className="bg-surface" />
    <CtaBanner />
    <div className="h-16 sm:h-24" />
  </>
);
