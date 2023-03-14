<template>
  <div>
    <div v-for="repo in repos" :key="repo.id" class="project">
      <h2>Project Name: {{ repo.name }}</h2>
      <p>Project Star Number: {{ repo.stars }}</p>
    </div>

    <div v-if="!repos || repos.length === 0" class="text-xl text-pink-400 sm:text-2xl md:text-4xl">
      Loading...
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const repos = ref([])

    const getRepoData = async () => {
      const [movieSearchResponse, userCardsResponse] = await Promise.all([
        fetch('https://api.github.com/repos/emr3rden/VueJS-Movie-Search'),
        fetch('https://api.github.com/repos/emr3rden/VueJS-User-Profile-Cards')
      ])

      const [movieSearchData, userCardsData] = await Promise.all([
        movieSearchResponse.json(),
        userCardsResponse.json()
      ])

      repos.value.push(
        {
          name: movieSearchData.name,
          stars: movieSearchData.stargazers_count
        },
        {
          name: userCardsData.name,
          stars: userCardsData.stargazers_count
        }
      )
    }

    onMounted(() => {
      getRepoData()
    })

    return {
      repos
    }
  }
}
</script>
