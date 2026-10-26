// Services shown on the home page, /services and /services/:slug. Mirrors the live DB
// records, kept static so the pages render without a network round trip.
export interface ServiceItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
  /** Longer intro shown on the detail page */
  overview: string;
  highlights: { title: string; body: string }[];
  deliverables: string[];
  stack: string[];
}

export const SERVICES: ServiceItem[] = [
  {
    id: 1,
    title: 'Enterprise Web Application Engineering',
    slug: 'enterprise-web-development',
    description: 'Custom, high-throughput web systems built with React, TypeScript, Node.js, and resilient databases.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=75',
    overview:
      'Internal platforms, customer portals and SaaS products that stay fast and dependable as your users and data grow. We design the architecture first, then build it in small, tested increments.',
    highlights: [
      { title: 'Built to scale', body: 'Modular architecture, caching and database design that handle growth without rewrites.' },
      { title: 'Secure by default', body: 'Role-based access, audit trails and encrypted data, designed in from the first sprint.' },
      { title: 'Easy to maintain', body: 'Typed, tested, documented code your own team can confidently extend.' },
    ],
    deliverables: [
      'Architecture and technical design document',
      'Responsive web application with admin tooling',
      'REST or GraphQL APIs with documentation',
      'Automated tests and CI/CD pipeline',
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
  },
  {
    id: 2,
    title: 'Cross-Platform Mobile Engineering',
    slug: 'mobile-app-development',
    description: 'Native-quality iOS and Android applications built with React Native and Flutter, with real-time sync.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1000&q=75',
    overview:
      'One team, one codebase, two polished apps. We build mobile products that feel native, work offline, sync in real time and are ready for store review from day one.',
    highlights: [
      { title: 'One codebase', body: 'Ship to iOS and Android together and keep both in step as the product evolves.' },
      { title: 'Feels native', body: 'Smooth animations, platform conventions and performance profiling on real devices.' },
      { title: 'Works offline', body: 'Local storage and background sync so your app stays useful with poor connectivity.' },
    ],
    deliverables: [
      'iOS and Android apps ready for store submission',
      'Push notifications and deep linking',
      'Backend APIs and real-time sync',
      'Analytics, crash reporting and release pipeline',
    ],
    stack: ['React Native', 'Flutter', 'TypeScript', 'Firebase', 'Node.js', 'Fastlane'],
  },
  {
    id: 4,
    title: 'Artificial Intelligence & GenAI Solutions',
    slug: 'ai-genai-solutions',
    description: 'Custom LLM integrations, intelligent workflow automation, semantic search, and predictive analytics.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=75',
    overview:
      'Practical AI that removes repetitive work and unlocks the knowledge in your data. We focus on use cases with a measurable payoff, and build the guardrails that make them safe to rely on.',
    highlights: [
      { title: 'Grounded in your data', body: 'Retrieval and semantic search so answers come from your documents, not guesswork.' },
      { title: 'Workflow automation', body: 'Assistants and agents that handle triage, drafting and data entry end to end.' },
      { title: 'Safe and measurable', body: 'Evaluation, monitoring and human-in-the-loop controls for dependable results.' },
    ],
    deliverables: [
      'Use-case assessment and ROI estimate',
      'LLM integration or custom assistant',
      'Knowledge base ingestion and search',
      'Evaluation suite and usage monitoring',
    ],
    stack: ['OpenAI', 'Anthropic', 'LangChain', 'Python', 'Vector databases', 'Node.js'],
  },
  {
    id: 3,
    title: 'Cloud Infrastructure & DevOps Automation',
    slug: 'cloud-devops-infrastructure',
    description: 'Automated CI/CD pipelines, Docker container orchestration, Kubernetes clusters, and AWS architectures.',
    image: 'https://images.unsplash.com/photo-1560732488-6b0df240254a?auto=format&fit=crop&w=1000&q=75',
    overview:
      'Reliable infrastructure you can reproduce, audit and scale. We automate the path from commit to production so your team ships faster with fewer late-night incidents.',
    highlights: [
      { title: 'Automated delivery', body: 'Every change is built, tested and deployed through a repeatable pipeline.' },
      { title: 'Infrastructure as code', body: 'Environments defined in version control, so nothing depends on one person\'s memory.' },
      { title: 'Observable and resilient', body: 'Metrics, logs and alerts so problems are caught before your users notice.' },
    ],
    deliverables: [
      'Cloud architecture design and cost review',
      'CI/CD pipelines for every service',
      'Containerisation and orchestration',
      'Monitoring, alerting and backup strategy',
    ],
    stack: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Prometheus'],
  },
  {
    id: 5,
    title: 'Telegram Bots & Mini Apps',
    slug: 'telegram-bots-mini-apps',
    description: 'Bots and Mini Apps that bring payments, bookings, and customer support into the app your users already use.',
    image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=1000&q=75',
    overview:
      'Meet your customers where they already are. We build Telegram bots and Mini Apps for commerce, bookings, support and communities, with local payment options and an admin dashboard.',
    highlights: [
      { title: 'Zero install friction', body: 'Users start in one tap, with no app download or account sign-up.' },
      { title: 'Payments built in', body: 'Checkout, subscriptions and receipts handled inside the chat experience.' },
      { title: 'Managed from a dashboard', body: 'Broadcasts, orders and analytics managed from a simple admin panel.' },
    ],
    deliverables: [
      'Conversation design and bot flows',
      'Telegram Mini App interface',
      'Payments and order management',
      'Admin dashboard and analytics',
    ],
    stack: ['Telegram Bot API', 'Mini Apps SDK', 'React', 'Node.js', 'PostgreSQL', 'Webhooks'],
  },
  {
    id: 8,
    title: 'E-Commerce Solutions',
    slug: 'ecommerce-solutions',
    description: 'Custom e-commerce platforms designed for a seamless shopping experience and measurable business growth.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1000&q=75',
    overview:
      'Online stores designed around conversion: fast pages, a frictionless checkout and the integrations you need for payments, inventory and delivery.',
    highlights: [
      { title: 'Conversion-focused', body: 'Clear product pages and a short checkout that keeps customers moving to payment.' },
      { title: 'Integrated operations', body: 'Payments, inventory and shipping connected so your team works from one system.' },
      { title: 'Fast on any device', body: 'Optimised for mobile networks, with image delivery tuned for quick loads.' },
    ],
    deliverables: [
      'Storefront and product catalogue',
      'Secure checkout and payment integration',
      'Order and inventory management',
      'Analytics and marketing integrations',
    ],
    stack: ['React', 'Node.js', 'Stripe', 'Chapa', 'PostgreSQL', 'Cloudinary'],
  },
  {
    id: 6,
    title: 'Content Management Systems',
    slug: 'content-management-systems',
    description: "Flexible content management systems that give you full control over your website's content.",
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1000&q=75',
    overview:
      'Update your website without calling a developer. We build editing experiences your team will enjoy using, with roles, drafts and media management included.',
    highlights: [
      { title: 'Simple for editors', body: 'A clean interface for pages, posts and media, with drafts and previews.' },
      { title: 'Flexible structure', body: 'Content models shaped around your business, not a generic template.' },
      { title: 'Search-ready', body: 'Metadata, sitemaps and structured data built in to support discoverability.' },
    ],
    deliverables: [
      'Custom admin panel with user roles',
      'Content models and media library',
      'SEO fields, sitemap and structured data',
      'Editor training and documentation',
    ],
    stack: ['React', 'Node.js', 'SQLite', 'PostgreSQL', 'REST APIs', 'Cloudinary'],
  },
  {
    id: 7,
    title: 'Consultancy Services',
    slug: 'consultancy-services',
    description: 'Expert advice and strategic guidance to help you navigate the complexities of digital transformation.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=75',
    overview:
      'Not sure what to build, or how? Work with senior engineers who will review your plans, challenge assumptions and give you a practical roadmap you can act on.',
    highlights: [
      { title: 'Independent advice', body: 'Honest recommendations on technology, vendors and build-versus-buy decisions.' },
      { title: 'Architecture reviews', body: 'Find the scalability and security risks in an existing system before they find you.' },
      { title: 'Actionable roadmap', body: 'A prioritised plan with effort estimates your team can start on immediately.' },
    ],
    deliverables: [
      'Stakeholder and system discovery',
      'Technical and security assessment',
      'Prioritised roadmap with estimates',
      'Presentation to your leadership team',
    ],
    stack: ['System design', 'Code audits', 'Security review', 'Cost optimisation', 'Vendor selection'],
  },
  {
    id: 9,
    title: 'Maintenance & Support',
    slug: 'maintenance-support',
    description: 'Reliable, proactive maintenance that keeps your systems running securely and smoothly.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=75',
    overview:
      'Software needs care after launch. Our support plans keep your product secure, up to date and improving, with a team that already knows your codebase.',
    highlights: [
      { title: 'Proactive monitoring', body: 'We watch uptime and performance and act before small issues become outages.' },
      { title: 'Regular updates', body: 'Dependencies and security patches applied on a schedule, not when something breaks.' },
      { title: 'Responsive help', body: 'A direct line to engineers who know your system, with clear response times.' },
    ],
    deliverables: [
      'Uptime and performance monitoring',
      'Security patches and dependency updates',
      'Bug fixes and small improvements',
      'Monthly report and planning call',
    ],
    stack: ['Monitoring', 'Backups', 'Security patching', 'Performance tuning', 'Incident response'],
  },
];
