import Link from "next/link";
import { Suspense } from "react";
import { getCurrentUser } from "@/lib/auth";
import { getAllMockProjects } from "@/lib/mock-store";
// import { getProjects } from "@/lib/projects";
// import type { ProjectWithRelations } from "@/lib/types";
import { ProjectCard } from "@/components/projects/ProjectCard";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-24 pt-16">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-300">Welcome back</p>
            <h1 className="text-4xl font-semibold">Hi {user.name}, let&apos;s build new sparks</h1>
            <p className="text-sm text-zinc-400">
              Track generation status, iterate on scripts, and download ready-to-run videos.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/wizard"
              className="h-11 rounded-full bg-amber-400 px-6 text-sm font-semibold text-amber-950 transition hover:bg-amber-300"
            >
              New project
            </Link>
            <Link
              href="/wizard"
              className="h-11 rounded-full border border-zinc-700 px-6 text-sm font-semibold text-zinc-200 transition hover:border-amber-300 hover:text-amber-300"
            >
              Upload assets
            </Link>
          </div>
        </header>

        <Suspense fallback={<ProjectListSkeleton />}>
          <ProjectList userId={user.id} />
        </Suspense>
      </div>
    </main>
  );
}

async function ProjectList({ userId }: { userId: string }) {
  // Get projects from our mock store instead of hardcoded sample data
  const projects = getAllMockProjects(userId);

  console.log("Projects loaded from store:", projects);

  if (!projects.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-12 text-center text-zinc-400">
        <p className="text-lg font-semibold text-zinc-100">No projects yet</p>
        <p className="max-w-sm text-sm">
          Kick off your first StorySparks project to generate scripts, voiceovers, and video ads tailored to your business.
        </p>
        <Link
          href="/wizard"
          className="h-11 rounded-full bg-amber-400 px-6 text-sm font-semibold text-amber-950 transition hover:bg-amber-300"
        >
          Start the wizard
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

function ProjectListSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-48 animate-pulse rounded-3xl border border-zinc-900 bg-zinc-900/60"
        />
      ))}
    </div>
  );
}