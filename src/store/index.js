import { defineStore } from 'pinia'

function state () {
  return {
    model: null,
    distance: null,
    capacity: null,
    stop_time: null,
    observations: []
  }
}

const getters = {
  getState (state) {
    return state
  }
}

const actions = {
  setModel (model) {
    this.model = model
  },
  setDistance (distance) {
    this.distance = distance
  },
  setCapacity (capacity) {
    this.capacity = capacity 
  },
  setStopTime (stop_time) {
    this.stop_time = stop_time 
  },
  addObservation (observation) {
    this.observations.push(observation)
  },
  removeObservation (speed) {
    this.observations = this.observations.filter(observation => speed !== observation.speed)
  }
}

export const useStore = defineStore({
  id: 'optimizer',
  state: state,
  getters: getters,
  actions: actions,
  persist: true
})
