<script setup>
import { computed, onMounted, ref } from 'vue'
import SideMenu from '../components/layout/SideMenu.vue'
import ProductGrid from '../components/products/ProductGrid.vue'
import LoadingState from '../components/common/LoadingState.vue'
import ErrorState from '../components/common/ErrorState.vue'
import EmptyState from '../components/common/EmptyState.vue'
import { getProducts } from '../services/productService'
import { getCategories } from '../services/categoryService'
import { getBrands } from '../services/brandService'

const products = ref([])
const categories = ref([])
const brands = ref([])

const loading = ref(true)
const error = ref(null)

const selectedCategory = ref('')
const selectedBrand = ref('')
const search = ref('')
const maxPrice = ref(100)
const onlyDiscount = ref(false)

const filtersOpen = ref(false)

onMounted(async () => {
  try {
    loading.value = true
    error.value = null
    products.value = await getProducts()
    categories.value = await getCategories()
    brands.value = await getBrands()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})

const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    const text = search.value.toLowerCase().trim()

    const matchesSearch =
      text === '' || product.name.toLowerCase().includes(text)

    const matchesCategory =
      selectedCategory.value === '' ||
      product.categories?.some((c) => c.id === Number(selectedCategory.value))

    const matchesBrand =
      selectedBrand.value === '' ||
      product.brand?.id === Number(selectedBrand.value)

    const finalPrice = product.price * (1 - product.discount / 100)
    const matchesPrice = finalPrice <= maxPrice.value

    const matchesDiscount =
      !onlyDiscount.value || product.discount > 0

    return (
      matchesSearch &&
      matchesCategory &&
      matchesBrand &&
      matchesPrice &&
      matchesDiscount
    )
  })
})

const activeFilters = computed(() => {
  const list = []

  if (search.value.trim()) {
    list.push({ key: 'search', label: `Búsqueda: ${search.value}` })
  }

  if (selectedCategory.value !== '') {
    const category = categories.value.find(c => c.id === Number(selectedCategory.value))
    if (category) list.push({ key: 'category', label: category.name })
  }

  if (selectedBrand.value !== '') {
    const brand = brands.value.find(b => b.id === Number(selectedBrand.value))
    if (brand) list.push({ key: 'brand', label: brand.name })
  }

  if (maxPrice.value !== 100) {
    list.push({ key: 'price', label: `Hasta ${maxPrice.value} €` })
  }

  if (onlyDiscount.value) {
    list.push({ key: 'discount', label: 'Solo ofertas' })
  }

  return list
})

function clearOneFilter(key) {
  if (key === 'search') search.value = ''
  if (key === 'category') selectedCategory.value = ''
  if (key === 'brand') selectedBrand.value = ''
  if (key === 'price') maxPrice.value = 100
  if (key === 'discount') onlyDiscount.value = false
}

function resetFilters() {
  selectedCategory.value = ''
  selectedBrand.value = ''
  search.value = ''
  maxPrice.value = 100
  onlyDiscount.value = false
}
</script>

<template>
  <v-container fluid class="products-page py-8 px-6 px-md-8">
    <section class="catalog-hero mb-5">
      <div class="catalog-hero__content">
        <p class="catalog-kicker">GEX STORE</p>
        <h1 class="catalog-title">Catálogo de videojuegos</h1>
        <p class="catalog-text">
          Encuentra títulos por búsqueda, categoría, marca, precio y promociones.
        </p>
      </div>

      <div class="catalog-hero__stats">
        <div class="hero-stat">
          <span class="hero-stat__label">Resultados</span>
          <strong class="hero-stat__value">{{ filteredProducts.length }}</strong>
        </div>
      </div>
    </section>

    <div class="results-toolbar mb-5">
      <div class="results-toolbar__left">
        <p class="results-text">
          Mostrando <strong>{{ filteredProducts.length }}</strong> productos
        </p>
      </div>

      <div class="toolbar-actions">
        <v-btn
          color="primary"
          prepend-icon="mdi-filter-variant"
          rounded="pill"
          class="toolbar-btn"
          @click="filtersOpen = true"
        >
          Filtros
        </v-btn>

        <v-btn
          variant="tonal"
          color="secondary"
          rounded="pill"
          class="toolbar-btn"
          @click="resetFilters"
        >
          Limpiar
        </v-btn>
      </div>
    </div>

    <div v-if="activeFilters.length" class="active-filters mb-5">
      <v-chip
        v-for="filter in activeFilters"
        :key="filter.key"
        color="primary"
        variant="tonal"
        closable
        rounded="pill"
        @click:close="clearOneFilter(filter.key)"
      >
        {{ filter.label }}
      </v-chip>
    </div>

    <LoadingState v-if="loading" />
    <ErrorState v-else-if="error" :message="error" />
    <EmptyState
      v-else-if="filteredProducts.length === 0"
      title="No se han encontrado productos"
      text="Prueba a cambiar la búsqueda o los filtros."
    />
    <ProductGrid
      v-else
      :products="filteredProducts"
    />

    <v-navigation-drawer
      v-model="filtersOpen"
      location="right"
      temporary
      width="360"
    >
      <div class="pa-4">
        <div class="drawer-head mb-4">
          <h3 class="text-h6 drawer-title">Filtros</h3>
          <v-btn icon variant="text" @click="filtersOpen = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>

        <SideMenu
          :categories="categories"
          :brands="brands"
          :selected-category="selectedCategory"
          :selected-brand="selectedBrand"
          :search="search"
          :max-price="maxPrice"
          :only-discount="onlyDiscount"
          @update:category="selectedCategory = $event"
          @update:brand="selectedBrand = $event"
          @update:search="search = $event"
          @update:maxPrice="maxPrice = $event"
          @update:onlyDiscount="onlyDiscount = $event"
          @reset="resetFilters"
        />
      </div>
    </v-navigation-drawer>
  </v-container>
</template>

<style scoped>
.products-page {
  max-width: 1720px;
  margin: 0 auto;
}

.catalog-hero {
  background: linear-gradient(135deg, #1F1A40 0%, #2D2360 100%);
  border-radius: 28px;
  padding: 30px 34px;
  color: #FAF9F6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}

.catalog-hero__content {
  flex: 1;
  min-width: 280px;
}

.catalog-hero__stats {
  display: flex;
  align-items: center;
}

.hero-stat {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 18px;
  padding: 14px 18px;
  min-width: 130px;
  backdrop-filter: blur(8px);
}

.hero-stat__label {
  display: block;
  color: #d9d0f6;
  font-size: 0.88rem;
  margin-bottom: 4px;
}

.hero-stat__value {
  color: #ffffff;
  font-size: 1.4rem;
  font-weight: 800;
}

.catalog-kicker {
  color: #c9bbf5;
  font-weight: 700;
  letter-spacing: 1.4px;
  margin-bottom: 10px;
}

.catalog-title {
  color: #FAF9F6;
  font-size: 2.35rem;
  line-height: 1.08;
  margin-bottom: 10px;
}

.catalog-text {
  color: #f0ebfb;
  max-width: 760px;
  margin-bottom: 0;
  line-height: 1.65;
}

.results-toolbar {
  background: #fff;
  border-radius: 20px;
  padding: 16px 20px;
  box-shadow: 0 10px 24px rgba(20, 20, 40, 0.05);
  border: 1px solid rgba(109, 59, 217, 0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
}

.results-toolbar__left {
  display: flex;
  align-items: center;
}

.results-text {
  color: #555;
  margin: 0;
}

.toolbar-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.toolbar-btn {
  font-weight: 700;
}

.active-filters {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.drawer-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.drawer-title {
  color: #1F1A40;
  font-weight: 800;
}

@media (max-width: 960px) {
  .catalog-title {
    font-size: 2rem;
  }

  .catalog-hero {
    padding: 24px;
  }
}
</style>