<script setup>
import { removeFavorite } from '../../services/favoriteService'

const props = defineProps({
  product: Object,
})

function handleRemove() {
  removeFavorite(props.product.id)
  window.location.reload()
}
</script>

<template>
  <v-card rounded="xl" elevation="2">
    <v-card-item>
      <v-card-title>{{ product.name }}</v-card-title>
      <v-card-subtitle>{{ product.brand?.name || 'Sin marca' }}</v-card-subtitle>
    </v-card-item>

    <v-card-actions>
      <v-btn color="primary" :to="`/producto/${product.id}`">Ver detalle</v-btn>
      <v-btn color="error" variant="tonal" @click="handleRemove">Quitar</v-btn>
    </v-card-actions>
  </v-card>
</template>