<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import CardList from '../components/CardList.vue'
import InfoBlock from '../components/InfoBlock.vue'

const favorites = ref([])
const favoritesLoaded = ref(false)

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://2475f30aea4ec3d4.mokky.dev/favorites?_relations=sneakers'
    )
    favorites.value = data.map((obj) => obj.sneaker)
    favoritesLoaded.value = true
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <div v-if="favoritesLoaded && favorites.length > 0">
    <h2 class="text-3xl font-bold mb-8">Избранные товары</h2>
    <CardList :items="favorites" :is-favorites="true" />
  </div>
  <div v-else-if="favoritesLoaded && favorites.length === 0">
    <InfoBlock
      title="Закладок нет"
      image-url="/emoji-1.png"
      description="Вы ничего не добавляли в закладки"
    />
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>
