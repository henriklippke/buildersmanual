<script setup lang="ts">
defineProps<{
  num: string
  kicker: string
  title: string
  sub?: string
}>()
</script>

<template>
  <div class="max-w-2xl">
    <div class="flex items-center gap-3">
      <span class="font-mono text-sm font-semibold text-brand">{{ num }}</span>
      <span class="h-px w-8 bg-line"></span>
      <span class="eyebrow">{{ kicker }}</span>
    </div>
    <h2 class="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
      {{ title }}
    </h2>
    <p v-if="sub" class="mt-3 text-lg leading-relaxed text-fg-muted">
      {{ sub }}
    </p>
  </div>
</template>
