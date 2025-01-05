<script setup>
import { useStore } from '@/store/index.js'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import Container from '@/components/Container.vue'

import VehicleInfoCard from '@/components/VehicleInfoCard.vue'
import EconomyObservations from '@/components/EconomyObservations.vue'
import OptimalSpeedCard from '@/components/OptimalSpeedCard.vue'

const store = useStore()
</script>

<template lang="pug">
Container
  .center-align.flex-col.min-w-7.max-w-xl.py-6
    h1.m-6 Journey Optimizer
    h2.m-6 Identify the optimal speed for any road trip based on your vehicle's fuel economy and capacity. 
  .center-align.flex-col.min-w-7.max-w-xl.py-6
    VehicleInfoCard
  .center-align.flex-col.min-w-7.max-w-xl.py-6
    EconomyObservations
  .center-align.flex-col.min-w-7.max-w-xl.py-6
    OptimalSpeedCard
</template>
