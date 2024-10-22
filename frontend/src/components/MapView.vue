<script setup>
  import L from "leaflet"
  import "leaflet-search"
  import { onMounted } from "vue"
  import { useGasStationsStore } from "../stores/gasStations"
  import { useMapStore } from "../stores/map"

  const gasStationsStore = useGasStationsStore()
  const mapStore = useMapStore()

  function createMap() {
    let mapObject = L.map("map").setView([50.937231, 6.960279], 16)
    const layers = createLayers(mapObject)
    createSearchBar(mapObject, layers.overlays.gasStations)

    function createLayers(map) {
      const osm = L.tileLayer(
        "http://{s}.tiles.koeln.de/tiles/kde/{z}/{x}/{y}.png",
        {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        },
      ).addTo(map)

      const gasStationsOverlay = L.layerGroup().addTo(map)

      gasStationsStore.gasStations.features.forEach((feature) =>
        addItem(feature, gasStationsOverlay),
      )

      const layers = {
        baseLayers: {
          openStreetMap: osm,
        },
        overlays: {
          gasStations: gasStationsOverlay,
        },
      }

      return layers
    }

    function createSearchBar(map, layer) {
      const searchControl = new L.Control.Search({
        layer: layer,
      })
      map.addControl(searchControl)

      // Access the search input field
      const searchInput = searchControl._input

      // Bind input value to the store variable
      searchInput.addEventListener("input", (event) => {
        mapStore.searchText = event.target.value
      })
      searchControl.on("search:locationfound", (event) => {
        mapStore.searchText = event.text
      })
      let cancelButton = document.getElementsByClassName("search-cancel")[0]
      cancelButton.addEventListener("click", () => {
        mapStore.searchText = ""
      })

      // When clicking on list address, puts address in search bar
      // TODO: When this happens, the map should automatically move to the searched address.
      if (mapStore.searchText) {
        searchControl.searchText(mapStore.searchText)
        // document.getElementsByClassName("search-button")[0].click()
      }

      return searchControl
    }

    function addItem(value, layer) {
      var name = value.attributes.adresse
      var longitude = value.geometry.y
      var latitude = value.geometry.x

      const marker = L.marker([longitude, latitude], { title: name }).bindPopup(
        name,
      )
      marker.addTo(layer)
    }
  }

  onMounted(() => {
    createMap()
  })
</script>

<template>
  <div
    id="map"
    data-testid="map"
  ></div>
</template>

<style scoped></style>
