<script setup>
defineProps({
  categories: {
    type: Array,
    required: true,
  },
  brands: {
    type: Array,
    required: true,
  },
  selectedCategory: {
    type: [String, Number],
    default: '',
  },
  selectedBrand: {
    type: [String, Number],
    default: '',
  },
  maxPrice: {
    type: Number,
    default: 100,
  },
})

const emit = defineEmits([
  'update-category',
  'update-brand',
  'update-max-price',
])
</script>

<template>
  <v-card rounded="xl" elevation="3" color="surface" class="pa-4 filter-card">
    <v-card-title class="px-0 filter-title">Filtros</v-card-title>

    <v-card-text class="px-0">
      <v-select
        label="Categoría"
        :items="[
          { title: 'Todas', value: '' },
          ...categories.map(c => ({ title: c.name, value: c.id }))
        ]"
        item-title="title"
        item-value="value"
        :model-value="selectedCategory"
        @update:model-value="emit('update-category', $event)"
        variant="outlined"
        class="mb-4"
      />

      <v-select
        label="Marca"
        :items="[
          { title: 'Todas', value: '' },
          ...brands.map(b => ({ title: b.name, value: b.id }))
        ]"
        item-title="title"
        item-value="value"
        :model-value="selectedBrand"
        @update:model-value="emit('update-brand', $event)"
        variant="outlined"
        class="mb-4"
      />

      <div class="price-label mb-2">
        Precio máximo: {{ maxPrice }} €
      </div>

      <v-slider
        :model-value="maxPrice"
        @update:model-value="emit('update-max-price', $event)"
        min="10"
        max="100"
        step="1"
        color="primary"
        thumb-label
      />
    </v-card-text>
  </v-card>
</template>

<style scoped>
.filter-card {
  border: 1px solid #eee;
}

.filter-title {
  color: #1F1A40;
}

.price-label {
  color: #666;
  font-weight: 600;
}
</style>