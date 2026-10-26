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

/** Company contact details from /settings, falling back to sensible defaults. */
export function useCompany() {
  const { data } = useApiData<{ company?: { email?: string; phone?: string } }>('/settings');
  return {
    email: data?.company?.email || 'info@nilepixel.com',
    phone: data?.company?.phone || '+251982310974',
  };
}
