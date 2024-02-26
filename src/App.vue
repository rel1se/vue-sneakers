<script setup>
import Header from "@/components/Header.vue";
import CardList from "@/components/CardList.vue";
import {onMounted, reactive, ref, watch} from "vue";
import axios from "axios";
import Drawer from "@/components/Drawer.vue";

const items = ref([])
const filters = reactive({
  sortBy: '',
  search: ''
}
)

const onChangeSort = (event) => {
  filters.sortBy = event.target.value
}

const fetchItems = async () => {
  try {
    const {data} = await axios.get("https://2475f30aea4ec3d4.mokky.dev/sneakers?sortBy=" + filters.sortBy)
    items.value = data
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  try {
    const {data} = await axios.get("https://2475f30aea4ec3d4.mokky.dev/sneakers")
    items.value = data
  } catch (error) {
    console.log(error)
  }

})

watch(filters, fetchItems)
</script>


<template>
  <!--  <Drawer/>-->
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-10">
    <Header/>
    <div class="p-10">
      <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>
        <div class="flex gap-4">
          <select @change="onChangeSort" class="py-2 px-3 border rounded-md outline-none">
            <option value="title">По названию</option>
            <option value="price">По цене (дешевые)</option>
            <option value="-price">По цене (дорогие)</option>
          </select>
          <div class="relative">
            <img class="absolute left-4 top-3" src="/search.svg" alt="Search"/>
            <input class="border rounded py-2 pl-10 pr-4 outline-none focus:border-gray-400"
                   type="text"
                   placeholder="Поиск"
            >
          </div>
        </div>
      </div>
      <div class="mt-10">
        <CardList :items="items"/>
      </div>
    </div>
  </div>
</template>
