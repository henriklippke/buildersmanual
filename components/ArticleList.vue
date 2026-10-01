<script setup lang="ts">
import { articles } from '~/data/articles'

/* Grid of article cards. `exclude` hides the article currently being read. */
const props = defineProps<{ exclude?: string; title?: string }>()
const list = computed(() => articles.filter((a) => a.slug !== props.exclude))
</script>

<template>
  <section class="border-t border-line/60">
    <div class="mx-auto max-w-[1440px] px-6 py-16">
      <p class="eyebrow">{{ title ?? 'Articles' }}</p>
      <div class="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="a in list"
          :key="a.slug"
          :to="`/articles/${a.slug}`"
          class="group rounded-xl border border-line bg-surface p-5 transition hover:border-fg-faint"
        >
          <div class="flex items-center gap-2">
            <span class="h-2 w-2 rounded-full" :style="{ backgroundColor: a.accent }"></span>
            <span class="font-mono text-[11px] uppercase tracking-wider text-fg-faint">{{ a.kicker }}</span>
          </div>
          <h3 class="mt-3 font-semibold leading-snug transition group-hover:text-brand-soft">{{ a.h1 }}</h3>
          <p class="mt-2 line-clamp-2 text-sm leading-relaxed text-fg-muted">{{ a.description }}</p>
          <p class="mt-3 font-mono text-xs text-fg-faint">{{ a.minutes }} min read →</p>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
