<template>
  <section class="card">
    <div class="card-header">
      <h3>SelectionSlot</h3>
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

  <div class="image-container" v-if="selectedChamp">
    <img :src="getImgUrl(selectedChamp)" :alt="'Selected Image'">
  </div>
</div>

<div>
  <button @click="confirmado()">Confirmar seleccion</button>
</div>
</div>

<!-- <div>
    <div class="card-body">
          <div class="card-body">
      <Team :color="red" :client="client" />
          </div>
          </div>
</div> -->
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
  props: ["type", "client", "blockindex"],
  data() {
    return {
      globalStore: useGlobalStore(),
      service: new ServicioChampions(),
      selectedChamp: this.selectedChamp
    }
  },

  methods: {
    confirmado() {
      console.log("Remove name en confirmado")
      console.log(this.selectedChamp)
      if (this.client) {
      this.globalStore.incrementarCompletedSlotsClient(1, this.blockindex, this.client, this.type)  
      } else {
        this.globalStore.incrementarCompletedSlotsOpp(1, this.blockindex, this.client, this.type)
      }
      this.globalStore.removeName(this.selectedChamp)
      //const new_names = this.names.splice(this.names.indexOf(this.selectedChamp))
      //Esto tiene que sacar el name de todos los componentes, los names quiza tienen que estar en el estado global
      //this.names = new_names
    },
    getNames() {
      //const names = await this.service.getAllNames()
      return this.globalStore.getNames
    },
   getImgUrl(champ) {
      //const img = await this.service.getImg(champ)
      return this.service.getImg(champ)
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