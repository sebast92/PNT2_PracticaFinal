<template>
  <section class="card">
    <div class="card-header">
      <h3>SelectionBlock</h3>
    </div>


<div v-for="(key, value) in Object.entries(block)" :key="value" :hidden="isHiddenPhase(value)">
    <div>{{key}} en block: {{ index }} con {{ value }}
      Este value me caga porque menda para blockindex 2  cuando es otra fase en el mismo bloque
      <ChampSelectionPhase :pickorban="key[0]" :client="client" :number="key[1]" :blockindex="index"/>
      </div>  
</div>
<!-- <div v-for="(key, value) in Object.entries(block)" :key="value" :hidden="isHiddenPhase(key)">
    <div>{{key}} en block: {{ value }}</div>  
    <div v-for="(_, idx) in [...Array(key[1]).keys()]" :key="idx">
      
        <div>{{_}} en array.keys(): {{ idx }}</div>  
        <ul>
         <li>
           <ChampSelectionSlot :type="key[1]" :client="client" :hidden="isHiddenSlot(idx)"/>
         </li>
        </ul> -->


<div>
  <button @click="setBanCompleted()">Confirmar fin de fase de banneos</button>
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
import ChampSelectionPhase from './ChampSelectionPhase.vue'
export default {
  // Tengo que usar Estado Global para que al completarse una selection el TeamBuilder o la siguiente selection se hagan visibles.
  // El state tendria que ir agregando los completados a alguna estructura que permita determinar el siguiente a demostrar

  //Tengo que usar este componente para interactuar con mi backend, mostrar imagenes, etc.
  name: 'selection-slot',
  props: ["block", "client", "index"],
  components: {ChampSelectionPhase},
  data() {
    return {
      globalStore: useGlobalStore(),
      banCompleted: false
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
    // Si es la primera fase la muestra, si es la segunda la muestro si se completo la primera
    isHiddenPhase(key) {

      if (key === 0) {
          return false  
      } else if (this.banCompleted) {
        return false
      } else {
        return true
      }
      },
      // isHiddenPhase(key) {
      //   return false
      // },

    setBanCompleted() {
      this.banCompleted = true
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