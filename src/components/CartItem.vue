<script setup>
const emit = defineEmits(['onClickRemove'])
defineProps({
  imageUrl: String,
  title: String,
  price: Number
})
</script>

<template>
  <div class="relative flex w-full border border-slate-100 rounded-xl p-4 gap-4">
    <img :src="imageUrl" class="w-18 h-16" :alt="title" />
    <div class="flex flex-col w-full flex-1">
      <p>{{ title }}</p>
      <div class="flex justify-between mt-5">
        <span class="font-bold flex-1">{{ price }} руб.</span>
        <img
          @click="emit('onClickRemove')"
          class="cursor-pointer opacity-30 hover:opacity-100 transition"
          src="/close.svg"
          alt="Close"
        />
      </div>
    </div>
  </div>
</template>
