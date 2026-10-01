<script setup lang="ts">
import { articleBySlug } from '~/data/articles'

const SITE = 'https://www.buildersmanual.dev'
const route = useRoute()
const article = articleBySlug(String(route.params.slug))
if (!article) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found', fatal: true })
}
const a = article
const url = `${SITE}/articles/${a.slug}/`

useSeoMeta({
  title: a.title,
  description: a.description,
  ogTitle: a.title,
  ogDescription: a.description,
  ogType: 'article',
  ogUrl: url,
  twitterCard: 'summary',
})
useHead({
  link: [{ rel: 'canonical', href: url }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: a.title,
        description: a.description,
        mainEntityOfPage: url,
        publisher: { '@type': 'Organization', name: 'SaaS Builders Manual', url: SITE },
      }),
    },
  ],
})

const scrollToCoaching = () => {
  document.getElementById('coaching')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
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
        <div class="flex items-center gap-4">
          <NuxtLink to="/#motions" class="font-mono text-xs text-fg-faint transition hover:text-fg">
            The course
          </NuxtLink>
          <button
            type="button"
            class="shrink-0 rounded-lg border border-brand/60 px-3 py-1.5 font-mono text-xs font-semibold text-brand transition hover:bg-brand hover:text-ink"
            @click="scrollToCoaching"
          >
            Coaching
          </button>
        </div>
      </div>
    </header>

    <main class="flex-1">
      <article class="relative">
        <div class="grid-bg absolute inset-x-0 top-0 h-72 opacity-30"></div>
        <div class="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-transparent to-ink"></div>
        <div class="relative mx-auto max-w-3xl px-6 pb-16 pt-14 md:pt-20">
          <div class="flex items-center gap-3">
            <span class="h-2.5 w-2.5 rounded-full" :style="{ backgroundColor: a.accent }"></span>
            <span class="eyebrow">{{ a.kicker }}</span>
            <span class="font-mono text-xs text-fg-faint">· {{ a.minutes }} min read</span>
          </div>
          <h1 class="mt-5 text-3xl font-bold leading-tight tracking-tight md:text-5xl">{{ a.h1 }}</h1>
          <div class="mt-6 space-y-4 text-lg leading-relaxed text-fg-muted">
            <p v-for="p in a.intro" :key="p">{{ p }}</p>
          </div>

          <section v-for="s in a.sections" :key="s.h2" class="mt-12">
            <h2 class="text-xl font-bold tracking-tight md:text-2xl">{{ s.h2 }}</h2>
            <p v-for="p in s.paras" :key="p" class="mt-3 leading-relaxed text-fg-muted">{{ p }}</p>
            <ul v-if="s.bullets" class="mt-4 space-y-2">
              <li v-for="b in s.bullets" :key="b" class="flex gap-2.5 leading-relaxed text-fg-muted">
                <span class="select-none" :style="{ color: a.accent }">▸</span>
                <span>{{ b }}</span>
              </li>
            </ul>
          </section>

          <aside
            class="mt-14 rounded-xl border p-6"
            :style="{
              borderColor: `color-mix(in srgb, ${a.accent} 40%, var(--color-line))`,
              backgroundColor: `color-mix(in srgb, ${a.accent} 6%, var(--color-surface))`,
            }"
          >
            <p class="eyebrow">Key takeaways</p>
            <ul class="mt-3 space-y-2">
              <li v-for="t in a.takeaways" :key="t" class="flex gap-2.5 text-sm leading-relaxed">
                <span class="select-none" :style="{ color: a.accent }">✓</span>
                <span>{{ t }}</span>
              </li>
            </ul>
            <NuxtLink
              :to="a.cta.href"
              class="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 font-mono text-sm font-semibold text-ink transition hover:bg-brand-soft"
            >
              {{ a.cta.label }} <span>→</span>
            </NuxtLink>
          </aside>

          <aside class="mt-4 flex flex-col gap-4 rounded-xl border border-brand/50 bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p class="eyebrow text-brand">Coaching</p>
              <p class="mt-2 text-sm leading-relaxed text-fg-muted">{{ a.coaching }}</p>
            </div>
            <button
              type="button"
              class="inline-flex shrink-0 items-center gap-2 self-start rounded-lg border border-brand px-5 py-2.5 font-mono text-sm font-semibold text-brand transition hover:bg-brand hover:text-ink sm:self-center"
              @click="scrollToCoaching"
            >
              Book coaching <span>↓</span>
            </button>
          </aside>
        </div>
      </article>

      <CoachingForms id="coaching" class="scroll-mt-16" />
      <ArticleList :exclude="a.slug" title="More articles" />
    </main>

    <SiteFooter />
  </div>
</template>
