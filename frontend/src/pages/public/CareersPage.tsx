import React, { useMemo, useState } from 'react';
import { api } from '../../services/api';
import { useApiData } from '../../hooks/useApiData';
import { MapPin, Clock, X, CheckCircle2, Rocket, Users, MessageSquare, GraduationCap, Layers, Heart, ArrowRight } from 'lucide-react';
import { Skeleton } from '../../components/ui/Skeleton';
import { SEO } from '../../components/ui/SEO';
import { PageHeader } from '../../components/ui/PageHeader';
import { SectionTitle } from '../../components/ui/SectionTitle';
import { ScrollReveal } from '../../components/ui/ScrollReveal';

const EMPTY_FORM = {
  applicant_name: '',
  email: '',
  phone: '',
  telegram_username: '',
  resume_url: '',
  portfolio_url: '',
  linkedin_url: '',
  github_url: '',
  cover_letter: '',
};

const PERKS = [
  { icon: Rocket, title: 'Work that ships', body: 'Small teams, short cycles and real users. What you build goes live, not into a drawer.' },
  { icon: Users, title: 'A small, senior team', body: 'Learn next to experienced engineers and designers who care about the craft.' },
  { icon: Layers, title: 'Real ownership', body: 'You own features end to end, from the first idea through to production.' },
  { icon: GraduationCap, title: 'Room to grow', body: 'We make time for learning, and we back people moving into bigger responsibilities.' },
  { icon: MessageSquare, title: 'Straight feedback', body: 'Honest, kind and regular. You always know where you stand and how to improve.' },
  { icon: Heart, title: 'Respect for people', body: 'We work hard, we are decent to each other, and we treat clients the same way.' },
];

const HIRING = [
  { title: 'Apply', body: 'Send your CV and a few lines about what you have built. Links beat long letters.' },
  { title: 'Intro chat', body: 'A relaxed conversation about your work, what you enjoy and what you want next.' },
  { title: 'Practical task', body: 'A small, paid-for-your-time style exercise close to real work. No whiteboard riddles.' },
  { title: 'Meet the team', body: 'Talk with the people you would work with, then we decide quickly and tell you either way.' },
];

export const CareersPage: React.FC = () => {
  const { data: allCareers = [], loading } = useApiData<any[]>('/careers');
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const careers = useMemo(() => {
    const now = Date.now();
    return allCareers.filter((j: any) => {
      if (j.status !== 'open') return false;
      if (j.expire_date && new Date(j.expire_date + 'T23:59:59').getTime() < now) return false;
      return true;
    });
  }, [allCareers]);

  const handleApply = (job: any) => {
    setSelectedJob(job);
    setSuccess(false);
    setFormData(EMPTY_FORM);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await api.post('/applications', { ...formData, career_id: selectedJob.id });
      if (res.success) setSuccess(true);
    } catch (err) {
      console.error(err);
      alert('Failed to submit application.');
    } finally {
      setSubmitting(false);
    }
  };

  const setField = (key: keyof typeof EMPTY_FORM) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [key]: e.target.value });

  return (
    <>
      <SEO
        title="Careers | NilePixel Technologies"
        description="Join the NilePixel Technologies team. We are hiring top software engineering and design talent to build the future of tech in Africa."
        url="https://nilepixel.et/careers"
      />

      <PageHeader
        eyebrow="Careers"
        title="Join NilePixel Technologies"
        description="We're building the next generation of cloud software and AI across Africa. Come build it with us."
      />

      <section className="section">
        <div className="container-page max-w-4xl space-y-4">
          {loading ? (
            [1, 2, 3].map((i) => (
              <div key={i} className="card flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center">
                <div className="w-full space-y-3 sm:w-3/4">
                  <Skeleton variant="text" width="40%" height="20px" />
                  <Skeleton variant="text" width="60%" height="14px" />
                  <Skeleton variant="text" height="14px" />
                </div>
                <Skeleton className="h-11 w-full sm:w-32" />
              </div>
            ))
          ) : careers.length === 0 ? (
            <div className="card p-12 text-center">
              <h2 className="text-lg font-semibold text-ink">No open roles right now</h2>
              <p className="mt-2 text-sm text-body">Please check back later or follow us on LinkedIn for updates.</p>
            </div>
          ) : (
            careers.map((job) => (
              <div
                key={job.id}
                className="card card-hover flex flex-col justify-between gap-5 p-6 sm:flex-row sm:items-center sm:p-7"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-lg font-semibold text-ink">{job.job_title}</h2>
                    <span className="tag !border-accent/30 !bg-accent-soft !text-accent">{job.department}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[13px] text-muted">
                    <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {job.location}</span>
                    <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {job.employment_type}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-body">{job.description}</p>
                </div>
                <button onClick={() => handleApply(job)} className="btn-primary shrink-0 self-start sm:self-center">
                  Apply now
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="section bg-surface">
        <ScrollReveal className="container-page space-y-12">
          <SectionTitle eyebrow="Life at NilePixel" title="Why people like working here" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PERKS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="card card-hover group bg-white p-6 sm:p-7">
                <span className="icon-badge group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{body}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <section className="section">
        <ScrollReveal className="container-page space-y-12">
          <SectionTitle eyebrow="How we hire" title="Four steps, no surprises" />
          <ol className="grid gap-5 md:grid-cols-4">
            {HIRING.map((h, i) => (
              <li key={h.title} className="group rounded-2xl border border-line p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card">
                <p className="text-4xl font-extrabold leading-none text-rust-gradient">0{i + 1}</p>
                <h3 className="mt-4 text-base font-semibold text-ink">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{h.body}</p>
              </li>
            ))}
          </ol>
          <div className="rounded-2xl bg-night p-7 text-center text-white sm:p-10">
            <p className="text-xl font-semibold">Don't see the right role?</p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-white/70">
              We are always glad to hear from talented engineers and designers. Tell us what you do best.
            </p>
            <a href="mailto:contact@nilepixel.et?subject=Open%20application" className="btn-primary mt-6 !rounded-full">
              Send an open application <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* Application modal */}
      {selectedJob && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-night/60 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Apply for ${selectedJob.job_title}`}
        >
          <div className="relative max-h-[90vh] w-full max-w-2xl space-y-6 overflow-y-auto rounded-2xl bg-white p-6 shadow-lift sm:p-8">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute right-5 top-5 rounded-lg p-1.5 text-muted hover:bg-surface hover:text-ink"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="pr-8">
              <h2 className="text-2xl font-semibold text-ink">Apply for {selectedJob.job_title}</h2>
              <p className="mt-1 text-sm text-accent">
                {selectedJob.location} • {selectedJob.employment_type}
              </p>
            </div>

            {success ? (
              <div className="space-y-3 rounded-xl border border-accent/25 bg-accent-soft/60 p-8 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-accent" />
                <h3 className="text-xl font-semibold text-ink">Application received!</h3>
                <p className="text-sm text-body">
                  Thank you for applying. Our talent team will review your application and be in touch soon.
                </p>
                <button onClick={() => setSelectedJob(null)} className="btn-secondary mt-3">
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="field-label">Full name *</label>
                    <input required type="text" value={formData.applicant_name} onChange={setField('applicant_name')} className="field" />
                  </div>
                  <div>
                    <label className="field-label">Email address *</label>
                    <input required type="email" value={formData.email} onChange={setField('email')} className="field" />
                  </div>
                  <div>
                    <label className="field-label">Phone number</label>
                    <input type="tel" value={formData.phone} onChange={setField('phone')} className="field" />
                  </div>
                  <div>
                    <label className="field-label">Telegram username</label>
                    <input type="text" placeholder="@username" value={formData.telegram_username} onChange={setField('telegram_username')} className="field" />
                  </div>
                  <div>
                    <label className="field-label">Resume / CV URL *</label>
                    <input required type="url" placeholder="Google Drive, Dropbox, etc." value={formData.resume_url} onChange={setField('resume_url')} className="field" />
                  </div>
                  <div>
                    <label className="field-label">Portfolio URL</label>
                    <input type="url" value={formData.portfolio_url} onChange={setField('portfolio_url')} className="field" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="field-label">LinkedIn profile</label>
                    <input type="url" value={formData.linkedin_url} onChange={setField('linkedin_url')} className="field" />
                  </div>
                </div>

                <div>
                  <label className="field-label">Cover letter / notes</label>
                  <textarea
                    rows={4}
                    value={formData.cover_letter}
                    onChange={setField('cover_letter')}
                    placeholder="Tell us why you're a great fit…"
                    className="field resize-y"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={() => setSelectedJob(null)} className="btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" disabled={submitting} className="btn-primary">
                    {submitting ? 'Submitting…' : 'Submit application'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
