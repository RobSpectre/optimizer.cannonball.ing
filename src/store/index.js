import { defineStore } from 'pinia'

function state () {
  return {
    model: '',
    distance: 0,
    capacity: 0,
    economy: 0,
    stop_time: 0,
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
  setEconomy (economy) {
    this.economy = economy 
  },
  setStopTime (stop_time) {
    this.stop_time = stop_time 
  },
  addObservation (observation) {
    this.observations.push(observation)
  },
  removeObservation (speed) {
    this.state.observations = this.game.observations.filter(observation => speed !== observation.speed)
  }
}

export const useStore = defineStore({
  id: 'optimizer',
  state: state,
  getters: getters,
  actions: actions,
  persist: true
})
