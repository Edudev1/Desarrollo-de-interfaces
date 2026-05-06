<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['remove'])
</script>

<template>
  <v-card rounded="xl" elevation="3" class="favorite-card h-100 d-flex flex-column">
    <v-img
      :src="product.image"
      :alt="product.name"
      height="220"
      cover
    />

    <v-card-item>
      <v-card-title>{{ product.name }}</v-card-title>
      <v-card-subtitle>{{ product.brand?.name || 'Sin marca' }}</v-card-subtitle>
    </v-card-item>

    <v-card-text class="flex-grow-1">
      <div class="d-flex ga-2 flex-wrap mb-3">
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

      <div class="mb-3">
        <v-rating
          :model-value="product.rating || 0"
          color="primary"
          active-color="primary"
          readonly
          size="small"
        />
      </div>

      <p class="favorite-price">
        {{ (product.price * (1 - product.discount / 100)).toFixed(2) }} €
      </p>
    </v-card-text>

    <v-card-actions class="pa-4 pt-0 d-flex ga-2">
      <v-btn color="primary" rounded="pill" :to="`/producto/${product.id}`">
        Ver ficha
      </v-btn>
      <v-btn
        color="error"
        variant="tonal"
        rounded="pill"
        prepend-icon="mdi-delete-outline"
        @click="emit('remove', product.id)"
      >
        Quitar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.favorite-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.favorite-card:hover {
  transform: translateY(-4px);
}

.favorite-price {
  font-size: 1.25rem;
  font-weight: 800;
  color: #1F1A40;
  margin: 0;
}
</style>