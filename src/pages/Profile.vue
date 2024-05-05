<script setup>
import {ref, onMounted} from 'vue'
import axios from 'axios'
import vueJwtDecode from 'vue-jwt-decode'

import CardList from '../components/CardList.vue'
import InfoBlock from '../components/InfoBlock.vue'
import {useRouter} from "vue-router";

const router = useRouter()
const orders = ref([])
const ordersLoaded = ref()

const getUserFromToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = vueJwtDecode.decode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsbmFtZSI6InVzZXIyMjgiLCJlbWFpbCI6InVzZXJAeWEucnUiLCJpYXQiOjE3MTQ5MjM2NzUsImV4cCI6MTcyMDEwNzY3NX0.5KlvDF5VLO7FKLuOhSqja-vAq-M2ezfRwcOCFf_ZZxg')
    return decodedToken.fullname;
  }
  return null;
};

const username = ref(getUserFromToken());


const logout = () => {
  localStorage.removeItem('token');
  username.value = null;
  router.push('/')
}

onMounted(async () => {
  try {
    const {data} = await axios.get('https://2475f30aea4ec3d4.mokky.dev/orders')
    orders.value = data.flatMap((obj) => obj.items)
    ordersLoaded.value = true
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <div v-if="ordersLoaded && orders.length > 0">
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-3xl font-bold">Профиль пользователя: {{ username }}</h2>
      <button @click="logout" class="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400">Выйти</button>
    </div>
    <CardList :items="orders" :is-favorites="true"/>
  </div>
  <div v-else-if="ordersLoaded && orders.length === 0">
    <InfoBlock
        title="У вас нет заказов"
        image-url="/emoji-2.png"
        description="Вы нищеброд? Оформите хотя бы один заказ"
    />
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>
