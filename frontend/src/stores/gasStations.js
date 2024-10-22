import { ref } from "vue"
import { defineStore } from "pinia"
import axios from "axios"

export const useGasStationsStore = defineStore("gasStations", () => {
  const gasStations = ref(null)

  const url =
    "https://geoportal.stadt-koeln.de/arcgis/rest/services/verkehr/gefahrgutstrecken/MapServer/0/query?where=objectid+is+not+null&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson"
  async function initGasStations() {
    try {
      const response = await axios.get(url)
      gasStations.value = response.data
    } catch (err) {
      // TODO: Render actual error message for user
      console.log(err)
    }
  }

  return { gasStations, initGasStations }
})
