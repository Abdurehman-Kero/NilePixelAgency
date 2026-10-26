import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Gauge, Layers, ShieldCheck } from 'lucide-react';
import { SERVICES } from '../../data/services';
import { SEO } from '../../components/ui/SEO';
import { PageHeader } from '../../components/ui/PageHeader';
import { SectionTitle } from '../../components/ui/SectionTitle';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { ServiceCard } from '../../components/ui/ServiceCard';
import { Process } from '../../components/home/Process';
import { Faq } from '../../components/home/Faq';
import { CtaBanner } from '../../components/home/CtaBanner';
import { CONTACT_FORM } from '../../utils/routes';

const HIGHLIGHT_ICONS = [Layers, ShieldCheck, Gauge];

export const ServiceDetails: React.FC = () => {
  const { slug } = useParams();
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) return <Navigate to="/services" replace />;

  const related = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <SEO
        title={`${service.title} | NilePixel Technologies`}
        description={service.description}
        url={`https://nilepixel.et/services/${service.slug}`}
      />

      <PageHeader eyebrow="Service" title={service.title} description={service.description} />

      {/* Overview */}
      <section className="section pt-4 sm:pt-8">
        <ScrollReveal className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
            <img src={service.image} alt="" className="aspect-[4/3] h-full w-full object-cover" />
          </div>
          <div>
            <Link
              to="/services"
              className="group mb-6 inline-flex items-center gap-2 text-sm font-medium text-body transition-colors hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> All services
            </Link>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-rust sm:text-4xl">What you get:</h2>
            <p className="lead mt-4">{service.overview}</p>
            <ul className="mt-7 space-y-3.5">
              {service.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                    <Check className="h-3 w-3" strokeWidth={3.5} />
                  </span>
                  {d}
                </li>
              ))}
            </ul>
            <Link to={CONTACT_FORM} className="btn-primary mt-7 !rounded-full sm:mt-8 sm:!px-8">
              Discuss your project <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* Highlights */}
      <section className="section bg-surface">
        <ScrollReveal className="container-page space-y-12">
          <SectionTitle eyebrow="Why it works" title="How we approach it" />
          <div className="grid gap-5 md:grid-cols-3">
            {service.highlights.map((h, i) => {
              const Icon = HIGHLIGHT_ICONS[i % HIGHLIGHT_ICONS.length];
              return (
                <div key={h.title} className="card card-hover group bg-white p-6 sm:p-7">
                  <span className="icon-badge group-hover:scale-110 group-hover:bg-accent-hover">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-ink">{h.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-body">{h.body}</p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </section>

      {/* Stack */}
      <section className="section">
        <ScrollReveal className="container-page space-y-10">
          <SectionTitle eyebrow="Technology" title="Tools we use for this" />
          <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2.5">
            {service.stack.map((t) => (
              <span
                key={t}
                className="tag cursor-default !px-4 !py-2 !text-sm transition-colors duration-200 hover:border-accent hover:bg-accent-soft hover:text-accent"
              >
                {t}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <Process />

      {/* Related */}
      <section className="section">
        <ScrollReveal className="container-page space-y-12">
          <SectionTitle eyebrow="Keep exploring" title="Other services" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </ScrollReveal>
      </section>

      <Faq />
      <CtaBanner />
      <div className="h-16 sm:h-24" />
    </>
  );
};
