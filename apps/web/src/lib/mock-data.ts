import { ProjectStatus } from "@prisma/client";

export function buildMockProjects(userId: string) {
  return [
    {
      id: "demo-1",
      userId,
      businessName: "Riverside Dental Studio",
      businessCategory: "Dental Clinic",
      offer: "Free whitening kit with every new patient exam",
      tone: "FRIENDLY" as const,
      status: ProjectStatus.READY,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      assets: [],
      videos: [],
      tasks: [],
      script: null,
      storyboard: null,
      voiceover: null,
      campaignTips: null,
    },
    {
      id: "demo-2",
      userId,
      businessName: "Sparkle & Co. Cleaning",
      businessCategory: "Home Cleaning",
      offer: "50% off the first deep clean for new clients",
      tone: "URGENT" as const,
      status: ProjectStatus.GENERATING,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      assets: [],
      videos: [],
      tasks: [],
      script: null,
      storyboard: null,
      voiceover: null,
      campaignTips: null,
    },
  ];
}
