<script setup>
import { ref, onMounted, inject } from 'vue'
import axios from 'axios'

import CardList from '../components/CardList.vue'
import InfoBlock from '../components/InfoBlock.vue'
import {ContentLoader} from "vue-content-loader";

const { user } = inject('user')  // Инжекция данных пользователя
const favorites = ref([])
const favoritesLoaded = ref(false)

onMounted(async () => {
  try {
    if (!user.value.id) {
      console.error("Пользователь не авторизован");
      return;
    }
    const params = {
      user_id: user.value.id  // Добавляем фильтрацию по user_id
    };
    const { data } = await axios.get('https://2475f30aea4ec3d4.mokky.dev/favorites?_relations=sneakers', { params })
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
    <content-loader
        viewBox="0 0 1250 400"
        :speed="2"
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
    >
      <rect x="20" y="0" rx="15" ry="15" width="350" height="50" />
      <rect x="30" y="100" rx="15" ry="15" width="250" height="300" />
      <rect x="330" y="100" rx="15" ry="15" width="250" height="300" />
      <rect x="630" y="100" rx="15" ry="15" width="250" height="300" />
      <rect x="930" y="100" rx="15" ry="15" width="250" height="300" />
    </content-loader>
  </div>
</template>
