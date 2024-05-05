<script setup>
import {ref, onMounted, onUnmounted} from 'vue';

const images = ref([
  'https://i.postimg.cc/DzXFPGMq/slider-img-1.png',
  'https://i.postimg.cc/htwcmspD/slider-img-2.jpg',
  'https://i.postimg.cc/MTJwPGCg/slider-img-3.png'
]);
const currentIndex = ref(0);

function nextImage() {
  currentIndex.value = (currentIndex.value + 1) % images.value.length;
}

let intervalId = null;
onMounted(() => {
  intervalId = setInterval(nextImage, 4000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});

</script>


<template>
  <div class="slider relative overflow-hidden rounded-lg w-full" style="height: 550px">
    <div
        v-for="(image, index) in images"
        :key="index"
        class="slider-image absolute inset-0 w-full h-full bg-center bg-cover transition-opacity duration-1000 ease-in-out"
        :style="{ backgroundImage: 'url(' + image + ')' }"
        :class="{ 'opacity-100': index === currentIndex, 'opacity-0': index !== currentIndex }"
    ></div>
  </div>
</template>

