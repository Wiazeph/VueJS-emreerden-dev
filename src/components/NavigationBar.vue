<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav class="nav-bar">
    <RouterLink to="/">Hello</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/skills">Skills</RouterLink>
    <RouterLink to="/projects">Projects</RouterLink>
    <RouterLink to="/tools">Tools</RouterLink>
  </nav>

  <RouterView />
</template>
