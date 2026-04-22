<script setup>
import { ref, onMounted } from 'vue'
import FavoriteCard from '../components/favorites/FavoriteCard.vue'
import EmptyState from '../components/common/EmptyState.vue'
import { getFavorites } from '../services/favoriteService'

const favorites = ref([])

onMounted(() => {
  favorites.value = getFavorites()
})
</script>

<template>
  <v-container class="py-10">
    <p class="text-overline" style="color:#6D3BD9;">MIS FAVORITOS</p>
    <h1 class="text-h3 mb-6">Favoritos</h1>

    <EmptyState
      v-if="favorites.length === 0"
      title="No tienes favoritos"
      text="Añade productos desde el catálogo o el detalle."
    />

    <v-row v-else>
      <v-col
        v-for="product in favorites"
        :key="product.id"
        cols="12"
        md="6"
        lg="4"
      >
        <FavoriteCard :product="product" />
      </v-col>
    </v-row>
  </v-container>
</template>