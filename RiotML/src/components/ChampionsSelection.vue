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
    <div v-for="(_, idx) in getNames()" :key="idx">
      {{ _ }}, {{ idx }}
      <PositionMapper />
    </div>
    <!-- <RouterLink class="nav-link" :to=getItemsRoute()>Select items and see their impact on win rates</RouterLink> -->
  </div>
</div>

<!-- Antes de confirmar teams tengo que pedir que seteen las posiciones -->
<div>
  <div v-if="useGlobalStore.getCompletion">
    <button class="btn btn-info my-3" @click="confirmarTeams()">Ir a Items</button>
    <!-- <RouterLink class="nav-link" :to=getItemsRoute()>Select items and see their impact on win rates</RouterLink> -->
     <div v-if="confirmedTeams"> {{ confirmedTeams.win_rate }}</div>
  </div>
</div>

  </section>
</template>

<script>

//Este componente puede tener un boton para pedir la recomendacion, eso es llamar a nuevosChamps y generar el win_rate por ahora aca por practicidad
import { useGlobalStore } from '@/stores/global'
import TeamBuilder from './TeamBuilder.vue'
import getAllNames from '@/services/championNames'
import getAllIdsAndNames from '@/services/itemsNames'
import ServicioTeams from '@/services/teams'
import PositionMapper from './PositionMapper.vue'

export default {
  name: 'champion-selection',
  components: {TeamBuilder, PositionMapper},
  //selection-blocks podria ser un array de objetos del tipo {"ban": n1, "pick": n2}, asi podria flexibilizar la representacion
  //props: ["champ-selection-blocks"],
  props: [],
    async mounted() {
      let champNames = await getAllNames()
      let items = await getAllIdsAndNames()

      console.log("afterMount mounted")
      //console.log(names.length)
      this.useGlobalStore.setChampNames(champNames)
      this.useGlobalStore.setItems(items)
    },
  data() {
    return {
      color: false,
      client: false,
      useGlobalStore: useGlobalStore(),
      service: new ServicioTeams(),
      confirmedTeams: this.confirmedTeams
    }
  },
  methods: {
    goTo(path) {
      this.$router.push(path)
    },

    async confirmarTeams() {
      this.confirmedTeams = await this.service.post(this.useGlobalStore.getPositionedTeams)
      console.log("ChampionSelection.confirmarTeams")
      console.log(this.confirmedTeams)
      //console.log(teams) 
      //confirmedTeams
      this.$router.push(this.getItemsRoute())
      //Aca deberia llamar al servicio para hacer un axios.post y routear a ItemBuilder
    },
    getItemsRoute() {
      //return this.useGlobalStore.getItemsSlots()
      return "/itemsSelection"
      //${this.useGlobalStore.getItemsSlots}
//      `${this.#imgBaseUrl}/${champ}.png`
    },
    escogerColor(color) {
      this.color = color
      this.client = color
      this.useGlobalStore.setColors(color)
    },
    getSelectionBlocks() {
      return this.useGlobalStore.getChampSelectionBlock
    },
    //Podria ser computed
    colorFueEscogido() {
      return Boolean(this.color)
    },
      getNames() {
      let teams = this.useGlobalStore.getTeams
        console.log("ChampSelection.getNames")
        console.log(teams["blue"].concat(teams["red"]))
      return teams["blue"].concat(teams["red"])
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
