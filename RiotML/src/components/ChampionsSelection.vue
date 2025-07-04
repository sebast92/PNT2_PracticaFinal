<template>
  <section class="card">
    <div class="card-header">
      <h3>Champion Selection</h3>
    </div>

  <button class="btn btn-danger mx-3" @click="escogerColor(red)">Choose color Red</button>
  <br>
  <button class="btn btn-danger mx-3" @click="escogerColor(blue)">Choose color Blue</button>

  <div>
    {{ colorFueEscogido() }}
    <div v-if="colorFueEscogido()">
    <div> Color Escogido: {{ client }} </div>
    </div>
  </div>

<div>
  <TeamBuilder :color="red" :client="client==red" :selection_blocks="selection_blocks"/>
</div>

<div>
  <TeamBuilder :color="blue" :client="client==blue" :selection_blocks="selection_blocks"/>
</div>

<!-- <div><div v-if="getCompletion()">
  <RouterLink class="nav-link" :to=getItemsRoute()>Select items and see their impact on win rates</RouterLink>
  </div>
</div> -->

  </section>
</template>

<script>

//Este componente puede tener un boton para pedir la recomendacion, eso es llamar a nuevosChamps y generar el win_rate por ahora aca por practicidad
import { useGlobalStore } from '@/stores/global'

export default {
  name: 'champion-selection',
  //selection-blocks podria ser un array de objetos del tipo {"ban": n1, "pick": n2}, asi podria flexibilizar la representacion
  //props: ["champ-selection-blocks"],
  props: [],
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
      return "/itemsSelection/" + this.useGlobalStore.getItemsSlots()
    },
    escogerColor(color) {
      this.color = color
      this.client = color
    },
    getSelectionBlocks() {
      return this.useGlobalStore.getChampSelectionBlock()
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
</style>
