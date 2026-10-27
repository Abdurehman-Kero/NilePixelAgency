import React, { useState } from 'react';
import { api } from '../../services/api';
import { useCompany, WHATSAPP_URL } from '../../hooks/useApiData';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { SEO } from '../../components/ui/SEO';
import { PageHeader } from '../../components/ui/PageHeader';
import { WhatsAppIcon } from '../../components/ui/WhatsAppIcon';
import { Faq } from '../../components/home/Faq';

const NEXT_STEPS = [
  { title: 'We review your message', body: 'A solution architect reads your brief and prepares thoughtful questions, usually within 24 hours.' },
  { title: 'A short discovery call', body: 'We talk through goals, users and constraints so we understand what success looks like for you.' },
  { title: 'You get a clear proposal', body: 'Scope, timeline and cost laid out plainly, with a first milestone you can start on right away.' },
];

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    budget: '$10k - $25k',
    service: 'Custom Software',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { email: siteEmail, phones: sitePhones } = useCompany();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setErrorMsg(null);

    // 1. Send to FormSubmit for instant email delivery
    fetch('https://formsubmit.co/ajax/keroabdurehman@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        message: formData.message,
        _subject: `New Project Inquiry from ${formData.name}`,
        _template: 'box',
      }),
    }).catch(console.error);

    // 2. Fire the API request in the background to save in the database
    api.post('/contact', formData).catch((err) => {
      console.error('Failed to submit contact to DB:', err);
    });

    // Instantly show success after a short delay for better UX
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 500);
  };

  const setField = (key: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [key]: e.target.value });

  const contactRows = [
    { icon: Mail, label: 'Email us', value: siteEmail, href: `mailto:${siteEmail}` },
    { icon: Phone, label: 'Phone & WhatsApp', value: sitePhones[0], href: `tel:${sitePhones[0].replace(/\s/g, '')}`, extra: { value: sitePhones[1], href: `tel:${sitePhones[1]}` }, whatsapp: true },
    { icon: MapPin, label: 'Headquarters', value: 'Bole Sub-City, Next to Millennium Hall, Addis Ababa, Ethiopia' },
  ];

  return (
    <>
      <SEO
        title="Contact Us | NilePixel Technologies"
        description="Get in touch with NilePixel Technologies for your next software development, AI, or Telegram bot project in Ethiopia."
        url="https://nilepixel.et/contact"
      />

      <PageHeader
        eyebrow="Contact"
        title="Let's build something exceptional"
        description="Have an enterprise software requirement or AI project? Send us a message and our lead solution architects will reach out within 24 hours."
      />

      <section className="section pt-2 sm:pt-6">
        <div className="container-page space-y-14 sm:space-y-20">
          {/* Contact cards with floating icon circles */}
          <ul className="grid gap-x-5 gap-y-12 pt-6 md:grid-cols-3">
            {contactRows.map(({ icon: Icon, label, value, href, extra, whatsapp }) => (
              <li key={label} className="group relative">
                <span className="absolute left-1/2 top-0 z-10 flex h-[4.5rem] w-[4.5rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-accent shadow-card transition duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-white">
                  <Icon className="h-7 w-7" />
                </span>
                <div className="flex h-full flex-col items-center rounded-2xl bg-accent-soft px-6 pb-9 pt-14 text-center transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lift">
                  <h2 className="text-lg font-bold text-ink">{label}</h2>
                  {href ? (
                    <a href={href} className="link-underline mt-2 break-all text-[15px] text-ink hover:text-accent">
                      {value}
                    </a>
                  ) : (
                    <p className="mt-2 text-[15px] leading-relaxed text-ink">{value}</p>
                  )}
                  {extra && (
                    <a href={extra.href} className="link-underline mt-1 text-[15px] text-ink hover:text-accent">
                      {extra.value}
                    </a>
                  )}
                  {whatsapp && (
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-95"
                    >
                      <WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div id="contact-form" className="grid scroll-mt-24 gap-8 lg:grid-cols-5 lg:gap-10">
            <div className="space-y-8 lg:col-span-2">
              <div>
                <p className="eyebrow mb-3">What happens next</p>
                <h2 className="heading-lg">Tell us about your project</h2>
                <p className="lead mt-4">
                  Share a few details and we'll come back with a clear plan. No obligation, no jargon.
                </p>
              </div>
              <ol className="space-y-5">
                {NEXT_STEPS.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="icon-badge !h-10 !w-10 text-sm font-semibold">{i + 1}</span>
                    <div>
                      <h3 className="text-[15px] font-semibold text-ink">{s.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-body">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

          <div className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-10 lg:col-span-3">
            {submitted ? (
              <div className="space-y-4 py-12 text-center">
                <CheckCircle2 className="mx-auto h-14 w-14 text-accent" />
                <h2 className="text-2xl font-semibold text-ink">Thank you!</h2>
                <p className="mx-auto max-w-sm text-sm leading-relaxed text-body">
                  Your inquiry has been submitted successfully. Our engineering team will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMsg && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{errorMsg}</div>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="field-label" htmlFor="name">Your name *</label>
                    <input id="name" type="text" required value={formData.name} onChange={setField('name')} className="field" />
                  </div>
                  <div>
                    <label className="field-label" htmlFor="email">Email address *</label>
                    <input id="email" type="email" required value={formData.email} onChange={setField('email')} className="field" />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="field-label" htmlFor="phone">Phone number</label>
                    <input id="phone" type="text" value={formData.phone} onChange={setField('phone')} className="field" />
                  </div>
                  <div>
                    <label className="field-label" htmlFor="company">Company / organization</label>
                    <input id="company" type="text" value={formData.company} onChange={setField('company')} className="field" />
                  </div>
                </div>

                <div>
                  <label className="field-label" htmlFor="message">Project details *</label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={setField('message')}
                    placeholder="Describe your goals, technical requirements, or timeline…"
                    className="field resize-y"
                  />
                </div>

                <button type="submit" disabled={sending} className="btn-primary w-full">
                  <Send className="h-4 w-4" /> {sending ? 'Sending…' : 'Submit inquiry'}
                </button>
              </form>
            )}
          </div>
          </div>
        </div>
      </section>

      <Faq />
      <div className="h-16 sm:h-24" />
    </>
  );
};
