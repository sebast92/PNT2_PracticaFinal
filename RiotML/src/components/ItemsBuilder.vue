<template>
  <section class="card">
    <div class="card-header">
      <h3>Item Builder</h3>
    </div>

  <div class="grid-container">
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
</div>

  <div class="image-container" v-if="selectedChamp">
    <img :src="getChampImg(selectedChamp)" :alt="'Selected Image'">
  </div>
</div>

<!-- Necesitaria que al confirmar build o cambiar de champ se me reseteen los ItemSelectionSlot -->
<div v-if="selectedChamp">
<div v-for="(_, idx) in [...Array(useGlobalStore.getItemsSlots).keys()]" :key="idx">
    <ItemSelectionSlot :client="showRecommendation()"/>
</div>
</div>


<div>
    <button class="btn btn-info my-3" @click="confirmarBuild()">Confirmar Build</button>
    <div v-if="finalBuild"> {{ finalBuild.win_rate }} </div>
    <!-- <RouterLink class="nav-link" :to=getItemsRoute()>Select items and see their impact on win rates</RouterLink> -->
</div>


<!-- <div v-if="showRecommendation()">

<button @click="getRecommendation()"> Recomendar </button>

  <div class="image-container" v-if="recommendedItem">
    <img :src="getItemImg(recommendedItem)" :alt="'Selected Image'">
    win_rate = {{ Math.random() }}
  </div>

</div> -->



<!-- 
<div v-for="(block, index) in selection_blocks" :key="index">
  <div v-for="(key, value) in Object.entries(block)" :key="key">
      <div v-for="(_, idx) in [...Array(value).keys()]", :key="idx">
        Pensar como gestionar que se vayan mostrando a medida que se seleccionan 
        <SelectionSlot :type="key" :client="client" :visible="getVisibility(idx)"/>
      </div>
  </div>

-->

  </section>
</template>

<script>
import { useGlobalStore } from '@/stores/global'
import ItemSelectionSlot from './ItemSelectionSlot.vue'
import ServicioBuilds from '@/services/builds'
import ServicioChampions from '@/services/champions'
import ServicioItems from '@/services/items'

export default {
  name: 'itemBuilder',
  //props: ["champ", "team"],
  props: [],
  components: {ItemSelectionSlot},
  data() {
    return {
      useGlobalStore: useGlobalStore(),
      //teams: this.useGlobalStore.getTeams,
      selectedChamp: this.selectedChamp,
      buildService: new ServicioBuilds(),
      champService: new ServicioChampions(),
      itemService: new ServicioItems(),
      finalBuild: this.finalBuild
    }
  },
  methods: {
      showRecommendation() {
        let teams = this.useGlobalStore.getTeams
        let color = this.useGlobalStore.getColors["client"]
        console.log("ItemsBuilder.showRecommendation")
        console.log(teams[color].includes(this.selectedChamp))
        return teams[color].includes(this.selectedChamp)
    },
      async getRecommendation() {
      //console.log('actualizar', e)
        this.recommendedItem = await this.serviceItems.getItem()  
    }, 
      async confirmarBuild() {
      let build = this.useGlobalStore.getBuild
      let pushElement = {"champ": this.selectedChamp, "items": build}
      this.finalBuild = await this.buildService.post(pushElement)
      this.useGlobalStore.resetBuild()
      //this.$router.push(this.getItemsRoute())
      //Aca deberia llamar al servicio para hacer un axios.post y routear a ItemBuilder
    },
    //Esto usa el estado global
    getVisibility(idx) {
      return this.useGlobalStore.getCompletedSlots === idx
    },
    getNames() {
      let teams = this.useGlobalStore.getTeams
      return teams["blue"].concat(teams["red"])

    },    
    getChampImg(champ) {
      //const img = await this.service.getImg(champ)
      return this.champService.getChampImg(champ)
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
