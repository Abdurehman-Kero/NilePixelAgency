import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import type { Testimonial } from '../../data/testimonials';

const AUTOPLAY_MS = 5000;
const SLIDE_MS = 1100;
const EASE = 'cubic-bezier(0.22, 0.61, 0.36, 1)';

const initials = (t: Testimonial) =>
  (t.company || t.name)
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

const Avatar: React.FC<{ t: Testimonial }> = ({ t }) =>
  t.photo ? (
    <img src={t.photo} alt={t.name} loading="lazy" className="h-14 w-14 rounded-full border-2 border-white object-cover shadow-card sm:h-16 sm:w-16" />
  ) : (
    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-lg font-semibold text-accent ring-2 ring-white sm:h-16 sm:w-16" aria-hidden>
      {initials(t)}
    </span>
  );

/**
 * Horizontal, looping testimonial carousel. Slides glide slowly (autoplay is paused on hover,
 * focus and while dragging), it can be swiped or dragged, and it respects reduced-motion.
 */
export const TestimonialSlider: React.FC<{ items: Testimonial[] }> = ({ items }) => {
  const count = items.length;
  const looped = count > 1 ? [...items, items[0]] : items; // trailing clone gives a seamless loop

  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [dragX, setDragX] = useState(0);
  const drag = useRef<{ x: number; id: number } | null>(null);
  const viewport = useRef<HTMLDivElement>(null);

  const reduceMotion = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const next = useCallback(() => {
    if (count < 2) return;
    setAnimate(true);
    setIndex((i) => Math.min(i + 1, count));
  }, [count]);

  const prev = useCallback(() => {
    if (count < 2) return;
    if (index === 0) {
      // jump (invisibly) to the clone of the first slide, then glide back one step
      setAnimate(false);
      setIndex(count);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setAnimate(true);
          setIndex(count - 1);
        })
      );
    } else {
      setAnimate(true);
      setIndex((i) => i - 1);
    }
  }, [count, index]);

  // After gliding onto the clone, snap back to the real first slide without animation.
  const onTransitionEnd = (e: React.TransitionEvent) => {
    if (e.target !== e.currentTarget) return;
    if (index === count && count > 1) {
      setAnimate(false);
      setIndex(0);
    }
  };

  useEffect(() => {
    if (paused || reduceMotion || count < 2) return;
    const timer = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, reduceMotion, count, next]);

  const active = index % count;

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    drag.current = { x: e.clientX, id: e.pointerId };
    setPaused(true);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    setDragX(e.clientX - drag.current.x);
  };
  const endDrag = () => {
    if (!drag.current) return;
    const width = viewport.current?.offsetWidth || 1;
    const moved = dragX;
    drag.current = null;
    setDragX(0);
    setPaused(false);
    if (moved < -width * 0.12) next();
    else if (moved > width * 0.12) prev();
  };

  const dragging = drag.current !== null && dragX !== 0;

  return (
    <div
      className="relative mx-auto max-w-4xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => !drag.current && setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
    >
      <div
        ref={viewport}
        className="touch-pan-y select-none overflow-hidden rounded-3xl"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
      >
        <div
          className="flex"
          style={{
            transform: `translate3d(calc(${-index * 100}% + ${dragX}px), 0, 0)`,
            transition: animate && !dragging ? `transform ${reduceMotion ? 0 : SLIDE_MS}ms ${EASE}` : 'none',
          }}
          onTransitionEnd={onTransitionEnd}
          aria-live={paused ? 'polite' : 'off'}
        >
          {looped.map((t, i) => (
            <figure
              key={`${t.id}-${i}`}
              className="w-full shrink-0 px-1 sm:px-2"
              aria-hidden={i % count !== active}
            >
              <div className="relative flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-card sm:p-10">
                <Quote className="h-9 w-9 text-accent/40 sm:h-11 sm:w-11" aria-hidden />

                <div className="mt-4 flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className={`h-4 w-4 ${s < t.rating ? 'fill-accent text-accent' : 'text-line'}`} />
                  ))}
                </div>

                <blockquote className="mt-5 flex-1 text-[17px] font-medium leading-relaxed text-ink sm:text-[1.35rem] sm:leading-[1.6]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <figcaption className="mt-8 flex items-center gap-4 border-t border-line pt-6">
                  <Avatar t={t} />
                  <div className="min-w-0">
                    <p className="truncate text-[15px] font-semibold text-ink">{t.name}</p>
                    <p className="truncate text-sm text-muted">
                      {[t.role && t.role !== t.name ? t.role : '', t.company].filter(Boolean).join(', ')}
                    </p>
                  </div>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>

      {count > 1 && (
        <div className="mt-6 flex items-center justify-center gap-5">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink transition duration-200 hover:border-accent hover:bg-accent hover:text-white active:scale-95"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2" role="tablist" aria-label="Choose testimonial">
            {items.map((t, i) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={i === active}
                aria-label={`Show testimonial from ${t.company || t.name}`}
                onClick={() => {
                  setAnimate(true);
                  setIndex(i);
                }}
                className={`h-2 rounded-full transition-all duration-500 ${i === active ? 'w-7 bg-accent' : 'w-2 bg-line hover:bg-accent/50'}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink transition duration-200 hover:border-accent hover:bg-accent hover:text-white active:scale-95"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};
