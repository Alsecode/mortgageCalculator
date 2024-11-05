<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script setup>
</script>

<style scoped>
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 56px;
  padding: 0 20px;
  background: var(--picton-blue);
  color: var(--white);
  border-radius: 8px;
  font-weight: 500;
  transition: 0.3s all ease;
}

.button:hover {
  background: var(--denim);
}
</style>