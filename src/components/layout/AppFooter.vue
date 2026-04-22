<template>
  <v-footer color="secondary" class="text-white">
    <v-container class="d-flex justify-space-between align-center flex-wrap ga-4 py-8">
      <div>
        <div class="footer-title">GEX</div>
        <div class="footer-text">Gaming Experience · Catálogo conectado a API</div>
      </div>

      <div class="footer-links">
        <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/productos">Productos</RouterLink>
        <RouterLink to="/favoritos">Favoritos</RouterLink>
        <RouterLink to="/contacto">Contacto</RouterLink>
      </div>
    </v-container>
  </v-footer>
</template>

<style scoped>
.footer-title {
  font-family: "Poppins", sans-serif;
  font-size: 1.3rem;
  font-weight: 800;
  color: #FAF9F6;
}

.footer-text {
  color: #d8d1f5;
  margin-top: 4px;
}

.footer-links {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
}

.footer-links a {
  color: #FAF9F6;
  text-decoration: none;
}

.footer-links a:hover {
  color: #c4b5fd;
}
</style>