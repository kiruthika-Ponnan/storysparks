import Link from "next/link";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getMockProject } from "@/lib/mock-store";
// import { getProject } from "@/lib/projects";
// import type { ProjectWithRelations } from "@/lib/types";

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  const resolvedParams = await params;
  
  // Get the project from our mock store instead of hardcoded sample data
  const project = getMockProject(resolvedParams.id);
  
  if (!project) {
    notFound();
  }

  console.log("Project loaded from store:", project);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 pb-24 pt-16">
        <header className="flex flex-col gap-4">
          <Link href="/dashboard" className="text-xs uppercase tracking-widest text-zinc-500 transition hover:text-amber-300">
            ← Back to projects
          </Link>
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-300">{project.businessCategory}</p>
            <h1 className="text-4xl font-semibold">{project.businessName}</h1>
            <p className="text-sm text-zinc-400">{project.offer}</p>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-[2fr,1fr]">
          <div className="space-y-6">
            <ProjectStatusPanel project={project} />
            <GenerationTimeline project={project} />
          </div>
          <aside className="space-y-6">
            <StoryboardPanel project={project} />
            <CampaignTipsPanel project={project} />
          </aside>
        </section>
      </div>
    </main>
  );
}

function ProjectStatusPanel({ project }: { project: any }) {
  const formatStatus = (status: string) => status.toLowerCase().replace(/_/g, " ");

  return (
    <div className="space-y-4 rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold">Generation status</h2>
          <p className="text-sm text-zinc-400">Track the pipeline from script to rendered videos.</p>
        </div>
        <span className="rounded-full bg-emerald-400 px-3 py-1 text-xs font-semibold text-emerald-950">
          {formatStatus(project.status)}
        </span>
      </div>
      <div className="rounded-2xl border border-zinc-800 bg-black/30 p-5">
        <p className="text-sm text-zinc-400">Downloadable videos will appear here once rendering completes.</p>
        <div className="mt-4 grid gap-3 text-sm text-zinc-300">
          {project.videos.length ? (
            project.videos.map((video: any) => (
              <a
                key={video.id}
                href={video.url ?? "#"}
                className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm transition hover:border-amber-300 hover:text-amber-300"
              >
                <span>{video.aspectRatio}</span>
              <span className="text-xs uppercase tracking-wide text-zinc-500">{formatStatus(video.status)}</span>
            </a>
          ))
        ) : (
          <p className="text-xs text-zinc-500">No renders yet — they&apos;ll drop in automatically.</p>
        )}
        </div>
      </div>
    </div>
  );
}

function GenerationTimeline({ project }: { project: any }) {
  const steps = ["SCRIPT", "STORYBOARD", "VOICEOVER", "VIDEO", "CAMPAIGN_TIPS"] as const;
  const taskLookup = new Map(project.tasks.map((task: any) => [task.step, task]));
  const formatStatus = (status: string) => status.toLowerCase().replace(/_/g, " ");

  return (
    <div className="space-y-4 rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">
      <h2 className="text-xl font-semibold">Pipeline timeline</h2>
      <ol className="space-y-4">
        {steps.map((step) => {
          const task = taskLookup.get(step);
          const status = task?.status ?? "PENDING";
          return (
            <li key={step} className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-black/30 px-4 py-3 text-sm">
              <span className="font-medium text-zinc-200">{step.replace(/_/g, " ")}</span>
              <span className="text-xs uppercase tracking-wide text-zinc-500">{formatStatus(status)}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function StoryboardPanel({ project }: { project: any }) {
  return (
    <div className="space-y-4 rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">
      <h2 className="text-xl font-semibold">Storyboard</h2>
      {project.storyboard ? (
        <pre className="whitespace-pre-wrap rounded-2xl border border-zinc-800 bg-black/40 p-4 text-xs text-zinc-300">
          {JSON.stringify(project.storyboard.frames, null, 2)}
        </pre>
      ) : (
        <p className="text-sm text-zinc-500">Storyboard will populate shortly after script generation.</p>
      )}
    </div>
  );
}

function CampaignTipsPanel({ project }: { project: any }) {
  return (
    <div className="space-y-4 rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">
      <h2 className="text-xl font-semibold">Campaign tips</h2>
      {project.campaignTips ? (
        <pre className="whitespace-pre-wrap rounded-2xl border border-zinc-800 bg-black/40 p-4 text-xs text-zinc-300">
          {JSON.stringify(project.campaignTips, null, 2)}
        </pre>
      ) : (
        <p className="text-sm text-zinc-500">Targeting guidance will appear once the AI finishes its run.</p>
      )}
    </div>
  );
}