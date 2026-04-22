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
  <v-card rounded="xl" elevation="4" class="pa-4 side-menu">
    <v-card-title class="px-0 side-title">Búsqueda y filtros</v-card-title>
    <p class="side-subtitle mb-4">
      Refina el catálogo por nombre, categoría, marca y precio.
    </p>

    <v-card-text class="px-0">
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
    </v-card-text>
  </v-card>
</template>

<style scoped>
.side-menu {
  position: sticky;
  top: 110px;
  border: 1px solid rgba(109, 59, 217, 0.08);
}

.side-title {
  color: #1F1A40;
  font-weight: 800;
}

.side-subtitle {
  color: #666;
  line-height: 1.6;
}

.price-label {
  color: #555;
  font-weight: 600;
}
</style>