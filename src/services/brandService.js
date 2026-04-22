import { getProducts } from './productService'

export async function getBrands() {
  const products = await getProducts()

  const brandMap = new Map()

  products.forEach((product) => {
    if (product.brand && !brandMap.has(product.brand.id)) {
      brandMap.set(product.brand.id, product.brand)
    }
  })

  return Array.from(brandMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  )
}