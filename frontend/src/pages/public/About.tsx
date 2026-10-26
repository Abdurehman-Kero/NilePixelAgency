import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  Cloud,
  Code2,
  Compass,
  Flag,
  Globe2,
  HeartHandshake,
  Lightbulb,
  Rocket,
  Smartphone,
  Sparkles,
  Target,
  Users,
  Wrench,
  Zap,
} from 'lucide-react';
import { SEO } from '../../components/ui/SEO';
import { PageHeader } from '../../components/ui/PageHeader';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { SectionTitle } from '../../components/ui/SectionTitle';
import { JourneyBlock } from '../../components/ui/JourneyBlock';
import { CtaBanner } from '../../components/home/CtaBanner';
import { Engagement } from '../../components/home/Engagement';

const VALUES = ['Innovation', 'Excellence', 'Integrity', 'Collaboration', 'Customer Focus'];

const GOALS = [
  { title: 'Deliver cutting-edge solutions', body: 'Consistently provide innovative software that surpasses client expectations.' },
  { title: 'Foster continuous learning', body: 'Cultivate a culture that encourages ongoing education and professional growth within our teams.' },
  { title: 'Build long-term partnerships', body: 'Maintain client relationships grounded in trust, transparency, and shared success.' },
  { title: 'Deliver on time', body: 'Adhere to project timelines and ship punctually without compromising quality.' },
  { title: 'Use modern technology', body: 'Stay abreast of industry advancements and bring the latest tools into our solutions.' },
];

export const About: React.FC = () => (
  <>
    <SEO
      title="About Us | NilePixel Technologies"
      description="Learn about NilePixel Technologies' story, vision, and the core team behind our enterprise software engineering and AI solutions."
      url="https://nilepixel.et/about"
    />

    <PageHeader
      eyebrow="About us"
      title="Empowering innovation through software expertise"
      description="A tight-knit team of engineers and designers building software that solves real-world problems."
    />

    <div className="pb-6 sm:pb-10">
      <JourneyBlock
        title="Where We Started"
        subtitle="A simple goal: software that solves real problems"
        intro="NilePixel Technologies began in 2023 with a simple but powerful goal: to build software that actually solves real-world problems. What started as a tight-knit team of engineers has evolved into a trusted technical partner for businesses across the globe."
        art={[Lightbulb, Code2, Flag]}
        items={[
          { icon: Target, title: 'The problem we saw', body: 'Too much software was built to impress, not to work. Businesses needed dependable tools that fit how they actually operate.' },
          { icon: Lightbulb, title: 'Our belief', body: "We aren't just writing code. We're architecting scalable, resilient platforms that help clients thrive in a digital-first world." },
          { icon: Rocket, title: 'Our first step', body: 'We began with the craft: small, focused projects delivered well, which earned the trust that grew into long-term partnerships.' },
        ]}
      />

      <JourneyBlock
        reverse
        title="What We Build"
        subtitle="From first prototype to production systems"
        intro="Our team covers the full journey of a digital product, so you work with one accountable partner from the first sketch through launch and ongoing support."
        art={[Smartphone, Cloud, Zap]}
        items={[
          { icon: Code2, title: 'Web and mobile products', body: 'Enterprise web applications, cross-platform mobile apps and e-commerce platforms built to perform at scale.' },
          { icon: Sparkles, title: 'AI and automation', body: 'LLM integrations, intelligent workflows and Telegram bots that take repetitive work off your team.' },
          { icon: Cloud, title: 'Cloud and DevOps', body: 'Automated pipelines and resilient infrastructure so releases are routine rather than risky.' },
        ]}
      />

      <JourneyBlock
        title="How We Work"
        subtitle="Close, transparent and accountable"
        intro="Great software is built with clients, not for them. We keep communication open and progress visible at every stage of an engagement."
        art={[Users, HeartHandshake, Wrench]}
        items={[
          { icon: Users, title: 'Direct access to engineers', body: 'You talk to the people building your product, not a layer of account managers.' },
          { icon: Check, title: 'Visible progress every week', body: 'Working releases on a staging environment, with plain-language updates and honest timelines.' },
          { icon: HeartHandshake, title: 'Partners after launch', body: 'We stay on to maintain, secure and improve what we build as your needs evolve.' },
        ]}
      />
    </div>

    {/* Vision & mission */}
    <section className="bg-surface py-16 sm:py-24">
      <ScrollReveal className="container-page space-y-10">
        <SectionTitle eyebrow="Where we're going" title="Our vision and mission" />
        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          {[
            {
              icon: Compass,
              title: 'Our vision',
              body: 'To become a globally recognized engineering powerhouse, consistently delivering world-class software by elevating and showcasing exceptional African tech talent on the world stage.',
            },
            {
              icon: Globe2,
              title: 'Our mission',
              body: 'We challenge the status quo by delivering robust, human-centric software designed to empower Ethiopian entrepreneurs and global businesses alike. We bridge the gap between complex engineering and intuitive design, helping our partners operate smarter and scale faster.',
            },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="card-hover group rounded-2xl border border-line bg-white p-7 shadow-card sm:p-10">
              <span className="icon-badge group-hover:scale-110">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-6 text-2xl font-semibold text-rust">{title}</h3>
              <p className="mt-3 text-[15px] leading-7 text-body">{body}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2 sm:gap-3">
          <span className="mr-1 text-sm font-semibold text-ink">Our values</span>
          {VALUES.map((v) => (
            <span
              key={v}
              className="tag gap-1.5 !px-4 !py-1.5 !text-sm transition-colors duration-200 hover:border-accent hover:bg-accent-soft hover:text-accent"
            >
              <Check className="h-3.5 w-3.5 text-accent" />
              {v}
            </span>
          ))}
        </div>
      </ScrollReveal>
    </section>

    <Engagement className="" />

    {/* Goals */}
    <section className="bg-surface py-16 sm:py-24">
      <ScrollReveal className="container-page space-y-12">
        <SectionTitle eyebrow="Our goals" title="What we hold ourselves to" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GOALS.map((g, i) => (
            <div key={g.title} className="card-hover group rounded-2xl border border-line bg-white p-6 sm:p-7">
              <p className="text-4xl font-extrabold leading-none text-rust-gradient transition-transform duration-300 group-hover:scale-110 group-hover:origin-left">
                0{i + 1}
              </p>
              <h3 className="mt-4 text-base font-semibold text-ink">{g.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{g.body}</p>
            </div>
          ))}
          <Link
            to="/contact"
            className="group flex flex-col justify-between rounded-2xl bg-night p-6 text-white transition-colors hover:bg-ink sm:p-7"
          >
            <p className="text-lg font-semibold leading-snug">Have a project in mind? Let's talk.</p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
              Get in touch <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </ScrollReveal>
    </section>

    <CtaBanner />
    <div className="h-16 sm:h-24" />
  </>
);
