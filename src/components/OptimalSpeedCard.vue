<script setup>
import { computed } from 'vue'

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
import { LineChart } from '@/components/ui/chart-line'
import { Separator } from '@/components/ui/separator'
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
  findOptimalSpeed,
  convertMinutesToHoursMinutes
} from '@/lib/utils'

const store = useStore()

const optimalValues = computed(() => handleCalculateOptimalSpeed())

function handleCalculateOptimalSpeed () {
  if (store.observations.length >= 2) {
    const min_time = findOptimalSpeed(
      store.distance,
      store.capacity,
      store.stop_time,
      store.observations
    )

    event('Find Optimal Speed', {
      event_category: 'UX',
      event_label: min_time,
      vehicle_model: store.model,
      vehicle_fuel_capacity: store.capacity,
      vehicle_target_distance: store.distance,
      vehicle_stop_time: store.stop_time,
      vehicle_economy_observations: store.observations.length
    })

    return min_time
  } else {
    return { best_speed: null, min_time: null }
  }
}

const isVisible = computed(() => {
  return (
    store.distance &&
    store.capacity &&
    store.stop_time &&
    store.observations.length >= 2   )
})

function xFormatter(tick, i) {
  return typeof tick === 'number'
    ? `${new Intl.NumberFormat('us').format(tick).toString()}`
    : '';
}

function yFormatter(tick, i) {
  return typeof tick === 'number'
    ? `${new Intl.NumberFormat('us').format(tick).toString()}`
    : '';
}
</script>

<template lang="pug">
Card(
  v-if='isVisible && optimalValues.best_speed && optimalValues.min_time'
  class='max-w-md my-6 py-3'
)
  CardHeader
    CardTitle
      h3.text-2xl.inter-600.flex.items-center
        | Driving
        span.text-3xl.inter-700.mx-3 {{ optimalValues.best_speed }}
        |  will take
        span.text-3xl.inter-700.ml-3 {{ convertMinutesToHoursMinutes(optimalValues.min_time) }}
    CardContent
      Separator(v-if='store.observations.length >=3' class='my-4' label='Estimated Time Curve')
      LineChart(
        v-if='store.observations.length >= 3'
        :data='store.observationsSpeedByTravelTime'
        index='Speed'
        :categories="['Hours']"
        :y-formatter="yFormatter"
      )
      Separator(class='my-4' label='Stats')
      Table(v-if='store.observations.length > 0')
        TableRow
          TableCell(class='inter-700 flex flex-row items-center')
            Icon(icon='mdi:car' width='32' height='32')
            span.ml-3 Model:
          TableCell {{ store.model }}
        TableRow
          TableCell(class='inter-700 flex flex-row items-center')
            Icon(icon='mdi:fuel' width='32' height='32') 
            span.ml-3 Fuel Capacity: 
          TableCell {{ store.capacity }}
        TableRow
          TableCell(class='inter-700 flex flex-row items-center')
            Icon(icon='mdi:map-marker-distance' width='32' height='32')
            span.ml-3 Distance: 
          TableCell {{ store.distance }}
        TableRow
          TableCell(class='inter-700 flex flex-row items-center')
            Icon(icon='material-symbols:speed' width='32' height='32')
            span.ml-3 Speed: 
          TableCell {{ optimalValues.best_speed }}
        TableRow
          TableCell(class='inter-700 flex flex-row items-center')
            Icon(icon='material-symbols:hourglass' width='32' height='32')
            span.ml-3 Estimated Time: 
          TableCell {{ convertMinutesToHoursMinutes(optimalValues.min_time) }}
        TableRow
          TableCell(class='inter-700 flex flex-row items-center')
            Icon(icon='mdi:fuel-pump' width='32' height='32')
            span.ml-3 Total Stops: 
          TableCell {{ optimalValues.stops }}
        TableRow
          TableCell(class='inter-700 flex flex-row items-center')
            Icon(icon='mdi:stopwatch-add' width='32' height='32')
            span.ml-3 Refueling Time: 
          TableCell {{ optimalValues.refueling_time }}
        TableRow
          TableCell(class='inter-700 flex flex-row items-center')
            Icon(icon='mdi:fossil-fuel' width='32' height='32')
            span.ml-3 Fuel Needed: 
          TableCell {{ optimalValues.fuel_consumed.toFixed(0) }}
</template>
