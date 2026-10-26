import type { Block } from '../data/posts';

/** Technology names from either the CMS `technologies` array/JSON string or a comma-separated `tags` string. */
export function techNames(p: any): string[] {
  let tech = p?.technologies;
  if (typeof tech === 'string') {
    try {
      tech = JSON.parse(tech);
    } catch {
      tech = [];
    }
  }
  if (Array.isArray(tech) && tech.length > 0) {
    return tech.map((t: any) => (typeof t === 'string' ? t : t?.name)).filter(Boolean);
  }
  return typeof p?.tags === 'string' ? p.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [];
}

/** Minimal markdown (## headings, - lists, > quotes, blank-line paragraphs) to article blocks. */
export function markdownToBlocks(md: string): Block[] {
  const blocks: Block[] = [];
  let list: string[] = [];
  const flush = () => {
    if (list.length) blocks.push({ type: 'ul', items: list });
    list = [];
  };
  for (const raw of (md || '').split('\n')) {
    const line = raw.trim();
    if (!line) {
      flush();
    } else if (/^#{1,3}\s/.test(line)) {
      flush();
      blocks.push({ type: 'h2', text: line.replace(/^#{1,3}\s+/, '') });
    } else if (/^[-*]\s+/.test(line)) {
      list.push(line.replace(/^[-*]\s+/, ''));
    } else if (line.startsWith('> ')) {
      flush();
      blocks.push({ type: 'quote', text: line.slice(2) });
    } else {
      flush();
      blocks.push({ type: 'p', text: line });
    }
  }
  flush();
  return blocks;
}

export const projectSummary = (p: any): string => p?.short_description || p?.summary || p?.description || '';
