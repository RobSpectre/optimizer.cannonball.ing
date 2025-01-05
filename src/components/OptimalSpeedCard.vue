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
    return findOptimalSpeed(
      store.distance,
      store.capacity,
      store.stop_time,
      store.observations
    )
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
    CardDescription
</template>
