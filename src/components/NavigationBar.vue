<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="nav-bar">
      <RouterLink to="/" class="nav-bar-link">Hello</RouterLink>
      <RouterLink to="/whoami" class="nav-bar-link">Whoami</RouterLink>
      <RouterLink to="/skills" class="nav-bar-link">Skills</RouterLink>
      <RouterLink to="/portfolio" class="nav-bar-link">Portfolio</RouterLink>
      <RouterLink to="/tools" class="nav-bar-link">Tools</RouterLink>
    </nav>
  </header>

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
