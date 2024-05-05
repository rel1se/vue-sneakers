

<script setup>
import {ref} from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router';
import Footer from "@/components/Footer.vue";


const fullname = ref('');
const password = ref('');
const email = ref('');
const loading = ref(false);
const invalidEmail = ref(false);
const router = useRouter();

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const handleSubmit = async () => {
  if (!validateEmail(email.value)) {
    invalidEmail.value = true;
    email.value = '';
    return;
  } else {
    invalidEmail.value = false;
  }

  const userData = {
    fullname: fullname.value,
    password: password.value,
    email: email.value,
  };

  try {
    loading.value = true;
    const response = await axios.post('https://2475f30aea4ec3d4.mokky.dev/register', userData);
    localStorage.setItem('token', response.data.token);
    // console.log('Token:', response.data.token);
    // console.log('User data:', response.data.data);
    router.push('/');
  } catch (error) {
    console.error('There was an error:', error);
    alert('Данный пользователь уже существует');
  } finally {
    loading.value = false;
  }
};
</script>



<template>
  <div class="max-w-md mx-auto mt-1 p-6 border border-gray-300 shadow-md rounded-lg">
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <label for="fullname" class="block text-sm font-medium text-gray-700">Full Name:</label>
        <input id="fullname" type="text" v-model="fullname" required
               class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
      </div>
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Password (5 characters minimum):</label>
        <input id="password" type="password" v-model="password" minlength="5" required
               class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
      </div>
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
        <input id="email" type="email" v-model="email" required :class="{'border-red-500': invalidEmail}"
               class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
        <p v-if="invalidEmail" class="mt-2 text-sm text-red-600">Please enter a valid email address.</p>
      </div>
      <button type="submit" :disabled="loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400">
        {{ loading ? 'Loading...' : 'Submit' }}
      </button>
    </form>
  </div>
  <Footer></Footer>
</template>


