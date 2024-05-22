<script setup>
import {ref, onMounted, inject} from 'vue';
import axios from 'axios';
import {useRouter, useRoute} from 'vue-router';

const {addToCart} = inject('cartActions');
const router = useRouter();
const route = useRoute();

const sneaker = ref(null);
const activeSneakerSize = ref(0);
const sneakerId = route.query.id;
console.log(sneakerId);

const fetchSneaker = async () => {
  try {
    const response = await axios.get(`https://2475f30aea4ec3d4.mokky.dev/sneakers/${sneakerId}`);
    console.log("Ответ от сервера:", response.data);
    sneaker.value = response.data;
  } catch (e) {
    console.error('Ошибка при загрузке данных:', e);
    alert('Ошибка загрузки данных о кроссовках');
    router.push('/');
  }
};

onMounted(() => {
  fetchSneaker();
});

const addedCount = ref(0);
const showModal = ref(false);

const onClickAdd = () => {
  if (sneaker.value) {
    const item = {
      ...sneaker.value,
      size: sneaker.value.sizes[activeSneakerSize.value]
    };
    delete item.sizes
    addToCart(item);
    addedCount.value += 1;
  }
};

const setActiveSneakerSize = (index) => {
  activeSneakerSize.value = index;
};

const toggleModal = () => {
  showModal.value = !showModal.value;
};
</script>

<template>
  <div v-if="sneaker" class="flex flex-col items-center p-4">
    <div class="flex flex-row gap-32">
      <img class="w-96 h-96 object-cover" :src="sneaker.imageUrl" alt="Кроссовки" />
      <div class="flex-grow">
        <h1 class="text-2xl font-bold">{{ sneaker.title }}</h1>
        <h3 class="mt-4">Выберите размер: </h3>
        <div class="mt-4">
          <button @click="toggleModal"
                  class="inline-block w-40 px-4 py-2 text-left border border-gray-300 text-black rounded-md shadow-sm bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            <span>EU {{ sneaker.sizes[activeSneakerSize] }}</span>
            <svg class="inline-block w-5 h-5 float-right" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

        </div>
        <h3 class="mt-10">Цена: </h3>
        <p class="text-xl outline-black text-red-700">от {{ sneaker.price }} ₽</p>
        <button @click="onClickAdd"
                class="inline-block mt-4 w-52 px-4 py-2 text-left border border-gray-300 text-black rounded-md shadow-sm bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          Добавить в корзину
          <span v-if="addedCount > 0">({{ addedCount }})</span>
        </button>
      </div>
    </div>
  </div>
  <div v-else class="text-center py-10">
    Загрузка данных о кроссовках...
  </div>
  <div v-if="showModal" class="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
    <div class="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
      <span class="absolute top-0 right-0 p-4">
        <button @click="toggleModal" class="text-gray-500 hover:text-gray-800">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </span>
      <h2 class="text-2xl mb-4">Выберите размер</h2>
      <ul>
        <li v-for="(size, index) in sneaker.sizes" :key="index"
            @click="() => { setActiveSneakerSize(index); toggleModal(); }"
            :class="{'bg-blue-500 text-white': activeSneakerSize.value === index, 'cursor-pointer p-2 border border-gray-300 mb-2 hover:bg-gray-100': true}">
          {{ size }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.bg-smoke-light {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
