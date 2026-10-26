export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'quote'; text: string };

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  cover_image: string;
  author_name: string;
  created_at: string;
  reading_time: string;
  body: Block[];
}

export const POSTS: Post[] = [
  {
    slug: 'why-we-dont-quote-before-a-discovery-week',
    title: "Why we don't quote a price before a discovery week",
    excerpt:
      'Every founder wants a number on the first call. We understand why, and we still say no. Here is what we do instead and why it saves everyone money.',
    category: 'Process',
    cover_image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=75',
    author_name: 'NilePixel Team',
    created_at: '2026-09-18',
    reading_time: '6 min read',
    body: [
      { type: 'p', text: 'It happens on almost every first call. We are ten minutes in, the idea sounds exciting, and then comes the question: "So, roughly, what would this cost?"' },
      { type: 'p', text: "We used to answer it. We would listen for fifteen minutes, scribble some numbers and email a figure the next day. Looking back at those early quotes, we were wrong more often than we were right, and the misses almost never went in the client's favour." },
      { type: 'h2', text: 'What a quick quote actually hides' },
      { type: 'p', text: 'A quote given after one conversation is really a guess with a logo on it. It quietly assumes things nobody has said out loud: how many user roles there are, whether payments are local or international, what happens when a user forgets their password, who writes the content, what "reporting" means to the person paying.' },
      { type: 'p', text: 'Those assumptions turn up later as "change requests", and that is when the relationship gets tense. The client feels nickel-and-dimed. We feel like we are doing free work. Nobody did anything wrong. The estimate was just built on air.' },
      { type: 'h2', text: 'What we do instead' },
      { type: 'p', text: 'We offer a short paid discovery, usually about a week. It is small enough to be an easy yes and big enough to produce something real. By the end you get:' },
      { type: 'ul', items: ['A written scope that lists what is in and, just as importantly, what is out', 'A clickable prototype of the two or three screens that matter most', 'A rough architecture, so the technical risks are named before they bite', 'A fixed price for the first milestone, and a range for the rest'] },
      { type: 'quote', text: 'The goal of discovery is not to impress you. It is to find the expensive surprises while they are still cheap.' },
      { type: 'h2', text: 'The part people do not expect' },
      { type: 'p', text: 'Sometimes a discovery ends with us saying "you probably do not need to build this yet." Maybe a spreadsheet and a Telegram group will answer the question for now. Maybe an existing tool covers eighty percent of it. Those are not lost sales. Those are the clients who come back in a year, when the idea has proven itself, and trust us completely.' },
      { type: 'p', text: "If you are weighing up a project and want a number, we get it. Book a call, tell us what you are trying to do, and we will tell you honestly whether a discovery week is the right next step." },
    ],
  },
  {
    slug: 'building-apps-for-patchy-internet',
    title: 'Building apps for patchy internet: what we changed after the first launch',
    excerpt:
      'Our first mobile app worked perfectly in the office and fell over on a real commute. These are the habits we picked up so that never happens twice.',
    category: 'Mobile',
    cover_image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=75',
    author_name: 'NilePixel Team',
    created_at: '2026-08-27',
    reading_time: '7 min read',
    body: [
      { type: 'p', text: 'Most app tutorials quietly assume a fast, stable connection. Most of our users do not have one all the time. Data runs out, networks drop in lifts and minibuses, and a request that takes four seconds in the office takes forty on the road.' },
      { type: 'p', text: 'The first app we shipped taught us this the hard way. It tested beautifully on office wifi. The first real feedback was a screenshot of an endless spinner.' },
      { type: 'h2', text: 'Treat offline as the normal state' },
      { type: 'p', text: 'The mindset change that mattered most was small: stop thinking of "offline" as an error and start thinking of it as one of the states the app is in. A screen should render something useful from local data first, then quietly refresh when the network allows.' },
      { type: 'ul', items: ['Cache the last good response and show it immediately', 'Queue writes locally and send them when the connection returns', 'Show a small "last updated" time instead of a blocking loader', 'Never lose what the user typed because a request failed'] },
      { type: 'h2', text: 'Make requests smaller, not just faster' },
      { type: 'p', text: 'We stopped sending whole objects when a screen needed three fields. We compress images before upload and serve properly sized ones on download. It sounds basic, and it is, but cutting a payload from 800 KB to 60 KB does more for a slow connection than any amount of clever retry logic.' },
      { type: 'h2', text: 'Test on the worst phone, on the worst network' },
      { type: 'p', text: 'Our test devices now include an older, low-memory Android handset, and we throttle the network to a weak 3G profile before every release. If the app is usable there, it will be lovely everywhere else. We have never regretted testing on the slow device. We have often regretted skipping it.' },
      { type: 'quote', text: 'If it only works when everything is perfect, it does not work.' },
    ],
  },
  {
    slug: 'telegram-mini-app-or-native-app',
    title: 'Telegram Mini App or native app? How we help clients decide',
    excerpt:
      'Both can be the right answer. The difference usually comes down to three questions we ask in the first meeting.',
    category: 'Telegram',
    cover_image: 'https://images.unsplash.com/photo-1596558450255-7c0b7be9d56a?auto=format&fit=crop&w=1200&q=75',
    author_name: 'NilePixel Team',
    created_at: '2026-07-30',
    reading_time: '5 min read',
    body: [
      { type: 'p', text: 'We build both, so we have no reason to push one over the other. What we do have is a habit of asking three questions before anyone opens a design tool.' },
      { type: 'h2', text: '1. Where are your users already?' },
      { type: 'p', text: 'If your customers spend their day in Telegram, a Mini App meets them there. No download, no store review, no account to create. One tap and they are in. For a shop, a booking service or a community, that lack of friction can be the whole difference between "I will try it" and "I will do it later".' },
      { type: 'h2', text: '2. What does the product need from the phone?' },
      { type: 'p', text: 'Heavy offline use, background location, bluetooth, complex notifications, or tight hardware access: those point to a native app. Browsing, ordering, paying, booking and chatting: a Mini App handles those comfortably.' },
      { type: 'h2', text: '3. How fast do you need to learn?' },
      { type: 'p', text: 'A Mini App can usually go from idea to real users in a few weeks. That speed is valuable when you are still finding out what customers want. Plenty of our clients start there, learn, and only then invest in a full native app with real data behind the decision.' },
      { type: 'quote', text: 'Start where the friction is lowest. You can always graduate to something bigger once people are actually using it.' },
      { type: 'p', text: "There is no universal winner. If you are on the fence, tell us about your users and we will give you a straight recommendation, even when it is the cheaper option." },
    ],
  },
  {
    slug: 'the-boring-checklist-we-run-before-every-launch',
    title: 'The boring checklist we run before every launch',
    excerpt:
      'Nothing here is clever. That is the point. Launch day should be uneventful, and these are the things that keep it that way.',
    category: 'Engineering',
    cover_image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=1200&q=75',
    author_name: 'NilePixel Team',
    created_at: '2026-07-02',
    reading_time: '6 min read',
    body: [
      { type: 'p', text: 'Good launches are boring. Nobody stays up late, nobody refreshes a dashboard in panic, and the client mostly asks what to do with all the free time. Boring does not happen by accident. It comes from a checklist that we are slightly embarrassed by because it is so unglamorous.' },
      { type: 'h2', text: 'Before we go live' },
      { type: 'ul', items: ['Backups run and, crucially, a restore has been tested at least once', 'Every secret lives in environment config, none in the repository', 'Error tracking is on and a test error has reached the right inbox', 'The site works on a slow connection and on a small, older phone', 'Forms send real emails to real people, not just in development', 'There is a written rollback plan, and someone has read it'] },
      { type: 'h2', text: 'The one people skip' },
      { type: 'p', text: 'Restoring a backup. Almost everyone takes backups. Surprisingly few have ever tried to restore one. A backup you have never restored is a hope, not a backup. We do it on a scratch environment before launch, every time, and it has caught real problems more than once.' },
      { type: 'h2', text: 'After we go live' },
      { type: 'p', text: 'We watch the first day closely: errors, response times, sign-ups, and the quiet signals like pages nobody can find. We keep the launch window short and early in the week, so that if something does go wrong we are not scrambling on a Friday evening.' },
      { type: 'quote', text: 'Checklists do not slow good engineers down. They stop tired ones from forgetting the obvious.' },
    ],
  },
  {
    slug: 'using-llms-in-a-real-product',
    title: 'Using LLMs in a real product: where they help and where they bite',
    excerpt:
      'Language models are genuinely useful, and also genuinely unreliable. A practical look at where we use them and where we keep a human in the loop.',
    category: 'AI',
    cover_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=75',
    author_name: 'NilePixel Team',
    created_at: '2026-05-21',
    reading_time: '8 min read',
    body: [
      { type: 'p', text: 'Every few weeks a client asks whether they should "add AI". The honest answer is: maybe, but for something specific. A model bolted onto a product with no clear job usually becomes a demo that people try twice and forget.' },
      { type: 'h2', text: 'Where they earn their keep' },
      { type: 'ul', items: ['Drafting: first versions of replies, summaries and descriptions that a person then edits', 'Search: finding the right answer in a large pile of your own documents', 'Triage: sorting incoming requests so people see the urgent ones first', 'Extraction: pulling structured fields out of messy text, forms and emails'] },
      { type: 'p', text: 'What these have in common is that a wrong answer is cheap to catch. A person glances at a draft, notices it is off, and fixes it. The model saved time on the ninety percent it got right.' },
      { type: 'h2', text: 'Where they bite' },
      { type: 'p', text: 'Anywhere a confident wrong answer is expensive: legal advice, medical guidance, anything involving money moving automatically. Models state false things in the same calm voice they state true ones, and a user cannot tell the difference without checking.' },
      { type: 'h2', text: 'Habits that help' },
      { type: 'ul', items: ['Ground answers in your own data and show the source, so people can verify', 'Keep a human approval step on anything that is hard to undo', 'Write a small set of test questions and re-run them every time you change something', 'Log what users ask. It is the best product research you will ever get for free'] },
      { type: 'quote', text: 'Start with a task that is annoying, frequent and forgiving. Prove it there before you aim higher.' },
    ],
  },
  {
    slug: 'your-website-is-not-a-one-off-project',
    title: 'Your website is not a one-off project: what maintenance actually involves',
    excerpt:
      'Launch day feels like the finish line. It is really the starting line. Here is what quietly needs doing once the champagne is gone.',
    category: 'Maintenance',
    cover_image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=75',
    author_name: 'NilePixel Team',
    created_at: '2026-04-09',
    reading_time: '5 min read',
    body: [
      { type: 'p', text: 'We understand the appeal of thinking of a website as a thing you buy once, like a table. But software is closer to a garden. Leave it alone and it will not stay as you planted it.' },
      { type: 'h2', text: 'What changes underneath you' },
      { type: 'p', text: 'The libraries your site depends on release security fixes. Browsers change behaviour. A payment provider updates its API and gives you a deadline. Your hosting plan runs out of room because you were successful. None of this is a failure. It is just time passing.' },
      { type: 'h2', text: 'What we actually do each month' },
      { type: 'ul', items: ['Apply security patches and dependency updates, and test that nothing broke', 'Check uptime, speed and error logs for anything drifting the wrong way', 'Confirm backups are running and still restorable', 'Fix the small annoying bugs that real users reported', 'Send a short plain-language summary, with what we did and what we noticed'] },
      { type: 'h2', text: 'Is it worth it?' },
      { type: 'p', text: 'The cost of a maintenance plan is usually a small fraction of what it costs to rescue a neglected site after it has been hacked, broken by an update, or has quietly been down for a weekend. Most clients who skip it tell us the same thing later: they wish someone had been watching.' },
      { type: 'quote', text: 'Nobody notices good maintenance. That is exactly how you know it is working.' },
    ],
  },
];

export const POST_CATEGORIES = ['All', ...Array.from(new Set(POSTS.map((p) => p.category)))];

const FALLBACK_COVERS: Record<string, string> = {
  Engineering: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=75',
  Mobile: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=75',
  AI: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=75',
  Maintenance: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=75',
};

/** A relevant, people-free photo for posts that have no cover of their own (e.g. CMS posts). */
export const coverFor = (category?: string, cover?: string): string =>
  cover || FALLBACK_COVERS[category || ''] || 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=75';
