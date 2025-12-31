<template>
  <main class="bg-zinc-950 text-zinc-50">
    <section class="mx-auto flex min-h-screen max-w-6xl flex-col gap-16 px-6 py-20 lg:flex-row lg:items-center">
      <div class="flex-1 space-y-6">
        <span class="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-amber-300">
          StorySparks for Local Businesses
        </span>
        <h1 class="text-4xl font-semibold leading-tight sm:text-5xl">
          AI-crafted video ads delivered in minutes, not weeks.
        </h1>
        <p class="text-lg text-zinc-300">
          StorySparks combines OpenAI, ElevenLabs, and cinematic templates to produce scroll-stopping ads tailored to
          your brand. No agency retainers. No editing headaches.
        </p>
        <div class="flex flex-col gap-4 sm:flex-row">
          <a
            class="flex h-12 items-center justify-center rounded-full bg-amber-400 px-6 text-sm font-semibold text-amber-950 transition hover:bg-amber-300"
            href="https://storysparks.app"
            target="_blank"
            rel="noopener"
          >
            Launch dashboard
          </a>
          <a
            class="flex h-12 items-center justify-center rounded-full border border-zinc-700 px-6 text-sm font-semibold text-zinc-200 transition hover:border-amber-400 hover:text-amber-300"
            href="#features"
          >
            Explore features
          </a>
        </div>
      </div>
      <div class="flex flex-1 flex-col gap-6 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8 shadow-xl shadow-black/40">
        <h2 class="text-sm font-semibold uppercase tracking-widest text-zinc-400">Sneak peek</h2>
        <div class="grid gap-3">
          <div class="rounded-2xl border border-zinc-800 bg-black/50 p-5">
            <p class="text-xs uppercase tracking-widest text-emerald-400">Campaign preview</p>
            <p class="mt-2 text-base font-semibold">"Brighten your smile in one visit."</p>
            <p class="mt-1 text-sm text-zinc-400">Generated script, storyboard, and voiceover in under 90 seconds.</p>
          </div>
          <div class="rounded-2xl border border-zinc-800 bg-black/50 p-5">
            <p class="text-xs uppercase tracking-widest text-sky-400">Formats</p>
            <p class="mt-2 text-sm text-zinc-400">9:16 vertical, 16:9 widescreen, and 1:1 square — ready for TikTok, YouTube, and Meta.</p>
          </div>
          <div class="rounded-2xl border border-zinc-800 bg-black/50 p-5">
            <p class="text-xs uppercase tracking-widest text-amber-300">Integrations</p>
            <p class="mt-2 text-sm text-zinc-400">Upload logos, sync product shots, or tap into AI b-roll sourced by StorySparks.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="features" class="bg-black/40 py-20">
      <div class="mx-auto grid max-w-6xl gap-8 px-6 sm:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          heading="Script-to-screen pipeline"
          copy="From copywriting to FFmpeg composition, StorySparks automates every production step with built-in guardrails."
        />
        <FeatureCard
          heading="Voiceovers that match your tone"
          copy="Access premium voices, multi-language support, and brand-safe pronunciations powered by ElevenLabs."
        />
        <FeatureCard
          heading="Actionable campaign tips"
          copy="Receive suggested hooks, headlines, and audience targeting that slot directly into Meta and Google Ads."
        />
      </div>
    </section>

    <section class="bg-zinc-950 py-20">
      <div class="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center">
        <h2 class="text-3xl font-semibold">Ready to launch high-performing video ads?</h2>
        <p class="text-lg text-zinc-300">
          Join the beta cohort and craft your first StorySparks ad with guided onboarding, templates, and one-on-one
          support.
        </p>
        <a
          class="flex h-12 items-center justify-center rounded-full bg-emerald-400 px-6 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-300"
          href="mailto:hello@storysparks.app?subject=StorySparks%20Beta"
        >
          Request beta access
        </a>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import FeatureCard from "./components/FeatureCard.vue";
</script>
