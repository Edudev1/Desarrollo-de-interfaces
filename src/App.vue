<script setup>
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
</script>

<template>
  <v-app>
    <AppHeader />
    <v-main class="app-main">
      <router-view />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<style scoped>
.app-main {
  background: #f5f5f7;
  min-height: 100vh;
}
</style>