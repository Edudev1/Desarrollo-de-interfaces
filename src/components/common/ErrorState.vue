<script setup>
defineProps({
  message: {
    type: String,
    default: 'Ha ocurrido un error',
  },
})
</script>

<template>
  <v-alert type="error" variant="tonal" class="my-6">
    {{ message }}
  </v-alert>
</template>