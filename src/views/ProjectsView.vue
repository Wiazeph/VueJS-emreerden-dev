<template>
  <div>
    <div class="repo">
      <h2>Name: {{ repos[0].name }}</h2>
      <p>Stars: {{ repos[0].stars }}</p>
    </div>
    <div class="repo">
      <h2>Name: {{ repos[1].name }}</h2>
      <p>Stars: {{ repos[1].stars }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const repos = ref([
      {
        name: 'Loading...',
        stars: 'Loading...'
      },
      {
        name: 'Loading...',
        stars: 'Loading...'
      }
    ])

    const getRepoData = async () => {
      const movieSearchResponse = await fetch(
        'https://api.github.com/repos/emr3rden/VueJS-Movie-Search'
      )
      const movieSearchData = await movieSearchResponse.json()

      const movieSearch = {
        name: movieSearchData.name,
        stars: movieSearchData.stargazers_count
      }

      const userCardsResponse = await fetch(
        'https://api.github.com/repos/emr3rden/VueJS-User-Profile-Cards'
      )
      const userCardsData = await userCardsResponse.json()

      const userCards = {
        name: userCardsData.name,
        stars: userCardsData.stargazers_count
      }

      repos.value = [movieSearch, userCards]
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
