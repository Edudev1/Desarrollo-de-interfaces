import { getToken } from './authService'
import {
  resolveProductImage,
  resolveBrandImage,
  resolveCategoryImage,
} from './imageService'

const API_BASE = 'http://localhost:8000/api/v1'

function mapCategory(category) {
  return {
    id: Number(category.id),
    name: category.name,
    description: category.description,
    image: resolveCategoryImage(category.image),
  }
}

function mapBrand(brand) {
  if (!brand) return null

  return {
    id: brand.brandId,
    name: brand.brandName,
    description: brand.brandDescription,
    image: resolveBrandImage(brand.brandImage),
  }
}

function mapProduct(product) {
  return {
    id: product.productId,
    ean: product.productEan,
    name: product.productName,
    description: product.productDescription,
    image: resolveProductImage(product.productImage),
    price: product.productPrice,
    discount: product.productDiscount ?? 0,
    brand: mapBrand(product.brand),
    categories: (product.categories || []).map(mapCategory),
  }
}

export async function getProducts() {
  const token = getToken()

  const response = await fetch(`${API_BASE}/products`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Error al cargar productos')
  }

  const data = await response.json()
  return data.map(mapProduct)
}

export async function getProductById(id) {
  const token = getToken()

  const response = await fetch(`${API_BASE}/products/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Error al cargar el producto')
  }

  const data = await response.json()
  return mapProduct(data)
}