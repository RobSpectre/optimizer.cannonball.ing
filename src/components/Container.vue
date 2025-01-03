<script setup>
import { cn } from '@/lib/utils'
</script>

<template>
  <div :class="cn('flex flex-col items-center justify-center [&>div]:w-full', $attrs.class ?? '')">
    <slot />
  </div>
</template>
