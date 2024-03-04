<script setup>
import DrawerHead from '@/components/DrawerHead.vue'
import CartItemList from '@/components/CartItemList.vue'
import InfoBlock from './InfoBlock.vue'

defineProps({
  totalPrice: Number,
  tax: Number,
  buttonDisabled: Boolean
})

const emit = defineEmits(['createOrder'])
</script>

<template>
  <div class="fixed z-10 top-0 h-full w-full bg-black opacity-70"></div>
  <div
    class="flex flex-col justify-between fixed h-full z-10 top-0 right-0 w-100 bg-white px-10 py-7"
  >
    <DrawerHead />
    <CartItemList />
    <div v-if="!totalPrice" class="flex h-full items-center">
      <InfoBlock
        title="Корзина пустая"
        image-url="/package-icon.png"
        description="Добавьте хотя бы один товар, чтобы сделать заказ"
      />
    </div>

    <div v-if="totalPrice" class="flex flex-col gap-5 mt-7">
      <div class="flex items-end gap-2">
        <span>Итого:</span>
        <div class="flex-1 border-b border-dashed" />
        <span class="font-bold">{{ totalPrice }} руб.</span>
      </div>

      <div class="flex items-end gap-2">
        <span>Налог 5%:</span>
        <div class="flex-1 border-b border-dashed" />
        <span class="font-bold">{{ tax }}руб.</span>
      </div>
      <button
        :disabled="buttonDisabled"
        @click="emit('createOrder')"
        class="mt-4 transition bg-lime-500 w-full rounded-xl py-3 text-white disabled:bg-slate-300 hover:bg-lime-600 active:bg-lime-700 cursor-pointer"
      >
        Оформить заказ
      </button>
    </div>
  </div>
</template>
