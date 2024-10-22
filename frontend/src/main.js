import "./assets/main.css"
import "leaflet/dist/leaflet.css"
import "leaflet-search/dist/leaflet-search.min.css"

import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "./App.vue"
import router from "./router"

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core"

/* import specific icons */
import { faSort, faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons"
const app = createApp(App)

/* add icons to the library */
library.add(faSort, faSortUp, faSortDown)

app.use(createPinia())
app.use(router)

app.mount("#app")
