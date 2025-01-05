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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Icon } from '@iconify/vue'

import { event } from "vue-gtag"

import { useStore } from '@/store/index.js'

import {
  calculateTravelTimeWithFormatting
} from '@/lib/utils'

const store = useStore()

let speed = null
let economy = null

function handleAddObservation (speed, economy) {
  if(speed !== null && economy !== null) {
    store.addObservation({
      speed: speed,
      economy, economy
    })

    speed = null
    economy = null

    event('Add Economy Observation', {
      event_category: 'UX',
      observation_speed: speed,
      observation_economy: economy
    })
  }
}

function handleRemoveObservation (speed) {
  store.removeObservation(speed)

  event('Remove Economy Observation', {
    event_category: 'UX'
  })
}

const observations_with_min_time = computed( () => {
  return store.observations.map((observation) => ({
    speed: observation.speed,
    economy: observation.economy,
    min_time: calculateTravelTimeWithFormatting(
      store.distance,
      observation.speed,
      observation.economy,
      store.capacity,
      store.stop_time
    )
  }))
})
</script>

<template lang="pug">
Card(class='max-w-md my-6 py-3')
  CardHeader
    CardTitle
      span.text-xl.inter-700 Input your fuel economy 
    CardDescription
      p.text-sm.inter-400
        | Add the fuel economy of your vehicle at different speeds
        | to calculate the speed that will complete the
        | distance in the fastest time.
      p.text-sm.inter-400
        | Two observations are needed to calculate.
      p.text-sm.inter-400
        | The calculation is more valuable with more observed speeds and fuel
        | economies.
  CardContent(class="grid grid-cols-3 w-full items-center justify-center gap-1.5 ")
    .w-full.col-span-3
      Table(v-if='store.observations.length > 0')
        TableCaption Observed fuel economy for your vehicle at different speeds
        TableHeader
          TableRow
            TableHead Speed
            TableHead Economy
            TableHead Est. Time
            TableHead(class='text-right') Remove
        TableRow(v-for='observation in observations_with_min_time')
          TableCell {{ observation.speed }}
          TableCell {{ observation.economy }}
          TableCell {{ observation.min_time }}
          TableCell
            .flex.justify-end
              Icon(
                icon='material-symbols:delete'
                width='24'
                height='24'
                @click='handleRemoveObservation(observation.speed)'
              )
    .w-full.max-w-md.flex.flex-row.items-center.space-x-2.mx-auto
      Label(for='speed') Speed 
      TooltipProvider
        Tooltip
          TooltipTrigger
            Icon(icon='mdi:tooltip-question' width='24' height='24')
          TooltipContent
            p
            | The speed at which you observed the vehicle's
            p
            | fuel economy.
            p 
            | Any unit of measurement can be used as long as it remains
            p
            | consistent with the journey information. 
            p
            | (e.g. inputting miles per hour in the speed field 
            p
            | and miles in the distance field).
    .w-full.max-w-md.col-span-2.flex.flex-row.items-center.space-x-2.mx-auto
      Icon(icon='mdi:fuel-pump' width='32' height='32')
      Input(
        v-model='speed'
        id='speed'
        type='number'
        placeholder='55'
      )
    .w-full.max-w-md.flex.flex-row.items-center.space-x-2.mx-auto
      Label(for='economy') Economy 
      TooltipProvider
        Tooltip
          TooltipTrigger
            Icon(icon='mdi:tooltip-question' width='24' height='24')
          TooltipContent
            p
            | The amount of distance per unit of fuel consumed 
            p
            | at this speed.
            p 
            | Any unit of measurement can be used as long as it remains
            p
            | consistent with the vehicle information. 
            p
            | (e.g. inputting miles per gallon in the economy field 
            p
            | and gallons in the capacity field).
    .w-full.max-w-md.col-span-2.flex.flex-row.items-center.space-x-2.mx-auto
      Icon(icon='mdi:fuel-pump' width='32' height='32')
      Input(
        v-model='economy'
        id='economy'
        type='number'
        placeholder='30'
        @keydown.enter='handleAddObservation(speed, economy)'
      )
  CardFooter(class='w-full center-align')
    Button(@click='handleAddObservation(speed, economy)') Save 
</template>
