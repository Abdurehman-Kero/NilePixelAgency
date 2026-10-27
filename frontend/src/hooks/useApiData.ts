import { useEffect, useState } from 'react';
import { isFresh, peek, refresh, subscribe } from '../services/dataCache';

interface Result<T> {
  data: T | undefined;
  /** True only when there is nothing at all to show yet (no cache and no snapshot). */
  loading: boolean;
}

/**
 * Read-only public data with instant paint.
 * Returns cached/snapshot data synchronously and refreshes it in the background.
 */
export function useApiData<T>(key: string): Result<T> {
  const [data, setData] = useState<T | undefined>(() => peek<T>(key));

  useEffect(() => {
    const cached = peek<T>(key);
    if (cached !== undefined) setData(cached);

    const unsubscribe = subscribe(key, (next) => setData(next as T));
    if (!isFresh(key)) void refresh<T>(key);
    return unsubscribe;
  }, [key]);

  return { data, loading: data === undefined };
}

const COMPANY_EMAIL = 'contact@nilepixel.et';
/** WhatsApp chat link for the primary company number. */
export const WHATSAPP_URL = 'https://wa.me/251982310974';
export const TELEGRAM_URL = 'https://t.me/NilePixelTech';
export const REGISTER_URL = 'https://register.nilepixel.et/';
export const FACEBOOK_URL = 'https://web.facebook.com/share/p/1CqWyP3rUF/';

const SECOND_PHONE = '+251941811817';

/** Company contact details: the primary phone comes from /settings, the email and second phone are fixed. */
export function useCompany() {
  const { data } = useApiData<{ company?: { phone?: string } }>('/settings');
  const phone = data?.company?.phone || '+251982310974';
  return {
    email: COMPANY_EMAIL,
    phone,
    phones: [phone, SECOND_PHONE],
  };
}
