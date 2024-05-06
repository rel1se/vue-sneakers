<script setup>
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import axios from "axios";

const loading = ref(false);
const router = useRouter();
const infoRouter = useRoute();

const title = ref(infoRouter.query.title);
const price = ref(Number(infoRouter.query.price)); // Преобразование строки в число
const imageUrl = ref(infoRouter.query.imageUrl);
const id = infoRouter.query.id;

const sneaker = ref({
  title: title.value,
  price: price.value,
  imageUrl: imageUrl.value
});

const handleClick = async () => {
  try {
    loading.value = true;
    console.log(sneaker.value);
    await axios.patch(`https://2475f30aea4ec3d4.mokky.dev/sneakers/${id}`, {
      title: sneaker.value.title,
      price: sneaker.value.price, // Удостоверьтесь, что значение является числом
      imageUrl: sneaker.value.imageUrl
    });
    router.push('/profile');
  } catch (error) {
    console.error('Item change failed:', error);
    alert('Ошибка при обновлении товара');
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="max-w-md mx-auto mt-1 p-6 border border-gray-300 shadow-md rounded-lg">
    <h2 class="text-2xl font-bold mb-4">Редактирование товара</h2>
    <form @submit.prevent="handleClick" class="space-y-6">
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700">Название:</label>
        <input id="title" type="text" v-model="sneaker.title" required
               class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
      </div>
      <div>
        <label for="price" class="block text-sm font-medium text-gray-700">Цена:</label>
        <input id="price" type="number" v-model.number="sneaker.price" required
               class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
      </div>
      <div>
        <label for="imageUrl" class="block text-sm font-medium text-gray-700">Ссылка на картинку:</label>
        <input id="imageUrl" v-model="sneaker.imageUrl"
               class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
      </div>
      <button type="submit" :disabled="loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400">
        {{ loading ? 'Сохранение...' : 'Сохранить' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
</style>
