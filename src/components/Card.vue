<script setup>

import {useRouter} from "vue-router";
import axios from "axios";

const props = defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function,
  isAuth: Boolean,
  isAdmin: Boolean,
})

const router = useRouter()
const handleEdit = () => {
  router.push({ path: '/admin', query: { id: props.id, title: props.title, price: props.price,imageUrl: props.imageUrl} });
}
const handleClick = () => {
  router.push({path: `/item`, query: {id: props.id}})
}

const handleDelete = async () => {
  try {
    await axios.delete(`https://2475f30aea4ec3d4.mokky.dev/sneakers/${props.id}`);
    alert('Item deleted successfully');
    router.push('/')
  } catch (error) {
    console.error('Failed to delete the item:', error);
    alert('Failed to delete the item');
  }
}
</script>
<template>
  <div
    class="relative m-2 border border-slate-100 rounded-3xl p-8 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl"
  >
    <img
      v-if="isAuth && (isAdmin ? false : onClickFavorite)"
      :src="isFavorite ? '/like-2.svg' : '/like-1.svg'"
      alt="Like1"
      class="absolute top-8 left-8"
      @click="onClickFavorite"
    />
    <img
        v-if="isAuth && isAdmin"
        src="/edit.png"
        alt="Edit"
        class="absolute top-8 left-8 w-6 opacity-50"
        @click="handleEdit"
    />
    <img @click="handleClick"
        :src="imageUrl" alt="Sneaker" />
    <p class="mt-2 mb-10">{{ title }}</p>
    <div class="flex justify-between w-full">
      <div class="flex flex-col">
        <b>Цена: </b>
        <span class="text-slate-400">от {{ price }} руб.</span>
      </div>
      <img
          v-if="isAuth && isAdmin"
          src="/btn-remove.svg"
          alt="Delete"
          @click="handleDelete"
      />
    </div>
  </div>
</template>
