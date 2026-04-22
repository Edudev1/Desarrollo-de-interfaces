const API_BASE = 'http://localhost:8000/api/v1'

export async function login(credentials) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    throw new Error('Credenciales incorrectas')
  }

  return await response.json()
}

export function saveToken(token) {
  localStorage.setItem('gex-token', token)
}

export function getToken() {
  return localStorage.getItem('gex-token')
}

export function clearToken() {
  localStorage.removeItem('gex-token')
}