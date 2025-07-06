import ServicioChampions from '@/services/champions'
import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => ({ completedSlots: {"client": 0, "opp": 0},
                itemsSlots: 8,
                champSelectionBlock: [{"ban": 3, "pick": 3}, {"ban": 2, "pick": 2}],
                hiddenCounters: [{"client": {"ban": 0, "pick": 0}, "opp": {"ban": 0, "pick": 0}}, 
                                {"client": {"ban": 0, "pick": 0}, "opp": {"ban": 0, "pick": 0}}],
                //firstHiddenPhase: true,
                //secondHiddenPhase: true,
                //firstpickHidden: [{"client": true, "opp": true}, {"client": true, "opp": true}],
                // pickHidden: [[{"client": true, "opp": true}, {"client": true, "opp": true}], 
                // [{"client": true, "opp": true}, {"client": true, "opp": true}]],
                completionCriteria: {"client": 10, "opp": 10},
                service: new ServicioChampions(),
                names: {}
                //names: await getAllNames()
   }),
  getters: {
    getCompletedSlotsClient: state => state.completedSlots.client,
      //client? state.completedSlots.client: state.completedSlots.opp,
    getCompletedSlotsOpp: state => state.completedSlots.opp,
    getItemsSlots: state => state.itemsSlots,
    getChampSelectionBlock: state => state.champSelectionBlock,
    getCompletion: state => state.completedSlots == state.completionCriteria,
    getNames: state => state.names,
    getHiddenCounters: state => state.hiddenCounters,
  },
  actions: {
    incrementarCompletedSlotsClient(paso, blockindex, client, type) {
      this.completedSlots.client += paso

      let processedClient
      if (client) {
          processedClient = "client"
      } else {
        processedClient = "opp"
      }
      console.log("incrementarCompletedSlotsClient")
      console.log(blockindex, processedClient, type) 
      this.hiddenCounters[blockindex][processedClient][type] += paso
      console.log("Result")
      console.log(this.hiddenCounters)
    },
      incrementarCompletedSlotsOpp(paso, blockindex, client, type) {
      this.completedSlots.opp += paso

      let processedClient
      if (client) {
          processedClient = "client"
      } else {
        processedClient = "opp"
      }
      this.hiddenCounters[blockindex][processedClient][type] += paso
    },
    // checkVisibility(index) {
    //   return selectionIdxVisibilityChange.includes(index)
    // },
    removeName(name) {
      const new_names = this.names.splice(this.names.indexOf(name))
      //Esto tiene que sacar el name de todos los componentes, los names quiza tienen que estar en el estado global
      this.names = new_names
    },
    setNames(names) {
      this.names = names
    },
    
  },
})