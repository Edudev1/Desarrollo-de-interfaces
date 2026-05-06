const KEY = 'gex-favorites'

export function getFavorites() {
  return JSON.parse(localStorage.getItem(KEY) || '[]')
}

export function saveFavorites(favorites) {
  localStorage.setItem(KEY, JSON.stringify(favorites))
}

export function isFavorite(id) {
  return getFavorites().some((p) => p.id === id)
}

export function getFavoriteRating(id) {
  const fav = getFavorites().find((p) => p.id === id)
  return fav?.rating ?? 0
}

export function addFavorite(product) {
  const favorites = getFavorites()
  const index = favorites.findIndex((p) => p.id === product.id)

  if (index === -1) {
    favorites.push({
      ...product,
      rating: 0,
      savedAt: Date.now(),
    })
    saveFavorites(favorites)
  }
}

export function setFavoriteWithRating(product, rating) {
  const favorites = getFavorites()
  const index = favorites.findIndex((p) => p.id === product.id)

  if (index >= 0) {
    favorites[index] = {
      ...favorites[index],
      rating,
    }
  } else {
    favorites.push({
      ...product,
      rating,
      savedAt: Date.now(),
    })
  }

  saveFavorites(favorites)
}

export function removeFavorite(id) {
  const favorites = getFavorites().filter((p) => p.id !== id)
  saveFavorites(favorites)
}

export function clearFavorites() {
  localStorage.removeItem(KEY)
}