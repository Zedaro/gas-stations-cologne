<script setup>
  import { watch } from "vue"
  import { useRoute } from "vue-router"

  const route = useRoute()
  let activeButton = route.name
  watch(route, (newRoute) => {
    activeButton = newRoute.name
  })
</script>

<template>
  <div id="toggle">
    <router-link
      to="/map"
      class="link"
      data-testid="switch-to-map-link"
    >
      <button
        id="mapBtn"
        :class="{ active: activeButton === 'map' }"
      >
        Map
      </button>
    </router-link>
    <router-link
      to="/list"
      class="link"
      data-testid="switch-to-list-link"
    >
      <button
        id="listBtn"
        :class="{ active: activeButton === 'list' }"
      >
        List
      </button>
    </router-link>
  </div>
</template>

<style scoped>
  button:hover,
  .active {
    background-color: #d0d0d7;
  }
</style>
