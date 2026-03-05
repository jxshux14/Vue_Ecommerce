import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {

  // State
  const items = ref([])

  // Getters
  const itemCount = computed(() =>
    items.value.reduce((total, item) => total + item.quantity, 0)
  )

  const cartTotal = computed(() =>
    items.value.reduce((total, item) => total + item.price * item.quantity, 0)
  )

  // Actions
  function addToCart(product) {
    const existing = items.value.find(i => i.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
  }

  function removeFromCart(productId) {
    items.value = items.value.filter(i => i.id !== productId)
  }

  function decreaseQuantity(productId) {
    const item = items.value.find(i => i.id === productId)
    if (item && item.quantity > 1) {
      item.quantity--
    } else {
      removeFromCart(productId)
    }
  }

  function clearCart() {
    items.value = []
  }

  return {
    items,
    itemCount,
    cartTotal,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    clearCart
  }
})