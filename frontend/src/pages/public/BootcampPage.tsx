import React from 'react';
import {
  Megaphone, CalendarDays, Video, Users, Layers, Sparkles, Rocket, CheckCircle2, Mail, Send, ArrowRight,
  GraduationCap, Clock, Gift, MessageCircle,
} from 'lucide-react';
import { TELEGRAM_URL, WHATSAPP_URL, REGISTER_URL, useCompany } from '../../hooks/useApiData';
import { SEO } from '../../components/ui/SEO';
import { PageHeader } from '../../components/ui/PageHeader';
import { SectionTitle } from '../../components/ui/SectionTitle';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { WhatsAppIcon } from '../../components/ui/WhatsAppIcon';

const STATS = [
  { value: '1,000', label: 'learners' },
  { value: '4', label: 'live cohorts of 250' },
  { value: '3', label: 'days, one session a day' },
  { value: 'Free', label: 'no fees, no catch' },
];

const ANNOUNCEMENTS = [
  { tag: 'Open', date: 'Today, Wed Oct 28', title: 'Registration is open', body: 'Cohort A is limited to 250 seats. Register today so your seat is held before the list is capped.' },
  { tag: 'Deadline', date: 'Nov 4', title: 'Sign-ups close and cohorts are formed', body: 'We cap registration, split everyone into four cohorts of 250 and email each person their cohort, dates and Telegram group link.' },
  { tag: 'Live', date: 'Nov 7 - 9', title: 'Cohort A goes live on Google Meet', body: 'Three consecutive daily sessions starting Saturday, November 7. Your Meet link is sent by email and posted on Telegram one hour before each session.' },
  { tag: 'Next', date: 'After Cohort A', title: 'Cohorts B, C and D', body: 'Dates for the remaining cohorts are announced by email and on our Telegram channel.' },
];

const DAYS = [
  {
    day: 'Day 1',
    icon: Layers,
    title: 'Intro to Fullstack Web Development',
    body: 'A visual, no-heavy-coding tour of how a website actually works, so you understand what the AI will be doing for you.',
    points: ['Frontend, backend and databases explained with diagrams', 'How the pieces talk to each other', 'The vocabulary you need to direct an AI tool with confidence'],
  },
  {
    day: 'Day 2',
    icon: Sparkles,
    title: 'Prompt Engineering & AI Tools',
    body: 'Learn to describe what you want so the AI builds it right, and how to rescue it when it gets things wrong.',
    points: ['Hands-on with AI builders such as Bolt.new, Lovable and v0', 'A repeatable framework for UI/UX system prompts', 'Spotting and fixing AI hallucinations'],
  },
  {
    day: 'Day 3',
    icon: Rocket,
    title: 'Project Build & Deployment',
    body: 'We build a complete website live, from an idea suggested by a student, and put it on the internet before the session ends.',
    points: ['Connect a backend such as Supabase', 'Deploy to the internet with Vercel', 'The live link is shared in the Meet chat'],
  },
];

const STEPS = [
  { icon: Mail, title: 'Register', body: 'Sign up on our registration dashboard. It takes less than a minute.' },
  { icon: Users, title: 'Get your cohort', body: 'After sign-ups close, you receive a welcome email with your cohort, dates and the Telegram group link.' },
  { icon: Video, title: 'Join live', body: 'Your Google Meet link arrives by email and on Telegram one hour before you start.' },
  { icon: GraduationCap, title: 'Keep learning', body: 'After each session you get the recording and a homework assignment by email.' },
];

const AUDIENCE = [
  'Complete beginners curious about building websites',
  'Students and graduates who want a practical, modern skill',
  'Designers, marketers and founders who want to ship their own ideas',
  'Developers who want to speed up their workflow with AI tools',
];

const FAQS = [
  { q: 'When does it start?', a: 'Cohort A starts on Saturday, November 7 and runs for three consecutive days. Registration opens on Wednesday, October 28.' },
  { q: 'Is the bootcamp really free?', a: 'Yes. There is no registration fee and no hidden cost.' },
  { q: 'Do I need to know how to code?', a: 'No. Day 1 is conceptual and the AI tools do most of the heavy lifting. Curiosity and a laptop are enough.' },
  { q: 'What do I need to join?', a: 'A laptop or computer, a stable internet connection, a Gmail account for Google Meet and a Telegram account for our community group.' },
  { q: 'Will I get the recordings?', a: 'Yes. Every registered participant receives the session recording and homework by email after each live day.' },
  { q: 'What if my cohort is full?', a: 'Seats are limited to 250 per cohort. Once a cohort is full you are placed in the next one, and we confirm your dates by email.' },
];

export const BootcampPage: React.FC = () => {
  const { email: siteEmail } = useCompany();

  return (
    <>
      <SEO
        title="Free AI Web Development Bootcamp | NilePixel Technologies"
        description="A free 3-day, live AI-assisted web development bootcamp on Google Meet for 1,000 Ethiopian learners. Learn fullstack basics, prompt engineering and deploy a real website."
        url="https://nilepixel.et/bootcamp"
      />

      <PageHeader
        eyebrow="Free 3-day bootcamp"
        title="AI Web Development Bootcamp"
        description="Learn to build and launch a real website with AI tools. Live on Google Meet, three days from November 7, 1,000 learners, completely free."
      />

      <section className="section pt-2 sm:pt-6">
        <div className="container-page space-y-16 sm:space-y-24">
          {/* Headline numbers */}
          <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {STATS.map((s) => (
              <li key={s.label} className="rounded-2xl bg-accent-soft px-5 py-6 text-center">
                <p className="text-3xl font-bold text-ink sm:text-4xl">{s.value}</p>
                <p className="mt-1 text-sm text-body">{s.label}</p>
              </li>
            ))}
          </ul>

          {/* Announcements */}
          <ScrollReveal>
            <SectionTitle
              eyebrow="Announcements"
              title="What's happening"
              description="The latest news about the campaign. Follow our Telegram channel to get updates the moment they land."
            />
            <ul className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2">
              {ANNOUNCEMENTS.map((a) => (
                <li key={a.title} className="card flex gap-4 p-5 sm:p-6">
                  <span className="icon-badge shrink-0"><Megaphone className="h-5 w-5" /></span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">{a.tag}</span>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-muted">
                        <CalendarDays className="h-3.5 w-3.5" /> {a.date}
                      </span>
                    </div>
                    <h3 className="mt-2 text-base font-semibold text-ink">{a.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-body">{a.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Curriculum */}
          <ScrollReveal>
            <SectionTitle
              eyebrow="Curriculum"
              title="Three days, from idea to live website"
              description="Every cohort attends the same three live sessions on consecutive days."
            />
            <ol className="mt-10 grid gap-5 lg:grid-cols-3">
              {DAYS.map(({ day, icon: Icon, title, body, points }) => (
                <li key={day} className="card flex flex-col p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="icon-badge"><Icon className="h-5 w-5" /></span>
                    <span className="eyebrow !mb-0">{day}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold leading-snug text-ink">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{body}</p>
                  <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
                    {points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm text-body">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </ScrollReveal>

          {/* How it works */}
          <ScrollReveal>
            <SectionTitle eyebrow="How it works" title="From sign-up to your first live site" />
            <ol className="mt-10 grid gap-x-5 gap-y-12 pt-4 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map(({ icon: Icon, title, body }, i) => (
                <li key={title} className="relative rounded-2xl bg-surface px-6 pb-8 pt-12 text-center">
                  <span className="absolute left-1/2 top-0 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-accent shadow-card">
                    <Icon className="h-6 w-6" />
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent">Step {i + 1}</p>
                  <h3 className="mt-1 text-lg font-bold text-ink">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{body}</p>
                </li>
              ))}
            </ol>
          </ScrollReveal>

          {/* Who it's for + what you get */}
          <ScrollReveal className="grid gap-8 lg:grid-cols-2">
            <div className="card p-6 sm:p-8">
              <p className="eyebrow mb-3">Who it's for</p>
              <h2 className="text-2xl font-semibold text-ink">Built for beginners and the curious</h2>
              <ul className="mt-6 space-y-3">
                {AUDIENCE.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-[15px] text-body">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-6 sm:p-8">
              <p className="eyebrow mb-3">What you get</p>
              <h2 className="text-2xl font-semibold text-ink">More than three sessions</h2>
              <ul className="mt-6 space-y-4">
                {[
                  { icon: Video, t: 'Live teaching on Google Meet, with your questions answered in the chat' },
                  { icon: Clock, t: 'Session recordings and homework sent to your email' },
                  { icon: MessageCircle, t: 'A private Telegram group to learn alongside other developers' },
                  { icon: Gift, t: 'A real website of your own, deployed on the internet' },
                ].map(({ icon: Icon, t }) => (
                  <li key={t} className="flex items-start gap-3 text-[15px] text-body">
                    <span className="icon-badge !h-9 !w-9 shrink-0"><Icon className="h-4 w-4" /></span>
                    <span className="pt-1.5">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Register */}
          <ScrollReveal>
            <div id="register" className="scroll-mt-24 overflow-hidden rounded-3xl bg-night p-6 text-white sm:p-10 lg:p-14">
              <div className="grid items-start gap-10 lg:grid-cols-2">
                <div>
                  <p className="eyebrow mb-3">Reserve your seat</p>
                  <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">Register for the free bootcamp</h2>
                  <p className="mt-4 text-white/70">
                    Seats are limited to 250 per cohort. Register on our dashboard and we'll email your cohort, dates and Telegram group link.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="btn !rounded-full bg-white !px-5 !py-2.5 text-ink hover:bg-accent hover:text-white">
                      <Send className="h-4 w-4" /> Join our Telegram channel
                    </a>
                    <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn !rounded-full bg-[#25D366] !px-5 !py-2.5 text-white hover:brightness-95">
                      <WhatsAppIcon className="h-4 w-4" /> Ask on WhatsApp
                    </a>
                  </div>
                  <p className="mt-6 text-sm text-white/55">
                    Questions? Email <a className="underline hover:text-accent" href={`mailto:${siteEmail}`}>{siteEmail}</a>
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-6 text-center text-body sm:p-8">
                  <span className="icon-badge mx-auto"><CalendarDays className="h-5 w-5" /></span>
                  <h3 className="mt-4 text-xl font-semibold text-ink">Registration opens Wed, Oct 28</h3>
                  <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed">
                    Cohort A starts Saturday, November 7. Create your free account on our registration dashboard to reserve a seat.
                  </p>
                  <a href={REGISTER_URL} target="_blank" rel="noreferrer" className="btn-primary mt-6 w-full !rounded-full">
                    Register now <ArrowRight className="h-4 w-4" />
                  </a>
                  <p className="mt-3 text-xs text-muted">register.nilepixel.et</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* FAQ */}
          <ScrollReveal className="mx-auto max-w-3xl">
            <SectionTitle eyebrow="FAQ" title="Good to know" />
            <div className="mt-8 space-y-3">
              {FAQS.map((f) => (
                <details key={f.q} className="card group p-5">
                  <summary className="cursor-pointer list-none text-[15px] font-semibold text-ink marker:hidden">{f.q}</summary>
                  <p className="mt-3 text-sm leading-relaxed text-body">{f.a}</p>
                </details>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};
