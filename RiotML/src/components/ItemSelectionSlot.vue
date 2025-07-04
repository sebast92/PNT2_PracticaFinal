<template>
  <section class="card">
    <div class="card-header">
      <h3>Item SelectionSlot</h3>
    </div>

<div>
<div v-for="(_, idx) in [...Array(value).keys()]", :key="idx"> </div>
    <ItemSelectionSlot />
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
//import ServicioItems from '../services/items'
export default {
  // Tengo que usar Estado Global para que al completarse una selection el TeamBuilder o la siguiente selection se hagan visibles.
  // El state tendria que ir agregando los completados a alguna estructura que permita determinar el siguiente a demostrar

  //Tengo que usar este componente para interactuar con mi backend, mostrar imagenes, etc.
  name: 'selection-slot',
  props: ["type", "client", "visible"],
  data() {
    return {
      globalStore: useGlobalStore(),
      //service: new ServicioItems()
    }
  },
  methods: {
    confirmado() {
      this.globalStore.incrementarCompletedSlots(1)
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
