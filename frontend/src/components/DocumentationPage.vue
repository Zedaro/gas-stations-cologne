<template>
  <div>
    <!--
      Simple way of switching selected component,
      or use your own sidebar component
    -->
    <DoxenSidebar
      v-model="selectedDemo"
      :demos="demos"
      :styleTokens="{
        sidebarButton: 'doxSidebarButton',
        sidebarContainer: 'doxSidebarContainer',
      }"
    />
    <VueDoxen
      v-model="selectedDemo"
      :demos="demos"
    />
    <!--
      Optional CSS file for syntax highlighting
    -->
    <link
      href="https://unpkg.com/highlightjs/styles/ir-black.css"
      rel="stylesheet"
      type="text/css"
    />
  </div>
</template>

<script>
  import { computed, ref } from "vue"
  import { DoxenSidebar, VueDoxen } from "vue-doxen"

  // OPTIONAL: CSS file for minor layout/affordance improvements
  import "vue-doxen/vue-doxen.css"

  // Components you want to document/demo
  import ViewSwitch from "./ViewSwitch.vue"
  import MapView from "./MapView.vue"
  import ListView from "./ListView.vue"

  export default {
    name: "DocumentationPage",
    components: {
      DoxenSidebar,
      VueDoxen,
    },
    setup: function () {
      const selectedDemo = ref("ListView")

      const demos = computed(() => {
        return {
          ViewSwitch,
          // Pass the component in directly
          MapView,
          // or wrap it in a "demo" object to add
          // documentation specific properties
          ListView: {
            component: ListView,
            description:
              "A list of addresses in cologne. You can sort ascending or descending. You can search for a specific address.",
          },
        }
      })

      return {
        demos,
        selectedDemo,
      }
    },
  }
</script>

<style>
  .doxSidebarButton {
    background-color: var(--color-background);
    color: var(--color-text);
    border: 0px;
  }

  .doxSidebarButton:hover {
    color: var(--color-heading);
  }

  .doxSidebarContainer {
    display: flex;
    flex-direction: column;
  }
</style>
