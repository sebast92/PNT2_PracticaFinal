<template>
  <div class="container-fluid mt-3">
    <div class="card">
      <header class="card-header">
        <h2>Riot ML</h2>
      </header>

      <main class="card-body">
        <!-- <Navbar /> -->
        <RouterView />

        <!-- <ChampionsSelection :champ_selection_blocks="getChampSelectionBlock()"/> -->
        <!-- <ChampionsSelection /> -->
        
        
        <!-- <Binding />
        <Estructura />
        <Atributos />
        <Formulario />
        <Contadores /> -->
      </main>
    </div>
  </div>
</template>

<script>
/* componentes de simple archivo (template, script y style) */
//import Navbar from './components/Navbar.vue'
import ChampionsSelection from './components/ChampionsSelection.vue'
//import { useGlobalStore } from '@/stores/global'

export default {
  name: 'app',
  components: {
    //Navbar,
    ChampionsSelection
  },
  //data: {//useGlobalStore: useGlobalStore()},
  methods: {
    // getChampSelectionBlock() {
    //   return this.useGlobalStore.getChampSelectionBlock()
    // },
  }
}
</script>

<style scoped>
.card-header {
  background-color: green;
  color: white;
}
</style>
