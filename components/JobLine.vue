<script setup lang="ts">
/* The assembled "job, in one line" box. Shown on Lesson 1 (where it is filled
   in) and repeated as a recap on Lesson 2. Accent defaults to the brand color
   and follows the chosen motion once one is picked. */
defineProps<{
  situation?: string
  job?: string
  outcome?: string
  hire?: string
  filled: number
  total: number
  accent?: string
}>()
</script>

<template>
  <div>
    <p class="eyebrow mb-3">The job, in one line</p>
    <div
      class="rounded-xl border p-5"
      :style="{
        borderColor: `color-mix(in srgb, ${accent || 'var(--color-brand)'} 40%, var(--color-line))`,
        backgroundColor: `color-mix(in srgb, ${accent || 'var(--color-brand)'} 6%, var(--color-surface))`,
      }"
    >
      <p class="text-lg leading-relaxed">
        When
        <span class="font-semibold text-brand">{{ situation || '[the trigger]' }}</span>,
        they want to
        <span class="font-semibold text-brand">{{ job || '[the job]' }}</span>,
        so they can
        <span class="font-semibold text-brand">{{ outcome || '[the outcome]' }}</span>.
        Today they hire
        <span class="font-semibold text-brand">{{ hire || "[today's fix]" }}</span>
        to get it done.
      </p>
      <p class="mt-3 font-mono text-xs text-fg-faint">
        {{ filled }} / {{ total }} filled. If the job line is fuzzy, that fuzz
        is the real work, not the wording.
      </p>
    </div>
  </div>
</template>
