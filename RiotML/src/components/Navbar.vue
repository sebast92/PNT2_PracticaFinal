<template>
  <!-- <button class="btn btn-info my-3" @click="goToContadores()">Ir a Contadores</button> -->

  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-2">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/">Inicio - global: {{ globalStore.getContador }}</RouterLink>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">

          <li class="nav-item">
            <RouterLink class="nav-link" :to=getItemsRoute()>Api</RouterLink>
          </li>
          <!-- <li class="nav-item">
            <RouterLink class="nav-link" to="/championsSelection" + getChampSelectionBlock()>Estado</RouterLink>
          </li> -->
        </ul>
      </div>
    </div>
  </nav>

</template>

<script>
import { useGlobalStore } from '@/stores/global'
export default {
  name: 'navbar',
  props: [],
  data() {
    return {
      globalStore: useGlobalStore()
    }
  },
  methods: {    
    getItemsSlots() {
      return this.globalStore.getItemsSlots
    },    
    getChampSelectionBlock() {
      return this.globalStore.getChampSelectionBlock
    },
    // goToContadores() {
    //   this.$router.push('/contadores')
    // },
    getItemsRoute() {
      //return this.useGlobalStore.getItemsSlots()
      return `/itemsSelection/${this.globalStore.getItemsSlots}`
    },
  },
  computed: {

  }
}
</script>

<style scoped></style>
