<script setup>
import { computed, ref, onMounted } from 'vue'
import FavoriteCard from '../components/favorites/FavoriteCard.vue'
import EmptyState from '../components/common/EmptyState.vue'
import { getFavorites, removeFavorite } from '../services/favoriteService'

const favorites = ref([])
const snackbar = ref(false)
const sortBy = ref('rating-desc')

function loadFavorites() {
  favorites.value = getFavorites()
}

onMounted(() => {
  loadFavorites()
})

const sortedFavorites = computed(() => {
  const list = [...favorites.value]

  switch (sortBy.value) {
    case 'rating-desc':
      return list.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    case 'rating-asc':
      return list.sort((a, b) => (a.rating || 0) - (b.rating || 0))
    case 'name-asc':
      return list.sort((a, b) => a.name.localeCompare(b.name))
    case 'latest':
      return list.sort((a, b) => (b.savedAt || 0) - (a.savedAt || 0))
    default:
      return list
  }
})

const favoritesCount = computed(() => favorites.value.length)

function handleRemove(id) {
  removeFavorite(id)
  loadFavorites()
  snackbar.value = true
}
</script>

<template>
  <v-container class="py-10">
    <section class="favorites-hero mb-6">
      <p class="favorites-kicker">MIS FAVORITOS</p>
      <h1 class="favorites-title">Tu selección guardada</h1>
      <p class="favorites-text">
        Ordena tus favoritos por valoración, nombre o últimos añadidos.
      </p>
    </section>

    <div class="favorites-toolbar mb-6">
      <p class="favorites-counter">
        Total guardados: <strong>{{ favoritesCount }}</strong>
      </p>

      <v-select
        v-model="sortBy"
        :items="[
          { title: 'Más valorados', value: 'rating-desc' },
          { title: 'Menos valorados', value: 'rating-asc' },
          { title: 'Nombre A-Z', value: 'name-asc' },
          { title: 'Últimos añadidos', value: 'latest' }
        ]"
        label="Ordenar por"
        item-title="title"
        item-value="value"
        variant="outlined"
        density="comfortable"
        class="sort-select"
      />
    </div>

    <EmptyState
      v-if="favorites.length === 0"
      title="No tienes favoritos"
      text="Añade productos desde el catálogo o desde el detalle."
    />

    <v-row v-else>
      <v-col
        v-for="product in sortedFavorites"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
      >
        <FavoriteCard
          :product="product"
          @remove="handleRemove"
        />
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar" timeout="1800" color="primary">
      Eliminado de favoritos
    </v-snackbar>
  </v-container>
</template>

<style scoped>
.favorites-hero {
  background: linear-gradient(135deg, #1F1A40 0%, #2D2360 100%);
  border-radius: 28px;
  padding: 34px 38px;
  color: #FAF9F6;
}

.favorites-kicker {
  color: #c9bbf5;
  font-weight: 700;
  letter-spacing: 1.4px;
  margin-bottom: 10px;
}

.favorites-title {
  color: #FAF9F6;
  font-size: 2.4rem;
  line-height: 1.08;
  margin-bottom: 12px;
}

.favorites-text {
  color: #f0ebfb;
  max-width: 760px;
  margin-bottom: 0;
}

.favorites-toolbar {
  background: #fff;
  border-radius: 20px;
  padding: 18px 22px;
  box-shadow: 0 10px 24px rgba(20, 20, 40, 0.05);
  border: 1px solid rgba(109, 59, 217, 0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.favorites-counter {
  margin: 0;
  color: #555;
}

.sort-select {
  max-width: 260px;
}
</style>