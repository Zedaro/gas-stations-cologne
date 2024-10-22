import { ref } from "vue"
import { defineStore } from "pinia"

export const useMapStore = defineStore("map", () => {
  const searchText = ref("")

  return { searchText }
})
