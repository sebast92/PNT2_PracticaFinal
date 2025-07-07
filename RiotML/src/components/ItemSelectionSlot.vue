<template>
  <section class="card">
    <div class="card-header">
      <h3>Item SelectionSlot</h3>
    </div>


  <div class="grid-container">
  <div class="grid-container">
  <div class="selection-container">
    <select v-model="selectedItem">
      <!-- <option disabled value="">Please select one</option> -->
      <option v-for="(option, index) in Object.values(globalStore.getItems)" :key="index" :value="option">
      <!-- <option v-for="(option, index) in getNames()" :key="index" :value="getImgUrl(option)">   -->
        {{ option}}
      </option>
    </select>
  </div>
</div>

  <div class="image-container" v-if="selectedItem">
    <img :src="getItemImg(selectedItem)" :alt="'Selected Image'">
  </div>


<div>
  <button @click="confirmado()">Confirmar seleccion</button>
</div>

<div v-if="client">
<button @click="getRecommendation()"> Recomendar </button>

  <div class="image-container" v-if="recommendedItem">
    <img :src="getItemImgCode(recommendedItem)" :alt="'Selected Image'">
    win_rate = {{ Math.random() }}
    {{ getItemImgCode(recommendedItem) }}
  </div>
</div>

</div>

  </section>
</template>

<script>
import { useGlobalStore } from '@/stores/global'
import ServicioItems from '../services/items'
import ServicioChampions from '../services/champions'

export default {
  // Tengo que usar Estado Global para que al completarse una selection el TeamBuilder o la siguiente selection se hagan visibles.
  // El state tendria que ir agregando los completados a alguna estructura que permita determinar el siguiente a demostrar

  //Tengo que usar este componente para interactuar con mi backend, mostrar imagenes, etc.
  name: 'selection-slot',
  props: ["client"],
//    props: ["type", "client", "visible"],
  data() {
    return {
      globalStore: useGlobalStore(),
      selectedItem: this.selectedItem,
      recommendedItem: this.recommendedItem,
      serviceItems: new ServicioItems(),
      serviceChamps: new ServicioChampions()
    }
  },
  methods: {
      confirmado() {
      let items = this.globalStore.getItems
      const key = Object.keys(items).find((key) => items[key] === this.selectedItem);
      console.log(key)
      this.globalStore.addItem(key)  
      //const new_names = this.names.splice(this.names.indexOf(this.selectedChamp))
      //Esto tiene que sacar el name de todos los componentes, los names quiza tienen que estar en el estado global
      //this.names = new_names
    },
    getNames() {
      let teams = this.globalStore.getTeams
      return teams["client"].concat(teams["opp"])

    },
    getItemImg(item) {
      let items = this.globalStore.getItems
      const key = Object.keys(items).find((key) => items[key] === item);
      //const img = await this.service.getImg(champ)
      return this.serviceItems.getItemImg(key)
    },
    getItemImgCode(key) {
      //let items = this.globalStore.getItems
      //const key = Object.keys(items).find((key) => items[key] === item);
      //const img = await this.service.getImg(champ)
      return this.serviceItems.getItemImg(key)
    },
    getChampImg(champ) {
      //const img = await this.service.getImg(champ)
      return this.serviceChamps.getChampImg(champ)
    },
    async getRecommendation() {
      //console.log('actualizar', e)
      let item = await this.serviceItems.getItem()  
      console.log("ItemSelectionSlot")
      console.log(item)
      this.recommendedItem = item
    }
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
