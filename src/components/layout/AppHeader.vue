<script setup>
import logoGex from '../../assets/images/icons/iconoGex.png'
</script>

<template>
  <v-app-bar flat height="92" class="header-bar">
    <v-container class="header-shell">
      <RouterLink to="/" class="brand-link">
        <img :src="logoGex" alt="Logo GEX" class="brand-logo" />

        <div class="brand-copy">
          <div class="brand-title">GEX</div>
          <div class="brand-subtitle">Gaming Experience</div>
        </div>
      </RouterLink>

      <nav class="nav-links">
        <RouterLink to="/" class="nav-pill">Inicio</RouterLink>
        <RouterLink to="/productos" class="nav-pill">Productos</RouterLink>
        <RouterLink to="/favoritos" class="nav-pill">Favoritos</RouterLink>
        <RouterLink to="/contacto" class="nav-pill nav-pill--cta">Contacto</RouterLink>
      </nav>
    </v-container>
  </v-app-bar>
</template>

<style scoped>
.header-bar {
  background: rgba(248, 248, 252, 0.92) !important;
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(109, 59, 217, 0.08);
}

.header-shell {
  width: min(1720px, calc(100% - 2rem));
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
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
}

.brand-title {
  font-family: "Poppins", sans-serif;
  font-size: 1.7rem;
  font-weight: 800;
  line-height: 1;
  color: #1F1A40;
}

.brand-subtitle {
  color: #6b648a;
  font-size: 0.92rem;
  margin-top: 4px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.nav-pill {
  display: inline-flex;
  align-items: center;
  padding: 0.72rem 1rem;
  border-radius: 999px;
  color: #625a83;
  font-weight: 700;
  transition: all 0.2s ease;
}

.nav-pill:hover,
.router-link-active.nav-pill {
  background: rgba(109, 59, 217, 0.10);
  color: #6D3BD9;
}

.nav-pill--cta {
  background: #6D3BD9;
  color: white;
}

.nav-pill--cta:hover {
  background: #5d31bc;
  color: white;
}
</style>