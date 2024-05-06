<script setup>

defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function,
  isAuth: Boolean
})

</script>
<template>
  <div
    class="relative m-2 border border-slate-100 rounded-3xl p-8 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl"
  >
    <img
      v-if="isAuth && onClickFavorite"
      :src="isFavorite ? '/like-2.svg' : '/like-1.svg'"
      alt="Like1"
      class="absolute top-8 left-8"
      @click="onClickFavorite"
    />
    <img :src="imageUrl" alt="sneaker" />
    <p class="mt-2 mb-10">{{ title }}</p>
    <div class="flex justify-between w-full">
      <div class="flex flex-col">
        <b>Цена: </b>
        <span class="text-slate-400">от {{ price }} руб.</span>
      </div>
      <img
        v-if="isAuth && onClickAdd"
        @click="onClickAdd"
        :src="isAdded ? '/checked.svg' : '/plus.svg'"
        alt="Plus"
      />
    </div>
  </div>
</template>
