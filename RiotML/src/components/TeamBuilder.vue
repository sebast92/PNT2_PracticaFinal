<template>
  <section class="card">
    <div class="card-header">
      <h3>Team Builder</h3>
      <h4> {{ color }}</h4>
      <h4> {{ client }}</h4>
      <h4> {{ selections }}</h4>
    </div>

<!-- <div v-for="(block, index) in selections" :key="index">
  <div v-for="(key, value) in Object.entries(block)" :key="key">
      <div v-for="(_, idx) in [...Array(value).keys()]" :key="idx">
        <ChampSelectionSlot :type="key" :client="client" :hidden="isHidden(idx)"/>
        <div>Hola {{ idx  }}</div>
      </div>
  </div>
  
</div> -->



<div v-for="(block, index) in selections" :key="index" :hidden="isHiddenBlock(index)">
  <div>{{block}} en selections: {{ index }}</div>

    <ChampSelectionBlock :block="block" :client="client" :index="index"/>

        <!-- <div>Hola {{ idx  }}</div> VA A QUEDAR MEJOR SI ARMO UN COMPONENTE PARA CADA BLOQUE DE SELECCION, MAS FACIL DESACOPLAR VARIABLES INTERNAS DEL BUILDER-->    
      </div>

<div>
  <button @click="setBlockCompleted()">Confirmar bloque de seleccion</button>
</div>
        

  </section>
</template>

<script>
import { useGlobalStore } from '@/stores/global'

import ChampSelectionBlock from './ChampSelectionBlock.vue'
export default {
  name: 'teamBuilder',
  props: ["color", "client", "selections"],
  components: {ChampSelectionBlock},
  data() {
    return {
      useGlobalStore: useGlobalStore(),
      blocksCompleted: 0,
    }
  },
  methods: {
    // Si index es 0 mostrar siempre, si es 1 hay que mostrar solo si se completo el anterior bloque
    // isHiddenBlock(index) {
    //   if(index === 0) {
    //     return false
    //   } else {
    // return false

    isHiddenBlock(index) {
      if(index > this.blocksCompleted) {
        return true
      } else {
    return false


        //const hiddenResults = this.useGlobalStore.getPickHidden
        //console.log(hiddenResults)

        //return hiddenResults[index][this.client]
        
        // const sumSlots = Object.values(block).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        // if (this.client && sumSlots === this.useGlobalStore.getCompletedSlotsClient) {
        //   return false
        // } else if (!this.client && sumSlots === this.useGlobalStore.getCompletedSlotsOpp)
        // {
        //   return false
        // } else {
        //   return true
        // }
      }
    },
    setBlockCompleted() {
      this.blocksCompleted += 1
    },
    getCompletion() {
      return this.useGlobalStore.getCompletion
    },
    actualizar(e) {
      //console.log('actualizar', e)
      const dato = e.target.value
      console.log(dato)
      this.valor2 = dato
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
