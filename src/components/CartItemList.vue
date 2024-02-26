<script setup>
import CartItem from "@/components/CartItem.vue";
</script>


<template>
  <div class="flex flex-col flex-1 gap-4">
    <CartItem image-url="/sneakers/sneakers-1.jpg" title="Мужские кроссовки Nike Air Max" :price="12300"/>
    <CartItem image-url="/sneakers/sneakers-2.jpg" title="Мужские кроссовки Nike Air Max" :price="12300"/>
    <CartItem image-url="/sneakers/sneakers-3.jpg" title="Мужские кроссовки Nike Air Max" :price="12300"/>
    <CartItem image-url="/sneakers/sneakers-4.jpg" title="Мужские кроссовки Nike Air Max" :price="12300"/>
  </div>
</template>