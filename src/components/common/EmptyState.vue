<script setup>
defineProps({
  title: {
    type: String,
    default: 'No hay resultados',
  },
  text: {
    type: String,
    default: 'Prueba con otros filtros o términos de búsqueda.',
  },
})
</script>

<template>
  <v-card rounded="xl" elevation="1" class="pa-8 text-center">
    <v-icon size="48" color="primary">mdi-folder-search-outline</v-icon>
    <h3 class="mt-4">{{ title }}</h3>
    <p>{{ text }}</p>
  </v-card>
</template>