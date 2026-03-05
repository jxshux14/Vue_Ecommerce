<template>
  <div class="page">
    <!-- Hero -->
    <div class="hero" ref="heroRef">
      <div class="hero-content">
        <p class="hero-eyebrow">⚡ Next-Gen PC Parts</p>
        <h1>Build Your <br /><span class="accent">Ultimate Rig</span></h1>
        <p class="hero-sub">Premium PC components & gaming peripherals — built for performance.</p>
        <button @click="$router.push('/products')">Shop Now →</button>
      </div>
    </div>

    <!-- Categories -->
    <div class="categories">
      <div
        class="category-card"
        v-for="cat in categories"
        :key="cat.name"
        @click="$router.push({ path: '/products', query: { category: cat.filter } })"
        >
        <span class="icon">{{ cat.icon }}</span>
        <p>{{ cat.name }}</p>
      </div>
    </div>

    <!-- Featured Products -->
    <div class="featured">
      <div class="section-header">
        <h2>Featured Products</h2>
        <span @click="$router.push('/products')">View All →</span>
      </div>
      <div class="featured-grid">
        <div
        class="product-card"
        v-for="(product, index) in featured"
        :key="product.id"
        :ref="el => { if (el) cardRefs[index] = el }"
        @click="$router.push(`/product/${product.id}`)"
        >
          <div class="product-image">
            <img :src="product.image" :alt="product.title" />
          </div>
          <div class="product-info">
            <span class="category-tag">{{ product.category }}</span>
            <h3>{{ product.title }}</h3>
            <div class="product-footer">
              <span class="price">${{ product.price }}</span>
              <button @click.stop="addToCart(product)">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useCartStore } from '../stores/cart'
import { products } from '../data/products'

const cart = useCartStore()
const heroRef = ref(null)
const cardRefs = ref([])
let observer

const categories = [
  { icon: '🖥️', name: 'Monitors', filter: 'Monitor' },
  { icon: '⚡', name: 'GPUs', filter: 'GPU' },
  { icon: '🧠', name: 'CPUs', filter: 'CPU' },
  { icon: '💾', name: 'RAM', filter: 'RAM' },
  { icon: '💿', name: 'Storage', filter: 'Storage' },
  { icon: '🖱️', name: 'Peripherals', filter: 'Peripherals' },
  { icon: '🔌', name: 'PSUs', filter: 'PSU' },
  { icon: '🏠', name: 'Cases', filter: 'Case' },
]

const featured = products.slice(0, 4)

function addToCart(product) {
  cart.addToCart(product)
}


// ---- Scroll Observer ----
function initScrollObserver() {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  )

  setTimeout(() => {
    cardRefs.value.forEach(card => {
      if (card) observer.observe(card)
    })
  }, 100)
}

// ---- Mouse Spotlight ----
let mouseX = 50
let mouseY = 50
let currentX = 50
let currentY = 50
let animFrame

function lerp(a, b, t) {
  return a + (b - a) * t
}

function animate() {
  currentX = lerp(currentX, mouseX, 0.08)
  currentY = lerp(currentY, mouseY, 0.08)
  if (heroRef.value) {
    heroRef.value.style.setProperty('--mx', currentX + '%')
    heroRef.value.style.setProperty('--my', currentY + '%')
  }
  animFrame = requestAnimationFrame(animate)
}

function handleMouseMove(e) {
  if (!heroRef.value) return
  const rect = heroRef.value.getBoundingClientRect()
  mouseX = ((e.clientX - rect.left) / rect.width) * 100
  mouseY = ((e.clientY - rect.top) / rect.height) * 100
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  animate()
  initScrollObserver()
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  cancelAnimationFrame(animFrame)
  if (observer) observer.disconnect()
})
</script>

<style scoped>
/* Hero */
.hero {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(
      circle 600px at var(--mx, 50%) var(--my, 50%),
      rgba(255,255,255,0.18) 0%,
      rgba(255,255,255,0.06) 30%,
      transparent 70%
    ),
    linear-gradient(135deg, #0a0a0a 0%, #1c1c1c 40%, #2a2a2a 70%, #111 100%);
  padding: 100px 56px;
  border-radius: 20px;
  margin-bottom: 40px;
  border: 1px solid rgba(255,255,255,0.07);
}

/* Subtle grid overlay */
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  border-radius: 20px;
  pointer-events: none;
}

/* Shine sweep */
.hero::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 60%;
  height: 100%;
  background: linear-gradient(
    120deg,
    transparent 30%,
    rgba(255,255,255,0.05) 50%,
    transparent 70%
  );
  animation: shineSweep 8s ease-in-out infinite;
  pointer-events: none;
}

@keyframes shineSweep {
  0%   { left: -60%; opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { left: 160%; opacity: 0; }
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 600px;
}

.hero-content h1 {
  animation: fadeUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.hero-content .hero-sub {
  animation: fadeUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s both;
}

.hero-content .hero-eyebrow {
  animation: fadeUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s both;
}

.hero-content button {
  animation: fadeUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s both;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-eyebrow {
  font-size: 13px;
  font-weight: 600;
  color: rgba(255,255,255,0.45);
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 20px;
}
.glitch-text {
  display: inline-block;
  min-height: 1em;
  font-family: inherit;
}

h1 {
  font-size: 52px;
  font-weight: 800;
  line-height: 1.1;
  color: #ffffff;
  margin-bottom: 20px;
  letter-spacing: -1px;
}

.accent {
  background: linear-gradient(90deg, #fff 0%, #999 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-sub {
  font-size: 16px;
  color: rgba(255,255,255,0.5);
  line-height: 1.7;
  margin-bottom: 36px;
  max-width: 460px;
}

.hero button {
  background: #ffffff;
  color: #111;
  border: none;
  padding: 14px 32px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: 0.3px;
}

.hero button:hover {
  background: #e8e8e8;
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
}

/* Categories */
.categories {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 12px;
  margin-bottom: 8px;
}

.category-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px 8px;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid rgba(0,0,0,0.04);
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}

.category-card .icon { font-size: 24px; }

.category-card p {
  margin-top: 8px;
  font-size: 11px;
  font-weight: 700;
  color: #111;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

/* Featured */
.featured { margin-top: 48px; }

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h2 {
  font-size: 20px;
  font-weight: 700;
  color: #111;
}

.section-header span {
  font-size: 14px;
  font-weight: 600;
  color: #888;
  cursor: pointer;
  transition: color 0.2s;
}

.section-header span:hover { color: #111; }

.featured-grid {
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

  transition: opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              box-shadow 0.3s ease;
}

.product-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.product-card.visible:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}

/* Stagger delays */
.product-card:nth-child(1) { transition-delay: 0s; }
.product-card:nth-child(2) { transition-delay: 0.2s; }
.product-card:nth-child(3) { transition-delay: 0.4s; }
.product-card:nth-child(4) { transition-delay: 0.6s; }

.product-image {
  background: #f7f7f7;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 160px;
}

.product-image img {
  max-height: 120px;
  max-width: 100%;
  object-fit: contain;
}

.product-info { padding: 16px; }

.category-tag {
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