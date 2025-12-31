"use client";

import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";

const featureHighlights = [
  {
    title: "Guided project wizard",
    description: "Capture business details, upload assets, and choose tone in less than 5 minutes.",
  },
  {
    title: "AI-generated scripts & storyboards",
    description: "Automatic script drafts, shot-by-shot plans, and editable voiceover suggestions.",
  },
  {
    title: "Ready-to-run video outputs",
    description: "Vertical, square, and widescreen renders with captions, branding, and campaign tips.",
  },
];

export default function Home() {
  const { data: session, status } = useSession();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = async () => {
    setIsSigningIn(true);
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error("Sign-in error:", error);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-zinc-100">
      <section className="mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-24 pt-32">
        <div className="flex flex-col items-center gap-10 text-center lg:flex-row lg:items-start lg:text-left">
          <div className="flex-1 space-y-6">
            <span className="rounded-full border border-zinc-700 px-4 py-1 text-sm font-semibold uppercase tracking-wide text-amber-400">
              AI Video Ads in Minutes
            </span>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              StorySparks turns local business stories into scroll-stopping video ads.
            </h1>
            <p className="text-lg text-zinc-300">
              Describe your offer, drop in a few photos or clips, and let StorySparks generate scripts,
              voiceovers, and polished videos ready for TikTok, Instagram, and YouTube—all under ten minutes.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              {session ? (
                // User is authenticated - show dashboard and project buttons
                <>
                  <Link
                    href="/dashboard"
                    className="h-12 rounded-full bg-amber-400 px-8 text-base font-semibold text-zinc-900 transition hover:bg-amber-300"
                  >
                    Go to Dashboard
                  </Link>
                  <Link
                    href="/wizard"
                    className="h-12 rounded-full border border-zinc-700 px-8 text-base font-semibold text-zinc-200 transition hover:border-amber-300 hover:text-amber-300"
                  >
                    Start New Project
                  </Link>
                </>
              ) : (
                // User is not authenticated - show sign in and project buttons
                <>
                  <button
                    onClick={handleSignIn}
                    disabled={isSigningIn}
                    className="h-12 rounded-full bg-amber-400 px-8 text-base font-semibold text-zinc-900 transition hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSigningIn ? "Signing in..." : "Sign In with Google"}
                  </button>
                  <Link
                    href="/wizard"
                    className="h-12 rounded-full border border-zinc-700 px-8 text-base font-semibold text-zinc-200 transition hover:border-amber-300 hover:text-amber-300"
                  >
                    Start New Project
                  </Link>
                </>
              )}
            </div>
            {session && (
              <div className="text-center text-sm text-zinc-400">
                Welcome back, {session.user?.name || session.user?.email}! 👋
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-4 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-xl shadow-zinc-950/50">
            <h2 className="text-sm font-semibold uppercase text-zinc-400">Pipeline preview</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {featureHighlights.map((feature) => (
                <div key={feature.title} className="rounded-2xl border border-zinc-800 bg-black/40 p-4">
                  <h3 className="text-lg font-semibold text-zinc-100">{feature.title}</h3>
                  <p className="mt-2 text-sm text-zinc-400">{feature.description}</p>
                </div>
              ))}
            </div>
            <span className="mt-4 text-xs text-zinc-500">
              Powered by OpenAI, ElevenLabs, and StorySparks&apos; FFmpeg worker pipeline.
            </span>
          </div>
        </div>
        <div className="grid gap-6 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-10 sm:grid-cols-2 lg:grid-cols-3">
          {featureHighlights.map((feature) => (
            <div key={`${feature.title}-detail`} className="space-y-3">
              <h3 className="text-xl font-semibold text-zinc-100">{feature.title}</h3>
              <p className="text-sm text-zinc-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
