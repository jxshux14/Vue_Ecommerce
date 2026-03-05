<template>
  <div class="page">
    <h1>All Products</h1>
    <p class="subtitle">Find the best parts for your build</p>
    <div class="search-bar">
  <span class="search-icon">🔍</span>
  <input
    v-model="searchQuery"
    type="text"
    placeholder="Search products, brands, specs..."
    @input="resetObserver"
  />
  <span class="clear-btn" v-if="searchQuery" @click="searchQuery = ''">✕</span>
</div>

    <!-- Category Filter Tabs -->
    <div class="filter-tabs">
      <button
        v-for="cat in categories"
        :key="cat"
        :class="{ active: activeCategory === cat }"
        @click="activeCategory = cat"
      >
        {{ cat }}
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-grid">
      <div class="skeleton" v-for="n in 8" :key="n"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error">
      <p>⚠️ Failed to load products. Please try again.</p>
      <button @click="fetchProducts">Retry</button>
    </div>

    <!-- Empty Filter State -->
    <div v-else-if="filteredProducts.length === 0" class="empty">
      <p v-if="searchQuery">No results for "<strong>{{ searchQuery }}</strong>"</p>
      <p v-else>No products found in this category.</p>
    </div>

    <!-- Products Grid -->
    <div v-else class="products-grid">
        <div
          class="product-card"
          v-for="(product, index) in filteredProducts"
          :key="product.id"
          :ref="el => { if (el) cardRefs[index] = el }"
          :style="{ transitionDelay: `${index * 0.08}s` }"
          @click="goToProduct(product.id)"
        >
        <div class="product-image">
          <img :src="product.image" :alt="product.title" />
        </div>
        <div class="product-info">
          <span class="category">{{ product.category }}</span>
          <h3>{{ product.title }}</h3>
          <div class="product-footer">
            <span class="price">${{ product.price }}</span>
            <button @click.stop="addToCart(product)">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { products as allProducts } from '../data/products'

const router = useRouter()
const route = useRoute()
const cart = useCartStore()

const products = ref([])
const loading = ref(true)
const error = ref(false)
const activeCategory = ref(route.query.category || 'All')
const searchQuery = ref('')
const cardRefs = ref([])
let observer

const categories = ['All', 'GPU', 'CPU', 'RAM', 'Storage', 'Motherboard', 'Cooling', 'Case', 'PSU', 'Monitor', 'Peripherals']

const filteredProducts = computed(() => {
  let result = products.value

  if (activeCategory.value !== 'All') {
    result = result.filter(p => p.category === activeCategory.value)
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    )
  }

  return result
})
function resetObserver() {
  setTimeout(initObserver, 50)
}
watch(searchQuery, () => {
  setTimeout(initObserver, 50)
})
function initObserver() {
  if (observer) observer.disconnect()
  cardRefs.value = []

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          
          // Remove transition delay after fade in completes
          const delay = parseFloat(entry.target.style.transitionDelay || '0') * 1000
          setTimeout(() => {
            entry.target.style.transitionDelay = '0s'
          }, delay + 350) // 350 matches your transition duration

          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0, rootMargin: '0px 0px 200px 0px' }
  )

  setTimeout(() => {
    cardRefs.value.forEach(card => {
      if (card) observer.observe(card)
    })
  }, 100)
}

async function fetchProducts() {
  loading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 800))
    products.value = allProducts
  } catch (err) {
    error.value = true
  } finally {
    loading.value = false
    setTimeout(initObserver, 50)
  }
}

// Re-init observer when category changes
watch(activeCategory, () => {
  setTimeout(initObserver, 50)
})

function goToProduct(id) {
  router.push(`/product/${id}`)
}

function addToCart(product) {
  cart.addToCart(product)
}

onMounted(fetchProducts)

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>

.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  background: var(--card, #fff);
  border: 1.5px solid #e0e0e0;
  border-radius: 12px;
  padding: 0 16px;
  margin-bottom: 20px;
  transition: border-color 0.2s;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
}

.search-bar:focus-within {
  border-color: #111;
}

.search-icon {
  font-size: 16px;
  margin-right: 10px;
  opacity: 0.4;
}

.search-bar input {
  flex: 1;
  border: none;
  outline: none;
  padding: 14px 0;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  background: transparent;
  color: var(--text, #111);
}

.search-bar input::placeholder {
  color: #aaa;
}

.clear-btn {
  font-size: 13px;
  color: #aaa;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 6px;
  transition: all 0.2s;
}

.clear-btn:hover {
  background: #f0f0f0;
  color: #111;
}
.filter-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 28px;
}

.filter-tabs button {
  background: #fff;
  border: 1.5px solid #e0e0e0;
  color: #666;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-tabs button:hover {
  border-color: #111;
  color: #111;
}

.filter-tabs button.active {
  background: #111;
  border-color: #111;
  color: #fff;
}

.empty {
  text-align: center;
  padding: 60px;
  color: #aaa;
  font-size: 15px;
}

.subtitle {
  color: #888;
  font-size: 15px;
  margin-bottom: 32px;
  margin-top: 8px;
}

/* Loading Skeleton */
.loading-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.skeleton {
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
  border-radius: 12px;
  height: 280px;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Error */
.error {
  text-align: center;
  padding: 60px;
  color: #888;
}

.error button {
  margin-top: 16px;
  background: #111;
  color: #fff;
  border: none;
  padding: 10px 24px;
  border-radius: 8px;
  cursor: pointer;
}

/* Products Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.product-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  cursor: pointer;
  border: 1px solid rgba(0,0,0,0.04);

  opacity: 0;
  transform: translateY(60px);

  transition: opacity 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            box-shadow 0.2s ease;
}

.product-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.product-card.visible:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}

.product-image {
  background: #f7f7f7;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 180px;
}

.product-image img {
  max-height: 130px;
  max-width: 100%;
  object-fit: contain;
}

.product-info {
  padding: 16px;
}

.category {
  font-size: 11px;
  font-weight: 600;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.product-info h3 {
  font-size: 13px;
  font-weight: 600;
  color: #111;
  margin: 6px 0 12px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 16px;
  font-weight: 700;
  color: #111;
}

.product-footer button {
  background: #111;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.product-footer button:hover { background: #333; }
</style>