import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Send } from 'lucide-react';
import { CONTACT_FORM } from '../../utils/routes';

const TASKS = [
  { label: 'Discovery workshop', done: true },
  { label: 'Design approved', done: true },
  { label: 'Build sprint 3', done: false },
];

/** Tilted phone mockup, built from markup so it costs no image bytes. */
const Phone: React.FC = () => (
  <div
    aria-hidden
    className="relative mx-auto aspect-[9/18.5] w-[11.5rem] -rotate-[8deg] rounded-[2rem] border-[7px] border-[#30333b] bg-[#101826] p-4 shadow-[0_30px_60px_-15px_rgb(0_0_0/0.7)] transition-transform duration-500 ease-out group-hover:-rotate-[4deg] sm:w-[15rem] sm:rounded-[2.4rem]"
  >
    <span className="absolute left-1/2 top-2.5 h-4 w-16 -translate-x-1/2 rounded-full bg-black" />
    <div className="mt-8 flex flex-col items-center text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white p-1.5">
        <img src="/image.png" alt="" className="h-full w-full object-contain" />
      </span>
      <p className="mt-3 text-[13px] font-semibold text-white">Your project, on track</p>
      <p className="mt-1 text-[9px] leading-snug text-white/60">Follow every milestone from kickoff to launch.</p>
    </div>
    <ul className="mt-4 space-y-2">
      {TASKS.map((t) => (
        <li key={t.label} className="flex items-center gap-2 rounded-lg bg-white/[0.07] px-2.5 py-2">
          <span
            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
              t.done ? 'bg-accent text-white' : 'border border-white/30'
            }`}
          >
            {t.done && <Check className="h-2.5 w-2.5" strokeWidth={3.5} />}
          </span>
          <span className="text-[10px] text-white/85">{t.label}</span>
        </li>
      ))}
    </ul>
    <span className="mt-4 block rounded-full bg-accent py-2 text-center text-[10px] font-semibold text-white">View timeline</span>
  </div>
);

export const CtaBanner: React.FC = () => (
  <section className="relative mt-4 pt-24 sm:mt-10 lg:pt-0">
    <div className="banner-texture group relative isolate">
      <div className="container-page grid items-center gap-10 pb-14 lg:grid-cols-2 lg:gap-8 lg:pb-0">
        <div className="-mt-24 sm:-mt-28 lg:-my-16">
          <Phone />
        </div>

        <div className="text-center lg:py-24 lg:text-left">
          <p className="text-sm font-medium text-white/70">— Technology designed to help you move forward</p>
          <h2 className="mt-4 text-[1.9rem] font-extrabold uppercase leading-tight tracking-tight text-white sm:text-5xl">
            Design · Build · <span className="text-accent">Scale</span> · Together
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-white/75 lg:mx-0 sm:text-base">
            Tell us what you're building. Our solution architects will reply within 24 hours with a clear plan, a realistic
            timeline and honest next steps.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5 sm:mt-8 sm:gap-3 lg:justify-start">
            <Link to={CONTACT_FORM} className="btn-black group/btn !justify-start !rounded-xl !px-3.5 !py-2 text-left sm:!rounded-2xl sm:!px-5 sm:!py-3">
              <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover/btn:translate-x-0.5 sm:h-6 sm:w-6" />
              <span className="flex flex-col leading-tight">
                <span className="text-[10px] font-normal opacity-70">Ready to talk?</span>
                <span className="text-sm sm:text-base">Start a project</span>
              </span>
            </Link>
            <a
              href="https://t.me/NilePixelTech"
              target="_blank"
              rel="noreferrer"
              className="btn-black !justify-start !rounded-xl !px-3.5 !py-2 text-left sm:!rounded-2xl sm:!px-5 sm:!py-3"
            >
              <Send className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
              <span className="flex flex-col leading-tight">
                <span className="text-[10px] font-normal opacity-70">Join the community</span>
                <span className="text-sm sm:text-base">Telegram channel</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);
