<script setup>
import { mapGetters, mapActions } from 'pinia'
import { useStore } from '@/store/index.js'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Icon } from '@iconify/vue'

import Container from '@/components/Container.vue'
</script>

<template lang="pug">
Container
  .center-align.flex-col.min-w-7.max-w-xl.py-6
    h1.m-6 Journey Optimizer
    h2.m-6 Identify optimal speed based on your vehicle's fuel economy and capacity.
  .center-align.flex-col.min-w-7.max-w-xl.py-6
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
        Label(for='model') Model
        .w-full.max-w-md.col-span-2.flex.flex-row.items-center.space-x-2.mx-auto
          Icon(icon='mdi:car' width='32' height='32')
          Input(id='model' placeholder='1983 Nissan Fairlady Z')
        Label(for='capacity') Fuel Capacity 
        .w-full.max-w-md.col-span-2.flex.flex-row.items-center.space-x-2.mx-auto
          Icon(icon='mdi:fuel' width='32' height='32')
          Input(id='capacity' placeholder='16')
        Label(for='distance') Distance 
        .w-full.max-w-md.col-span-2.flex.flex-row.items-center.space-x-2.mx-auto
          Icon(icon='mdi:map-marker-distance' width='32' height='32')
          Input(id='distance' placeholder='300')
        Label(for='stop_time') Stop Time 
        .w-full.max-w-md.col-span-2.flex.flex-row.items-center.space-x-2.mx-auto
          Icon(icon='mdi:stopwatch-add' width='32' height='32')
          Input(id='stop_time' placeholder='7')
</template>
