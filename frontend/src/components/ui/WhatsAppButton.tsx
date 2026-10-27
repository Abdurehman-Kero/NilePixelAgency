import React from 'react';
import { WHATSAPP_URL } from '../../hooks/useApiData';
import { WhatsAppIcon } from './WhatsAppIcon';

/** Floating chat shortcut shown on every public page. */
export const WhatsAppButton: React.FC = () => (
  <a
    href={WHATSAPP_URL}
    target="_blank"
    rel="noreferrer"
    aria-label="Chat with us on WhatsApp"
    className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition duration-300 hover:scale-110 hover:shadow-xl sm:bottom-6 sm:right-6"
  >
    <WhatsAppIcon className="h-7 w-7" />
  </a>
);
