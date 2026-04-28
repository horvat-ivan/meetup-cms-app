const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000';

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: 'draft' | 'published';
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) throw new Error(`API error ${res.status}: ${await res.text()}`);
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const api = {
  list: () => request<Article[]>('/articles'),
  get: (id: string) => request<Article>(`/articles/${id}`),
  create: (body: Partial<Article>) =>
    request<Article>('/articles', { method: 'POST', body: JSON.stringify(body) }),
  update: (id: string, body: Partial<Article>) =>
    request<Article>(`/articles/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  remove: (id: string) => request<void>(`/articles/${id}`, { method: 'DELETE' }),
};
