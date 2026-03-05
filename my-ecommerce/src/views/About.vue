<template>
  <div class="page">

    <!-- Header -->
    <div class="about-header" ref="headerRef">
      <span class="about-tag">About Us</span>
      <h1>About <span class="accent">RigStore</span></h1>
      <p class="intro">We are passionate builders and gamers who believe everyone deserves a powerful machine. From budget builds to extreme rigs — we've got you covered.</p>
    </div>

    <!-- Stats -->
    <div class="stats">
      <div
        class="stat"
        v-for="(s, index) in stats"
        :key="s.label"
        :ref="el => { if (el) statRefs[index] = el }"
      >
        <h2>{{ s.display }}</h2>
        <p>{{ s.label }}</p>
      </div>
    </div>

    <!-- Our Story -->
    <div class="story-section" ref="storyRef">
      <div class="story-image">
        <img src="https://i.pinimg.com/1200x/e7/3d/ca/e73dcae64768a84c01eeaf527c16ebd1.jpg" alt="Our Story" />
      </div>
      <div class="story-content">
        <span class="section-tag">Our Story</span>
        <h2>Born from a passion <br/>for performance</h2>
        <p>RigStore started in a small garage in 2018 by two friends who were tired of overpaying for PC parts. What began as a passion project quickly grew into the go-to destination for builders who refuse to compromise on quality.</p>
        <p>Today, we carry over 10,000 products from the world's top brands — curated by enthusiasts, for enthusiasts. Every SKU on our platform has been reviewed, benchmarked, or personally used by our team.</p>
      </div>
    </div>

    <!-- Divider -->
    <div class="divider" ref="dividerRef"></div>

    <!-- Articles / Posts — full width briefs -->
    <div class="briefs-section">
      <div class="section-header" ref="briefsHeaderRef">
        <span class="section-tag">From the Build Desk</span>
        <h2>Latest Articles</h2>
      </div>

      <div
        class="brief-item"
        v-for="(post, index) in posts"
        :key="post.title"
        :ref="el => { if (el) postRefs[index] = el }"
      >
        <div class="brief-image">
          <img :src="post.image" :alt="post.title" />
        </div>
        <div class="brief-body">
          <div class="brief-meta">
            <span class="brief-tag">{{ post.tag }}</span>
            <span class="brief-date">{{ post.date }}</span>
          </div>
          <h3>{{ post.title }}</h3>
          <p>{{ post.excerpt }}</p>
        </div>
        <span class="brief-number">{{ String(index + 1).padStart(2, '0') }}</span>
      </div>
    </div>

    <!-- Divider -->
    <div class="divider" ref="divider2Ref"></div>

    <!-- Values -->
    <div class="values-section">
      <div class="section-header" ref="valuesHeaderRef">
        <span class="section-tag">Why RigStore</span>
        <h2>What we stand for</h2>
      </div>
      <div class="values-grid">
        <div
          class="value-item"
          v-for="(val, index) in values"
          :key="val.title"
          :ref="el => { if (el) valueRefs[index] = el }"
        >
          <span class="value-icon">{{ val.icon }}</span>
          <div>
            <h3>{{ val.title }}</h3>
            <p>{{ val.desc }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Closing Banner -->
    <div class="closing-banner" ref="bannerRef">
      <h2>Ready to build your dream rig?</h2>
      <p>Browse our full catalog of premium PC components.</p>
      <button @click="$router.push('/products')">Shop Now →</button>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const stats = ref([
  { value: 10000, suffix: '+', label: 'Products Available', display: '0' },
  { value: 50000, suffix: '+', label: 'Happy Customers', display: '0' },
  { value: 5, suffix: '★', label: 'Average Rating', display: '0' },
])

const posts = [
  {
    title: 'How to Build Your First Gaming PC in 2025',
    excerpt: 'A step-by-step guide covering everything from choosing your CPU to cable management. Perfect for first-time builders who want to get it right the first time without overspending.',
    image: 'https://tse4.mm.bing.net/th/id/OIP.tyfYU5YWj_s9f6jAjWvvRwHaE7?rs=1&pid=ImgDetMain&o=7&rm=3',
    tag: 'Guide',
    date: 'Jan 12, 2025'
  },
  {
    title: 'RTX 5090 vs RX 9070 XT — Which Should You Buy?',
    excerpt: 'We benchmarked both cards across 20 games at 4K and 1440p. The results might surprise you — especially at the price points these cards are sitting at right now.',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=600&auto=format&fit=crop',
    tag: 'Review',
    date: 'Feb 3, 2025'
  },
  {
    title: 'Best Budget Builds Under $800 This Year',
    excerpt: 'You don\'t need to spend a fortune to game at high settings. Here are our top picks for every budget tier, tested and approved by our in-house build team.',
    image: 'https://wallpapers.com/images/hd/white-pc-1600-x-1200-8lywq01jo29yvf07.jpg',
    tag: 'Build Guide',
    date: 'Mar 18, 2025'
  },
]

const values = [
  { icon: '⚡', title: 'Performance First', desc: 'Every product we carry is tested and vetted by our in-house build team before it hits the shelves.' },
  { icon: '🛡️', title: 'Buyer Protection', desc: 'All orders come with a 30-day return policy and full manufacturer warranty support.' },
  { icon: '🚀', title: 'Fast Shipping', desc: 'Same-day dispatch on all in-stock items. Most orders arrive within 2 business days.' },
  { icon: '🤝', title: 'Expert Support', desc: 'Our team of builders is available 6 days a week to help you pick the right parts for your build.' },
]

const statRefs = ref([])
const postRefs = ref([])
const valueRefs = ref([])
const headerRef = ref(null)
const storyRef = ref(null)
const dividerRef = ref(null)
const divider2Ref = ref(null)
const briefsHeaderRef = ref(null)
const valuesHeaderRef = ref(null)
const bannerRef = ref(null)
let observer

function formatNumber(val) {
  if (val >= 1000) return (val / 1000).toFixed(0) + ',000'
  return val.toString()
}

function countUp(stat, duration = 1800) {
  const end = stat.value
  const startTime = performance.now()

  function update(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    const current = Math.floor(eased * end)
    stat.display = formatNumber(current) + stat.suffix
    if (progress < 1) requestAnimationFrame(update)
    else stat.display = formatNumber(end) + stat.suffix
  }

  requestAnimationFrame(update)
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')

          const statIndex = statRefs.value.indexOf(entry.target)
          if (statIndex !== -1) {
            setTimeout(() => countUp(stats.value[statIndex]), 1000 + statIndex * 150)
          }

          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 }
  )

  setTimeout(() => {
    const singles = [headerRef, storyRef, dividerRef, divider2Ref, briefsHeaderRef, valuesHeaderRef, bannerRef]
    singles.forEach(r => { if (r.value) observer.observe(r.value) })

    statRefs.value.forEach((el, i) => {
      if (el) { el.style.transitionDelay = `${i * 0.15}s`; observer.observe(el) }
    })
    postRefs.value.forEach((el, i) => {
      if (el) { el.style.transitionDelay = `${i * 0.12}s`; observer.observe(el) }
    })
    valueRefs.value.forEach((el, i) => {
      if (el) { el.style.transitionDelay = `${i * 0.1}s`; observer.observe(el) }
    })
  }, 100)
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
/* Header */
.about-header {
  margin-bottom: 48px;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.about-header.visible { opacity: 1; transform: translateY(0); }

.about-tag, .section-tag {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #888;
  display: block;
  margin-bottom: 12px;
}

.about-header h1 {
  font-size: 40px;
  font-weight: 800;
  color: var(--text, #111);
  letter-spacing: -1px;
  margin-bottom: 16px;
}

.accent { color: #888; }

.intro {
  color: #666;
  font-size: 16px;
  line-height: 1.8;
  max-width: 580px;
}

/* Stats */
.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 72px;
}

.stat {
  background: var(--card, #fff);
  padding: 32px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  border: 1px solid rgba(0,0,0,0.04);
  opacity: 0;
  transform: translateY(60px);
  transition: opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.stat.visible { opacity: 1; transform: translateY(0); }
.stat h2 { font-size: 28px; font-weight: 700; color: var(--text, #111); margin-bottom: 6px; }
.stat p { color: #888; font-size: 14px; }

/* Divider */
.divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, #ddd, transparent);
  margin: 64px 0;
  opacity: 0;
  transition: opacity 1s ease;
}

.divider.visible { opacity: 1; }

/* Story */
.story-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.story-section.visible { opacity: 1; transform: translateY(0); }

.story-image img {
  width: 100%;
  height: 360px;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.12);
}

.story-content h2 {
  font-size: 28px;
  font-weight: 800;
  color: var(--text, #111);
  line-height: 1.3;
  margin-bottom: 20px;
  letter-spacing: -0.5px;
}

.story-content p {
  color: #666;
  font-size: 15px;
  line-height: 1.9;
  margin-bottom: 14px;
}

/* Briefs */
.briefs-section { margin-bottom: 16px; }

.section-header {
  margin-bottom: 32px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.section-header.visible { opacity: 1; transform: translateY(0); }

.section-header h2 {
  font-size: 24px;
  font-weight: 800;
  color: var(--text, #111);
  letter-spacing: -0.5px;
  margin-top: 4px;
}

.brief-item {
  display: grid;
  grid-template-columns: 200px 1fr 48px;
  gap: 28px;
  align-items: center;
  padding: 28px 0;
  border-bottom: 1px solid #f0f0f0;
  opacity: 0;
  transform: translateX(-30px);
  transition: opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.brief-item.visible { opacity: 1; transform: translateX(0); }

.brief-image {
  width: 200px;
  height: 120px;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
}

.brief-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.brief-item.visible:hover .brief-image img {
  transform: scale(1.05);
}

.brief-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.brief-tag {
  background: #111;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.brief-date {
  font-size: 12px;
  color: #aaa;
}

.brief-body h3 {
  font-size: 16px;
  font-weight: 700;
  color: var(--text, #111);
  line-height: 1.4;
  margin-bottom: 8px;
}

.brief-body p {
  font-size: 13px;
  color: #888;
  line-height: 1.7;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.brief-number {
  font-size: 32px;
  font-weight: 800;
  color: #e8e8e8;
  text-align: right;
  letter-spacing: -1px;
  user-select: none;
}

/* Values */
.values-section { margin-bottom: 72px; }

.values-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
}

.value-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 28px 24px;
  border-bottom: 1px solid #f0f0f0;
  border-right: 1px solid #f0f0f0;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.value-item:nth-child(even) { border-right: none; }
.value-item:nth-last-child(-n+2) { border-bottom: none; }
.value-item.visible { opacity: 1; transform: translateY(0); }

.value-icon { font-size: 24px; flex-shrink: 0; margin-top: 2px; }

.value-item h3 {
  font-size: 14px;
  font-weight: 700;
  color: var(--text, #111);
  margin-bottom: 6px;
}

.value-item p {
  font-size: 13px;
  color: #888;
  line-height: 1.7;
}

/* Closing Banner */
.closing-banner {
  background: linear-gradient(135deg, #0a0a0a 0%, #1c1c1c 50%, #111 100%);
  padding: 64px 56px;
  border-radius: 20px;
  text-align: center;
  margin-bottom: 40px;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.closing-banner.visible { opacity: 1; transform: translateY(0); }

.closing-banner h2 {
  font-size: 28px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 10px;
  letter-spacing: -0.5px;
}

.closing-banner p {
  color: rgba(255,255,255,0.5);
  font-size: 15px;
  margin-bottom: 28px;
}

.closing-banner button {
  background: #fff;
  color: #111;
  border: none;
  padding: 14px 32px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.closing-banner button:hover {
  background: #e8e8e8;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
}
</style>