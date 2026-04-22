const productImages = import.meta.glob('../assets/images/products/*', {
  eager: true,
  import: 'default',
})

const brandImages = import.meta.glob('../assets/images/brands/*', {
  eager: true,
  import: 'default',
})

const categoryImages = import.meta.glob('../assets/images/categories/*', {
  eager: true,
  import: 'default',
})

function getFileName(path) {
  if (!path) return null
  return path.split('/').pop()
}

export function resolveProductImage(path) {
  const fileName = getFileName(path)
  if (!fileName) return productImages['../assets/images/products/imagenGenerica.png'] || null

  return (
    productImages[`../assets/images/products/${fileName}`] ||
    productImages['../assets/images/products/imagenGenerica.png'] ||
    null
  )
}

export function resolveBrandImage(path) {
  const fileName = getFileName(path)
  if (!fileName) return null

  return brandImages[`../assets/images/brands/${fileName}`] || null
}

export function resolveCategoryImage(path) {
  const fileName = getFileName(path)
  if (!fileName) return null

  return categoryImages[`../assets/images/categories/${fileName}`] || null
}