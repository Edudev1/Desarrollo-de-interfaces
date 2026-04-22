const KEY = 'gex-favorites'

export function getFavorites() {
  return JSON.parse(localStorage.getItem(KEY) || '[]')
}

export function saveFavorites(favorites) {
  localStorage.setItem(KEY, JSON.stringify(favorites))
}

export function addFavorite(product) {
  const favorites = getFavorites()
  const exists = favorites.some((p) => p.id === product.id)
  if (!exists) {
    favorites.push(product)
    saveFavorites(favorites)
  }
}

export function removeFavorite(id) {
  const favorites = getFavorites().filter((p) => p.id !== id)
  saveFavorites(favorites)
}