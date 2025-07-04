<template>
  <section class="card">
    <div class="card-header">
      <h3>Item Builder</h3>
      <h4> {{ color }}</h4>
      <h4> {{ client }}</h4>
    </div>

<div v-for="(block, index) in selection_blocks" :key="index">
  <div v-for="(key, value) in Object.entries(block)" :key="key">
      <div v-for="(_, idx) in [...Array(value).keys()]", :key="idx">
        <!-- Pensar como gestionar que se vayan mostrando a medida que se seleccionan -->
        <SelectionSlot :type="key" :client="client" :visible="getVisibility(idx)"/>
      </div>
  </div>
</div>

<div>
    <div class="card-body">
          <div class="card-body">
      <Team :color="red" :client="client" />
          </div>
          </div>
          </div>

  </section>
</template>

<script>
import { useGlobalStore } from '@/stores/global'
import SelectionSlot from './ChampSelectionSlot.vue'
export default {
  name: 'itemBuilder',
  props: ["champ", "team", "selection-slots"],
  data() {
    return {
      useGlobalStore: useGlobalStore()
    }
  },
  methods: {
    //Esto usa el estado global
    getVisibility(idx) {
      return this.useGlobalStore.getCompletedSlots === idx
    },
    getContador() {
      return this.contador3
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
