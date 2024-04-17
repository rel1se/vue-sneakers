<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import sliderImg3 from "../assets/slider-img-1.png";
import sliderImg4 from "../assets/slider-img-2.jpg";
import sliderImg6 from "../assets/slider-img-3.png";

export default {
  setup() {
    const images = [sliderImg3, sliderImg4, sliderImg6];
    const index = ref(0);
    const delay = 5000;
    let timeoutRef;

    const resetTimeout = () => {
      if (timeoutRef) {
        clearTimeout(timeoutRef);
      }
    };

    const startSlider = () => {
      resetTimeout();
      timeoutRef = setTimeout(() => {
        index.value = (index.value === images.value.length - 1) ? 0 : index.value + 1;
      }, delay);
    };

    onMounted(() => {
      startSlider();
    });

    onBeforeUnmount(() => {
      resetTimeout();
    });

    return {
      images,
      index
    };
  }
};
</script>

<template>
  <div class="mb-10 overflow-hidden max-w-7xl">
    <div
        class="whitespace-nowrap ease-linear duration-1000"
        :style="{ transform: `translate3d(${-index * 100}%, 0, 0)` }"
    >
      <div
          class="inline-block h-auto w-auto rounded-2xl"
          v-for="(image, idx) in images"
          :key="idx"
          :style="{ backgroundImage: `url(${image})` }"></div>
    </div>
  </div>
</template>
