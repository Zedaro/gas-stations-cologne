<script setup>
  import { RouterView } from "vue-router"
  import ViewSwitch from "./components/ViewSwitch.vue"
  import { computed, onMounted, ref } from "vue"
  import { useGasStationsStore } from "./stores/gasStations"
  import { useRoute } from "vue-router"

  const route = useRoute()
  const isDoxSite = computed(() => {
    return route.name === "documentation"
  })
  const isLoading = ref(true)
  onMounted(async () => {
    const gasStationsStore = useGasStationsStore()
    await gasStationsStore.initGasStations()
    isLoading.value = false
    //TODO: Add loading screen / loading circle
  })
</script>

<template>
  <div
    v-if="!isLoading"
    id="app-container"
  >
    <ViewSwitch v-if="!isDoxSite" />
    <RouterView />
  </div>
</template>

<style scoped></style>
