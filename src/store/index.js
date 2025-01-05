import { defineStore } from 'pinia'

import { calculateTravelTime, convertMinutesToHoursMinutes } from '@/lib/utils'

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
  },
  observationsWithCalculations () {
    return this.observations.map((observation) => {
      const travel_data = calculateTravelTime(
        this.distance,
        observation.speed,
        observation.economy,
        this.capacity,
        this.stop_time
      )

      return {
        speed: observation.speed,
        economy: observation.economy,
        total_time: travel_data.total_time,
        stops: travel_data.stops,
        refueling_time: travel_data.refueling_time,
        fuel_consumed: travel_data.fuel_consumed,
      }
    })
  },
  observationsWithCalculationsSorted () {
    const observations = this.observationsWithCalculations
    return observations.sort((a, b) => a.speed - b.speed)
  },
  observationsSpeedByTravelTime () {
    const observations = this.observationsWithCalculations
    return observations.map(({ speed, total_time }) => { 
      total_time = total_time / 60
      return {
        'Speed': speed,
        'Hours': total_time
      }
    })
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
    const existingIndex = this.observations.findIndex(obs => obs.speed === observation.speed)
    if (existingIndex >= 0) {
      this.observations[existingIndex] = observation
    } else {
      this.observations.push(observation)
    }
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
