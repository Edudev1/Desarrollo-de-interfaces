<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import LoadingState from '../components/common/LoadingState.vue'
import ErrorState from '../components/common/ErrorState.vue'
import { getProductById } from '../services/productService'
import { addFavorite } from '../services/favoriteService'

const route = useRoute()
const product = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    loading.value = true
    error.value = null
    product.value = await getProductById(route.params.id)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})

const finalPrice = computed(() => {
  if (!product.value) return '0.00'
  return (product.value.price * (1 - product.value.discount / 100)).toFixed(2)
})

function handleFavorite() {
  if (product.value) addFavorite(product.value)
}
</script>

<template>
  <v-container class="py-10">
    <LoadingState v-if="loading" />
    <ErrorState v-else-if="error" :message="error" />

    <v-row v-else-if="product" class="detail-wrap">
      <v-col cols="12" md="5">
        <v-card rounded="xl" elevation="4" class="pa-3">
          <v-img
            :src="product.image || 'https://placehold.co/600x400/f5f5f7/1F1A40?text=No+Image'"
            :alt="product.name"
            height="460"
            cover
            class="rounded-xl"
          />
        </v-card>
      </v-col>

      <v-col cols="12" md="7">
        <p class="detail-kicker">DETALLE DE PRODUCTO</p>
        <h1 class="detail-title">{{ product.name }}</h1>
        <p class="detail-description">{{ product.description }}</p>

        <div class="mb-4 d-flex ga-2 flex-wrap">
          <v-chip
            v-for="category in product.categories"
            :key="category.id"
            color="primary"
            variant="tonal"
          >
            {{ category.name }}
          </v-chip>
        </div>

        <v-card rounded="xl" elevation="2" class="pa-5 info-box">
          <div class="info-row"><strong>Marca:</strong> {{ product.brand?.name || 'Sin marca' }}</div>
          <div class="info-row"><strong>EAN:</strong> {{ product.ean }}</div>
          <div class="info-row"><strong>Precio original:</strong> {{ product.price.toFixed(2) }} €</div>
          <div class="info-row"><strong>Descuento:</strong> {{ product.discount }}%</div>
          <div class="final-price-row"><strong>Precio final:</strong> {{ finalPrice }} €</div>
        </v-card>

        <div class="d-flex ga-3 mt-6 flex-wrap">
          <v-btn color="primary" size="large" rounded="xl" @click="handleFavorite">
            Añadir a favoritos
          </v-btn>
          <v-btn variant="outlined" color="secondary" size="large" rounded="xl" to="/productos">
            Volver
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.detail-kicker {
  color: #6D3BD9;
  font-weight: 700;
  letter-spacing: 1.3px;
  margin-bottom: 10px;
}

.detail-title {
  margin-bottom: 16px;
}

.detail-description {
  color: #666;
  font-size: 1.02rem;
  line-height: 1.75;
  margin-bottom: 24px;
}

.info-box {
  border: 1px solid rgba(109, 59, 217, 0.08);
}

.info-row {
  color: #444;
  margin-bottom: 12px;
}

.final-price-row {
  color: #1F1A40;
  font-size: 1.25rem;
  font-weight: 800;
  margin-top: 8px;
}
</style>