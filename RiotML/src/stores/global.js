import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => ({ completedSlots: {"client": 0, "opp": 0},
                itemsSlots: 8,
                champSelectionBlock: [{"ban": 3, "pick": 3}, {"ban": 2, "pick": 2}],
                completionCriteria: {"client": 10, "opp": 10},
                //names: await getAllNames()
   }),
  getters: {
    getCompletedSlotsClient: state => state.completedSlots.client,
      //client? state.completedSlots.client: state.completedSlots.opp,
    getCompletedSlotsOpp: state => state.completedSlots.opp,
    
    getItemsSlots: state => state.itemsSlots,
    getChampSelectionBlock: state => state.champSelectionBlock,
    getCompletion: state => state.completedSlots == state.completionCriteria
  },
  actions: {
    incrementarCompletedSlotsClient(paso) {
      this.completedSlots.client += paso
    },
      incrementarCompletedSlotsOpp(paso) {
      this.completedSlots.opp += paso
    },
  },
})