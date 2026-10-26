import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/ui/PageHeader';

interface Section {
  title: string;
  body: string[];
}

const LegalLayout: React.FC<{ title: string; intro: string; sections: Section[] }> = ({ title, intro, sections }) => (
  <>
    <PageHeader eyebrow="Legal" title={title} description="Last updated: August 2026" />
    <section className="section pt-2 sm:pt-6">
      <div className="container-page grid max-w-5xl gap-10 lg:grid-cols-[14rem_1fr] lg:gap-14">
        <nav aria-label="On this page" className="hidden lg:block">
          <ul className="sticky top-28 space-y-3 border-l border-line pl-5 text-sm">
            {sections.map((s) => (
              <li key={s.title}>
                <a href={`#${s.title.toLowerCase().replace(/\W+/g, '-')}`} className="text-body transition-colors hover:text-accent">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-10">
          <p className="text-lg leading-8 text-body">{intro}</p>
          {sections.map((s) => (
            <div key={s.title} id={s.title.toLowerCase().replace(/\W+/g, '-')} className="scroll-mt-28 space-y-3">
              <h2 className="text-2xl font-semibold tracking-tight text-ink">{s.title}</h2>
              {s.body.map((p, i) => (
                <p key={i} className="text-base leading-8 text-body">{p}</p>
              ))}
            </div>
          ))}
          <p className="border-t border-line pt-6 text-sm text-muted">
            Questions about this page? <Link to="/contact" className="font-semibold text-accent hover:underline">Contact us</Link>.
          </p>
        </div>
      </div>
    </section>
  </>
);

export const PrivacyPolicy: React.FC = () => (
  <LegalLayout
    title="Privacy Policy"
    intro="NilePixel Technologies respects your privacy. We collect only the information needed to respond to you and to deliver our services, and we do not sell your data."
    sections={[
      { title: 'What we collect', body: ['Information you give us directly, such as your name, email address, phone number, company and the details of your project when you contact us or apply for a role.', 'Basic technical data such as browser type and pages visited, used to keep the site secure and working well.'] },
      { title: 'How we use it', body: ['To reply to your enquiries, prepare proposals, deliver and support the services you ask for, and to process job applications.', 'We do not use your information for unrelated marketing without your consent.'] },
      { title: 'Data security', body: ['Client information, uploaded files and server communications are protected with industry-standard encryption in transit, and access is limited to people who need it.'] },
      { title: 'How long we keep it', body: ['We keep enquiry and project information for as long as needed to provide our services and meet legal obligations, then delete or anonymise it.'] },
      { title: 'Your rights', body: ['You can ask to see, correct or delete the personal information we hold about you at any time by contacting us.'] },
    ]}
  />
);

export const TermsOfService: React.FC = () => (
  <LegalLayout
    title="Terms of Service"
    intro="Welcome to NilePixel Technologies. By using our website or engaging our services, you agree to the terms below. Individual projects may also be covered by a signed agreement, which takes priority."
    sections={[
      { title: 'Our services', body: ['We provide software design, development, consulting and support. The scope, timeline and fees for each engagement are set out in a written proposal or agreement.'] },
      { title: 'Payments', body: ['Fees are invoiced according to the milestones in your agreement. Late payments may pause work until the account is settled.'] },
      { title: 'Intellectual property', body: ['On full payment, you own the deliverables created specifically for you. We retain ownership of our pre-existing tools, libraries and know-how, and grant you the rights needed to use them with your product.'] },
      { title: 'Confidentiality', body: ['We treat your business information as confidential and use it only to deliver the services you have engaged us for.'] },
      { title: 'Limitation of liability', body: ['We work carefully and test thoroughly, but software cannot be guaranteed to be free of every defect. Our liability is limited to the fees paid for the relevant engagement, to the extent permitted by law.'] },
    ]}
  />
);
