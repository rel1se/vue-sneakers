<script setup>
import DrawerHead from '@/components/DrawerHead.vue'
import CartItemList from '@/components/CartItemList.vue'
import InfoBlock from './InfoBlock.vue'

import { ref, inject, computed } from 'vue'
import axios from 'axios'

const props = defineProps({
  totalPrice: Number,
  tax: Number
})

const { cart } = inject('cartActions')

const { user } = inject('user')

const isCreatingOrder = ref(false)

const orderId = ref(null)
const createOrder = async () => {
  try {
    isCreatingOrder.value = true

    await axios.post('https://2475f30aea4ec3d4.mokky.dev/orders', {
      items: cart.value,
      totalPrice: props.totalPrice.value,
      user_id: user.value.id
    })

    cart.value = []

    const response = await axios.get(`https://2475f30aea4ec3d4.mokky.dev/orders?user_id=${user.value.id}`)

    orderId.value = response.data.length
  } catch (err) {
    console.log(err)
  } finally {
    isCreatingOrder.value = false
  }
}

const cartIsEmpty = computed(() => cart.value.length === 0)
const buttonDisabled = computed(() => isCreatingOrder.value || cartIsEmpty.value)
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
    <DrawerHead />

    <div v-if="!totalPrice || orderId" class="flex h-full items-center">
      <InfoBlock
        v-if="!totalPrice && !orderId"
        title="Корзина пустая"
        description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
        image-url="/package-icon.png"
      />
      <InfoBlock
        v-if="orderId"
        title="Заказ оформлен!"
        :description="`Ваш заказ №${orderId} скоро будет передан курьерской доставке`"
        image-url="/order-success-icon.png"
      />
    </div>

    <div v-else>
      <CartItemList />

      <div class="flex flex-col gap-4 mt-7">
        <div class="flex gap-2">
          <span>Итого:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ totalPrice }} ₽</b>
        </div>

        <div class="flex gap-2">
          <span>Налог 5%:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ tax }} ₽</b>
        </div>

        <button
          :disabled="buttonDisabled"
          @click="createOrder"
          class="mt-4 transition bg-lime-500 w-full rounded-xl py-3 text-white disabled:bg-slate-300 hover:bg-lime-600 active:bg-lime-700 cursor-pointer"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  </div>
</template>
