import { apiRequest } from './api';
import snapshot from '../data/snapshot.json';

/**
 * Stale-while-revalidate cache for the public site's read-only data.
 *
 * Lookup order: memory -> localStorage -> build-time snapshot. The UI renders
 * from whichever has data right away, then a background request refreshes it.
 * A sleeping backend (cold start) therefore never blocks first paint.
 */

type Entry = { t: number; data: unknown };

const STORAGE_PREFIX = 'np:v1:';
const FRESH_MS = 2 * 60 * 1000;
const REQUEST_TIMEOUT_MS = 70 * 1000;

const memory = new Map<string, Entry>();
const inflight = new Map<string, Promise<unknown>>();
const listeners = new Map<string, Set<(data: unknown) => void>>();

const seed = snapshot as Record<string, unknown>;

const readStorage = (key: string): Entry | undefined => {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    return raw ? (JSON.parse(raw) as Entry) : undefined;
  } catch {
    return undefined;
  }
};

const writeStorage = (key: string, entry: Entry) => {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(entry));
  } catch {
    /* storage full or unavailable: memory cache still works */
  }
};

const entryFor = (key: string): Entry | undefined => memory.get(key) ?? readStorage(key);

/** Best data available right now, without any network. */
export function peek<T>(key: string): T | undefined {
  const entry = entryFor(key);
  if (entry) {
    memory.set(key, entry);
    return entry.data as T;
  }
  return seed[key] as T | undefined;
}

export const isFresh = (key: string): boolean => {
  const entry = entryFor(key);
  return !!entry && Date.now() - entry.t < FRESH_MS;
};

export function subscribe(key: string, fn: (data: unknown) => void): () => void {
  if (!listeners.has(key)) listeners.set(key, new Set());
  listeners.get(key)!.add(fn);
  return () => listeners.get(key)?.delete(fn);
}

/** Fetch from the API, de-duplicating concurrent calls and updating every cache layer. */
export function refresh<T>(key: string): Promise<T | undefined> {
  const pending = inflight.get(key);
  if (pending) return pending as Promise<T | undefined>;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  const request = apiRequest(key, { method: 'GET', signal: controller.signal })
    .then((res) => {
      if (!res?.success || res.data == null) return peek<T>(key);
      const entry: Entry = { t: Date.now(), data: res.data };
      memory.set(key, entry);
      writeStorage(key, entry);
      listeners.get(key)?.forEach((fn) => fn(res.data));
      return res.data as T;
    })
    .catch(() => peek<T>(key))
    .finally(() => {
      clearTimeout(timer);
      inflight.delete(key);
    });

  inflight.set(key, request);
  return request;
}

const PUBLIC_KEYS = ['/settings', '/projects', '/testimonials', '/careers', '/blog'];

/** Kick off every public request before React mounts, so the server wakes up as early as possible. */
export function prefetchPublicData() {
  PUBLIC_KEYS.forEach((key) => {
    if (!isFresh(key)) void refresh(key);
  });
}

/** Free-tier hosts sleep when idle; a light ping while a tab is open keeps navigation snappy. */
export function keepBackendWarm(everyMs = 9 * 60 * 1000) {
  setInterval(() => {
    if (document.visibilityState === 'visible') void refresh('/settings');
  }, everyMs);
}
