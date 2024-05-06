<script setup>
import {provide, ref} from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router';
import Footer from "@/components/Footer.vue";


const email = ref('');
const password = ref('');
const loading = ref(false);
const router = useRouter();

const handleLogin = async () => {
  const credentials = {
    email: email.value,
    password: password.value,
  };

  try {
    loading.value = true;
    const response = await axios.post('https://2475f30aea4ec3d4.mokky.dev/auth', credentials);
    localStorage.setItem('token', response.data.token);
    router.push('/');
  } catch (error) {
    console.error('Login failed:', error);
    alert('Не удалось войти в систему, пожалуйста, проверьте свои учетные данные и повторите попытку.');
  } finally {
    loading.value = false;
  }
};

</script>

<template>
  <div class="max-w-md mx-auto mt-1 p-6 border border-gray-300 shadow-md rounded-lg">
    <form @submit.prevent="handleLogin" class="space-y-6">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
        <input id="email" type="email" v-model="email" required
               class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
      </div>
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Password:</label>
        <input id="password" type="password" v-model="password" required
               class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
      </div>
      <button type="submit" :disabled="loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400">
        {{ loading ? 'Loading...' : 'Login' }}
      </button>
      <p class="text-center text-sm text-gray-600">
        Еще нет аккаунта?
        <router-link to="/registration" class="text-blue-600 hover:text-blue-700">
          Зарегистрируйтесь
        </router-link>
      </p>
    </form>
  </div>
  <Footer></Footer>
</template>


