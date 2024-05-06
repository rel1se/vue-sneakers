<script setup>
import {ref, onMounted, inject} from 'vue'
import axios from 'axios'

import CardList from '../components/CardList.vue'
import InfoBlock from '../components/InfoBlock.vue'
import {useRouter} from "vue-router";

const router = useRouter()
const orders = ref([])
const ordersLoaded = ref()
const { fetchUserInfo } = inject('user')
const items = ref([])
const username = ref('')
const isAdmin = ref(false)

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('cart')
  username.value = ''
  router.push('/')
}


const fetchItems = async () => {
  try {
    const {data} = await axios.get('https://2475f30aea4ec3d4.mokky.dev/sneakers')
    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      isAdded: false
    }))
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  const userInfo = await fetchUserInfo();
  if (userInfo) {
    username.value = userInfo.fullname;
    isAdmin.value = userInfo?.isAdmin
  }
  try {
    if (isAdmin.value){
      fetchItems()
    }
    const {data} = await axios.get(`https://2475f30aea4ec3d4.mokky.dev/orders?user_id=${userInfo.id}`)
    orders.value = data.flatMap((obj) => obj.items)
    ordersLoaded.value = true
  } catch (error) {
    console.error(error);
    ordersLoaded.value = true
  }
});


</script>

<template>
  <div v-if="ordersLoaded && orders.length > 0">
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-3xl font-bold">{{ username}}'s profile</h2>
      <button @click="logout"
              class="w-1/12 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400">
        Выйти
      </button>
    </div>
    <CardList :items="orders" :is-favorites="true"/>
    <div v-if="isAdmin" class="mt-10 mb-10 flex justify-between items-center">
      <h2 class="text-3xl font-bold">Edit items</h2>
      <router-link to="/add" class="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400">
          Добавить кроссовки
      </router-link>
    </div>
      <CardList :items="items" :is-favorites="false" :is-admin="true"></CardList>
=
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
