<template>
  <footer class="border-t border-line/60">
    <div
      class="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-fg-faint sm:flex-row"
    >
      <NuxtLink to="/" class="font-mono transition hover:text-fg">SaaS Builders Manual</NuxtLink>
      <nav class="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
        <NuxtLink to="/imprint" class="transition hover:text-fg">Imprint</NuxtLink>
        <NuxtLink to="/privacy-policy" class="transition hover:text-fg">Privacy Policy</NuxtLink>
        <NuxtLink to="/terms-and-conditions" class="transition hover:text-fg">Terms &amp; Conditions</NuxtLink>
      </nav>
    </div>
  </footer>
</template>
