<script setup>
import { computed, ref } from 'vue'
import { addFavorite, getFavorites } from '../../services/favoriteService'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const snackbar = ref(false)
const isFavorite = ref(
  getFavorites().some((fav) => fav.id === props.product.id)
)

const finalPrice = computed(() => {
  return (props.product.price * (1 - props.product.discount / 100)).toFixed(2)
})

function handleFavorite() {
  addFavorite(props.product)
  isFavorite.value = true
  snackbar.value = true
}
</script>

<template>
  <div>
    <v-card rounded="xl" elevation="4" class="h-100 d-flex flex-column product-card">
      <div class="image-wrapper">
        <v-img
          :src="product.image"
          :alt="product.name"
          height="240"
          cover
        />

        <v-chip
          v-if="product.discount > 0"
          class="discount-badge"
          color="primary"
          variant="flat"
        >
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

      <v-card-text class="flex-grow-1">
        <div class="mb-3 d-flex ga-2 flex-wrap">
          <v-chip
            v-for="category in product.categories"
            :key="category.id"
            size="small"
            color="primary"
            variant="tonal"
          >
            {{ category.name }}
          </v-chip>
        </div>

        <p class="product-description">
          {{ product.description }}
        </p>

        <div class="price-box mt-4">
          <div class="original-price">
            {{ product.price.toFixed(2) }} €
          </div>
          <div class="final-price">
            {{ finalPrice }} €
          </div>
        </div>
      </v-card-text>

      <v-card-actions class="pa-4 pt-0 d-flex ga-2">
        <v-btn
          color="primary"
          variant="flat"
          rounded="xl"
          class="detail-btn"
          :to="`/producto/${product.id}`"
        >
          Ver detalle
        </v-btn>

        <v-btn
          :color="isFavorite ? 'primary' : 'secondary'"
          :variant="isFavorite ? 'flat' : 'tonal'"
          rounded="xl"
          class="favorite-btn"
          :prepend-icon="isFavorite ? 'mdi-heart' : 'mdi-heart-outline'"
          @click="handleFavorite"
        >
          {{ isFavorite ? 'Guardado' : 'Favorito' }}
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-snackbar v-model="snackbar" timeout="1800" color="primary">
      Añadido a favoritos
    </v-snackbar>
  </div>
</template>

<style scoped>
.product-card {
  overflow: hidden;
  transition: transform 0.22s ease, box-shadow 0.22s ease;
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
  line-height: 1.25;
}

.product-brand {
  color: #6D3BD9 !important;
  font-weight: 600;
}

.product-description {
  color: #666;
  line-height: 1.6;
  min-height: 72px;
}

.price-box {
  display: flex;
  align-items: end;
  gap: 12px;
}

.original-price {
  color: #8b8b8b;
  text-decoration: line-through;
  font-size: 0.95rem;
}

.final-price {
  color: #1F1A40;
  font-size: 1.4rem;
  font-weight: 800;
}

.detail-btn,
.favorite-btn {
  transition: all 0.2s ease;
}

.detail-btn:hover,
.favorite-btn:hover {
  transform: translateY(-1px);
}
</style>