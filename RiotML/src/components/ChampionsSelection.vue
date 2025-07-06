<template>
  <section class="card">
    <div class="card-header">
      <h3>Champion Selection</h3>
    </div>

  <div class="grid-container">
  <button class="btn btn-danger mx-3" @click="escogerColor('red')">Choose color Red</button>
  
  <button class="btn btn-danger mx-3" @click="escogerColor('blue')">Choose color Blue</button>
</div>
  <div>
    {{ colorFueEscogido() }}
    <div v-if="colorFueEscogido()">
    <div> Color Escogido: {{ client }} </div>
    </div>
  </div>
<div class="grid-container">
<div>
  <TeamBuilder color="red" :client="client=='red'" :selections="getSelectionBlocks()" :hidden="!colorFueEscogido()"/>
</div>

<div>
  <TeamBuilder color="blue" :client="client=='blue'" :selections="getSelectionBlocks()" :hidden="!colorFueEscogido()"/>
</div>
</div>

<div>
  <div v-if="useGlobalStore.getCompletion">
  <RouterLink class="nav-link" :to=getItemsRoute()>Select items and see their impact on win rates</RouterLink>
  </div>
  <div>
  useGlobalStore.getCompletion: {{ useGlobalStore.getCompletion }}</div>
  <div> {{ useGlobalStore.getCompletedSlotsOpp }}, {{ useGlobalStore.getCompletedSlotsClient }}</div>
</div>

  </section>
</template>

<script>

//Este componente puede tener un boton para pedir la recomendacion, eso es llamar a nuevosChamps y generar el win_rate por ahora aca por practicidad
import { useGlobalStore } from '@/stores/global'
import TeamBuilder from './TeamBuilder.vue'
import getAllNames from '@/services/championNames'

export default {
  name: 'champion-selection',
  components: {TeamBuilder},
  //selection-blocks podria ser un array de objetos del tipo {"ban": n1, "pick": n2}, asi podria flexibilizar la representacion
  //props: ["champ-selection-blocks"],
  props: [],
    async mounted() {
      let names = await getAllNames()
      console.log("afterMount mounted")
      console.log(names.length)
      this.useGlobalStore.setNames(names)
    },
  data() {
    return {
      color: false,
      client: false,
      useGlobalStore: useGlobalStore(),
    }
  },
  methods: {

    getItemsRoute() {
      //return this.useGlobalStore.getItemsSlots()
      return `/itemsSelection/${this.useGlobalStore.getItemsSlots}`
//      `${this.#imgBaseUrl}/${champ}.png`
    },
    escogerColor(color) {
      this.color = color
      this.client = color
    },
    getSelectionBlocks() {
      return this.useGlobalStore.getChampSelectionBlock
    },
    //Podria ser computed
    colorFueEscogido() {
      return Boolean(this.color)
    },
  },
  computed: {

  }
}
</script>

<style scoped>
.card-header {
  background-color: blue;
  color: white;
}
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr; /* dos columnas iguales */
  gap: 10px;
}
</style>
