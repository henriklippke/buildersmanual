<script setup lang="ts">
/* Shell for the legal pages: simple header, prose body, footer. Always
   noindex, the pages exist for the law, not for search. */
const props = defineProps<{ title: string }>()

useHead({
  title: `${props.title} · SaaS Builders Manual`,
  meta: [{ name: 'robots', content: 'noindex, follow' }],
})
</script>

<template>
  <div class="flex min-h-screen flex-col bg-ink text-fg">
    <header class="sticky top-0 z-50 border-b border-line/70 bg-ink/80 backdrop-blur-md">
      <div class="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-6 py-3.5">
        <NuxtLink to="/" class="flex items-center gap-2.5">
          <span
            class="grid h-7 w-7 place-items-center rounded-md bg-brand font-mono text-[10px] font-bold text-ink"
            >SBM</span
          >
          <span class="hidden font-mono text-sm font-semibold tracking-tight sm:inline"
            >SaaS Builders Manual</span
          >
        </NuxtLink>
        <NuxtLink to="/" class="font-mono text-xs text-fg-faint transition hover:text-fg">
          ← Back to the course
        </NuxtLink>
      </div>
    </header>

    <main class="flex-1">
      <div class="mx-auto max-w-3xl px-6 pb-20 pt-14 md:pt-20">
        <h1 class="text-3xl font-bold tracking-tight md:text-4xl">{{ title }}</h1>
        <div class="legal mt-8 space-y-6 leading-relaxed text-fg-muted">
          <slot />
        </div>
      </div>
    </main>

    <SiteFooter />
  </div>
</template>

<style scoped>
.legal :deep(h2) {
  margin-top: 2.25rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--color-fg);
}
.legal :deep(a) {
  color: var(--color-brand-soft);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.legal :deep(b) {
  color: var(--color-fg);
  font-weight: 600;
}
</style>
