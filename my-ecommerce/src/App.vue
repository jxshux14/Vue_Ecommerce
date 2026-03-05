<template>
  <div :class="['app-wrapper', { 'home-bg': isHome, 'page-bg': !isHome }]">
    <nav>
      <div class="nav-brand">
        <span class="logo">⚡</span> RigStore
      </div>
      <div class="nav-links">
        <router-link to="/">Home</router-link>
        <router-link to="/products">Products</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/contact">Contact</router-link>
      </div>
      <div class="nav-cart" @click="$router.push('/cart')">
        🛒 <span class="cart-count">{{ cart.itemCount }}</span>
      </div>
      
    </nav>
     <main>
      <router-view />
    </main>
    <footer>
  <div class="footer-content">
    <div class="footer-brand">
      <span>⚡ RigStore</span>
      <p>The ultimate destination for PC builders and gamers.</p>
    </div>
    <div class="footer-links">
      <router-link to="/">Home</router-link>
      <router-link to="/products">Products</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/contact">Contact</router-link>
    </div>
  </div>
  <p class="footer-copy">© 2025 RigStore. All rights reserved.</p>
</footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from './stores/cart'

const cart = useCartStore()
const route = useRoute()
const isHome = computed(() => route.path === '/')

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}


body {
  /* keep default grey only for non-home pages; home-bg covers it anyway */
  background: #f0f0f0;
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
}

.home-bg {
  position: relative;
}

.home-bg::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: 
    linear-gradient(rgba(240,240,240,0.9), rgba(240,240,240,0.65)),
    url('https://images.unsplash.com/photo-1491895200222-0fc4a4c35e18?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  z-index: -1;
  pointer-events: none;
}


.page-bg::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background:
    linear-gradient(rgba(240,240,240,0.95), rgba(240,240,240,0.8)),
    url('https://plus.unsplash.com/premium_photo-1683129669033-c2eaa3dadc2d?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  z-index: -1;
  pointer-events: none;
}

/* Navbar */
nav {
  background: #111;
  padding: 16px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 200; /* ensure nav stays above the home-bg pseudo element */
}

.nav-brand {
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo { font-size: 22px; }

.nav-links {
  display: flex;
  gap: 32px;
}

.nav-links a {
  color: #aaa;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: #fff;
}

.nav-cart {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  position: relative;
}

.cart-count {
  background: #fff;
  color: #111;
  font-size: 11px;
  font-weight: 700;
  border-radius: 50%;
  padding: 1px 6px;
  margin-left: 4px;
}

/* Pages */
.page {
  max-width: 960px;
  margin: 60px auto;
  padding: 0 24px;
}

/* Hero */
.hero {
  background: #111;
  color: #fff;
  padding: 64px 48px;
  border-radius: 16px;
  margin-bottom: 40px;
}

.hero h1 {
  font-size: 40px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 16px;
}

.accent { color: #a0a0a0; }

.hero p {
  color: #aaa;
  font-size: 16px;
  margin-bottom: 28px;
}

.hero button {
  background: #fff;
  color: #111;
  border: none;
  padding: 14px 32px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.hero button:hover { background: #e0e0e0; }

/* Categories */
.categories {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.category-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px 16px;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  transition: transform 0.2s, box-shadow 0.2s;
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}

.category-card .icon { font-size: 28px; }

.category-card p {
  margin-top: 10px;
  font-size: 13px;
  font-weight: 600;
  color: #111;
}

/* About Stats */
.page h1 {
  font-size: 28px;
  font-weight: 700;
  color: #111;
  margin-bottom: 12px;
}

.page > p {
  color: #666;
  font-size: 15px;
  line-height: 1.7;
  margin-bottom: 40px;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.stat {
  background: #fff;
  padding: 32px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}

.stat h2 {
  font-size: 28px;
  font-weight: 700;
  color: #111;
  margin-bottom: 6px;
}

.stat p { color: #888; font-size: 14px; }

/* Contact */
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
}

.info-item span { font-size: 22px; }

.info-item p {
  color: #111;
  font-size: 15px;
  font-weight: 500;
  margin: 0;
}

footer {
  background: #111;
  color: #fff;
  padding: 48px;
  margin-top: 80px;
}

.footer-content {
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
}

.footer-brand span {
  font-size: 20px;
  font-weight: 700;
}

.footer-brand p {
  color: #888;
  font-size: 13px;
  margin-top: 8px;
  max-width: 260px;
  line-height: 1.6;
}

.footer-links {
  display: flex;
  gap: 24px;
}

.footer-links a {
  color: #aaa;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}

.footer-links a:hover { color: #fff; }

.footer-copy {
  max-width: 960px;
  margin: 0 auto;
  color: #555;
  font-size: 13px;
  border-top: 1px solid #222;
  padding-top: 24px;
}
</style>
