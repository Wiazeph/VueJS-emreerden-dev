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
      const [resourcesResponse, movieSearchResponse, userCardsResponse] = await Promise.all([
        fetch('https://api.github.com/repos/emr3rden/Front-End-Development-Resources'),
        fetch('https://api.github.com/repos/emr3rden/VueJS-Movie-Search'),
        fetch('https://api.github.com/repos/emr3rden/VueJS-User-Profile-Cards')
      ])

      const [resourcesData, movieSearchData, userCardsData] = await Promise.all([
        resourcesResponse.json(),
        movieSearchResponse.json(),
        userCardsResponse.json()
      ])

      repos.value.push(
        {
          url: resourcesData.html_url,
          live: resourcesData.homepage,
          name: resourcesData.name,
          desc: resourcesData.description,
          stars: resourcesData.stargazers_count,
          img: 'https://github.com/emr3rden/Front-End-Development-Resources/blob/main/thumbnail/Front-End-Development-Resources.png?raw=true'
        },
        {
          url: movieSearchData.html_url,
          live: movieSearchData.homepage,
          name: movieSearchData.name,
          desc: movieSearchData.description,
          stars: movieSearchData.stargazers_count,
          img: 'https://github.com/emr3rden/VueJS-Movie-Search/blob/main/thumbnail/VueJS-Movie-Search.png?raw=true'
        },
        {
          url: userCardsData.html_url,
          live: userCardsData.homepage,
          name: userCardsData.name,
          desc: userCardsData.description,
          stars: userCardsData.stargazers_count,
          img: 'https://github.com/emr3rden/VueJS-User-Profile-Cards/blob/main/thumbnail/VueJS-User-Profile-Cards.png?raw=true'
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
