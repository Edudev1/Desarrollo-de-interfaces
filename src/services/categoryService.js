import { getToken } from './authService'

const API_BASE = 'http://localhost:8000/api/v1'

function buildImageUrl(path) {
  if (!path) return null
  if (path.startsWith('http')) return path
  return `http://localhost:8000${path}`
}

function mapCategory(category) {
  return {
    id: Number(category.id ?? category.categoryId),
    name: category.name ?? category.categoryName,
    description: category.description ?? category.categoryDescription,
    image: buildImageUrl(category.image ?? category.categoryImage),
  }
}

export async function getCategories() {
  const token = getToken()

  const response = await fetch(`${API_BASE}/categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Error al cargar categorías')
  }

  const data = await response.json()
  return data.map(mapCategory)
}