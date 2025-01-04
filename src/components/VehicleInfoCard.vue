<script setup>
import { computed } from 'vue'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

import { Icon } from '@iconify/vue'

import { event } from "vue-gtag"

import { useStore } from '@/store/index.js'

const store = useStore()

const model = computed({
  get: () => store.model,
  set: (value) => store.setModel(value) 
})
const distance = computed({
  get: () => store.distance,
  set: (value) => store.setDistance(value) 
})
const capacity = computed({
  get: () => store.capacity,
  set: (value) => store.setCapacity(value) 
})
const stop_time = computed({
  get: () => store.stop_time,
  set: (value) => store.setStopTime(value) 
})

const fields = {
  model,
  distance,
  capacity,
  stop_time,
}

function handleInput( input, property, length_limit ) {
  if (input && input.length >= length_limit) {
    fields[property] = input
  }
}

function clearVehicleInfo () {
  Object.keys(fields).forEach((key) => {
    fields[key].value = null
  })

  event('Clear Vehicle Info', {
    event_category: 'UX'
  })
}
</script>

<template lang="pug">
Card(class='max-w-md my-6 py-3')
  CardHeader
    CardTitle
      span.text-xl.inter-700 Input your vehicle information
    CardDescription
      span.text-sm.inter-400
        | Add your model, fuel capacity, journey distance, 
        |  stop time and fuel economy observations to
        |  calculate the optimum speed to cover the distance
        |  in the shortest time.
  CardContent(class="grid grid-cols-3 w-full items-center justify-center gap-1.5 ")
    .w-full.max-w-md.flex.flex-row.items-center.space-x-2.mx-auto
      Label(for='model') Model
      TooltipProvider
        Tooltip
          TooltipTrigger
            Icon(icon='mdi:tooltip-question' width='24' height='24')
          TooltipContent
            p The year, make and model of the vehicle. 
    .w-full.max-w-md.col-span-2.flex.flex-row.items-center.space-x-2.mx-auto
      Icon(icon='mdi:car' width='32' height='32')
      Input(
        v-model='model'
        id='model'
        type='text'
        placeholder='1983 Nissan Fairlady Z'
        @keydown='handleInput(model, "model", 5)'
      )
    .w-full.max-w-md.flex.flex-row.items-center.space-x-2.mx-auto
      Label(for='capacity') Fuel Capacity 
      TooltipProvider
        Tooltip
          TooltipTrigger
            Icon(icon='mdi:tooltip-question' width='24' height='24')
          TooltipContent
            p
            | The amount of fuel the vehicle can carry.
            p 
            | Any unit of measurement can be used as long as it remains
            p
            | consistent with the fuel economy observations
            p
            | (e.g. inputting gallons in the capacity field
            p
            | and miles per gallon in the economy field).
           
    .w-full.max-w-md.col-span-2.flex.flex-row.items-center.space-x-2.mx-auto
      Icon(icon='mdi:fuel' width='32' height='32')
      Input(
        v-model='capacity'
        id='capacity'
        type='number'
        placeholder='16'
        @input='handleInput(capacity, "capacity", 0)'
      )
    .w-full.max-w-md.flex.flex-row.items-center.space-x-2.mx-auto
      Label(for='distance') Distance 
      TooltipProvider
        Tooltip
          TooltipTrigger
            Icon(icon='mdi:tooltip-question' width='24' height='24')
          TooltipContent
            p
            | The total distance of the journey.
            p
            | Any unit of measurement can be used as long as it remains
            p
            | consistent with the speed observations
            p
            | (e.g. inputting miles in the distance field
            p
            | and miles per hour in the speed field).
    .w-full.max-w-md.col-span-2.flex.flex-row.items-center.space-x-2.mx-auto
      Icon(icon='mdi:map-marker-distance' width='32' height='32')
      Input(
        v-model='distance'
        id='distance'
        type='number'
        placeholder='300'
        @input='handleInput(distance, "distance", 2)'
      )
    .w-full.max-w-md.flex.flex-row.items-center.space-x-2.mx-auto
      Label(for='stop_time') Stop Time 
      TooltipProvider
        Tooltip
          TooltipTrigger
            Icon(icon='mdi:tooltip-question' width='24' height='24')
          TooltipContent
            p The amount of time in minutes for each fuel stop. 
    .w-full.max-w-md.col-span-2.flex.flex-row.items-center.space-x-2.mx-auto
      Icon(icon='mdi:stopwatch-add' width='32' height='32')
      Input(
        v-model='stop_time'
        id='stop_time'
        type='number'
        placeholder='7'
        @input='handleInput(stop_time, "stop_time", 0)'
      )
  CardFooter(class='w-full center-align')
    Button(@click='clearVehicleInfo()') Clear
</template>
