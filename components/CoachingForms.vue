<script setup lang="ts">
/* Two booking forms: 1:1 coaching and the group cohort. Both post JSON to the
   same headless form endpoint; `formType` tells the submissions apart. The
   motion picked in the course (if any) pre-fills the motion field. */
const props = defineProps<{ motion?: string | null }>()

const ENDPOINT =
  'https://api.app.customjs.io/pages/form/submit/a868ceae-a287-4302-828b-41addb67565d'

type Mode = 'individual' | 'cohort'
const mode = ref<Mode>('individual')

const modes = [
  {
    key: 'individual' as Mode,
    tag: '1:1',
    title: 'Individual coaching',
    line: 'Work on your product and go-to-market directly with me.',
  },
  {
    key: 'cohort' as Mode,
    tag: 'Group',
    title: 'Cohort coaching',
    line: 'Learn with a small group of builders on the same motion.',
  },
]

const motions = [
  { key: 'plg', label: 'PLG', color: 'var(--color-plg)' },
  { key: 'slg', label: 'SLG', color: 'var(--color-slg)' },
  { key: 'ent', label: 'Enterprise', color: 'var(--color-ent)' },
]
const languages = [
  { key: 'en', label: 'English' },
  { key: 'de', label: 'Deutsch' },
]

const form = reactive({
  name: '',
  email: '',
  motion: '',
  timezone: '',
  language: '',
  message: '',
})

const timezones = ref<string[]>([])

onMounted(() => {
  try {
    timezones.value = (Intl as any).supportedValuesOf('timeZone')
  } catch {
    timezones.value = []
  }
  try {
    form.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
  } catch {}
  if (props.motion && !form.motion) form.motion = props.motion
})
watch(
  () => props.motion,
  (m) => {
    if (m && !form.motion) form.motion = m
  },
)

const status = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')
const error = ref('')

const missing = computed(() => {
  const m: string[] = []
  if (!form.name.trim()) m.push('name')
  if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) m.push('email')
  if (!form.motion) m.push('motion')
  if (!form.message.trim()) m.push('a few words about you')
  if (mode.value === 'cohort') {
    if (!form.timezone) m.push('time zone')
    if (!form.language) m.push('language')
  }
  return m
})

const submit = async () => {
  if (missing.value.length) {
    error.value = `Please add: ${missing.value.join(', ')}.`
    return
  }
  status.value = 'sending'
  error.value = ''
  const motionLabel = motions.find((m) => m.key === form.motion)?.label ?? form.motion
  const payload: Record<string, string> = {
    formType: mode.value === 'cohort' ? 'Cohort coaching' : 'Individual coaching',
    name: form.name.trim(),
    email: form.email.trim(),
    motion: motionLabel,
    message: form.message.trim(),
  }
  if (mode.value === 'cohort') {
    payload.timezone = form.timezone
    payload.language = languages.find((l) => l.key === form.language)?.label ?? form.language
  }
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error(String(res.status))
    status.value = 'sent'
  } catch {
    status.value = 'error'
    error.value = 'Something went wrong. Please try again in a moment.'
  }
}

const reset = () => {
  form.message = ''
  status.value = 'idle'
  error.value = ''
}

const inputCls =
  'mt-1.5 w-full rounded-lg border border-line bg-ink px-3 py-2 text-sm text-fg outline-none transition placeholder:text-fg-faint focus:border-brand'
</script>

<template>
  <section class="relative overflow-hidden border-t border-line/60">
    <div class="grid-bg absolute inset-0 opacity-25"></div>
    <div class="relative mx-auto max-w-[1440px] px-6 py-20">
      <SectionHead
        num="↗"
        kicker="Coaching"
        title="Don't do it alone."
        sub="Get direct feedback on your product, your motion and your first channels. One-on-one, or together with a small cohort of builders."
      />

      <div class="mt-10 grid items-start gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
        <!-- Pick a format -->
        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <button
            v-for="m in modes"
            :key="m.key"
            type="button"
            class="rounded-xl border p-5 text-left transition"
            :class="mode === m.key ? 'border-brand bg-surface-2' : 'border-line bg-surface hover:border-fg-faint'"
            @click="mode = m.key; status === 'sent' && reset()"
          >
            <div class="flex items-center justify-between">
              <h3 class="font-semibold">{{ m.title }}</h3>
              <span
                class="rounded-md px-2 py-0.5 font-mono text-[11px]"
                :class="mode === m.key ? 'bg-brand text-ink' : 'bg-line text-fg-muted'"
                >{{ m.tag }}</span
              >
            </div>
            <p class="mt-1.5 text-sm text-fg-muted">{{ m.line }}</p>
          </button>
        </div>

        <!-- Form -->
        <div class="card p-5 sm:p-7">
          <div v-if="status === 'sent'" class="py-8 text-center">
            <p class="font-mono text-sm text-ok">✓ Sent</p>
            <p class="mt-3 text-lg font-semibold">Thanks, {{ form.name.split(' ')[0] }}!</p>
            <p class="mt-1 text-fg-muted">I'll get back to you at {{ form.email }} shortly.</p>
            <button
              type="button"
              class="mt-6 font-mono text-xs text-fg-faint transition hover:text-fg"
              @click="reset"
            >
              ← Send another request
            </button>
          </div>

          <form v-else novalidate class="space-y-5" @submit.prevent="submit">
            <p class="eyebrow">
              {{ mode === 'cohort' ? 'Apply for the cohort' : 'Book individual coaching' }}
            </p>

            <div class="grid gap-4 sm:grid-cols-2">
              <label class="block">
                <span class="text-sm font-medium">Name</span>
                <input v-model="form.name" type="text" autocomplete="name" placeholder="Jane Builder" :class="inputCls" />
              </label>
              <label class="block">
                <span class="text-sm font-medium">Email</span>
                <input v-model="form.email" type="email" autocomplete="email" placeholder="jane@product.com" :class="inputCls" />
              </label>
            </div>

            <div>
              <span class="text-sm font-medium">Your motion</span>
              <div class="mt-1.5 flex flex-wrap gap-2">
                <button
                  v-for="m in motions"
                  :key="m.key"
                  type="button"
                  class="inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 font-mono text-sm transition"
                  :style="form.motion === m.key
                    ? { borderColor: m.color, backgroundColor: `color-mix(in srgb, ${m.color} 16%, transparent)`, color: 'var(--color-fg)' }
                    : { borderColor: 'var(--color-line)', color: 'var(--color-fg-muted)' }"
                  @click="form.motion = m.key"
                >
                  <span class="h-2 w-2 rounded-full" :style="{ backgroundColor: m.color }"></span>
                  {{ m.label }}
                </button>
              </div>
            </div>

            <div v-if="mode === 'cohort'" class="grid gap-4 sm:grid-cols-2">
              <label class="block">
                <span class="text-sm font-medium">Time zone</span>
                <div class="relative">
                <select v-model="form.timezone" :class="[inputCls, 'cursor-pointer appearance-none pr-9 font-mono [color-scheme:dark]']">
                  <option value="" disabled>Select your time zone</option>
                  <option v-if="form.timezone && !timezones.includes(form.timezone)" :value="form.timezone">
                    {{ form.timezone }}
                  </option>
                  <option v-for="tz in timezones" :key="tz" :value="tz">{{ tz.replace(/_/g, ' ') }}</option>
                </select>
                <svg
                  class="pointer-events-none absolute right-3 top-1/2 mt-[3px] h-3.5 w-3.5 -translate-y-1/2 text-fg-faint"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M4 6l4 4 4-4" />
                </svg>
                </div>
              </label>
              <div>
                <span class="text-sm font-medium">Language</span>
                <div class="mt-1.5 flex gap-2">
                  <button
                    v-for="l in languages"
                    :key="l.key"
                    type="button"
                    class="flex-1 rounded-lg border px-3.5 py-2 font-mono text-sm transition"
                    :class="form.language === l.key ? 'border-brand bg-brand/15 text-fg' : 'border-line text-fg-muted'"
                    @click="form.language = l.key"
                  >
                    {{ l.label }}
                  </button>
                </div>
              </div>
            </div>

            <label class="block">
              <span class="text-sm font-medium">About you</span>
              <span class="ml-2 text-xs text-fg-faint">2–3 sentences: what you build and where you're stuck</span>
              <textarea
                v-model="form.message"
                rows="4"
                placeholder="I'm building a scheduling tool for clinics. Have a working MVP, but no idea how to get the first 10 paying customers."
                :class="inputCls"
              ></textarea>
            </label>

            <div class="flex flex-wrap items-center justify-between gap-3 pt-1">
              <p class="text-sm" :class="error ? 'text-warn' : 'text-fg-faint'">
                {{ error || "I'll reply personally by email." }}
              </p>
              <button
                type="submit"
                :disabled="status === 'sending'"
                class="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 font-mono text-sm font-semibold text-ink transition hover:bg-brand-soft disabled:opacity-60"
              >
                {{ status === 'sending' ? 'Sending…' : mode === 'cohort' ? 'Apply for the cohort' : 'Request coaching' }}
                <span v-if="status !== 'sending'">→</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
