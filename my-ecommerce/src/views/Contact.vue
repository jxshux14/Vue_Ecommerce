<template>
  <div class="page">
    <h1>Contact Us</h1>
    <p>Have questions about your build? We're here to help.</p>

    <div class="contact-info">
      <div
        class="info-item"
        v-for="(item, index) in contactItems"
        :key="item.label"
        :ref="el => { if (el) itemRefs[index] = el }"
      >
        <span>{{ item.icon }}</span>
        <p>{{ item.text }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const contactItems = [
  { icon: '📧', text: 'support@rigstore.com' },
  { icon: '📞', text: '+1 (800) RIG-STORE' },
  { icon: '🕐', text: 'Mon–Sat, 9AM – 6PM' },
]

const itemRefs = ref([])
let observer

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15 }
  )

  setTimeout(() => {
    itemRefs.value.forEach((el, i) => {
      if (el) {
        el.style.transitionDelay = `${i * 0.15}s`
        observer.observe(el)
      }
    })
  }, 100)
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.page h1 {
  font-size: 28px;
  font-weight: 700;
  color: #111;
  margin-bottom: 12px;
}

.page > p {
  color: #666;
  font-size: 15px;
  margin-bottom: 8px;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 32px;
}

.info-item {
  background: #fff;
  padding: 20px 24px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  border: 1px solid rgba(0,0,0,0.04);

  /* Start state — hidden and off to the left */
  opacity: 0;
  transform: translateX(-60px);
  transition: opacity 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.info-item.visible {
  opacity: 1;
  transform: translateX(0);
}

.info-item span {
  font-size: 22px;
  flex-shrink: 0;
}

.info-item p {
  color: #111;
  font-size: 15px;
  font-weight: 500;
  margin: 0;
}
</style>