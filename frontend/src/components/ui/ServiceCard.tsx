import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { ServiceItem } from '../../data/services';

export const ServiceCard: React.FC<{ service: ServiceItem }> = ({ service: s }) => (
  <Link
    to={`/services/${s.slug}`}
    className="card card-hover group flex flex-col overflow-hidden focus-visible:ring-2 focus-visible:ring-accent"
  >
    <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-line">
      <img
        src={s.image}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-night/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink opacity-100 shadow-card transition duration-300 sm:translate-y-1 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </div>
    <div className="flex flex-1 flex-col p-6">
      <h3 className="text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-accent">{s.title}</h3>
      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-body">{s.description}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
        Learn more
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </div>
  </Link>
);
