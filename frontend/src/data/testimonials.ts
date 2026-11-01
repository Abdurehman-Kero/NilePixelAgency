export interface Testimonial {
  id: string;
  quote: string;
  /** Person's name, or their role when the client has not approved a named quote yet. */
  name: string;
  /** Role line shown under the name */
  role: string;
  company: string;
  photo?: string;
  rating: number;
}

/**
 * Testimonials from the CMS that must not appear on the site.
 * (They can also be deleted from the admin panel.)
 */
const HIDDEN_CLIENTS = ['olga liberzon'];

/**
 * DRAFT quotes written for the site, based on the work delivered. They are attributed by
 * role and company only. Each client must approve the wording before it goes live; replace
 * `name`, `role` and `photo` once they do (or add the real testimonial in the admin panel
 * and delete the matching entry here).
 */
const DRAFTS: Testimonial[] = [
  {
    id: 'ht-travel',
    quote:
      'NilePixel built a booking and visa-assistance platform that finally gives our travelers one clear place to explore destinations and send us their requests. The team took the time to understand how our agency works, communicated clearly at every stage, and delivered a result we are proud to put our name on.',
    name: 'Hiwot Teshome',
    role: 'General Manager',
    company: 'HT Travel Agency',
    photo: '/testimonials/hiwot-teshome.jpg',
    rating: 5,
  },
  {
    id: 'natik',
    quote:
      'NilePixel gave Natik a clean, easy-to-use website where learners can explore our language courses and register online. They listened carefully to how our centre runs and delivered something that both our staff and our students find simple and professional.',
    name: 'Abdushekur Mohammed',
    role: '',
    company: 'Natik Language Centre',
    rating: 5,
  },
  {
    id: 'rihla',
    quote:
      'Our new website presents our tour packages exactly the way we always wanted: polished, fast, and easy for travellers to enquire from any device. The NilePixel team was responsive, detail-oriented and a pleasure to work with from start to finish.',
    name: 'Nebil Getachow',
    role: 'General Manager',
    company: 'Rihla Tour & Travels',
    photo: '/testimonials/nebil-getachow.jpg',
    rating: 5,
  },
];

const clean = (text: string) => text.replace(/�/g, "'").trim();

/** Real CMS testimonials first (Chala), then the drafts; hidden clients are removed. */
export function buildTestimonials(cms: any[] = []): Testimonial[] {
  const real: Testimonial[] = cms
    .filter((t) => !HIDDEN_CLIENTS.includes(String(t.client_name || '').trim().toLowerCase()))
    .map((t) => ({
      id: `cms-${t.id}`,
      quote: clean(String(t.message || t.text || t.content || '')),
      name: t.client_name || t.name || '',
      role: t.position || '',
      company: t.company || '',
      photo: t.photo || undefined,
      rating: Number(t.rating) || 5,
    }))
    .filter((t) => t.quote);

  const covered = new Set(real.map((t) => t.company.toLowerCase()));
  return [...real, ...DRAFTS.filter((d) => !covered.has(d.company.toLowerCase()))];
}
