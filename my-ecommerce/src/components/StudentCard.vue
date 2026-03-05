<template>
  <div class="card">
    <h2>{{ name }}</h2>
    <p>Course: {{ course }}</p>
  </div>
</template>

<script setup>
defineProps({
  name: String,
  course: String
})
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  margin: 8px;
  width: 200px;
}
</style>