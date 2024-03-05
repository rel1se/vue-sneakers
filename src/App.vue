<script setup>
import Header from '@/components/Header.vue'
import Home from '@/pages/Home.vue'
import Favorites from '@/pages/Favorites.vue'
import { computed, provide, ref, watch } from 'vue'
import Drawer from '@/components/Drawer.vue'

/* Корзина START*/

const cart = ref([])

const cartOpen = ref(false)

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))

const tax = computed(() => Math.round((totalPrice.value * 5) / 100))

const closeCart = () => {
  cartOpen.value = false
}

const openCart = () => {
  cartOpen.value = true
}

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)

provide('cartActions', {
  closeCart,
  openCart,
  addToCart,
  removeFromCart,
  cart
})

/* Корзина END*/
</script>

<template>
  <Drawer v-if="cartOpen" :total-price="totalPrice" :tax="tax" />
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-10">
    <Header @open-cart="openCart" :total-price="totalPrice" />
    <div class="p-10">
      <router-view></router-view>
    </div>
  </div>
</template>
