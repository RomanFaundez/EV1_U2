export const API_URL = 'https://backend-react-fcsl.onrender.com/api-backend';

// Lee la sesión guardada al hacer login
export function getSession() {
  const token = localStorage.getItem('token');
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch {
    user = null;
  }
  return { token, user };
}

// Función genérica para llamar a la API
export async function apiRequest(path, { method = 'GET', body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  // Muestra el código HTTP en la consola (lo necesitas para la rúbrica)
  console.log(`${method} ${path} → ${res.status}`);

  const data = res.status === 204 ? null : await res.json().catch(() => null);

  if (!res.ok) {
    const error = new Error(data?.error || `Error HTTP ${res.status}`);
    error.status = res.status;
    throw error;
  }
  return data;
}