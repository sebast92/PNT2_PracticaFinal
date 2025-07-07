<template>
  <section class="card">
    <div class="card-header">
      <h3>Position Mapper</h3>
    </div>


  <div class="grid-container">
  <div class="selection-container">
    <select v-model="selectedChamp">
      <!-- <option disabled value="">Please select one</option> -->
      <option v-for="(option, index) in getNames()" :key="index" :value="option">
      <!-- <option v-for="(option, index) in getNames()" :key="index" :value="getImgUrl(option)">   -->
        {{ option}}
      </option>
    </select>
  </div>

  <div class="image-container" v-if="selectedChamp">
    <img :src="getChampImg(selectedChamp)" :alt="'Selected Image'">
  </div>
    <select v-model="selectedRole">
      <!-- <option disabled value="">Please select one</option> -->
      <option v-for="(option, index) in getRoles()" :key="index" :value="option">
      <!-- <option v-for="(option, index) in getNames()" :key="index" :value="getImgUrl(option)">   -->
        {{ option}}
      </option>
    </select>

    <div>
  <button @click="confirmado()">Confirmar seleccion</button>
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
import ServicioChampions from '@/services/champions'

export default {
  name: 'champion-selection',
  components: {TeamBuilder},
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
      selectedRole: this.selectedRole,
      selectedChamp: this.selectedChamp,
      useGlobalStore: useGlobalStore(),
      serviceTeams: new ServicioTeams(),
      serviceChamps: new ServicioChampions()
    }
  },
  methods: {
    getNames() {
      let teams = this.useGlobalStore.getTeams
        console.log("PositionMapper.getNames")
        console.log(teams["blue"].concat(teams["red"]))
      return teams["blue"].concat(teams["red"])
    }, 
    getRoles() {
        return ["top", "jungle", "mid", "bot", "support"]
    },
       getChampImg(champ) {
      //const img = await this.service.getImg(champ)
      return this.serviceChamps.getChampImg(champ)
    },
    goTo(path) {
      this.$router.push(path)
    },

    async confirmarTeams() {
      await this.serviceTeams.post(this.useGlobalStore.getTeams)
      this.$router.push(this.getItemsRoute())
      //Aca deberia llamar al servicio para hacer un axios.post y routear a ItemBuilder
    },
    getItemsRoute() {
      //return this.useGlobalStore.getItemsSlots()
      return "/itemsSelection"
      //${this.useGlobalStore.getItemsSlots}
//      `${this.#imgBaseUrl}/${champ}.png`
    },
    confirmado() {
        console.log(this.selectedRole)
        let teams = this.useGlobalStore.getTeams
        let color
        if (teams["blue"].includes(this.selectedChamp)) {
            color = "blue"
        } else {
            color  = "red"
        }
        this.useGlobalStore.setPosition(color, this.selectedRole, this.selectedChamp)
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
