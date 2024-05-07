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
console.log(sneakerId)

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

const onClickAdd = () => {
  if (sneaker.value) {
    const item = {
      ...sneaker.value,
      size: sneaker.value.sizes[activeSneakerSize.value]
    };
    addToCart(item);
    addedCount.value += 1;
  }
};

const setActiveSneakerSize = (index) => {
  activeSneakerSize.value = index;
};
</script>


<template>
  <div v-if="sneaker" class="flex flex-col items-center p-4">
    <div class="flex flex-row gap-4">
      <img class="w-72 h-72 object-cover" :src="sneaker.imageUrl" alt="Кроссовки" />
      <div class="flex-grow">
        <h1 class="text-2xl font-bold">{{ sneaker.title }}</h1>
        <p class="text-xl mt-1">от {{ sneaker.price }} ₽</p>
        <div class="mt-4">
          <!-- Место для дополнительных характеристик кроссовок, если необходимо -->
        </div>
        <div class="mt-4">
          <ul>
            <li v-for="(size, index) in sneaker.sizes" :key="index"
                @click="setActiveSneakerSize(index)"
                :class="{'bg-blue-500 text-white': activeSneakerSize === index, 'cursor-pointer p-2 border border-gray-300': true}">
              {{ size }}
            </li>
          </ul>
        </div>
        <button @click="onClickAdd"
                class="mt-4 inline-block px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
          Добавить в корзину
          <span v-if="addedCount > 0">({{ addedCount }})</span>
        </button>
      </div>
    </div>
  </div>
  <div v-else class="text-center py-10">
    Загрузка данных о кроссовках...
  </div>
</template>
