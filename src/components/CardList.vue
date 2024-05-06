<script setup>
import Card from '@/components/Card.vue'
import {computed, ref} from "vue";

defineProps({
  items: Array,
  isFavorites: Boolean,
  isAdmin: Boolean,
})

const emit = defineEmits(['addToFavorite', 'addToCart'])


const isAuthenticated = computed (() => {
  return !!localStorage.getItem('token');
})

</script>

<template>
  <div class="grid grid-cols-4 gap-2" v-auto-animate>
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :imageUrl="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :isAdded="item.isAdded"
      :isFavorite="item.isFavorite"
      :onClickFavorite="isFavorites ? null : () => emit('addToFavorite', item)"
      :onClickAdd="isFavorites ? null : () => emit('addToCart', item)"
      :isAuth="isAuthenticated"
      :isAdmin="isAdmin"
    />
  </div>
</template>
