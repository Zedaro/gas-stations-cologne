<script setup>
  import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
  import { ref, computed, onMounted, reactive } from "vue"
  import { useGasStationsStore } from "../stores/gasStations"
  import { useMapStore } from "../stores/map"
  import { useRouter } from "vue-router"

  const router = useRouter()
  const mapStore = useMapStore()

  const input = ref("")
  const list = reactive([])
  const filteredList = computed(() => {
    if (input.value) {
      return list.filter((address) =>
        address.toLowerCase().includes(input.value.toLowerCase()),
      )
    } else {
      return []
    }
  })

  const activeSortIcon = ref("sort")
  function sort() {
    if (activeSortIcon.value === "sort") {
      activeSortIcon.value = "sort-down"
    } else if (activeSortIcon.value === "sort-down") {
      activeSortIcon.value = "sort-up"
    } else if (activeSortIcon.value === "sort-up") {
      activeSortIcon.value = "sort"
    }
  }
  // TODO: Streets with the same name but different house numbers should then be sorted by the house number
  // TODO: This looks for substring, maybe comparing from beginning makes more sense
  const sortedList = computed(() => {
    if (activeSortIcon.value === "sort-down") {
      return input.value
        ? filteredList.value.toSorted((a, b) => b.localeCompare(a))
        : list.toSorted((a, b) => b.localeCompare(a))
    } else if (activeSortIcon.value === "sort-up") {
      return input.value
        ? filteredList.value.toSorted((a, b) => a.localeCompare(b))
        : list.toSorted((a, b) => a.localeCompare(b))
    } else {
      return input.value ? filteredList.value : list
    }
  })

  function goToAddressOnMap(address) {
    mapStore.searchText = address
    router.push("/map")
  }

  onMounted(() => {
    const gasStationsStore = useGasStationsStore()
    gasStationsStore.gasStations.features.forEach((feature) => {
      list.push(feature.attributes.adresse)
    })
  })
</script>

<template>
  <div>
    <input
      id="searchInput"
      type="search"
      v-model="input"
      placeholder="address"
    />
    <font-awesome-icon
      class="sort-icon"
      data-testid="sort-button"
      :icon="['fas', activeSortIcon]"
      @click="sort"
    />
  </div>
  <ul
    v-if="!input"
    class="list"
    data-testid="addresses-list"
  >
    <li
      v-for="(address, index) in sortedList"
      :key="index"
      @click="goToAddressOnMap(address)"
    >
      {{ address }}
    </li>
  </ul>
  <ul
    v-else
    class="list"
    data-testid="addresses-list"
  >
    <li
      v-for="(address, index) in sortedList"
      :key="index"
    >
      {{ address }}
    </li>
    <li v-if="input && sortedList.length === 0">Searched address not found</li>
  </ul>
</template>

<style scoped>
  .list {
    padding: 32px 64px;
  }

  #searchInput {
    margin: 32px 16px 0 64px;
  }

  .sort-icon:hover {
    color: limegreen;
  }

  li:hover {
    color: greenyellow;
    cursor: pointer;
  }
</style>
