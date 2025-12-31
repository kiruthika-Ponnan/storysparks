"use server";

import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
// import { prisma } from "./db";
import { getCurrentUser } from "./auth";
import { CreateProjectState } from "./types";
import { steps, createProjectSchema } from "./schemas";
import { storeMockProject } from "./mock-store";

export async function createProjectAction(_: CreateProjectState | undefined, formData: FormData): Promise<CreateProjectState> {
  try {
    const user = await getCurrentUser();
    const payload = {
      businessName: formData.get("businessName"),
      businessCategory: formData.get("businessCategory"),
      offer: formData.get("offer"),
      tone: formData.get("tone"),
    };

    const data = createProjectSchema.parse(payload);

    // Temporarily create a mock project without Prisma
    const mockProject = {
      id: `project_${Date.now()}`,
      userId: user.id,
      businessName: data.businessName,
      businessCategory: data.businessCategory,
      offer: data.offer,
      tone: data.tone,
      status: "GENERATING" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
      assets: [],
      videos: [],
      script: null,
      storyboard: null,
      voiceover: null,
      campaignTips: null,
      tasks: steps.map((step) => ({
        id: `task_${Date.now()}_${step}`,
        projectId: `project_${Date.now()}`,
        step,
        status: "PENDING" as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    };

    // Store the project in our mock store
    storeMockProject(mockProject);

    console.log("Mock project created:", mockProject);

    revalidatePath("/dashboard");
    
    // Return success state with project ID instead of redirecting
    return { 
      success: true, 
      projectId: mockProject.id,
      redirectTo: `/projects/${mockProject.id}` 
    };
  } catch (error) {
    if (error instanceof Error) {
      // If user is not authenticated, return error state
      if (error.message === "Not authenticated") {
        return { error: "Please sign in to create a project", redirectTo: "/api/auth/signin" };
      }
      return { error: error.message };
    }

    return { error: "Something went wrong" };
  }
}

export async function updateProjectStatusAction(projectId: string, status: "GENERATING" | "READY" | "FAILED") {
  // Temporarily mock the update without Prisma
  console.log(`Mock update: Project ${projectId} status changed to ${status}`);
  
  revalidatePath(`/projects/${projectId}`);
}
