<template>
  <section class="card">
    <div class="card-header">
      <h3>SelectionPhase</h3>
    </div>

    <div v-for="(_, idx) in [...Array(number).keys()]" :key="idx">
      
        <div>{{_}} en array.keys(): {{ idx }}</div>  
        <ul>
         <li>
           <ChampSelectionSlot :type="pickorban" :client="client" :blockindex="blockindex" :hidden="isHiddenSlot(idx)"/>
         </li>
        </ul>
        </div>


<!-- <div>
  <button @click="confirmado()">Confirmar fin de fase </button>
</div>
       -->

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
import ChampSelectionSlot from './ChampSelectionSlot.vue'
export default {
  // Tengo que usar Estado Global para que al completarse una selection el TeamBuilder o la siguiente selection se hagan visibles.
  // El state tendria que ir agregando los completados a alguna estructura que permita determinar el siguiente a demostrar

  //Tengo que usar este componente para interactuar con mi backend, mostrar imagenes, etc.
  name: 'selection-slot',
  props: ["pickorban", "client", "number", "blockindex"],
  components: {ChampSelectionSlot},
  data() {
    return {
      globalStore: useGlobalStore(),
      finalized: false
      // client: this.client,
      // pickorban: this.pickorban,
      // number: this.number,
      // blockindex: this.blockindex
    }
  },
  methods: {
    // isHiddenPhase(key) {
    //   if(key[0] === 'ban') {
    //     return true
    //   } else {
    //       const result = this.globalStore.checkVisibility(key[1])
    //       if (result) {

    //       }
    //     }
    //   },

    // Solo muestro si el idx, que tengo que ver si es relativo a la fase, al bloque o al conjunto, esta a la altura de los slots totales ocupados
    isHiddenSlot(idx) {
      console.log("this.pickorban")
      
      let processedClient
      if (this.client) {
          processedClient = "client"
      } else {
        processedClient = "opp"
      }
      console.log(this.blockindex, processedClient)

      let slots = this.globalStore.getHiddenCounters[this.blockindex][processedClient][this.pickorban]
      // let slots
      // if (this.client) {
      //   slots = this.globalStore.getCompletedSlotsClient
      // } else {
      //   slots = this.globalStore.getCompletedSlotsOpp
      // }
      console.log(slots, idx)
      console.log(slots < idx)
      return slots < idx
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