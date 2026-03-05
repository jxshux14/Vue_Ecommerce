<template>
  <div class="page">
    <!-- If cart is empty -->
    <div v-if="cart.items.length === 0" class="empty">
      <h2>Nothing to checkout</h2>
      <p>Your cart is empty. Add some parts first!</p>
      <button @click="$router.push('/products')">Browse Products</button>
    </div>

    <div v-else class="checkout-layout">
      <!-- Left: Form -->
      <div class="form-section">
        <h1>Checkout</h1>
        <p class="subtitle">Fill in your details to complete your order</p>

        <!-- Personal Info -->
        <div class="form-group">
          <h3>Personal Information</h3>
          <div class="input-row">
            <div class="field">
              <label>First Name</label>
              <input
                v-model="form.firstName"
                type="text"
                placeholder="John"
                :class="{ error: errors.firstName }"
              />
              <span class="error-msg" v-if="errors.firstName">{{ errors.firstName }}</span>
            </div>
            <div class="field">
              <label>Last Name</label>
              <input
                v-model="form.lastName"
                type="text"
                placeholder="Doe"
                :class="{ error: errors.lastName }"
              />
              <span class="error-msg" v-if="errors.lastName">{{ errors.lastName }}</span>
            </div>
          </div>
          <div class="field">
            <label>Email Address</label>
            <input
              v-model="form.email"
              type="email"
              placeholder="john@example.com"
              :class="{ error: errors.email }"
            />
            <span class="error-msg" v-if="errors.email">{{ errors.email }}</span>
          </div>
          <div class="field">
            <label>Phone Number</label>
            <input
              v-model="form.phone"
              type="text"
              placeholder="+1 234 567 8900"
              :class="{ error: errors.phone }"
            />
            <span class="error-msg" v-if="errors.phone">{{ errors.phone }}</span>
          </div>
        </div>

        <!-- Shipping Info -->
        <div class="form-group">
          <h3>Shipping Address</h3>
          <div class="field">
            <label>Street Address</label>
            <input
              v-model="form.address"
              type="text"
              placeholder="123 Main Street"
              :class="{ error: errors.address }"
            />
            <span class="error-msg" v-if="errors.address">{{ errors.address }}</span>
          </div>
          <div class="input-row">
            <div class="field">
              <label>City</label>
              <input
                v-model="form.city"
                type="text"
                placeholder="New York"
                :class="{ error: errors.city }"
              />
              <span class="error-msg" v-if="errors.city">{{ errors.city }}</span>
            </div>
            <div class="field">
              <label>ZIP Code</label>
              <input
                v-model="form.zip"
                type="text"
                placeholder="10001"
                :class="{ error: errors.zip }"
              />
              <span class="error-msg" v-if="errors.zip">{{ errors.zip }}</span>
            </div>
          </div>
        </div>

        <!-- Payment Info -->
        <div class="form-group">
          <h3>Payment Details</h3>
          <div class="field">
            <label>Card Number</label>
            <input
              v-model="form.cardNumber"
              type="text"
              placeholder="1234 5678 9012 3456"
              maxlength="19"
              :class="{ error: errors.cardNumber }"
              @input="formatCard"
            />
            <span class="error-msg" v-if="errors.cardNumber">{{ errors.cardNumber }}</span>
          </div>
          <div class="input-row">
            <div class="field">
              <label>Expiry Date</label>
              <input
                v-model="form.expiry"
                type="text"
                placeholder="MM/YY"
                maxlength="5"
                :class="{ error: errors.expiry }"
              />
              <span class="error-msg" v-if="errors.expiry">{{ errors.expiry }}</span>
            </div>
            <div class="field">
              <label>CVV</label>
              <input
                v-model="form.cvv"
                type="password"
                placeholder="•••"
                maxlength="3"
                :class="{ error: errors.cvv }"
              />
              <span class="error-msg" v-if="errors.cvv">{{ errors.cvv }}</span>
            </div>
          </div>
        </div>

        <button class="submit-btn" @click="submitOrder">
          Place Order — ${{ cart.cartTotal.toFixed(2) }}
        </button>
      </div>

      <!-- Right: Order Summary -->
      <div class="summary-section">
        <h3>Order Summary</h3>
        <div class="summary-items">
          <div class="summary-item" v-for="item in cart.items" :key="item.id">
            <div class="item-img">
              <img :src="item.image" :alt="item.title" />
            </div>
            <div class="item-details">
              <p class="item-name">{{ item.title }}</p>
              <p class="item-qty">Qty: {{ item.quantity }}</p>
            </div>
            <p class="item-price">${{ (item.price * item.quantity).toFixed(2) }}</p>
          </div>
        </div>

        <div class="summary-totals">
          <div class="total-row">
            <span>Subtotal</span>
            <span>${{ cart.cartTotal.toFixed(2) }}</span>
          </div>
          <div class="total-row">
            <span>Shipping</span>
            <span class="free">FREE</span>
          </div>
          <div class="total-row grand">
            <span>Total</span>
            <span>${{ cart.cartTotal.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div class="modal-overlay" v-if="showSuccess">
      <div class="modal">
        <div class="modal-icon">✅</div>
        <h2>Order Placed!</h2>
        <p>Thank you, <strong>{{ form.firstName }}</strong>! Your PC parts are on the way.</p>
        <p class="order-num">Order #{{ orderNumber }}</p>
        <button @click="finishOrder">Back to Shop</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'

const router = useRouter()
const cart = useCartStore()

const showSuccess = ref(false)
const orderNumber = ref('')

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  zip: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
})

const errors = reactive({})

function formatCard(e) {
  let val = e.target.value.replace(/\D/g, '').substring(0, 16)
  form.cardNumber = val.replace(/(.{4})/g, '$1 ').trim()
}

function validate() {
  Object.keys(errors).forEach(k => delete errors[k])

  if (!form.firstName.trim()) errors.firstName = 'First name is required'
  if (!form.lastName.trim()) errors.lastName = 'Last name is required'

  if (!form.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Enter a valid email address'
  }

  if (!form.phone.trim()) errors.phone = 'Phone number is required'
  if (!form.address.trim()) errors.address = 'Address is required'
  if (!form.city.trim()) errors.city = 'City is required'

  if (!form.zip.trim()) {
    errors.zip = 'ZIP code is required'
  } else if (!/^\d{4,6}$/.test(form.zip)) {
    errors.zip = 'Enter a valid ZIP code'
  }

  if (!form.cardNumber.trim()) {
    errors.cardNumber = 'Card number is required'
  } else if (form.cardNumber.replace(/\s/g, '').length !== 16) {
    errors.cardNumber = 'Enter a valid 16-digit card number'
  }

  if (!form.expiry.trim()) {
    errors.expiry = 'Expiry date is required'
  } else if (!/^\d{2}\/\d{2}$/.test(form.expiry)) {
    errors.expiry = 'Format must be MM/YY'
  }

  if (!form.cvv.trim()) {
    errors.cvv = 'CVV is required'
  } else if (!/^\d{3}$/.test(form.cvv)) {
    errors.cvv = 'CVV must be 3 digits'
  }

  return Object.keys(errors).length === 0
}

function submitOrder() {
  if (!validate()) return
  orderNumber.value = 'RIG-' + Math.random().toString(36).substring(2, 8).toUpperCase()
  showSuccess.value = true
}

function finishOrder() {
  cart.clearCart()
  showSuccess.value = false
  router.push('/')
}
</script>

<style scoped>
.empty {
  text-align: center;
  padding: 80px 24px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}

.empty h2 { font-size: 22px; color: #111; margin-bottom: 8px; }
.empty p { color: #888; margin-bottom: 24px; }
.empty button {
  background: #111;
  color: #fff;
  border: none;
  padding: 12px 28px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}

.checkout-layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 32px;
  align-items: start;
}

/* Form */
.form-section {
  background: #fff;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}

.form-section h1 {
  font-size: 24px;
  font-weight: 700;
  color: #111;
  margin-bottom: 4px;
}

.subtitle {
  color: #888;
  font-size: 14px;
  margin-bottom: 32px;
}

.form-group {
  margin-bottom: 32px;
}

.form-group h3 {
  font-size: 14px;
  font-weight: 700;
  color: #111;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
}

.input-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}

label {
  font-size: 13px;
  font-weight: 600;
  color: #444;
}

input {
  padding: 12px 14px;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  color: #111;
  outline: none;
  transition: border 0.2s;
  font-family: 'Inter', sans-serif;
}

input:focus { border-color: #111; }
input.error { border-color: #e53e3e; }

.error-msg {
  font-size: 12px;
  color: #e53e3e;
}

.submit-btn {
  width: 100%;
  background: #111;
  color: #fff;
  border: none;
  padding: 16px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 8px;
  transition: background 0.2s;
}

.submit-btn:hover { background: #333; }

/* Summary */
.summary-section {
  background: #fff;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  position: sticky;
  top: 80px;
}

.summary-section h3 {
  font-size: 16px;
  font-weight: 700;
  color: #111;
  margin-bottom: 20px;
}

.summary-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.item-img {
  width: 48px;
  height: 48px;
  background: #f7f7f7;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.item-img img {
  max-width: 36px;
  max-height: 36px;
  object-fit: contain;
}

.item-details { flex: 1; }

.item-name {
  font-size: 12px;
  font-weight: 600;
  color: #111;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.item-qty { font-size: 12px; color: #888; margin-top: 2px; }

.item-price {
  font-size: 13px;
  font-weight: 700;
  color: #111;
  white-space: nowrap;
}

.summary-totals {
  border-top: 1px solid #f0f0f0;
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.total-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
}

.total-row.grand {
  font-size: 18px;
  font-weight: 700;
  color: #111;
  border-top: 1px solid #f0f0f0;
  padding-top: 12px;
  margin-top: 4px;
}

.free { color: #22c55e; font-weight: 600; }

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal {
  background: #fff;
  border-radius: 16px;
  padding: 48px;
  text-align: center;
  max-width: 400px;
  width: 90%;
}

.modal-icon { font-size: 48px; margin-bottom: 16px; }
.modal h2 { font-size: 24px; font-weight: 700; color: #111; margin-bottom: 8px; }
.modal p { color: #666; font-size: 15px; margin-bottom: 4px; }
.order-num {
  font-size: 13px;
  font-weight: 700;
  color: #111;
  background: #f0f0f0;
  padding: 8px 16px;
  border-radius: 8px;
  display: inline-block;
  margin: 12px 0 24px;
}

.modal button {
  background: #111;
  color: #fff;
  border: none;
  padding: 14px 32px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}
</style>