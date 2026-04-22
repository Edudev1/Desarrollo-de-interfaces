<script setup>
import logoGex from '../../assets/images/icons/iconoGex.png'
</script>

<template>
  <v-app-bar color="secondary" flat height="96" class="header-bar">
    <v-container class="header-inner">
      <RouterLink to="/" class="brand-link">
        <img :src="logoGex" alt="Logo GEX" class="brand-logo" />

        <div class="brand-copy">
          <div class="brand-subtitle">Gaming Experience</div>
        </div>
      </RouterLink>

      <v-spacer />

      <nav class="nav-links">
        <v-btn variant="text" class="nav-btn" to="/">Inicio</v-btn>
        <v-btn variant="text" class="nav-btn" to="/productos">Productos</v-btn>
        <v-btn variant="text" class="nav-btn" to="/favoritos">Favoritos</v-btn>
        <v-btn variant="outlined" class="contact-btn" to="/contacto">Contacto</v-btn>
      </nav>
    </v-container>
  </v-app-bar>
</template>

<style scoped>
.header-bar {
  background: rgba(31, 26, 64, 0.97) !important;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.header-inner {
  display: flex;
  align-items: center;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 14px;
  text-decoration: none;
}

.brand-logo {
  width: 52px;
  height: 52px;
  object-fit: contain;
  display: block;
}

.brand-copy {
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-family: "Poppins", sans-serif;
  font-size: 1.8rem;
  font-weight: 800;
  line-height: 1;
  color: #FAF9F6;
  letter-spacing: 0.8px;
}

.brand-subtitle {
  color: #d8d1f5;
  font-size: 0.92rem;
  margin-top: 4px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.nav-btn {
  color: #FAF9F6 !important;
  font-weight: 600;
  border-radius: 10px;
  padding-inline: 10px;
  transition: all 0.2s ease;
}

.nav-btn:hover {
  background-color: rgba(109, 59, 217, 0.28) !important;
  color: #ffffff !important;
  transform: translateY(-1px);
}

.contact-btn {
  color: #FAF9F6 !important;
  border-color: #6D3BD9 !important;
  font-weight: 700;
  border-radius: 10px;
  transition: all 0.2s ease;
}

.contact-btn:hover {
  background-color: rgba(109, 59, 217, 0.28) !important;
  color: #ffffff !important;
  transform: translateY(-1px);
}
</style>