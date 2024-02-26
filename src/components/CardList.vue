<script setup>
defineProps(
    {
      items: Array
    }
)
import Card from "@/components/Card.vue";

const onClickFavorite = () => {
  alert('Добавлено в избранное')
}
</script>

<template>
  <div class="grid grid-cols-4 gap-2">
    <Card
        v-for="item in items"
        :key="item.id"
        :image-url="item.imageUrl"
        :title="item.title"
        :price="item.price"
        :is-added="true"
        :is-favorite="true"
        :on-click-favorite="onClickFavorite"
    />
  </div>
</template>