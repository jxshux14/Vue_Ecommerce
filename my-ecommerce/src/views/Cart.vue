<template>
  <div class="page">
    <h1>Your Cart</h1>

    <p v-if="cart.items.length === 0" class="empty">
      Your cart is empty. Go add some parts! 🖥️
    </p>

    <div v-else>
      <div class="cart-item" v-for="item in cart.items" :key="item.id">
        <div class="item-image">
          <img :src="item.image" :alt="item.title" />
        </div>
        <div class="item-info">
          <h3>{{ item.title }}</h3>
          <p class="price">${{ item.price }}</p>
        </div>
        <div class="item-controls">
          <button @click="cart.decreaseQuantity(item.id)">−</button>
          <span>{{ item.quantity }}</span>
          <button @click="cart.addToCart(item)">+</button>
          <button class="remove" @click="cart.removeFromCart(item.id)">✕</button>
        </div>
      </div>

      <div class="cart-summary">
        <div class="summary-row">
          <span>Total Items</span>
          <span>{{ cart.itemCount }}</span>
        </div>
        <div class="summary-row total">
          <span>Total</span>
          <span>${{ cart.cartTotal.toFixed(2) }}</span>
        </div>
        <button class="checkout-btn" @click="$router.push('/checkout')">
          Proceed to Checkout
        </button>
        <button class="clear-btn" @click="cart.clearCart()">
          Clear Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart'
const cart = useCartStore()
</script>

<style scoped>
.empty {
  text-align: center;
  color: #aaa;
  font-size: 16px;
  margin-top: 60px;
}

.cart-item {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  display: grid;
  grid-template-columns: 120px 1fr auto;
  gap: 16px;
  align-items: center;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}

.item-image {
  width: 120px;
  height: 90px;
  background: #f7f7f7;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}

.item-image img {
  max-height: 80px;
  max-width: 100%;
  object-fit: contain;
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.item-info h3 {
  font-size: 14px;
  font-weight: 600;
  color: #111;
  line-height: 1.4;
}

.price {
  color: #888;
  font-size: 13px;
}

.item-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.item-controls button {
  background: #111;
  color: #fff;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

.item-controls span {
  font-size: 15px;
  font-weight: 600;
  min-width: 20px;
  text-align: center;
}

.remove {
  background: #f0f0f0 !important;
  color: #111 !important;
}

.cart-summary {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  margin-top: 24px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
}

.summary-row.total {
  font-size: 18px;
  font-weight: 700;
  color: #111;
  border-top: 1px solid #f0f0f0;
  padding-top: 12px;
  margin-top: 8px;
}

.checkout-btn {
  width: 100%;
  background: #111;
  color: #fff;
  border: none;
  padding: 14px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 16px;
}

.checkout-btn:hover { background: #333; }

.clear-btn {
  width: 100%;
  background: #f0f0f0;
  color: #111;
  border: none;
  padding: 12px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 8px;
}

.clear-btn:hover { background: #e0e0e0; }
</style>