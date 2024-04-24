<template>
  <base-header />
  <div class="layout-content">
    <slot />
  </div>
</template>
<script setup lang="ts">
import BaseHeader from '@/components/BaseHeader.vue';
</script>
<style scoped>
.layout-content {
  min-height: 100vh;
  max-width: 797px;
  box-sizing: border-box;
  margin: 0 auto;
}
</style>
