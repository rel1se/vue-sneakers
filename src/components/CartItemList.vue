<script setup>
import CartItem from '@/components/CartItem.vue'
import { inject } from 'vue'

const { cart, removeFromCart } = inject('cartActions')
</script>

<template>
  <div class="flex flex-col flex-1 gap-4">
    <CartItem
      v-for="item in cart"
      :key="item.id"
      :image-url="item.imageUrl"
      :title="item.title"
      :price="item.price"
      @on-click-remove="() => removeFromCart(item)"
    />
  </div>
</template>
