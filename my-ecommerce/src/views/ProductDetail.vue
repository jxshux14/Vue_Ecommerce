<template>
  <div class="page">
    <!-- Loading -->
    <div v-if="loading" class="detail-skeleton">
      <div class="skel-image"></div>
      <div class="skel-info">
        <div class="skel-line wide"></div>
        <div class="skel-line"></div>
        <div class="skel-line short"></div>
      </div>
    </div>

    <!-- Product -->
    <div v-else-if="product" class="detail">
      <div class="detail-image">
        <img :src="product.image" :alt="product.title" />
      </div>
      <div class="detail-info">
        <span class="category">{{ product.category }}</span>
        <h1>{{ product.title }}</h1>
        <div class="rating">
          ⭐ {{ product.rating.rate }} ({{ product.rating.count }} reviews)
        </div>
        <p class="description">{{ product.description }}</p>
        <div class="price">${{ product.price }}</div>
        <div class="actions">
          <button class="add-btn" @click="addToCart">
            🛒 Add to Cart
          </button>
          <button class="back-btn" @click="$router.back()">
            ← Go Back
          </button>
        </div>
        <p class="added-msg" v-if="added">✅ Added to cart!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { products } from '../data/products'

const route = useRoute()
const cart = useCartStore()

const product = ref(null)
const loading = ref(true)
const added = ref(false)

async function fetchProduct() {
  await new Promise(resolve => setTimeout(resolve, 500))
  product.value = products.find(p => p.id === Number(route.params.id))
  loading.value = false
}

function addToCart() {
  cart.addToCart(product.value)
  added.value = true
  setTimeout(() => added.value = false, 2000)
}

onMounted(fetchProduct)
</script>

<style scoped>
.detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  background: #fff;
  padding: 48px;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}

.detail-image {
  background: #f7f7f7;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  min-height: 320px;
}

.detail-image img {
  max-height: 260px;
  max-width: 100%;
  object-fit: contain;
}

.category {
  font-size: 12px;
  font-weight: 600;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-info h1 {
  font-size: 22px;
  font-weight: 700;
  color: #111;
  margin: 10px 0 8px;
  line-height: 1.4;
}

.rating {
  font-size: 13px;
  color: #888;
  margin-bottom: 16px;
}

.description {
  font-size: 14px;
  color: #666;
  line-height: 1.8;
  margin-bottom: 24px;
}

.price {
  font-size: 28px;
  font-weight: 700;
  color: #111;
  margin-bottom: 24px;
}

.actions {
  display: flex;
  gap: 12px;
}

.add-btn {
  background: #111;
  color: #fff;
  border: none;
  padding: 14px 28px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.add-btn:hover { background: #333; }

.back-btn {
  background: #f0f0f0;
  color: #111;
  border: none;
  padding: 14px 24px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
}

.back-btn:hover { background: #e0e0e0; }

.added-msg {
  margin-top: 12px;
  color: #111;
  font-size: 14px;
  font-weight: 500;
}

/* Skeleton */
.detail-skeleton {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  background: #fff;
  padding: 48px;
  border-radius: 16px;
}

.skel-image {
  border-radius: 12px;
  height: 320px;
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}

.skel-info { display: flex; flex-direction: column; gap: 16px; padding-top: 16px; }

.skel-line {
  height: 16px;
  border-radius: 6px;
  width: 60%;
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}

.skel-line.wide { width: 100%; height: 24px; }
.skel-line.short { width: 30%; }

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>