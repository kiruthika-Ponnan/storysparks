import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
// import { prisma } from "@/lib/db";
import { z } from "zod";

const schema = z.object({
  projectId: z.string().min(1),
});

export async function POST(request: Request) {
  const user = await getCurrentUser();
  const json = await request.json();
  const parsed = schema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  // Temporarily mock the project lookup and update without Prisma
  console.log(`Mock generate: Project ${parsed.data.projectId} for user ${user.id} status changed to GENERATING`);

  return NextResponse.json({ accepted: true }, { status: 202 });
}
