import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getProjects } from "@/lib/projects";
// import { prisma } from "@/lib/db";
import { z } from "zod";

const createSchema = z.object({
  businessName: z.string().min(2),
  businessCategory: z.string().min(2),
  offer: z.string().min(2),
  tone: z.enum(["FRIENDLY", "LUXURY", "URGENT", "PLAYFUL", "BOLD"]),
});

export async function GET() {
  const user = await getCurrentUser();
  const projects = await getProjects(user.id);
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  const json = await request.json();
  const data = createSchema.safeParse(json);

  if (!data.success) {
    return NextResponse.json({ error: data.error.flatten() }, { status: 400 });
  }

  // Temporarily create a mock project without Prisma
  const mockProject = {
    id: `project_${Date.now()}`,
    userId: user.id,
    businessName: data.data.businessName,
    businessCategory: data.data.businessCategory,
    offer: data.data.offer,
    tone: data.data.tone,
    status: "GENERATING" as const,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  console.log("Mock project created via API:", mockProject);

  return NextResponse.json(mockProject, { status: 201 });
}
