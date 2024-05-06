<script setup>
import CardList from '../components/CardList.vue'
import axios from 'axios'
import {inject, reactive, watch, ref, onMounted} from 'vue'
import debounce from 'lodash.debounce'
import Footer from "@/components/Footer.vue";
import Slider from "@/components/Slider.vue";

const items = ref([])


const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const {user, fetchUserInfo} = inject('user')


const {addToCart, removeFromCart, cart} = inject('cartActions')



const onClickPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const onChangeSort = (event) => {
  filters.sortBy = event.target.value
}

const onChangeInput = debounce((event) => {
  filters.searchQuery = event.target.value
}, 150)

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }
    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }
    const {data} = await axios.get('https://2475f30aea4ec3d4.mokky.dev/sneakers', {
      params
    })
    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      isAdded: false
    }))
  } catch (error) {
    console.log(error)
  }
}

const fetchFavorites = async () => {
  try {
    if (!user.value.id) {
      console.error("Пользователь не авторизован");
      return;
    }
    const params = {
      user_id: user.value.id
    };
    const {data: favorites} = await axios.get('https://2475f30aea4ec3d4.mokky.dev/favorites', { params });
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.sneaker_id === item.id);
      return favorite ? {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id
      } : item;
    });
  } catch (error) {
    console.log(error);
  }
}

const addToFavorite = async (item) => {
  try {
    const obj = {
      sneaker_id: item.id,
      user_id: user.value.id
    }
    if (!item.isFavorite) {
      item.isFavorite = true
      await axios.post('https://2475f30aea4ec3d4.mokky.dev/favorites', obj)
      item.favoriteId = item.id
    } else {
      item.isFavorite = false
      await axios.delete(`https://2475f30aea4ec3d4.mokky.dev/favorites/${item.favoriteId}`)
      item.favoriteId = null
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []
  await fetchUserInfo();
  await fetchItems();
  await fetchFavorites();
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }));
});


watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})

watch(filters, fetchItems)

</script>
<template>
  <div class="w-full">
    <Slider/>
  </div>
  <div class="flex justify-between items-center mt-8">
    <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>
    <div class="flex gap-4">
      <select @change="onChangeSort" class="py-2 px-3 border rounded-md outline-none">
        <option value="title">По названию</option>
        <option value="price">По цене (дешевые)</option>
        <option value="-price">По цене (дорогие)</option>
      </select>
      <div class="relative">
        <img class="absolute left-4 top-3" src="/search.svg" alt="Search"/>
        <input
            @input="onChangeInput"
            class="border rounded py-2 pl-10 pr-4 outline-none focus:border-gray-400"
            type="text"
            placeholder="Поиск"
        />
      </div>
    </div>
  </div>
  <div class="mt-10">
    <CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart="onClickPlus"/>
  </div>
  <Footer/>
</template>
