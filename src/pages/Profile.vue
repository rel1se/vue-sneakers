<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import CardList from '../components/CardList.vue'
import InfoBlock from '../components/InfoBlock.vue'

const orders = ref([])
const ordersLoaded = ref()

onMounted(async () => {
  try {
    const { data } = await axios.get('https://2475f30aea4ec3d4.mokky.dev/orders')
    orders.value = data.flatMap((obj) => obj.items)
    ordersLoaded.value = true
    console.log(orders.value)
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <div v-if="ordersLoaded && orders.length > 0">
    <h2 class="text-3xl font-bold mb-8">Мой профиль</h2>
    <CardList :items="orders" :is-favorites="true" />
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
