<template>
  <main class="portfolio">
    <div v-if="!repos || repos.length === 0" class="text-xl text-pink-400 sm:text-2xl md:text-4xl">
      Loading...
    </div>

    <ul
      class="projects-list flex w-full flex-wrap items-center justify-center gap-6 sm:gap-7 md:gap-8"
    >
      <li
        v-for="repo in repos"
        :key="repo.id"
        class="project-card"
        :style="`background-image: url(${repo.img})`"
      >
        <div
          class="project-info relative z-20 flex h-full flex-col items-center justify-between p-5 text-center opacity-0 transition duration-300 ease-in-out"
        >
          <div class="project-name">
            {{ repo.name }}
          </div>

          <div class="project-description">{{ repo.desc }}</div>

          <div class="project-links flex justify-center gap-4 text-sm">
            <a
              :href="repo.url"
              target="_blank"
              rel="noopener noreferrer"
              class="github project-link"
            >
              <div class="h-[18px] w-[18px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="h-full w-full"
                >
                  <path
                    d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                  ></path>
                </svg>
              </div>
              <div class="border border-gray-50"></div>
              <div class="flex select-none items-center justify-center gap-2">
                <svg viewBox="0 0 16 16" class="h-[14px] w-[14px]" fill="currentColor">
                  <path
                    d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"
                  ></path>
                </svg>
                <div>Star</div>
                <div class="rounded-full bg-[#3a3a3a] px-[7px] pt-[3px] pb-[2px] leading-4">
                  {{ repo.stars }}
                </div>
              </div>
            </a>
            <a
              :href="repo.live"
              target="_blank"
              rel="noopener noreferrer"
              class="vercel project-link"
            >
              <div class="h-[18px] w-[18px]">
                <svg viewBox="0 0 75 65" fill="currentColor" class="h-full w-full">
                  <path d="M37.59.25l36.95 64H.64l36.95-64z"></path>
                </svg>
              </div>
              <div>Live Action</div>
            </a>
          </div>
        </div>
      </li>
    </ul>
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
const studyRepos = computed(() => filterRepos('study'))
const resourceRepos = computed(() => filterRepos('resource'))

function filterRepos(topic) {
  return repos.value.filter((repo) => repo.topics.includes(topic))
}

onMounted(() => {
  getRepoData()
})
</script>
