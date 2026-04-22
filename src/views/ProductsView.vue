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

const activeFiltersCount = computed(() => {
  let count = 0
  if (selectedCategory.value !== '') count++
  if (selectedBrand.value !== '') count++
  if (search.value.trim() !== '') count++
  if (maxPrice.value !== 100) count++
  if (onlyDiscount.value) count++
  return count
})

function resetFilters() {
  selectedCategory.value = ''
  selectedBrand.value = ''
  search.value = ''
  maxPrice.value = 100
  onlyDiscount.value = false
}
</script>

<template>
  <v-container class="py-10">
    <section class="catalog-hero mb-8">
      <p class="catalog-kicker">GEX STORE</p>
      <h1 class="catalog-title">Catálogo de videojuegos</h1>
      <p class="catalog-text">
        Busca, filtra y descubre títulos por categoría, marca, precio y promociones.
      </p>
    </section>

    <v-row class="catalog-layout">
      <v-col cols="12" md="3" lg="3">
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
      </v-col>

      <v-col cols="12" md="9" lg="9">
        <div class="results-panel mb-6">
          <div class="results-head">
            <div>
              <p class="results-kicker">LISTADO</p>
              <h2 class="results-title">Resultados disponibles</h2>
              <p class="results-text">
                Mostrando <strong>{{ filteredProducts.length }}</strong> producto<span v-if="filteredProducts.length !== 1">s</span>
              </p>
            </div>

            <div class="results-stats">
              <v-chip color="primary" variant="flat" size="large">
                {{ activeFiltersCount }} filtro<span v-if="activeFiltersCount !== 1">s</span> activo<span v-if="activeFiltersCount !== 1">s</span>
              </v-chip>
            </div>
          </div>
        </div>

        <LoadingState v-if="loading" />
        <ErrorState v-else-if="error" :message="error" />
        <EmptyState
          v-else-if="filteredProducts.length === 0"
          title="No se han encontrado productos"
          text="Prueba con otros filtros o una búsqueda diferente."
        />
        <ProductGrid
          v-else
          :products="filteredProducts"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.catalog-hero {
  background: linear-gradient(135deg, #1F1A40 0%, #2D2360 100%);
  border-radius: 28px;
  padding: 42px;
  color: #FAF9F6;
  box-shadow: 0 20px 50px rgba(31, 26, 64, 0.12);
}

.catalog-kicker {
  color: #c9bbf5;
  font-weight: 700;
  letter-spacing: 1.4px;
  margin-bottom: 10px;
}

.catalog-title {
  color: #FAF9F6;
  font-size: 2.7rem;
  line-height: 1.08;
  margin-bottom: 14px;
}

.catalog-text {
  color: #f0ebfb;
  max-width: 760px;
  font-size: 1.05rem;
}

.catalog-layout {
  align-items: start;
}

.results-panel {
  background: #ffffff;
  border-radius: 24px;
  padding: 24px 28px;
  box-shadow: 0 12px 30px rgba(20, 20, 40, 0.06);
  border: 1px solid rgba(109, 59, 217, 0.06);
}

.results-head {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 20px;
  flex-wrap: wrap;
}

.results-kicker {
  color: #6D3BD9;
  font-weight: 700;
  letter-spacing: 1.2px;
  margin-bottom: 8px;
}

.results-title {
  margin-bottom: 8px;
  color: #1F1A40;
}

.results-text {
  color: #666;
  margin-bottom: 0;
}

.results-stats {
  display: flex;
  align-items: center;
}

@media (max-width: 900px) {
  .catalog-title {
    font-size: 2.1rem;
  }

  .catalog-hero {
    padding: 28px;
  }

  .results-panel {
    padding: 20px;
  }
}
</style>