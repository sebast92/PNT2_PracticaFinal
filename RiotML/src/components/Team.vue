<template>
  <section class="card">
    <div class="card-header">
      <h3>Componente Binding</h3>
    </div>

<div>
    <div class="card-body">
          <div class="card-body">
      <Team :color="blue" :client="client" />
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
export default {
  name: 'binding',
  props: ["color", "clientTeam"],
  data() {
    return {
      
    }
  },
  methods: {
    incrementar() {
      this.contador3++
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
