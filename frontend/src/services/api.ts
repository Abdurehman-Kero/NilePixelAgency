const API_BASE_URL = '/api/v1';

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('admin_token');
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    return { success: false, message: data.message || 'API request failed', data: null, status: response.status };
  }
  return data;
}

export const api = {
  get: (endpoint: string) => apiRequest(endpoint, { method: 'GET' }),
  post: (endpoint: string, data: any) =>
    apiRequest(endpoint, {
      method: 'POST',
      body: data instanceof FormData ? data : JSON.stringify(data),
    }),
  put: (endpoint: string, data: any) =>
    apiRequest(endpoint, {
      method: 'PUT',
      body: data instanceof FormData ? data : JSON.stringify(data),
    }),
  delete: (endpoint: string) => apiRequest(endpoint, { method: 'DELETE' }),
};
