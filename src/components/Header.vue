<script setup>
const emit = defineEmits(['openCart'])
defineProps({
  totalPrice: Number
})
</script>

<template>
  <header class="flex justify-between border-b border-slate-200 px-10 py-8">
    <router-link to="/">
      <div class="flex items-center gap-4">
        <img class="w-10" src="/logo.png" alt="Logo" />
        <div>
          <h2 class="text-xl font-bold uppercase">VUE SNEAKERS</h2>
          <p class="text-slate-500">Магазин лучших кроссовок</p>
        </div>
      </div>
    </router-link>

    <ul class="flex items-center gap-10">
      <li
        @click="() => emit('openCart')"
        class="flex items-center gap-3 cursor-pointer text-slate-500 hover:text-black"
      >
        <img src="/cart.svg" alt="Cart" />
        <b>{{ totalPrice }} руб.</b>
      </li>
      <router-link to="/favorites">
        <li class="flex items-center gap-3 cursor-pointer text-slate-500 hover:text-black">
          <img src="/heart.svg" alt="Heart" />
          <span>Избранное</span>
        </li>
      </router-link>
      <router-link to="/profile">
        <li class="flex items-center gap-3 cursor-pointer text-slate-500 hover:text-black">
          <img src="/profile.svg" alt="Profile" />
          <span>Профиль</span>
        </li>
      </router-link>
    </ul>
  </header>
</template>
