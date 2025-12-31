"use client";

import { useMemo, useState, useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { createProjectAction } from "@/lib/actions";
import { getInitialCreateState } from "@/lib/types";

const toneOptions = [
  { label: "Friendly", value: "FRIENDLY", description: "Warm, conversational, and approachable" },
  { label: "Luxury", value: "LUXURY", description: "High-end polish with premium pacing" },
  { label: "Urgent", value: "URGENT", description: "High-energy, time-sensitive messaging" },
  { label: "Playful", value: "PLAYFUL", description: "Fun, upbeat, and personality-driven" },
  { label: "Bold", value: "BOLD", description: "Confident statements with punchy visuals" }
];

const steps = ["Business", "Assets", "Tone"] as const;

export function WizardForm() {
  const [stepIndex, setStepIndex] = useState(0);
  const [state, formAction] = useActionState(createProjectAction, getInitialCreateState());
  const router = useRouter();

  const currentStep = steps[stepIndex];
  const canGoBack = stepIndex > 0;
  const canGoNext = stepIndex < steps.length - 1;

  const next = () => setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  const prev = () => setStepIndex((prev) => Math.max(prev - 1, 0));

  // Handle redirect after successful project creation
  useEffect(() => {
    if (state.success && state.redirectTo) {
      router.push(state.redirectTo);
    } else if (state.error && state.redirectTo) {
      router.push(state.redirectTo);
    }
  }, [state, router]);

  const stepDescription = useMemo(() => {
    switch (currentStep) {
      case "Business":
        return "Tell us about the business and offer so we can tailor the script.";
      case "Assets":
        return "Upload a logo, photos, or video clips. You can start with placeholders for now.";
      case "Tone":
        return "Pick the voice that matches your brand. You can always change it later.";
      default:
        return "";
    }
  }, [currentStep]);

  return (
    <form
      action={formAction}
      className="mx-auto flex w-full max-w-3xl flex-col gap-8 rounded-3xl border border-zinc-800 bg-zinc-950/60 p-10 text-zinc-100 shadow-lg shadow-black/40"
    >
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-amber-300">Step {stepIndex + 1} of {steps.length}</p>
        <h1 className="text-3xl font-semibold">Project setup – {currentStep}</h1>
        <p className="text-sm text-zinc-400">{stepDescription}</p>
      </header>

      <div className={currentStep === "Business" ? "block" : "hidden"}>
        <BusinessStep />
      </div>
      <div className={currentStep === "Assets" ? "block" : "hidden"}>
        <AssetsStep />
      </div>
      <div className={currentStep === "Tone" ? "block" : "hidden"}>
        <ToneStep />
      </div>

      <footer className="flex flex-col gap-4 sm:flex-row sm:justify-between">
        <div className="flex gap-4">
          <button
            type="button"
            onClick={prev}
            disabled={!canGoBack}
            className="h-11 rounded-full border border-zinc-700 px-6 text-sm font-semibold text-zinc-200 transition hover:border-amber-300 hover:text-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Back
          </button>
          {canGoNext && (
            <button
              type="button"
              onClick={next}
              className="h-11 rounded-full bg-amber-400 px-6 text-sm font-semibold text-zinc-950 transition hover:bg-amber-300"
            >
              Continue
            </button>
          )}
        </div>
        {!canGoNext && <SubmitButton />}
      </footer>

      {state?.error && (
        <p className="text-sm text-red-400" role="alert" aria-live="polite">
          {state.error}
        </p>
      )}
    </form>
  );
}

function BusinessStep() {
  return (
    <div className="grid gap-6">
      <label className="grid gap-2 text-sm">
        <span className="font-semibold">Business name</span>
        <input
          name="businessName"
          required
          placeholder="e.g. Riverside Dental Studio"
          className="h-11 rounded-xl border border-zinc-800 bg-zinc-900 px-4 text-base text-zinc-100 outline-none transition focus:border-amber-400"
        />
      </label>
      <label className="grid gap-2 text-sm">
        <span className="font-semibold">Category</span>
        <input
          name="businessCategory"
          required
          placeholder="Dental clinic"
          className="h-11 rounded-xl border border-zinc-800 bg-zinc-900 px-4 text-base text-zinc-100 outline-none transition focus:border-amber-400"
        />
      </label>
      <label className="grid gap-2 text-sm">
        <span className="font-semibold">Offer highlight</span>
        <textarea
          name="offer"
          required
          rows={3}
          placeholder="Free whitening kit with every new patient exam."
          className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-base text-zinc-100 outline-none transition focus:border-amber-400"
        />
      </label>
    </div>
  );
}

function AssetsStep() {
  return (
    <div className="grid gap-4 rounded-2xl border border-dashed border-zinc-700 bg-black/30 p-8 text-center">
      <p className="text-sm text-zinc-400">
        Drag and drop files or browse to upload your logo, photos, or short video clips.
      </p>
      <p className="text-xs text-zinc-500">Accepted formats: JPG, PNG, MP4. Max 100MB per file.</p>
      <div className="flex flex-col gap-3">
        <input
          type="file"
          name="assets"
          multiple
          accept="image/*,video/*"
          className="mx-auto h-11 rounded-full border border-amber-300 px-6 text-sm font-semibold text-amber-300 transition hover:bg-amber-400/10 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-400 file:text-amber-950 hover:file:bg-amber-300"
        />
        <p className="text-xs text-zinc-500">
          You can skip this step and add assets later from the project dashboard.
        </p>
      </div>
    </div>
  );
}

function ToneStep() {
  return (
    <fieldset className="grid gap-3">
      <legend className="sr-only">Select tone</legend>
      {toneOptions.map((tone) => (
        <label
          key={tone.value}
          className="flex cursor-pointer flex-col gap-2 rounded-2xl border border-zinc-800 bg-black/30 p-4 transition hover:border-amber-300"
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-base font-semibold text-zinc-100">{tone.label}</p>
              <p className="text-xs text-zinc-400">{tone.description}</p>
            </div>
            <input
              type="radio"
              name="tone"
              value={tone.value}
              defaultChecked={tone.value === "FRIENDLY"}
              className="h-4 w-4 accent-amber-400"
            />
          </div>
        </label>
      ))}
    </fieldset>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="h-11 rounded-full bg-emerald-400 px-8 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-300 disabled:cursor-progress disabled:opacity-60"
    >
      {pending ? "Creating project..." : "Generate my ad"}
    </button>
  );
}
