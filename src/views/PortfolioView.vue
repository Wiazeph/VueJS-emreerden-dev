<template>
  <main class="portfolio">
    <div class="projects">
      <div class="section-desc">Projects</div>

      <div v-if="!repos || repos.length === 0" class="text-xl text-pink-400 sm:text-2xl">
        Loading...
      </div>

      <ul class="section-list">
        <li
          v-for="repo in projectRepos"
          :key="repo.id"
          class="section-card"
          :style="`background-image: url(${repo.img})`"
        ></li>
      </ul>
    </div>

    <div class="resources">
      <div class="section-desc">Resources</div>

      <div v-if="!repos || repos.length === 0" class="text-xl text-pink-400 sm:text-2xl">
        Loading...
      </div>

      <ul class="section-list">
        <li
          v-for="repo in resourceRepos"
          :key="repo.id"
          class="section-card"
          :style="`background-image: url(${repo.img})`"
        ></li>
      </ul>
    </div>

    <div class="studies">
      <div class="section-desc">Studies</div>

      <div v-if="!repos || repos.length === 0" class="text-xl text-pink-400 sm:text-2xl">
        Loading...
      </div>

      <ul class="section-list">
        <li
          v-for="repo in studyRepos"
          :key="repo.id"
          class="section-card"
          :style="`background-image: url(${repo.img})`"
        ></li>
      </ul>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const repos = ref([])

const getRepoData = async () => {
  const response = await fetch('https://api.github.com/users/emr3rden/repos')

  const data = (await response.json()).filter((repo) =>
    ['project', 'resource', 'study'].some((topic) => repo.topics.includes(topic))
  )

  repos.value = data
    .map((repo) => ({
      url: repo.html_url,
      live: repo.homepage,
      name: repo.name,
      desc: repo.description,
      stars: repo.stargazers_count,
      topics: repo.topics,
      img: `https://github.com/emr3rden/${repo.name}/blob/main/thumbnail/${repo.name}.png?raw=true`
    }))
    .sort((a, b) => b.stars - a.stars)
}

const projectRepos = computed(() => filterRepos('project'))
const resourceRepos = computed(() => filterRepos('resource'))
const studyRepos = computed(() => filterRepos('study'))

function filterRepos(topic) {
  return repos.value.filter((repo) => repo.topics.includes(topic))
}

onMounted(() => {
  getRepoData()
})
</script>

<style scoped>
@tailwind components;
@tailwind utilities;

@layer components {
  .section-card {
    @apply relative h-[265px] w-full min-w-[330px] max-w-[350px] overflow-hidden rounded-lg border border-gray-600 bg-cover bg-center bg-no-repeat shadow-lg;
  }
}

@layer utilities {
  .portfolio {
    @apply flex w-full max-w-[800px] flex-col items-center justify-center gap-14 pb-8 sm:pb-9 md:gap-16 md:pb-10;
  }

  .section-desc {
    @apply mb-6 select-none text-center text-lg tracking-wide underline decoration-wavy sm:mb-7 sm:text-xl md:mb-8 md:text-2xl;
  }

  .section-list {
    @apply flex w-full flex-wrap items-center justify-center gap-6 sm:gap-7 md:gap-8;
  }

  .section-card::before,
  .section-card::after {
    @apply absolute left-0 z-10 h-full w-[calc(100%+10px)] bg-[#222222] transition duration-500 content-[''];
  }

  .section-card::before {
    @apply -top-5 -translate-y-full;
  }

  .section-card:before {
    clip-path: polygon(0 0, 100% 0, 100% 45%, 0% 100%);
  }

  .section-card::after {
    @apply -bottom-5 translate-y-full;
  }

  .section-card:after {
    clip-path: polygon(0 55%, 100% 0, 100% 100%, 0% 100%);
  }

  .section-card:hover::before,
  .section-card:hover::after {
    @apply translate-y-0;
  }

  .section-card:hover .card-info {
    @apply opacity-100 delay-300;
  }

  .card-info {
    @apply relative z-20 flex h-full flex-col items-center justify-between p-5 text-center opacity-0 transition duration-300 ease-in-out;
  }

  .card-name {
    @apply relative w-fit text-lg;
  }

  .card-links {
    @apply flex justify-center gap-4 text-sm;
  }

  .card-link {
    @apply flex h-10 w-fit cursor-pointer select-none items-center gap-2 rounded-md border border-gray-600 bg-[#222222] px-3 shadow-pink-400 transition duration-300 ease-in-out hover:border-pink-400 hover:text-pink-400 hover:shadow-[0px_0px_10px];
  }
}
</style>
