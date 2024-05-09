<script setup>
import { useRouter } from 'vue-router';

const emit = defineEmits(['openCart']);
const router = useRouter();

defineProps({
  totalPrice: Number
});

const isAuthenticated = async () => {
  return !!localStorage.getItem('token');
};

const handleNavigation = async (route) => {
  const isAuth = await isAuthenticated();
  if (isAuth) {
    router.push(route);
  } else {
    router.push('/auth');
  }
};
</script>

<template>
  <header class="flex justify-between border-b border-slate-200 px-10 py-8">
    <router-link to="/">
      <div class="flex items-center gap-4">
        <div>
          <h2 class="text-xl font-black uppercase">VUE SNEAKERS</h2>
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
      <li
          @click="() => handleNavigation('/favorites')"
          class="flex items-center gap-3 cursor-pointer text-slate-500 hover:text-black"
      >
        <img src="/heart.svg" alt="Heart" />
        <span>Избранное</span>
      </li>
      <li
          @click="() => handleNavigation('/profile')"
          class="flex items-center gap-3 cursor-pointer text-slate-500 hover:text-black"
      >
        <img src="/profile.svg" alt="Profile" />
        <span>Профиль</span>
      </li>
    </ul>
  </header>
</template>