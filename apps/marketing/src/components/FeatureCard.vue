<template>
  <article class="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8 shadow-xl shadow-black/40 transition hover:border-amber-400/40">
    <h3 class="text-xl font-semibold text-zinc-100">
      {{ heading }}
    </h3>
    <p class="mt-3 text-sm text-zinc-400">
      {{ copy }}
    </p>
  </article>
</template>

<script setup lang="ts">
defineProps<{ heading: string; copy: string }>();
</script>
