<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="nav-bar">
      <RouterLink to="/" class="nav-bar-link">Hello</RouterLink>
      <RouterLink to="/whoami" class="nav-bar-link">Whoami</RouterLink>
      <RouterLink to="/skills" class="nav-bar-link">Skills</RouterLink>
      <RouterLink to="/projects" class="nav-bar-link">Projects</RouterLink>
      <RouterLink to="/tools" class="nav-bar-link">Tools</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>
