<script setup>
import ProductCard from './ProductCard.vue'

defineProps({
  products: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <v-row class="product-grid">
    <v-col
      v-for="product in products"
      :key="product.id"
      cols="12"
      sm="6"
      xl="4"
    >
      <ProductCard :product="product" />
    </v-col>
  </v-row>
</template>

<style scoped>
.product-grid {
  row-gap: 12px;
}
</style>