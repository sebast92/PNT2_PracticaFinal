<template>
  <section class="card">
    <div class="card-header">
      <h3>SelectionSlot</h3>
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
import { useGlobalStore } from '@/stores/global'
import ServicioChampions from '../services/champions'
export default {
  // Tengo que usar Estado Global para que al completarse una selection el TeamBuilder o la siguiente selection se hagan visibles.
  // El state tendria que ir agregando los completados a alguna estructura que permita determinar el siguiente a demostrar

  //Tengo que usar este componente para interactuar con mi backend, mostrar imagenes, etc.
  name: 'selection-slot',
  props: ["type", "client", "visible"],
  data() {
    return {
      globalStore: useGlobalStore(),
      service: new ServicioChampions()
    }
  },
  methods: {
    confirmado() {
      if (client) {
      this.globalStore.incrementarCompletedSlotsClient(1)  
      } else {
        this.globalStore.incrementarCompletedSlotsOpp(1)
      }
      
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

//https://axios-http.com/es/
//https://axios-http.com/es/docs/intro



const url = 'https://jsonplaceholder.typicode.com/posts/'

/* export const obtenerPosts = () => {
    axios.get(url)
        .then(res => {
            console.log(res.data);
        })
        .catch( error => console.error("Hubo un error en la solicitud", error))
} */

export const obtenerPosts = async () => {
    try {
        const { data:posts } = await axios.get(url)    // Object destructuring con alias
        //console.log(posts)
        return posts
    }
    catch(error) {
        console.error("Hubo un error en la solicitud", error)
    }
}