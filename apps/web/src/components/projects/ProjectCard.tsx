import Link from "next/link";
import type { ProjectWithRelations } from "@/lib/types";

const statusStyles: Record<ProjectWithRelations["status"], string> = {
  DRAFT: "bg-zinc-800 text-zinc-200",
  GENERATING: "bg-amber-400 text-amber-950",
  READY: "bg-emerald-400 text-emerald-950",
  FAILED: "bg-red-500 text-red-950",
  ARCHIVED: "bg-zinc-700 text-zinc-200",
};

const statusLabel: Record<ProjectWithRelations["status"], string> = {
  DRAFT: "Draft",
  GENERATING: "Generating",
  READY: "Ready",
  FAILED: "Needs attention",
  ARCHIVED: "Archived",
};

export function ProjectCard({ project }: { project: ProjectWithRelations }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group flex flex-col gap-4 rounded-3xl border border-zinc-800 bg-zinc-950/50 p-6 transition hover:border-amber-400 hover:bg-zinc-900/60"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wide text-zinc-500">{project.businessCategory}</p>
          <h3 className="text-xl font-semibold text-zinc-100">{project.businessName}</h3>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[project.status]}`}>
          {statusLabel[project.status]}
        </span>
      </div>
      <p className="text-sm text-zinc-400">{project.offer}</p>
      <div className="flex items-center justify-between text-xs text-zinc-500">
        <span>Tone: {project.tone?.toLowerCase()}</span>
        <span>
          Updated {project.updatedAt instanceof Date ? project.updatedAt.toLocaleDateString() : new Date(project.updatedAt).toLocaleDateString()}
        </span>
      </div>
    </Link>
  );
}
