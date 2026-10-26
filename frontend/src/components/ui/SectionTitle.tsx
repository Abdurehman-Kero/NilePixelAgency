import React from 'react';

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Left-align on desktop instead of centring */
  align?: 'center' | 'left';
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ eyebrow, title, description, align = 'center' }) => (
  <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
    {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
    <h2 className="heading-lg">{title}</h2>
    {align === 'center' && (
      <div className="title-rule">
        <span />
      </div>
    )}
    {description && <p className={`lead ${align === 'center' ? 'mt-5' : 'mt-4'}`}>{description}</p>}
  </div>
);
