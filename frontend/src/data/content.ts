import {
  Compass,
  PenTool,
  Code2,
  Rocket,
  Users,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

export const PILLARS = [
  {
    n: '1',
    title: 'Discover',
    body: 'We learn your business, your users and your constraints first, so the plan we build is the right one, not just a fast one.',
  },
  {
    n: '2',
    title: 'Build',
    body: 'Small, reviewed, tested increments shipped continuously. You see real progress every week, not a big reveal at the end.',
  },
  {
    n: '3',
    title: 'Scale',
    body: 'We monitor, harden and improve what we ship, so your product keeps performing as your users and your ambitions grow.',
  },
];

export type WhyVisual = 'dashboard' | 'pipeline' | 'chat';

export const WHY: { icon: LucideIcon; title: string; body: string; visual: WhyVisual }[] = [
  {
    icon: Users,
    title: 'Built around your goals.',
    body: 'We start with the outcome you need, not our favourite stack. Every decision is traced back to a business result you can measure.',
    visual: 'dashboard',
  },
  {
    icon: ShieldCheck,
    title: 'Quality you can verify.',
    body: 'Code review, automated tests and security checks run on every change, so what reaches production is reliable by default.',
    visual: 'pipeline',
  },
  {
    icon: Sparkles,
    title: 'A team that stays close.',
    body: 'Direct access to the engineers building your product, in the channels you already use, with plain-language updates throughout.',
    visual: 'chat',
  },
];

export const PROCESS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Compass,
    title: 'Discover',
    body: 'Workshops and research to define goals, users, scope and success metrics before a line of code is written.',
  },
  {
    icon: PenTool,
    title: 'Design',
    body: 'Clickable prototypes and a design system you approve early, so the build moves fast with fewer surprises.',
  },
  {
    icon: Code2,
    title: 'Build',
    body: 'Weekly releases to a live staging environment, with automated tests and code review on every change.',
  },
  {
    icon: Rocket,
    title: 'Launch & support',
    body: 'Smooth go-live, monitoring and ongoing maintenance, with a team that stays on call after launch.',
  },
];

export const TECH: { group: string; items: string[] }[] = [
  { group: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'] },
  { group: 'Backend', items: ['Node.js', 'Express', 'PostgreSQL', 'SQLite'] },
  { group: 'Mobile', items: ['React Native', 'Flutter', 'Telegram Mini Apps'] },
  { group: 'Cloud & AI', items: ['AWS', 'Docker', 'Kubernetes', 'LLM integrations'] },
];

export const FAQS = [
  {
    q: 'How long does a typical project take?',
    a: 'A focused MVP usually takes 6–12 weeks; larger platforms are planned in phases. After discovery we give you a scoped timeline and a fixed first milestone so you always know what is coming next.',
  },
  {
    q: 'Do you work with early-stage startups as well as established companies?',
    a: 'Yes. We scale our process to the project: lean and fast for startups validating an idea, and more structured for organizations with compliance, integration or uptime requirements.',
  },
  {
    q: 'What happens after the product launches?',
    a: 'We offer maintenance and support plans covering monitoring, security updates, bug fixes and new features, so your product keeps improving instead of ageing.',
  },
  {
    q: 'Who owns the code and the intellectual property?',
    a: 'You do. Everything we build for you, including source code, designs and infrastructure configuration, is handed over to you at the end of the engagement.',
  },
  {
    q: 'Can you build a Telegram bot or Mini App for our business?',
    a: 'Absolutely. Telegram bots and Mini Apps are one of our core services, from simple support bots to full commerce and booking experiences with payments.',
  },
];
