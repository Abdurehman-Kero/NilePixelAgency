import React from 'react';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

/** Shared dark, textured banner for inner pages, with the curved edge into the white page. */
export const PageHeader: React.FC<PageHeaderProps> = ({ eyebrow, title, description }) => (
  <section className="hero-texture relative overflow-hidden">
    <div className="container-page relative z-10 pb-24 pt-14 text-center sm:pb-32 sm:pt-20">
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h1 className="mx-auto max-w-3xl text-[2rem] font-semibold leading-[1.15] tracking-tight text-white sm:text-5xl">
        {title}
      </h1>
      {description && <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">{description}</p>}
    </div>
    <svg className="absolute inset-x-0 bottom-0 h-12 w-full sm:h-20" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden>
      <path d="M0 120V70C240 10 480 0 720 0s520 20 720 70v50H0Z" fill="#fff" />
    </svg>
  </section>
);
