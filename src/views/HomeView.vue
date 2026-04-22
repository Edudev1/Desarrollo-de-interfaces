<template>
  <div>
    <section class="hero-section">
      <v-container class="hero-content">
        <p class="hero-kicker">WELCOME TO GEX</p>
        <h1 class="hero-title">
          Tu espacio para descubrir videojuegos, ofertas y favoritos
        </h1>
        <p class="hero-text">
          Explora el catálogo conectado con la API, filtra por categorías y marcas,
          consulta detalles y guarda tus juegos favoritos en una interfaz moderna.
        </p>

        <div class="hero-actions">
          <v-btn color="primary" size="x-large" rounded="xl" to="/productos">
            Explorar catálogo
          </v-btn>
          <v-btn variant="outlined" color="white" size="x-large" rounded="xl" to="/contacto">
            Contacto
          </v-btn>
        </div>
      </v-container>
    </section>

    <v-container class="py-10">
      <div class="section-head mb-8">
        <p class="section-kicker">GEX FEATURES</p>
        <h2 class="section-title">Una experiencia más completa</h2>
      </div>

      <v-row>
        <v-col cols="12" md="4">
          <v-card rounded="xl" elevation="3" class="info-card pa-6 h-100">
            <v-icon size="42" color="primary">mdi-magnify</v-icon>
            <h3 class="info-title mt-4">Búsqueda y filtros</h3>
            <p class="info-text">
              Encuentra títulos por nombre, categoría, precio, marca y promociones.
            </p>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card rounded="xl" elevation="3" class="info-card pa-6 h-100">
            <v-icon size="42" color="primary">mdi-controller-classic</v-icon>
            <h3 class="info-title mt-4">Detalle de producto</h3>
            <p class="info-text">
              Consulta carátula, marca, categorías, EAN, descuento y precio final.
            </p>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card rounded="xl" elevation="3" class="info-card pa-6 h-100">
            <v-icon size="42" color="primary">mdi-heart</v-icon>
            <h3 class="info-title mt-4">Favoritos</h3>
            <p class="info-text">
              Guarda tus juegos preferidos y accede a ellos rápidamente.
            </p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.hero-section {
  background-image:
    linear-gradient(rgba(31, 26, 64, 0.72), rgba(31, 26, 64, 0.72)),
    url('https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=80');
  background-size: cover;
  background-position: center;
  padding: 110px 0;
}

.hero-content {
  color: #FAF9F6;
}

.hero-kicker {
  color: #c4b5fd;
  font-weight: 700;
  letter-spacing: 1.6px;
  margin-bottom: 10px;
}

.hero-title {
  color: #FAF9F6;
  font-size: 4rem;
  line-height: 1.08;
  max-width: 900px;
  margin-bottom: 18px;
}

.hero-text {
  color: #f1eefb;
  font-size: 1.1rem;
  max-width: 760px;
}

.hero-actions :deep(.v-btn) {
  transition: all 0.22s ease;
}

.hero-actions :deep(.v-btn:hover) {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(31, 26, 64, 0.18);
}

.section-head {
  text-align: left;
}

.section-kicker {
  color: #6D3BD9;
  font-weight: 700;
  letter-spacing: 1.2px;
  margin-bottom: 8px;
}

.section-title {
  margin-bottom: 0;
}

.info-card {
  border: 1px solid rgba(109, 59, 217, 0.08);
}

.info-title {
  color: #1F1A40;
}

.info-text {
  color: #666;
}

@media (max-width: 900px) {
  .hero-title {
    font-size: 2.8rem;
  }
}
</style>