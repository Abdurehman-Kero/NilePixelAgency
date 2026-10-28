import { useMemo } from 'react';
import { useApiData } from './useApiData';

/** Projects shown first, in this order. Everything else follows in the order the API returns it. */
export const PINNED_PROJECT_SLUGS = ['ht-travel-agency', 'chala-mobile-system'];

export function sortProjects<T extends { slug?: string }>(projects: T[]): T[] {
  const rank = (p: T) => {
    const i = PINNED_PROJECT_SLUGS.indexOf(p.slug ?? '');
    return i === -1 ? PINNED_PROJECT_SLUGS.length : i;
  };
  // Array.prototype.sort is stable, so unpinned projects keep their original relative order.
  return [...projects].sort((a, b) => rank(a) - rank(b));
}

/** The public project list with pinned projects first. */
export function useProjects() {
  const { data, loading } = useApiData<any[]>('/projects');
  const projects = useMemo(() => sortProjects(data ?? []), [data]);
  return { projects, loading };
}
