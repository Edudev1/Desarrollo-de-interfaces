<script setup>
import { computed, ref } from 'vue'
import {
  isFavorite,
  addFavorite,
  removeFavorite,
  getFavoriteRating,
  setFavoriteWithRating,
} from '../../services/favoriteService'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const snackbar = ref(false)
const snackbarText = ref('')
const ratingDialog = ref(false)

const favorite = ref(isFavorite(props.product.id))
const rating = ref(getFavoriteRating(props.product.id) || 3)

const finalPrice = computed(() => {
  return (props.product.price * (1 - props.product.discount / 100)).toFixed(2)
})

function handleFavorite() {
  if (favorite.value) {
    removeFavorite(props.product.id)
    favorite.value = false
    snackbarText.value = 'Eliminado de favoritos'
  } else {
    addFavorite(props.product)
    favorite.value = true
    snackbarText.value = 'Añadido a favoritos'
  }

  snackbar.value = true
}

function openRatingDialog() {
  ratingDialog.value = true
}

function saveRating() {
  setFavoriteWithRating(props.product, rating.value)
  favorite.value = true
  snackbarText.value = `Valoración guardada: ${rating.value}/5`
  snackbar.value = true
  ratingDialog.value = false
}
</script>

<template>
  <div>
    <v-card rounded="xl" elevation="4" class="product-card h-100 d-flex flex-column">
      <div class="image-wrapper">
        <v-img :src="product.image" :alt="product.name" height="200" cover />

        <v-chip v-if="product.discount > 0" class="discount-badge" color="primary" variant="flat">
          -{{ product.discount }}%
        </v-chip>
      </div>

      <v-card-item class="pb-2">
        <v-card-title class="product-title">
          {{ product.name }}
        </v-card-title>
        <v-card-subtitle class="product-brand">
          {{ product.brand?.name || 'Sin marca' }}
        </v-card-subtitle>
      </v-card-item>

      <v-card-text class="product-body flex-grow-1 d-flex flex-column">
        <div class="chips-row mb-3">
          <v-chip
            v-for="category in product.categories"
            :key="category.id"
            size="small"
            color="primary"
            variant="tonal"
            class="mr-2 mb-2"
          >
            {{ category.name }}
          </v-chip>
        </div>

        <p class="product-description">
          {{ product.description }}
        </p>

        <div class="rating-preview mb-3">
          <v-rating
            :model-value="visibleRating"
            color="primary"
            active-color="primary"
            readonly
            size="small"
            density="compact"
          />
        </div>

        <div class="price-box mt-auto">
          <div class="original-price">{{ product.price.toFixed(2) }} €</div>
          <div class="final-price">{{ finalPrice }} €</div>
        </div>
      </v-card-text>

      <v-card-actions class="pa-4 pt-0 actions-row">
        <v-btn
          color="primary"
          variant="flat"
          rounded="pill"
          class="gex-btn"
          :to="`/producto/${product.id}`"
        >
          Ver ficha
        </v-btn>

        <v-btn
          :color="favorite ? 'primary' : 'secondary'"
          :variant="favorite ? 'flat' : 'tonal'"
          rounded="pill"
          class="gex-btn"
          :prepend-icon="favorite ? 'mdi-heart' : 'mdi-heart-outline'"
          @click="handleFavorite"
        >
          {{ favorite ? 'Guardado' : 'Favorito' }}
        </v-btn>

        <v-btn
          color="secondary"
          variant="outlined"
          rounded="pill"
          class="gex-btn"
          prepend-icon="mdi-star-outline"
          @click="openRatingDialog"
        >
          Valorar
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="ratingDialog" max-width="420">
      <v-card rounded="xl">
        <v-card-title class="pt-5">Valorar producto</v-card-title>

        <v-card-text>
          <p class="mb-4">
            ¿Cuánto te gusta <strong>{{ product.name }}</strong
            >?
          </p>

          <div class="d-flex flex-column align-center">
            <v-rating v-model="rating" color="primary" active-color="primary" size="large" hover />
            <div class="mt-2 rating-label">{{ rating }} / 5 estrellas</div>
          </div>
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn variant="text" @click="ratingDialog = false">Cancelar</v-btn>
          <v-btn color="primary" variant="flat" rounded="pill" @click="saveRating">
            Guardar valoración
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" timeout="1800" color="primary">
      {{ snackbarText }}
    </v-snackbar>
  </div>
</template>

<style scoped>
.product-card {
  overflow: hidden;
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease;
  height: 100%;
}
.rating-preview {
  min-height: 24px;
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 34px rgba(31, 26, 64, 0.14) !important;
}

.image-wrapper {
  position: relative;
}

.discount-badge {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 2;
  font-weight: 700;
}

.product-title {
  white-space: normal;
  line-height: 1.2;
  min-height: 42px;
  font-size: 1rem;
}

.product-brand {
  color: #6d3bd9 !important;
  font-weight: 600;
}

.product-body {
  min-height: 145px;
}

.chips-row {
  min-height: 30px;
}

.product-description {
  color: #666;
  line-height: 1.45;
  min-height: 42px;
  max-height: 42px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 10px;
}

.price-box {
  display: flex;
  align-items: end;
  gap: 12px;
  min-height: 32px;
}

.original-price {
  color: #8b8b8b;
  text-decoration: line-through;
  font-size: 0.9rem;
}

.final-price {
  color: #1f1a40;
  font-size: 1.25rem;
  font-weight: 800;
}

.actions-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.gex-btn {
  font-weight: 700;
}

.rating-label {
  color: #666;
  font-weight: 600;
}
</style>
