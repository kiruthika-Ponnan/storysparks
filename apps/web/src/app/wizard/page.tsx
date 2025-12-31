import Link from "next/link";
import { WizardForm } from "@/components/wizard/WizardForm";

export default function WizardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-zinc-50">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 pb-24 pt-20">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-widest text-amber-300">StorySparks Project Wizard</p>
            <h1 className="text-4xl font-semibold">Let&apos;s light up your ad story</h1>
            <p className="text-sm text-zinc-400">
              We&apos;ll walk you through business basics, assets, and tone. Expect to spend about three minutes here.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="hidden h-10 items-center rounded-full border border-zinc-700 px-5 text-sm font-semibold text-zinc-200 transition hover:border-amber-300 hover:text-amber-300 sm:inline-flex"
          >
            Back to dashboard
          </Link>
        </div>

        <WizardForm />
      </div>
    </main>
  );
}
