<script setup>
defineProps({
  categories: Array,
  brands: Array,
  selectedCategory: [String, Number],
  selectedBrand: [String, Number],
  search: String,
  maxPrice: Number,
  onlyDiscount: Boolean,
})

const emit = defineEmits([
  'update:category',
  'update:brand',
  'update:search',
  'update:maxPrice',
  'update:onlyDiscount',
  'reset',
])
</script>

<template>
  <div>
    <v-text-field
      label="Buscar juego"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      density="comfortable"
      :model-value="search"
      @update:model-value="emit('update:search', $event)"
      class="mb-4"
    />

    <v-select
      label="Categoría"
      :items="[
        { title: 'Todas', value: '' },
        ...categories.map(c => ({ title: c.name, value: c.id }))
      ]"
      item-title="title"
      item-value="value"
      :model-value="selectedCategory"
      @update:model-value="emit('update:category', $event)"
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
      @update:model-value="emit('update:brand', $event)"
      variant="outlined"
      class="mb-4"
    />

    <div class="price-label mb-2">
      Precio máximo: {{ maxPrice }} €
    </div>

    <v-slider
      :model-value="maxPrice"
      @update:model-value="emit('update:maxPrice', $event)"
      min="10"
      max="100"
      step="1"
      color="primary"
      thumb-label
      class="mb-4"
    />

    <v-switch
      label="Solo ofertas"
      color="primary"
      :model-value="onlyDiscount"
      @update:model-value="emit('update:onlyDiscount', $event)"
    />

    <v-btn
      block
      color="secondary"
      variant="tonal"
      class="mt-4"
      rounded="xl"
      @click="emit('reset')"
    >
      Limpiar filtros
    </v-btn>
  </div>
</template>

<style scoped>
.price-label {
  color: #555;
  font-weight: 600;
}
</style>